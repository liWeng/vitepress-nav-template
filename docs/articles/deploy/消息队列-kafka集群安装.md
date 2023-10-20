### 软件介绍
kafka 

### 编写人员 

#### 特性

#### 局限性

#### 工作原理

### 名词解释:

### 官方文档:

### 版本要求
 版本固定：kafka_2.12-2.4.1

### 安装过程:

* 必须安装java1.8及以上
* 必须有zookeeper

### 下载包

```
mkdir -p /usr/local/kafka
mkdir -p /data/software
cd /data/software
wget http://monitor.mgf.show/static/download/software/kafka_2.12-2.4.1.tgz
tar zxvf kafka_2.12-2.4.1.tgz
mv kafka_2.12-2.4.1 /usr/local/kafka
```

#### 配置

#### server.properties
```
# The id of the broker. This must be set to a unique integer for each broker.
broker.id=31 #集群中此id必须唯一，一般取服务器ip地址最后一个段
port=9092    #固定为9092
host.name=10.0.1.31  #服务器IP地址
# A comma separated list of directories under which to store log files
#修改
#log.dirs=/data/kafka/logs # 日志地址
log.dirs=/data/kafka/log/kafka-topic-logs

## 日志清理策略 选择有：delete和compact 主要针对过期数据的处理，或是日志文件达到限制的额度，会被 topic创建时的指定参数覆盖
log.cleanup.policy = delete

## 数据存储的最大时间 超过这个时间 会根据log.cleanup.policy设置的策略处理数据，也就是消费端能够多久去消费数据
## log.retention.bytes和log.retention.minutes任意一个达到要求，都会执行删除，会被topic创建时的指定参数覆盖
log.retention.hours=168
#修改
#zookeeper.connect=zookeeper集群地址 # zookeeper集群地址
zookeeper.connect=10.0.1.31:2181,10.0.1.32:2181,10.0.1.33:2181
#自动创建topic
auto.create.topics.enable=true
#允许删除topic
delete.topic.enable=true
 
## 一个topic ，默认分区的replication个数 ，不得大于集群中broker的个数
default.replication.factor =3
 
## 每个topic的分区个数，若是在topic创建时候没有指定的话 会被topic创建时的指定参数覆盖
num.partitions =4
```
#### 修改服务日志位置

```
$KAFKA_HOME/bin/kafka-run-class.sh 开头位置加上

vi /usr/local/kafka/kafka_2.12-2.4.1/bin/kafka-run-class.sh

LOG_DIR=/data/kafka/log/kafka-server-logs

vi /usr/local/kafka/kafka_2.12-2.4.1/conf/log4j.properties 
配置文件里面 TRACE 全部替换为 INFO
```



#### 集群设置
```
在一台机器上配置完毕server.properties后，分发到集群其他节点上，并修改broker.id
```
#### 启动

```
1、kafka前台启动
/usr/local/kafka/kafka_2.12-2.4.1/bin/kafka-server-start.sh /usr/local/kafka/kafka_2.12-2.4.1/config/server.properties
2、kafka后台启动，不输出日志
/usr/local/kafka/kafka_2.12-2.4.1/bin/kafka-server-start.sh -daemon  /usr/local/kafka/kafka_2.12-2.4.1/config/server.properties  
```
#### 创建topic

* --replication-factor 　用来设置主题的副本数。每个主题可以有多个副本，副本位于集群中不同的broker上，也就是说副本的数量不能超过broker的数量，否则创建主题时会失败。
* --partitions 分区数，跟消费者数量最好保证一致
```
bin/kafka-topics.sh --create --zookeeper zookeeper集群地址 --replication-factor 1 --partitions 1 --topic test
```

#### 生产测试数据

```
bin/kafka-console-producer.sh --broker-list kafka节点1:9092,kafka节点2:9092,kafka节点3:9092 --topic USER-OPERATE-AUDIT-SERVICE-TOPIC
```

#### 消费者接收数据测试
```
bin/kafka-console-consumer.sh --bootstrap-server kafka节点1:9092,kafka节点2:9092,kafka节点3:9092 --topic USER-OPERATE-AUDIT-SERVICE-TOPIC --from-beginning
```

设置开机启动

创建服务启动配置，配置中的jdk版本，以及kafka版本根据实际路径和版本修改

```
rm -rf /lib/systemd/system/kafka.service
cat >> /lib/systemd/system/kafka.service <<EOF

[Unit]
Description=Kafka 2.12-2.4.1
After=network.target  zookeeper.service

[Service]
Type=simple
Environment="JAVA_HOME=/usr/local/jdk/jdk1.8.0_172"
User=root
Group=root
ExecStart=/usr/local/kafka_2.12-2.4.1/bin/kafka-server-start.sh  /usr/local/kafka_2.12-2.4.1/config/server.properties
ExecStop=/usr/local/kafka_2.12-2.4.1/bin/kafka-server-stop.sh
Restart=on-failure
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target

EOF

```

重新加载服务
```
systemctl daemon-reload
```
通过服务方式启动kafka
```
systemctl start kafka
```

设置开机启动
```
systemctl enable kafka
```

查看kafka状态
```
systemctl status kafka
```

出现enabled字样，表名开机启动设置成功

#### linux定时任务清理  月初清理上上个月的数据
```clear_kafka_logs.sh
rm -rf /usr/local/kafka_2.12-2.4.1/clear_kafka_logs.sh
cat >> /usr/local/kafka_2.12-2.4.1/clear_kafka_logs.sh <<EOF

#!/bin/sh
rm -rf /data/kafka/log/kafka-server-logs/*.log.`date -d "2 month ago" +%Y-%m`*;

EOF
```
```配置定时执行
chmod 777 /usr/local/kafka_2.12-2.4.1/clear_kafka_logs.sh

crontab -e

# 每月执行一次
0 0 1 * * /usr/local/kafka_2.12-2.4.1/clear_kafka_logs.sh
```
