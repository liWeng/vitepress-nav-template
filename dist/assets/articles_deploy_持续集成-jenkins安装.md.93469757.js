import{_ as s,o as n,c as a,a as e}from"./app.4690b2e6.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"jenkins 安装","slug":"jenkins-安装","link":"#jenkins-安装","children":[]},{"level":3,"title":"软件介绍","slug":"软件介绍","link":"#软件介绍","children":[]},{"level":3,"title":"编写人员","slug":"编写人员","link":"#编写人员","children":[]},{"level":3,"title":"安装过程:","slug":"安装过程","link":"#安装过程","children":[]}],"relativePath":"articles/deploy/持续集成-jenkins安装.md","lastUpdated":1697780285000}'),l={name:"articles/deploy/持续集成-jenkins安装.md"},p=e(`<h3 id="jenkins-安装" tabindex="-1">jenkins 安装 <a class="header-anchor" href="#jenkins-安装" aria-hidden="true">#</a></h3><h3 id="软件介绍" tabindex="-1">软件介绍 <a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a></h3><p>Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。</p><h3 id="编写人员" tabindex="-1">编写人员 <a class="header-anchor" href="#编写人员" aria-hidden="true">#</a></h3><h4 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-hidden="true">#</a></h4><h3 id="安装过程" tabindex="-1">安装过程: <a class="header-anchor" href="#安装过程" aria-hidden="true">#</a></h3><h4 id="下载镜像" tabindex="-1">下载镜像 <a class="header-anchor" href="#下载镜像" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">docker pull docker.io/jenkins/jenkins</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h4><h4 id="编写docker-compose-文件" tabindex="-1">编写docker-compose 文件 <a class="header-anchor" href="#编写docker-compose-文件" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /usr/docker/jenkins</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">cd /usr/docker/jenkins</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">chown -R 1000:1000 /data/jenkins/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">cat &gt;&gt; /usr/docker/jenkins/docker-compose.yml   &lt;&lt;  EOF</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: &quot;docker.io/jenkins/jenkins&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    privileged: true</span></span>
<span class="line"><span style="color:#A6ACCD;">    expose:</span></span>
<span class="line"><span style="color:#A6ACCD;">        - 8080</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">        - &quot;8080:8080&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">        - /etc/localtime:/etc/localtime</span></span>
<span class="line"><span style="color:#A6ACCD;">        - /data/jenkins/home:/var/jenkins_home</span></span>
<span class="line"><span style="color:#A6ACCD;">     environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">        JENKINS_OPTS: &quot;--prefix=/jenkins&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="opts" tabindex="-1">OPTS <a class="header-anchor" href="#opts" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">--prefix=/jenkins  是请求jenkins 的context</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">docker-compose up -d</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="查看日志-会出现初始密码-访问页面后可以进行登录配置" tabindex="-1">查看日志,会出现初始密码，访问页面后可以进行登录配置 <a class="header-anchor" href="#查看日志-会出现初始密码-访问页面后可以进行登录配置" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">jenkins_1  | 2020-05-15 05:44:40.923+0000 [id=38]	INFO	o.s.b.f.s.DefaultListableBeanFactory#preInstantiateSingletons: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@26a32f33: defining beans [filter,legacy]; root of factory hierarchy</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | 2020-05-15 05:44:41.249+0000 [id=38]	INFO	jenkins.install.SetupWizard#init: </span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | </span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | *************************************************************</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | *************************************************************</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | *************************************************************</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | </span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | Jenkins initial setup is required. An admin user has been created and a password generated.</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | Please use the following password to proceed to installation:</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | </span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | 974996fa0f654aba9716684b894a67b8</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | </span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | This may also be found at: /var/jenkins_home/secrets/initialAdminPassword</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | </span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | *************************************************************</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | *************************************************************</span></span>
<span class="line"><span style="color:#A6ACCD;">jenkins_1  | *************************************************************</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="启动后先进行插件下载地址替换-否则下载很慢" tabindex="-1">启动后先进行插件下载地址替换，否则下载很慢 <a class="header-anchor" href="#启动后先进行插件下载地址替换-否则下载很慢" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">找到这个文件，用文本编辑工具打开</span></span>
<span class="line"><span style="color:#A6ACCD;">/data/jenkins/home/updates/defaults.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">替换检测URL: http://www.google.com/    为  https://www.baidu.com/</span></span>
<span class="line"><span style="color:#A6ACCD;">替换下载URL: http://updates.jenkins-ci.org/download/  为  https://mirrors.tuna.tsinghua.edu.cn/jenkins/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="替换后放回原处-下载插件非常快" tabindex="-1">替换后放回原处，下载插件非常快 <a class="header-anchor" href="#替换后放回原处-下载插件非常快" aria-hidden="true">#</a></h4><h4 id="访问8080端口-输入密码" tabindex="-1">访问8080端口，输入密码 <a class="header-anchor" href="#访问8080端口-输入密码" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">974996fa0f654aba9716684b894a67b8</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="安装社区推荐的插件" tabindex="-1">安装社区推荐的插件 <a class="header-anchor" href="#安装社区推荐的插件" aria-hidden="true">#</a></h4><h4 id="安装完成插件后-提示创建第一个用户-此用户为管理员" tabindex="-1">安装完成插件后，提示创建第一个用户，此用户为管理员 <a class="header-anchor" href="#安装完成插件后-提示创建第一个用户-此用户为管理员" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">admin </span></span>
<span class="line"><span style="color:#A6ACCD;">admin@hhwy</span></span>
<span class="line"><span style="color:#A6ACCD;">hhwy</span></span>
<span class="line"><span style="color:#A6ACCD;">jialx@ieforevcer.com</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="提示设置url-可以暂时跳过" tabindex="-1">提示设置URL 可以暂时跳过 <a class="header-anchor" href="#提示设置url-可以暂时跳过" aria-hidden="true">#</a></h4><h4 id="添加配置maven" tabindex="-1">添加配置maven <a class="header-anchor" href="#添加配置maven" aria-hidden="true">#</a></h4><h5 id="创建maven-目录" tabindex="-1">创建maven 目录 <a class="header-anchor" href="#创建maven-目录" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir -p /data/jenkins/home/maven/repo</span></span>
<span class="line"><span style="color:#A6ACCD;">chown -R 1000:1000 /data/jenkins/home/maven</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="下载maven-插件到-data-jenkins-home-maven" tabindex="-1">下载maven 插件到 /data/jenkins/home/maven <a class="header-anchor" href="#下载maven-插件到-data-jenkins-home-maven" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">cd /data/jenkins/home/maven</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://yth.365grid.cn/static/download/apache-maven-3.0.4.zip</span></span>
<span class="line"><span style="color:#A6ACCD;">unzip apache-maven-3.0.4.zip</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf apache-maven-3.0.4.zip</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="修改maven-配置文件-位置是相对容器内部的地址" tabindex="-1">修改maven 配置文件,位置是相对容器内部的地址 <a class="header-anchor" href="#修改maven-配置文件-位置是相对容器内部的地址" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;localRepository&gt; /var/jenkins_home/maven/repo/ &lt;/localRepository&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="修改全局setting文件路径" tabindex="-1">修改全局setting文件路径 <a class="header-anchor" href="#修改全局setting文件路径" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">全局工具配置 下 配置maven setting配置文件，选择文件系统中的配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">配置文件路径为 /var/jenkins_home/maven/apache-maven-3.0.4/conf/settings.xml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="下载插件-安装后重启" tabindex="-1">下载插件,安装后重启 <a class="header-anchor" href="#下载插件-安装后重启" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">插件中选择 Pipeline Maven Integration 并安装</span></span>
<span class="line"><span style="color:#A6ACCD;">插件中选择 Git Parameter 并安装</span></span>
<span class="line"><span style="color:#A6ACCD;">插件中选择 SSH Pipeline Steps 并安装</span></span>
<span class="line"><span style="color:#A6ACCD;">插件中选择 Locale 并安装</span></span>
<span class="line"><span style="color:#A6ACCD;">插件中选择 Role-based Authorization Strategy 并安装</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">chown -R 1000:1000 /data/jenkins/home/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="配置角色和用户" tabindex="-1">配置角色和用户 <a class="header-anchor" href="#配置角色和用户" aria-hidden="true">#</a></h4><ul><li>0.确定 Role-based Authorization Strategy 插件已经安装</li><li>1.系统管理-&gt;全局安全配置，将授权策略修改为Role-Based Strategy</li><li>2.系统管理-&gt;Manage and Assign Roles</li><li>3.点击Manage Roles, 添加Item roles（项目角色）</li><li>Pattern匹配的是任务名称，我是每个任务单独管理权限，所以Pattern直接写上项目名称即可，注意（）符号需要转移</li><li>如果要匹配 Fabu-uu-api-test 项目，正则是Fabu.<em>.test 而不是 Fabu</em>test，记住前后俩个点。同样过滤TEST开头的jobs，要写成TEST.<em>而不是TEST</em>，切记。</li><li>4.在Assign Roles中分配工程权限即可。</li></ul><h5 id="角色类型" tabindex="-1">角色类型 <a class="header-anchor" href="#角色类型" aria-hidden="true">#</a></h5><ul><li>Global roles（全局角色）：管理员等高级用户可以创建基于全局的角色</li><li>Item roles（项目角色）：针对某个或者某些项目的角色</li><li>Node roles（节点角色）：节点相关的权限</li></ul><h5 id="自动构建脚本-流水线" tabindex="-1">自动构建脚本（流水线） <a class="header-anchor" href="#自动构建脚本-流水线" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">#!Groovy</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.util.*;</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.text.SimpleDateFormat;</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.util.Date;  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/*-------------------------------------------------------------</span></span>
<span class="line"><span style="color:#A6ACCD;">    此脚本如无特殊情况只需修改以下变量即可，</span></span>
<span class="line"><span style="color:#A6ACCD;">-------------------------------------------------------------*/</span></span>
<span class="line"><span style="color:#A6ACCD;">/*git：下拉代码*/</span></span>
<span class="line"><span style="color:#A6ACCD;">def gitPath=&quot;替换自己地址&quot;;//git地址</span></span>
<span class="line"><span style="color:#A6ACCD;">def gitBranches=&quot;origin/master&quot;;//下拉分支，根据具体构建分支填写</span></span>
<span class="line"><span style="color:#A6ACCD;">// def gitBranches=选择标签;//下拉标签(生产环境为选择标签)，选择标签是参数构建的参数名，需要对应上</span></span>
<span class="line"><span style="color:#A6ACCD;">def gitCredentialsId=&quot;jenkins中配置的凭据id&quot;;//用户名密码ID</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/*上传：jar包或war包的相对当前目录位置（不包括当前目录(工程)名），将从此位置复制包到上传主机</span></span>
<span class="line"><span style="color:#A6ACCD;">  上传目标主机，需要用主机IP为ID创建 credentialsId（凭证），上传时将用IP查询对应的用户名和密码</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">def fromWarName=&quot;构建后的包名称&quot;  //工程构建后为 epmp-sichuan.war   实际使用 epmp.war</span></span>
<span class="line"><span style="color:#A6ACCD;">def toWarName=&quot;实际使用的包名称&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">def buildPom=&quot;pom.xml&quot;  //使用哪个maven配置文件构建</span></span>
<span class="line"><span style="color:#A6ACCD;">def uploadFrom=&quot;/epmp/target/&quot;+fromWarName;  </span></span>
<span class="line"><span style="color:#A6ACCD;">def uploadHost=&quot;10.0.1.99&quot;;    // 上传目标主机</span></span>
<span class="line"><span style="color:#A6ACCD;">def uploadUser=&quot;jenkins中配置的凭据id&quot;;    // 上传目标主机用户</span></span>
<span class="line"><span style="color:#A6ACCD;">def uploadPath=&quot;/data/*填写实际试用地址**/epmp-sichuan/war/&quot;;//上传到的位置,填写实际试用地址</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/*重启：需要用主机IP为ID创建   credentialsId（凭证），执行命令时将用IP查询对应的用户名和密码*/</span></span>
<span class="line"><span style="color:#A6ACCD;">def restartHost=&quot;10.0.1.41&quot;;  //主机</span></span>
<span class="line"><span style="color:#A6ACCD;">def restartUser=&quot;jenkins中配置的凭据id&quot;;  //主机用户</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">	实际执行yaml名称、文件路径 以项目配置为主</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">def restartStopCommand=&quot;/usr/local/kubernetes/bin/kubectl delete -f /home/psd/psd-release-sdjt/yamls/epmp-sichuan-deployment.yaml&quot;;//停止</span></span>
<span class="line"><span style="color:#A6ACCD;">def restartStartCommand=&quot;/usr/local/kubernetes/bin/kubectl create -f /home/psd/psd-release-sdjt/yamls/epmp-sichuan-deployment.yaml&quot;;//启动</span></span>
<span class="line"><span style="color:#A6ACCD;">//-----------------------------以下系统变量如果不一致可修改  ------------------------------------</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">def mavenHome=&quot;/var/jenkins_home/maven/apache-maven-3.6.3/&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">//-----------------------------构建逻辑脚本,非特殊情况请勿修改------------------------------------</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">def today()</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    String str = &quot;&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    SimpleDateFormat sdf = new SimpleDateFormat(&quot;yyyyMMddHHmmss&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    str = sdf.format(new Date());</span></span>
<span class="line"><span style="color:#A6ACCD;">    return str;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">node {</span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;拉取代码&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        sh &#39;git config --global http.sslVerify false&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        checkout([</span></span>
<span class="line"><span style="color:#A6ACCD;">                $class                           : &#39;GitSCM&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                branches                         : [[name: gitBranches]],</span></span>
<span class="line"><span style="color:#A6ACCD;">                doGenerateSubmoduleConfigurations: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                extensions                       : [],</span></span>
<span class="line"><span style="color:#A6ACCD;">                submoduleCfg                     : [],</span></span>
<span class="line"><span style="color:#A6ACCD;">                userRemoteConfigs                : [[credentialsId:gitCredentialsId,url: gitPath]]</span></span>
<span class="line"><span style="color:#A6ACCD;">        ])</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;编译打包&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    	sh mavenHome+&#39;bin/mvn clean install -e -U -Dmaven.test.skip=true -Dmaven.compile.fork=true -f&#39;+buildPom</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;文件备份&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        def homePath=pwd()  // 程序根目录     </span></span>
<span class="line"><span style="color:#A6ACCD;">        def warPath=uploadPath+toWarName;</span></span>
<span class="line"><span style="color:#A6ACCD;">        withCredentials([usernamePassword(credentialsId: uploadUser, passwordVariable: &#39;password&#39;, usernameVariable: &#39;username&#39;)]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                script {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    def sshServer = [:]</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.name = uploadUser</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.host = uploadHost</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.user = username</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.password = password</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.allowAnyHosts = true</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshCommand remote: sshServer, command: &quot;if [ -f &quot;+warPath+&quot; ] ; then mv &quot;+warPath+&quot; &quot;+uploadPath+&quot;&quot;+toWarName+&quot;&quot;+today()+&quot;; fi &quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;删除文件&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        def homePath=pwd()  // 程序根目录     </span></span>
<span class="line"><span style="color:#A6ACCD;">        def fileFullPath=homePath+uploadFrom;</span></span>
<span class="line"><span style="color:#A6ACCD;">        withCredentials([usernamePassword(credentialsId: uploadUser, passwordVariable: &#39;password&#39;, usernameVariable: &#39;username&#39;)]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                script {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    def sshServer = [:]</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.name = uploadUser</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.host = uploadHost</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.user = username</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.password = password</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.allowAnyHosts = true</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshPut remote: sshServer, from: fileFullPath, into: uploadPath;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sh &quot;echo 删除三天以前文件&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">					sshCommand remote: sshServer, command: &quot;find &quot;+uploadPath+&quot; -mtime +3 -name &#39;&quot; +toWarName+ &quot;*&#39; -exec rm -rf {} \\\\;&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;文件传输&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        def homePath=pwd()  // 程序根目录     </span></span>
<span class="line"><span style="color:#A6ACCD;">        def fileFullPath=homePath+uploadFrom;</span></span>
<span class="line"><span style="color:#A6ACCD;">        withCredentials([usernamePassword(credentialsId: uploadUser, passwordVariable: &#39;password&#39;, usernameVariable: &#39;username&#39;)]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                script {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    def sshServer = [:]</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.name = uploadUser</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.host = uploadHost</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.user = username</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.password = password</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.allowAnyHosts = true</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshPut remote: sshServer, from: fileFullPath, into: uploadPath;</span></span>
<span class="line"><span style="color:#A6ACCD;">		    sshCommand remote: sshServer, command: &quot;mv &quot;+uploadPath+fromWarName+&quot; &quot;+uploadPath+&quot;&quot;+toWarName;</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;重新启动&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        withCredentials([usernamePassword(credentialsId: restartUser, passwordVariable: &#39;password&#39;, usernameVariable: &#39;username&#39;)]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                script {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    def sshServer = [:]</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.name = restartUser</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.host = restartHost</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.user = username</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.password = password</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshServer.allowAnyHosts = true</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshCommand remote: sshServer, command: restartStopCommand;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    sshCommand remote: sshServer, command: restartStartCommand;</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    stage(&#39;结果描述&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        sh &quot;echo 完成&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br></div></div>`,45),r=[p];function i(c,o,t,b,u,d){return n(),a("div",null,r)}const A=s(l,[["render",i]]);export{C as __pageData,A as default};
