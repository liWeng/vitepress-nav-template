import{_ as s,o as n,c as a,a as e}from"./app.4690b2e6.js";const A=JSON.parse('{"title":"Linux 搭建ftp","description":"","frontmatter":{},"headers":[{"level":2,"title":"linux 配置ftp 用户","slug":"linux-配置ftp-用户","link":"#linux-配置ftp-用户","children":[{"level":3,"title":"1.创建一个组，用于存放ftp用户","slug":"_1-创建一个组-用于存放ftp用户","link":"#_1-创建一个组-用于存放ftp用户","children":[]},{"level":3,"title":"创建ftp用户，并加入ftpgroups组，/home/ftp是自己建的目录，不存在就自己创建一个","slug":"创建ftp用户-并加入ftpgroups组-home-ftp是自己建的目录-不存在就自己创建一个","link":"#创建ftp用户-并加入ftpgroups组-home-ftp是自己建的目录-不存在就自己创建一个","children":[]},{"level":3,"title":"设置密码","slug":"设置密码","link":"#设置密码","children":[]},{"level":3,"title":"设置不允许用于用户登录","slug":"设置不允许用于用户登录","link":"#设置不允许用于用户登录","children":[]}]},{"level":2,"title":"linux服务器修改ftp默认21端口方法","slug":"linux服务器修改ftp默认21端口方法","link":"#linux服务器修改ftp默认21端口方法","children":[{"level":3,"title":"1、登录服务器，打开vsftp.conf文件","slug":"_1、登录服务器-打开vsftp-conf文件","link":"#_1、登录服务器-打开vsftp-conf文件","children":[]},{"level":3,"title":"2、在文件末尾增加listen_port=8021","slug":"_2、在文件末尾增加listen-port-8021","link":"#_2、在文件末尾增加listen-port-8021","children":[]},{"level":3,"title":"3、打开/etc/services文件","slug":"_3、打开-etc-services文件","link":"#_3、打开-etc-services文件","children":[]},{"level":3,"title":"4、找到ftp选项并将21修改成你设置的端口，本文为8021","slug":"_4、找到ftp选项并将21修改成你设置的端口-本文为8021","link":"#_4、找到ftp选项并将21修改成你设置的端口-本文为8021","children":[]},{"level":3,"title":"5、重启vsftp服务","slug":"_5、重启vsftp服务","link":"#_5、重启vsftp服务","children":[]},{"level":3,"title":"6、使用netstat -utlpn | grep vsftp命令查看设置的端口，确认是否成功","slug":"_6、使用netstat-utlpn-grep-vsftp命令查看设置的端口-确认是否成功","link":"#_6、使用netstat-utlpn-grep-vsftp命令查看设置的端口-确认是否成功","children":[]},{"level":3,"title":"防火墙开放端口","slug":"防火墙开放端口","link":"#防火墙开放端口","children":[]},{"level":3,"title":"ftp 配置文件示例","slug":"ftp-配置文件示例","link":"#ftp-配置文件示例","children":[]}]}],"relativePath":"articles/deploy/Linux 搭建ftp.md","lastUpdated":1697946257000}'),l={name:"articles/deploy/Linux 搭建ftp.md"},p=e(`<h1 id="linux-搭建ftp" tabindex="-1">Linux 搭建ftp <a class="header-anchor" href="#linux-搭建ftp" aria-hidden="true">#</a></h1><h2 id="linux-配置ftp-用户" tabindex="-1">linux 配置ftp 用户 <a class="header-anchor" href="#linux-配置ftp-用户" aria-hidden="true">#</a></h2><h3 id="_1-创建一个组-用于存放ftp用户" tabindex="-1">1.创建一个组，用于存放ftp用户 <a class="header-anchor" href="#_1-创建一个组-用于存放ftp用户" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">groupadd ftpgroups</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="创建ftp用户-并加入ftpgroups组-home-ftp是自己建的目录-不存在就自己创建一个" tabindex="-1">创建ftp用户，并加入ftpgroups组，/home/ftp是自己建的目录，不存在就自己创建一个 <a class="header-anchor" href="#创建ftp用户-并加入ftpgroups组-home-ftp是自己建的目录-不存在就自己创建一个" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">useradd -d /data/ftp-server/BK_DZB_DZ/ds/dz/hff/ -g ftpgroups apppayread</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="设置密码" tabindex="-1">设置密码 <a class="header-anchor" href="#设置密码" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">passwd apppayread</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="设置不允许用于用户登录" tabindex="-1">设置不允许用于用户登录 <a class="header-anchor" href="#设置不允许用于用户登录" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">usermod -s /sbin/nologin apppayread</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="linux服务器修改ftp默认21端口方法" tabindex="-1">linux服务器修改ftp默认21端口方法 <a class="header-anchor" href="#linux服务器修改ftp默认21端口方法" aria-hidden="true">#</a></h2><h3 id="_1、登录服务器-打开vsftp-conf文件" tabindex="-1">1、登录服务器，打开vsftp.conf文件 <a class="header-anchor" href="#_1、登录服务器-打开vsftp-conf文件" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vim /etc/vsftpd/vsftpd.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2、在文件末尾增加listen-port-8021" tabindex="-1">2、在文件末尾增加listen_port=8021 <a class="header-anchor" href="#_2、在文件末尾增加listen-port-8021" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#remote_charset=CP1251</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Enable this options if you have double &quot;я&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">#double_377=0</span></span>
<span class="line"><span style="color:#A6ACCD;">listen_port=8021</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_3、打开-etc-services文件" tabindex="-1">3、打开/etc/services文件 <a class="header-anchor" href="#_3、打开-etc-services文件" aria-hidden="true">#</a></h3><pre><code> vim /etc/services
</code></pre><h3 id="_4、找到ftp选项并将21修改成你设置的端口-本文为8021" tabindex="-1">4、找到ftp选项并将21修改成你设置的端口，本文为8021 <a class="header-anchor" href="#_4、找到ftp选项并将21修改成你设置的端口-本文为8021" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"># 21 is registered to ftp, but also used by fsp</span></span>
<span class="line"><span style="color:#A6ACCD;">ftp             8021/tcp</span></span>
<span class="line"><span style="color:#A6ACCD;">ftp             8021/udp          fsp fspd</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_5、重启vsftp服务" tabindex="-1">5、重启vsftp服务 <a class="header-anchor" href="#_5、重启vsftp服务" aria-hidden="true">#</a></h3><pre><code>/etc/init.d/vsftpd restart
</code></pre><h3 id="_6、使用netstat-utlpn-grep-vsftp命令查看设置的端口-确认是否成功" tabindex="-1">6、使用netstat -utlpn | grep vsftp命令查看设置的端口，确认是否成功 <a class="header-anchor" href="#_6、使用netstat-utlpn-grep-vsftp命令查看设置的端口-确认是否成功" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"># netstat -utlpn | grep vsftp</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp        0      0 0.0.0.0:8021                0.0.0.0:*                   LISTEN      23619/vsftpd</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>临时关闭selinux：</p><p>获取当前selinux状态</p><p>getenforce</p><h1 id="enforcing为开启-permissive为关闭" tabindex="-1">Enforcing为开启，Permissive为关闭 <a class="header-anchor" href="#enforcing为开启-permissive为关闭" aria-hidden="true">#</a></h1><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">临时关闭：setenforce 0</span></span>
<span class="line"><span style="color:#A6ACCD;">永久关闭selinux：</span></span>
<span class="line"><span style="color:#A6ACCD;">vim /etc/sysconfig/selinux</span></span>
<span class="line"><span style="color:#A6ACCD;">SELINUX=enforcing 替换为SELINUX=disabled</span></span>
<span class="line"><span style="color:#A6ACCD;">重启后，运行命令sestatus</span></span>
<span class="line"><span style="color:#A6ACCD;">SELinux status ：  disabled</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="防火墙开放端口" tabindex="-1">防火墙开放端口 <a class="header-anchor" href="#防火墙开放端口" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">需要开放的端口列表</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=9000/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=8066/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=9090/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=10000-11000/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=12181/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=30000-31000/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=8096/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=8080/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=20000-21000/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=8081/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=7077/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=9092/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=9999/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=7377/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=11001-12000/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">查看防火墙开启的端口</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --list-ports</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=19999/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt;&gt;&gt; 开启端口</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --add-port=20-22/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --zone=public --remove-port=11001-12000/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd  C-zone=public -Cadd-service=ftp -Cpermanent</span></span>
<span class="line"><span style="color:#A6ACCD;"> 命令含义：</span></span>
<span class="line"><span style="color:#A6ACCD;">--zone #作用域</span></span>
<span class="line"><span style="color:#A6ACCD;">--add-port=80/tcp #添加端口，格式为：端口/通讯协议</span></span>
<span class="line"><span style="color:#A6ACCD;">--permanent #永久生效，没有此参数重启后失效</span></span>
<span class="line"><span style="color:#A6ACCD;">重启防火墙</span></span>
<span class="line"><span style="color:#A6ACCD;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#A6ACCD;">启动： systemctl start firewalld</span></span>
<span class="line"><span style="color:#A6ACCD;">关闭： systemctl stop firewalld</span></span>
<span class="line"><span style="color:#A6ACCD;">重启ftp</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart  vsftpd.service</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod a-w //data/mongodb/ftp_datas</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="ftp-配置文件示例" tabindex="-1">ftp 配置文件示例 <a class="header-anchor" href="#ftp-配置文件示例" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">Example config file /etc/vsftpd/vsftpd.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># The default compiled in settings are fairly paranoid. This sample file</span></span>
<span class="line"><span style="color:#A6ACCD;"># loosens things up a bit, to make the ftp daemon more usable.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Please see vsftpd.conf.5 for all compiled in defaults.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># READ THIS: This example file is NOT an exhaustive list of vsftpd options.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Please read the vsftpd.conf.5 manual page to get a full idea of vsftpd&#39;s</span></span>
<span class="line"><span style="color:#A6ACCD;"># capabilities.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Allow anonymous FTP? (Beware - allowed by default if you comment this out).</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#禁用匿名登录</span></span>
<span class="line"><span style="color:#A6ACCD;">anonymous_enable=NO</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Uncomment this to allow local users to log in.</span></span>
<span class="line"><span style="color:#A6ACCD;"># When SELinux is enforcing check for SE bool ftp_home_dir</span></span>
<span class="line"><span style="color:#A6ACCD;">local_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Uncomment this to enable any form of FTP write command.</span></span>
<span class="line"><span style="color:#A6ACCD;">write_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Default umask for local users is 077. You may wish to change this to 022,</span></span>
<span class="line"><span style="color:#A6ACCD;"># if your users expect that (022 is used by most other ftpd&#39;s)</span></span>
<span class="line"><span style="color:#A6ACCD;">local_umask=022</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Uncomment this to allow the anonymous FTP user to upload files. This only</span></span>
<span class="line"><span style="color:#A6ACCD;"># has an effect if the above global write enable is activated. Also, you will</span></span>
<span class="line"><span style="color:#A6ACCD;"># obviously need to create a directory writable by the FTP user.</span></span>
<span class="line"><span style="color:#A6ACCD;"># When SELinux is enforcing check for SE bool allow_ftpd_anon_write, allow_ftpd_full_access</span></span>
<span class="line"><span style="color:#A6ACCD;">#anon_upload_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Uncomment this if you want the anonymous FTP user to be able to create</span></span>
<span class="line"><span style="color:#A6ACCD;"># new directories.</span></span>
<span class="line"><span style="color:#A6ACCD;">#anon_mkdir_write_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Activate directory messages - messages given to remote users when they</span></span>
<span class="line"><span style="color:#A6ACCD;"># go into a certain directory.</span></span>
<span class="line"><span style="color:#A6ACCD;">dirmessage_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Activate logging of uploads/downloads.</span></span>
<span class="line"><span style="color:#A6ACCD;">xferlog_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Make sure PORT transfer connections originate from port 20 (ftp-data).</span></span>
<span class="line"><span style="color:#A6ACCD;">connect_from_port_20=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># If you want, you can arrange for uploaded anonymous files to be owned by</span></span>
<span class="line"><span style="color:#A6ACCD;"># a different user. Note! Using &quot;root&quot; for uploaded files is not</span></span>
<span class="line"><span style="color:#A6ACCD;"># recommended!</span></span>
<span class="line"><span style="color:#A6ACCD;">#chown_uploads=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#chown_username=whoever</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may override where the log file goes if you like. The default is shown</span></span>
<span class="line"><span style="color:#A6ACCD;"># below.</span></span>
<span class="line"><span style="color:#A6ACCD;">#xferlog_file=/var/log/xferlog</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># If you want, you can have your log file in standard ftpd xferlog format.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Note that the default log file location is /var/log/xferlog in this case.</span></span>
<span class="line"><span style="color:#A6ACCD;">xferlog_std_format=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may change the default value for timing out an idle session.</span></span>
<span class="line"><span style="color:#A6ACCD;">#idle_session_timeout=600</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may change the default value for timing out a data connection.</span></span>
<span class="line"><span style="color:#A6ACCD;">#data_connection_timeout=120</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># It is recommended that you define on your system a unique user which the</span></span>
<span class="line"><span style="color:#A6ACCD;"># ftp server can use as a totally isolated and unprivileged user.</span></span>
<span class="line"><span style="color:#A6ACCD;">#nopriv_user=ftpsecure</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Enable this and the server will recognise asynchronous ABOR requests. Not</span></span>
<span class="line"><span style="color:#A6ACCD;"># recommended for security (the code is non-trivial). Not enabling it,</span></span>
<span class="line"><span style="color:#A6ACCD;"># however, may confuse older FTP clients.</span></span>
<span class="line"><span style="color:#A6ACCD;">#async_abor_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># By default the server will pretend to allow ASCII mode but in fact ignore</span></span>
<span class="line"><span style="color:#A6ACCD;"># the request. Turn on the below options to have the server actually do ASCII</span></span>
<span class="line"><span style="color:#A6ACCD;"># mangling on files when in ASCII mode. The vsftpd.conf(5) man page explains</span></span>
<span class="line"><span style="color:#A6ACCD;"># the behaviour when these options are disabled.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Beware that on some FTP servers, ASCII support allows a denial of service</span></span>
<span class="line"><span style="color:#A6ACCD;"># attack (DoS) via the command &quot;SIZE /big/file&quot; in ASCII mode. vsftpd</span></span>
<span class="line"><span style="color:#A6ACCD;"># predicted this attack and has always been safe, reporting the size of the</span></span>
<span class="line"><span style="color:#A6ACCD;"># raw file.</span></span>
<span class="line"><span style="color:#A6ACCD;"># ASCII mangling is a horrible feature of the protocol.</span></span>
<span class="line"><span style="color:#A6ACCD;">#ascii_upload_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#ascii_download_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may fully customise the login banner string:</span></span>
<span class="line"><span style="color:#A6ACCD;">ftpd_banner=Welcome to blah FTP service.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may specify a file of disallowed anonymous e-mail addresses. Apparently</span></span>
<span class="line"><span style="color:#A6ACCD;"># useful for combatting certain DoS attacks.</span></span>
<span class="line"><span style="color:#A6ACCD;">#deny_email_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;"># (default follows)</span></span>
<span class="line"><span style="color:#A6ACCD;">#banned_email_file=/etc/vsftpd/banned_emails</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may specify an explicit list of local users to chroot() to their home</span></span>
<span class="line"><span style="color:#A6ACCD;"># directory. If chroot_local_user is YES, then this list becomes a list of</span></span>
<span class="line"><span style="color:#A6ACCD;"># users to NOT chroot().</span></span>
<span class="line"><span style="color:#A6ACCD;"># (Warning! chroot&#39;ing can be very dangerous. If using chroot, make sure that</span></span>
<span class="line"><span style="color:#A6ACCD;"># the user does not have write access to the top level directory within the</span></span>
<span class="line"><span style="color:#A6ACCD;"># chroot)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#限制用户只能访问自身默认路劲，不能访问其他路径</span></span>
<span class="line"><span style="color:#A6ACCD;">chroot_local_user=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">chroot_list_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">chroot_list_file=/etc/vsftpd/chroot_list</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># (default follows)</span></span>
<span class="line"><span style="color:#A6ACCD;">#chroot_list_file=/etc/vsftpd/chroot_list</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You may activate the &quot;-R&quot; option to the builtin ls. This is disabled by</span></span>
<span class="line"><span style="color:#A6ACCD;"># default to avoid remote users being able to cause excessive I/O on large</span></span>
<span class="line"><span style="color:#A6ACCD;"># sites. However, some broken FTP clients such as &quot;ncftp&quot; and &quot;mirror&quot; assume</span></span>
<span class="line"><span style="color:#A6ACCD;"># the presence of the &quot;-R&quot; option, so there is a strong case for enabling it.</span></span>
<span class="line"><span style="color:#A6ACCD;">#ls_recurse_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># When &quot;listen&quot; directive is enabled, vsftpd runs in standalone mode and</span></span>
<span class="line"><span style="color:#A6ACCD;"># listens on IPv4 sockets. This directive cannot be used in conjunction</span></span>
<span class="line"><span style="color:#A6ACCD;"># with the listen_ipv6 directive.</span></span>
<span class="line"><span style="color:#A6ACCD;">listen=NO</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># This directive enables listening on IPv6 sockets. By default, listening</span></span>
<span class="line"><span style="color:#A6ACCD;"># on the IPv6 &quot;any&quot; address (::) will accept connections from both IPv6</span></span>
<span class="line"><span style="color:#A6ACCD;"># and IPv4 clients. It is not necessary to listen on *both* IPv4 and IPv6</span></span>
<span class="line"><span style="color:#A6ACCD;"># sockets. If you want that (perhaps because you want to listen on specific</span></span>
<span class="line"><span style="color:#A6ACCD;"># addresses) then you must run two copies of vsftpd with two configuration</span></span>
<span class="line"><span style="color:#A6ACCD;"># files.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Make sure, that one of the listen options is commented !!</span></span>
<span class="line"><span style="color:#A6ACCD;">listen_ipv6=YES</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">pam_service_name=vsftpd</span></span>
<span class="line"><span style="color:#A6ACCD;">tcp_wrappers=YES</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#以下为liwne添加的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">#pasv_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#pasv_min_port=8800</span></span>
<span class="line"><span style="color:#A6ACCD;">#pasv_max_port=8899</span></span>
<span class="line"><span style="color:#A6ACCD;">userlist_enable=YES</span></span>
<span class="line"><span style="color:#A6ACCD;">#NO=只允许存在 user-list文件中的用户登录</span></span>
<span class="line"><span style="color:#A6ACCD;">userlist_deny=NO</span></span>
<span class="line"><span style="color:#A6ACCD;">userlist_file=/etc/vsftpd/user_list</span></span>
<span class="line"><span style="color:#A6ACCD;">#对vsftpd有用，否则，因home目录权限为root权限而无法登录</span></span>
<span class="line"><span style="color:#A6ACCD;">allow_writeable_chroot=YES</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 系统用户登录后的根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">local_root=/data/ftp-server/</span></span>
<span class="line"><span style="color:#A6ACCD;"># 匿名用户登录后的根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">anon_root=/data/ftp-nm/</span></span>
<span class="line"><span style="color:#A6ACCD;"># 设置用户独立配置文件保存目录</span></span>
<span class="line"><span style="color:#A6ACCD;">user_config_dir=/etc/vsftpd/userconfig/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br></div></div>`,32),r=[p];function i(c,o,t,b,u,C){return n(),a("div",null,r)}const m=s(l,[["render",i]]);export{A as __pageData,m as default};
