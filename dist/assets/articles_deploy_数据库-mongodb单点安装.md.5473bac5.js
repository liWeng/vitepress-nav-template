import{_ as s,o as n,c as a,a as e}from"./app.e6daa892.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"编写人员","slug":"编写人员","link":"#编写人员","children":[]},{"level":3,"title":"如果安装错误，则执行下列清空环境命令","slug":"如果安装错误-则执行下列清空环境命令","link":"#如果安装错误-则执行下列清空环境命令","children":[]}],"relativePath":"articles/deploy/数据库-mongodb单点安装.md","lastUpdated":1697780285000}'),l={name:"articles/deploy/数据库-mongodb单点安装.md"},p=e(`<h3 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h3><h4 id="环境说明" tabindex="-1">环境说明 <a class="header-anchor" href="#环境说明" aria-hidden="true">#</a></h4><pre><code>节点：10.10.10.62 主节点
</code></pre><h5 id="相关依赖" tabindex="-1">相关依赖 <a class="header-anchor" href="#相关依赖" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yum install numactl wget lsof telnet -y</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="禁止transparent-huge-pages" tabindex="-1">禁止Transparent Huge Pages <a class="header-anchor" href="#禁止transparent-huge-pages" aria-hidden="true">#</a></h5><ol><li>查看状态</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cat /sys/kernel/mm/transparent_hugepage/defrag;</span></span>
<span class="line"><span style="color:#A6ACCD;">[always] madvise never</span></span>
<span class="line"><span style="color:#A6ACCD;">cat /sys/kernel/mm/transparent_hugepage/enabled;</span></span>
<span class="line"><span style="color:#A6ACCD;">[always] madvise never</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>上述状态说明THP是开启的</p><ol start="2"><li>禁用THP</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">echo never &gt; /sys/kernel/mm/transparent_hugepage/enabled</span></span>
<span class="line"><span style="color:#A6ACCD;">echo never &gt; /sys/kernel/mm/transparent_hugepage/defrag</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3"><li>开启自动禁用 编辑/etc/rc.d/rc.local ，在最后追加如下内容</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">if test -f /sys/kernel/mm/transparent_hugepage/enabled; then</span></span>
<span class="line"><span style="color:#A6ACCD;">echo never &gt; /sys/kernel/mm/transparent_hugepage/enabled</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;">if test -f /sys/kernel/mm/transparent_hugepage/defrag; then</span></span>
<span class="line"><span style="color:#A6ACCD;">echo never &gt; /sys/kernel/mm/transparent_hugepage/defrag</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h5 id="创建用户、组" tabindex="-1">创建用户、组 <a class="header-anchor" href="#创建用户、组" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    groupadd mongodb &amp;&amp; useradd -r -g mongodb mongodb</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="挂载卷组" tabindex="-1">挂载卷组 <a class="header-anchor" href="#挂载卷组" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">每个分片使用不同的卷组，分散磁盘压力，根据实际情况挂载</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="修改系统ulimit" tabindex="-1">修改系统ulimit <a class="header-anchor" href="#修改系统ulimit" aria-hidden="true">#</a></h5><p>vi /etc/profile</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">　#添加如下行</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -u 65536</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -n 65536</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -d unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -m unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -s unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -t unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;">  ulimit -v unlimited</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h5 id="创建文件夹" tabindex="-1">创建文件夹 <a class="header-anchor" href="#创建文件夹" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mongodb/conf</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mongodb/data</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mongodb/log</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mongodb/mongokey</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="开启防火墙端口" tabindex="-1">开启防火墙端口 <a class="header-anchor" href="#开启防火墙端口" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=27017/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="下载安装文件" tabindex="-1">下载安装文件 <a class="header-anchor" href="#下载安装文件" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/software &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">cd /data/software &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://www.mgf.show/static/download/software/mongodb-linux-x86_64-rhel70-4.0.2.tgz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">tar -zxvf mongodb-linux-x86_64-rhel70-4.0.2.tgz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/mongodb/ &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">mv mongodb-linux-x86_64-rhel70-4.0.2 /usr/local/mongodb/mongodb-4.0.2 &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">cd /usr/local/mongodb/mongodb-4.0.2 &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod 755 /usr/local/mongodb/mongodb-4.0.2/bin/*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h5 id="配置环境变量" tabindex="-1">配置环境变量 <a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a></h5><p>vi /etc/profile</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">export MONGODB_HOME=/usr/local/mongodb/mongodb-4.0.2</span></span>
<span class="line"><span style="color:#A6ACCD;">export PATH=$MONGODB_HOME/bin:$PATH</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>加载环境变量</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">source /etc/profile</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="节点10-10-10-62配置文件" tabindex="-1">节点10.10.10.62配置文件 <a class="header-anchor" href="#节点10-10-10-62配置文件" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cat &gt;&gt; /data/mongodb/conf/node.conf  &lt;&lt;  EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># where to write logging data.</span></span>
<span class="line"><span style="color:#A6ACCD;">systemLog:</span></span>
<span class="line"><span style="color:#A6ACCD;">  destination: file</span></span>
<span class="line"><span style="color:#A6ACCD;">  logAppend: false</span></span>
<span class="line"><span style="color:#A6ACCD;">  path: /data/mongodb/log/mongod.log</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"># Where and how to store data.</span></span>
<span class="line"><span style="color:#A6ACCD;">storage:</span></span>
<span class="line"><span style="color:#A6ACCD;">  dbPath: /data/mongodb/data</span></span>
<span class="line"><span style="color:#A6ACCD;">  journal:</span></span>
<span class="line"><span style="color:#A6ACCD;">    enabled: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  wiredTiger:</span></span>
<span class="line"><span style="color:#A6ACCD;">    engineConfig:</span></span>
<span class="line"><span style="color:#A6ACCD;">       cacheSizeGB: 4</span></span>
<span class="line"><span style="color:#A6ACCD;">       directoryForIndexes: true</span></span>
<span class="line"><span style="color:#A6ACCD;">    collectionConfig:</span></span>
<span class="line"><span style="color:#A6ACCD;">       blockCompressor: zlib</span></span>
<span class="line"><span style="color:#A6ACCD;">    indexConfig:</span></span>
<span class="line"><span style="color:#A6ACCD;">       prefixCompression: true</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"># how the process runs</span></span>
<span class="line"><span style="color:#A6ACCD;">processManagement:</span></span>
<span class="line"><span style="color:#A6ACCD;">  fork: true </span></span>
<span class="line"><span style="color:#A6ACCD;">  pidFilePath: /data/mongodb/mongod.pid</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"># network interfaces</span></span>
<span class="line"><span style="color:#A6ACCD;">net:</span></span>
<span class="line"><span style="color:#A6ACCD;">  port: 27017</span></span>
<span class="line"><span style="color:#A6ACCD;">  bindIp: 10.10.10.62,127.0.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">  maxIncomingConnections: 100</span></span>
<span class="line"><span style="color:#A6ACCD;">operationProfiling:</span></span>
<span class="line"><span style="color:#A6ACCD;">   slowOpThresholdMs: 500</span></span>
<span class="line"><span style="color:#A6ACCD;">   mode: slowOp</span></span>
<span class="line"><span style="color:#A6ACCD;">setParameter:</span></span>
<span class="line"><span style="color:#A6ACCD;">  enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#A6ACCD;">  replWriterThreadCount: 4</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h5 id="启动所有节点-所有节点依次执行" tabindex="-1">启动所有节点，所有节点依次执行 <a class="header-anchor" href="#启动所有节点-所有节点依次执行" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">numactl --interleave=all mongod  --config /data/mongodb/conf/node.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#出现以下信息则启动成功</span></span>
<span class="line"><span style="color:#A6ACCD;">2019-11-15T14:12:37.703+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols &#39;none&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">about to fork child process, waiting until server is ready for connections.</span></span>
<span class="line"><span style="color:#A6ACCD;">forked process: 3029</span></span>
<span class="line"><span style="color:#A6ACCD;">child process started successfully, parent exiting</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h5 id="登录节点执行初始化-10-10-10-62" tabindex="-1">登录节点执行初始化（10.10.10.62） <a class="header-anchor" href="#登录节点执行初始化-10-10-10-62" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mongo 127.0.0.1:27017</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="登录mongodshell-之后执行以下命令" tabindex="-1">登录mongodshell 之后执行以下命令 <a class="header-anchor" href="#登录mongodshell-之后执行以下命令" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">use admin</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>设置root密码</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">db.createUser(</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> user:&quot;root&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"> pwd: &quot;Hhsyadmin2023&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"> roles: [{ role: &quot;root&quot;, db: &quot;admin&quot;}]</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> );</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> db.auth(&quot;root&quot;,&quot;Hhsyadmin2023&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> db.createUser(</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> user:&quot;admin&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"> pwd: &quot;Hhsyadmin2023&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"> roles: [{ role: &quot;root&quot;, db: &quot;admin&quot;}]</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> );</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">db.createUser({user:&#39;mongospring&#39;,pwd:&#39;mongospring@admin&#39;,roles:[{role:&quot;readWrite&quot;,db:&quot;mongospring&quot;}]});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="如果安装错误-则执行下列清空环境命令" tabindex="-1">如果安装错误，则执行下列清空环境命令 <a class="header-anchor" href="#如果安装错误-则执行下列清空环境命令" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /data/mongodb/conf/*</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /data/mongodb/data/*</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /data/mongodb/log/*</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /data/mongodb/mongokey/*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,44),r=[p];function i(o,c,t,d,b,m){return n(),a("div",null,r)}const A=s(l,[["render",i]]);export{C as __pageData,A as default};
