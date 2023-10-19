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
}
