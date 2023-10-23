import{_ as s,o as n,c as a,a as e}from"./app.e6daa892.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"centos7 设置网卡","slug":"centos7-设置网卡","link":"#centos7-设置网卡","children":[]},{"level":3,"title":"centos网络配置实例","slug":"centos网络配置实例","link":"#centos网络配置实例","children":[]}],"relativePath":"articles/deploy/centos-网卡设置.md","lastUpdated":1697946257000}'),l={name:"articles/deploy/centos-网卡设置.md"},p=e(`<h3 id="centos7-设置网卡" tabindex="-1">centos7 设置网卡 <a class="header-anchor" href="#centos7-设置网卡" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">$ nmcli dev status 查看网卡状态</span></span>
<span class="line"><span style="color:#A6ACCD;">进入/etc/sysconfig/network-scripts目录，找到该接口的配置文件（ifcfg-enp0s3）。如果没有，请创建一个。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="centos网络配置实例" tabindex="-1">centos网络配置实例 <a class="header-anchor" href="#centos网络配置实例" aria-hidden="true">#</a></h3><h4 id="_1-配置dns" tabindex="-1">1，配置DNS <a class="header-anchor" href="#_1-配置dns" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/resolv.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">加入:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span>
<span class="line"><span style="color:#A6ACCD;">代码如下:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">nameserver 192.168.0.1 </span></span>
<span class="line"><span style="color:#A6ACCD;">nameserver 8.8.8.8</span></span>
<span class="line"><span style="color:#A6ACCD;">nameserver 8.8.4.4</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_2-配置网关" tabindex="-1">2，配置网关： <a class="header-anchor" href="#_2-配置网关" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/sysconfig/network</span></span>
<span class="line"><span style="color:#A6ACCD;">加入：</span></span>
<span class="line"><span style="color:#A6ACCD;">GATEWAY=192.168.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">完整的如下： </span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span>
<span class="line"><span style="color:#A6ACCD;">代码如下:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NETWORKING=yes</span></span>
<span class="line"><span style="color:#A6ACCD;">HOSTNAME=localhost.localdomain</span></span>
<span class="line"><span style="color:#A6ACCD;">GATEWAY=192.168.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_3-配置ip地址" tabindex="-1">3，配置ip地址： <a class="header-anchor" href="#_3-配置ip地址" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/sysconfig/network-scripts/ifcfg-eth0</span></span>
<span class="line"><span style="color:#A6ACCD;">内容如下</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span>
<span class="line"><span style="color:#A6ACCD;">代码如下:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">DEVICE=&quot;eth0&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">HWADDR=&quot;00:0C:29:6C:BB:E6&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">NM_CONTROLLED=&quot;yes&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">ONBOOT=&quot;no&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">NETMASK=255.255.255.0</span></span>
<span class="line"><span style="color:#A6ACCD;">IPADDR=192.168.0.8</span></span>
<span class="line"><span style="color:#A6ACCD;">GATEWAY=192.168.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#A6ACCD;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#A6ACCD;">PEERDNS=yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_4-重新启动服务" tabindex="-1">4，重新启动服务： <a class="header-anchor" href="#_4-重新启动服务" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">复制代码</span></span>
<span class="line"><span style="color:#A6ACCD;">代码如下:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/etc/init.d/network restart</span></span>
<span class="line"><span style="color:#A6ACCD;">或使用命令：</span></span>
<span class="line"><span style="color:#A6ACCD;">service network restart</span></span>
<span class="line"><span style="color:#A6ACCD;">或：</span></span>
<span class="line"><span style="color:#A6ACCD;">ifdown eth0 and ifup eth0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">配置完成后，ping一下网关，检查是否能ping通或在用ifconfig eth0，检查下实际配置的ip地址</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">service network restart</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">shutdown -h now</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div>`,11),r=[p];function c(i,o,t,b,C,A){return n(),a("div",null,r)}const m=s(l,[["render",c]]);export{d as __pageData,m as default};
