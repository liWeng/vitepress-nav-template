# Linux 搭建ftp

## linux 配置ftp 用户
### 1.创建一个组，用于存放ftp用户
    groupadd ftpgroups

### 创建ftp用户，并加入ftpgroups组，/home/ftp是自己建的目录，不存在就自己创建一个
    useradd -d /data/ftp-server/BK_DZB_DZ/ds/dz/hff/ -g ftpgroups apppayread

### 设置密码
    passwd apppayread

### 设置不允许用于用户登录
    usermod -s /sbin/nologin apppayread



## linux服务器修改ftp默认21端口方法
### 1、登录服务器，打开vsftp.conf文件
     vim /etc/vsftpd/vsftpd.conf
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
    

