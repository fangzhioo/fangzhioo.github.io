import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav/', activeMatch: '^/nav' },
  {
    text: '前端',
    items: [
      { text: 'JavaScript 基础知识', link: '/fe/javascript/types' },
      { text: 'HTML/CSS 理论知识点', link: '/fe/html/basic' },
      { text: '浏览器相关知识', link: '/fe/browser/' },
      { text: '源码阅读', link: '/fe/sourcecode/utils/only-allow' }
    ],
    activeMatch: '^/fe'
  },
  {
    text: '效率',
    items: [
      {
        text: '常用工具/方法',
        items: [
          { text: '工具库整理', link: '/workflow/utils/library' },
          { text: '常用正则整理', link: '/workflow/utils/regexp' },
          { text: '常用方法整理', link: '/workflow/utils/function' }
        ]
      },
      {
        text: 'CSS 相关',
        items: [
          { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
          { text: 'Sass 常用技巧', link: '/workflow/sass/' }
        ]
      },
      {
        text: 'Vue 小技巧',
        link: '/workflow/vue/'
      },
      { text: 'npm 常用命令', link: '/workflow/node/npm' },
      // {
      //   text: '终端相关',
      //   items: [
      { text: 'Zsh 配置', link: '/workflow/terminal/zsh' },
      { text: '命令行工具', link: '/workflow/terminal/toolkit' },
      { text: 'Shell 命令', link: '/workflow/terminal/shell' },
      //   ]
      // },
      { text: 'Git 相关技巧', link: '/workflow/git/' },
      { text: 'Git 命令清单', link: '/workflow/git/command' }
    ],
    activeMatch: '^/workflow'
  },
  { text: '踩坑', link: '/pit/npm', activeMatch: '^/pit' },
  {
    text: '工具',
    items: [
      {
        text: '软件推荐与配置',
        items: [
          { text: '多平台软件', link: '/efficiency/software/cross-platform' },
          { text: 'Mac 平台', link: '/efficiency/software/mac' },
          { text: 'Windows 平台', link: '/efficiency/software/windows' },
          { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
          { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' }
        ]
      },
      { text: '在线工具', link: '/efficiency/online-tools' },
      { text: '书签脚本', link: '/efficiency/bookmark-scripts' }
    ],
    activeMatch: '^/efficiency'
  },
  { text: '关于', link: '/about/', activeMatch: '^/about' }
]
