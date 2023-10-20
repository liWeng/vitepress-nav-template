### pmm-client客户端安装

### 软件介绍

pmm-client

### 编写人员 



#### 特性

#### 局限性

#### 工作原理

### 名词解释:

### 官方文档:

### 安装过程:

#### 下载安装
下载pmm客户端(如有没有外网地址需要把rpm上传到服务器，或放到内网nginx上提供下载)
外网地址
```
mkdir -p /data/software
cd /data/software
curl -O http://www.mgf.show/static/download/software/pmm-client-1.16.0-1.el7.x86_64.rpm
```

安装
```
yum install -y pmm-client-1.16.0-1.el7.x86_64.rpm
```

#### 如果主机名重复则需要进行修改，否则跳过

```
hostnamectl set-hostname database02
bash
```
说明：database02为主机名

#### 配置服务端地址

```
#无密码
pmm-admin config --server 192.168.26.37:8888
#有密码
pmm-admin config --server 192.168.26.37:8888 --server-user admin --server-password admin@hhwy
#服务端与客户端不再一个网段，需绑定客户端地址 --bind-address ip  --client-address ip
pmm-admin config --server 10.20.10.62:8888 --server-user admin --server-password admin@hhwy --bind-address 192.168.63.12 --client-address 192.168.63.12

```

#### 添加监控项（主机）
```
#42000 是本机客户端和服务端通信端口，hostName 替换成具体服务器的主机名，作为监控名称
pmm-admin add linux:metrics  --service-port 42000  hostName  
```
#### 添加主机监控项命令汇总 修改主机名后直接执行即可
```
hostnamectl set-hostname redis-02 \
&& pmm-admin config --server 10.0.5.43:8888 --server-user admin --server-password admin@hhwy \
&& pmm-admin add linux:metrics  --service-port 42000  redis-02 \
&& firewall-cmd --zone=public --add-port=42000/tcp --permanent \
&& firewall-cmd --zone=public --add-port=42001/tcp --permanent \
&& firewall-cmd --reload
```

#### 添加监控项（mysql）

如果数据库中无监控用户需要添加数据库用户名及密码，登录mysql 命令行执行以下脚本
```
GRANT ALL PRIVILEGES ON *.* TO 'pmm'@'%' IDENTIFIED BY 'Hhwy@pmm2018' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'pmm'@'localhost' IDENTIFIED BY 'Hhwy@pmm2018' WITH GRANT OPTION;
flush privileges;
```

```
#10.11.201.69 为数据库IP,10050 为数据库端口，42001 是本机客户端和服务端通信端口，hostName-10050 是服务监控名称， hostName 和端口10050 替换为具体的真实名称
pmm-admin add mysql:metrics --user pmm --password Hhwy@pmm2018 --host 192.168.22.5 --port 17081 --service-port 42001 hostName-17081
```

#### 开启防火墙
```
firewall-cmd --zone=public --add-port=42000/tcp --permanent &&
firewall-cmd --zone=public --add-port=42001/tcp --permanent &&
firewall-cmd --reload
```

#### 检查客户端状态

```
#检查网络
pmm-admin check-network
#客户端信息
pmm-admin info
#服务列表
pmm-admin list 
#ping 服务端
pmm-admin ping
```

#### 到服务端检查客户端状态

http://192.168.26.37:8888/prometheus/targets


#### 其他命令

```
pmm-admin remove linux:metrics 移除一个服务
pmm-admin 常用命令介绍
# 添加监控服务                            
pmm-admin add                             
# 检查PMM客户端和PMM服务器之间的网络连接。
pmm-admin check-network                   
# 配置PMM Client如何与PMM服务器通信。     
pmm-admin config                          
# 打印任何命令和退出的帮助                
pmm-admin help                            
# 打印有关PMM客户端的信息                 
pmm-admin info                            
# 出为此PMM客户端添加的所有监控服务       
pmm-admin list                            
# 检查PMM服务器是否存活                   
pmm-admin ping                            
# 检查PMM服务器是否存活。                 
pmm-admin purge                           
# 清除PMM服务器上的度量数据               
pmm-admin remove, pmm-admin rm            
# 删除监控服务                            
pmm-admin repair                          
# 重启pmm                                 
pmm-admin restart                         
# 打印PMM Client使用的密码                
pmm-admin show-passwords                  
# 开启监控服务                            
pmm-admin start                           
# 停止监控服务                            
pmm-admin stop                            
# 在卸载之前清理PMM Client                
pmm-admin uninstall
```
