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
    items: [
      {
        items: [
          { text: "MySqlProcessList状态详解", link: "/articles/performance/MySqlProcessList状态详解.md" },
          { text: "性能排查方案", link: "/articles/performance/性能排查方案.md" },
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
          { text: "服务器相关", link: "/articles/deploy/服务器-系统安装.md" },
          { text: "中间件相关", link: "/articles/deploy/中间件-zookeeper-单点安装" },
          { text: "高可用相关", link: "/articles/deploy/keepalived-高可用-安装.md" }
        ],
      },
      {
        items: [
          { text: "持续集成-jenkins安装", link: "/articles/deploy/持续集成-jenkins安装.md" },
        ],
      },
      {
        items: [
          { text: "日志收集-elk服务安装", link: "/articles/deploy/日志收集-elk服务安装.md" },
          { text: "日志收集-filebeat客户端安装", link: "/articles/deploy/日志收集-filebeat客户端安装.md" },
        ],
      },
      {
        items: [
          { text: "消息队列-kafka单点安装", link: "/articles/deploy/消息队列-kafka单点安装.md" },
          { text: "消息队列-kafka集群安装", link: "/articles/deploy/消息队列-kafka集群安装.md" },
        ],
      },
      {
        items: [
          { text: "数据库", link: "/articles/deploy/数据库-PXC5.7单节点安装.md" },
          { text: "redis集群安装-哨兵模式", link: "/articles/deploy/中间件-redis集群安装-哨兵模式.md" },
          { text: "数据库-mongodb副本集-分片安装", link: "/articles/deploy/数据库-mongodb副本集-分片安装.md" },
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
