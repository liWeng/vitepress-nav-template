import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav/' },
  { text: '前端',
    items: [
      {
        items: [
          { text: "summer-Vue组件库", link: "/articles/assembly/main-summer.md" },
          { text: "market-Vue组件库", link: "/articles/assembly/main-market.md" },
        ],
      },
      {
        items: [
          { text: "Item B1", link: "/item-B1" },
          { text: "Item B2", link: "/item-B2" },
        ],
      },
    ],
  },
  {
    text: '后端',
    link: ''
  },
  { text: '规范',
    items: [
      {
        items: [
          { text: "前端规范", link: "/articles/norm/开发规范-前端.md" },
          { text: "静态资源引用", link: "/articles/norm/开发规范-静态资源引用.md" },
        ],
      },
      {
        items: [
          { text: "开发规范-数据库", link: "/articles/norm/开发规范-数据库.md" },
          { text: "MYSQL-执行计划", link: "/articles/norm/MYSQL-SQL执行计划详解.md" },
          { text: "MYSQL-数据库优化", link: "/articles/norm/MYSQL-数据库优化.md" },
        ],
      },
      {
        items: [
          { text: "开发规范-工程及依赖", link: "/articles/norm/开发规范-工程及依赖.md" },
          { text: "开发规范-java", link: "/articles/norm/开发规范-java.md" },
          { text: "代码管理规范", link: "/articles/norm/代码管理规范.md" },
        ],
      },
      {
        items: [
          { text: "工程创建说明", link: "/articles/norm/工程创建说明.md" },
          { text: "更新日志规范格式", link: "/articles/norm/更新日志规范格式.md" },
        ],
      },
    ],
  },
  { text: '部署',
    items: [
      {
        items: [
          { text: "服务器-系统安装", link: "/articles/deploy/服务器-系统安装.md" },
          { text: "服务器-系统优化", link: "/articles/deploy/服务器-系统优化.md" },
          { text: "centos-网卡设置", link: "/articles/deploy/centos-网卡设置.md" },
        ],
      },
      {
        items: [
          { text: "docker", link: "/articles/deploy/docker安装.md" },
        ],
      },
      {
        items: [
          { text: "中间件-ES", link: "/articles/deploy/中间件-ES-集群安装.md" },
        ],
      },
      {
        items: [
          { text: "ftp", link: "/articles/deploy/Linux 搭建ftp.md" },
        ],
      },
      {
        items: [
          { text: "中间件-tomcat镜像使用", link: "/articles/deploy/中间件-tomcat镜像使用.md" },
        ],
      },
      {
        items: [
          { text: "中间件-zookeeper-单点安装", link: "/articles/deploy/中间件-zookeeper-单点安装" },
        ],
      },
      {
        items: [
          { text: "中间件-zookeeper-集群安装", link: "/articles/deploy/中间件-zookeeper-集群安装.md" },
        ],
      },
      {
        items: [
          { text: "keepalived-高可用-安装", link: "/articles/deploy/keepalived-高可用-安装.md" },
          { text: "keepalive配置", link: "/articles/deploy/keepalive配置.md" },
        ],
      },
      {
        items: [
          { text: "负载均衡-haproxy", link: "/articles/deploy/负载均衡-haproxy.md" },
        ],
      },
      {
        items: [
          { text: "负载均衡-nginx安装", link: "/articles/deploy/负载均衡-nginx安装.md" },
        ],
      },
      {
        items: [
          { text: "NFS安装", link: "/articles/deploy/NFS安装.md" },
        ],
      },
      {
        items: [
          { text: "redis-单点", link: "/articles/deploy/中间件-redis-单点安装.md" },
          { text: "redis集群安装-哨兵模式", link: "/articles/deploy/中间件-redis集群安装-哨兵模式.md" },
          { text: "redis集群安装-哨兵模式-new", link: "/articles/deploy/redis集群部署 - 哨兵模式-new.md" },
        ],
      },
      {
        items: [
          { text: "数据库-mongodb-单点", link: "/articles/deploy/数据库-mongodb单点安装.md" },
          { text: "数据库-mongodb副本集-分片安装", link: "/articles/deploy/数据库-mongodb副本集-分片安装.md" },
          { text: "数据库-mongodb副本集-仲裁安装", link: "/articles/deploy/数据库-mongodb副本集-仲裁安装.md" },
        ],
      },
    ]
  },
  {
    text: '日常',
    link: 'https://github.com/maomao1996/tampermonkey-scripts'
  },
  {
    text: '工具',
    link: 'https://github.com/maomao1996/tampermonkey-scripts'
  }
]
