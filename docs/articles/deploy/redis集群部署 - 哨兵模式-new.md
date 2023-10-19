## redis集群部署 - 哨兵模式（sentinel）
    
### 编译安装redis服务

下载并解压服务包redis-5.0.5.tar.gz

```
cd /data/software &&
wget http://mgf.show/static/download/software/redis-5.0.5.tar.gz &&
tar -zxvf redis-5.0.5.tar.gz
```

### 进入目录，编译源码
```
cd redis-5.0.5 &&
make
```

如果出现以下错误，需要安装gcc
```
make[3]: 进入目录“/data/software/redis-5.0.5/deps/hiredis”
gcc -std=c99 -pedantic -c -O3 -fPIC  -Wall -W -Wstrict-prototypes -Wwrite-strings -g -ggdb  net.c
make[3]: gcc：命令未找到
make[3]: *** [net.o] 错误 127
make[3]: 离开目录“/data/software/redis-5.0.5/deps/hiredis”
make[2]: *** [hiredis] 错误 2
make[2]: 离开目录“/data/software/redis-5.0.5/deps”
make[1]: [persist-settings] 错误 2 (忽略)
    CC adlist.o
/bin/sh: cc: 未找到命令
```
安装gcc
```
yum -y install gcc
```

如果提示致命错误：jemalloc/jemalloc.h：没有那个文件或目录，则需要指定下追加参数MALLOC=libc
```
cd /data/software/redis-5.0.5 &&
make MALLOC=libc
```

编译完成会有如下提示(以下内容直接取最后几行内容)
```
    INSTALL redis-check-rdb
    INSTALL redis-check-aof

Hint: It's a good idea to run 'make test' ;)

make[1]: 离开目录“/data/software/redis-5.0.5/src”
```

### 创建对应目录，复制对应文件到指定目录
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

## redis.conf


### 主节点 redis.conf
```
#--主节点
#绑定IP
bind 10.20.10.64

#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接
protected-mode no

#监听端口号，默认为6379，如果设为0，redis将不在socket 上监听任何客户端连接
port 6379

#TCP监听的最大容纳数量，在高并发的环境下，需要把这个值调高以避免客户端连接缓慢的问题。Linux 内核会把这个值缩小成/proc/sys/net/core/somaxconn对应的值，要提升并发量需要修改这两个值才能达到目的
tcp-backlog 511

#指定在一个 client 空闲多少秒之后关闭连接（0表示永不关闭）
timeout 300

#单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测
tcp-keepalive 300

#默认情况下redis不是作为守护进程运行的，后台运行时改成 yes。当redis作为守护进程运行的时候，它会写一个pid 到 /var/run/redis.pid 文件里面
daemonize yes

#可以通过upstart和systemd管理Redis守护进程
#选项：
#   supervised no - 没有监督互动
#   supervised upstart - 通过将Redis置于SIGSTOP模式来启动信号
#   supervised systemd - signal systemd将READY = 1写入$ NOTIFY_SOCKET
#   supervised auto - 检测upstart或systemd方法基于 UPSTART_JOB或NOTIFY_SOCKET环境变量
#
supervised no

#配置PID文件路径，当redis作为守护进程运行的时候，它会把 pid 默认写到 /var/run/redis_6379.pid 文件里面
pidfile "/var/run/redis_6379.pid"

#定义日志级别。
#  可以是下面的这些值：
#  debug（记录大量日志信息，适用于开发、测试阶段）
#  verbose（较多日志信息）
#  notice（适量日志信息，使用于生产环境）
#  warning（仅有部分重要、关键信息才会被记录）
loglevel notice

#日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null
logfile ""

# To enable logging to the system logger, just set 'syslog-enabled' to yes,
# and optionally update the other syslog parameters to suit your needs.
# syslog-enabled no

# Specify the syslog identity.
# syslog-ident redis

# Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.
# syslog-facility local0

#设置数据库的数目。默认的数据库是DB 0 ，可以在每个连接上使用select  <dbid> 命令选择一个不同的数据库，dbid是一个介于0到databases - 1 之间的数值。
databases 16

#存 DB 到磁盘：
#    格式：save <间隔时间（秒）> <写入次数>
#    根据给定的时间间隔和写入次数将数据保存到磁盘
#    下面的例子的意思是：
#    900 秒内如果至少有 1 个 key 的值变化，则保存
#    300 秒内如果至少有 10 个 key 的值变化，则保存
#    60 秒内如果至少有 10000 个 key 的值变化，则保存
# 　　
#    注意：你可以注释掉所有的 save 行来停用保存功能。
#    也可以直接一个空字符串来实现停用：
#    save ""
save 900 1
save 300 10
save 60 10000

#如果用户开启了RDB快照功能，那么在redis持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。
# 这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。
# 如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。
# 如果下一次RDB持久化成功，redis会自动恢复接受写请求。
# 如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能，
# 以便在快照写入失败时，也能确保redis继续接受新的写请求。
stop-writes-on-bgsave-error yes

#对于存储到磁盘中的快照，可以设置是否进行压缩存储。
#  如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，
#  可以设置为关闭此功能，但是存储在磁盘上的快照会比较大。
rdbcompression yes

#在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，
#  如果希望获取到最大的性能提升，可以关闭此功能。
rdbchecksum yes

#设置快照的文件名
dbfilename "dump.rdb"

#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名
dir "/usr/local/redis"

################################# REPLICATION #################################

# Master-Replica replication. Use replicaof to make a Redis instance a copy of
# another Redis server. A few things to understand ASAP about Redis replication.
#
#   +------------------+      +---------------+
#   |      Master      | ---> |    Replica    |
#   | (receive writes) |      |  (exact copy) |
#   +------------------+      +---------------+
#1) Redis复制是异步的，但你可以配置一个主停止接受写，如果它似乎没有连接至少给定数量的副本。
#2)如果复制链接丢失的时间相对较短，Redis副本可以与主服务器进行部分重新同步。您可能希望根据自己的需要配置复制积压大小(请参阅此文件的下一部分)。
#3)复制是自动的，不需要用户干预。在网络分区之后，副本会自动尝试重新连接主分区并与它们重新同步。
# 主从复制，使用 slaveof 来让一个 redis 实例成为另一个reids 实例的副本，默认关闭
# 注意这个只需要在 slave 上配置

masterauth "123456"

#当一个 slave 与 master 失去联系，或者复制正在进行的时候，
#  slave 可能会有两种表现：
#  1) 如果为 yes ，slave 仍然会应答客户端请求，但返回的数据可能是过时，
#     或者数据可能是空的在第一次同步的时候
#  2) 如果为 no ，在你执行除了 info he salveof 之外的其他命令时，
#     slave 都将返回一个 "SYNC with master in progress" 的错误
replica-serve-stale-data yes

#你可以配置一个 slave 实体是否接受写入操作。
#  通过写入操作来存储一些短暂的数据对于一个 slave 实例来说可能是有用的，
#  因为相对从 master 重新同步数而言，据数据写入到 slave 会更容易被删除。
#  但是如果客户端因为一个错误的配置写入，也可能会导致一些问题。
#  从 redis 2.6 版起，默认 slaves 都是只读的。
replica-read-only yes

#主从数据复制是否使用无硬盘复制功能。
#  新的从站和重连后不能继续备份的从站，需要做所谓的“完全备份”，即将一个RDB文件从主站传送到从站。
#  这个传送有以下两种方式：
#  1）硬盘备份：redis主站创建一个新的进程，用于把RDB文件写到硬盘上。过一会儿，其父进程递增地将文件传送给从站。
#  2）无硬盘备份：redis主站创建一个新的进程，子进程直接把RDB文件写到从站的套接字，不需要用到硬盘。
#  在硬盘备份的情况下，主站的子进程生成RDB文件。一旦生成，多个从站可以立即排成队列使用主站的RDB文件。
#  在无硬盘备份的情况下，一次RDB传送开始，新的从站到达后，需要等待现在的传送结束，才能开启新的传送。
#  如果使用无硬盘备份，主站会在开始传送之间等待一段时间（可配置，以秒为单位），希望等待多个子站到达后并行传送。
#  在硬盘低速而网络高速（高带宽）情况下，无硬盘备份更好。
repl-diskless-sync no

#当启用无硬盘备份，服务器等待一段时间后才会通过套接字向从站传送RDB文件，这个等待时间是可配置的。
#  这一点很重要，因为一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次RDB传送。因此服务器等待一段
#  时间以期更多的从站到达。
#  延迟时间以秒为单位，默认为5秒。要关掉这一功能，只需将它设置为0秒，传送会立即启动。
repl-diskless-sync-delay 5

#同步后在复制套接字上禁用TCP_NODELAY ?
#如果你选择“是”Redis将使用更少的TCP数据包和更少的带宽发送数据副本。
#但是这可能会增加数据在副本端出现的延迟，在使用默认配置的Linux内核中，延迟高达40毫秒。
#如果选择“no”，数据在复制端出现的延迟将会减少，但复制将使用更多的带宽。
#默认情况下，我们优化的是低延迟，但在流量非常大的情况下，或者当主服务器和副本之间有很多跳距时，将其转换为“yes”可能是一个好主意。
repl-disable-tcp-nodelay no

#副本优先级是由Redis在INFO输出中发布的一个整数。
#它被Redis哨兵用来选择一个副本提升为一个master，如果master不再正常工作。
#优先级较低的副本被认为更适合升级，因此，例如，如果有三个优先级为10,10025的副本，Sentinel将选择优先级为10的副本，即优先级最低的副本。
#但是，如果优先级为0，则表示该副本不能执行master的角色，因此Redis Sentinel将永远不会选择优先级为0的副本进行升级。
#默认情况下，优先级是100。
replica-priority 100

################################## SECURITY ###################################

#设置redis连接密码
requirepass "123456"

################################### CLIENTS ####################################
#设置客户端最大并发连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件
# 描述符数-32（redis server自身会使用一些），如果设置 maxclients为0
# 表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息
maxclients 10000

############################## MEMORY MANAGEMENT ################################

############################# LAZY FREEING ####################################

lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no

############################## APPEND ONLY MODE ###############################

#默认redis使用的是rdb方式持久化，这种方式在许多应用中已经足够用了。但是redis如果中途宕机，
#  会导致可能有几分钟的数据丢失，根据save来策略进行持久化，Append Only File是另一种持久化方式，
#  可以提供更好的持久化特性。Redis会把每次写入的数据在接收后都写入appendonly.aof文件，
#  每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。
appendonly no

#aof文件名
appendfilename "appendonly.aof"

#aof持久化策略的配置
#  no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。
#  always表示每次写入都执行fsync，以保证数据同步到磁盘。
#  everysec表示每秒执行一次fsync，可能会导致丢失这1s数据
appendfsync everysec

#在aof重写或者写入rdb文件的时候，会执行大量IO，此时对于everysec和always的aof模式来说，
#   执行fsync会造成阻塞过长时间，no-appendfsync-on-rewrite字段设置为默认设置为no。
#   如果对延迟要求很高的应用，这个字段可以设置为yes，否则还是设置为no，这样对持久化特性来说这是更安全的选择。
#   设置为yes表示rewrite期间对新写操作不fsync,暂时存在内存中,等rewrite完成后再写入，默认为no，建议yes。
#   Linux的默认fsync策略是30秒。可能丢失30秒数据。
no-appendfsync-on-rewrite no

#aof自动重写配置，当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，
#  即当aof文件增长到一定大小的时候，Redis能够调用bgrewriteaof对日志文件进行重写。
#  当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。
auto-aof-rewrite-percentage 100

#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
auto-aof-rewrite-min-size 64mb

#aof文件可能在尾部是不完整的，当redis启动的时候，aof文件的数据被载入内存。
#  重启可能发生在redis所在的主机操作系统宕机后，尤其在ext4文件系统没有加上data=ordered选项，出现这种现象
#  redis宕机或者异常终止不会造成尾部不完整现象，可以选择让redis退出，或者导入尽可能多的数据。
#  如果选择的是yes，当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。
#  如果是no，用户必须手动redis-check-aof修复AOF文件才可以。
aof-load-truncated yes

#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
aof-use-rdb-preamble yes

################################ LUA SCRIPTING  ###############################

# 如果达到最大时间限制（毫秒），redis会记个log，然后返回error。当一个脚本超过了最大时限。
# 只有SCRIPT KILL和SHUTDOWN NOSAVE可以用。第一个可以杀没有调write命令的东西。
# 要是已经调用了write，只能用第二个命令杀
lua-time-limit 5000

################################## SLOW LOG ###################################

#slog log是用来记录redis运行中执行比较慢的命令耗时。
#当命令的执行超过了指定时间，就记录在slow log中，slog log保存在内存中，所以没有IO操作。
#执行时间比slowlog-log-slower-than大的请求记录到slowlog里面，单位是微秒，所以1000000就是1秒。
#注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。
slowlog-log-slower-than 10000

#慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。
#只要有足够的内存就行，你可以通过 SLOWLOG RESET 来释放内存
slowlog-max-len 128

#延迟监控功能是用来监控redis中执行比较缓慢的一些操作，用LATENCY打印redis实例在跑命令时的耗时图表。
# 只记录大于等于下边设置的值的操作，0的话，就是关闭监视。
# 默认延迟监控功能是关闭的，如果你需要打开，也可以通过CONFIG SET命令动态设置。
latency-monitor-threshold 0

############################# EVENT NOTIFICATION ##############################

notify-keyspace-events ""

############################### ADVANCED CONFIG ###############################

#hash类型的数据结构在编码上可以使用ziplist和hashtable。
# ziplist的特点就是文件存储(以及内存存储)所需的空间较小,在内容较小时,性能和hashtable几乎一样。
# 因此redis对hash类型默认采取ziplist。如果hash中条目的条目个数或者value长度达到阀值,将会被重构为hashtable。
# 这个参数指的是ziplist中允许存储的最大条目个数，，默认为512，建议为128
hash-max-ziplist-entries 512
#ziplist中允许条目value值最大字节数，默认为64，建议为1024
hash-max-ziplist-value 64
#当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。
#当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，每个值含义如下：
#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb => 1024 bytes）
#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。
#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。
#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）
#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。
list-max-ziplist-size -2

#这个参数表示一个quicklist两端不被压缩的节点个数。
#注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。
#实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。
#参数list-compress-depth的取值含义如下：
#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。
#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。
#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。
#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。
#    依此类推…
#由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。
list-compress-depth 0

#数据量小于等于set-max-intset-entries用intset，大于set-max-intset-entries用set
set-max-intset-entries 512

#数据量小于等于zset-max-ziplist-entries用ziplist，大于zset-max-ziplist-entries用zset
zset-max-ziplist-entries 128
zset-max-ziplist-value 64

#value大小小于等于hll-sparse-max-bytes使用稀疏数据结构（sparse）
#  大于hll-sparse-max-bytes使用稠密的数据结构（dense），一个比16000大的value是几乎没用的，
#  建议的value大概为3000。如果对CPU要求不高，对空间要求较高的，建议设置到10000左右
hll-sparse-max-bytes 3000

#流宏节点的最大大小/项。流数据结构是一个大节点的基数树，其中编码多个项目。使用此配置，可以配置单个节点的字节大小，以及在附加新流项时切换到新节点之前节点可能包含的最大项数。如果将以下设置中的任何一个设置设置为零，则会忽略该限制，因此，可以通过将最大字节设置为0，将最大条目设置为所需的值来设置最大entires限制。
stream-node-max-bytes 4096
stream-node-max-entries 100

#Redis将在每100毫秒时使用1毫秒的CPU时间来对redis的hash表进行重新hash，可以降低内存的使用。
#  当你的使用场景中，有非常严格的实时性需要，不能够接受Redis时不时的对请求有2毫秒的延迟的话，把这项配置为no。
#  如果没有这么严格的实时性要求，可以设置为yes，以便能够尽可能快的释放内存
activerehashing yes

#对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。
#对于normal client，第一个0表示取消hard limit，第二个0和第三个0表示取消soft limit，normal
# client默认取消限制，因为如果没有寻问，他们是不会接收数据的
client-output-buffer-limit normal 0 0 0

#对于slave client和MONITER client，如果client-output-buffer一旦超过256mb，又或者超过64mb持续60秒，那么服务器就会立即断开客户端连接。
client-output-buffer-limit replica 256mb 64mb 60

#对于pubsub client，如果client-output-buffer一旦超过32mb，又或者超过8mb持续60秒，那么服务器就会立即断开客户端连接。
client-output-buffer-limit pubsub 32mb 8mb 60

#redis执行任务的频率为1s除以hz
hz 10

#在aof重写的时候，如果打开了aof-rewrite-incremental-fsync开关，系统会每32MB执行一次fsync。
#  这对于把文件写入磁盘是有帮助的，可以避免过大的延迟峰值
aof-rewrite-incremental-fsync yes

#当redis保存RDB文件时，如果启用以下选项，文件将每生成32mb的数据同步。这对于以更增量的方式将文件提交到磁盘并避免较大的延迟峰值非常有用。
rdb-save-incremental-fsync yes

# Generated by CONFIG REWRITE
```


### 主节点 sentinel.conf
```
#守护进程模式启动
daemonize yes

#绑定端口
port 26379

# When running daemonized, Redis Sentinel writes a pid file in
# /var/run/redis-sentinel.pid by default. You can specify a custom pid file
# location here.
#主线程文件存放位置
pidfile "/var/run/redis-sentinel.pid"

# 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null
logfile "/var/log/redis-sentinel.log"

#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接
protected-mode no

#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名
dir "/usr/local/redis/tmp"

# monitor 监控master IP地址和端口，最后的数字1 是有几个哨兵确认即确认主下线。
sentinel myid 6f21c7c8e9590dd8ddc2a834c279f13b77a34088

sentinel deny-scripts-reconfig yes

#配置主节点IP端口
sentinel monitor master01 10.20.10.64 6379 2

# master或slave多长时间（默认30秒）不能使用后标记为s_down状态。
sentinel down-after-milliseconds master01 5000

#若sentinel在该配置值内未能完成failover操作（即故障时master/slave自动切换），则认为本次failover失败
sentinel failover-timeout master01 18000

#redis密码
sentinel auth-pass master01 123456

# Generated by CONFIG REWRITE
sentinel config-epoch master01 200
sentinel leader-epoch master01 200
sentinel known-replica master01 10.20.10.63 6379
sentinel known-replica master01 10.20.10.63 6380
sentinel known-sentinel master01 10.20.10.63 0 6c6891901598076e551b7efafe02b364f30fd650
sentinel known-sentinel master01 10.20.10.63 26379 88921903e75ec4b42c2281f498a6e8e49ca5b089
sentinel known-sentinel master01 10.20.10.63 26380 c21befa4351ecebea1ed9ea206465d9ce1a23107
sentinel current-epoch 209

```

### 从节点-01 redis.conf
```
#从节点01
#绑定IP
bind 10.20.10.63

#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接
protected-mode no

#监听端口号，默认为6379，如果设为0，redis将不在socket 上监听任何客户端连接
port 6379

#TCP监听的最大容纳数量，在高并发的环境下，需要把这个值调高以避免客户端连接缓慢的问题。Linux 内核会把这个值缩小成/proc/sys/net/core/somaxconn对应的值，要提升并发量需要修改这两个值才能达到目的
tcp-backlog 511

#指定在一个 client 空闲多少秒之后关闭连接（0表示永不关闭）
timeout 300

#单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测
tcp-keepalive 300

#默认情况下redis不是作为守护进程运行的，后台运行时改成 yes。当redis作为守护进程运行的时候，它会写一个pid 到 /var/run/redis.pid 文件里面
daemonize yes

#可以通过upstart和systemd管理Redis守护进程
#选项：
#   supervised no - 没有监督互动
#   supervised upstart - 通过将Redis置于SIGSTOP模式来启动信号
#   supervised systemd - signal systemd将READY = 1写入$ NOTIFY_SOCKET
#   supervised auto - 检测upstart或systemd方法基于 UPSTART_JOB或NOTIFY_SOCKET环境变量
#
supervised no

#配置PID文件路径，当redis作为守护进程运行的时候，它会把 pid 默认写到 /var/run/redis_6379.pid 文件里面
pidfile "/var/run/redis_6379.pid"

#定义日志级别。
#  可以是下面的这些值：
#  debug（记录大量日志信息，适用于开发、测试阶段）
#  verbose（较多日志信息）
#  notice（适量日志信息，使用于生产环境）
#  warning（仅有部分重要、关键信息才会被记录）
loglevel notice

#日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null
logfile "/usr/local/redis/redis.log"

# To enable logging to the system logger, just set 'syslog-enabled' to yes,
# and optionally update the other syslog parameters to suit your needs.
# syslog-enabled no

# Specify the syslog identity.
# syslog-ident redis

# Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.
# syslog-facility local0

#设置数据库的数目。默认的数据库是DB 0 ，可以在每个连接上使用select  <dbid> 命令选择一个不同的数据库，dbid是一个介于0到databases - 1 之间的数值。
databases 16

#存 DB 到磁盘：
#    格式：save <间隔时间（秒）> <写入次数>
#    根据给定的时间间隔和写入次数将数据保存到磁盘
#    下面的例子的意思是：
#    900 秒内如果至少有 1 个 key 的值变化，则保存
#    300 秒内如果至少有 10 个 key 的值变化，则保存
#    60 秒内如果至少有 10000 个 key 的值变化，则保存
# 　　
#    注意：你可以注释掉所有的 save 行来停用保存功能。
#    也可以直接一个空字符串来实现停用：
#    save ""
save 900 1
save 300 10
save 60 10000

#如果用户开启了RDB快照功能，那么在redis持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。
# 这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。
# 如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。
# 如果下一次RDB持久化成功，redis会自动恢复接受写请求。
# 如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能，
# 以便在快照写入失败时，也能确保redis继续接受新的写请求。
stop-writes-on-bgsave-error no

#对于存储到磁盘中的快照，可以设置是否进行压缩存储。
#  如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，
#  可以设置为关闭此功能，但是存储在磁盘上的快照会比较大。
rdbcompression yes

#在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，
#  如果希望获取到最大的性能提升，可以关闭此功能。
rdbchecksum yes

#设置快照的文件名
dbfilename "dump.rdb"

#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名
dir "/usr/local/redis"

################################# REPLICATION #################################

# Master-Replica replication. Use replicaof to make a Redis instance a copy of
# another Redis server. A few things to understand ASAP about Redis replication.
#
#   +------------------+      +---------------+
#   |      Master      | ---> |    Replica    |
#   | (receive writes) |      |  (exact copy) |
#   +------------------+      +---------------+
#1) Redis复制是异步的，但你可以配置一个主停止接受写，如果它似乎没有连接至少给定数量的副本。
#2)如果复制链接丢失的时间相对较短，Redis副本可以与主服务器进行部分重新同步。您可能希望根据自己的需要配置复制积压大小(请参阅此文件的下一部分)。
#3)复制是自动的，不需要用户干预。在网络分区之后，副本会自动尝试重新连接主分区并与它们重新同步。
# 主从复制，使用 slaveof 来让一个 redis 实例成为另一个reids 实例的副本，默认关闭
# 注意这个只需要在 slave 上配置
#replicaof 10.0.11.34 6379

#当一个 slave 与 master 失去联系，或者复制正在进行的时候，
#  slave 可能会有两种表现：
#  1) 如果为 yes ，slave 仍然会应答客户端请求，但返回的数据可能是过时，
#     或者数据可能是空的在第一次同步的时候
#  2) 如果为 no ，在你执行除了 info he salveof 之外的其他命令时，
#     slave 都将返回一个 "SYNC with master in progress" 的错误
replica-serve-stale-data yes

#你可以配置一个 slave 实体是否接受写入操作。
#  通过写入操作来存储一些短暂的数据对于一个 slave 实例来说可能是有用的，
#  因为相对从 master 重新同步数而言，据数据写入到 slave 会更容易被删除。
#  但是如果客户端因为一个错误的配置写入，也可能会导致一些问题。
#  从 redis 2.6 版起，默认 slaves 都是只读的。
replica-read-only yes

#主从数据复制是否使用无硬盘复制功能。
#  新的从站和重连后不能继续备份的从站，需要做所谓的“完全备份”，即将一个RDB文件从主站传送到从站。
#  这个传送有以下两种方式：
#  1）硬盘备份：redis主站创建一个新的进程，用于把RDB文件写到硬盘上。过一会儿，其父进程递增地将文件传送给从站。
#  2）无硬盘备份：redis主站创建一个新的进程，子进程直接把RDB文件写到从站的套接字，不需要用到硬盘。
#  在硬盘备份的情况下，主站的子进程生成RDB文件。一旦生成，多个从站可以立即排成队列使用主站的RDB文件。
#  在无硬盘备份的情况下，一次RDB传送开始，新的从站到达后，需要等待现在的传送结束，才能开启新的传送。
#  如果使用无硬盘备份，主站会在开始传送之间等待一段时间（可配置，以秒为单位），希望等待多个子站到达后并行传送。
#  在硬盘低速而网络高速（高带宽）情况下，无硬盘备份更好。
repl-diskless-sync no

#当启用无硬盘备份，服务器等待一段时间后才会通过套接字向从站传送RDB文件，这个等待时间是可配置的。
#  这一点很重要，因为一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次RDB传送。因此服务器等待一段
#  时间以期更多的从站到达。
#  延迟时间以秒为单位，默认为5秒。要关掉这一功能，只需将它设置为0秒，传送会立即启动。
repl-diskless-sync-delay 5

#同步后在复制套接字上禁用TCP_NODELAY ?
#如果你选择“是”Redis将使用更少的TCP数据包和更少的带宽发送数据副本。
#但是这可能会增加数据在副本端出现的延迟，在使用默认配置的Linux内核中，延迟高达40毫秒。
#如果选择“no”，数据在复制端出现的延迟将会减少，但复制将使用更多的带宽。
#默认情况下，我们优化的是低延迟，但在流量非常大的情况下，或者当主服务器和副本之间有很多跳距时，将其转换为“yes”可能是一个好主意。
repl-disable-tcp-nodelay no

#副本优先级是由Redis在INFO输出中发布的一个整数。
#它被Redis哨兵用来选择一个副本提升为一个master，如果master不再正常工作。
#优先级较低的副本被认为更适合升级，因此，例如，如果有三个优先级为10,10025的副本，Sentinel将选择优先级为10的副本，即优先级最低的副本。
#但是，如果优先级为0，则表示该副本不能执行master的角色，因此Redis Sentinel将永远不会选择优先级为0的副本进行升级。
#默认情况下，优先级是100。
replica-priority 100

################################## SECURITY ###################################

#设置redis连接密码
requirepass "123456"

################################### CLIENTS ####################################
#设置客户端最大并发连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件
# 描述符数-32（redis server自身会使用一些），如果设置 maxclients为0
# 表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息
maxclients 10000

############################## MEMORY MANAGEMENT ################################

############################# LAZY FREEING ####################################

lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no

############################## APPEND ONLY MODE ###############################

#默认redis使用的是rdb方式持久化，这种方式在许多应用中已经足够用了。但是redis如果中途宕机，
#  会导致可能有几分钟的数据丢失，根据save来策略进行持久化，Append Only File是另一种持久化方式，
#  可以提供更好的持久化特性。Redis会把每次写入的数据在接收后都写入appendonly.aof文件，
#  每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。
appendonly no

#aof文件名
appendfilename "appendonly.aof"

#aof持久化策略的配置
#  no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。
#  always表示每次写入都执行fsync，以保证数据同步到磁盘。
#  everysec表示每秒执行一次fsync，可能会导致丢失这1s数据
appendfsync everysec

#在aof重写或者写入rdb文件的时候，会执行大量IO，此时对于everysec和always的aof模式来说，
#   执行fsync会造成阻塞过长时间，no-appendfsync-on-rewrite字段设置为默认设置为no。
#   如果对延迟要求很高的应用，这个字段可以设置为yes，否则还是设置为no，这样对持久化特性来说这是更安全的选择。
#   设置为yes表示rewrite期间对新写操作不fsync,暂时存在内存中,等rewrite完成后再写入，默认为no，建议yes。
#   Linux的默认fsync策略是30秒。可能丢失30秒数据。
no-appendfsync-on-rewrite no

#aof自动重写配置，当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，
#  即当aof文件增长到一定大小的时候，Redis能够调用bgrewriteaof对日志文件进行重写。
#  当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。
auto-aof-rewrite-percentage 100

#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
auto-aof-rewrite-min-size 64mb

#aof文件可能在尾部是不完整的，当redis启动的时候，aof文件的数据被载入内存。
#  重启可能发生在redis所在的主机操作系统宕机后，尤其在ext4文件系统没有加上data=ordered选项，出现这种现象
#  redis宕机或者异常终止不会造成尾部不完整现象，可以选择让redis退出，或者导入尽可能多的数据。
#  如果选择的是yes，当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。
#  如果是no，用户必须手动redis-check-aof修复AOF文件才可以。
aof-load-truncated yes

#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
aof-use-rdb-preamble yes

################################ LUA SCRIPTING  ###############################

# 如果达到最大时间限制（毫秒），redis会记个log，然后返回error。当一个脚本超过了最大时限。
# 只有SCRIPT KILL和SHUTDOWN NOSAVE可以用。第一个可以杀没有调write命令的东西。
# 要是已经调用了write，只能用第二个命令杀
lua-time-limit 5000

################################## SLOW LOG ###################################

#slog log是用来记录redis运行中执行比较慢的命令耗时。
#当命令的执行超过了指定时间，就记录在slow log中，slog log保存在内存中，所以没有IO操作。
#执行时间比slowlog-log-slower-than大的请求记录到slowlog里面，单位是微秒，所以1000000就是1秒。
#注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。
slowlog-log-slower-than 10000

#慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。
#只要有足够的内存就行，你可以通过 SLOWLOG RESET 来释放内存
slowlog-max-len 128

#延迟监控功能是用来监控redis中执行比较缓慢的一些操作，用LATENCY打印redis实例在跑命令时的耗时图表。
# 只记录大于等于下边设置的值的操作，0的话，就是关闭监视。
# 默认延迟监控功能是关闭的，如果你需要打开，也可以通过CONFIG SET命令动态设置。
latency-monitor-threshold 0

############################# EVENT NOTIFICATION ##############################

notify-keyspace-events ""

############################### ADVANCED CONFIG ###############################

#hash类型的数据结构在编码上可以使用ziplist和hashtable。
# ziplist的特点就是文件存储(以及内存存储)所需的空间较小,在内容较小时,性能和hashtable几乎一样。
# 因此redis对hash类型默认采取ziplist。如果hash中条目的条目个数或者value长度达到阀值,将会被重构为hashtable。
# 这个参数指的是ziplist中允许存储的最大条目个数，，默认为512，建议为128
hash-max-ziplist-entries 512
#ziplist中允许条目value值最大字节数，默认为64，建议为1024
hash-max-ziplist-value 64
#当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。
#当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，每个值含义如下：
#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb => 1024 bytes）
#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。
#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。
#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）
#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。
list-max-ziplist-size -2

#这个参数表示一个quicklist两端不被压缩的节点个数。
#注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。
#实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。
#参数list-compress-depth的取值含义如下：
#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。
#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。
#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。
#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。
#    依此类推…
#由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。
list-compress-depth 0

#数据量小于等于set-max-intset-entries用intset，大于set-max-intset-entries用set
set-max-intset-entries 512

#数据量小于等于zset-max-ziplist-entries用ziplist，大于zset-max-ziplist-entries用zset
zset-max-ziplist-entries 128
zset-max-ziplist-value 64

#value大小小于等于hll-sparse-max-bytes使用稀疏数据结构（sparse）
#  大于hll-sparse-max-bytes使用稠密的数据结构（dense），一个比16000大的value是几乎没用的，
#  建议的value大概为3000。如果对CPU要求不高，对空间要求较高的，建议设置到10000左右
hll-sparse-max-bytes 3000

#流宏节点的最大大小/项。流数据结构是一个大节点的基数树，其中编码多个项目。使用此配置，可以配置单个节点的字节大小，以及在附加新流项时切换到新节点之前节点可能包含的最大项数。如果将以下设置中的任何一个设置设置为零，则会忽略该限制，因此，可以通过将最大字节设置为0，将最大条目设置为所需的值来设置最大entires限制。
stream-node-max-bytes 4096
stream-node-max-entries 100

#Redis将在每100毫秒时使用1毫秒的CPU时间来对redis的hash表进行重新hash，可以降低内存的使用。
#  当你的使用场景中，有非常严格的实时性需要，不能够接受Redis时不时的对请求有2毫秒的延迟的话，把这项配置为no。
#  如果没有这么严格的实时性要求，可以设置为yes，以便能够尽可能快的释放内存
activerehashing yes

#对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。
#对于normal client，第一个0表示取消hard limit，第二个0和第三个0表示取消soft limit，normal
# client默认取消限制，因为如果没有寻问，他们是不会接收数据的
client-output-buffer-limit normal 0 0 0

#对于slave client和MONITER client，如果client-output-buffer一旦超过256mb，又或者超过64mb持续60秒，那么服务器就会立即断开客户端连接。
client-output-buffer-limit replica 256mb 64mb 60

#对于pubsub client，如果client-output-buffer一旦超过32mb，又或者超过8mb持续60秒，那么服务器就会立即断开客户端连接。
client-output-buffer-limit pubsub 32mb 8mb 60

#redis执行任务的频率为1s除以hz
hz 10

#在aof重写的时候，如果打开了aof-rewrite-incremental-fsync开关，系统会每32MB执行一次fsync。
#  这对于把文件写入磁盘是有帮助的，可以避免过大的延迟峰值
aof-rewrite-incremental-fsync yes

#当redis保存RDB文件时，如果启用以下选项，文件将每生成32mb的数据同步。这对于以更增量的方式将文件提交到磁盘并避免较大的延迟峰值非常有用。
rdb-save-incremental-fsync yes

# Generated by CONFIG REWRITE
replicaof 10.20.10.64 6379
masterauth "123456"
```

### 从节点-01 sentinel.conf
```
#守护进程模式启动
daemonize yes

#绑定端口
port 26379
# When running daemonized, Redis Sentinel writes a pid file in
# /var/run/redis-sentinel.pid by default. You can specify a custom pid file
# location here.
#主线程文件存放位置
pidfile "/var/run/redis-sentinel.pid"

# 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null
logfile ""

#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接
protected-mode no

#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名
dir "/usr/local/redis/tmp"

# monitor 监控master IP地址和端口，最后的数字1 是有几个哨兵确认即确认主下线。
sentinel myid 88921903e75ec4b42c2281f498a6e8e49ca5b089

sentinel deny-scripts-reconfig yes

#配置主节点IP端口
sentinel monitor master01 10.20.10.64 6379 2

# master或slave多长时间（默认30秒）不能使用后标记为s_down状态。
sentinel down-after-milliseconds master01 5000

#若sentinel在该配置值内未能完成failover操作（即故障时master/slave自动切换），则认为本次failover失败
sentinel failover-timeout master01 18000

#redis密码
sentinel auth-pass master01 123456

# Generated by CONFIG REWRITE
sentinel config-epoch master01 200

sentinel leader-epoch master01 209
sentinel known-replica master01 10.20.10.63 6380
sentinel known-replica master01 10.20.10.63 6379
sentinel known-sentinel master01 10.20.10.63 0 6c6891901598076e551b7efafe02b364f30fd650
sentinel known-sentinel master01 10.20.10.63 c21befa4351ecebea1ed9ea206465d9ce1a23107
sentinel known-sentinel master01 10.20.10.64 26379 6f21c7c8e9590dd8ddc2a834c279f13b77a34088
sentinel current-epoch 209
```

### 从节点-02 redis.conf
```
#从节点-02
#绑定IP
bind 10.20.10.63

#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接
protected-mode no

#监听端口号，默认为6379，如果设为0，redis将不在socket 上监听任何客户端连接
port 6380

#TCP监听的最大容纳数量，在高并发的环境下，需要把这个值调高以避免客户端连接缓慢的问题。Linux 内核会把这个值缩小成/proc/sys/net/core/somaxconn对应的值，要提升并发量需要修改这两个值才能达到目的
tcp-backlog 511

#指定在一个 client 空闲多少秒之后关闭连接（0表示永不关闭）
timeout 300

#单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测
tcp-keepalive 300

#默认情况下redis不是作为守护进程运行的，后台运行时改成 yes。当redis作为守护进程运行的时候，它会写一个pid 到 /var/run/redis.pid 文件里面
daemonize yes

#可以通过upstart和systemd管理Redis守护进程
#选项：
#   supervised no - 没有监督互动
#   supervised upstart - 通过将Redis置于SIGSTOP模式来启动信号
#   supervised systemd - signal systemd将READY = 1写入$ NOTIFY_SOCKET
#   supervised auto - 检测upstart或systemd方法基于 UPSTART_JOB或NOTIFY_SOCKET环境变量
#
supervised no

#配置PID文件路径，当redis作为守护进程运行的时候，它会把 pid 默认写到 /var/run/redis_6379.pid 文件里面
pidfile "/var/run/redis_6380.pid"

#定义日志级别。
#  可以是下面的这些值：
#  debug（记录大量日志信息，适用于开发、测试阶段）
#  verbose（较多日志信息）
#  notice（适量日志信息，使用于生产环境）
#  warning（仅有部分重要、关键信息才会被记录）
loglevel notice

#日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null
logfile ""

# To enable logging to the system logger, just set 'syslog-enabled' to yes,
# and optionally update the other syslog parameters to suit your needs.
# syslog-enabled no

# Specify the syslog identity.
# syslog-ident redis

# Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.
# syslog-facility local0

#设置数据库的数目。默认的数据库是DB 0 ，可以在每个连接上使用select  <dbid> 命令选择一个不同的数据库，dbid是一个介于0到databases - 1 之间的数值。
databases 16

#存 DB 到磁盘：
#    格式：save <间隔时间（秒）> <写入次数>
#    根据给定的时间间隔和写入次数将数据保存到磁盘
#    下面的例子的意思是：
#    900 秒内如果至少有 1 个 key 的值变化，则保存
#    300 秒内如果至少有 10 个 key 的值变化，则保存
#    60 秒内如果至少有 10000 个 key 的值变化，则保存
# 　　
#    注意：你可以注释掉所有的 save 行来停用保存功能。
#    也可以直接一个空字符串来实现停用：
#    save ""
save 900 1
save 300 10
save 60 10000

#如果用户开启了RDB快照功能，那么在redis持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。
# 这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。
# 如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。
# 如果下一次RDB持久化成功，redis会自动恢复接受写请求。
# 如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能，
# 以便在快照写入失败时，也能确保redis继续接受新的写请求。
stop-writes-on-bgsave-error yes

#对于存储到磁盘中的快照，可以设置是否进行压缩存储。
#  如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，
#  可以设置为关闭此功能，但是存储在磁盘上的快照会比较大。
rdbcompression yes

#在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，
#  如果希望获取到最大的性能提升，可以关闭此功能。
rdbchecksum yes

#设置快照的文件名
dbfilename "dump.rdb"

#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名
dir "/usr/local/redis"

################################# REPLICATION #################################

# Master-Replica replication. Use replicaof to make a Redis instance a copy of
# another Redis server. A few things to understand ASAP about Redis replication.
#
#   +------------------+      +---------------+
#   |      Master      | ---> |    Replica    |
#   | (receive writes) |      |  (exact copy) |
#   +------------------+      +---------------+
#1) Redis复制是异步的，但你可以配置一个主停止接受写，如果它似乎没有连接至少给定数量的副本。
#2)如果复制链接丢失的时间相对较短，Redis副本可以与主服务器进行部分重新同步。您可能希望根据自己的需要配置复制积压大小(请参阅此文件的下一部分)。
#3)复制是自动的，不需要用户干预。在网络分区之后，副本会自动尝试重新连接主分区并与它们重新同步。
# 主从复制，使用 slaveof 来让一个 redis 实例成为另一个reids 实例的副本，默认关闭
# 注意这个只需要在 slave 上配置

masterauth "123456"

#当一个 slave 与 master 失去联系，或者复制正在进行的时候，
#  slave 可能会有两种表现：
#  1) 如果为 yes ，slave 仍然会应答客户端请求，但返回的数据可能是过时，
#     或者数据可能是空的在第一次同步的时候
#  2) 如果为 no ，在你执行除了 info he salveof 之外的其他命令时，
#     slave 都将返回一个 "SYNC with master in progress" 的错误
replica-serve-stale-data yes

#你可以配置一个 slave 实体是否接受写入操作。
#  通过写入操作来存储一些短暂的数据对于一个 slave 实例来说可能是有用的，
#  因为相对从 master 重新同步数而言，据数据写入到 slave 会更容易被删除。
#  但是如果客户端因为一个错误的配置写入，也可能会导致一些问题。
#  从 redis 2.6 版起，默认 slaves 都是只读的。
replica-read-only yes

#主从数据复制是否使用无硬盘复制功能。
#  新的从站和重连后不能继续备份的从站，需要做所谓的“完全备份”，即将一个RDB文件从主站传送到从站。
#  这个传送有以下两种方式：
#  1）硬盘备份：redis主站创建一个新的进程，用于把RDB文件写到硬盘上。过一会儿，其父进程递增地将文件传送给从站。
#  2）无硬盘备份：redis主站创建一个新的进程，子进程直接把RDB文件写到从站的套接字，不需要用到硬盘。
#  在硬盘备份的情况下，主站的子进程生成RDB文件。一旦生成，多个从站可以立即排成队列使用主站的RDB文件。
#  在无硬盘备份的情况下，一次RDB传送开始，新的从站到达后，需要等待现在的传送结束，才能开启新的传送。
#  如果使用无硬盘备份，主站会在开始传送之间等待一段时间（可配置，以秒为单位），希望等待多个子站到达后并行传送。
#  在硬盘低速而网络高速（高带宽）情况下，无硬盘备份更好。
repl-diskless-sync no

#当启用无硬盘备份，服务器等待一段时间后才会通过套接字向从站传送RDB文件，这个等待时间是可配置的。
#  这一点很重要，因为一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次RDB传送。因此服务器等待一段
#  时间以期更多的从站到达。
#  延迟时间以秒为单位，默认为5秒。要关掉这一功能，只需将它设置为0秒，传送会立即启动。
repl-diskless-sync-delay 5

#同步后在复制套接字上禁用TCP_NODELAY ?
#如果你选择“是”Redis将使用更少的TCP数据包和更少的带宽发送数据副本。
#但是这可能会增加数据在副本端出现的延迟，在使用默认配置的Linux内核中，延迟高达40毫秒。
#如果选择“no”，数据在复制端出现的延迟将会减少，但复制将使用更多的带宽。
#默认情况下，我们优化的是低延迟，但在流量非常大的情况下，或者当主服务器和副本之间有很多跳距时，将其转换为“yes”可能是一个好主意。
repl-disable-tcp-nodelay no

#副本优先级是由Redis在INFO输出中发布的一个整数。
#它被Redis哨兵用来选择一个副本提升为一个master，如果master不再正常工作。
#优先级较低的副本被认为更适合升级，因此，例如，如果有三个优先级为10,10025的副本，Sentinel将选择优先级为10的副本，即优先级最低的副本。
#但是，如果优先级为0，则表示该副本不能执行master的角色，因此Redis Sentinel将永远不会选择优先级为0的副本进行升级。
#默认情况下，优先级是100。
replica-priority 100

################################## SECURITY ###################################

#设置redis连接密码
requirepass "123456"

################################### CLIENTS ####################################
#设置客户端最大并发连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件
# 描述符数-32（redis server自身会使用一些），如果设置 maxclients为0
# 表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息
maxclients 10000

############################## MEMORY MANAGEMENT ################################

############################# LAZY FREEING ####################################

lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no

############################## APPEND ONLY MODE ###############################

#默认redis使用的是rdb方式持久化，这种方式在许多应用中已经足够用了。但是redis如果中途宕机，
#  会导致可能有几分钟的数据丢失，根据save来策略进行持久化，Append Only File是另一种持久化方式，
#  可以提供更好的持久化特性。Redis会把每次写入的数据在接收后都写入appendonly.aof文件，
#  每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。
appendonly no

#aof文件名
appendfilename "appendonly.aof"

#aof持久化策略的配置
#  no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。
#  always表示每次写入都执行fsync，以保证数据同步到磁盘。
#  everysec表示每秒执行一次fsync，可能会导致丢失这1s数据
appendfsync everysec

#在aof重写或者写入rdb文件的时候，会执行大量IO，此时对于everysec和always的aof模式来说，
#   执行fsync会造成阻塞过长时间，no-appendfsync-on-rewrite字段设置为默认设置为no。
#   如果对延迟要求很高的应用，这个字段可以设置为yes，否则还是设置为no，这样对持久化特性来说这是更安全的选择。
#   设置为yes表示rewrite期间对新写操作不fsync,暂时存在内存中,等rewrite完成后再写入，默认为no，建议yes。
#   Linux的默认fsync策略是30秒。可能丢失30秒数据。
no-appendfsync-on-rewrite no

#aof自动重写配置，当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，
#  即当aof文件增长到一定大小的时候，Redis能够调用bgrewriteaof对日志文件进行重写。
#  当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。
auto-aof-rewrite-percentage 100

#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
auto-aof-rewrite-min-size 64mb

#aof文件可能在尾部是不完整的，当redis启动的时候，aof文件的数据被载入内存。
#  重启可能发生在redis所在的主机操作系统宕机后，尤其在ext4文件系统没有加上data=ordered选项，出现这种现象
#  redis宕机或者异常终止不会造成尾部不完整现象，可以选择让redis退出，或者导入尽可能多的数据。
#  如果选择的是yes，当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。
#  如果是no，用户必须手动redis-check-aof修复AOF文件才可以。
aof-load-truncated yes

#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
aof-use-rdb-preamble yes

################################ LUA SCRIPTING  ###############################

# 如果达到最大时间限制（毫秒），redis会记个log，然后返回error。当一个脚本超过了最大时限。
# 只有SCRIPT KILL和SHUTDOWN NOSAVE可以用。第一个可以杀没有调write命令的东西。
# 要是已经调用了write，只能用第二个命令杀
lua-time-limit 5000

################################## SLOW LOG ###################################

#slog log是用来记录redis运行中执行比较慢的命令耗时。
#当命令的执行超过了指定时间，就记录在slow log中，slog log保存在内存中，所以没有IO操作。
#执行时间比slowlog-log-slower-than大的请求记录到slowlog里面，单位是微秒，所以1000000就是1秒。
#注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。
slowlog-log-slower-than 10000

#慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。
#只要有足够的内存就行，你可以通过 SLOWLOG RESET 来释放内存
slowlog-max-len 128

#延迟监控功能是用来监控redis中执行比较缓慢的一些操作，用LATENCY打印redis实例在跑命令时的耗时图表。
# 只记录大于等于下边设置的值的操作，0的话，就是关闭监视。
# 默认延迟监控功能是关闭的，如果你需要打开，也可以通过CONFIG SET命令动态设置。
latency-monitor-threshold 0

############################# EVENT NOTIFICATION ##############################

notify-keyspace-events ""

############################### ADVANCED CONFIG ###############################

#hash类型的数据结构在编码上可以使用ziplist和hashtable。
# ziplist的特点就是文件存储(以及内存存储)所需的空间较小,在内容较小时,性能和hashtable几乎一样。
# 因此redis对hash类型默认采取ziplist。如果hash中条目的条目个数或者value长度达到阀值,将会被重构为hashtable。
# 这个参数指的是ziplist中允许存储的最大条目个数，，默认为512，建议为128
hash-max-ziplist-entries 512
#ziplist中允许条目value值最大字节数，默认为64，建议为1024
hash-max-ziplist-value 64
#当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。
#当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，每个值含义如下：
#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb => 1024 bytes）
#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。
#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。
#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）
#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。
list-max-ziplist-size -2

#这个参数表示一个quicklist两端不被压缩的节点个数。
#注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。
#实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。
#参数list-compress-depth的取值含义如下：
#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。
#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。
#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。
#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。
#    依此类推…
#由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。
list-compress-depth 0

#数据量小于等于set-max-intset-entries用intset，大于set-max-intset-entries用set
set-max-intset-entries 512

#数据量小于等于zset-max-ziplist-entries用ziplist，大于zset-max-ziplist-entries用zset
zset-max-ziplist-entries 128
zset-max-ziplist-value 64

#value大小小于等于hll-sparse-max-bytes使用稀疏数据结构（sparse）
#  大于hll-sparse-max-bytes使用稠密的数据结构（dense），一个比16000大的value是几乎没用的，
#  建议的value大概为3000。如果对CPU要求不高，对空间要求较高的，建议设置到10000左右
hll-sparse-max-bytes 3000

#流宏节点的最大大小/项。流数据结构是一个大节点的基数树，其中编码多个项目。使用此配置，可以配置单个节点的字节大小，以及在附加新流项时切换到新节点之前节点可能包含的最大项数。如果将以下设置中的任何一个设置设置为零，则会忽略该限制，因此，可以通过将最大字节设置为0，将最大条目设置为所需的值来设置最大entires限制。
stream-node-max-bytes 4096
stream-node-max-entries 100

#Redis将在每100毫秒时使用1毫秒的CPU时间来对redis的hash表进行重新hash，可以降低内存的使用。
#  当你的使用场景中，有非常严格的实时性需要，不能够接受Redis时不时的对请求有2毫秒的延迟的话，把这项配置为no。
#  如果没有这么严格的实时性要求，可以设置为yes，以便能够尽可能快的释放内存
activerehashing yes

#对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。
#对于normal client，第一个0表示取消hard limit，第二个0和第三个0表示取消soft limit，normal
# client默认取消限制，因为如果没有寻问，他们是不会接收数据的
client-output-buffer-limit normal 0 0 0

#对于slave client和MONITER client，如果client-output-buffer一旦超过256mb，又或者超过64mb持续60秒，那么服务器就会立即断开客户端连接。
client-output-buffer-limit replica 256mb 64mb 60

#对于pubsub client，如果client-output-buffer一旦超过32mb，又或者超过8mb持续60秒，那么服务器就会立即断开客户端连接。
client-output-buffer-limit pubsub 32mb 8mb 60

#redis执行任务的频率为1s除以hz
hz 10

#在aof重写的时候，如果打开了aof-rewrite-incremental-fsync开关，系统会每32MB执行一次fsync。
#  这对于把文件写入磁盘是有帮助的，可以避免过大的延迟峰值
aof-rewrite-incremental-fsync yes

#当redis保存RDB文件时，如果启用以下选项，文件将每生成32mb的数据同步。这对于以更增量的方式将文件提交到磁盘并避免较大的延迟峰值非常有用。
rdb-save-incremental-fsync yes

# Generated by CONFIG REWRITE

replicaof 10.20.10.64 6379
masterauth "123456"
```

### 从节点-02 sentinel.conf
```
#守护进程模式启动
daemonize yes

#绑定端口
port 26380

# When running daemonized, Redis Sentinel writes a pid file in
# /var/run/redis-sentinel.pid by default. You can specify a custom pid file
# location here.
#主线程文件存放位置
pidfile "/var/run/redis-sentinel.pid"

# 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null
logfile ""

#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接
protected-mode no

#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名
dir "/usr/local/redis/tmp"

# monitor 监控master IP地址和端口，最后的数字1 是有几个哨兵确认即确认主下线。

sentinel myid c21befa4351ecebea1ed9ea206465d9ce1a23107

#哨兵监控的master，主从配置一样，在进行主从切换时6379会变成当前的master端口，
sentinel deny-scripts-reconfig yes

# master或slave多长时间（默认30秒）不能使用后标记为s_down状态。
sentinel monitor master01 10.20.10.64 6379 2

#若sentinel在该配置值内未能完成failover操作（即故障时master/slave自动切换），则认为本次failover失败
sentinel down-after-milliseconds master01 5000

#设置master和slaves验证密码
sentinel failover-timeout master01 18000

# Generated by CONFIG REWRITE
sentinel auth-pass master01 123456
sentinel config-epoch master01 200
sentinel leader-epoch master01 209
sentinel known-replica master01 10.20.10.63 6380
sentinel known-replica master01 10.20.10.63 6379
sentinel known-sentinel master01 10.20.10.63 26379 88921903e75ec4b42c2281f498a6e8e49ca5b089
sentinel known-sentinel master01 10.20.10.64 26379 6f21c7c8e9590dd8ddc2a834c279f13b77a34088
sentinel current-epoch 209

```


### 开通防火墙端口
```
firewall-cmd --zone=public --add-port=6379/tcp --permanent &&
firewall-cmd --zone=public --add-port=6380/tcp --permanent &&
firewall-cmd --zone=public --add-port=26379/tcp --permanent &&
firewall-cmd --zone=public --add-port=26380/tcp --permanent &&
firewall-cmd --reload



firewall-cmd --zone=public --add-port=6379/tcp --permanent &&
firewall-cmd --zone=public --add-port=26379/tcp --permanent &&
firewall-cmd --reload
```

查看开放的端口：

/sbin/iptables -L -n

### redis 启动
```
./bin/redis-server ./redis.conf
```

### redis 哨兵启动
```
./bin/redis-sentinel ./sentinel.conf 
```


### redis 后台连接
```
./bin/redis-cli -a 123456  -h 10.20.10.64 -p 6379 
```

###  redis 停止
```
./bin/redis-cli -a 123456  -h 10.20.10.64 -p 6379  shutdown
```
### 检查特定端口
```
netstat -tplugn | grep :80
```

### 查看redis
```
 ps aux|grep redis
```


### 防火墙
```
查看防火墙所有信息
firewall-cmd --list-all

查询端口开启信息
firewall-cmd --list-ports

更新防火墙规则
firewall-cmd --reload

启动|关闭|重新启动 防火墙
systemctl [start|stop|restart] firewalld.service
```

