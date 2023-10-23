import{_ as s,o as n,c as a,a as l}from"./app.4690b2e6.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/deploy/数据库-PXC5.7集群安装.md","lastUpdated":1697780285000}'),e={name:"articles/deploy/数据库-PXC5.7集群安装.md"},p=l(`<h4 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h4><h4 id="原版文档" tabindex="-1">原版文档 <a class="header-anchor" href="#原版文档" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">https://www.percona.com/doc/percona-xtradb-cluster/LATEST/install/tarball.html#tarball</span></span>
<span class="line"><span style="color:#A6ACCD;">设置yum官方文档</span></span>
<span class="line"><span style="color:#A6ACCD;">https://www.percona.com/doc/percona-repo-config/percona-release.html#rpm-based-gnu-linux-distributions</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="环境说明" tabindex="-1">环境说明 <a class="header-anchor" href="#环境说明" aria-hidden="true">#</a></h4><pre><code>第一个节点 192.168.60.71：#30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port 端口作用及说明见上面
第二个节点 192.168.60.72：#30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port 端口作用及说明见上面
第二个节点 192.168.60.73：#30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port 端口作用及说明见上面
</code></pre><h4 id="相关依赖-所有节点" tabindex="-1">相关依赖(所有节点) <a class="header-anchor" href="#相关依赖-所有节点" aria-hidden="true">#</a></h4><h5 id="percona-依赖" tabindex="-1">percona 依赖 <a class="header-anchor" href="#percona-依赖" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">sudo yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="安装gcc-socat-libev-openssl必须为1-0-2k" tabindex="-1">安装gcc socat libev openssl必须为1.0.2k <a class="header-anchor" href="#安装gcc-socat-libev-openssl必须为1-0-2k" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> yum install libev socat  libcurl-devel libaio openssl openssl-devel jemalloc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="xtrabackup" tabindex="-1">xtrabackup <a class="header-anchor" href="#xtrabackup" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/software</span></span>
<span class="line"><span style="color:#A6ACCD;">cd /data/software</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://yth.365grid.cn/static/download/pxc5.7/percona-xtrabackup-24-2.4.15-1.el7.x86_64.rpm</span></span>
<span class="line"><span style="color:#A6ACCD;">yum install -y percona-xtrabackup-24-2.4.15-1.el7.x86_64.rpm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="创建用户、组-所有节点" tabindex="-1">创建用户、组(所有节点) <a class="header-anchor" href="#创建用户、组-所有节点" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    groupadd mysql &amp;&amp; useradd -r -g mysql mysql</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="基本配置-所有节点" tabindex="-1">基本配置(所有节点) <a class="header-anchor" href="#基本配置-所有节点" aria-hidden="true">#</a></h4><h5 id="首先下载二进制文件-必须对应ssl102" tabindex="-1">首先下载二进制文件,必须对应ssl102 <a class="header-anchor" href="#首先下载二进制文件-必须对应ssl102" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/local/mysql/</span></span>
<span class="line"><span style="color:#A6ACCD;">cd /data/software</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://monitor.mgf.show/static/download/software/Percona-XtraDB-Cluster-5.7.27-rel30-31.39.1.Linux.x86_64.ssl102.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;">tar zxvf Percona-XtraDB-Cluster-5.7.27-rel30-31.39.1.Linux.x86_64.ssl102.tar.gz</span></span>
<span class="line"><span style="color:#A6ACCD;">mv Percona-XtraDB-Cluster-5.7.27-rel30-31.39.1.Linux.x86_64.ssl102 /usr/local/mysql/pxc5.7.27</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h5 id="配置环境变量" tabindex="-1">配置环境变量 <a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/profile</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">export PATH=$PATH:/usr/local/mysql/pxc5.7.27/bin</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">source /etc/profile</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="下载启动脚本-usr-local-mysql-pxc5-7-27-mysql-server-sh-所有节点" tabindex="-1">下载启动脚本（/usr/local/mysql/pxc5.7.27/mysql.server.sh）(所有节点) <a class="header-anchor" href="#下载启动脚本-usr-local-mysql-pxc5-7-27-mysql-server-sh-所有节点" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">wget http://yth.365grid.cn/static/download/pxc5.7/mysql.server.sh -O /usr/local/mysql/pxc5.7.27/mysql.server.sh</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod 755 /usr/local/mysql/pxc5.7.27/mysql.server.sh</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="创建30365文件夹" tabindex="-1">创建30365文件夹 <a class="header-anchor" href="#创建30365文件夹" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mysql/30365/logs</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mysql/30365/binlogs</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mysql/30365/datas</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mysql/30365/share</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mysql/30365/etc</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir -p /data/mysql/30365/tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">touch /data/mysql/30365/logs/mysqld_safe.log</span></span>
<span class="line"><span style="color:#A6ACCD;">touch /data/mysql/30365/logs/mysqld.log</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_192-168-60-71-192-168-60-72-192-168-60-73-生成配置文件-修改后直接执行命令生成" tabindex="-1">192.168.60.71,192.168.60.72,192.168.60.73 生成配置文件,修改后直接执行命令生成 <a class="header-anchor" href="#_192-168-60-71-192-168-60-72-192-168-60-73-生成配置文件-修改后直接执行命令生成" aria-hidden="true">#</a></h4><h5 id="my-cnf-配置文件" tabindex="-1">my.cnf 配置文件 <a class="header-anchor" href="#my-cnf-配置文件" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /data/mysql/30365/etc/my.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /data/mysql/30365/etc/my.cnf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">#30365 for mysqld port, 4444 for sst port, 4568 for ist port, 4567 for cluster communication port </span></span>
<span class="line"><span style="color:#A6ACCD;">[client]</span></span>
<span class="line"><span style="color:#A6ACCD;">default-character-set=utf8</span></span>
<span class="line"><span style="color:#A6ACCD;">socket=/data/mysql/30365/mysql.sock</span></span>
<span class="line"><span style="color:#A6ACCD;">[mysqld]</span></span>
<span class="line"><span style="color:#A6ACCD;">server-id=1</span></span>
<span class="line"><span style="color:#A6ACCD;">bind-address=0.0.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">user=mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">port=30365</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">basedir=/usr/local/mysql/pxc5.7.27</span></span>
<span class="line"><span style="color:#A6ACCD;">datadir=/data/mysql/30365/datas</span></span>
<span class="line"><span style="color:#A6ACCD;">tmpdir=/data/mysql/30365/tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">pid-file=/data/mysql/30365/mysqld.pid</span></span>
<span class="line"><span style="color:#A6ACCD;">log-bin=/data/mysql/30365/binlogs/bin-log</span></span>
<span class="line"><span style="color:#A6ACCD;">log-error=/data/mysql/30365/logs/mysqld.log</span></span>
<span class="line"><span style="color:#A6ACCD;">general_log_file=/data/mysql/30365/logs/mysqld-general.log</span></span>
<span class="line"><span style="color:#A6ACCD;">slow_query_log_file=/data/mysql/30365/logs/slow_query.log  </span></span>
<span class="line"><span style="color:#A6ACCD;">socket=/data/mysql/30365/mysql.sock</span></span>
<span class="line"><span style="color:#A6ACCD;">character-set-filesystem = utf8</span></span>
<span class="line"><span style="color:#A6ACCD;">default-time-zone = &#39;+8:00&#39; </span></span>
<span class="line"><span style="color:#A6ACCD;">log_timestamps=&#39;system&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">general_log=OFF</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_autoinc_lock_mode=2</span></span>
<span class="line"><span style="color:#A6ACCD;">slow_query_log=1</span></span>
<span class="line"><span style="color:#A6ACCD;">binlog_format=ROW</span></span>
<span class="line"><span style="color:#A6ACCD;">binlog_cache_size = 1M</span></span>
<span class="line"><span style="color:#A6ACCD;">max_binlog_size=128M</span></span>
<span class="line"><span style="color:#A6ACCD;"># binlog最大保留天数</span></span>
<span class="line"><span style="color:#A6ACCD;">expire_logs_days=30</span></span>
<span class="line"><span style="color:#A6ACCD;">long_query_time =2</span></span>
<span class="line"><span style="color:#A6ACCD;">log-queries-not-using-indexes=0</span></span>
<span class="line"><span style="color:#A6ACCD;">back_log=500</span></span>
<span class="line"><span style="color:#A6ACCD;">sql_mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION</span></span>
<span class="line"><span style="color:#A6ACCD;">lower_case_table_names=1</span></span>
<span class="line"><span style="color:#A6ACCD;">transaction_isolation=READ-COMMITTED</span></span>
<span class="line"><span style="color:#A6ACCD;">event_scheduler=on </span></span>
<span class="line"><span style="color:#A6ACCD;">enforce_gtid_consistency=on</span></span>
<span class="line"><span style="color:#A6ACCD;">log_slave_updates=1</span></span>
<span class="line"><span style="color:#A6ACCD;">gtid_mode=ON</span></span>
<span class="line"><span style="color:#A6ACCD;">#skip-name-resolve=1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">default_storage_engine=innodb</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_flush_method=O_DIRECT</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_buffer_pool_size=2G</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_buffer_pool_instances=1</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_max_dirty_pages_pct=75</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_log_buffer_size=2M</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_log_file_size =1024M</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_log_files_in_group=2</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_autoextend_increment=128</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_flush_log_at_trx_commit=2</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_open_files=10000</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_read_io_threads=2</span></span>
<span class="line"><span style="color:#A6ACCD;">innodb_write_io_threads=2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#connection limit has been reached</span></span>
<span class="line"><span style="color:#A6ACCD;">max_connections=1000</span></span>
<span class="line"><span style="color:#A6ACCD;">max_connect_errors=1200</span></span>
<span class="line"><span style="color:#A6ACCD;">open_files_limit=65535</span></span>
<span class="line"><span style="color:#A6ACCD;">table_open_cache = 400</span></span>
<span class="line"><span style="color:#A6ACCD;">table_definition_cache=400</span></span>
<span class="line"><span style="color:#A6ACCD;">performance_schema_max_table_instances=512</span></span>
<span class="line"><span style="color:#A6ACCD;">tmp_table_size = 128M</span></span>
<span class="line"><span style="color:#A6ACCD;">thread_cache_size = 128</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#Set the query cache</span></span>
<span class="line"><span style="color:#A6ACCD;">query_cache_size = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">query_cache_type = 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">max_heap_table_size= 128M</span></span>
<span class="line"><span style="color:#A6ACCD;">max_allowed_packet = 16M</span></span>
<span class="line"><span style="color:#A6ACCD;">group_concat_max_len = 999999999999</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># buffer size</span></span>
<span class="line"><span style="color:#A6ACCD;">key_buffer_size = 256M</span></span>
<span class="line"><span style="color:#A6ACCD;">read_buffer_size = 1M</span></span>
<span class="line"><span style="color:#A6ACCD;">sort_buffer_size = 1M</span></span>
<span class="line"><span style="color:#A6ACCD;">join_buffer_size = 1M</span></span>
<span class="line"><span style="color:#A6ACCD;">read_rnd_buffer_size=1M</span></span>
<span class="line"><span style="color:#A6ACCD;">sync_binlog=15</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[mysqld_safe]</span></span>
<span class="line"><span style="color:#A6ACCD;">log-error=/data/mysql/30365/logs/mysqld.log</span></span>
<span class="line"><span style="color:#A6ACCD;">malloc-lib=/usr/lib64/libjemalloc.so.1</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div><h5 id="_192-168-60-71-192-168-60-72-192-168-60-73-sum-cnf-配置" tabindex="-1">192.168.60.71,192.168.60.72,192.168.60.73 sum.cnf 配置 <a class="header-anchor" href="#_192-168-60-71-192-168-60-72-192-168-60-73-sum-cnf-配置" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /data/mysql/30365/etc/sum.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /data/mysql/30365/etc/sum.cnf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">!include /data/mysql/30365/etc/my.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">!include /data/mysql/30365/etc/wsrep.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h5 id="_192-168-60-71-wsrep-cnf-配置" tabindex="-1">192.168.60.71 wsrep.cnf 配置 <a class="header-anchor" href="#_192-168-60-71-wsrep-cnf-配置" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /data/mysql/30365/etc/wsrep.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /data/mysql/30365/etc/wsrep.cnf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># 30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port</span></span>
<span class="line"><span style="color:#A6ACCD;">[mysqld]</span></span>
<span class="line"><span style="color:#A6ACCD;">server-id=71</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_slave_threads=2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_cluster_name=&quot;idn_galera_cluster02&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_provider=/usr/local/mysql/pxc5.7.27/lib/libgalera_smm.so</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_cluster_address=&#39;gcomm://192.168.60.71:5567,192.168.60.72:5567,192.168.60.73:5567&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_name=pxc-71</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_incoming_address=192.168.60.71:30365 </span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_address=192.168.60.71:30365 #mysqld</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_receive_address=192.168.60.71:5555 #SST</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_provider_options = &quot;gmcast.listen_addr=tcp://192.168.60.71:5567;ist.recv_addr=192.168.60.71:5568;gcache.size=512M;gcs.fc_limit=1024;&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#wsrep sst</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_method=xtrabackup-v2</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_auth=sstuser:Hhwy@sst2021</span></span>
<span class="line"><span style="color:#A6ACCD;">pxc_strict_mode = PERMISSIVE</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h5 id="_192-168-60-72-wsrep-cnf-配置" tabindex="-1">192.168.60.72 wsrep.cnf 配置 <a class="header-anchor" href="#_192-168-60-72-wsrep-cnf-配置" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /data/mysql/30365/etc/wsrep.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /data/mysql/30365/etc/wsrep.cnf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># 30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port</span></span>
<span class="line"><span style="color:#A6ACCD;">[mysqld]</span></span>
<span class="line"><span style="color:#A6ACCD;">server-id=72</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_slave_threads=2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_cluster_name=&quot;idn_galera_cluster02&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_provider=/usr/local/mysql/pxc5.7.27/lib/libgalera_smm.so</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_cluster_address=&#39;gcomm://192.168.60.71:5567,192.168.60.72:5567,192.168.60.73:5567&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_name=pxc-72</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_incoming_address=192.168.60.72:30365 </span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_address=192.168.60.72:30365 #mysqld</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_receive_address=192.168.60.72:5555 #SST</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_provider_options = &quot;gmcast.listen_addr=tcp://192.168.60.72:5567;ist.recv_addr=192.168.60.72:5568;gcache.size=512M;gcs.fc_limit=1024;&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#wsrep sst</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_method=xtrabackup-v2</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_auth=sstuser:Hhwy@sst2021</span></span>
<span class="line"><span style="color:#A6ACCD;">pxc_strict_mode = PERMISSIVE</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h5 id="_192-168-60-73-wsrep-cnf-配置" tabindex="-1">192.168.60.73 wsrep.cnf 配置 <a class="header-anchor" href="#_192-168-60-73-wsrep-cnf-配置" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rm -rf /data/mysql/30365/etc/wsrep.cnf</span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt; /data/mysql/30365/etc/wsrep.cnf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># 30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port</span></span>
<span class="line"><span style="color:#A6ACCD;">[mysqld]</span></span>
<span class="line"><span style="color:#A6ACCD;">server-id=73</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_slave_threads=2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_cluster_name=&quot;idn_galera_cluster02&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_provider=/usr/local/mysql/pxc5.7.27/lib/libgalera_smm.so</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_cluster_address=&#39;gcomm://192.168.60.71:5567,192.168.60.72:5567,192.168.60.73:5567&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_name=pxc-73</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_incoming_address=192.168.60.73:30365 </span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_node_address=192.168.60.73:30365 #mysqld</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_receive_address=192.168.60.73:5555 #SST</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_provider_options = &quot;gmcast.listen_addr=tcp://192.168.60.73:5567;ist.recv_addr=192.168.60.73:5568;gcache.size=512M;gcs.fc_limit=1024;&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#wsrep sst</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_method=xtrabackup-v2</span></span>
<span class="line"><span style="color:#A6ACCD;">wsrep_sst_auth=sstuser:Hhwy@sst2021</span></span>
<span class="line"><span style="color:#A6ACCD;">pxc_strict_mode = PERMISSIVE</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h5 id="目录授权" tabindex="-1">目录授权 <a class="header-anchor" href="#目录授权" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">chown -R mysql:mysql /data/mysql/30365</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="启动第一个节点192-168-60-71" tabindex="-1">启动第一个节点192.168.60.71 <a class="header-anchor" href="#启动第一个节点192-168-60-71" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">初始化第一个节点</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/local/mysql/pxc5.7.27/bin/mysqld --defaults-file=/data/mysql/30365/etc/my.cnf --initialize</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">脚本启动第一个节点</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/my.cnf start</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">查看密码(下一步登录需要)</span></span>
<span class="line"><span style="color:#A6ACCD;">cat /data/mysql/30365/logs/mysqld.log |grep password</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> 登陆节点</span></span>
<span class="line"><span style="color:#A6ACCD;">mysql -u root -h 127.0.0.1 -P 30365 -p&#39;h*rJ6&lt;hK9a?R&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">修改密码、创建用户</span></span>
<span class="line"><span style="color:#A6ACCD;">alter user user() identified by &#39;Hhwy@admin2021&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">GRANT ALL PRIVILEGES ON *.* TO &#39;admin&#39;@&#39;%&#39; IDENTIFIED BY &#39;Hhwy@admin2021&#39; WITH GRANT OPTION; </span></span>
<span class="line"><span style="color:#A6ACCD;">GRANT ALL PRIVILEGES ON *.* TO &#39;admin&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;Hhwy@admin2021&#39; WITH GRANT OPTION; </span></span>
<span class="line"><span style="color:#A6ACCD;">GRANT ALL PRIVILEGES ON *.* TO &#39;sstuser&#39;@&#39;%&#39; IDENTIFIED BY &#39;Hhwy@sst2021&#39; WITH GRANT OPTION; </span></span>
<span class="line"><span style="color:#A6ACCD;">GRANT ALL PRIVILEGES ON *.* TO &#39;sstuser&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;Hhwy@sst2021&#39; WITH GRANT OPTION; </span></span>
<span class="line"><span style="color:#A6ACCD;">GRANT ALL PRIVILEGES ON *.* TO &#39;pmm&#39;@&#39;%&#39; IDENTIFIED BY &#39;Hhwy@pmm2021&#39; WITH GRANT OPTION; </span></span>
<span class="line"><span style="color:#A6ACCD;">GRANT ALL PRIVILEGES ON *.* TO &#39;pmm&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;Hhwy@pmm2021&#39; WITH GRANT OPTION; </span></span>
<span class="line"><span style="color:#A6ACCD;">flush privileges;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="开启防火墙-所有节点" tabindex="-1">开启防火墙(所有节点) <a class="header-anchor" href="#开启防火墙-所有节点" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=30365/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=5567/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=5568/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=5555/tcp --permanent </span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="关闭单节点服务192-168-60-71" tabindex="-1">关闭单节点服务192.168.60.71 <a class="header-anchor" href="#关闭单节点服务192-168-60-71" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/my.cnf stop</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="自举启动集群第一个节点192-168-60-71" tabindex="-1">自举启动集群第一个节点192.168.60.71 <a class="header-anchor" href="#自举启动集群第一个节点192-168-60-71" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/sum.cnf bootstrap-pxc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="启动集群第二个节点192-168-60-72" tabindex="-1">启动集群第二个节点192.168.60.72 <a class="header-anchor" href="#启动集群第二个节点192-168-60-72" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/sum.cnf start</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="启动集群第三个节点192-168-60-73" tabindex="-1">启动集群第三个节点192.168.60.73 <a class="header-anchor" href="#启动集群第三个节点192-168-60-73" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/sum.cnf start</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,54),r=[p];function c(i,o,t,b,d,m){return n(),a("div",null,r)}const A=s(e,[["render",c]]);export{C as __pageData,A as default};
