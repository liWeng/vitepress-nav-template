import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  "/markdown/": [
    {
      text: "前端组件库",
      collapsed:true,
      items: [
        {
          text: "summer-Vue组件库",
          link: "/markdown/main-summer.md",
        },
        {
          text: "market-Vue组件库",
          link: "/markdown/main-market.md",
        }
      ],
    },
    {
      text: "vue教程",
      items: [
        {
          text: "pina和vuex",
          link: "/markdown/pina和vuex",
        },
      ],
    },
  ],
}
