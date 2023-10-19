### 编写人员 

贾立鑫


#### 环境说明

    第一个节点：10.10.10.62 主节点
    第二个节点：10.10.10.63 从节点
    第二个节点：10.10.10.64 从节点

#### 所有节点执行


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
mkdir -p /data/mongodb/conf
mkdir -p /data/mongodb/data
mkdir -p /data/mongodb/log
mkdir -p /data/mongodb/mongokey
```

##### 开启防火墙端口
```
firewall-cmd --zone=public --add-port=27017/tcp --permanent
firewall-cmd --reload
```

##### 下载安装文件
```
mkdir -p /data/software && \
cd /data/software && \
wget http://www.mgf.show/static/download/software/mongodb-linux-x86_64-rhel70-4.0.2.tgz && \
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

##### 生成认证文件(在一台服务器上生成)用来节点之间通信 (主节点操作10.10.10.62)

```
openssl rand -base64 100 >  /data/mongodb/mongokey/mongodb-keyfile
```
复制到其他服务器
```
scp /data/mongodb/mongokey/mongodb-keyfile root@10.10.10.63:/data/mongodb/mongokey/
scp /data/mongodb/mongokey/mongodb-keyfile root@10.10.10.64:/data/mongodb/mongokey/
```
设置权限
```
chmod  600  /data/mongodb/mongokey/mongodb-keyfile
```

##### 主节点10.10.10.62配置文件
```
cat >> /data/mongodb/conf/node.conf  <<  EOF

# where to write logging data.
systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/log/mongod.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
       cacheSizeGB: 10
       directoryForIndexes: true
    collectionConfig:
       blockCompressor: zlib
    indexConfig:
       prefixCompression: true
 
# how the process runs
processManagement:
  fork: true 
  pidFilePath: /data/mongodb/mongod.pid
 
# network interfaces
net:
  port: 27017
  bindIp: 10.10.10.62,127.0.0.1
  maxIncomingConnections: 1000
#operationProfiling:
replication:
    oplogSizeMB: 20480
    replSetName: shard1
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
  replWriterThreadCount: 4
EOF
```

##### 从节点10.10.10.63配置文件
```
cat >> /data/mongodb/conf/node.conf  <<  EOF

# where to write logging data.
systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/log/mongod.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
       cacheSizeGB: 10
       directoryForIndexes: true
    collectionConfig:
       blockCompressor: zlib
    indexConfig:
       prefixCompression: true
 
# how the process runs
processManagement:
  fork: true 
  pidFilePath: /data/mongodb/mongod.pid
 
# network interfaces
net:
  port: 27017
  bindIp: 10.10.10.63,127.0.0.1
  maxIncomingConnections: 1000
#operationProfiling:
replication:
    oplogSizeMB: 20480
    replSetName: shard1
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
  replWriterThreadCount: 4
EOF
```

##### 从节点10.10.10.64配置文件
```
cat >> /data/mongodb/conf/node.conf  <<  EOF

# where to write logging data.
systemLog:
  destination: file
  logAppend: false
  path: /data/mongodb/log/mongod.log
 
# Where and how to store data.
storage:
  dbPath: /data/mongodb/data
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
       cacheSizeGB: 10
       directoryForIndexes: true
    collectionConfig:
       blockCompressor: zlib
    indexConfig:
       prefixCompression: true
 
# how the process runs
processManagement:
  fork: true 
  pidFilePath: /data/mongodb/mongod.pid
# network interfaces
net:
  port: 27017
  bindIp: 10.10.10.64,127.0.0.1
  maxIncomingConnections: 1000
#operationProfiling:
replication:
    oplogSizeMB: 20480
    replSetName: shard1
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
  replWriterThreadCount: 4
EOF
```

##### 启动所有节点，所有节点依次执行
```
numactl --interleave=all mongod  --config /data/mongodb/conf/node.conf
```

```
#出现以下信息则启动成功
2019-11-15T14:12:37.703+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
about to fork child process, waiting until server is ready for connections.
forked process: 3029
child process started successfully, parent exiting
```

##### 登录第一个节点执行初始化（10.10.10.62）
```
mongo 127.0.0.1:27017
```
##### 登录mongodshell 之后执行以下命令

```
use admin
```

```
config = {
    _id : "shard1",
     members : [
         {_id : 0, host : "10.10.10.62:27017",priority:3 },
         {_id : 1, host : "10.10.10.63:27017",priority:2 },
         {_id : 2, host : "10.10.10.64:27017",priority:1 }
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
 pwd: "Hhwyadmin2021",
 roles: [{ role: "root", db: "admin"}]
 }
 );

 db.auth("root","Hhwyadmin2021");

 db.createUser(
 {
 user:"admin",
 pwd: "Hhwyadmin2021",
 roles: [{ role: "root", db: "admin"}]
 }
 );

db.createUser({user:'mongospring',pwd:'mongospring@admin',roles:[{role:"readWrite",db:"mongospring"}]});
```

### 如果安装错误，则执行下列清空环境命令
```
rm -rf /data/mongodb/conf/*
rm -rf /data/mongodb/data/*
rm -rf /data/mongodb/log/*
rm -rf /data/mongodb/mongokey/*

```
