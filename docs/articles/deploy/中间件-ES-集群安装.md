### 软件介绍

elasticsearch 集群安装

### 编写人员 

贾立鑫

#### 特性

ES各种节点的分工
* 1. 客户端节点
   当主节点和数据节点配置都设置为false的时候，该节点只能处理路由请求，处理搜索，分发索引操作等，从本质上来说该客户节点表现为智能负载平衡器。独立的客户端节点在一个比较大的集群中是非常有用的，他协调主节点和数据节点，客户端节点加入集群可以得到集群的状态，根据集群的状态可以直接路由请求。

* 2. 数据节点
   数据节点主要是存储索引数据的节点，主要对文档进行增删改查操作，聚合操作等。数据节点对cpu，内存，io要求较高， 在优化的时候需要监控数据节点的状态，当资源不够的时候，需要在集群中添加新的节点。

* 3. 主节点
   主资格节点的主要职责是和集群操作相关的内容，如创建或删除索引，跟踪哪些节点是群集的一部分，并决定哪些分片分配给相关的节点。稳定的主节点对集群的健康是非常重要的，默认情况下任何一个集群中的节点都有可能被选为主节点，索引数据和搜索查询等操作会占用大量的cpu，内存，io资源，为了确保一个集群的稳定，分离主节点和数据节点是一个比较好的选择。

* 4. 建议
在一个生产集群中我们可以对这些节点的职责进行划分，建议集群中设置3台以上的节点作为master节点，这些节点只负责成为主节点，维护整个集群的状态。再根据数据量设置一批data节点，这些节点只负责存储数据，后期提供建立索引和查询索引的服务，这样的话如果用户请求比较频繁，这些节点的压力也会比较大，所以在集群中建议再设置一批client节点(node.master: false node.data: false)，这些节点只负责处理用户请求，实现请求转发，负载均衡等功能。

#### 局限性

#### 工作原理

### 名词解释:

### 官方文档:

es 调优
```
https://www.cnblogs.com/xibuhaohao/p/11660284.html
```

### 安装过程:

安装服务器为
* 10.0.1.24
* 10.0.1.25
* 10.0.1.26

### 所有服务器均需安装



#### 下载ES

```
mkdir -p /data/software/
mkdir -p /data/elasticsearch/datas
mkdir -p /data/elasticsearch/logs
mkdir -p /data/elasticsearch/tmp

cd /data/software/
wget http://www.mgf.show/static/download/software/elasticsearch-7.13.0-linux-x86_64.tar.gz
tar zxvf elasticsearch-7.13.0-linux-x86_64.tar.gz
mkdir -p /usr/local/elasticsearch
mv elasticsearch-7.13.0 /usr/local/elasticsearch
```


##### 设置环境变量
```
vi /etc/profile

ulimit -u 65536
ulimit -n 65536
ulimit -d unlimited
ulimit -m unlimited
ulimit -s unlimited
ulimit -t unlimited
ulimit -v unlimited

export JAVA_HOME=/usr/local/elasticsearch/elasticsearch-7.13.0/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

##### 开放防火墙端口

```
firewall-cmd --zone=public --add-port=9200/tcp --permanent 
firewall-cmd --zone=public --add-port=9300/tcp --permanent 
firewall-cmd --reload
```

##### 内存优化
```

rm -rf /etc/sysctl.conf
cat >>/etc/sysctl.conf <<EOF
fs.file-max=655360
vm.max_map_count=655360
EOF

sysctl -p
```

#### 写调优
```
调优索引写入速率
Index调优

index.refresh_interval: 5s    索引速率与搜索实时直接的平衡

index.translog.flush_threshold_ops: 50000    事务日志的刷新间隔，适当增大可降低磁盘IO

indices.store.throttle.max_bytes_per_sec: 100mb    当磁盘IO比较充足，可增大索引合并的限流值
```

##### jvm 参数

```
rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/jvm.options
cat >>/usr/local/elasticsearch/elasticsearch-7.13.0/config/jvm.options <<EOF
-Xms4g
-Xmx4g

8-13:-XX:+UseConcMarkSweepGC
8-13:-XX:CMSInitiatingOccupancyFraction=75
8-13:-XX:+UseCMSInitiatingOccupancyOnly


14-:-XX:+UseG1GC
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=data
-XX:ErrorFile=/data/elasticsearch/logs/hs_err_pid%p.log

8:-XX:+PrintGCDetails
8:-XX:+PrintGCDateStamps
8:-XX:+PrintTenuringDistribution
8:-XX:+PrintGCApplicationStoppedTime
8:-Xloggc:logs/gc.log
8:-XX:+UseGCLogFileRotation
8:-XX:NumberOfGCLogFiles=32
8:-XX:GCLogFileSize=64m

9-:-Xlog:gc*,gc+age=trace,safepoint:file=logs/gc.log:utctime,pid,tags:filecount=32,filesize=64m

EOF

```

##### 10.0.1.24 配置文件

```
rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml
cat >>/usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml <<EOF
# es-7.13.0-node-1
cluster.name: search-7.13.0
node.name: node-1
node.master: true
node.data: true
node.ingest: false
network.host: 0.0.0.0
http.port: 9200
transport.port: 9300
discovery.seed_hosts: ["10.0.1.24","10.0.1.25","10.0.1.26"]
cluster.initial_master_nodes: ["node-1"]
path.data: /data/elasticsearch/datas
path.logs: /data/elasticsearch/logs
EOF


```

#####  10.0.1.25 配置文件

```
rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml
cat >>/usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml <<EOF
# es-7.13.0-node-2
cluster.name: search-7.13.0
node.name: node-2
node.master: true
node.data: true
node.ingest: false
network.host: 0.0.0.0
http.port: 9200
transport.port: 9300
discovery.seed_hosts: ["10.0.1.24","10.0.1.25","10.0.1.26"]
path.data: /data/elasticsearch/datas
path.logs: /data/elasticsearch/logs
EOF
```

#####  10.0.1.26 配置文件

```
rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml
cat >>/usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml <<EOF
# es-7.13.0-node-3
cluster.name: search-7.13.0
node.name: node-3
node.master: true
node.data: true
node.ingest: false
network.host: 0.0.0.0
http.port: 9200
transport.port: 9300
discovery.seed_hosts: ["10.0.1.24","10.0.1.25","10.0.1.26"]
path.data: /data/elasticsearch/datas
path.logs: /data/elasticsearch/logs

EOF
```

#### 创建用户

```
groupadd elasticsearch && useradd -r -g elasticsearch elasticsearch
chown -R elasticsearch:elasticsearch /data/elasticsearch
chown -R elasticsearch:elasticsearch /usr/local/elasticsearch/
```

#### 创建服务文件

```
rm -rf /lib/systemd/system/elasticsearch.service 
cat >> /lib/systemd/system/elasticsearch.service <<EOF
[Unit]
Description=elasticsearch 7.1
After=network.target

[Service]
#Type=forking
Type=simple
PIDFile=/var/run/elasticsearch_9200.pid
User=elasticsearch
Group=elasticsearch
LimitNOFILE=65536
LimitNPROC=4096
LimitAS=infinity
StandardOutput=journal
StandardError=inherit
ExecStart=/usr/local/elasticsearch/elasticsearch-7.13.0/bin/elasticsearch
Restart=always
ExecReload=/bin/kill -s HUP 
ExecStop=/bin/kill -s QUIT 
PrivateTmp=true
[Install]
WantedBy=multi-user.target

EOF
```


重新加载redis服务的配置文件
```
systemctl daemon-reload
```

启动redis服务
```
systemctl start elasticsearch
```

设置redis服务开机自启动
```
systemctl enable elasticsearch
```
