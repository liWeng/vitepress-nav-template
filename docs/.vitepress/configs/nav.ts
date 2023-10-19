import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav/' },
  { text: '前端',
    items: [
      {
        items: [
          { text: "summer-Vue组件库", link: "/markdown/main-summer.md" },
          { text: "market-Vue组件库", link: "/markdown/main-market.md" },
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
    link: 'https://notes.fe-mm.com'
  },
  { text: '规范', link: 'https://netease-music.fe-mm.com' },
  { text: '部署', link: 'https://netease-music.fe-mm.com' },
  {
    text: '日常',
    link: 'https://github.com/maomao1996/tampermonkey-scripts'
  },
  {
    text: '工具',
    link: 'https://github.com/maomao1996/tampermonkey-scripts'
  }
]
