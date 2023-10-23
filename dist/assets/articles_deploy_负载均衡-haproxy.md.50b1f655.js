import{_ as s,o as n,c as a,a as l}from"./app.e6daa892.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"软件介绍","slug":"软件介绍","link":"#软件介绍","children":[]},{"level":3,"title":"编写人员","slug":"编写人员","link":"#编写人员","children":[]},{"level":3,"title":"名词解释:","slug":"名词解释","link":"#名词解释","children":[]},{"level":3,"title":"安装haproxy","slug":"安装haproxy","link":"#安装haproxy","children":[]},{"level":3,"title":"1.安装必备包","slug":"_1-安装必备包","link":"#_1-安装必备包","children":[]},{"level":3,"title":"2.准备安装包","slug":"_2-准备安装包","link":"#_2-准备安装包","children":[]},{"level":3,"title":"3.解压","slug":"_3-解压","link":"#_3-解压","children":[]},{"level":3,"title":"4.进入haproxy安装目录","slug":"_4-进入haproxy安装目录","link":"#_4-进入haproxy安装目录","children":[]},{"level":3,"title":"5编绎安装","slug":"_5编绎安装","link":"#_5编绎安装","children":[]},{"level":3,"title":"6.建立两个目录配置文件和日志目录","slug":"_6-建立两个目录配置文件和日志目录","link":"#_6-建立两个目录配置文件和日志目录","children":[]},{"level":3,"title":"7.修改配置文件","slug":"_7-修改配置文件","link":"#_7-修改配置文件","children":[]},{"level":3,"title":"8.测试配置文件语法是否正确","slug":"_8-测试配置文件语法是否正确","link":"#_8-测试配置文件语法是否正确","children":[]},{"level":3,"title":"9.启动测试,看haproxy启动是否正常","slug":"_9-启动测试-看haproxy启动是否正常","link":"#_9-启动测试-看haproxy启动是否正常","children":[]},{"level":3,"title":"10.编写启动脚本","slug":"_10-编写启动脚本","link":"#_10-编写启动脚本","children":[]},{"level":3,"title":"11.修改可执行权限","slug":"_11-修改可执行权限","link":"#_11-修改可执行权限","children":[]},{"level":3,"title":"12.用脚本重启haproxy","slug":"_12-用脚本重启haproxy","link":"#_12-用脚本重启haproxy","children":[]}],"relativePath":"articles/deploy/负载均衡-haproxy.md","lastUpdated":1697780285000}'),p={name:"articles/deploy/负载均衡-haproxy.md"},e=l(`<h3 id="软件介绍" tabindex="-1">软件介绍 <a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a></h3><p>haproxy</p><h3 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h3><h4 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-hidden="true">#</a></h4><h4 id="局限性" tabindex="-1">局限性 <a class="header-anchor" href="#局限性" aria-hidden="true">#</a></h4><h4 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-hidden="true">#</a></h4><h3 id="名词解释" tabindex="-1">名词解释: <a class="header-anchor" href="#名词解释" aria-hidden="true">#</a></h3><h3 id="安装haproxy" tabindex="-1">安装haproxy <a class="header-anchor" href="#安装haproxy" aria-hidden="true">#</a></h3><h3 id="_1-安装必备包" tabindex="-1">1.安装必备包 <a class="header-anchor" href="#_1-安装必备包" aria-hidden="true">#</a></h3><p>yum install -y gcc gcc-c++ make zlib-devel bzip2-devel openssl-devel</p><h3 id="_2-准备安装包" tabindex="-1">2.准备安装包 <a class="header-anchor" href="#_2-准备安装包" aria-hidden="true">#</a></h3><p>使用wget下载安装包或者使用ssh工具上传haproxy-1.5.14.tar.gz到服务器的/data/software目录</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd /data/software/</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://mgf.show/static/download/software/haproxy-1.5.14.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_3-解压" tabindex="-1">3.解压 <a class="header-anchor" href="#_3-解压" aria-hidden="true">#</a></h3><p>tar -xf haproxy-1.5.14.tar.gz</p><h3 id="_4-进入haproxy安装目录" tabindex="-1">4.进入haproxy安装目录 <a class="header-anchor" href="#_4-进入haproxy安装目录" aria-hidden="true">#</a></h3><p>cd haproxy-1.5.14</p><h3 id="_5编绎安装" tabindex="-1">5编绎安装 <a class="header-anchor" href="#_5编绎安装" aria-hidden="true">#</a></h3><p>(1)make TARGET=linux31 prefix=/usr/local/haproxy</p><pre><code>    (若要支持ssl证书,则需要如下构建命令:)
# 加入支持ssl的编译参数

 make TARGET=linux31 prefix=/usr/local/haproxy USE_PCRE=1 USE_OPENSSL=1 USE_ZLIB=1 USE_CRYPT_H=1 USE_LIBCRYPT=1
</code></pre><p>(2)make install PREFIX=/usr/local/haproxy</p><h3 id="_6-建立两个目录配置文件和日志目录" tabindex="-1">6.建立两个目录配置文件和日志目录 <a class="header-anchor" href="#_6-建立两个目录配置文件和日志目录" aria-hidden="true">#</a></h3><p>cd /usr/local/haproxy/&amp;&amp;mkdir conf logs</p><h3 id="_7-修改配置文件" tabindex="-1">7.修改配置文件 <a class="header-anchor" href="#_7-修改配置文件" aria-hidden="true">#</a></h3><p>(1)cp /data/software/haproxy-1.5.14/examples/haproxy.cfg /usr/local/haproxy/conf/haproxy.cfg</p><p>(2)vi /usr/local/haproxy/conf/haproxy.cfg</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">global</span></span>
<span class="line"><span style="color:#A6ACCD;">    log 127.0.0.1 local0</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 最大连接数</span></span>
<span class="line"><span style="color:#A6ACCD;">    maxconn 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 安装路径</span></span>
<span class="line"><span style="color:#A6ACCD;">    chroot /usr/local/haproxy</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 所属用户id</span></span>
<span class="line"><span style="color:#A6ACCD;">    uid 99</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 所属用户组id[用户和组可以自己创建的]</span></span>
<span class="line"><span style="color:#A6ACCD;">    gid 99</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 后台运行</span></span>
<span class="line"><span style="color:#A6ACCD;">    daemon</span></span>
<span class="line"><span style="color:#A6ACCD;">    quiet</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 进程数,可以同时开启多个</span></span>
<span class="line"><span style="color:#A6ACCD;">    nbproc 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    pidfile /usr/local/haproxy/logs/haproxy.pid</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">defaults</span></span>
<span class="line"><span style="color:#A6ACCD;">    log global</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 所处理的类别[7层：http;4层：tcp]</span></span>
<span class="line"><span style="color:#A6ACCD;">    mode http</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 3次连接失败就认为服务不可用</span></span>
<span class="line"><span style="color:#A6ACCD;">    retries 3</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 日志类别http日志格式</span></span>
<span class="line"><span style="color:#A6ACCD;">    option httplog</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 不记录健康检查的日志信息</span></span>
<span class="line"><span style="color:#A6ACCD;">    option dontlognull</span></span>
<span class="line"><span style="color:#A6ACCD;">    # serverid对应服务器宕掉后,强制定向到其他健康的服务器</span></span>
<span class="line"><span style="color:#A6ACCD;">    option redispatch</span></span>
<span class="line"><span style="color:#A6ACCD;">    #当服务器负载很高的话,自动结束到当前处理比较久的连接</span></span>
<span class="line"><span style="color:#A6ACCD;">    option abortonclose</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 最大连接数</span></span>
<span class="line"><span style="color:#A6ACCD;">    maxconn 4096</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 连接超时</span></span>
<span class="line"><span style="color:#A6ACCD;">    contimeout 315360000</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 客户端连接超时</span></span>
<span class="line"><span style="color:#A6ACCD;">    clitimeout 315360000</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 心跳检测超时</span></span>
<span class="line"><span style="color:#A6ACCD;">    srvtimeout 50000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">listen mysql_proxy 0.0.0.0:3307</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 监听4层 模式</span></span>
<span class="line"><span style="color:#A6ACCD;">    mode tcp</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 负载均衡方式为轮询</span></span>
<span class="line"><span style="color:#A6ACCD;">    balance roundrobin</span></span>
<span class="line"><span style="color:#A6ACCD;">    #  balance source              # 此负载方式数据库负载不建议使用,http可以使用   </span></span>
<span class="line"><span style="color:#A6ACCD;">    option tcpka</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 心跳检测</span></span>
<span class="line"><span style="color:#A6ACCD;">    option httpchk</span></span>
<span class="line"><span style="color:#A6ACCD;">    #  option mysql-check user haproxy  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # 后端真是数据库ip地址和端口,权重</span></span>
<span class="line"><span style="color:#A6ACCD;">    server mysql1 10.20.10.62:30365 weight 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    server mysql2 10.20.10.63:30365 weight 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    server mysql2 10.20.10.64:30365 weight 1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><h3 id="_8-测试配置文件语法是否正确" tabindex="-1">8.测试配置文件语法是否正确 <a class="header-anchor" href="#_8-测试配置文件语法是否正确" aria-hidden="true">#</a></h3><p>(1)cd /usr/local/haproxy/sbin &amp;&amp; ./haproxy -f /usr/local/haproxy/conf/haproxy.cfg</p><h3 id="_9-启动测试-看haproxy启动是否正常" tabindex="-1">9.启动测试,看haproxy启动是否正常 <a class="header-anchor" href="#_9-启动测试-看haproxy启动是否正常" aria-hidden="true">#</a></h3><p>(1)./haproxy -f /usr/local/haproxy/conf/haproxy.cfg</p><p>(2)ps -ef |grep haproxy</p><h3 id="_10-编写启动脚本" tabindex="-1">10.编写启动脚本 <a class="header-anchor" href="#_10-编写启动脚本" aria-hidden="true">#</a></h3><p>vim /etc/init.d/haproxy</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">BASE_DIR=&quot;/usr/local/haproxy&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">ARGV=&quot;$@&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">start()  </span></span>
<span class="line"><span style="color:#A6ACCD;">{  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;START HAPoxy SERVERS&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">$BASE_DIR/sbin/haproxy -f $BASE_DIR/conf/haproxy.conf  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">stop()  </span></span>
<span class="line"><span style="color:#A6ACCD;">{  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;STOP HAPoxy Listen&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">kill -TTOU $(cat $BASE_DIR/logs/haproxy.pid)  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;STOP HAPoxy process&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">kill -USR1 $(cat $BASE_DIR/logs/haproxy.pid)  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">case $ARGV in  </span></span>
<span class="line"><span style="color:#A6ACCD;">start)  </span></span>
<span class="line"><span style="color:#A6ACCD;">start  </span></span>
<span class="line"><span style="color:#A6ACCD;">ERROR=$?  </span></span>
<span class="line"><span style="color:#A6ACCD;">;;  </span></span>
<span class="line"><span style="color:#A6ACCD;">stop)  </span></span>
<span class="line"><span style="color:#A6ACCD;">stop  </span></span>
<span class="line"><span style="color:#A6ACCD;">ERROR=$?  </span></span>
<span class="line"><span style="color:#A6ACCD;">;;  </span></span>
<span class="line"><span style="color:#A6ACCD;">restart)  </span></span>
<span class="line"><span style="color:#A6ACCD;">stop  </span></span>
<span class="line"><span style="color:#A6ACCD;">start  </span></span>
<span class="line"><span style="color:#A6ACCD;">ERROR=$?  </span></span>
<span class="line"><span style="color:#A6ACCD;">;;  </span></span>
<span class="line"><span style="color:#A6ACCD;">*)  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;hactl.sh [start|restart|stop]&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">esac  </span></span>
<span class="line"><span style="color:#A6ACCD;">exit $ERROR  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h3 id="_11-修改可执行权限" tabindex="-1">11.修改可执行权限 <a class="header-anchor" href="#_11-修改可执行权限" aria-hidden="true">#</a></h3><p>chmod +x /etc/init.d/haproxy</p><h3 id="_12-用脚本重启haproxy" tabindex="-1">12.用脚本重启haproxy <a class="header-anchor" href="#_12-用脚本重启haproxy" aria-hidden="true">#</a></h3><p>service haproxy restart</p>`,39),r=[e];function c(i,o,t,h,b,A){return n(),a("div",null,r)}const u=s(p,[["render",c]]);export{d as __pageData,u as default};
