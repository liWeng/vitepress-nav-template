### 软件介绍

redis

### 编写人员 



#### 特性

#### 局限性

#### 工作原理

### 安装过程:


1、下载文件
```
mkdir -p /usr/local/
cd /usr/local/
wget http://10.0.1.27/static/download/software/redis5.zip 
unzip redis5.zip
```

如果缺少unzip命令，请先安装unzip

2、生成配置文件，需要按需修改
```
rm -rf /usr/local/redis/redis.conf
cat > /usr/local/redis/redis.conf << EOF
bind 10.0.1.34
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
rename-command FLUSHALL ""
rename-command CONFIG   ""
rename-command EVAL     ""
masterauth "mgf@hhwy"

EOF

```

3、查看配置

```
cat /usr/local/redis/redis.conf |grep -v ^# |grep -v ^$
```

4、配置开机启动    

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




### 安全整改

#### 修改主目录权限(需要验证，修改后导致redis 不能用)
```
chmod  600 /usr/local/redis/
```

####  修改日志和配置文件权限

```
chmod  600 /usr/local/redis/redis.conf
chmod  600 /usr/local/redis/logs/log.log
```
#### 重置命令

```
配置文件添加
rename-command FLUSHALL ""
rename-command CONFIG   ""
rename-command EVAL     ""
```
