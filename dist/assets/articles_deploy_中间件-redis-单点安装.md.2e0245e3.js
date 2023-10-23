import{_ as s,o as n,c as a,a as e}from"./app.4690b2e6.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"软件介绍","slug":"软件介绍","link":"#软件介绍","children":[]},{"level":3,"title":"编写人员","slug":"编写人员","link":"#编写人员","children":[]},{"level":3,"title":"安装过程:","slug":"安装过程","link":"#安装过程","children":[]},{"level":3,"title":"安全整改","slug":"安全整改","link":"#安全整改","children":[]}],"relativePath":"articles/deploy/中间件-redis-单点安装.md","lastUpdated":1697780285000}'),l={name:"articles/deploy/中间件-redis-单点安装.md"},p=e(`<h3 id="软件介绍" tabindex="-1">软件介绍 <a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a></h3><p>redis</p><h3 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h3><h4 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-hidden="true">#</a></h4><h4 id="局限性" tabindex="-1">局限性 <a class="header-anchor" href="#局限性" aria-hidden="true">#</a></h4><h4 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-hidden="true">#</a></h4><h3 id="安装过程" tabindex="-1">安装过程: <a class="header-anchor" href="#安装过程" aria-hidden="true">#</a></h3><p>1、下载文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/</span></span>
<span class="line"><span style="color:#A6ACCD;">cd /usr/local/</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://10.0.1.27/static/download/software/redis5.zip </span></span>
<span class="line"><span style="color:#A6ACCD;">unzip redis5.zip</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果缺少unzip命令，请先安装unzip</p><p>2、生成配置文件，需要按需修改</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/redis/redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /usr/local/redis/redis.conf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 10.0.1.34</span></span>
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
<span class="line"><span style="color:#A6ACCD;">rename-command FLUSHALL &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">rename-command CONFIG   &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">rename-command EVAL     &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">masterauth &quot;mgf@hhwy&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><p>3、查看配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cat /usr/local/redis/redis.conf |grep -v ^# |grep -v ^$</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>4、配置开机启动</p><p>如果是使用命令启动的服务，在配置前先将服务停掉，可使用ps -ef | grep redis查看进程PID，通过kill PID关闭服务<br> 创建服务启动配置，service中的配置根据实际路径修改</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /lib/systemd/system/redis.service </span></span>
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
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="安全整改" tabindex="-1">安全整改 <a class="header-anchor" href="#安全整改" aria-hidden="true">#</a></h3><h4 id="修改主目录权限-需要验证-修改后导致redis-不能用" tabindex="-1">修改主目录权限(需要验证，修改后导致redis 不能用) <a class="header-anchor" href="#修改主目录权限-需要验证-修改后导致redis-不能用" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">chmod  600 /usr/local/redis/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="修改日志和配置文件权限" tabindex="-1">修改日志和配置文件权限 <a class="header-anchor" href="#修改日志和配置文件权限" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">chmod  600 /usr/local/redis/redis.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod  600 /usr/local/redis/logs/log.log</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="重置命令" tabindex="-1">重置命令 <a class="header-anchor" href="#重置命令" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">配置文件添加</span></span>
<span class="line"><span style="color:#A6ACCD;">rename-command FLUSHALL &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">rename-command CONFIG   &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">rename-command EVAL     &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,30),r=[p];function i(c,o,t,b,d,u){return n(),a("div",null,r)}const A=s(l,[["render",i]]);export{m as __pageData,A as default};
