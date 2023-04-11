import { defineConfigWithTheme } from 'vitepress'
import { TongrenTheme } from './theme/theme-tongren/types/theme-tongren'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<TongrenTheme.Config>({
  title: "Tongren'Blog",
  description: "Blog",
  lastUpdated: true,
  // 资源目录
  srcDir: 'src',
  head: [
    ['script', { async: 'true', src: '//hm.baidu.com/hm.js?dce5d892b228cc0a253520da429e7f11' }],
    ['script', { async: 'true', src: '//www.googletagmanager.com/gtag/js?id=UA-138588101-1' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-138588101-1');
    `],
    ['script', { async: 'true', src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3409699730406381', crossorigin: 'anonymous' }],
  ],  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/pages/blog' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fangzhioo' }
    ],
  }
})
