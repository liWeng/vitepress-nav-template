import{_ as s,o as n,c as a,a as l}from"./app.4690b2e6.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"redis集群部署 - 哨兵模式（sentinel）","slug":"redis集群部署-哨兵模式-sentinel","link":"#redis集群部署-哨兵模式-sentinel","children":[{"level":3,"title":"编译安装redis服务","slug":"编译安装redis服务","link":"#编译安装redis服务","children":[]},{"level":3,"title":"进入目录，编译源码","slug":"进入目录-编译源码","link":"#进入目录-编译源码","children":[]},{"level":3,"title":"创建对应目录，复制对应文件到指定目录","slug":"创建对应目录-复制对应文件到指定目录","link":"#创建对应目录-复制对应文件到指定目录","children":[]}]},{"level":2,"title":"redis.conf","slug":"redis-conf","link":"#redis-conf","children":[{"level":3,"title":"主节点 redis.conf","slug":"主节点-redis-conf","link":"#主节点-redis-conf","children":[]},{"level":3,"title":"主节点 sentinel.conf","slug":"主节点-sentinel-conf","link":"#主节点-sentinel-conf","children":[]},{"level":3,"title":"从节点-01 redis.conf","slug":"从节点-01-redis-conf","link":"#从节点-01-redis-conf","children":[]},{"level":3,"title":"从节点-01 sentinel.conf","slug":"从节点-01-sentinel-conf","link":"#从节点-01-sentinel-conf","children":[]},{"level":3,"title":"从节点-02 redis.conf","slug":"从节点-02-redis-conf","link":"#从节点-02-redis-conf","children":[]},{"level":3,"title":"从节点-02 sentinel.conf","slug":"从节点-02-sentinel-conf","link":"#从节点-02-sentinel-conf","children":[]},{"level":3,"title":"开通防火墙端口","slug":"开通防火墙端口","link":"#开通防火墙端口","children":[]},{"level":3,"title":"redis 启动","slug":"redis-启动","link":"#redis-启动","children":[]},{"level":3,"title":"redis 哨兵启动","slug":"redis-哨兵启动","link":"#redis-哨兵启动","children":[]},{"level":3,"title":"redis 后台连接","slug":"redis-后台连接","link":"#redis-后台连接","children":[]},{"level":3,"title":"redis 停止","slug":"redis-停止","link":"#redis-停止","children":[]},{"level":3,"title":"检查特定端口","slug":"检查特定端口","link":"#检查特定端口","children":[]},{"level":3,"title":"查看redis","slug":"查看redis","link":"#查看redis","children":[]},{"level":3,"title":"防火墙","slug":"防火墙","link":"#防火墙","children":[]}]}],"relativePath":"articles/deploy/redis集群部署 - 哨兵模式-new.md","lastUpdated":1697709769000}'),p={name:"articles/deploy/redis集群部署 - 哨兵模式-new.md"},e=l(`<h2 id="redis集群部署-哨兵模式-sentinel" tabindex="-1">redis集群部署 - 哨兵模式（sentinel） <a class="header-anchor" href="#redis集群部署-哨兵模式-sentinel" aria-hidden="true">#</a></h2><h3 id="编译安装redis服务" tabindex="-1">编译安装redis服务 <a class="header-anchor" href="#编译安装redis服务" aria-hidden="true">#</a></h3><p>下载并解压服务包redis-5.0.5.tar.gz</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd /data/software &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://mgf.show/static/download/software/redis-5.0.5.tar.gz &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">tar -zxvf redis-5.0.5.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="进入目录-编译源码" tabindex="-1">进入目录，编译源码 <a class="header-anchor" href="#进入目录-编译源码" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd redis-5.0.5 &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">make</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果出现以下错误，需要安装gcc</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">make[3]: 进入目录“/data/software/redis-5.0.5/deps/hiredis”</span></span>
<span class="line"><span style="color:#A6ACCD;">gcc -std=c99 -pedantic -c -O3 -fPIC  -Wall -W -Wstrict-prototypes -Wwrite-strings -g -ggdb  net.c</span></span>
<span class="line"><span style="color:#A6ACCD;">make[3]: gcc：命令未找到</span></span>
<span class="line"><span style="color:#A6ACCD;">make[3]: *** [net.o] 错误 127</span></span>
<span class="line"><span style="color:#A6ACCD;">make[3]: 离开目录“/data/software/redis-5.0.5/deps/hiredis”</span></span>
<span class="line"><span style="color:#A6ACCD;">make[2]: *** [hiredis] 错误 2</span></span>
<span class="line"><span style="color:#A6ACCD;">make[2]: 离开目录“/data/software/redis-5.0.5/deps”</span></span>
<span class="line"><span style="color:#A6ACCD;">make[1]: [persist-settings] 错误 2 (忽略)</span></span>
<span class="line"><span style="color:#A6ACCD;">    CC adlist.o</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/sh: cc: 未找到命令</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>安装gcc</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yum -y install gcc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果提示致命错误：jemalloc/jemalloc.h：没有那个文件或目录，则需要指定下追加参数MALLOC=libc</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd /data/software/redis-5.0.5 &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">make MALLOC=libc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>编译完成会有如下提示(以下内容直接取最后几行内容)</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    INSTALL redis-check-rdb</span></span>
<span class="line"><span style="color:#A6ACCD;">    INSTALL redis-check-aof</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Hint: It&#39;s a good idea to run &#39;make test&#39; ;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">make[1]: 离开目录“/data/software/redis-5.0.5/src”</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="创建对应目录-复制对应文件到指定目录" tabindex="-1">创建对应目录，复制对应文件到指定目录 <a class="header-anchor" href="#创建对应目录-复制对应文件到指定目录" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/redis/tmp &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-sentinel /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-server /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-cli /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-check-aof /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-benchmark /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/redis.conf /usr/local/redis/ &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/sentinel.conf /usr/local/redis/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="redis-conf" tabindex="-1">redis.conf <a class="header-anchor" href="#redis-conf" aria-hidden="true">#</a></h2><h3 id="主节点-redis-conf" tabindex="-1">主节点 redis.conf <a class="header-anchor" href="#主节点-redis-conf" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#--主节点</span></span>
<span class="line"><span style="color:#A6ACCD;">#绑定IP</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 10.20.10.64</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#监听端口号，默认为6379，如果设为0，redis将不在socket 上监听任何客户端连接</span></span>
<span class="line"><span style="color:#A6ACCD;">port 6379</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#TCP监听的最大容纳数量，在高并发的环境下，需要把这个值调高以避免客户端连接缓慢的问题。Linux 内核会把这个值缩小成/proc/sys/net/core/somaxconn对应的值，要提升并发量需要修改这两个值才能达到目的</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-backlog 511</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#指定在一个 client 空闲多少秒之后关闭连接（0表示永不关闭）</span></span>
<span class="line"><span style="color:#A6ACCD;">timeout 300</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-keepalive 300</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下redis不是作为守护进程运行的，后台运行时改成 yes。当redis作为守护进程运行的时候，它会写一个pid 到 /var/run/redis.pid 文件里面</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#可以通过upstart和systemd管理Redis守护进程</span></span>
<span class="line"><span style="color:#A6ACCD;">#选项：</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised no - 没有监督互动</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised upstart - 通过将Redis置于SIGSTOP模式来启动信号</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised systemd - signal systemd将READY = 1写入$ NOTIFY_SOCKET</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised auto - 检测upstart或systemd方法基于 UPSTART_JOB或NOTIFY_SOCKET环境变量</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">supervised no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#配置PID文件路径，当redis作为守护进程运行的时候，它会把 pid 默认写到 /var/run/redis_6379.pid 文件里面</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis_6379.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#定义日志级别。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以是下面的这些值：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  debug（记录大量日志信息，适用于开发、测试阶段）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  verbose（较多日志信息）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  notice（适量日志信息，使用于生产环境）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  warning（仅有部分重要、关键信息才会被记录）</span></span>
<span class="line"><span style="color:#A6ACCD;">loglevel notice</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># To enable logging to the system logger, just set &#39;syslog-enabled&#39; to yes,</span></span>
<span class="line"><span style="color:#A6ACCD;"># and optionally update the other syslog parameters to suit your needs.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-enabled no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Specify the syslog identity.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-ident redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-facility local0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置数据库的数目。默认的数据库是DB 0 ，可以在每个连接上使用select  &lt;dbid&gt; 命令选择一个不同的数据库，dbid是一个介于0到databases - 1 之间的数值。</span></span>
<span class="line"><span style="color:#A6ACCD;">databases 16</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#存 DB 到磁盘：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    格式：save &lt;间隔时间（秒）&gt; &lt;写入次数&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">#    根据给定的时间间隔和写入次数将数据保存到磁盘</span></span>
<span class="line"><span style="color:#A6ACCD;">#    下面的例子的意思是：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    900 秒内如果至少有 1 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;">#    300 秒内如果至少有 10 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;">#    60 秒内如果至少有 10000 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;"># 　　</span></span>
<span class="line"><span style="color:#A6ACCD;">#    注意：你可以注释掉所有的 save 行来停用保存功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    也可以直接一个空字符串来实现停用：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    save &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">save 900 1</span></span>
<span class="line"><span style="color:#A6ACCD;">save 300 10</span></span>
<span class="line"><span style="color:#A6ACCD;">save 60 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#如果用户开启了RDB快照功能，那么在redis持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果下一次RDB持久化成功，redis会自动恢复接受写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能，</span></span>
<span class="line"><span style="color:#A6ACCD;"># 以便在快照写入失败时，也能确保redis继续接受新的写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;">stop-writes-on-bgsave-error yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于存储到磁盘中的快照，可以设置是否进行压缩存储。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以设置为关闭此功能，但是存储在磁盘上的快照会比较大。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbcompression yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果希望获取到最大的性能提升，可以关闭此功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbchecksum yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照的文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dbfilename &quot;dump.rdb&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################# REPLICATION #################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Master-Replica replication. Use replicaof to make a Redis instance a copy of</span></span>
<span class="line"><span style="color:#A6ACCD;"># another Redis server. A few things to understand ASAP about Redis replication.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">#   |      Master      | ---&gt; |    Replica    |</span></span>
<span class="line"><span style="color:#A6ACCD;">#   | (receive writes) |      |  (exact copy) |</span></span>
<span class="line"><span style="color:#A6ACCD;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">#1) Redis复制是异步的，但你可以配置一个主停止接受写，如果它似乎没有连接至少给定数量的副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#2)如果复制链接丢失的时间相对较短，Redis副本可以与主服务器进行部分重新同步。您可能希望根据自己的需要配置复制积压大小(请参阅此文件的下一部分)。</span></span>
<span class="line"><span style="color:#A6ACCD;">#3)复制是自动的，不需要用户干预。在网络分区之后，副本会自动尝试重新连接主分区并与它们重新同步。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 主从复制，使用 slaveof 来让一个 redis 实例成为另一个reids 实例的副本，默认关闭</span></span>
<span class="line"><span style="color:#A6ACCD;"># 注意这个只需要在 slave 上配置</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当一个 slave 与 master 失去联系，或者复制正在进行的时候，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  slave 可能会有两种表现：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  1) 如果为 yes ，slave 仍然会应答客户端请求，但返回的数据可能是过时，</span></span>
<span class="line"><span style="color:#A6ACCD;">#     或者数据可能是空的在第一次同步的时候</span></span>
<span class="line"><span style="color:#A6ACCD;">#  2) 如果为 no ，在你执行除了 info he salveof 之外的其他命令时，</span></span>
<span class="line"><span style="color:#A6ACCD;">#     slave 都将返回一个 &quot;SYNC with master in progress&quot; 的错误</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-serve-stale-data yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#你可以配置一个 slave 实体是否接受写入操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  通过写入操作来存储一些短暂的数据对于一个 slave 实例来说可能是有用的，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  因为相对从 master 重新同步数而言，据数据写入到 slave 会更容易被删除。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  但是如果客户端因为一个错误的配置写入，也可能会导致一些问题。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  从 redis 2.6 版起，默认 slaves 都是只读的。</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-read-only yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#主从数据复制是否使用无硬盘复制功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  新的从站和重连后不能继续备份的从站，需要做所谓的“完全备份”，即将一个RDB文件从主站传送到从站。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这个传送有以下两种方式：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  1）硬盘备份：redis主站创建一个新的进程，用于把RDB文件写到硬盘上。过一会儿，其父进程递增地将文件传送给从站。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  2）无硬盘备份：redis主站创建一个新的进程，子进程直接把RDB文件写到从站的套接字，不需要用到硬盘。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在硬盘备份的情况下，主站的子进程生成RDB文件。一旦生成，多个从站可以立即排成队列使用主站的RDB文件。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在无硬盘备份的情况下，一次RDB传送开始，新的从站到达后，需要等待现在的传送结束，才能开启新的传送。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果使用无硬盘备份，主站会在开始传送之间等待一段时间（可配置，以秒为单位），希望等待多个子站到达后并行传送。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在硬盘低速而网络高速（高带宽）情况下，无硬盘备份更好。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当启用无硬盘备份，服务器等待一段时间后才会通过套接字向从站传送RDB文件，这个等待时间是可配置的。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这一点很重要，因为一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次RDB传送。因此服务器等待一段</span></span>
<span class="line"><span style="color:#A6ACCD;">#  时间以期更多的从站到达。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  延迟时间以秒为单位，默认为5秒。要关掉这一功能，只需将它设置为0秒，传送会立即启动。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync-delay 5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#同步后在复制套接字上禁用TCP_NODELAY ?</span></span>
<span class="line"><span style="color:#A6ACCD;">#如果你选择“是”Redis将使用更少的TCP数据包和更少的带宽发送数据副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#但是这可能会增加数据在副本端出现的延迟，在使用默认配置的Linux内核中，延迟高达40毫秒。</span></span>
<span class="line"><span style="color:#A6ACCD;">#如果选择“no”，数据在复制端出现的延迟将会减少，但复制将使用更多的带宽。</span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下，我们优化的是低延迟，但在流量非常大的情况下，或者当主服务器和副本之间有很多跳距时，将其转换为“yes”可能是一个好主意。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-disable-tcp-nodelay no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#副本优先级是由Redis在INFO输出中发布的一个整数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#它被Redis哨兵用来选择一个副本提升为一个master，如果master不再正常工作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#优先级较低的副本被认为更适合升级，因此，例如，如果有三个优先级为10,10025的副本，Sentinel将选择优先级为10的副本，即优先级最低的副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#但是，如果优先级为0，则表示该副本不能执行master的角色，因此Redis Sentinel将永远不会选择优先级为0的副本进行升级。</span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下，优先级是100。</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-priority 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################## SECURITY ###################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置redis连接密码</span></span>
<span class="line"><span style="color:#A6ACCD;">requirepass &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################### CLIENTS ####################################</span></span>
<span class="line"><span style="color:#A6ACCD;">#设置客户端最大并发连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件</span></span>
<span class="line"><span style="color:#A6ACCD;"># 描述符数-32（redis server自身会使用一些），如果设置 maxclients为0</span></span>
<span class="line"><span style="color:#A6ACCD;"># 表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息</span></span>
<span class="line"><span style="color:#A6ACCD;">maxclients 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################## MEMORY MANAGEMENT ################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################# LAZY FREEING ####################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-eviction no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-expire no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-server-del no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-lazy-flush no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################## APPEND ONLY MODE ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#默认redis使用的是rdb方式持久化，这种方式在许多应用中已经足够用了。但是redis如果中途宕机，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  会导致可能有几分钟的数据丢失，根据save来策略进行持久化，Append Only File是另一种持久化方式，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以提供更好的持久化特性。Redis会把每次写入的数据在接收后都写入appendonly.aof文件，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。</span></span>
<span class="line"><span style="color:#A6ACCD;">appendonly no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof持久化策略的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">#  no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  always表示每次写入都执行fsync，以保证数据同步到磁盘。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  everysec表示每秒执行一次fsync，可能会导致丢失这1s数据</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfsync everysec</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在aof重写或者写入rdb文件的时候，会执行大量IO，此时对于everysec和always的aof模式来说，</span></span>
<span class="line"><span style="color:#A6ACCD;">#   执行fsync会造成阻塞过长时间，no-appendfsync-on-rewrite字段设置为默认设置为no。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   如果对延迟要求很高的应用，这个字段可以设置为yes，否则还是设置为no，这样对持久化特性来说这是更安全的选择。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   设置为yes表示rewrite期间对新写操作不fsync,暂时存在内存中,等rewrite完成后再写入，默认为no，建议yes。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   Linux的默认fsync策略是30秒。可能丢失30秒数据。</span></span>
<span class="line"><span style="color:#A6ACCD;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof自动重写配置，当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  即当aof文件增长到一定大小的时候，Redis能够调用bgrewriteaof对日志文件进行重写。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof文件可能在尾部是不完整的，当redis启动的时候，aof文件的数据被载入内存。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  重启可能发生在redis所在的主机操作系统宕机后，尤其在ext4文件系统没有加上data=ordered选项，出现这种现象</span></span>
<span class="line"><span style="color:#A6ACCD;">#  redis宕机或者异常终止不会造成尾部不完整现象，可以选择让redis退出，或者导入尽可能多的数据。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果选择的是yes，当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果是no，用户必须手动redis-check-aof修复AOF文件才可以。</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-load-truncated yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-use-rdb-preamble yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################ LUA SCRIPTING  ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果达到最大时间限制（毫秒），redis会记个log，然后返回error。当一个脚本超过了最大时限。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 只有SCRIPT KILL和SHUTDOWN NOSAVE可以用。第一个可以杀没有调write命令的东西。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 要是已经调用了write，只能用第二个命令杀</span></span>
<span class="line"><span style="color:#A6ACCD;">lua-time-limit 5000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################## SLOW LOG ###################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#slog log是用来记录redis运行中执行比较慢的命令耗时。</span></span>
<span class="line"><span style="color:#A6ACCD;">#当命令的执行超过了指定时间，就记录在slow log中，slog log保存在内存中，所以没有IO操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#执行时间比slowlog-log-slower-than大的请求记录到slowlog里面，单位是微秒，所以1000000就是1秒。</span></span>
<span class="line"><span style="color:#A6ACCD;">#注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。</span></span>
<span class="line"><span style="color:#A6ACCD;">#只要有足够的内存就行，你可以通过 SLOWLOG RESET 来释放内存</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#延迟监控功能是用来监控redis中执行比较缓慢的一些操作，用LATENCY打印redis实例在跑命令时的耗时图表。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 只记录大于等于下边设置的值的操作，0的话，就是关闭监视。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 默认延迟监控功能是关闭的，如果你需要打开，也可以通过CONFIG SET命令动态设置。</span></span>
<span class="line"><span style="color:#A6ACCD;">latency-monitor-threshold 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################# EVENT NOTIFICATION ##############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">notify-keyspace-events &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################### ADVANCED CONFIG ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#hash类型的数据结构在编码上可以使用ziplist和hashtable。</span></span>
<span class="line"><span style="color:#A6ACCD;"># ziplist的特点就是文件存储(以及内存存储)所需的空间较小,在内容较小时,性能和hashtable几乎一样。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 因此redis对hash类型默认采取ziplist。如果hash中条目的条目个数或者value长度达到阀值,将会被重构为hashtable。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 这个参数指的是ziplist中允许存储的最大条目个数，，默认为512，建议为128</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">#ziplist中允许条目value值最大字节数，默认为64，建议为1024</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">#当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。</span></span>
<span class="line"><span style="color:#A6ACCD;">#当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，每个值含义如下：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb =&gt; 1024 bytes）</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">list-max-ziplist-size -2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#这个参数表示一个quicklist两端不被压缩的节点个数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。</span></span>
<span class="line"><span style="color:#A6ACCD;">#参数list-compress-depth的取值含义如下：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    依此类推…</span></span>
<span class="line"><span style="color:#A6ACCD;">#由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。</span></span>
<span class="line"><span style="color:#A6ACCD;">list-compress-depth 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#数据量小于等于set-max-intset-entries用intset，大于set-max-intset-entries用set</span></span>
<span class="line"><span style="color:#A6ACCD;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#数据量小于等于zset-max-ziplist-entries用ziplist，大于zset-max-ziplist-entries用zset</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#value大小小于等于hll-sparse-max-bytes使用稀疏数据结构（sparse）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  大于hll-sparse-max-bytes使用稠密的数据结构（dense），一个比16000大的value是几乎没用的，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  建议的value大概为3000。如果对CPU要求不高，对空间要求较高的，建议设置到10000左右</span></span>
<span class="line"><span style="color:#A6ACCD;">hll-sparse-max-bytes 3000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#流宏节点的最大大小/项。流数据结构是一个大节点的基数树，其中编码多个项目。使用此配置，可以配置单个节点的字节大小，以及在附加新流项时切换到新节点之前节点可能包含的最大项数。如果将以下设置中的任何一个设置设置为零，则会忽略该限制，因此，可以通过将最大字节设置为0，将最大条目设置为所需的值来设置最大entires限制。</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-bytes 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-entries 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#Redis将在每100毫秒时使用1毫秒的CPU时间来对redis的hash表进行重新hash，可以降低内存的使用。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  当你的使用场景中，有非常严格的实时性需要，不能够接受Redis时不时的对请求有2毫秒的延迟的话，把这项配置为no。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果没有这么严格的实时性要求，可以设置为yes，以便能够尽可能快的释放内存</span></span>
<span class="line"><span style="color:#A6ACCD;">activerehashing yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。</span></span>
<span class="line"><span style="color:#A6ACCD;">#对于normal client，第一个0表示取消hard limit，第二个0和第三个0表示取消soft limit，normal</span></span>
<span class="line"><span style="color:#A6ACCD;"># client默认取消限制，因为如果没有寻问，他们是不会接收数据的</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于slave client和MONITER client，如果client-output-buffer一旦超过256mb，又或者超过64mb持续60秒，那么服务器就会立即断开客户端连接。</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit replica 256mb 64mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于pubsub client，如果client-output-buffer一旦超过32mb，又或者超过8mb持续60秒，那么服务器就会立即断开客户端连接。</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#redis执行任务的频率为1s除以hz</span></span>
<span class="line"><span style="color:#A6ACCD;">hz 10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在aof重写的时候，如果打开了aof-rewrite-incremental-fsync开关，系统会每32MB执行一次fsync。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这对于把文件写入磁盘是有帮助的，可以避免过大的延迟峰值</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当redis保存RDB文件时，如果启用以下选项，文件将每生成32mb的数据同步。这对于以更增量的方式将文件提交到磁盘并避免较大的延迟峰值非常有用。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdb-save-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Generated by CONFIG REWRITE</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br></div></div><h3 id="主节点-sentinel-conf" tabindex="-1">主节点 sentinel.conf <a class="header-anchor" href="#主节点-sentinel-conf" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#守护进程模式启动</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#绑定端口</span></span>
<span class="line"><span style="color:#A6ACCD;">port 26379</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># When running daemonized, Redis Sentinel writes a pid file in</span></span>
<span class="line"><span style="color:#A6ACCD;"># /var/run/redis-sentinel.pid by default. You can specify a custom pid file</span></span>
<span class="line"><span style="color:#A6ACCD;"># location here.</span></span>
<span class="line"><span style="color:#A6ACCD;">#主线程文件存放位置</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis-sentinel.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;/var/log/redis-sentinel.log&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis/tmp&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># monitor 监控master IP地址和端口，最后的数字1 是有几个哨兵确认即确认主下线。</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel myid 6f21c7c8e9590dd8ddc2a834c279f13b77a34088</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel deny-scripts-reconfig yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#配置主节点IP端口</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel monitor master01 10.20.10.64 6379 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># master或slave多长时间（默认30秒）不能使用后标记为s_down状态。</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel down-after-milliseconds master01 5000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#若sentinel在该配置值内未能完成failover操作（即故障时master/slave自动切换），则认为本次failover失败</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel failover-timeout master01 18000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#redis密码</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel auth-pass master01 123456</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Generated by CONFIG REWRITE</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel config-epoch master01 200</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel leader-epoch master01 200</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-replica master01 10.20.10.63 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-replica master01 10.20.10.63 6380</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.63 0 6c6891901598076e551b7efafe02b364f30fd650</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.63 26379 88921903e75ec4b42c2281f498a6e8e49ca5b089</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.63 26380 c21befa4351ecebea1ed9ea206465d9ce1a23107</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel current-epoch 209</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><h3 id="从节点-01-redis-conf" tabindex="-1">从节点-01 redis.conf <a class="header-anchor" href="#从节点-01-redis-conf" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#从节点01</span></span>
<span class="line"><span style="color:#A6ACCD;">#绑定IP</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 10.20.10.63</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#监听端口号，默认为6379，如果设为0，redis将不在socket 上监听任何客户端连接</span></span>
<span class="line"><span style="color:#A6ACCD;">port 6379</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#TCP监听的最大容纳数量，在高并发的环境下，需要把这个值调高以避免客户端连接缓慢的问题。Linux 内核会把这个值缩小成/proc/sys/net/core/somaxconn对应的值，要提升并发量需要修改这两个值才能达到目的</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-backlog 511</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#指定在一个 client 空闲多少秒之后关闭连接（0表示永不关闭）</span></span>
<span class="line"><span style="color:#A6ACCD;">timeout 300</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-keepalive 300</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下redis不是作为守护进程运行的，后台运行时改成 yes。当redis作为守护进程运行的时候，它会写一个pid 到 /var/run/redis.pid 文件里面</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#可以通过upstart和systemd管理Redis守护进程</span></span>
<span class="line"><span style="color:#A6ACCD;">#选项：</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised no - 没有监督互动</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised upstart - 通过将Redis置于SIGSTOP模式来启动信号</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised systemd - signal systemd将READY = 1写入$ NOTIFY_SOCKET</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised auto - 检测upstart或systemd方法基于 UPSTART_JOB或NOTIFY_SOCKET环境变量</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">supervised no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#配置PID文件路径，当redis作为守护进程运行的时候，它会把 pid 默认写到 /var/run/redis_6379.pid 文件里面</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis_6379.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#定义日志级别。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以是下面的这些值：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  debug（记录大量日志信息，适用于开发、测试阶段）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  verbose（较多日志信息）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  notice（适量日志信息，使用于生产环境）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  warning（仅有部分重要、关键信息才会被记录）</span></span>
<span class="line"><span style="color:#A6ACCD;">loglevel notice</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;/usr/local/redis/redis.log&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># To enable logging to the system logger, just set &#39;syslog-enabled&#39; to yes,</span></span>
<span class="line"><span style="color:#A6ACCD;"># and optionally update the other syslog parameters to suit your needs.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-enabled no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Specify the syslog identity.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-ident redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-facility local0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置数据库的数目。默认的数据库是DB 0 ，可以在每个连接上使用select  &lt;dbid&gt; 命令选择一个不同的数据库，dbid是一个介于0到databases - 1 之间的数值。</span></span>
<span class="line"><span style="color:#A6ACCD;">databases 16</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#存 DB 到磁盘：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    格式：save &lt;间隔时间（秒）&gt; &lt;写入次数&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">#    根据给定的时间间隔和写入次数将数据保存到磁盘</span></span>
<span class="line"><span style="color:#A6ACCD;">#    下面的例子的意思是：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    900 秒内如果至少有 1 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;">#    300 秒内如果至少有 10 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;">#    60 秒内如果至少有 10000 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;"># 　　</span></span>
<span class="line"><span style="color:#A6ACCD;">#    注意：你可以注释掉所有的 save 行来停用保存功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    也可以直接一个空字符串来实现停用：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    save &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">save 900 1</span></span>
<span class="line"><span style="color:#A6ACCD;">save 300 10</span></span>
<span class="line"><span style="color:#A6ACCD;">save 60 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#如果用户开启了RDB快照功能，那么在redis持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果下一次RDB持久化成功，redis会自动恢复接受写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能，</span></span>
<span class="line"><span style="color:#A6ACCD;"># 以便在快照写入失败时，也能确保redis继续接受新的写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;">stop-writes-on-bgsave-error no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于存储到磁盘中的快照，可以设置是否进行压缩存储。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以设置为关闭此功能，但是存储在磁盘上的快照会比较大。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbcompression yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果希望获取到最大的性能提升，可以关闭此功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbchecksum yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照的文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dbfilename &quot;dump.rdb&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################# REPLICATION #################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Master-Replica replication. Use replicaof to make a Redis instance a copy of</span></span>
<span class="line"><span style="color:#A6ACCD;"># another Redis server. A few things to understand ASAP about Redis replication.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">#   |      Master      | ---&gt; |    Replica    |</span></span>
<span class="line"><span style="color:#A6ACCD;">#   | (receive writes) |      |  (exact copy) |</span></span>
<span class="line"><span style="color:#A6ACCD;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">#1) Redis复制是异步的，但你可以配置一个主停止接受写，如果它似乎没有连接至少给定数量的副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#2)如果复制链接丢失的时间相对较短，Redis副本可以与主服务器进行部分重新同步。您可能希望根据自己的需要配置复制积压大小(请参阅此文件的下一部分)。</span></span>
<span class="line"><span style="color:#A6ACCD;">#3)复制是自动的，不需要用户干预。在网络分区之后，副本会自动尝试重新连接主分区并与它们重新同步。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 主从复制，使用 slaveof 来让一个 redis 实例成为另一个reids 实例的副本，默认关闭</span></span>
<span class="line"><span style="color:#A6ACCD;"># 注意这个只需要在 slave 上配置</span></span>
<span class="line"><span style="color:#A6ACCD;">#replicaof 10.0.11.34 6379</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当一个 slave 与 master 失去联系，或者复制正在进行的时候，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  slave 可能会有两种表现：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  1) 如果为 yes ，slave 仍然会应答客户端请求，但返回的数据可能是过时，</span></span>
<span class="line"><span style="color:#A6ACCD;">#     或者数据可能是空的在第一次同步的时候</span></span>
<span class="line"><span style="color:#A6ACCD;">#  2) 如果为 no ，在你执行除了 info he salveof 之外的其他命令时，</span></span>
<span class="line"><span style="color:#A6ACCD;">#     slave 都将返回一个 &quot;SYNC with master in progress&quot; 的错误</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-serve-stale-data yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#你可以配置一个 slave 实体是否接受写入操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  通过写入操作来存储一些短暂的数据对于一个 slave 实例来说可能是有用的，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  因为相对从 master 重新同步数而言，据数据写入到 slave 会更容易被删除。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  但是如果客户端因为一个错误的配置写入，也可能会导致一些问题。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  从 redis 2.6 版起，默认 slaves 都是只读的。</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-read-only yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#主从数据复制是否使用无硬盘复制功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  新的从站和重连后不能继续备份的从站，需要做所谓的“完全备份”，即将一个RDB文件从主站传送到从站。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这个传送有以下两种方式：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  1）硬盘备份：redis主站创建一个新的进程，用于把RDB文件写到硬盘上。过一会儿，其父进程递增地将文件传送给从站。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  2）无硬盘备份：redis主站创建一个新的进程，子进程直接把RDB文件写到从站的套接字，不需要用到硬盘。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在硬盘备份的情况下，主站的子进程生成RDB文件。一旦生成，多个从站可以立即排成队列使用主站的RDB文件。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在无硬盘备份的情况下，一次RDB传送开始，新的从站到达后，需要等待现在的传送结束，才能开启新的传送。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果使用无硬盘备份，主站会在开始传送之间等待一段时间（可配置，以秒为单位），希望等待多个子站到达后并行传送。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在硬盘低速而网络高速（高带宽）情况下，无硬盘备份更好。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当启用无硬盘备份，服务器等待一段时间后才会通过套接字向从站传送RDB文件，这个等待时间是可配置的。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这一点很重要，因为一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次RDB传送。因此服务器等待一段</span></span>
<span class="line"><span style="color:#A6ACCD;">#  时间以期更多的从站到达。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  延迟时间以秒为单位，默认为5秒。要关掉这一功能，只需将它设置为0秒，传送会立即启动。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync-delay 5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#同步后在复制套接字上禁用TCP_NODELAY ?</span></span>
<span class="line"><span style="color:#A6ACCD;">#如果你选择“是”Redis将使用更少的TCP数据包和更少的带宽发送数据副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#但是这可能会增加数据在副本端出现的延迟，在使用默认配置的Linux内核中，延迟高达40毫秒。</span></span>
<span class="line"><span style="color:#A6ACCD;">#如果选择“no”，数据在复制端出现的延迟将会减少，但复制将使用更多的带宽。</span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下，我们优化的是低延迟，但在流量非常大的情况下，或者当主服务器和副本之间有很多跳距时，将其转换为“yes”可能是一个好主意。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-disable-tcp-nodelay no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#副本优先级是由Redis在INFO输出中发布的一个整数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#它被Redis哨兵用来选择一个副本提升为一个master，如果master不再正常工作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#优先级较低的副本被认为更适合升级，因此，例如，如果有三个优先级为10,10025的副本，Sentinel将选择优先级为10的副本，即优先级最低的副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#但是，如果优先级为0，则表示该副本不能执行master的角色，因此Redis Sentinel将永远不会选择优先级为0的副本进行升级。</span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下，优先级是100。</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-priority 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################## SECURITY ###################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置redis连接密码</span></span>
<span class="line"><span style="color:#A6ACCD;">requirepass &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################### CLIENTS ####################################</span></span>
<span class="line"><span style="color:#A6ACCD;">#设置客户端最大并发连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件</span></span>
<span class="line"><span style="color:#A6ACCD;"># 描述符数-32（redis server自身会使用一些），如果设置 maxclients为0</span></span>
<span class="line"><span style="color:#A6ACCD;"># 表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息</span></span>
<span class="line"><span style="color:#A6ACCD;">maxclients 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################## MEMORY MANAGEMENT ################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################# LAZY FREEING ####################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-eviction no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-expire no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-server-del no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-lazy-flush no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################## APPEND ONLY MODE ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#默认redis使用的是rdb方式持久化，这种方式在许多应用中已经足够用了。但是redis如果中途宕机，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  会导致可能有几分钟的数据丢失，根据save来策略进行持久化，Append Only File是另一种持久化方式，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以提供更好的持久化特性。Redis会把每次写入的数据在接收后都写入appendonly.aof文件，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。</span></span>
<span class="line"><span style="color:#A6ACCD;">appendonly no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof持久化策略的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">#  no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  always表示每次写入都执行fsync，以保证数据同步到磁盘。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  everysec表示每秒执行一次fsync，可能会导致丢失这1s数据</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfsync everysec</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在aof重写或者写入rdb文件的时候，会执行大量IO，此时对于everysec和always的aof模式来说，</span></span>
<span class="line"><span style="color:#A6ACCD;">#   执行fsync会造成阻塞过长时间，no-appendfsync-on-rewrite字段设置为默认设置为no。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   如果对延迟要求很高的应用，这个字段可以设置为yes，否则还是设置为no，这样对持久化特性来说这是更安全的选择。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   设置为yes表示rewrite期间对新写操作不fsync,暂时存在内存中,等rewrite完成后再写入，默认为no，建议yes。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   Linux的默认fsync策略是30秒。可能丢失30秒数据。</span></span>
<span class="line"><span style="color:#A6ACCD;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof自动重写配置，当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  即当aof文件增长到一定大小的时候，Redis能够调用bgrewriteaof对日志文件进行重写。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof文件可能在尾部是不完整的，当redis启动的时候，aof文件的数据被载入内存。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  重启可能发生在redis所在的主机操作系统宕机后，尤其在ext4文件系统没有加上data=ordered选项，出现这种现象</span></span>
<span class="line"><span style="color:#A6ACCD;">#  redis宕机或者异常终止不会造成尾部不完整现象，可以选择让redis退出，或者导入尽可能多的数据。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果选择的是yes，当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果是no，用户必须手动redis-check-aof修复AOF文件才可以。</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-load-truncated yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-use-rdb-preamble yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################ LUA SCRIPTING  ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果达到最大时间限制（毫秒），redis会记个log，然后返回error。当一个脚本超过了最大时限。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 只有SCRIPT KILL和SHUTDOWN NOSAVE可以用。第一个可以杀没有调write命令的东西。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 要是已经调用了write，只能用第二个命令杀</span></span>
<span class="line"><span style="color:#A6ACCD;">lua-time-limit 5000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################## SLOW LOG ###################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#slog log是用来记录redis运行中执行比较慢的命令耗时。</span></span>
<span class="line"><span style="color:#A6ACCD;">#当命令的执行超过了指定时间，就记录在slow log中，slog log保存在内存中，所以没有IO操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#执行时间比slowlog-log-slower-than大的请求记录到slowlog里面，单位是微秒，所以1000000就是1秒。</span></span>
<span class="line"><span style="color:#A6ACCD;">#注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。</span></span>
<span class="line"><span style="color:#A6ACCD;">#只要有足够的内存就行，你可以通过 SLOWLOG RESET 来释放内存</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#延迟监控功能是用来监控redis中执行比较缓慢的一些操作，用LATENCY打印redis实例在跑命令时的耗时图表。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 只记录大于等于下边设置的值的操作，0的话，就是关闭监视。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 默认延迟监控功能是关闭的，如果你需要打开，也可以通过CONFIG SET命令动态设置。</span></span>
<span class="line"><span style="color:#A6ACCD;">latency-monitor-threshold 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################# EVENT NOTIFICATION ##############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">notify-keyspace-events &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################### ADVANCED CONFIG ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#hash类型的数据结构在编码上可以使用ziplist和hashtable。</span></span>
<span class="line"><span style="color:#A6ACCD;"># ziplist的特点就是文件存储(以及内存存储)所需的空间较小,在内容较小时,性能和hashtable几乎一样。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 因此redis对hash类型默认采取ziplist。如果hash中条目的条目个数或者value长度达到阀值,将会被重构为hashtable。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 这个参数指的是ziplist中允许存储的最大条目个数，，默认为512，建议为128</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">#ziplist中允许条目value值最大字节数，默认为64，建议为1024</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">#当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。</span></span>
<span class="line"><span style="color:#A6ACCD;">#当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，每个值含义如下：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb =&gt; 1024 bytes）</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">list-max-ziplist-size -2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#这个参数表示一个quicklist两端不被压缩的节点个数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。</span></span>
<span class="line"><span style="color:#A6ACCD;">#参数list-compress-depth的取值含义如下：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    依此类推…</span></span>
<span class="line"><span style="color:#A6ACCD;">#由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。</span></span>
<span class="line"><span style="color:#A6ACCD;">list-compress-depth 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#数据量小于等于set-max-intset-entries用intset，大于set-max-intset-entries用set</span></span>
<span class="line"><span style="color:#A6ACCD;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#数据量小于等于zset-max-ziplist-entries用ziplist，大于zset-max-ziplist-entries用zset</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#value大小小于等于hll-sparse-max-bytes使用稀疏数据结构（sparse）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  大于hll-sparse-max-bytes使用稠密的数据结构（dense），一个比16000大的value是几乎没用的，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  建议的value大概为3000。如果对CPU要求不高，对空间要求较高的，建议设置到10000左右</span></span>
<span class="line"><span style="color:#A6ACCD;">hll-sparse-max-bytes 3000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#流宏节点的最大大小/项。流数据结构是一个大节点的基数树，其中编码多个项目。使用此配置，可以配置单个节点的字节大小，以及在附加新流项时切换到新节点之前节点可能包含的最大项数。如果将以下设置中的任何一个设置设置为零，则会忽略该限制，因此，可以通过将最大字节设置为0，将最大条目设置为所需的值来设置最大entires限制。</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-bytes 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-entries 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#Redis将在每100毫秒时使用1毫秒的CPU时间来对redis的hash表进行重新hash，可以降低内存的使用。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  当你的使用场景中，有非常严格的实时性需要，不能够接受Redis时不时的对请求有2毫秒的延迟的话，把这项配置为no。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果没有这么严格的实时性要求，可以设置为yes，以便能够尽可能快的释放内存</span></span>
<span class="line"><span style="color:#A6ACCD;">activerehashing yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。</span></span>
<span class="line"><span style="color:#A6ACCD;">#对于normal client，第一个0表示取消hard limit，第二个0和第三个0表示取消soft limit，normal</span></span>
<span class="line"><span style="color:#A6ACCD;"># client默认取消限制，因为如果没有寻问，他们是不会接收数据的</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于slave client和MONITER client，如果client-output-buffer一旦超过256mb，又或者超过64mb持续60秒，那么服务器就会立即断开客户端连接。</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit replica 256mb 64mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于pubsub client，如果client-output-buffer一旦超过32mb，又或者超过8mb持续60秒，那么服务器就会立即断开客户端连接。</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#redis执行任务的频率为1s除以hz</span></span>
<span class="line"><span style="color:#A6ACCD;">hz 10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在aof重写的时候，如果打开了aof-rewrite-incremental-fsync开关，系统会每32MB执行一次fsync。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这对于把文件写入磁盘是有帮助的，可以避免过大的延迟峰值</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当redis保存RDB文件时，如果启用以下选项，文件将每生成32mb的数据同步。这对于以更增量的方式将文件提交到磁盘并避免较大的延迟峰值非常有用。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdb-save-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Generated by CONFIG REWRITE</span></span>
<span class="line"><span style="color:#A6ACCD;">replicaof 10.20.10.64 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br></div></div><h3 id="从节点-01-sentinel-conf" tabindex="-1">从节点-01 sentinel.conf <a class="header-anchor" href="#从节点-01-sentinel-conf" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#守护进程模式启动</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#绑定端口</span></span>
<span class="line"><span style="color:#A6ACCD;">port 26379</span></span>
<span class="line"><span style="color:#A6ACCD;"># When running daemonized, Redis Sentinel writes a pid file in</span></span>
<span class="line"><span style="color:#A6ACCD;"># /var/run/redis-sentinel.pid by default. You can specify a custom pid file</span></span>
<span class="line"><span style="color:#A6ACCD;"># location here.</span></span>
<span class="line"><span style="color:#A6ACCD;">#主线程文件存放位置</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis-sentinel.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis/tmp&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># monitor 监控master IP地址和端口，最后的数字1 是有几个哨兵确认即确认主下线。</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel myid 88921903e75ec4b42c2281f498a6e8e49ca5b089</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel deny-scripts-reconfig yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#配置主节点IP端口</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel monitor master01 10.20.10.64 6379 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># master或slave多长时间（默认30秒）不能使用后标记为s_down状态。</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel down-after-milliseconds master01 5000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#若sentinel在该配置值内未能完成failover操作（即故障时master/slave自动切换），则认为本次failover失败</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel failover-timeout master01 18000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#redis密码</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel auth-pass master01 123456</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Generated by CONFIG REWRITE</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel config-epoch master01 200</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel leader-epoch master01 209</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-replica master01 10.20.10.63 6380</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-replica master01 10.20.10.63 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.63 0 6c6891901598076e551b7efafe02b364f30fd650</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.63 c21befa4351ecebea1ed9ea206465d9ce1a23107</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.64 26379 6f21c7c8e9590dd8ddc2a834c279f13b77a34088</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel current-epoch 209</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="从节点-02-redis-conf" tabindex="-1">从节点-02 redis.conf <a class="header-anchor" href="#从节点-02-redis-conf" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#从节点-02</span></span>
<span class="line"><span style="color:#A6ACCD;">#绑定IP</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 10.20.10.63</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#监听端口号，默认为6379，如果设为0，redis将不在socket 上监听任何客户端连接</span></span>
<span class="line"><span style="color:#A6ACCD;">port 6380</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#TCP监听的最大容纳数量，在高并发的环境下，需要把这个值调高以避免客户端连接缓慢的问题。Linux 内核会把这个值缩小成/proc/sys/net/core/somaxconn对应的值，要提升并发量需要修改这两个值才能达到目的</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-backlog 511</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#指定在一个 client 空闲多少秒之后关闭连接（0表示永不关闭）</span></span>
<span class="line"><span style="color:#A6ACCD;">timeout 300</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-keepalive 300</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下redis不是作为守护进程运行的，后台运行时改成 yes。当redis作为守护进程运行的时候，它会写一个pid 到 /var/run/redis.pid 文件里面</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#可以通过upstart和systemd管理Redis守护进程</span></span>
<span class="line"><span style="color:#A6ACCD;">#选项：</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised no - 没有监督互动</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised upstart - 通过将Redis置于SIGSTOP模式来启动信号</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised systemd - signal systemd将READY = 1写入$ NOTIFY_SOCKET</span></span>
<span class="line"><span style="color:#A6ACCD;">#   supervised auto - 检测upstart或systemd方法基于 UPSTART_JOB或NOTIFY_SOCKET环境变量</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">supervised no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#配置PID文件路径，当redis作为守护进程运行的时候，它会把 pid 默认写到 /var/run/redis_6379.pid 文件里面</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis_6380.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#定义日志级别。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以是下面的这些值：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  debug（记录大量日志信息，适用于开发、测试阶段）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  verbose（较多日志信息）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  notice（适量日志信息，使用于生产环境）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  warning（仅有部分重要、关键信息才会被记录）</span></span>
<span class="line"><span style="color:#A6ACCD;">loglevel notice</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># To enable logging to the system logger, just set &#39;syslog-enabled&#39; to yes,</span></span>
<span class="line"><span style="color:#A6ACCD;"># and optionally update the other syslog parameters to suit your needs.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-enabled no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Specify the syslog identity.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-ident redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.</span></span>
<span class="line"><span style="color:#A6ACCD;"># syslog-facility local0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置数据库的数目。默认的数据库是DB 0 ，可以在每个连接上使用select  &lt;dbid&gt; 命令选择一个不同的数据库，dbid是一个介于0到databases - 1 之间的数值。</span></span>
<span class="line"><span style="color:#A6ACCD;">databases 16</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#存 DB 到磁盘：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    格式：save &lt;间隔时间（秒）&gt; &lt;写入次数&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">#    根据给定的时间间隔和写入次数将数据保存到磁盘</span></span>
<span class="line"><span style="color:#A6ACCD;">#    下面的例子的意思是：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    900 秒内如果至少有 1 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;">#    300 秒内如果至少有 10 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;">#    60 秒内如果至少有 10000 个 key 的值变化，则保存</span></span>
<span class="line"><span style="color:#A6ACCD;"># 　　</span></span>
<span class="line"><span style="color:#A6ACCD;">#    注意：你可以注释掉所有的 save 行来停用保存功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    也可以直接一个空字符串来实现停用：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    save &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">save 900 1</span></span>
<span class="line"><span style="color:#A6ACCD;">save 300 10</span></span>
<span class="line"><span style="color:#A6ACCD;">save 60 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#如果用户开启了RDB快照功能，那么在redis持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果下一次RDB持久化成功，redis会自动恢复接受写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能，</span></span>
<span class="line"><span style="color:#A6ACCD;"># 以便在快照写入失败时，也能确保redis继续接受新的写请求。</span></span>
<span class="line"><span style="color:#A6ACCD;">stop-writes-on-bgsave-error yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于存储到磁盘中的快照，可以设置是否进行压缩存储。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以设置为关闭此功能，但是存储在磁盘上的快照会比较大。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbcompression yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果希望获取到最大的性能提升，可以关闭此功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbchecksum yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照的文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dbfilename &quot;dump.rdb&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################# REPLICATION #################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Master-Replica replication. Use replicaof to make a Redis instance a copy of</span></span>
<span class="line"><span style="color:#A6ACCD;"># another Redis server. A few things to understand ASAP about Redis replication.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">#   |      Master      | ---&gt; |    Replica    |</span></span>
<span class="line"><span style="color:#A6ACCD;">#   | (receive writes) |      |  (exact copy) |</span></span>
<span class="line"><span style="color:#A6ACCD;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">#1) Redis复制是异步的，但你可以配置一个主停止接受写，如果它似乎没有连接至少给定数量的副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#2)如果复制链接丢失的时间相对较短，Redis副本可以与主服务器进行部分重新同步。您可能希望根据自己的需要配置复制积压大小(请参阅此文件的下一部分)。</span></span>
<span class="line"><span style="color:#A6ACCD;">#3)复制是自动的，不需要用户干预。在网络分区之后，副本会自动尝试重新连接主分区并与它们重新同步。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 主从复制，使用 slaveof 来让一个 redis 实例成为另一个reids 实例的副本，默认关闭</span></span>
<span class="line"><span style="color:#A6ACCD;"># 注意这个只需要在 slave 上配置</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当一个 slave 与 master 失去联系，或者复制正在进行的时候，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  slave 可能会有两种表现：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  1) 如果为 yes ，slave 仍然会应答客户端请求，但返回的数据可能是过时，</span></span>
<span class="line"><span style="color:#A6ACCD;">#     或者数据可能是空的在第一次同步的时候</span></span>
<span class="line"><span style="color:#A6ACCD;">#  2) 如果为 no ，在你执行除了 info he salveof 之外的其他命令时，</span></span>
<span class="line"><span style="color:#A6ACCD;">#     slave 都将返回一个 &quot;SYNC with master in progress&quot; 的错误</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-serve-stale-data yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#你可以配置一个 slave 实体是否接受写入操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  通过写入操作来存储一些短暂的数据对于一个 slave 实例来说可能是有用的，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  因为相对从 master 重新同步数而言，据数据写入到 slave 会更容易被删除。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  但是如果客户端因为一个错误的配置写入，也可能会导致一些问题。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  从 redis 2.6 版起，默认 slaves 都是只读的。</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-read-only yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#主从数据复制是否使用无硬盘复制功能。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  新的从站和重连后不能继续备份的从站，需要做所谓的“完全备份”，即将一个RDB文件从主站传送到从站。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这个传送有以下两种方式：</span></span>
<span class="line"><span style="color:#A6ACCD;">#  1）硬盘备份：redis主站创建一个新的进程，用于把RDB文件写到硬盘上。过一会儿，其父进程递增地将文件传送给从站。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  2）无硬盘备份：redis主站创建一个新的进程，子进程直接把RDB文件写到从站的套接字，不需要用到硬盘。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在硬盘备份的情况下，主站的子进程生成RDB文件。一旦生成，多个从站可以立即排成队列使用主站的RDB文件。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在无硬盘备份的情况下，一次RDB传送开始，新的从站到达后，需要等待现在的传送结束，才能开启新的传送。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果使用无硬盘备份，主站会在开始传送之间等待一段时间（可配置，以秒为单位），希望等待多个子站到达后并行传送。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  在硬盘低速而网络高速（高带宽）情况下，无硬盘备份更好。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当启用无硬盘备份，服务器等待一段时间后才会通过套接字向从站传送RDB文件，这个等待时间是可配置的。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这一点很重要，因为一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次RDB传送。因此服务器等待一段</span></span>
<span class="line"><span style="color:#A6ACCD;">#  时间以期更多的从站到达。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  延迟时间以秒为单位，默认为5秒。要关掉这一功能，只需将它设置为0秒，传送会立即启动。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync-delay 5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#同步后在复制套接字上禁用TCP_NODELAY ?</span></span>
<span class="line"><span style="color:#A6ACCD;">#如果你选择“是”Redis将使用更少的TCP数据包和更少的带宽发送数据副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#但是这可能会增加数据在副本端出现的延迟，在使用默认配置的Linux内核中，延迟高达40毫秒。</span></span>
<span class="line"><span style="color:#A6ACCD;">#如果选择“no”，数据在复制端出现的延迟将会减少，但复制将使用更多的带宽。</span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下，我们优化的是低延迟，但在流量非常大的情况下，或者当主服务器和副本之间有很多跳距时，将其转换为“yes”可能是一个好主意。</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-disable-tcp-nodelay no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#副本优先级是由Redis在INFO输出中发布的一个整数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#它被Redis哨兵用来选择一个副本提升为一个master，如果master不再正常工作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#优先级较低的副本被认为更适合升级，因此，例如，如果有三个优先级为10,10025的副本，Sentinel将选择优先级为10的副本，即优先级最低的副本。</span></span>
<span class="line"><span style="color:#A6ACCD;">#但是，如果优先级为0，则表示该副本不能执行master的角色，因此Redis Sentinel将永远不会选择优先级为0的副本进行升级。</span></span>
<span class="line"><span style="color:#A6ACCD;">#默认情况下，优先级是100。</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-priority 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################## SECURITY ###################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置redis连接密码</span></span>
<span class="line"><span style="color:#A6ACCD;">requirepass &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################### CLIENTS ####################################</span></span>
<span class="line"><span style="color:#A6ACCD;">#设置客户端最大并发连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件</span></span>
<span class="line"><span style="color:#A6ACCD;"># 描述符数-32（redis server自身会使用一些），如果设置 maxclients为0</span></span>
<span class="line"><span style="color:#A6ACCD;"># 表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息</span></span>
<span class="line"><span style="color:#A6ACCD;">maxclients 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################## MEMORY MANAGEMENT ################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################# LAZY FREEING ####################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-eviction no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-expire no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-server-del no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-lazy-flush no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################## APPEND ONLY MODE ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#默认redis使用的是rdb方式持久化，这种方式在许多应用中已经足够用了。但是redis如果中途宕机，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  会导致可能有几分钟的数据丢失，根据save来策略进行持久化，Append Only File是另一种持久化方式，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  可以提供更好的持久化特性。Redis会把每次写入的数据在接收后都写入appendonly.aof文件，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。</span></span>
<span class="line"><span style="color:#A6ACCD;">appendonly no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof持久化策略的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">#  no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  always表示每次写入都执行fsync，以保证数据同步到磁盘。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  everysec表示每秒执行一次fsync，可能会导致丢失这1s数据</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfsync everysec</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在aof重写或者写入rdb文件的时候，会执行大量IO，此时对于everysec和always的aof模式来说，</span></span>
<span class="line"><span style="color:#A6ACCD;">#   执行fsync会造成阻塞过长时间，no-appendfsync-on-rewrite字段设置为默认设置为no。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   如果对延迟要求很高的应用，这个字段可以设置为yes，否则还是设置为no，这样对持久化特性来说这是更安全的选择。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   设置为yes表示rewrite期间对新写操作不fsync,暂时存在内存中,等rewrite完成后再写入，默认为no，建议yes。</span></span>
<span class="line"><span style="color:#A6ACCD;">#   Linux的默认fsync策略是30秒。可能丢失30秒数据。</span></span>
<span class="line"><span style="color:#A6ACCD;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof自动重写配置，当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  即当aof文件增长到一定大小的时候，Redis能够调用bgrewriteaof对日志文件进行重写。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#aof文件可能在尾部是不完整的，当redis启动的时候，aof文件的数据被载入内存。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  重启可能发生在redis所在的主机操作系统宕机后，尤其在ext4文件系统没有加上data=ordered选项，出现这种现象</span></span>
<span class="line"><span style="color:#A6ACCD;">#  redis宕机或者异常终止不会造成尾部不完整现象，可以选择让redis退出，或者导入尽可能多的数据。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果选择的是yes，当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果是no，用户必须手动redis-check-aof修复AOF文件才可以。</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-load-truncated yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-use-rdb-preamble yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################ LUA SCRIPTING  ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 如果达到最大时间限制（毫秒），redis会记个log，然后返回error。当一个脚本超过了最大时限。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 只有SCRIPT KILL和SHUTDOWN NOSAVE可以用。第一个可以杀没有调write命令的东西。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 要是已经调用了write，只能用第二个命令杀</span></span>
<span class="line"><span style="color:#A6ACCD;">lua-time-limit 5000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">################################## SLOW LOG ###################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#slog log是用来记录redis运行中执行比较慢的命令耗时。</span></span>
<span class="line"><span style="color:#A6ACCD;">#当命令的执行超过了指定时间，就记录在slow log中，slog log保存在内存中，所以没有IO操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">#执行时间比slowlog-log-slower-than大的请求记录到slowlog里面，单位是微秒，所以1000000就是1秒。</span></span>
<span class="line"><span style="color:#A6ACCD;">#注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。</span></span>
<span class="line"><span style="color:#A6ACCD;">#只要有足够的内存就行，你可以通过 SLOWLOG RESET 来释放内存</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#延迟监控功能是用来监控redis中执行比较缓慢的一些操作，用LATENCY打印redis实例在跑命令时的耗时图表。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 只记录大于等于下边设置的值的操作，0的话，就是关闭监视。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 默认延迟监控功能是关闭的，如果你需要打开，也可以通过CONFIG SET命令动态设置。</span></span>
<span class="line"><span style="color:#A6ACCD;">latency-monitor-threshold 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################# EVENT NOTIFICATION ##############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">notify-keyspace-events &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">############################### ADVANCED CONFIG ###############################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#hash类型的数据结构在编码上可以使用ziplist和hashtable。</span></span>
<span class="line"><span style="color:#A6ACCD;"># ziplist的特点就是文件存储(以及内存存储)所需的空间较小,在内容较小时,性能和hashtable几乎一样。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 因此redis对hash类型默认采取ziplist。如果hash中条目的条目个数或者value长度达到阀值,将会被重构为hashtable。</span></span>
<span class="line"><span style="color:#A6ACCD;"># 这个参数指的是ziplist中允许存储的最大条目个数，，默认为512，建议为128</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">#ziplist中允许条目value值最大字节数，默认为64，建议为1024</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">#当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。</span></span>
<span class="line"><span style="color:#A6ACCD;">#当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，每个值含义如下：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb =&gt; 1024 bytes）</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）</span></span>
<span class="line"><span style="color:#A6ACCD;">#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。</span></span>
<span class="line"><span style="color:#A6ACCD;">list-max-ziplist-size -2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#这个参数表示一个quicklist两端不被压缩的节点个数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。</span></span>
<span class="line"><span style="color:#A6ACCD;">#实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。</span></span>
<span class="line"><span style="color:#A6ACCD;">#参数list-compress-depth的取值含义如下：</span></span>
<span class="line"><span style="color:#A6ACCD;">#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">#    依此类推…</span></span>
<span class="line"><span style="color:#A6ACCD;">#由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。</span></span>
<span class="line"><span style="color:#A6ACCD;">list-compress-depth 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#数据量小于等于set-max-intset-entries用intset，大于set-max-intset-entries用set</span></span>
<span class="line"><span style="color:#A6ACCD;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#数据量小于等于zset-max-ziplist-entries用ziplist，大于zset-max-ziplist-entries用zset</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#value大小小于等于hll-sparse-max-bytes使用稀疏数据结构（sparse）</span></span>
<span class="line"><span style="color:#A6ACCD;">#  大于hll-sparse-max-bytes使用稠密的数据结构（dense），一个比16000大的value是几乎没用的，</span></span>
<span class="line"><span style="color:#A6ACCD;">#  建议的value大概为3000。如果对CPU要求不高，对空间要求较高的，建议设置到10000左右</span></span>
<span class="line"><span style="color:#A6ACCD;">hll-sparse-max-bytes 3000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#流宏节点的最大大小/项。流数据结构是一个大节点的基数树，其中编码多个项目。使用此配置，可以配置单个节点的字节大小，以及在附加新流项时切换到新节点之前节点可能包含的最大项数。如果将以下设置中的任何一个设置设置为零，则会忽略该限制，因此，可以通过将最大字节设置为0，将最大条目设置为所需的值来设置最大entires限制。</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-bytes 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-entries 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#Redis将在每100毫秒时使用1毫秒的CPU时间来对redis的hash表进行重新hash，可以降低内存的使用。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  当你的使用场景中，有非常严格的实时性需要，不能够接受Redis时不时的对请求有2毫秒的延迟的话，把这项配置为no。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  如果没有这么严格的实时性要求，可以设置为yes，以便能够尽可能快的释放内存</span></span>
<span class="line"><span style="color:#A6ACCD;">activerehashing yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。</span></span>
<span class="line"><span style="color:#A6ACCD;">#对于normal client，第一个0表示取消hard limit，第二个0和第三个0表示取消soft limit，normal</span></span>
<span class="line"><span style="color:#A6ACCD;"># client默认取消限制，因为如果没有寻问，他们是不会接收数据的</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于slave client和MONITER client，如果client-output-buffer一旦超过256mb，又或者超过64mb持续60秒，那么服务器就会立即断开客户端连接。</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit replica 256mb 64mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#对于pubsub client，如果client-output-buffer一旦超过32mb，又或者超过8mb持续60秒，那么服务器就会立即断开客户端连接。</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#redis执行任务的频率为1s除以hz</span></span>
<span class="line"><span style="color:#A6ACCD;">hz 10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#在aof重写的时候，如果打开了aof-rewrite-incremental-fsync开关，系统会每32MB执行一次fsync。</span></span>
<span class="line"><span style="color:#A6ACCD;">#  这对于把文件写入磁盘是有帮助的，可以避免过大的延迟峰值</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#当redis保存RDB文件时，如果启用以下选项，文件将每生成32mb的数据同步。这对于以更增量的方式将文件提交到磁盘并避免较大的延迟峰值非常有用。</span></span>
<span class="line"><span style="color:#A6ACCD;">rdb-save-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Generated by CONFIG REWRITE</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">replicaof 10.20.10.64 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;123456&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br></div></div><h3 id="从节点-02-sentinel-conf" tabindex="-1">从节点-02 sentinel.conf <a class="header-anchor" href="#从节点-02-sentinel-conf" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#守护进程模式启动</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#绑定端口</span></span>
<span class="line"><span style="color:#A6ACCD;">port 26380</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># When running daemonized, Redis Sentinel writes a pid file in</span></span>
<span class="line"><span style="color:#A6ACCD;"># /var/run/redis-sentinel.pid by default. You can specify a custom pid file</span></span>
<span class="line"><span style="color:#A6ACCD;"># location here.</span></span>
<span class="line"><span style="color:#A6ACCD;">#主线程文件存放位置</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis-sentinel.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#保护模式，默认是开启状态，只允许本地客户端连接， 可以设置密码或添加bind来连接</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis/tmp&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># monitor 监控master IP地址和端口，最后的数字1 是有几个哨兵确认即确认主下线。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel myid c21befa4351ecebea1ed9ea206465d9ce1a23107</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#哨兵监控的master，主从配置一样，在进行主从切换时6379会变成当前的master端口，</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel deny-scripts-reconfig yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># master或slave多长时间（默认30秒）不能使用后标记为s_down状态。</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel monitor master01 10.20.10.64 6379 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#若sentinel在该配置值内未能完成failover操作（即故障时master/slave自动切换），则认为本次failover失败</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel down-after-milliseconds master01 5000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#设置master和slaves验证密码</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel failover-timeout master01 18000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Generated by CONFIG REWRITE</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel auth-pass master01 123456</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel config-epoch master01 200</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel leader-epoch master01 209</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-replica master01 10.20.10.63 6380</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-replica master01 10.20.10.63 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.63 26379 88921903e75ec4b42c2281f498a6e8e49ca5b089</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel known-sentinel master01 10.20.10.64 26379 6f21c7c8e9590dd8ddc2a834c279f13b77a34088</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel current-epoch 209</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="开通防火墙端口" tabindex="-1">开通防火墙端口 <a class="header-anchor" href="#开通防火墙端口" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=6379/tcp --permanent &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=6380/tcp --permanent &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=26379/tcp --permanent &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=26380/tcp --permanent &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=6379/tcp --permanent &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=26379/tcp --permanent &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>查看开放的端口：</p><p>/sbin/iptables -L -n</p><h3 id="redis-启动" tabindex="-1">redis 启动 <a class="header-anchor" href="#redis-启动" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">./bin/redis-server ./redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="redis-哨兵启动" tabindex="-1">redis 哨兵启动 <a class="header-anchor" href="#redis-哨兵启动" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">./bin/redis-sentinel ./sentinel.conf </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="redis-后台连接" tabindex="-1">redis 后台连接 <a class="header-anchor" href="#redis-后台连接" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">./bin/redis-cli -a 123456  -h 10.20.10.64 -p 6379 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="redis-停止" tabindex="-1">redis 停止 <a class="header-anchor" href="#redis-停止" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">./bin/redis-cli -a 123456  -h 10.20.10.64 -p 6379  shutdown</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="检查特定端口" tabindex="-1">检查特定端口 <a class="header-anchor" href="#检查特定端口" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">netstat -tplugn | grep :80</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="查看redis" tabindex="-1">查看redis <a class="header-anchor" href="#查看redis" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> ps aux|grep redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="防火墙" tabindex="-1">防火墙 <a class="header-anchor" href="#防火墙" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">查看防火墙所有信息</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --list-all</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">查询端口开启信息</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --list-ports</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">更新防火墙规则</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">启动|关闭|重新启动 防火墙</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl [start|stop|restart] firewalld.service</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>`,47),r=[e];function c(i,o,b,t,C,A){return n(),a("div",null,r)}const y=s(p,[["render",c]]);export{m as __pageData,y as default};
