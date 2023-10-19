### 软件介绍

mongodb sharding 以三节点为例，详细介绍mongodb高可用架构部署

### 编写人员 

贾立鑫


#### 环境说明

IP | 192.168.14.8 |  192.168.14.7  | 192.168.14.6   |  端口| 
-|-|-|-|-
CPU | 24C | 24C |8C|20000|
内存 | 32G | 32G |24G|20000|
组件 | mongos | mongos5 |mongos|20000|
组件 | config server | config server |config server|21000|
组件 | <font color=red>shard1</font> | shard1 |shard1|27001|
组件 | shard2 |<font color=red>shard2</font> |shard2|27002|
组件 | shard3 | shard3 |<font color=red>shard3</font>|27003|

##### 从上面的表格可以看出来，在机器规划时主要考虑一下几个方面

* 每个分片的三个副本分别位于三个节点服务器上，这样可以保证任意一台机器出现故障集群仍然可用
* 标红色的为每个分片的primary节点，将是哪个分片的主节点分散到三个不同服务器，可以将数据写的压力均分
* 本文档将mongos和mongod部署在一起，实际应用时，mongos可以单独部署


#### (一) 环境准备

##### 相关依赖

```
yum install numactl wget lsof telnet -y
```

##### 禁止Transparent Huge Pages

1. 查看状态
```
cat /sys/kernel/mm/transparent_hugepage/defrag;
[always] madvise never
cat /sys/kernel/mm/transparent_hugepage/enabled;
[always] madvise never
```
上述状态说明THP是开启的

2. 禁用THP
```
echo never > /sys/kernel/mm/transparent_hugepage/enabled
echo never > /sys/kernel/mm/transparent_hugepage/defrag
```
3. 开启自动禁用
编辑/etc/rc.d/rc.local ，在最后追加如下内容
```
if test -f /sys/kernel/mm/transparent_hugepage/enabled; then
echo never > /sys/kernel/mm/transparent_hugepage/enabled
fi
if test -f /sys/kernel/mm/transparent_hugepage/defrag; then
echo never > /sys/kernel/mm/transparent_hugepage/defrag
fi
```
##### 创建用户、组
```
    groupadd mongodb && useradd -r -g mongodb mongodb
```

##### 挂载卷组

```
每个分片使用不同的卷组，分散磁盘压力，根据实际情况挂载
```

##### 修改系统ulimit

vi /etc/profile
```
　#添加如下行
  ulimit -u 65536
  ulimit -n 65536
  ulimit -d unlimited
  ulimit -m unlimited
  ulimit -s unlimited
  ulimit -t unlimited
  ulimit -v unlimited
```

##### 创建文件夹

```
mkdir -p /data/mongodb/conf/
mkdir -p /data/mongodb/data/mongos/log/
mkdir -p /data/mongodb/data/config/data/
mkdir -p /data/mongodb/data/config/log/
mkdir -p /data/mongodb/data/shard1/data/
mkdir -p /data/mongodb/data/shard1/log/
mkdir -p /data/mongodb/data/shard2/data/
mkdir -p /data/mongodb/data/shard2/log/
mkdir -p /data/mongodb/data/shard3/data/
mkdir -p /data/mongodb/data/shard3/log/
mkdir -p /data/mongodb/mongokey/
```

##### 开启防火墙端口
```
firewall-cmd --zone=public --add-port=21000/tcp --permanent
firewall-cmd --zone=public --add-port=27001/tcp --permanent
firewall-cmd --zone=public --add-port=27002/tcp --permanent
firewall-cmd --zone=public --add-port=27003/tcp --permanent
firewall-cmd --reload
```

##### 下载安装文件
```
mkdir -p /data/software && \
cd /data/software && \
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.0.2.tgz && \
tar -zxvf mongodb-linux-x86_64-rhel70-4.0.2.tgz && \
mkdir -p /usr/local/mongodb/ && \
mv mongodb-linux-x86_64-rhel70-4.0.2 /usr/local/mongodb/mongodb-4.0.2 && \
cd /usr/local/mongodb/mongodb-4.0.2 && \
chmod 755 /usr/local/mongodb/mongodb-4.0.2/bin/*
```

##### 配置环境变量
vi /etc/profile
```
export MONGODB_HOME=/usr/local/mongodb/mongodb-4.0.2
export PATH=$MONGODB_HOME/bin:$PATH
```
加载环境变量
```
source /etc/profile
```

##### 生成认证文件(在一台服务器上生成)用来节点之间通信

```
openssl rand -base64 100 >  /data/mongodb/mongokey/mongodb-keyfile
```
复制到其他服务器
```
scp /data/mongodb/mongokey/mongodb-keyfile root@192.168.14.7:/data/mongodb/mongokey/
scp /data/mongodb/mongokey/mongodb-keyfile root@192.168.14.6:/data/mongodb/mongokey/
```
设置权限
```
chmod  600  /data/mongodb/mongokey/mongodb-keyfile
```

#### (二) 搭建config server副本集，配置和启动

##### 配置config server配置文件(三台服务除了bindIp不一样其他的完全一样)


```

cat >> /data/mongodb/conf/config.conf  <<  EOF

## content
systemLog:
  destination: file
  logAppend: true
  path: /data/mongodb/data/config/log/config.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data/config/data
  journal:
    enabled: true
# how the process runs
processManagement:
  fork: true
  pidFilePath: /data/mongodb/data/config/log/configsrv.pid
 
# network interfaces
net:
  port: 21000
  bindIp: 192.168.14.8,127.0.0.1
 
#operationProfiling:
replication:
    replSetName: config
 
sharding:
    clusterRole: configsvr

EOF

```

##### 启动三个config server
```
numactl --interleave=all mongod  --keyFile   /data/mongodb/mongokey/mongodb-keyfile --config /data/mongodb/conf/config.conf 
```
```
#出现以下信息则启动成功
2019-11-15T14:12:37.703+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
about to fork child process, waiting until server is ready for connections.
forked process: 3029
child process started successfully, parent exiting
```

##### 登录任意一个config server

此处使用127.0.0.1登录mongoshell而不是业务网卡的ip，是因为开启了权限认证，使用127.0.0.1可以绕过认证，后续的几个步骤使用127.0.0.1登录都是出于这个原因
```
mongo 127.0.0.1:21000
```
##### 登录mongodshell 之后执行以下命令
副本配置
```
config = {
    _id : "config",
     members : [
         {_id : 0, host : "192.168.14.8:21000",priority:3 },
         {_id : 1, host : "192.168.14.7:21000",priority:2 },
         {_id : 2, host : "192.168.14.6:21000",priority:1 }
     ]
 }

```
执行初始化命令

```
rs.initiate(config);
```
查看集群状态
```
rs.status();
```

#### (三)-(1) 搭建shard1副本集，配置和启动

##### 配置 shard 配置文件

* 192.168.14.8配置后进行初始化，默认谁初始化谁是primary，14.7，14.6 配置文件除了bindIp之外其他一样
* wiredTigerEngineConfigCacheSizeGB：存储引擎使用的最大内存量，如果一个节点只部署一个shard进程，建议设置为物理内存的一半；如果部署多个进程，根据实际情况进行修改
* maxIncomingConnections：最大连接数，默认在100000，相当于不限制，建议不超过2000
```

cat >> /data/mongodb/conf/shard1.conf  <<  EOF

# where to write logging data.
systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/data/shard1/log/shard1.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data/shard1/data
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
       cacheSizeGB: 20
       directoryForIndexes: true
    collectionConfig:
       blockCompressor: zlib
    indexConfig:
       prefixCompression: true
 
# how the process runs
processManagement:
  fork: true 
  pidFilePath: /data/mongodb/data/shard1/log/shard1.pid
 
# network interfaces
net:
  port: 27001
  bindIp: 192.168.14.8,127.0.0.1
  maxIncomingConnections: 1000
#operationProfiling:
replication:
    oplogSizeMB: 20480
    replSetName: shard1
sharding:
    clusterRole: shardsvr
#operationProfiling:
operationProfiling:
   slowOpThresholdMs: 500
   mode: slowOp
security:
  authorization: enabled
  clusterAuthMode: keyFile
  keyFile: /data/mongodb/mongokey/mongodb-keyfile 
  javascriptEnabled: true
setParameter:
  enableLocalhostAuthBypass: true
  authenticationMechanisms: SCRAM-SHA-1
  replWriterThreadCount: 16

EOF

```



##### 启动三个shard1 实例
```
numactl --interleave=all mongod  --config /data/mongodb/conf/shard1.conf
```
```
#出现以下信息则启动成功
2019-11-15T14:12:37.703+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
about to fork child process, waiting until server is ready for connections.
forked process: 3029
child process started successfully, parent exiting
```



##### 登录192.168.14.8 shard1 实例，在此节点进行初始化

为什么此处要登录192.168.14.8的shard1进行初始化？因为mongodb默认第一次选举时会选择初始化使用的这个节点作为primary节点。在上面的表格中，我们规划了192.168.14.8作为shard1的primary节点，因此在192.168.14.8上进行初始化，下面shard2和shard3的初始化也遵循这一原则。
当然，也可以在添加副本集的时候通过设置各个节点的priority来强制某一个节点被选举为primary

```
mongo 127.0.0.1:27001
```
##### 登录mongodshell 之后执行以下命令
use admin
```
use admin
```

```
config = {
    _id : "shard1",
     members : [
         {_id : 0, host : "192.168.14.8:27001",priority:3 },
         {_id : 1, host : "192.168.14.7:27001",priority:2 },
         {_id : 2, host : "192.168.14.6:27001",priority:1 }
     ]
 }
```
执行初始化命令
```
rs.initiate(config);
```
查看集群状态
```
rs.status();
```
为shard集群的设置root密码
```
db.createUser(
 {
 user:"root",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 );

 db.auth("root","Hhwyadmin2018");

 db.createUser(
 {
 user:"admin",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 );
```

#### (三)-(2) 搭建shard2副本集，配置和启动

##### 配置 shard 配置文件

* 192.168.14.7配置后进行初始化，默认谁初始化谁是primary，14.8，14.6 配置文件除了bindIp之外其他一样
* wiredTigerEngineConfigCacheSizeGB：存储引擎使用的最大内存量，如果一个节点只部署一个shard进程，建议设置为物理内存的一半；如果部署多个进程，根据实际情况进行修改
* maxIncomingConnections：最大连接数，默认在100000，相当于不限制，建议不超过2000
```

cat >> /data/mongodb/conf/shard2.conf  <<  EOF

# where to write logging data.
systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/data/shard2/log/shard2.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data/shard2/data
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
       cacheSizeGB: 20
       directoryForIndexes: true
    collectionConfig:
       blockCompressor: zlib
    indexConfig:
       prefixCompression: true
 
# how the process runs
processManagement:
  fork: true 
  pidFilePath: /data/mongodb/data/shard2/log/shard2.pid
 
# network interfaces
net:
  port: 27002
  bindIp: 192.168.14.7,127.0.0.1
  maxIncomingConnections: 1000
#operationProfiling:
replication:
    oplogSizeMB: 20480
    replSetName: shard2
sharding:
    clusterRole: shardsvr
#operationProfiling:
operationProfiling:
   slowOpThresholdMs: 500
   mode: slowOp
security:
  authorization: enabled
  clusterAuthMode: keyFile
  keyFile: /data/mongodb/mongokey/mongodb-keyfile 
  javascriptEnabled: true
setParameter:
  enableLocalhostAuthBypass: true
  authenticationMechanisms: SCRAM-SHA-1
  replWriterThreadCount: 16

EOF

```



##### 启动三个shard2 实例
```
numactl --interleave=all mongod  --config /data/mongodb/conf/shard2.conf
```
```
#出现以下信息则启动成功
2019-11-15T14:12:37.703+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
about to fork child process, waiting until server is ready for connections.
forked process: 3029
child process started successfully, parent exiting
```



##### 登录192.168.14.7 shard2 实例，在此节点进行初始化

```
mongo 127.0.0.1:27002
```
##### 登录mongodshell 之后执行以下命令
use admin
```
use admin
```

```
config = {
    _id : "shard2",
     members : [
         {_id : 0, host : "192.168.14.8:27002",priority:2  },
         {_id : 1, host : "192.168.14.7:27002",priority:3  },
         {_id : 2, host : "192.168.14.6:27002",priority:1  }
     ]
 }

```
执行初始化命令
```
rs.initiate(config);
```
查看集群状态
```
rs.status();
```
为shard集群的设置root密码
```
db.createUser(
 {
 user:"root",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 );

 db.auth("root","Hhwyadmin2018");

 db.createUser(
 {
 user:"admin",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 );

```

#### (三)-(3) 搭建shard3副本集，配置和启动

##### 配置 shard 配置文件

* 192.168.14.6配置后进行初始化，默认谁初始化谁是primary，14.8，14.7 配置文件除了bindIp之外其他一样
* wiredTigerEngineConfigCacheSizeGB：存储引擎使用的最大内存量，如果一个节点只部署一个shard进程，建议设置为物理内存的一半；如果部署多个进程，根据实际情况进行修改
* maxIncomingConnections：最大连接数，默认在100000，相当于不限制，建议不超过2000
```

cat >> /data/mongodb/conf/shard3.conf  <<  EOF

# where to write logging data.
systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/data/shard3/log/shard3.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data/shard3/data
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
       cacheSizeGB: 20
       directoryForIndexes: true
    collectionConfig:
       blockCompressor: zlib
    indexConfig:
       prefixCompression: true
 
# how the process runs
processManagement:
  fork: true 
  pidFilePath: /data/mongodb/data/shard3/log/shard3.pid
 
# network interfaces
net:
  port: 27003
  bindIp: 192.168.14.6,127.0.0.1
  maxIncomingConnections: 1000
#operationProfiling:
replication:
    oplogSizeMB: 20480
    replSetName: shard3
sharding:
    clusterRole: shardsvr
#operationProfiling:
operationProfiling:
   slowOpThresholdMs: 500
   mode: slowOp
security:
  authorization: enabled
  clusterAuthMode: keyFile
  keyFile: /data/mongodb/mongokey/mongodb-keyfile 
  javascriptEnabled: true
setParameter:
  enableLocalhostAuthBypass: true
  authenticationMechanisms: SCRAM-SHA-1
  replWriterThreadCount: 16
  
EOF

```



##### 启动三个shard3 实例
```
numactl --interleave=all mongod  --config /data/mongodb/conf/shard3.conf
```
```
#出现以下信息则启动成功
2019-11-15T14:12:37.703+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
about to fork child process, waiting until server is ready for connections.
forked process: 3029
child process started successfully, parent exiting
```



##### 登录192.168.14.6 shard3 实例，在此节点进行初始化

```
mongo 127.0.0.1:27003
```
##### 登录mongodshell 之后执行以下命令
use admin
```
use admin
```

```
config = {
    _id : "shard3",
     members : [
         {_id : 0, host : "192.168.14.8:27003",priority:2  },
         {_id : 1, host : "192.168.14.7:27003",priority:1  },
         {_id : 2, host : "192.168.14.6:27003",priority:3  }
     ]
 }
```
执行初始化命令
```
rs.initiate(config);
```
查看集群状态
```
rs.status();
```
为shard集群的设置root密码
```
db.createUser(
 {
 user:"root",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 );

 db.auth("root","Hhwyadmin2018");

 db.createUser(
 {
 user:"admin",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 );

```

#### (四) 搭建mongos集群，配置和启动

##### 配置 mongos 配置文件
共三个服务，其他两台除了bindIp需要修改其他完全一样
```
cat >> /data/mongodb/conf/mongos.conf  <<  EOF

systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/data/mongos/log/mongos.log
processManagement:
  fork: true
  pidFilePath: /data/mongodb/data/mongos/log/mongos.pid
 
# network interfaces
net:
  port: 20000
  bindIp: 192.168.14.8,127.0.0.1
  maxIncomingConnections: 2000
#监听的配置服务器,只能有1个或者3个 configs为配置服务器的副本集名字
sharding:
   configDB: config/192.168.14.8:21000,192.168.14.7:21000,192.168.14.6:21000

EOF
```
##### 启动三个mongos 实例

```
mongos  --keyFile    /data/mongodb/mongokey/mongodb-keyfile --config   /data/mongodb/conf/mongos.conf
```


##### 登录mongos任意一台实例

```
mongo 127.0.0.1:20000
```
##### 登录mongodshell 之后执行以下命令
use admin
```
use admin
```

```
db.createUser(
 {
 user:"root",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 )

db.auth("root","Hhwyadmin2018");

db.createUser(
 {
 user:"admin",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "root", db: "admin"}]
 }
 )



```
查看集群状态
```
rs.status();
```

#### (五) 启动分片

##### 登录任意一个mongos 

```
mongo 127.0.0.1:20000
```
```
use admin；
db.auth("root","Hhwyadmin2018");
```

##### 添加分片

```
sh.addShard("shard1/192.168.14.8:27001,192.168.14.7:27001,192.168.14.6:27001");
sh.addShard("shard2/192.168.14.8:27002,192.168.14.7:27002,192.168.14.6:27002");
sh.addShard("shard3/192.168.14.8:27003,192.168.14.7:27003,192.168.14.6:27003");

```

#### 到此所有配置都完成
程序可以直接连接到mongos 20000 端口读取，插入数据


#### 测试

创建分片数据库
```
#创建数据库
use em_database;

#开启分片
sh.enableSharding("em_database");
#创建索引
db.em_real_data_electricity.ensureIndex( { "device" : 1, "ymd" : 1 } );
#创建分片片键
db.runCommand({shardcollection:"em_database.em_real_data_electricity",key:{device:1,ymd:1}});

#创建用户
db.createUser(
 {
 user:"em_admin",
 pwd: "Hhwyadmin2018",
 roles: [{ role: "readWrite", db: "em_database"}]
 }
 )


#测试单条插入
for(var i=0;i<10;i++){db.em_real_data_electricity.insert({device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i})}

#测试批量插入
for(var i=0;i<5000;i++){db.em_real_data_electricity.insertMany([{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i},{device:Math.random()*1000000,ymd:"hahah"+i,value1:i,value2:i,value3:i,value4:i}])}
```

```
db.em_database.stats()
```


### 如果安装错误，则执行下列清空环境命令（清空后需要重新初始化）
```
rm -rf /data/mongodb/data/mongos/log/*
rm -rf /data/mongodb/data/config/log/*
rm -rf /data/mongodb/data/config/data/*
rm -rf /data/mongodb/data/shard1/log/*
rm -rf /data/mongodb/data/shard1/data/*
rm -rf /data/mongodb/data/shard2/log/*
rm -rf /data/mongodb/data/shard2/data/*
rm -rf /data/mongodb/data/shard3/log/*
rm -rf /data/mongodb/data/shard3/data/*
```