# Linux 搭建ftp

## linux 配置ftp 用户
### 1.创建一个组，用于存放ftp用户
```
groupadd ftpgroups
```
### 创建ftp用户，并加入ftpgroups组，/home/ftp是自己建的目录，不存在就自己创建一个
```
useradd -d /data/ftp-server/BK_DZB_DZ/ds/dz/hff/ -g ftpgroups apppayread
```
### 设置密码
```
passwd apppayread
```
### 设置不允许用于用户登录
```
usermod -s /sbin/nologin apppayread
```


## linux服务器修改ftp默认21端口方法
### 1、登录服务器，打开vsftp.conf文件
```
vim /etc/vsftpd/vsftpd.conf
```
### 2、在文件末尾增加listen_port=8021
```
#remote_charset=CP1251
#
# Enable this options if you have double "я"
#
#double_377=0
listen_port=8021
```
### 3、打开/etc/services文件
     vim /etc/services
### 4、找到ftp选项并将21修改成你设置的端口，本文为8021
```
# 21 is registered to ftp, but also used by fsp
ftp             8021/tcp
ftp             8021/udp          fsp fspd
```
### 5、重启vsftp服务
    /etc/init.d/vsftpd restart
### 6、使用netstat -utlpn | grep vsftp命令查看设置的端口，确认是否成功
```
# netstat -utlpn | grep vsftp
tcp        0      0 0.0.0.0:8021                0.0.0.0:*                   LISTEN      23619/vsftpd
```


临时关闭selinux：

获取当前selinux状态

getenforce 

 

# Enforcing为开启，Permissive为关闭
```
临时关闭：setenforce 0
永久关闭selinux：
vim /etc/sysconfig/selinux
SELINUX=enforcing 替换为SELINUX=disabled
重启后，运行命令sestatus
SELinux status ：  disabled
```
### 防火墙开放端口
```
需要开放的端口列表
firewall-cmd --zone=public --add-port=9000/tcp --permanent
firewall-cmd --zone=public --add-port=8066/tcp --permanent
firewall-cmd --zone=public --add-port=9090/tcp --permanent
firewall-cmd --zone=public --add-port=10000-11000/tcp --permanent
firewall-cmd --zone=public --add-port=12181/tcp --permanent
firewall-cmd --zone=public --add-port=30000-31000/tcp --permanent
firewall-cmd --zone=public --add-port=8096/tcp --permanent
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --zone=public --add-port=20000-21000/tcp --permanent
firewall-cmd --zone=public --add-port=8081/tcp --permanent
firewall-cmd --zone=public --add-port=7077/tcp --permanent
firewall-cmd --zone=public --add-port=9092/tcp --permanent
firewall-cmd --zone=public --add-port=9999/tcp --permanent
firewall-cmd --zone=public --add-port=7377/tcp --permanent
firewall-cmd --zone=public --add-port=11001-12000/tcp --permanent
查看防火墙开启的端口
firewall-cmd --list-ports
firewall-cmd --zone=public --add-port=19999/tcp --permanent
>>> 开启端口
firewall-cmd --zone=public --add-port=20-22/tcp --permanent
firewall-cmd --zone=public --remove-port=11001-12000/tcp --permanent
firewall-cmd  C-zone=public -Cadd-service=ftp -Cpermanent
 命令含义：
--zone #作用域
--add-port=80/tcp #添加端口，格式为：端口/通讯协议
--permanent #永久生效，没有此参数重启后失效
重启防火墙
firewall-cmd --reload
启动： systemctl start firewalld
关闭： systemctl stop firewalld
重启ftp
systemctl restart  vsftpd.service
chmod a-w //data/mongodb/ftp_datas
```
    

### ftp 配置文件示例
```
Example config file /etc/vsftpd/vsftpd.conf
#
# The default compiled in settings are fairly paranoid. This sample file
# loosens things up a bit, to make the ftp daemon more usable.
# Please see vsftpd.conf.5 for all compiled in defaults.
#
# READ THIS: This example file is NOT an exhaustive list of vsftpd options.
# Please read the vsftpd.conf.5 manual page to get a full idea of vsftpd's
# capabilities.
#
# Allow anonymous FTP? (Beware - allowed by default if you comment this out).

#禁用匿名登录
anonymous_enable=NO
#
# Uncomment this to allow local users to log in.
# When SELinux is enforcing check for SE bool ftp_home_dir
local_enable=YES
#
# Uncomment this to enable any form of FTP write command.
write_enable=YES
#
# Default umask for local users is 077. You may wish to change this to 022,
# if your users expect that (022 is used by most other ftpd's)
local_umask=022
#
# Uncomment this to allow the anonymous FTP user to upload files. This only
# has an effect if the above global write enable is activated. Also, you will
# obviously need to create a directory writable by the FTP user.
# When SELinux is enforcing check for SE bool allow_ftpd_anon_write, allow_ftpd_full_access
#anon_upload_enable=YES
#
# Uncomment this if you want the anonymous FTP user to be able to create
# new directories.
#anon_mkdir_write_enable=YES
#
# Activate directory messages - messages given to remote users when they
# go into a certain directory.
dirmessage_enable=YES
#
# Activate logging of uploads/downloads.
xferlog_enable=YES
#
# Make sure PORT transfer connections originate from port 20 (ftp-data).
connect_from_port_20=YES
#
# If you want, you can arrange for uploaded anonymous files to be owned by
# a different user. Note! Using "root" for uploaded files is not
# recommended!
#chown_uploads=YES
#chown_username=whoever
#
# You may override where the log file goes if you like. The default is shown
# below.
#xferlog_file=/var/log/xferlog
#
# If you want, you can have your log file in standard ftpd xferlog format.
# Note that the default log file location is /var/log/xferlog in this case.
xferlog_std_format=YES
#
# You may change the default value for timing out an idle session.
#idle_session_timeout=600
#
# You may change the default value for timing out a data connection.
#data_connection_timeout=120
#
# It is recommended that you define on your system a unique user which the
# ftp server can use as a totally isolated and unprivileged user.
#nopriv_user=ftpsecure
#
# Enable this and the server will recognise asynchronous ABOR requests. Not
# recommended for security (the code is non-trivial). Not enabling it,
# however, may confuse older FTP clients.
#async_abor_enable=YES
#
# By default the server will pretend to allow ASCII mode but in fact ignore
# the request. Turn on the below options to have the server actually do ASCII
# mangling on files when in ASCII mode. The vsftpd.conf(5) man page explains
# the behaviour when these options are disabled.
# Beware that on some FTP servers, ASCII support allows a denial of service
# attack (DoS) via the command "SIZE /big/file" in ASCII mode. vsftpd
# predicted this attack and has always been safe, reporting the size of the
# raw file.
# ASCII mangling is a horrible feature of the protocol.
#ascii_upload_enable=YES
#ascii_download_enable=YES
#
# You may fully customise the login banner string:
ftpd_banner=Welcome to blah FTP service.
#
# You may specify a file of disallowed anonymous e-mail addresses. Apparently
# useful for combatting certain DoS attacks.
#deny_email_enable=YES
# (default follows)
#banned_email_file=/etc/vsftpd/banned_emails
#
# You may specify an explicit list of local users to chroot() to their home
# directory. If chroot_local_user is YES, then this list becomes a list of
# users to NOT chroot().
# (Warning! chroot'ing can be very dangerous. If using chroot, make sure that
# the user does not have write access to the top level directory within the
# chroot)

#限制用户只能访问自身默认路劲，不能访问其他路径
chroot_local_user=YES
chroot_list_enable=YES
chroot_list_file=/etc/vsftpd/chroot_list

# (default follows)
#chroot_list_file=/etc/vsftpd/chroot_list
#
# You may activate the "-R" option to the builtin ls. This is disabled by
# default to avoid remote users being able to cause excessive I/O on large
# sites. However, some broken FTP clients such as "ncftp" and "mirror" assume
# the presence of the "-R" option, so there is a strong case for enabling it.
#ls_recurse_enable=YES
#
# When "listen" directive is enabled, vsftpd runs in standalone mode and
# listens on IPv4 sockets. This directive cannot be used in conjunction
# with the listen_ipv6 directive.
listen=NO
#
# This directive enables listening on IPv6 sockets. By default, listening
# on the IPv6 "any" address (::) will accept connections from both IPv6
# and IPv4 clients. It is not necessary to listen on *both* IPv4 and IPv6
# sockets. If you want that (perhaps because you want to listen on specific
# addresses) then you must run two copies of vsftpd with two configuration
# files.
# Make sure, that one of the listen options is commented !!
listen_ipv6=YES

pam_service_name=vsftpd
tcp_wrappers=YES



#以下为liwne添加的配置
#pasv_enable=YES
#pasv_min_port=8800
#pasv_max_port=8899
userlist_enable=YES
#NO=只允许存在 user-list文件中的用户登录
userlist_deny=NO
userlist_file=/etc/vsftpd/user_list
#对vsftpd有用，否则，因home目录权限为root权限而无法登录
allow_writeable_chroot=YES

# 系统用户登录后的根目录
local_root=/data/ftp-server/
# 匿名用户登录后的根目录
anon_root=/data/ftp-nm/
# 设置用户独立配置文件保存目录
user_config_dir=/etc/vsftpd/userconfig/
```
