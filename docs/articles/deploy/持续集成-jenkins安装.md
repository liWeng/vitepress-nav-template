### jenkins 安装

### 软件介绍

Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。

### 编写人员 



#### 特性

### 安装过程:

#### 下载镜像

```
docker pull docker.io/jenkins/jenkins
```

#### 

#### 编写docker-compose 文件

```
mkdir -p /usr/docker/jenkins

cd /usr/docker/jenkins

chown -R 1000:1000 /data/jenkins/

cat >> /usr/docker/jenkins/docker-compose.yml   <<  EOF
jenkins:
    image: "docker.io/jenkins/jenkins"
    privileged: true
    expose:
        - 8080
    ports:
        - "8080:8080"
    volumes:
        - /etc/localtime:/etc/localtime
        - /data/jenkins/home:/var/jenkins_home
     environment:
        JENKINS_OPTS: "--prefix=/jenkins"
EOF


```

#### OPTS
```
--prefix=/jenkins  是请求jenkins 的context
```

#### 启动

```
docker-compose up -d
```


#### 查看日志,会出现初始密码，访问页面后可以进行登录配置
```
jenkins_1  | 2020-05-15 05:44:40.923+0000 [id=38]	INFO	o.s.b.f.s.DefaultListableBeanFactory#preInstantiateSingletons: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@26a32f33: defining beans [filter,legacy]; root of factory hierarchy
jenkins_1  | 2020-05-15 05:44:41.249+0000 [id=38]	INFO	jenkins.install.SetupWizard#init: 
jenkins_1  | 
jenkins_1  | *************************************************************
jenkins_1  | *************************************************************
jenkins_1  | *************************************************************
jenkins_1  | 
jenkins_1  | Jenkins initial setup is required. An admin user has been created and a password generated.
jenkins_1  | Please use the following password to proceed to installation:
jenkins_1  | 
jenkins_1  | 974996fa0f654aba9716684b894a67b8
jenkins_1  | 
jenkins_1  | This may also be found at: /var/jenkins_home/secrets/initialAdminPassword
jenkins_1  | 
jenkins_1  | *************************************************************
jenkins_1  | *************************************************************
jenkins_1  | *************************************************************

```

#### 启动后先进行插件下载地址替换，否则下载很慢

```
找到这个文件，用文本编辑工具打开
/data/jenkins/home/updates/defaults.json
```

```
替换检测URL: http://www.google.com/    为  https://www.baidu.com/
替换下载URL: http://updates.jenkins-ci.org/download/  为  https://mirrors.tuna.tsinghua.edu.cn/jenkins/
```

#### 替换后放回原处，下载插件非常快

#### 访问8080端口，输入密码

````
974996fa0f654aba9716684b894a67b8
````

#### 安装社区推荐的插件

#### 安装完成插件后，提示创建第一个用户，此用户为管理员
```
admin 
admin@hhwy
hhwy
jialx@ieforevcer.com
```
#### 提示设置URL 可以暂时跳过

#### 添加配置maven

##### 创建maven 目录

```
mkdir -p /data/jenkins/home/maven/repo
chown -R 1000:1000 /data/jenkins/home/maven
``` 
##### 下载maven 插件到 /data/jenkins/home/maven

```
cd /data/jenkins/home/maven
wget http://yth.365grid.cn/static/download/apache-maven-3.0.4.zip
unzip apache-maven-3.0.4.zip
rm -rf apache-maven-3.0.4.zip
```

##### 修改maven 配置文件,位置是相对容器内部的地址
```

<localRepository> /var/jenkins_home/maven/repo/ </localRepository>
```
##### 修改全局setting文件路径
```
全局工具配置 下 配置maven setting配置文件，选择文件系统中的配置文件
配置文件路径为 /var/jenkins_home/maven/apache-maven-3.0.4/conf/settings.xml
```

##### 下载插件,安装后重启
```
插件中选择 Pipeline Maven Integration 并安装
插件中选择 Git Parameter 并安装
插件中选择 SSH Pipeline Steps 并安装
插件中选择 Locale 并安装
插件中选择 Role-based Authorization Strategy 并安装


```

```
chown -R 1000:1000 /data/jenkins/home/
```

#### 配置角色和用户
* 0.确定 Role-based Authorization Strategy 插件已经安装
* 1.系统管理->全局安全配置，将授权策略修改为Role-Based Strategy
* 2.系统管理->Manage and Assign Roles
* 3.点击Manage Roles, 添加Item roles（项目角色）
*   Pattern匹配的是任务名称，我是每个任务单独管理权限，所以Pattern直接写上项目名称即可，注意（）符号需要转移
*   如果要匹配  Fabu-uu-api-test 项目，正则是Fabu.*.test   而不是 Fabu*test，记住前后俩个点。同样过滤TEST开头的jobs，要写成TEST.*而不是TEST*，切记。
* 4.在Assign Roles中分配工程权限即可。

##### 角色类型

* Global roles（全局角色）：管理员等高级用户可以创建基于全局的角色
* Item roles（项目角色）：针对某个或者某些项目的角色
* Node roles（节点角色）：节点相关的权限


##### 自动构建脚本（流水线）
```
#!Groovy
import java.util.*;
import java.text.SimpleDateFormat;
import java.util.Date;  

/*-------------------------------------------------------------
    此脚本如无特殊情况只需修改以下变量即可，
-------------------------------------------------------------*/
/*git：下拉代码*/
def gitPath="替换自己地址";//git地址
def gitBranches="origin/master";//下拉分支，根据具体构建分支填写
// def gitBranches=选择标签;//下拉标签(生产环境为选择标签)，选择标签是参数构建的参数名，需要对应上
def gitCredentialsId="jenkins中配置的凭据id";//用户名密码ID

/*上传：jar包或war包的相对当前目录位置（不包括当前目录(工程)名），将从此位置复制包到上传主机
  上传目标主机，需要用主机IP为ID创建 credentialsId（凭证），上传时将用IP查询对应的用户名和密码
*/
def fromWarName="构建后的包名称"  //工程构建后为 epmp-sichuan.war   实际使用 epmp.war
def toWarName="实际使用的包名称"
def buildPom="pom.xml"  //使用哪个maven配置文件构建
def uploadFrom="/epmp/target/"+fromWarName;  
def uploadHost="10.0.1.99";    // 上传目标主机
def uploadUser="jenkins中配置的凭据id";    // 上传目标主机用户
def uploadPath="/data/*填写实际试用地址**/epmp-sichuan/war/";//上传到的位置,填写实际试用地址

/*重启：需要用主机IP为ID创建   credentialsId（凭证），执行命令时将用IP查询对应的用户名和密码*/
def restartHost="10.0.1.41";  //主机
def restartUser="jenkins中配置的凭据id";  //主机用户

/**
	实际执行yaml名称、文件路径 以项目配置为主
*/
def restartStopCommand="/usr/local/kubernetes/bin/kubectl delete -f /home/psd/psd-release-sdjt/yamls/epmp-sichuan-deployment.yaml";//停止
def restartStartCommand="/usr/local/kubernetes/bin/kubectl create -f /home/psd/psd-release-sdjt/yamls/epmp-sichuan-deployment.yaml";//启动
//-----------------------------以下系统变量如果不一致可修改  ------------------------------------

def mavenHome="/var/jenkins_home/maven/apache-maven-3.6.3/";
//-----------------------------构建逻辑脚本,非特殊情况请勿修改------------------------------------

def today()
{
    String str = "";
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
    str = sdf.format(new Date());
    return str;
}

node {
    stage('拉取代码') {
        
        sh 'git config --global http.sslVerify false'
        
        checkout([
                $class                           : 'GitSCM',
                branches                         : [[name: gitBranches]],
                doGenerateSubmoduleConfigurations: false,
                extensions                       : [],
                submoduleCfg                     : [],
                userRemoteConfigs                : [[credentialsId:gitCredentialsId,url: gitPath]]
        ])
    }

    stage('编译打包') {
    	sh mavenHome+'bin/mvn clean install -e -U -Dmaven.test.skip=true -Dmaven.compile.fork=true -f'+buildPom
    }
    stage('文件备份') {
        def homePath=pwd()  // 程序根目录     
        def warPath=uploadPath+toWarName;
        withCredentials([usernamePassword(credentialsId: uploadUser, passwordVariable: 'password', usernameVariable: 'username')]) {
                script {
                    def sshServer = [:]
                    sshServer.name = uploadUser
                    sshServer.host = uploadHost
                    sshServer.user = username
                    sshServer.password = password
                    sshServer.allowAnyHosts = true
                    sshCommand remote: sshServer, command: "if [ -f "+warPath+" ] ; then mv "+warPath+" "+uploadPath+""+toWarName+""+today()+"; fi "
                }
        }
        
    }
    stage('删除文件') {
        def homePath=pwd()  // 程序根目录     
        def fileFullPath=homePath+uploadFrom;
        withCredentials([usernamePassword(credentialsId: uploadUser, passwordVariable: 'password', usernameVariable: 'username')]) {
                script {
                    def sshServer = [:]
                    sshServer.name = uploadUser
                    sshServer.host = uploadHost
                    sshServer.user = username
                    sshServer.password = password
                    sshServer.allowAnyHosts = true
                    sshPut remote: sshServer, from: fileFullPath, into: uploadPath;
                    sh "echo 删除三天以前文件";
					sshCommand remote: sshServer, command: "find "+uploadPath+" -mtime +3 -name '" +toWarName+ "*' -exec rm -rf {} \\;";
                }
        }
    }
    stage('文件传输') {
        def homePath=pwd()  // 程序根目录     
        def fileFullPath=homePath+uploadFrom;
        withCredentials([usernamePassword(credentialsId: uploadUser, passwordVariable: 'password', usernameVariable: 'username')]) {
                script {
                    def sshServer = [:]
                    sshServer.name = uploadUser
                    sshServer.host = uploadHost
                    sshServer.user = username
                    sshServer.password = password
                    sshServer.allowAnyHosts = true
                    sshPut remote: sshServer, from: fileFullPath, into: uploadPath;
		    sshCommand remote: sshServer, command: "mv "+uploadPath+fromWarName+" "+uploadPath+""+toWarName;
                }
        }
        
    }
    stage('重新启动') {
        withCredentials([usernamePassword(credentialsId: restartUser, passwordVariable: 'password', usernameVariable: 'username')]) {
                script {
                    def sshServer = [:]
                    sshServer.name = restartUser
                    sshServer.host = restartHost
                    sshServer.user = username
                    sshServer.password = password
                    sshServer.allowAnyHosts = true
                    sshCommand remote: sshServer, command: restartStopCommand;
                    sshCommand remote: sshServer, command: restartStartCommand;
                }
        }
    }
    stage('结果描述') {
        sh "echo 完成"
    }
}

```

 
