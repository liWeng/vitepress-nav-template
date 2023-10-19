##### 文件共享服务NFS安装

在线安装配置
#### 服务安装
安装nfs相关服务
```
yum -y install nfs-utils nfs-utils-lib rpcbind
```

创建共享文件夹,根据实际情况创建
```
mkdir -p /data/share
```



启动服务，并设置开机启动
CentOS 6.x
```
service rpcbind restart &&
service nfs restart &&
chkconfig --level 35 nfs on &&
chkconfig --level 35 rpcbind on
```

CentOS 7.x
```
systemctl restart rpcbind &&
systemctl restart nfs &&
systemctl enable nfs &&
systemctl enable rpcbind
```

#### 服务端配置
编辑配置文件
```
vi /etc/exports
```
添加如下配置,保存退出
```
/data/share/ *(rw,sync,no_root_squash,no_all_squash)
```

使配置生效
```
exportfs -r
```


```
showmount -e 127.0.0.1
```

需要设置客服端和服务端的端口
```
firewall-cmd --zone=public --add-port=111/tcp --permanent &&
firewall-cmd --zone=public --add-port=111/udp --permanent &&
firewall-cmd --zone=public --add-port=2049/tcp --permanent &&
firewall-cmd --zone=public --add-port=2049/udp --permanent &&
firewall-cmd --zone=public --add-port=20048/tcp --permanent &&
firewall-cmd --zone=public --add-port=20048/udp --permanent &&
firewall-cmd --reload
```

#### 客户端配置
安装nfs相关服务
```
yum -y install nfs-utils
```

创建挂载目录
```
mkdir -p /data/share
```


客户端验证NFS共享
```
showmount -e 10.11.0.41
```

挂载
```
mount -t nfs -o rw,soft,timeo=30,retry=3 10.11.0.41:/data/share /data/share
```

#### 设置自动挂载（未配置）
安装自动挂载工具

```
yum install autofs -y
```

修改配置文件
```
vi /etc/auto.master
```

最后一行添加配置
```
/data/share /etc/auto.nfs 
```

创建挂载路径配置
```
vi /etc/auto.nfs
```

```
/data/share -rw,sync 10.11.0.41:/data/share
```

