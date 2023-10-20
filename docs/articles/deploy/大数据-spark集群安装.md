centos7 设置网卡

$ nmcli dev status 查看网卡状态

进入/etc/sysconfig/network-scripts目录，找到该接口的配置文件（ifcfg-enp0s3）。如果没有，请创建一个。

centos网络配置实例
1，配置DNS
vi /etc/resolv.conf
加入:


复制代码
代码如下:

nameserver 192.168.0.1 
nameserver 8.8.8.8
nameserver 8.8.4.4

2，配置网关：
vi /etc/sysconfig/network
加入：
GATEWAY=192.168.0.1
完整的如下： 
 


复制代码
代码如下:

NETWORKING=yes
HOSTNAME=localhost.localdomain
GATEWAY=192.168.0.1

3，配置ip地址： 
vi /etc/sysconfig/network-scripts/ifcfg-eth0
内容如下
 


复制代码
代码如下:

DEVICE="eth0"
HWADDR="00:0C:29:6C:BB:E6"
NM_CONTROLLED="yes"
ONBOOT="no"
NETMASK=255.255.255.0
IPADDR=192.168.0.8
GATEWAY=192.168.0.1
BOOTPROTO=static
ONBOOT=yes
PEERDNS=yes

 
4，重新启动服务：


复制代码
代码如下:

/etc/init.d/network restart
或使用命令：
service network restart
或：
ifdown eth0 and ifup eth0

配置完成后，ping一下网关，检查是否能ping通或在用ifconfig eth0，检查下实际配置的ip地址



service network restart


shutdown -h now



