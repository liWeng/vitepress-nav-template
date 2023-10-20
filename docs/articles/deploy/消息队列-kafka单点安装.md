### 软件介绍
kafka 

### 编写人员 

贾立鑫

#### 特性

#### 局限性

#### 工作原理

### 名词解释:

### 官方文档:


### 安装过程:

* 必须安装java
* 必须有zookeeper

#### 配置

#### server.properties
```
log.dirs=/usr/local/kafka/logs
zookeeper.connect=192.168.26.51:2181
```

#### 启动

```
./bin/kafka-server-start.sh -daemon  ./config/server.properties
```
#### 创建topic

* --replication-factor 　用来设置主题的副本数。每个主题可以有多个副本，副本位于集群中不同的broker上，也就是说副本的数量不能超过broker的数量，否则创建主题时会失败。
* --partitions 分区数，跟消费者数量最好保证一致
```
bin/kafka-topics.sh --create --zookeeper 192.168.26.51:2181 --replication-factor 1 --partitions 1 --topic unifyUSER-OPERATE-AUDIT-SERVICE-TOPIC
```

#### 生产测试数据

```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic USER-OPERATE-AUDIT-SERVICE-TOPIC
```

#### 消费者接收数据测试
```
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic USER-OPERATE-AUDIT-SERVICE-TOPIC --from-beginning
```