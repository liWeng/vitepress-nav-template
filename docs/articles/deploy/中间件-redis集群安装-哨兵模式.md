## redis集群部署 - 哨兵模式（sentinel）
    


### 编译安装redis服务


1、下载或手动上传并解压服务包

```
cd /data/software &&
wget http://mgf.show/static/download/software/redis-5.0.5.tar.gz &&
tar -zxvf redis-5.0.5.tar.gz
```

2、安装gcc支持    
centos7使用
```
yum -y install gcc
```
OpenEuler或CentOS 8使用
```
dnf -y install gcc
```

3、进入目录，编译源码
```
cd redis-5.0.5 &&
make MALLOC=libc
```


4、编译完成会有如下提示(以下内容直接取最后几行内容)
```
    INSTALL redis-check-rdb
    INSTALL redis-check-aof

Hint: It's a good idea to run 'make test' ;)

make[1]: 离开目录“/data/software/redis-5.0.5/src”
```

说明：如果编译失败，直接跳过4、5步骤，使用下载编译后的文件进行部署

5、创建对应目录，复制对应文件到指定目录
```
mkdir -p /usr/local/redis/bin &&
mkdir -p /usr/local/redis/tmp &&
cp /data/software/redis-5.0.5/src/redis-sentinel /usr/local/redis/bin &&
cp /data/software/redis-5.0.5/src/redis-server /usr/local/redis/bin &&
cp /data/software/redis-5.0.5/src/redis-cli /usr/local/redis/bin &&
cp /data/software/redis-5.0.5/src/redis-check-aof /usr/local/redis/bin &&
cp /data/software/redis-5.0.5/src/redis-benchmark /usr/local/redis/bin &&
cp /data/software/redis-5.0.5/redis.conf /usr/local/redis/ &&
cp /data/software/redis-5.0.5/sentinel.conf /usr/local/redis/
```

### 使用编译过的程序部署
下载程序包

```
wget http://mgf.show/static/download/software/redis5.zip
```

解压
```
unzip redis5.zip
mv redis5 /usr/local/redis
```

修改执行权限
```
cd /usr/local/redis
chmod +x bin/*
```



### 配置主从节点
1、修改主节点 redis.conf，记得修改bind 10.0.5.21配置为实际IP配置

```
rm -rf /usr/local/redis/redis.conf
cat > /usr/local/redis/redis.conf << EOF
bind 10.0.5.21
protected-mode no
port 6379
tcp-backlog 511
timeout 300
tcp-keepalive 300
daemonize yes
supervised no
pidfile "/var/run/redis_6379.pid"
loglevel notice
logfile "/usr/local/redis/redis.log"
databases 16
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error no
rdbcompression yes
rdbchecksum yes
dbfilename "dump.rdb"
dir "/usr/local/redis"
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-diskless-sync-delay 5
repl-disable-tcp-nodelay no
replica-priority 100
requirepass "mgf@hhwy"
maxclients 10000
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
appendonly no
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
masterauth "mgf@hhwy"
EOF

```

2、修改其他从节点的redis.conf    
将其余从节点配置文件的中bind IP 以及 replicaof 10.0.5.21 6379    
说明：replicaof 后面配置为主节点IP及端口

```
rm -rf /usr/local/redis/redis.conf
cat > /usr/local/redis/redis.conf << EOF
bind 10.0.5.22
protected-mode no
port 6379
tcp-backlog 511
timeout 300
tcp-keepalive 300
daemonize yes
supervised no
pidfile "/var/run/redis_6379.pid"
loglevel notice
logfile ""
databases 16
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename "dump.rdb"
dir "/usr/local/redis"
masterauth "mgf@hhwy"
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-diskless-sync-delay 5
repl-disable-tcp-nodelay no
replica-priority 100
requirepass "mgf@hhwy"
maxclients 10000
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
appendonly no
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
replicaof 10.0.5.21 6379

EOF

```

3、开启防火墙端口    
默认6379，可根据实际修改    
注：如果防火墙服务未启用，可忽略该步骤
```
firewall-cmd --zone=public --add-port=6379/tcp --permanent 
firewall-cmd --reload

```

4、启动主从节点    
将所有节点上redis-server启动，按照先主后从顺序启动
```
/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
```

5、验证服务
```
/usr/local/redis/bin/redis-cli -h 10.0.5.21
auth mgf@hhwy
info
```

6、配置开机启动    

配置开机启动前，检查SELinux是否已关闭，如未关闭，可能会导致systemctl启动服务失败，临时关闭使用setenforce 0,永久关闭编辑配置文件后重启    
如果是使用命令启动的服务，在配置前先将服务停掉，可使用ps -ef | grep redis查看进程PID，通过kill PID关闭服务    
创建服务启动配置，service中的配置根据实际路径修改

```
rm -rf /lib/systemd/system/redis.service 
cat >> /lib/systemd/system/redis.service <<EOF
[Unit]
Description=Redis 5
After=network.target

[Service]
Type=forking
PIDFile=/var/run/redis_6379.pid
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
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
systemctl start redis
```

设置redis服务开机自启动
```
systemctl enable redis
```


### 哨兵配置
1、创建配置文件，修改相应主节点配置
```
rm -rf /usr/local/redis/sentinel.conf
cat > /usr/local/redis/sentinel.conf << EOF
daemonize yes
port 26379
pidfile "/usr/local/redis/redis-sentinel.pid"
logfile ""
protected-mode no
dir "/usr/local/redis/tmp"
sentinel deny-scripts-reconfig yes
sentinel monitor master01 10.0.5.21 6379 2
sentinel down-after-milliseconds master01 5000
sentinel failover-timeout master01 18000
sentinel auth-pass master01 mgf@hhwy
sentinel config-epoch master01 210
sentinel leader-epoch master01 212

EOF

```
注意：``` sentinel monitor 集群名称 主节点IP ``` 后面的IP配置主节点IP

2、开启防火墙端口    
默认26379，可根据实际修改    
注：如果防火墙服务未启用，可忽略该步骤
```
firewall-cmd --zone=public --add-port=26379/tcp --permanent 
firewall-cmd --reload
```


4、启动哨兵
```
/usr/local/redis/bin/redis-sentinel /usr/local/redis/sentinel.conf
```


验证哨兵
```
/usr/local/redis/bin/redis-cli -h 10.0.5.21 -p 26379
```


5、配置开机启动    
配置开机启动前，检查SELinux是否已关闭，如未关闭，可能会导致systemctl启动服务失败，临时关闭使用setenforce 0,永久关闭编辑配置文件后重启    
如果是使用命令启动的服务，在配置前先将服务停掉，可使用ps -ef | grep redis-sentinel查看进程PID，通过kill PID关闭服务    
创建服务启动配置，service中的配置根据实际路径修改
```
rm -rf /lib/systemd/system/redis-sentinel.service  
cat >> /lib/systemd/system/redis-sentinel.service <<EOF
[Unit]
Description=Redis-sentinel
After=network.target redis.service

[Service]
Type=forking
PIDFile=/var/run/redis-sentinel.pid
ExecStart=/usr/local/redis/bin/redis-sentinel /usr/local/redis/sentinel.conf
ExecReload=/bin/kill -s HUP 
ExecStop=/bin/kill -s QUIT 
PrivateTmp=true

[Install]
WantedBy=multi-user.target

EOF

```

重新加载redis哨兵服务的配置文件
```
systemctl daemon-reload
```

启动redis哨兵服务
```
systemctl start redis-sentinel
```

设置redis哨兵服务开机自启动
```
systemctl enable redis-sentinel
```

### 常见问题
1、编译异常    
  1)缺少相关类库，查找并安装    
  2)如果类库不好处理，可以直接使用编译好的直接部署    
2、使用服务方式启动异常    
  1)检查SELinux是否关闭    
  2)检查启动命令路径或参数是否有误

