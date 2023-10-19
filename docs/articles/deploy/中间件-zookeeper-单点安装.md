### 软件介绍

zookeeper 单点安装

### 编写人员 

贾立鑫

#### 特性

#### 局限性

#### 工作原理

### 名词解释:

### 官方文档:

### 安装过程:
#### 下载安装包
```
mkdir -p /data/software && \
mkdir -p /data/zppkeeper/data && \
mkdir -p /data/zppkeeper/logs && \
mkdir -p /usr/local/zookeeper && \
cd /data/software && \
wget http://www.mgf.show/static/download/software/apache-zookeeper-3.5.8-bin.zip && \
unzip apache-zookeeper-3.5.8-bin.zip && \
mv apache-zookeeper-3.5.8-bin /usr/local/zookeeper
```
#### 修改配置文件 ，
```
将zookeeper/conf/zoo_sample.cfg重命名为zoo.cfg
```
#### 打开后修改为
```
#The number of milliseconds of each tick
tickTime=2000
#The number of ticks that the initial
#synchronization phase can take
initLimit=10
#The number of ticks that can pass between
#sending a request and getting an acknowledgement
syncLimit=5
#the directory where the snapshot is stored.
dataDir=/data/zookeeper/data #需要修改成对应的目录（01，02，03）
dataLogDir=/data/zookeeper/logs #需要修改成对应的目录（01，02，03）
#the port at which the clients will connect
clientPort=2181 

```


启动
```
zkServer start
```
