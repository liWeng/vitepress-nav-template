## 什么是keepalived

keepalived是一个类似于layer3, 4 & 5交换机制的软件，也就是我们平时说的第3层、第4层和第5层交换。Keepalived是自动完成，不需人工干涉。

Keepalived的作用是检测服务器的状态，如果有一台web服务器宕机，或工作出现故障，Keepalived将检测到，并将有故障的服务器从系统中剔除，同时使用其他服务器代替该服务器的工作，当服务器工作正常后Keepalived自动将服务器加入到服务器群中，这些工作全部自动完成，不需要人工干涉，需要人工做的只是修复故障的服务器。
工作原理

#### 工作原理
    Layer3,4,5工作在IP/TCP协议栈的IP层，TCP层，及应用层,原理分别如下：    
    Layer3：Keepalived使用Layer3的方式工作式时，Keepalived会定期向服务器群中的服务器发送一个ICMP的数据包（既我们平时用的Ping程序）,如果发现某台服务的IP地址没有激活，Keepalived便报告这台服务器失效，并将它从服务器群中剔除，这种情况的典型例子是某台服务器被非法关机。Layer3的方式是以服务器的IP地址是否有效作为服务器工作正常与否的标准。   
    Layer4:如果您理解了Layer3的方式，Layer4就容易了。Layer4主要以TCP端口的状态来决定服务器工作正常与否。如web server的服务端口一般是80，如果Keepalived检测到80端口没有启动，则Keepalived将把这台服务器从服务器群中剔除。    
    Layer5：Layer5对指定的URL执行HTTP GET。然后使用MD5算法对HTTP GET结果进行求和。如果这个总数与预期值不符，那么测试是错误的，服务器将从服务器池中移除。该模块对同一服务实施多URL获取检查。如果您使用承载多个应用程序服务器的服务器，则此功能很有用。此功能使您能够检查应用程序服务器是否正常工作。MD5摘要是使用genhash实用程序（包含在keepalived软件包中）生成的。    
    SSL_GET与HTTP_GET相同，但使用SSL连接到远程Web服务器。    
    MISC_CHECK：此检查允许用户定义的脚本作为运行状况检查程序运行。结果必须是0或1.该脚本在导演盒上运行，这是测试内部应用程序的理想方式。可以使用完整路径（即/path_to_script/script.sh）调用可以不带参数运行的脚本。那些需要参数的需要用双引号括起来（即“/path_to_script/script.sh arg 1 ... arg n”）


#### 安装 keepalived

##### 下载最新稳定版本keepalived

```
wget https://www.keepalived.org/software/keepalived-2.1.5.tar.gz
```
##### 安装依赖类库
```
yum -y install openssl-devel&& yum -y install gcc
```

##### 解压并配置
```
tar -zxvf keepalived-2.1.5.tar.gz &&\
cd keepalived-2.1.5 &&\
./configure --prefix=/usr/local/keepalived
```
如果没有报错，则可以进行下一步

##### 安装
```
make && make install
```

##### 复制相关文件
```
mkdir /etc/keepalived &&
cp /usr/local/keepalived/etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf &&
cp /usr/local/keepalived/sbin/keepalived /etc/rc.d/init.d/keepalived &&
cp /usr/local/keepalived/etc/sysconfig/keepalived /etc/sysconfig/keepalived
```

##### 设置开机启动
```
chkconfig keepalived on
```

##### 拷贝启动文件
```
cp /usr/local/keepalived/sbin/keepalived /usr/sbin/
```

##### 修改配置文件

主节点执行以下脚本
```
rm -rf /etc/keepalived/keepalived.conf &&\
cat >> /etc/keepalived/keepalived.conf << EOF
global_defs {
   router_id nginx_01  #标识本节点的名称，通常为hostname
}

## keepalived会定时执行脚本并对脚本执行的结果进行分析,动态调整vrrp_instance的优先级。
##如果脚本执行结果为0,并且weight配置的值大于0,则优先级相应的增加。如果脚本执行结果非0,
##并且weight配置的值小于 0,则优先级相应的减少。其他情况,维持原本配置的优先级,即配置文件中priority对应的值。

vrrp_instance VI_1 {
    state MASTER                  # 状态，主节点为MASTER，备份节点为BACKUP
    interface ens160              # 绑定VIP的网络接口，通过ifconfig查看自己的网络接口
    virtual_router_id 51          # 虚拟路由的ID号,同一组的节点设置必须一样,可选虚IP最后一段使用,相同的VRID为一个组,他将决定多播的MAC地址,注意不要与其他组的id重复
    mcast_src_ip  10.100.5.130     # 本机IP地址
    priority 100                  # 节点优先级，值范围0～254，MASTER要比BACKUP高
    advert_int 1                  # 组播信息发送时间间隔，两个节点必须设置一样，默认为1秒
    # 设置验证信息，两个节点必须一致
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP，两个节点设置必须一样。可以设置多个，一行写一个
    virtual_ipaddress {
        10.100.5.138
    }
    
}
EOF
```

备用节点执行以下命令
```
rm -rf /etc/keepalived/keepalived.conf &&\
cat >> /etc/keepalived/keepalived.conf << EOF
global_defs {
   router_id nginx_02  #标识本节点的名称，通常为hostname
}

## keepalived会定时执行脚本并对脚本执行的结果进行分析,动态调整vrrp_instance的优先级。
##如果脚本执行结果为0,并且weight配置的值大于0,则优先级相应的增加。如果脚本执行结果非0,
##并且weight配置的值小于 0,则优先级相应的减少。其他情况,维持原本配置的优先级,即配置文件中priority对应的值。

vrrp_instance VI_1 {
    state BACKUP                  # 状态，主节点为MASTER，备份节点为BACKUP
    interface ens160              # 绑定VIP的网络接口，通过ifconfig或ip addr查看自己的网络接口
    virtual_router_id 51          # 虚拟路由的ID号,同一组的节点设置必须一样,可选虚IP最后一段使用,相同的VRID为一个组,他将决定多播的MAC地址,注意不要与其他组的id重复
    mcast_src_ip  10.100.5.131     # 本机IP地址
    priority 90                  # 节点优先级，值范围0～254，MASTER要比BACKUP高
    advert_int 1                  # 组播信息发送时间间隔，两个节点必须设置一样，默认为1秒
    # 设置验证信息，两个节点必须一致
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP，两个节点设置必须一样。可以设置多个，一行写一个
    virtual_ipaddress {
        10.100.5.138
    }
}

EOF
```

### 添加广播配置
注意：--in-interface后的`eth0`需要改为实际网卡名称
```
firewall-cmd --direct --permanent --add-rule ipv4 filter INPUT 0 --in-interface eth0 --destination 224.0.0.18 --protocol vrrp -j ACCEPT
firewall-cmd --reload
```

#### 安装完成后启动
启动keepalived

centos7及以上
```
systemctl start keepalived
```
centos6
```
service keepalived start
```

### 设置开机启动



### 其他注意事项事项
如果虚IP被几个节点同时抢占，请检查如下内容
1）ARP广播是否开启
2）keepalived的配置文件中的virtual_router_id与其他组keepalived是否重复（注意是指其他组，不是同一组的其他节点）


    
