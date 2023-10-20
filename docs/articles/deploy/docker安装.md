## 软件介绍

docker 是基于go语言实现的云开源项目，诞生于2013年初。docker 引擎的基础是linux 容器技术（lxc），在lxc 的基础上docker 进一步优化了容器的使用体验。docker 提供了各种容器管理工具（如分发，版本，移植等）让用户无需关注底层操作系统，就像操作一个轻量级的虚拟机一样。可以简单的将docker 理解为一种沙盒，每个容器内运行一个应用，不同容器相互隔离，容器的创建，运行，停止都非常快速，而且自身对资源的需求也十分有限远低于虚拟机。

#### 具体来说docker 在开发和运维的过程中有如下几个方面的优势

* 更快速的交付和部署

    使用docker，开发人员可以使用镜像快速构建一套标准的开发环境； 开发完成之后测试运维人员可以直接使用相同环境来部署代码，docker可以快速创建和删除容器，实现快速迭代，大量节约开发，测试，部署的时间。

* 更高效的资源利用

    docker 运行不需要额外的虚拟化管理程序，他是内核级的虚拟化，可以实现更高的性能，同时对资源的额外需求很低。

* 更轻松的迁移和扩展

    docker 容器几乎可以在任何平台上运行。包括物理机，虚拟机，公有云，私有云，个人电脑，服务器等，这样可以在不通平台之间任意迁移。

* 更简单的更新和管理

    使用Dockerfile，可以代替以往的繁琐的更新，而且这些更新是可跟踪的，在开发环境中这种形式更为可靠。

#### docker 的核心概念

* 镜像 (Image)

    镜像类似于虚拟机镜像，可以将它理解为一个面向Docker引擎的只读模板，包含了文件系统，如一个包含了Centos 文件系统的镜像就可以称为centos镜像。 后期制作的镜像必须是基于基本文件系统镜像制作的，比如在centos 镜像中加入 java 环境， 加入tomcat 配置好环境变量，然后重新生成一个新的镜像。用户可以从网上下载已经做好的镜像直接导入使用，


* 容器 (Container)

    容器是从镜像创建的应用的运行实例，可以使用镜像创建多个容器并运行，这些容器都是相互隔离，互不可见的。可以把容器理解为一个简单的linux 系统，包括root用户权限，进程空间，用户空间，网络空间等。可以进入到容器里边，就像进入一个linux 系统一样。
    镜像本身是只读的，每个容器在启动的时候 Docker会在镜像的嘴上层创建一个可写的层，镜像本身保持不变。
    

* 仓库 (Repository)
  
    Docker 仓库类似于代码仓库（git），只不过存储的不是代码是docker 的镜像。 是集中存放镜像文件的场所。根据仓库存储的镜像是否共享，分为私有仓库和。 （类似于互联网的 git 公有仓库，和公司内部搭建的git私有仓库），目前最大的Docker 公有仓库是Docker Hub，存放了数量庞大的镜像。 目前阿里云等云厂商也都提供共用镜像使用。
    
    docker 仓库的命令跟git 基本一致

    使用 docker pull <docker镜像地址> 命令可以 可以下载一个镜像到本地

    修改完后 ，比如加入 tomcat ，可以使用 docker commit 提交镜像到仓库

    使用 docker push 命令可以提交一个新的 镜像到仓库


### 编写人员 



### 官方文档:

#### 安装过程



## 安装docker  （所有节点）

### 卸载旧版本

```
yum remove docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-engine
```
卸载新版本
```
yum remove docker-ce docker-ce-cli containerd.io
```

### 切换源
```
echo "nameserver 114.114.114.114" > /etc/resolv.conf
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
```

### 安装docker ce
```

yum install -y yum-utils device-mapper-persistent-data lvm2 && \
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo && \
yum makecache fast && \
yum install -y docker-ce-18.09.0-3.el7 docker-ce-cli-18.09.0-3.el7 containerd.io-1.2.0-3.el7 && \
systemctl enable docker.service && \
systemctl start  docker  

# 注意：
# 官方软件源默认启用了最新的软件，您可以通过编辑软件源的方式获取各个版本的软件包。例如官方并没有将测试版本的软件源置为可用，您可以通过以下方式开启。同理可以开启各种测试版本等。
# vim /etc/yum.repos.d/docker-ee.repo
#   将[docker-ce-test]下方的enabled=0修改为enabled=1
#
# 安装指定版本的Docker-CE:
# Step 1: 查找Docker-CE的版本:
# yum list docker-ce.x86_64 --showduplicates | sort -r
#   Loading mirror speeds from cached hostfile
#   Loaded plugins: branch, fastestmirror, langpacks
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            docker-ce-stable
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            @docker-ce-stable
#   docker-ce.x86_64            17.03.0.ce-1.el7.centos            docker-ce-stable
#   Available Packages
# Step2: 安装指定版本的Docker-CE: (VERSION例如上面的17.03.0.ce.1-1.el7.centos)
# sudo yum -y install docker-ce-[VERSION]
```

### 修改配置

```
mkdir -p /data/docker && \
mkdir -p /etc/docker && \
rm -rf /etc/docker/daemon.json && \
cat >> /etc/docker/daemon.json  <<  EOF
{  
   "log-driver": "json-file",
   "log-opts": {    "max-size": "500m", "max-file": "10"   },
   "graph": "/data/docker",
   "registry-mirrors": ["https://registry.docker-cn.com"],
   "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF
```

### 修改启动参数，否则启动docker会改变chain 的值
```

sed -i "13i ExecStartPost=/usr/sbin/iptables -P FORWARD ACCEPT" /usr/lib/systemd/system/docker.service

```

### 参考加速器地址

```
--registry-mirror=https://registry.docker-cn.com

网易163镜像加速

--registry-mirror=http://hub-mirror.c.163.com

中科大镜像加速

--registry-mirror=https://docker.mirrors.ustc.edu.cn

阿里云镜像加速

--registry-mirror=https://{your_id}.mirror.aliyuncs.com

daocloud镜像加速

--registry-mirror=http://{your_id}.m.daocloud.io
```

### 重新启动docker 

```
systemctl daemon-reload
systemctl restart  docker
```
### 查看docker信息
```

docker info 
```


#### 下载一个centos镜像,:latest 为最新版本。也可以指定：XXX 版本

    docker pull centos:latest

会自动从docker hub 中下载 大概为 190M

#### 下载后执行查看所有镜像

    docker images 

#### 基于centos镜像创建容器

docker create -it centos:latest

#### 查看所有容器

    docker ps -a

#### 启动这个容器

    docker start <容器的id> /bin/echo 'hello world'
#
   可以看到屏幕打印了 hello world 

   执行完后该容器就终止了

#### 下面命令将启动一个bash 终端 允许用户进行交互

    docker start <容器id> -t -i /bin/bash

   用户可以通过命令进行交互，如 pwd，ls 等，在容器内查看进程 ps， 可以看到只运行了 bash 应用，并没有其他不需要的进程。， 可以输入exit 退出容器

#### 如果需要容器以后台守护态运行

    运行时加 -d 就可以了

#### 安装docker-compose
```
curl -o    /usr/bin/docker-compose   http://www.mgf.show/static/download/software/docker-compose-Linux-x86_64 && chmod 755 /usr/bin/docker-compose
```



### Docker 常用命令

##### 查看信息
    docker info
##### 查看镜像
    docker images
##### 查看容器
    docker ps
##### 查看所有容器
    docker ps -a
##### 存出镜像文件
    docker save -o aaaa.tar centos:14.0
##### 加载镜像文件
    docker load < centos.tar
##### 下载镜像
    docker pull centos/[或镜像地址]，默认为docker hub
##### 查看镜像信息
    docker inspect <镜像ID>
##### 创建容器
    docker create <镜像ID、或名称>
##### 删除容器
    docker rm
# 
    docker rm -f 强行停止并删除
##### 创建容器并运行
    docker run <镜像ID、或名称>
##### 获取容器的logs
    docker logs -f
##### 进入容器
    docker exec -it <容器ID> /bin/bash 

##### 停止容器
    docker stop [-t|--time[=10]] 会先发发送给容器SIGTERM信号，然后一段时间后（默认为10s）终止容器】
#
    docker stop <容器id>
#
    通过exit 退出终端时容器立刻终止
##### 运行容器
    docker start <容器id>
    
    
##### 配置加速器

###### 7.0

```

   sudo sed -i 's|other_args="|other_args="--registry-mirror=https://s856njmh.mirror.aliyuncs.com |g' /etc/sysconfig/docker
   sudo sed -i "s|OPTIONS='|OPTIONS='--registry-mirror=https://s856njmh.mirror.aliyuncs.com |g" /etc/sysconfig/docker
   sudo sed -i 'N;s|\[Service\]\n|\[Service\]\nEnvironmentFile=-/etc/sysconfig/docker\n|g' /usr/lib/systemd/system/docker.service
   sudo sed -i 's|fd://|fd:// $other_args |g' /usr/lib/systemd/system/docker.service

   sudo systemctl daemon-reload
   sudo service docker restart


```

###### 6.0

```
   sudo sed -i "s|other_args=\"|other_args=\"--registry-mirror=https://s856njmh.mirror.aliyuncs.com |g" /etc/sysconfig/docker
   sudo sed -i "s|OPTIONS='|OPTIONS='--registry-mirror=https://s856njmh.mirror.aliyuncs.com |g" /etc/sysconfig/docker
   sudo service docker restart

```
    
    
    
