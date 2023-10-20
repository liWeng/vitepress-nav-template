### 软件介绍

haproxy

### 编写人员 



#### 特性

#### 局限性

#### 工作原理

### 名词解释:

### 安装haproxy
### 1.安装必备包
yum install -y gcc gcc-c++ make zlib-devel bzip2-devel openssl-devel
### 2.准备安装包
使用wget下载安装包或者使用ssh工具上传haproxy-1.5.14.tar.gz到服务器的/data/software目录
```
cd /data/software/
wget http://mgf.show/static/download/software/haproxy-1.5.14.tar.gz
```
### 3.解压
tar -xf haproxy-1.5.14.tar.gz  
### 4.进入haproxy安装目录
cd haproxy-1.5.14  
### 5编绎安装
(1)make TARGET=linux31 prefix=/usr/local/haproxy

        (若要支持ssl证书,则需要如下构建命令:)
    # 加入支持ssl的编译参数

     make TARGET=linux31 prefix=/usr/local/haproxy USE_PCRE=1 USE_OPENSSL=1 USE_ZLIB=1 USE_CRYPT_H=1 USE_LIBCRYPT=1
(2)make install PREFIX=/usr/local/haproxy
### 6.建立两个目录配置文件和日志目录
cd /usr/local/haproxy/&&mkdir conf logs
### 7.修改配置文件   
(1)cp /data/software/haproxy-1.5.14/examples/haproxy.cfg /usr/local/haproxy/conf/haproxy.cfg

(2)vi /usr/local/haproxy/conf/haproxy.cfg

```
global
    log 127.0.0.1 local0
    # 最大连接数
    maxconn 4096
    # 安装路径
    chroot /usr/local/haproxy
    # 所属用户id
    uid 99
    # 所属用户组id[用户和组可以自己创建的]
    gid 99
    # 后台运行
    daemon
    quiet
    # 进程数,可以同时开启多个
    nbproc 1
    pidfile /usr/local/haproxy/logs/haproxy.pid

defaults
    log global
    # 所处理的类别[7层：http;4层：tcp]
    mode http
    # 3次连接失败就认为服务不可用
    retries 3
    # 日志类别http日志格式
    option httplog
    # 不记录健康检查的日志信息
    option dontlognull
    # serverid对应服务器宕掉后,强制定向到其他健康的服务器
    option redispatch
    #当服务器负载很高的话,自动结束到当前处理比较久的连接
    option abortonclose
    # 最大连接数
    maxconn 4096
    # 连接超时
    contimeout 315360000
    # 客户端连接超时
    clitimeout 315360000
    # 心跳检测超时
    srvtimeout 50000

listen mysql_proxy 0.0.0.0:3307
    # 监听4层 模式
    mode tcp
    # 负载均衡方式为轮询
    balance roundrobin
    #  balance source              # 此负载方式数据库负载不建议使用,http可以使用   
    option tcpka
    # 心跳检测
    option httpchk
    #  option mysql-check user haproxy  
    # 后端真是数据库ip地址和端口,权重
    server mysql1 10.20.10.62:30365 weight 1
    server mysql2 10.20.10.63:30365 weight 1
    server mysql2 10.20.10.64:30365 weight 1
```
### 8.测试配置文件语法是否正确
(1)cd /usr/local/haproxy/sbin && ./haproxy -f /usr/local/haproxy/conf/haproxy.cfg 
### 9.启动测试,看haproxy启动是否正常  
(1)./haproxy -f /usr/local/haproxy/conf/haproxy.cfg 

(2)ps -ef |grep haproxy
### 10.编写启动脚本
vim /etc/init.d/haproxy
```
#!/bin/bash  
BASE_DIR="/usr/local/haproxy"  
ARGV="$@"  
start()  
{  
echo "START HAPoxy SERVERS"  
$BASE_DIR/sbin/haproxy -f $BASE_DIR/conf/haproxy.conf  
}  
stop()  
{  
echo "STOP HAPoxy Listen"  
kill -TTOU $(cat $BASE_DIR/logs/haproxy.pid)  
echo "STOP HAPoxy process"  
kill -USR1 $(cat $BASE_DIR/logs/haproxy.pid)  
}  
case $ARGV in  
start)  
start  
ERROR=$?  
;;  
stop)  
stop  
ERROR=$?  
;;  
restart)  
stop  
start  
ERROR=$?  
;;  
*)  
echo "hactl.sh [start|restart|stop]"  
esac  
exit $ERROR  
```
### 11.修改可执行权限
chmod +x /etc/init.d/haproxy
### 12.用脚本重启haproxy
service haproxy restart
