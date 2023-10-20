#### 编写人员

贾立鑫

#### 原版文档

```
https://www.percona.com/doc/percona-xtradb-cluster/LATEST/install/tarball.html#tarball
设置yum官方文档
https://www.percona.com/doc/percona-repo-config/percona-release.html#rpm-based-gnu-linux-distributions
```

#### 环境说明


    第一个节点 192.168.60.71：#30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port 端口作用及说明见上面
    第二个节点 192.168.60.72：#30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port 端口作用及说明见上面
    第二个节点 192.168.60.73：#30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port 端口作用及说明见上面

#### 相关依赖(所有节点)

##### percona 依赖
```
sudo yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm
```

##### 安装gcc socat libev  openssl必须为1.0.2k
```
 yum install libev socat  libcurl-devel libaio openssl openssl-devel jemalloc
```

##### xtrabackup
```
mkdir -p /data/software
cd /data/software
wget http://yth.365grid.cn/static/download/pxc5.7/percona-xtrabackup-24-2.4.15-1.el7.x86_64.rpm
yum install -y percona-xtrabackup-24-2.4.15-1.el7.x86_64.rpm
```

#### 创建用户、组(所有节点)
```
    groupadd mysql && useradd -r -g mysql mysql
```

#### 基本配置(所有节点)

##### 首先下载二进制文件,必须对应ssl102

```
mkdir -p /usr/local/mysql/
cd /data/software
wget http://monitor.mgf.show/static/download/software/Percona-XtraDB-Cluster-5.7.27-rel30-31.39.1.Linux.x86_64.ssl102.tar.gz
tar zxvf Percona-XtraDB-Cluster-5.7.27-rel30-31.39.1.Linux.x86_64.ssl102.tar.gz
mv Percona-XtraDB-Cluster-5.7.27-rel30-31.39.1.Linux.x86_64.ssl102 /usr/local/mysql/pxc5.7.27
```

##### 配置环境变量

```
vi /etc/profile
```

```
export PATH=$PATH:/usr/local/mysql/pxc5.7.27/bin
```
```
source /etc/profile
```
##### 下载启动脚本（/usr/local/mysql/pxc5.7.27/mysql.server.sh）(所有节点)

```
wget http://yth.365grid.cn/static/download/pxc5.7/mysql.server.sh -O /usr/local/mysql/pxc5.7.27/mysql.server.sh
chmod 755 /usr/local/mysql/pxc5.7.27/mysql.server.sh
```

##### 创建30365文件夹

```
mkdir -p /data/mysql/30365/logs
mkdir -p /data/mysql/30365/binlogs
mkdir -p /data/mysql/30365/datas
mkdir -p /data/mysql/30365/share
mkdir -p /data/mysql/30365/etc
mkdir -p /data/mysql/30365/tmp
touch /data/mysql/30365/logs/mysqld_safe.log
touch /data/mysql/30365/logs/mysqld.log
```
####  192.168.60.71,192.168.60.72,192.168.60.73 生成配置文件,修改后直接执行命令生成

##### my.cnf 配置文件
 
```
rm -rf /data/mysql/30365/etc/my.cnf
cat > /data/mysql/30365/etc/my.cnf << EOF
#30365 for mysqld port, 4444 for sst port, 4568 for ist port, 4567 for cluster communication port 
[client]
default-character-set=utf8
socket=/data/mysql/30365/mysql.sock
[mysqld]
server-id=1
bind-address=0.0.0.0
user=mysql
port=30365

basedir=/usr/local/mysql/pxc5.7.27
datadir=/data/mysql/30365/datas
tmpdir=/data/mysql/30365/tmp
pid-file=/data/mysql/30365/mysqld.pid
log-bin=/data/mysql/30365/binlogs/bin-log
log-error=/data/mysql/30365/logs/mysqld.log
general_log_file=/data/mysql/30365/logs/mysqld-general.log
slow_query_log_file=/data/mysql/30365/logs/slow_query.log  
socket=/data/mysql/30365/mysql.sock
character-set-filesystem = utf8
default-time-zone = '+8:00' 
log_timestamps='system'

general_log=OFF
innodb_autoinc_lock_mode=2
slow_query_log=1
binlog_format=ROW
binlog_cache_size = 1M
max_binlog_size=128M
# binlog最大保留天数
expire_logs_days=30
long_query_time =2
log-queries-not-using-indexes=0
back_log=500
sql_mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
lower_case_table_names=1
transaction_isolation=READ-COMMITTED
event_scheduler=on 
enforce_gtid_consistency=on
log_slave_updates=1
gtid_mode=ON
#skip-name-resolve=1

default_storage_engine=innodb
innodb_flush_method=O_DIRECT
innodb_buffer_pool_size=2G
innodb_buffer_pool_instances=1
innodb_max_dirty_pages_pct=75
innodb_log_buffer_size=2M
innodb_log_file_size =1024M
innodb_log_files_in_group=2
innodb_autoextend_increment=128
innodb_flush_log_at_trx_commit=2
innodb_open_files=10000
innodb_read_io_threads=2
innodb_write_io_threads=2


#connection limit has been reached
max_connections=1000
max_connect_errors=1200
open_files_limit=65535
table_open_cache = 400
table_definition_cache=400
performance_schema_max_table_instances=512
tmp_table_size = 128M
thread_cache_size = 128

#Set the query cache
query_cache_size = 0
query_cache_type = 0

max_heap_table_size= 128M
max_allowed_packet = 16M
group_concat_max_len = 999999999999

# buffer size
key_buffer_size = 256M
read_buffer_size = 1M
sort_buffer_size = 1M
join_buffer_size = 1M
read_rnd_buffer_size=1M
sync_binlog=15

[mysqld_safe]
log-error=/data/mysql/30365/logs/mysqld.log
malloc-lib=/usr/lib64/libjemalloc.so.1
EOF

```

##### 192.168.60.71,192.168.60.72,192.168.60.73 sum.cnf 配置

```
rm -rf /data/mysql/30365/etc/sum.cnf
cat > /data/mysql/30365/etc/sum.cnf << EOF
!include /data/mysql/30365/etc/my.cnf
!include /data/mysql/30365/etc/wsrep.cnf
EOF
```

##### 192.168.60.71 wsrep.cnf 配置 

```
rm -rf /data/mysql/30365/etc/wsrep.cnf
cat > /data/mysql/30365/etc/wsrep.cnf << EOF
# 30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port
[mysqld]
server-id=71
wsrep_slave_threads=2


wsrep_cluster_name="idn_galera_cluster02"
wsrep_provider=/usr/local/mysql/pxc5.7.27/lib/libgalera_smm.so
wsrep_cluster_address='gcomm://192.168.60.71:5567,192.168.60.72:5567,192.168.60.73:5567'  

wsrep_node_name=pxc-71
wsrep_node_incoming_address=192.168.60.71:30365 
wsrep_node_address=192.168.60.71:30365 #mysqld

wsrep_sst_receive_address=192.168.60.71:5555 #SST
wsrep_provider_options = "gmcast.listen_addr=tcp://192.168.60.71:5567;ist.recv_addr=192.168.60.71:5568;gcache.size=512M;gcs.fc_limit=1024;" 

#wsrep sst
wsrep_sst_method=xtrabackup-v2
wsrep_sst_auth=sstuser:Hhwy@sst2021
pxc_strict_mode = PERMISSIVE
EOF
```
##### 192.168.60.72 wsrep.cnf 配置 

```
rm -rf /data/mysql/30365/etc/wsrep.cnf
cat > /data/mysql/30365/etc/wsrep.cnf << EOF
# 30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port
[mysqld]
server-id=72
wsrep_slave_threads=2


wsrep_cluster_name="idn_galera_cluster02"
wsrep_provider=/usr/local/mysql/pxc5.7.27/lib/libgalera_smm.so
wsrep_cluster_address='gcomm://192.168.60.71:5567,192.168.60.72:5567,192.168.60.73:5567'  

wsrep_node_name=pxc-72
wsrep_node_incoming_address=192.168.60.72:30365 
wsrep_node_address=192.168.60.72:30365 #mysqld

wsrep_sst_receive_address=192.168.60.72:5555 #SST
wsrep_provider_options = "gmcast.listen_addr=tcp://192.168.60.72:5567;ist.recv_addr=192.168.60.72:5568;gcache.size=512M;gcs.fc_limit=1024;" 

#wsrep sst
wsrep_sst_method=xtrabackup-v2
wsrep_sst_auth=sstuser:Hhwy@sst2021
pxc_strict_mode = PERMISSIVE
EOF
```

##### 192.168.60.73 wsrep.cnf 配置 

```
rm -rf /data/mysql/30365/etc/wsrep.cnf
cat > /data/mysql/30365/etc/wsrep.cnf << EOF
# 30365 for mysqld port, 5555 for sst port, 5568 for ist port, 5567 for cluster communication port
[mysqld]
server-id=73
wsrep_slave_threads=2


wsrep_cluster_name="idn_galera_cluster02"
wsrep_provider=/usr/local/mysql/pxc5.7.27/lib/libgalera_smm.so
wsrep_cluster_address='gcomm://192.168.60.71:5567,192.168.60.72:5567,192.168.60.73:5567'  

wsrep_node_name=pxc-73
wsrep_node_incoming_address=192.168.60.73:30365 
wsrep_node_address=192.168.60.73:30365 #mysqld

wsrep_sst_receive_address=192.168.60.73:5555 #SST
wsrep_provider_options = "gmcast.listen_addr=tcp://192.168.60.73:5567;ist.recv_addr=192.168.60.73:5568;gcache.size=512M;gcs.fc_limit=1024;" 

#wsrep sst
wsrep_sst_method=xtrabackup-v2
wsrep_sst_auth=sstuser:Hhwy@sst2021
pxc_strict_mode = PERMISSIVE
EOF
```
##### 目录授权
```
chown -R mysql:mysql /data/mysql/30365
```


#### 启动第一个节点192.168.60.71

```

初始化第一个节点
/usr/local/mysql/pxc5.7.27/bin/mysqld --defaults-file=/data/mysql/30365/etc/my.cnf --initialize
```

```
脚本启动第一个节点
/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/my.cnf start
```

```
查看密码(下一步登录需要)
cat /data/mysql/30365/logs/mysqld.log |grep password
```

```
 登陆节点
mysql -u root -h 127.0.0.1 -P 30365 -p'h*rJ6<hK9a?R'
```
```
修改密码、创建用户
alter user user() identified by 'Hhwy@admin2021';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'Hhwy@admin2021' WITH GRANT OPTION; 
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'Hhwy@admin2021' WITH GRANT OPTION; 
GRANT ALL PRIVILEGES ON *.* TO 'sstuser'@'%' IDENTIFIED BY 'Hhwy@sst2021' WITH GRANT OPTION; 
GRANT ALL PRIVILEGES ON *.* TO 'sstuser'@'localhost' IDENTIFIED BY 'Hhwy@sst2021' WITH GRANT OPTION; 
GRANT ALL PRIVILEGES ON *.* TO 'pmm'@'%' IDENTIFIED BY 'Hhwy@pmm2021' WITH GRANT OPTION; 
GRANT ALL PRIVILEGES ON *.* TO 'pmm'@'localhost' IDENTIFIED BY 'Hhwy@pmm2021' WITH GRANT OPTION; 
flush privileges;
```

##### 开启防火墙(所有节点)

```
firewall-cmd --zone=public --add-port=30365/tcp --permanent 
firewall-cmd --zone=public --add-port=5567/tcp --permanent 
firewall-cmd --zone=public --add-port=5568/tcp --permanent 
firewall-cmd --zone=public --add-port=5555/tcp --permanent 
firewall-cmd --reload

```
#### 关闭单节点服务192.168.60.71

```
/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/my.cnf stop
```
#### 自举启动集群第一个节点192.168.60.71
```
/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/sum.cnf bootstrap-pxc
```
#### 启动集群第二个节点192.168.60.72
```
/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/sum.cnf start
```
#### 启动集群第三个节点192.168.60.73
```
/usr/local/mysql/pxc5.7.27/mysql.server.sh --defaults-file=/data/mysql/30365/etc/sum.cnf start
```
