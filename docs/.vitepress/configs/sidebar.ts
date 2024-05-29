import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript 基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types' },
        { text: '原型和原型链', link: '/fe/javascript/prototype' },
        { text: 'Window对象', link: '/fe/javascript/window' },
        { text: 'ES6', link: '/fe/javascript/es6' },
        { text: 'TypeScript', link: '/fe/javascript/typescript' }
      ]
    },
    {
      text: 'HTML / CSS',
      collapsed: false,
      items: [
        { text: 'HTML 理论知识点', link: '/fe/html/basic' },
        { text: 'CSS 理论知识点', link: '/fe/css/basic' }
      ]
    },
    {
      text: 'Vue 相关',
      collapsed: false,
      items: [
        { text: 'Setup', link: '/fe/vue/composition-setup' },
        { text: 'Reactivity APIs', link: '/fe/vue/composition-reactivity-apis' }
      ]
    },
    {
      text: 'React 相关',
      collapsed: false,
      items: [{ text: 'React.js 小书', link: '/fe/react-books/post-1' }]
    },
    {
      text: '浏览器与网络',
      collapsed: false,
      items: [
        { text: '浏览器相关知识点', link: '/fe/browser/' },
        { text: 'TCP', link: '/fe/network/tcp' },
        { text: 'HTTP', link: '/fe/network/http' }
      ]
    },
    {
      text: '概念知识点',
      collapsed: false,
      items: [
        { text: '模块化', link: '/fe/concept/module' },
        { text: '前端页面渲染方式', link: '/fe/concept/page-rendering' },
        { text: '防抖和节流', link: '/fe/concept/debounce-throttle' }
      ]
    },
    {
      text: '编程题',
      link: '/fe/coding/'
    },
    {
      text: '源码阅读',
      collapsed: false,
      items: [
        { text: 'only-allow', link: '/fe/sourcecode/utils/only-allow' },
        { text: 'clsx', link: '/fe/sourcecode/utils/clsx' }
      ]
    }
  ],
  '/workflow/': [
    {
      text: '常用工具/方法',
      collapsed: false,
      items: [
        { text: '工具库整理', link: '/workflow/utils/library' },
        { text: '常用正则整理', link: '/workflow/utils/regexp' },
        { text: '常用方法整理', link: '/workflow/utils/function' }
      ]
    },
    {
      text: 'CSS 相关',
      collapsed: false,
      items: [
        { text: 'CSS 语法', link: '/workflow/css/spec' },
        { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
        { text: 'Sass 常用技巧', link: '/workflow/sass/' }
      ]
    },
    {
      text: 'Vue 相关',
      link: '/workflow/vue/'
    },
    {
      text: 'Node 相关',
      // collapsed: false,
      items: [{ text: 'npm 常用命令', link: '/workflow/node/npm' }]
    },
    {
      text: '终端相关',
      collapsed: false,
      items: [
        { text: 'Zsh 配置', link: '/workflow/terminal/zsh' },
        { text: '命令行工具', link: '/workflow/terminal/toolkit' },
        { text: 'Shell 命令', link: '/workflow/terminal/shell' }
      ]
    },
    {
      text: 'Git 相关',
      collapsed: false,
      items: [
        { text: 'Git 相关技巧', link: '/workflow/git/' },
        { text: 'Git 命令清单', link: '/workflow/git/command' }
      ]
    }
  ],
  '/efficiency/': [
    {
      text: '软件推荐与配置',
      // collapsed: false,
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
  '/pit/': [
    {
      text: '踩坑记录',
      // collapsed: false,
      items: [
        { text: 'NPM 踩坑记录', link: '/pit/npm' },
        { text: 'PC 踩坑记录', link: '/pit/pc' },
        { text: 'H5 踩坑记录', link: '/pit/h5' },
        { text: '分享一个项目的选型', link: '/pit/web-share' }
      ]
    }
  ]
}
