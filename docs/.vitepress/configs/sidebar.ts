import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  "/articles/assembly/": [
    {
      text: "前端组件库",
      collapsed:false,
      items: [
        {
          text: "summer-Vue组件库",
          link: "/assembly/main-summer.md",
        },
        {
          text: "market-Vue组件库",
          link: "/assembly/main-market.md",
        }
      ],
    },
    {
      text: "vue教程",
      collapsed:false,
      items: [
        {
          text: "pina和vuex",
          link: "/assembly/pina和vuex",
        },
      ],
    },
  ],
  "/articles/norm/": [
    {
      text: '前端',
      collapsed:false,
      items: [
        { text: "前端规范", link: "/articles/norm/开发规范-前端.md" },
        { text: "静态资源引用", link: "/articles/norm/开发规范-静态资源引用.md" }
      ],
    },
    {
      text: '开发规范',
      collapsed:false,
      items: [
        { text: "开发规范-数据库", link: "/articles/norm/开发规范-数据库.md" },
        { text: "开发规范-工程及依赖", link: "/articles/norm/开发规范-工程及依赖.md" },
        { text: "开发规范-java", link: "/articles/norm/开发规范-java.md" },
        { text: "代码管理规范", link: "/articles/norm/代码管理规范.md" },
        { text: "工程创建说明", link: "/articles/norm/工程创建说明.md" },
        { text: "更新日志规范格式", link: "/articles/norm/更新日志规范格式.md" },
      ],
    },
    {
      text: 'MYSQL数据库',
      collapsed:false,
      items: [
        { text: "MYSQL-执行计划", link: "/articles/norm/MYSQL-SQL执行计划详解.md" },
        { text: "MYSQL-数据库优化", link: "/articles/norm/MYSQL-数据库优化.md" },
      ],
    }
  ],
  "/articles/deploy/": [
    {
      text: '系统',
      collapsed:false,
      items: [
        { text: "服务器-系统安装", link: "/articles/deploy/服务器-系统安装.md" },
        { text: "服务器-系统优化", link: "/articles/deploy/服务器-系统优化.md" },
        { text: "centos-网卡设置", link: "/articles/deploy/centos-网卡设置.md" },
      ],
    },
    {
      text: 'docker',
      collapsed:false,
      items: [
        { text: "docker", link: "/articles/deploy/docker安装.md" },
        { text: "中间件-tomcat镜像使用", link: "/articles/deploy/中间件-tomcat镜像使用.md" },
        { text: "持续集成-jenkins安装", link: "/articles/deploy/持续集成-jenkins安装.md" },
      ],
    },
    {
      text: '中间件',
      collapsed:false,
      items: [
        { text: "中间件-zookeeper-单点安装", link: "/articles/deploy/中间件-zookeeper-单点安装" },
        { text: "中间件-zookeeper-集群安装", link: "/articles/deploy/中间件-zookeeper-集群安装.md" },
        { text: "NFS安装", link: "/articles/deploy/NFS安装.md" },
        { text: "中间件-ES", link: "/articles/deploy/中间件-ES-集群安装.md" },
        { text: "ftp", link: "/articles/deploy/Linux 搭建ftp.md" },
        { text: "大数据-spark单点安装", link: "/articles/deploy/大数据-spark单点安装.md" },
        { text: "大数据-spark集群安装", link: "/articles/deploy/大数据-spark集群安装.md" },
      ],
    },
    {
      text: '负载均衡',
      collapsed:false,
      items: [
        { text: "keepalived-高可用-安装", link: "/articles/deploy/keepalived-高可用-安装.md" },
        { text: "keepalive配置", link: "/articles/deploy/keepalive配置.md" },
        { text: "负载均衡-haproxy", link: "/articles/deploy/负载均衡-haproxy.md" },
        { text: "负载均衡-nginx安装", link: "/articles/deploy/负载均衡-nginx安装.md" },
      ],
    },
    {
      text: '日志收集',
      collapsed:false,
      items: [
        { text: "日志收集-elk服务安装", link: "/articles/deploy/日志收集-elk服务安装.md" },
        { text: "日志收集-filebeat客户端安装", link: "/articles/deploy/日志收集-filebeat客户端安装.md" },
      ],
    },
    {
      text: 'kafka',
      collapsed:false,
      items: [
        { text: "消息队列-kafka单点安装", link: "/articles/deploy/消息队列-kafka单点安装.md" },
        { text: "消息队列-kafka集群安装", link: "/articles/deploy/消息队列-kafka集群安装.md" },
      ],
    },
    {
      text: '服务监控',
      collapsed:false,
      items: [
        { text: "服务监控-pmm-client客户端安装", link: "/articles/deploy/服务监控-pmm-client客户端安装.md" },
        { text: "服务监控-pmm-server服务端安装", link: "/articles/deploy/服务监控-pmm-server服务端安装.md" },
      ],
    },
    {
      text: 'mysql数据库',
      collapsed:false,
      items: [
        { text: "数据库-PXC5.7单节点安装", link: "/articles/deploy/数据库-PXC5.7单节点安装.md" },
        { text: "数据库-PXC5.7单节点安装-离线", link: "/articles/deploy/数据库-PXC5.7单节点安装-离线.md" },
        { text: "数据库-PXC8.0单节点安装", link: "/articles/deploy/数据库-PXC8.0单节点安装.md" },
        { text: "数据库-PXC5.7集群安装", link: "/articles/deploy/数据库-PXC5.7集群安装.md" },
      ],
    },
    {
      text: 'redis',
      collapsed:false,
      items: [
        { text: "redis-单点", link: "/articles/deploy/中间件-redis-单点安装.md" },
        { text: "redis集群安装-哨兵模式", link: "/articles/deploy/中间件-redis集群安装-哨兵模式.md" },
        { text: "redis集群安装-哨兵模式-new", link: "/articles/deploy/redis集群部署 - 哨兵模式-new.md" },
      ],
    },
    {
      text: 'mongodb',
      collapsed:false,
      items: [
        { text: "数据库-mongodb-单点", link: "/articles/deploy/数据库-mongodb单点安装.md" },
        { text: "数据库-mongodb副本集-分片安装", link: "/articles/deploy/数据库-mongodb副本集-分片安装.md" },
        { text: "数据库-mongodb副本集-仲裁安装", link: "/articles/deploy/数据库-mongodb副本集-仲裁安装.md" },
      ],
    }
  ],
}
