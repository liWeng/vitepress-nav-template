import{_ as e,o as t,c as p,a as s}from"./app.e6daa892.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/deploy/大数据-spark集群安装.md","lastUpdated":1697779797000}'),o={name:"articles/deploy/大数据-spark集群安装.md"},r=s("<p>centos7 设置网卡</p><p>$ nmcli dev status 查看网卡状态</p><p>进入/etc/sysconfig/network-scripts目录，找到该接口的配置文件（ifcfg-enp0s3）。如果没有，请创建一个。</p><p>centos网络配置实例 1，配置DNS vi /etc/resolv.conf 加入:</p><p>复制代码 代码如下:</p><p>nameserver 192.168.0.1 nameserver 8.8.8.8 nameserver 8.8.4.4</p><p>2，配置网关： vi /etc/sysconfig/network 加入： GATEWAY=192.168.0.1 完整的如下：</p><p>复制代码 代码如下:</p><p>NETWORKING=yes HOSTNAME=localhost.localdomain GATEWAY=192.168.0.1</p><p>3，配置ip地址： vi /etc/sysconfig/network-scripts/ifcfg-eth0 内容如下</p><p>复制代码 代码如下:</p><p>DEVICE=&quot;eth0&quot; HWADDR=&quot;00:0C:29:6C:BB:E6&quot; NM_CONTROLLED=&quot;yes&quot; ONBOOT=&quot;no&quot; NETMASK=255.255.255.0 IPADDR=192.168.0.8 GATEWAY=192.168.0.1 BOOTPROTO=static ONBOOT=yes PEERDNS=yes</p><p>4，重新启动服务：</p><p>复制代码 代码如下:</p><p>/etc/init.d/network restart 或使用命令： service network restart 或： ifdown eth0 and ifup eth0</p><p>配置完成后，ping一下网关，检查是否能ping通或在用ifconfig eth0，检查下实际配置的ip地址</p><p>service network restart</p><p>shutdown -h now</p>",18),n=[r];function c(a,i,_,d,f,l){return t(),p("div",null,n)}const O=e(o,[["render",c]]);export{u as __pageData,O as default};
