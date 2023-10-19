### 软件介绍

zookeeper 集群安装

### 编写人员 

贾立鑫

#### 特性

#### 局限性

#### 工作原理

### 名词解释:

### 官方文档:

### 安装过程:

1、jdk配置    
注：如果服务器上已有合适版本JDK，可跳过JDK配置
下载JDK
```
mkdir -p /data/software
cd /data/software
wget http://monitor.mgf.show/static/download/software/jdk-8u261-linux-x64.tar.gz
tar zxvf jdk-8u261-linux-x64.tar.gz
mkdir -p /usr/local/java
mv jdk1.8.0_261 /usr/local/java
```

配置环境变量
```
vi /etc/profile
export JAVA_HOME=/usr/local/java/jdk1.8.0_261
export PATH=$JAVA_HOME/bin:$PATH

source /etc/profile
```

2、下载zookeeper安装包

```
mkdir -p /data/software
cd /data/software
wget http://monitor.mgf.show/static/download/software/apache-zookeeper-3.5.8-bin.tar.gz
tar zxvf apache-zookeeper-3.5.8-bin.tar.gz
mkdir -p /usr/local/zookeeper
mv apache-zookeeper-3.5.8-bin /usr/local/zookeeper
```

3、生成配置文件    
具体IP根据实际服务器修改
```
rm -rf /usr/local/zookeeper/apache-zookeeper-3.5.8-bin/conf/zoo.cfg
cat >> /usr/local/zookeeper/apache-zookeeper-3.5.8-bin/conf/zoo.cfg << EOF
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/data/zookeeper/data
dataLogDir=/data/zookeeper/logs
clientPort=2181

server.1=10.0.5.24:8881:7771
server.2=10.0.5.25:8881:7771
server.3=10.0.5.26:8881:7771

autopurge.purgeInterval=168
autopurge.snapRetainCount=3

EOF

```

配置文件说明

```
tickTime：发送心跳的间隔，单位：毫秒
dataDir：zookeeper保存数据的位置。
clientPort：客户端连接 Zookeeper 服务器的端口
syncLimit：这个配置项标识 Leader 与 Follower 之间发送消息，请求和应答时间长度，最长不能超过多少个 tickTime 的时间长度，总的时间长度就是 2*2000=4 秒
server.A=B：C：D：其中 A 是一个数字，表示这个是第几号服务器；B 是这个服务器的 ip 地址；C 表示的是这个服务器与集群中的 Leader 服务器交换信息的端口；D 表示的是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的 Leader，而这个端口就是用来执行选举时服务器相互通信的端口。如果是伪集群的配置方式，由于 B 都是一样，所以不同的 Zookeeper 实例通信端口号不能一样，所以要给它们分配不同的端口号。

autopurge.purgeInterval： 这个参数指定了清理频率，单位是小时，需要填写一个1或更大的整数，默认是0，表示不开启自己清理功能。
autopurge.snapRetainCount：这个参数和上面的参数搭配使用，这个参数指定了需要保留的文件数目。默认是保留3个
```

创建myid文件在每一个data下面创建一个myid文件(myid没有扩展名) 里边的内容是 server.X=localhost:8881:7771 中配置的X，例如第一个就是1，第二个就是2配置参数解释

```
cd /data/zookeeper/data
echo 1 > myid
```

4、创建文件夹
```
mkdir -p /data/zookeeper/data
mkdir -p /data/zookeeper/logs
```


5、开放防火墙端口    
如果防火墙未启用，可不做设置
```
firewall-cmd --zone=public --add-port=2181/tcp --permanent 
firewall-cmd --zone=public --add-port=7771/tcp --permanent 
firewall-cmd --zone=public --add-port=8881/tcp --permanent 
firewall-cmd --reload
```

6、设置开机启动    

创建服务启动配置，配置中的jdk版本，以及zookeeper版本根据实际路径和版本修改    

```
rm -rf /lib/systemd/system/zookeeper.service
cat >> /lib/systemd/system/zookeeper.service <<EOF

[Unit]
Description=Apache Zookeeper 3.5.8
After=network.target

[Service]
Type=forking
Environment="JAVA_HOME=/usr/local/java/jdk1.8.0_261"
ExecStart=/usr/local/zookeeper/bin/zkServer.sh start
ExecReload=/usr/local/zookeeper/bin/zkServer.sh restart
ExecStop=/usr/local/zookeeper/bin/zkServer.sh stop
PrivateTmp=true

[Install]
WantedBy=multi-user.target

EOF

```

重新加载服务
```
systemctl daemon-reload
```
通过服务方式启动zookeeper
```
systemctl start zookeeper
```

设置开机启动
```
systemctl enable zookeeper
```

查看zookeeper状态
```
systemctl status zookeeper
```

出现enabled字样，表名开机启动设置成功

#### 修改服务日志位置
位置：/usr/local/zookeeper/bin/zkEnv.sh
```启动应用日志配置
#增加配置在第一行
ZOO_LOG_DIR=/data/zookeeper/log/zookeeper-server-logs
```
位置：/usr/local/zookeeper/conf/zoo.cfg
```应用数据日志配置
# 检查应用运行数据日志存放位置
dataLogDir=/data/zookeeper/log/zookeeper-data-logs
#增加日志定期删除处理
# 设置清除时间
autopurge.purgeInterval=48
# 保留个数
autopurge.snapRetainCount=2
```
```log4j.properties
# 滚动记录日志设置

```

#### 题外
如果不需要配置服务方式启动，临时启动使用如下命令，如果已经配置了服务方式启动，则不再使用命令启动
命令启动
```
/usr/local/zookeeper/apache-zookeeper-3.5.8-bin/bin/zkServer.sh start
```


