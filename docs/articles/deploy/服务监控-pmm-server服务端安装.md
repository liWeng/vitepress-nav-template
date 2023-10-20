### pmm-server客户端安装

### 软件介绍

pmm-server

### 编写人员 

贾立鑫

### 安装过程:

#### 下载镜像（可连接外网的不需要下载及导入,如需下载按照以下命令）
```
mkdir -p /data/images
cd /data/images
curl -O http://www.mgf.show/static/download/pmm-server/pmm-server.tar.zip 
unzip pmm-server.tar.zip 
docker load < pmm-server.tar
```

#### 下载基础数据文件

```
mkdir -p /data/
cd /data/
curl -O http://www.mgf.show/static/download/pmm-server/pmm-data.zip
unzip pmm-data.zip
```

#### 修改权限
```
chown -R 1000:1000 /data/pmm-data/data
chown -R 1000:1000 /data/pmm-data/consul-data
chown -R 996:996 /data/pmm-data/grafana
chown -R 999:998 /data/pmm-data/mysql
#chmod -R 755 /usr/docker/pmm-server/conf 
```

#### 编写docker-compose 文件

```

mkdir -p /usr/docker/pmm-server
rm -rf /usr/docker/pmm-server/docker-compose.yml
cat >>/usr/docker/pmm-server/docker-compose.yml <<EOF
pmm:
    image: "docker.mgf.show/pmm-server"
    privileged: true
    volumes:
         - /data/pmm-data/data:/opt/prometheus/data
         - /data/pmm-data/consul-data:/opt/consul-data
         - /data/pmm-data/mysql:/var/lib/mysql
         - /data/pmm-data/grafana:/var/lib/grafana
    ports:
        - "8090:8090"
        - "8500:8500"
        - "8888:80"
        - "4406:3306"
        - "17082:17082"
    environment:
        "LANG": "en_US.UTF-8"
        "LC_ALL": "en_US.UTF-8"
        "SERVER_USER": "admin"
        "SERVER_PASSWORD": "admin@hhwy"
        "PUSHTYPE":"local"
    expose:
        - "80"
        - "8500"
        - "8090"
        - "17082"

EOF

chmod -R 755 /usr/docker/pmm-server/
```

#### 各个端口作用

* 8090：服务的端口
* 3306：数据库端口
* 80：监控界面端口
* 17082 TCP 消息推送端口



#### 启动

```
docker-compose up -d
```

#### 如果服务端无法访问外网可采用客户端推送的方式

##### 客户端下载
```
mkdir -p /usr/docker/pmm-push-client
cd /usr/docker/pmm-push-client
curl -O http://www.mgf.show/static/download/pmm-server/alarm-manager-push-client-0.0.1.jar
nohup java -jar alarm-manager-push-client-0.0.1.jar 10.20.10.62 17082 >log.file 2>&1 &

```

##### 服务端配置修改(环境变量)，"PUSHTYPE" 改为 "remote"

```
environment:
        "LANG": "en_US.UTF-8"
        "LC_ALL": "en_US.UTF-8"
        "SERVER_USER": "admin"
        "SERVER_PASSWORD": "admin@hhwy"
        "PUSHTYPE": "remote"
```

