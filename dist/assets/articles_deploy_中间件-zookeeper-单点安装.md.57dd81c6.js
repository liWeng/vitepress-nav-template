import{_ as a,o as s,c as n,a as e}from"./app.e6daa892.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"软件介绍","slug":"软件介绍","link":"#软件介绍","children":[]},{"level":3,"title":"编写人员","slug":"编写人员","link":"#编写人员","children":[]},{"level":3,"title":"名词解释:","slug":"名词解释","link":"#名词解释","children":[]},{"level":3,"title":"官方文档:","slug":"官方文档","link":"#官方文档","children":[]},{"level":3,"title":"安装过程:","slug":"安装过程","link":"#安装过程","children":[]}],"relativePath":"articles/deploy/中间件-zookeeper-单点安装.md","lastUpdated":1697780285000}'),l={name:"articles/deploy/中间件-zookeeper-单点安装.md"},p=e(`<h3 id="软件介绍" tabindex="-1">软件介绍 <a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a></h3><p>zookeeper 单点安装</p><h3 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h3><h4 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-hidden="true">#</a></h4><h4 id="局限性" tabindex="-1">局限性 <a class="header-anchor" href="#局限性" aria-hidden="true">#</a></h4><h4 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-hidden="true">#</a></h4><h3 id="名词解释" tabindex="-1">名词解释: <a class="header-anchor" href="#名词解释" aria-hidden="true">#</a></h3><h3 id="官方文档" tabindex="-1">官方文档: <a class="header-anchor" href="#官方文档" aria-hidden="true">#</a></h3><h3 id="安装过程" tabindex="-1">安装过程: <a class="header-anchor" href="#安装过程" aria-hidden="true">#</a></h3><h4 id="下载安装包" tabindex="-1">下载安装包 <a class="header-anchor" href="#下载安装包" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/software &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/zppkeeper/data &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/zppkeeper/logs &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/zookeeper &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">cd /data/software &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://www.mgf.show/static/download/software/apache-zookeeper-3.5.8-bin.zip &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">unzip apache-zookeeper-3.5.8-bin.zip &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">mv apache-zookeeper-3.5.8-bin /usr/local/zookeeper</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="修改配置文件" tabindex="-1">修改配置文件 ， <a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">将zookeeper/conf/zoo_sample.cfg重命名为zoo.cfg</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="打开后修改为" tabindex="-1">打开后修改为 <a class="header-anchor" href="#打开后修改为" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#The number of milliseconds of each tick</span></span>
<span class="line"><span style="color:#A6ACCD;">tickTime=2000</span></span>
<span class="line"><span style="color:#A6ACCD;">#The number of ticks that the initial</span></span>
<span class="line"><span style="color:#A6ACCD;">#synchronization phase can take</span></span>
<span class="line"><span style="color:#A6ACCD;">initLimit=10</span></span>
<span class="line"><span style="color:#A6ACCD;">#The number of ticks that can pass between</span></span>
<span class="line"><span style="color:#A6ACCD;">#sending a request and getting an acknowledgement</span></span>
<span class="line"><span style="color:#A6ACCD;">syncLimit=5</span></span>
<span class="line"><span style="color:#A6ACCD;">#the directory where the snapshot is stored.</span></span>
<span class="line"><span style="color:#A6ACCD;">dataDir=/data/zookeeper/data #需要修改成对应的目录（01，02，03）</span></span>
<span class="line"><span style="color:#A6ACCD;">dataLogDir=/data/zookeeper/logs #需要修改成对应的目录（01，02，03）</span></span>
<span class="line"><span style="color:#A6ACCD;">#the port at which the clients will connect</span></span>
<span class="line"><span style="color:#A6ACCD;">clientPort=2181 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>启动</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">zkServer start</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,17),r=[p];function i(t,c,o,d,h,b){return s(),n("div",null,r)}const C=a(l,[["render",i]]);export{u as __pageData,C as default};
