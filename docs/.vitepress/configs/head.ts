import type { HeadConfig } from 'vitepress'

const isDevelopment = process.env.NODE_ENV === 'development'

export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#3eaf7c' }],
  ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
  ['script', { async: 'true', src: isDevelopment ? '' : '//hm.baidu.com/hm.js?dce5d892b228cc0a253520da429e7f11' }],
  ['script', { async: 'true', src: '//www.googletagmanager.com/gtag/js?id=UA-138588101-1' }],
  [
    'script',
    {},
    `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-138588101-1');
    `
  ],
  ['script', { async: 'true', src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3409699730406381', crossorigin: 'anonymous' }]
]
