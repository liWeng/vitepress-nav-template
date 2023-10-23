import{_ as s,o as n,c as a,a as e}from"./app.4690b2e6.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"redis集群部署 - 哨兵模式（sentinel）","slug":"redis集群部署-哨兵模式-sentinel","link":"#redis集群部署-哨兵模式-sentinel","children":[{"level":3,"title":"编译安装redis服务","slug":"编译安装redis服务","link":"#编译安装redis服务","children":[]},{"level":3,"title":"使用编译过的程序部署","slug":"使用编译过的程序部署","link":"#使用编译过的程序部署","children":[]},{"level":3,"title":"配置主从节点","slug":"配置主从节点","link":"#配置主从节点","children":[]},{"level":3,"title":"哨兵配置","slug":"哨兵配置","link":"#哨兵配置","children":[]},{"level":3,"title":"常见问题","slug":"常见问题","link":"#常见问题","children":[]}]}],"relativePath":"articles/deploy/中间件-redis集群安装-哨兵模式.md","lastUpdated":1697780285000}'),l={name:"articles/deploy/中间件-redis集群安装-哨兵模式.md"},p=e(`<h2 id="redis集群部署-哨兵模式-sentinel" tabindex="-1">redis集群部署 - 哨兵模式（sentinel） <a class="header-anchor" href="#redis集群部署-哨兵模式-sentinel" aria-hidden="true">#</a></h2><h3 id="编译安装redis服务" tabindex="-1">编译安装redis服务 <a class="header-anchor" href="#编译安装redis服务" aria-hidden="true">#</a></h3><p>1、下载或手动上传并解压服务包</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd /data/software &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://mgf.show/static/download/software/redis-5.0.5.tar.gz &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">tar -zxvf redis-5.0.5.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>2、安装gcc支持<br> centos7使用</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yum -y install gcc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>OpenEuler或CentOS 8使用</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">dnf -y install gcc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>3、进入目录，编译源码</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd redis-5.0.5 &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">make MALLOC=libc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>4、编译完成会有如下提示(以下内容直接取最后几行内容)</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    INSTALL redis-check-rdb</span></span>
<span class="line"><span style="color:#A6ACCD;">    INSTALL redis-check-aof</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Hint: It&#39;s a good idea to run &#39;make test&#39; ;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">make[1]: 离开目录“/data/software/redis-5.0.5/src”</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>说明：如果编译失败，直接跳过4、5步骤，使用下载编译后的文件进行部署</p><p>5、创建对应目录，复制对应文件到指定目录</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/redis/tmp &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-sentinel /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-server /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-cli /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-check-aof /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/src/redis-benchmark /usr/local/redis/bin &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/redis.conf /usr/local/redis/ &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">cp /data/software/redis-5.0.5/sentinel.conf /usr/local/redis/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="使用编译过的程序部署" tabindex="-1">使用编译过的程序部署 <a class="header-anchor" href="#使用编译过的程序部署" aria-hidden="true">#</a></h3><p>下载程序包</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">wget http://mgf.show/static/download/software/redis5.zip</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>解压</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">unzip redis5.zip</span></span>
<span class="line"><span style="color:#A6ACCD;">mv redis5 /usr/local/redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>修改执行权限</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd /usr/local/redis</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod +x bin/*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="配置主从节点" tabindex="-1">配置主从节点 <a class="header-anchor" href="#配置主从节点" aria-hidden="true">#</a></h3><p>1、修改主节点 redis.conf，记得修改bind 10.0.5.21配置为实际IP配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/redis/redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /usr/local/redis/redis.conf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 10.0.5.21</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;">port 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-backlog 511</span></span>
<span class="line"><span style="color:#A6ACCD;">timeout 300</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-keepalive 300</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;">supervised no</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis_6379.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">loglevel notice</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;/usr/local/redis/redis.log&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">databases 16</span></span>
<span class="line"><span style="color:#A6ACCD;">save 900 1</span></span>
<span class="line"><span style="color:#A6ACCD;">save 300 10</span></span>
<span class="line"><span style="color:#A6ACCD;">save 60 10000</span></span>
<span class="line"><span style="color:#A6ACCD;">stop-writes-on-bgsave-error no</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbcompression yes</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbchecksum yes</span></span>
<span class="line"><span style="color:#A6ACCD;">dbfilename &quot;dump.rdb&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-serve-stale-data yes</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-read-only yes</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync no</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync-delay 5</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-disable-tcp-nodelay no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-priority 100</span></span>
<span class="line"><span style="color:#A6ACCD;">requirepass &quot;mgf@hhwy&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">maxclients 10000</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-eviction no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-expire no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-server-del no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-lazy-flush no</span></span>
<span class="line"><span style="color:#A6ACCD;">appendonly no</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfsync everysec</span></span>
<span class="line"><span style="color:#A6ACCD;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-load-truncated yes</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-use-rdb-preamble yes</span></span>
<span class="line"><span style="color:#A6ACCD;">lua-time-limit 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#A6ACCD;">latency-monitor-threshold 0</span></span>
<span class="line"><span style="color:#A6ACCD;">notify-keyspace-events &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">list-max-ziplist-size -2</span></span>
<span class="line"><span style="color:#A6ACCD;">list-compress-depth 0</span></span>
<span class="line"><span style="color:#A6ACCD;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">hll-sparse-max-bytes 3000</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-bytes 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-entries 100</span></span>
<span class="line"><span style="color:#A6ACCD;">activerehashing yes</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit replica 256mb 64mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;">hz 10</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;">rdb-save-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;mgf@hhwy&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><p>2、修改其他从节点的redis.conf<br> 将其余从节点配置文件的中bind IP 以及 replicaof 10.0.5.21 6379<br> 说明：replicaof 后面配置为主节点IP及端口</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/redis/redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /usr/local/redis/redis.conf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 10.0.5.22</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;">port 6379</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-backlog 511</span></span>
<span class="line"><span style="color:#A6ACCD;">timeout 300</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp-keepalive 300</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;">supervised no</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/var/run/redis_6379.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">loglevel notice</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">databases 16</span></span>
<span class="line"><span style="color:#A6ACCD;">save 900 1</span></span>
<span class="line"><span style="color:#A6ACCD;">save 300 10</span></span>
<span class="line"><span style="color:#A6ACCD;">save 60 10000</span></span>
<span class="line"><span style="color:#A6ACCD;">stop-writes-on-bgsave-error yes</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbcompression yes</span></span>
<span class="line"><span style="color:#A6ACCD;">rdbchecksum yes</span></span>
<span class="line"><span style="color:#A6ACCD;">dbfilename &quot;dump.rdb&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;mgf@hhwy&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-serve-stale-data yes</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-read-only yes</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync no</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-diskless-sync-delay 5</span></span>
<span class="line"><span style="color:#A6ACCD;">repl-disable-tcp-nodelay no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-priority 100</span></span>
<span class="line"><span style="color:#A6ACCD;">requirepass &quot;mgf@hhwy&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">maxclients 10000</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-eviction no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-expire no</span></span>
<span class="line"><span style="color:#A6ACCD;">lazyfree-lazy-server-del no</span></span>
<span class="line"><span style="color:#A6ACCD;">replica-lazy-flush no</span></span>
<span class="line"><span style="color:#A6ACCD;">appendonly no</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">appendfsync everysec</span></span>
<span class="line"><span style="color:#A6ACCD;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#A6ACCD;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-load-truncated yes</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-use-rdb-preamble yes</span></span>
<span class="line"><span style="color:#A6ACCD;">lua-time-limit 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#A6ACCD;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#A6ACCD;">latency-monitor-threshold 0</span></span>
<span class="line"><span style="color:#A6ACCD;">notify-keyspace-events &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">hash-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">list-max-ziplist-size -2</span></span>
<span class="line"><span style="color:#A6ACCD;">list-compress-depth 0</span></span>
<span class="line"><span style="color:#A6ACCD;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#A6ACCD;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#A6ACCD;">hll-sparse-max-bytes 3000</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-bytes 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">stream-node-max-entries 100</span></span>
<span class="line"><span style="color:#A6ACCD;">activerehashing yes</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit replica 256mb 64mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#A6ACCD;">hz 10</span></span>
<span class="line"><span style="color:#A6ACCD;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;">rdb-save-incremental-fsync yes</span></span>
<span class="line"><span style="color:#A6ACCD;">replicaof 10.0.5.21 6379</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><p>3、开启防火墙端口<br> 默认6379，可根据实际修改<br> 注：如果防火墙服务未启用，可忽略该步骤</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=6379/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>4、启动主从节点<br> 将所有节点上redis-server启动，按照先主后从顺序启动</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>5、验证服务</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/redis/bin/redis-cli -h 10.0.5.21</span></span>
<span class="line"><span style="color:#A6ACCD;">auth mgf@hhwy</span></span>
<span class="line"><span style="color:#A6ACCD;">info</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>6、配置开机启动</p><p>配置开机启动前，检查SELinux是否已关闭，如未关闭，可能会导致systemctl启动服务失败，临时关闭使用setenforce 0,永久关闭编辑配置文件后重启<br> 如果是使用命令启动的服务，在配置前先将服务停掉，可使用ps -ef | grep redis查看进程PID，通过kill PID关闭服务<br> 创建服务启动配置，service中的配置根据实际路径修改</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /lib/systemd/system/redis.service </span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt; /lib/systemd/system/redis.service &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">[Unit]</span></span>
<span class="line"><span style="color:#A6ACCD;">Description=Redis 5</span></span>
<span class="line"><span style="color:#A6ACCD;">After=network.target</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[Service]</span></span>
<span class="line"><span style="color:#A6ACCD;">Type=forking</span></span>
<span class="line"><span style="color:#A6ACCD;">PIDFile=/var/run/redis_6379.pid</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecReload=/bin/kill -s HUP </span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStop=/bin/kill -s QUIT </span></span>
<span class="line"><span style="color:#A6ACCD;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[Install]</span></span>
<span class="line"><span style="color:#A6ACCD;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>重新加载redis服务的配置文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>启动redis服务</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl start redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>设置redis服务开机自启动</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl enable redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="哨兵配置" tabindex="-1">哨兵配置 <a class="header-anchor" href="#哨兵配置" aria-hidden="true">#</a></h3><p>1、创建配置文件，修改相应主节点配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/redis/sentinel.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /usr/local/redis/sentinel.conf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">daemonize yes</span></span>
<span class="line"><span style="color:#A6ACCD;">port 26379</span></span>
<span class="line"><span style="color:#A6ACCD;">pidfile &quot;/usr/local/redis/redis-sentinel.pid&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">logfile &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">protected-mode no</span></span>
<span class="line"><span style="color:#A6ACCD;">dir &quot;/usr/local/redis/tmp&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel deny-scripts-reconfig yes</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel monitor master01 10.0.5.21 6379 2</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel down-after-milliseconds master01 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel failover-timeout master01 18000</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel auth-pass master01 mgf@hhwy</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel config-epoch master01 210</span></span>
<span class="line"><span style="color:#A6ACCD;">sentinel leader-epoch master01 212</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>注意：<code>sentinel monitor 集群名称 主节点IP</code> 后面的IP配置主节点IP</p><p>2、开启防火墙端口<br> 默认26379，可根据实际修改<br> 注：如果防火墙服务未启用，可忽略该步骤</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=26379/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>4、启动哨兵</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/redis/bin/redis-sentinel /usr/local/redis/sentinel.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>验证哨兵</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/redis/bin/redis-cli -h 10.0.5.21 -p 26379</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>5、配置开机启动<br> 配置开机启动前，检查SELinux是否已关闭，如未关闭，可能会导致systemctl启动服务失败，临时关闭使用setenforce 0,永久关闭编辑配置文件后重启<br> 如果是使用命令启动的服务，在配置前先将服务停掉，可使用ps -ef | grep redis-sentinel查看进程PID，通过kill PID关闭服务<br> 创建服务启动配置，service中的配置根据实际路径修改</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /lib/systemd/system/redis-sentinel.service  </span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt; /lib/systemd/system/redis-sentinel.service &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">[Unit]</span></span>
<span class="line"><span style="color:#A6ACCD;">Description=Redis-sentinel</span></span>
<span class="line"><span style="color:#A6ACCD;">After=network.target redis.service</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[Service]</span></span>
<span class="line"><span style="color:#A6ACCD;">Type=forking</span></span>
<span class="line"><span style="color:#A6ACCD;">PIDFile=/var/run/redis-sentinel.pid</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStart=/usr/local/redis/bin/redis-sentinel /usr/local/redis/sentinel.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecReload=/bin/kill -s HUP </span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStop=/bin/kill -s QUIT </span></span>
<span class="line"><span style="color:#A6ACCD;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[Install]</span></span>
<span class="line"><span style="color:#A6ACCD;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>重新加载redis哨兵服务的配置文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>启动redis哨兵服务</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl start redis-sentinel</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>设置redis哨兵服务开机自启动</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl enable redis-sentinel</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-hidden="true">#</a></h3><p>1、编译异常<br> 1)缺少相关类库，查找并安装<br> 2)如果类库不好处理，可以直接使用编译好的直接部署<br> 2、使用服务方式启动异常<br> 1)检查SELinux是否关闭<br> 2)检查启动命令路径或参数是否有误</p>`,62),r=[p];function i(c,o,t,b,C,d){return n(),a("div",null,r)}const A=s(l,[["render",i]]);export{m as __pageData,A as default};
