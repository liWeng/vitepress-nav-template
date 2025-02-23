10.20.10.63:26379,10.20.10.64:26379,10.20.10.62:26379


cd /usr/local/haproxy/sbin ./haproxy -c -f/usr/local/haproxy/conf/haproxy.cfg 


cd /usr/local/haproxy/sbin ./haproxy -c -f/usr/local/haproxy/conf/haproxy.cfg


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
    contimeout 50000
    # 客户端连接超时
    clitimeout 50000
    # 心跳检测超时
    srvtimeout 50000
#写节点
listen mysql_proxy 0.0.0.0:3306
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
    server mysql2 10.20.10.64:30365 weight 1
#读节点
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




#keepalived  配置
global_defs {
   router_id mysql_63  #标识本节点的名称，通常为hostname
}

## keepalived会定时执行脚本并对脚本执行的结果进行分析,动态调整vrrp_instance的优先级。
##如果脚本执行结果为0,并且weight配置的值大于0,则优先级相应的增加。如果脚本执行结果非0,
##并且weight配置的值小于 0,则优先级相应的减少。其他情况,维持原本配置的优先级,即配置文件中priority对应的值。

vrrp_instance VI_1 {
    state BACKUP                  # 状态，主节点为MASTER，备份节点为BACKUP
    interface eno3              # 绑定VIP的网络接口，通过ifconfig查看自己的网络接口
    virtual_router_id 79          # 虚拟路由的ID号,两个节点设置必须一样,可选IP最后一段使用,相同的VRID为一个组,他将决定多播的MAC地址
    mcast_src_ip  10.20.10.63     # 本机IP地址
    priority 90                  # 节点优先级，值范围0～254，MASTER要比BACKUP高
    advert_int 1                  # 组播信息发送时间间隔，两个节点必须设置一样，默认为1秒
    # 设置验证信息，两个节点必须一致
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP，两个节点设置必须一样。可以设置多个，一行写一个
    virtual_ipaddress {
        10.20.10.66
    }
}

virtual_server 10.20.10.66 3306 { 
    delay_loop 6 
    lb_algo rr 
    lb_kind DR 
    persistence_timeout 50 
    protocol TCP 
 
    real_server 10.20.10.63 30365 { 
        weight 3
        notify_down /etc/keepalived/kill_keepalived.sh
        TCP_CHECK { 
            connect_timeout 10 
            nb_get_retry 3 
            delay_before_retry 3 
            connect_port 3306 
        } 
    }
}