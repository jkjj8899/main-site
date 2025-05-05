import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '七点科技 · 产品中枢',
  description: '用 GitHub 驱动的产品管理系统',

  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '技术介绍', link: '/guide/tech.html' },
      { text: '背景说明', link: '/guide/background.html' },
      { text: '技能能力', link: '/guide/skills.html' },
    ],
    sidebar: false
  }),

  dest: 'dist'
})

