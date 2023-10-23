import{_ as s,o as a,c as n,a as l}from"./app.e6daa892.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"软件介绍","slug":"软件介绍","link":"#软件介绍","children":[]},{"level":3,"title":"编写人员","slug":"编写人员","link":"#编写人员","children":[]},{"level":3,"title":"名词解释:","slug":"名词解释","link":"#名词解释","children":[]},{"level":3,"title":"官方文档:","slug":"官方文档","link":"#官方文档","children":[]},{"level":3,"title":"安装过程:","slug":"安装过程","link":"#安装过程","children":[]},{"level":3,"title":"所有服务器均需安装","slug":"所有服务器均需安装","link":"#所有服务器均需安装","children":[]}],"relativePath":"articles/deploy/中间件-ES-集群安装.md","lastUpdated":1697780285000}'),e={name:"articles/deploy/中间件-ES-集群安装.md"},p=l(`<h3 id="软件介绍" tabindex="-1">软件介绍 <a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a></h3><p>elasticsearch 集群安装</p><h3 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h3><h4 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-hidden="true">#</a></h4><p>ES各种节点的分工</p><ul><li><ol><li>客户端节点 当主节点和数据节点配置都设置为false的时候，该节点只能处理路由请求，处理搜索，分发索引操作等，从本质上来说该客户节点表现为智能负载平衡器。独立的客户端节点在一个比较大的集群中是非常有用的，他协调主节点和数据节点，客户端节点加入集群可以得到集群的状态，根据集群的状态可以直接路由请求。</li></ol></li><li><ol start="2"><li>数据节点 数据节点主要是存储索引数据的节点，主要对文档进行增删改查操作，聚合操作等。数据节点对cpu，内存，io要求较高， 在优化的时候需要监控数据节点的状态，当资源不够的时候，需要在集群中添加新的节点。</li></ol></li><li><ol start="3"><li>主节点 主资格节点的主要职责是和集群操作相关的内容，如创建或删除索引，跟踪哪些节点是群集的一部分，并决定哪些分片分配给相关的节点。稳定的主节点对集群的健康是非常重要的，默认情况下任何一个集群中的节点都有可能被选为主节点，索引数据和搜索查询等操作会占用大量的cpu，内存，io资源，为了确保一个集群的稳定，分离主节点和数据节点是一个比较好的选择。</li></ol></li><li><ol start="4"><li>建议 在一个生产集群中我们可以对这些节点的职责进行划分，建议集群中设置3台以上的节点作为master节点，这些节点只负责成为主节点，维护整个集群的状态。再根据数据量设置一批data节点，这些节点只负责存储数据，后期提供建立索引和查询索引的服务，这样的话如果用户请求比较频繁，这些节点的压力也会比较大，所以在集群中建议再设置一批client节点(node.master: false node.data: false)，这些节点只负责处理用户请求，实现请求转发，负载均衡等功能。</li></ol></li></ul><h4 id="局限性" tabindex="-1">局限性 <a class="header-anchor" href="#局限性" aria-hidden="true">#</a></h4><h4 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-hidden="true">#</a></h4><h3 id="名词解释" tabindex="-1">名词解释: <a class="header-anchor" href="#名词解释" aria-hidden="true">#</a></h3><h3 id="官方文档" tabindex="-1">官方文档: <a class="header-anchor" href="#官方文档" aria-hidden="true">#</a></h3><p>es 调优</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">https://www.cnblogs.com/xibuhaohao/p/11660284.html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="安装过程" tabindex="-1">安装过程: <a class="header-anchor" href="#安装过程" aria-hidden="true">#</a></h3><p>安装服务器为</p><ul><li>10.0.1.24</li><li>10.0.1.25</li><li>10.0.1.26</li></ul><h3 id="所有服务器均需安装" tabindex="-1">所有服务器均需安装 <a class="header-anchor" href="#所有服务器均需安装" aria-hidden="true">#</a></h3><h4 id="下载es" tabindex="-1">下载ES <a class="header-anchor" href="#下载es" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/software/</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/elasticsearch/datas</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/elasticsearch/logs</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/elasticsearch/tmp</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">cd /data/software/</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://www.mgf.show/static/download/software/elasticsearch-7.13.0-linux-x86_64.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;">tar zxvf elasticsearch-7.13.0-linux-x86_64.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;">mv elasticsearch-7.13.0 /usr/local/elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="设置环境变量" tabindex="-1">设置环境变量 <a class="header-anchor" href="#设置环境变量" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/profile</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -u 65536</span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -n 65536</span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -d unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -m unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -s unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -t unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">ulimit -v unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export JAVA_HOME=/usr/local/elasticsearch/elasticsearch-7.13.0/jdk</span></span>
<span class="line"><span style="color:#A6ACCD;">export PATH=$JAVA_HOME/bin:$PATH</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h5 id="开放防火墙端口" tabindex="-1">开放防火墙端口 <a class="header-anchor" href="#开放防火墙端口" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=9200/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=9300/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h5 id="内存优化" tabindex="-1">内存优化 <a class="header-anchor" href="#内存优化" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt;/etc/sysctl.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">fs.file-max=655360</span></span>
<span class="line"><span style="color:#A6ACCD;">vm.max_map_count=655360</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sysctl -p</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="写调优" tabindex="-1">写调优 <a class="header-anchor" href="#写调优" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">调优索引写入速率</span></span>
<span class="line"><span style="color:#A6ACCD;">Index调优</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">index.refresh_interval: 5s    索引速率与搜索实时直接的平衡</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">index.translog.flush_threshold_ops: 50000    事务日志的刷新间隔，适当增大可降低磁盘IO</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">indices.store.throttle.max_bytes_per_sec: 100mb    当磁盘IO比较充足，可增大索引合并的限流值</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h5 id="jvm-参数" tabindex="-1">jvm 参数 <a class="header-anchor" href="#jvm-参数" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/jvm.options</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt;/usr/local/elasticsearch/elasticsearch-7.13.0/config/jvm.options &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">-Xms4g</span></span>
<span class="line"><span style="color:#A6ACCD;">-Xmx4g</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">8-13:-XX:+UseConcMarkSweepGC</span></span>
<span class="line"><span style="color:#A6ACCD;">8-13:-XX:CMSInitiatingOccupancyFraction=75</span></span>
<span class="line"><span style="color:#A6ACCD;">8-13:-XX:+UseCMSInitiatingOccupancyOnly</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">14-:-XX:+UseG1GC</span></span>
<span class="line"><span style="color:#A6ACCD;">-XX:+HeapDumpOnOutOfMemoryError</span></span>
<span class="line"><span style="color:#A6ACCD;">-XX:HeapDumpPath=data</span></span>
<span class="line"><span style="color:#A6ACCD;">-XX:ErrorFile=/data/elasticsearch/logs/hs_err_pid%p.log</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:+PrintGCDetails</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:+PrintGCDateStamps</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:+PrintTenuringDistribution</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:+PrintGCApplicationStoppedTime</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-Xloggc:logs/gc.log</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:+UseGCLogFileRotation</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:NumberOfGCLogFiles=32</span></span>
<span class="line"><span style="color:#A6ACCD;">8:-XX:GCLogFileSize=64m</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">9-:-Xlog:gc*,gc+age=trace,safepoint:file=logs/gc.log:utctime,pid,tags:filecount=32,filesize=64m</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h5 id="_10-0-1-24-配置文件" tabindex="-1">10.0.1.24 配置文件 <a class="header-anchor" href="#_10-0-1-24-配置文件" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt;/usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># es-7.13.0-node-1</span></span>
<span class="line"><span style="color:#A6ACCD;">cluster.name: search-7.13.0</span></span>
<span class="line"><span style="color:#A6ACCD;">node.name: node-1</span></span>
<span class="line"><span style="color:#A6ACCD;">node.master: true</span></span>
<span class="line"><span style="color:#A6ACCD;">node.data: true</span></span>
<span class="line"><span style="color:#A6ACCD;">node.ingest: false</span></span>
<span class="line"><span style="color:#A6ACCD;">network.host: 0.0.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">http.port: 9200</span></span>
<span class="line"><span style="color:#A6ACCD;">transport.port: 9300</span></span>
<span class="line"><span style="color:#A6ACCD;">discovery.seed_hosts: [&quot;10.0.1.24&quot;,&quot;10.0.1.25&quot;,&quot;10.0.1.26&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">cluster.initial_master_nodes: [&quot;node-1&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">path.data: /data/elasticsearch/datas</span></span>
<span class="line"><span style="color:#A6ACCD;">path.logs: /data/elasticsearch/logs</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h5 id="_10-0-1-25-配置文件" tabindex="-1">10.0.1.25 配置文件 <a class="header-anchor" href="#_10-0-1-25-配置文件" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt;/usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># es-7.13.0-node-2</span></span>
<span class="line"><span style="color:#A6ACCD;">cluster.name: search-7.13.0</span></span>
<span class="line"><span style="color:#A6ACCD;">node.name: node-2</span></span>
<span class="line"><span style="color:#A6ACCD;">node.master: true</span></span>
<span class="line"><span style="color:#A6ACCD;">node.data: true</span></span>
<span class="line"><span style="color:#A6ACCD;">node.ingest: false</span></span>
<span class="line"><span style="color:#A6ACCD;">network.host: 0.0.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">http.port: 9200</span></span>
<span class="line"><span style="color:#A6ACCD;">transport.port: 9300</span></span>
<span class="line"><span style="color:#A6ACCD;">discovery.seed_hosts: [&quot;10.0.1.24&quot;,&quot;10.0.1.25&quot;,&quot;10.0.1.26&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">path.data: /data/elasticsearch/datas</span></span>
<span class="line"><span style="color:#A6ACCD;">path.logs: /data/elasticsearch/logs</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h5 id="_10-0-1-26-配置文件" tabindex="-1">10.0.1.26 配置文件 <a class="header-anchor" href="#_10-0-1-26-配置文件" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt;/usr/local/elasticsearch/elasticsearch-7.13.0/config/elasticsearch.yml &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># es-7.13.0-node-3</span></span>
<span class="line"><span style="color:#A6ACCD;">cluster.name: search-7.13.0</span></span>
<span class="line"><span style="color:#A6ACCD;">node.name: node-3</span></span>
<span class="line"><span style="color:#A6ACCD;">node.master: true</span></span>
<span class="line"><span style="color:#A6ACCD;">node.data: true</span></span>
<span class="line"><span style="color:#A6ACCD;">node.ingest: false</span></span>
<span class="line"><span style="color:#A6ACCD;">network.host: 0.0.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">http.port: 9200</span></span>
<span class="line"><span style="color:#A6ACCD;">transport.port: 9300</span></span>
<span class="line"><span style="color:#A6ACCD;">discovery.seed_hosts: [&quot;10.0.1.24&quot;,&quot;10.0.1.25&quot;,&quot;10.0.1.26&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">path.data: /data/elasticsearch/datas</span></span>
<span class="line"><span style="color:#A6ACCD;">path.logs: /data/elasticsearch/logs</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="创建用户" tabindex="-1">创建用户 <a class="header-anchor" href="#创建用户" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">groupadd elasticsearch &amp;&amp; useradd -r -g elasticsearch elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;">chown -R elasticsearch:elasticsearch /data/elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;">chown -R elasticsearch:elasticsearch /usr/local/elasticsearch/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="创建服务文件" tabindex="-1">创建服务文件 <a class="header-anchor" href="#创建服务文件" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /lib/systemd/system/elasticsearch.service </span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt; /lib/systemd/system/elasticsearch.service &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">[Unit]</span></span>
<span class="line"><span style="color:#A6ACCD;">Description=elasticsearch 7.1</span></span>
<span class="line"><span style="color:#A6ACCD;">After=network.target</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[Service]</span></span>
<span class="line"><span style="color:#A6ACCD;">#Type=forking</span></span>
<span class="line"><span style="color:#A6ACCD;">Type=simple</span></span>
<span class="line"><span style="color:#A6ACCD;">PIDFile=/var/run/elasticsearch_9200.pid</span></span>
<span class="line"><span style="color:#A6ACCD;">User=elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;">Group=elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;">LimitNOFILE=65536</span></span>
<span class="line"><span style="color:#A6ACCD;">LimitNPROC=4096</span></span>
<span class="line"><span style="color:#A6ACCD;">LimitAS=infinity</span></span>
<span class="line"><span style="color:#A6ACCD;">StandardOutput=journal</span></span>
<span class="line"><span style="color:#A6ACCD;">StandardError=inherit</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStart=/usr/local/elasticsearch/elasticsearch-7.13.0/bin/elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;">Restart=always</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecReload=/bin/kill -s HUP </span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStop=/bin/kill -s QUIT </span></span>
<span class="line"><span style="color:#A6ACCD;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#A6ACCD;">[Install]</span></span>
<span class="line"><span style="color:#A6ACCD;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>重新加载redis服务的配置文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>启动redis服务</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl start elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>设置redis服务开机自启动</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl enable elasticsearch</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,44),r=[p];function c(i,t,o,b,d,u){return a(),n("div",null,r)}const m=s(e,[["render",c]]);export{A as __pageData,m as default};
