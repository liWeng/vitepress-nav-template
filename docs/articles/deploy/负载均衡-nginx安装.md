### 软件介绍

redis

### 编写人员 

贾立鑫

#### 特性

#### 局限性

#### 工作原理

### 安装过程:

安装依赖（centos7系统使用）（在线）
```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum install wget telnet lsof gcc gcc-c++ autoconf automake make openssl openssl-devel -y
```

安装依赖(Centos8，OpenEuler使用)
```
dnf install wget telnet lsof gcc gcc-c++ autoconf automake make openssl openssl-devel -y
```





下载源码包

```
mkdir -p /data/software
cd /data/software
wget http://tengine.taobao.org/download/tengine-2.3.2.tar.gz
```
解压
```
tar -zxvf tengine-2.3.2.tar.gz 
cd tengine-2.3.2
```

创建文件夹
```
mkdir -p /data/logs/nginx/
mkdir -p /usr/local/nginx/bin
mkdir -p /usr/local/nginx/conf
```

配置
```
cd /data/software/tengine-2.3.2
./configure --prefix=/usr/local/nginx \
--lock-path=/usr/local/nginx/nginx.lock \
--pid-path=/usr/local/nginx/nginx.pid \
--error-log-path=/data/logs/nginx/error.log \
--http-log-path=/data/logs/nginx/access.log \
--with-stream \
```

安装
```
make && make install
```



修改环境变量,在最后增加nginx主目录，后续可以直接使用`nginx`命令进行操作
```
vi /etc/profile
NGX_HOME=/usr/local/nginx
export PATH=$PATH:$NGX_HOME/sbin
```





开启防火墙
```
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

### 配置文件

参考如下内容，修改/usr/local/nginx/conf/nginx.conf文件
```

#user  nobody;
worker_processes  8;
worker_rlimit_nofile 204800;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    use epoll;
    worker_connections  102400;
}


http {
    
    log_format  main  '$remote_user [$time_local] $http_x_Forwarded_for , $remote_addr , request: $request , status:$status ,' '$http_x_forwarded_for ,' 'upstream_addr: $upstream_addr ,' 'ups_resp_time: $upstream_response_time ,' 'request_time: $request_time';
    access_log  /data/logs/nginx/access.log  main;
    error_log  /data/logs/nginx/error.log  ; 
    
    #代理服务端不要主要主动关闭客户端连接
    proxy_ignore_client_abort on;
    default_type  application/octet-stream;
    sendfile        on;
    server_tokens off;

    client_header_timeout 120;
    proxy_connect_timeout 60000; 
    keepalive_timeout 120;
    send_timeout 120;
    autoindex off;
    autoindex_exact_size off;
    autoindex_localtime on;

    #限制同一个客户端地址限制10M
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn_zone $server_name zone=perserver:10m;


    upstream fweb-unify-portal {
        server 192.168.26.60:9093;
    }


    server {

        if ( $query_string ~* "union.*select.*\(" ) { return 506; }
        if ( $query_string ~* "concat.*\(" ) { return 506; }
        if ($query_string ~ "//|['\"]+|%27") { return 506; }

        limit_conn perip 20;
        #限制同一个客户端每秒20个并发
        limit_conn perserver 20;
        limit_rate 300k;
        client_body_buffer_size 128k;
        #client_header_bfuffer_size 1k;
        client_max_body_size 16m;
        large_client_header_buffers 2 1m;

        listen 80;
        server_name localhost;
        keepalive_timeout 0;
        location /static {
         
	        default_type  application/octet-stream;
	        sendfile  on;
	        autoindex off;
	        autoindex_exact_size off;
	        autoindex_localtime on;
                add_header Access-Control-Allow-Origin *;
            root   /data/nginx/html;
        }

        location /fweb-unify-portal {
            proxy_pass http://fweb-unify-portal;
            #public
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            #for websocket
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
        location ~ /\.ht {
            deny all;
        }


    }

}

```


### 安全优化

#### 应限制nginx.conf文件权限，建议（600）
```
chmod 600 /usr/local/nginx/conf/nginx.conf
```
#### 应限制log文件权限，建议（640）
```
chmod 640 /usr/local/nginx/logs/access.log
chmod 640 /usr/local/nginx/logs/error.log
```

#### 启用自动结束会话功能 http中配置
```
client_header_timeout 90;
keepalive_timeout 95;
send_timeout 90;

```

#### 限制ngnix访问.htxx文件(按需修改)

```
location ~ /\.ht {
deny all;
}
```

#### 配置最大连接数 http中配置

```
events {
use epoll;
worker_connections 10240;
}

```

#### 限制用户连接并发数 http中配置

```
http{
    #限制同一个客户端地址限制10M
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn_zone $server_name zone=perserver:10m;
    server{
        limit_conn perip 20;
        #限制同一个客户端每秒20个并发
        limit_conn perserver 20;
        #限制链接下载速率，可根据实际调整
        limit_rate 100M;
    }
}

```
#### 隐藏客户端版本号 http中配置
```
server_tokens off;
```

#### 配置自定义缓存

```
client_body_buffer_size 128k;
#client_header_bfuffer_size 1k;
client_max_body_size 16m;
large_client_header_buffers 2 1m;
```


#### 自定义错误菜单
```
 error_page 400 401 402 403 404 405 408 410 412 413 414 415 500 501 502 503 504 506 /404.html;
 location = /404.html{
     root /data/nginx/html/pages/404/
 }

```

#### 中间件过滤敏感数据 server 中添加过滤所有请求，也可以在location中添加
```
        if ( $query_string ~* "union.*select.*\(" ) { return 506; }
        if ( $query_string ~* "concat.*\(" ) { return 506; }
        if ($query_string ~ "//|['\"]+|%27") { return 506; }

```

#### 设置开机启动

#### 添加nginx.service
```
rm -rf /lib/systemd/system/nginx.service
cat >> /lib/systemd/system/nginx.service <<EOF

[Unit]
Description=nginx service
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target

EOF

```

#### 重新加载nginx服务
```
systemctl daemon-reload
```


#### 启动nginx
```
systemctl start nginx
```

#### 启用nginx开机启动
```
systemctl enable nginx
```


#### 查看nginx状态
```
systemctl status nginx
```

#### nginx相关操作命令
```
systemctl start nginx  #启动nginx
systemctl stop nginx  #停止nginx
systemctl reload nginx  #重新加载nginx
```

