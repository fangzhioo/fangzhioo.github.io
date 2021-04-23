---
title:      【Vue3-Admin】使用vite2构建vue3项目
subtitle:   使用vite2构建vue3项目
keyword:    vue3, 响应式API, 组合式API, vite2, 基于原生ES模块, 快速开发
date: 2021-04-02 14:08:52
catalog: true
header-img:
tags:
    - Vue3
    - Vite2
categories: 
    - Vue
---

# 前言

首先咱们先看一张图：

<img class="shadow" alt="加载失败！" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a26ab28cab8d45a981986b581ae71d04~tplv-k3u1fbpfcp-zoom-1.image" />
<p class="image-tips">尤大在知乎下的一个回答</p>

那么这个 `vite` 是个神马东东，尤大能这么豪爽的直言，可以干掉 `webpack`。**遇事不决，官方教学**，我们直接打开 [官方网站](https://cn.vitejs.dev/)。

<img class="shadow" alt="加载失败！" src="/img/vue3-admin/vite2-dev.png" />

> Vite (法语意为 "快速的"，发音 /vit/) 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：
> - 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
> - 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可以输出用于生产环境的优化过的静态资源。

好家伙，已经出到 2.x 了，我记得1月份看的时候，还是 1.x 版本。学的速度跟不上尤大写的速度。网友直呼，“求求不要更新了，老子学不动了～～”。

<img class="shadow" alt="加载失败！" src="/img/vue3-admin/vue3-xuebudongle.jpeg" />
<p class="image-tips">2333~</p>

不过最近上手 vite2 后，最直接的上手体验就是 “快”。写起代码来，那叫一个丝滑。话不多说，咱们开干。

# 正文

## 创建项目

> 兼容性注意： vite需要Node.js版本 >= 12.0.0 。

```bash
# npm
npm init @vitejs/app

# yarn
yarn create @vitejs/app

```

然后按照提示一步步操作即可。

<img class="shadow" alt="加载失败！" src="/img/vue3-admin/vue3-admin-vite2-init.png" />
<p class="image-tips">vite2初始化项目</p>

这里我们构建分别选择 vue、TypeScript。

> 这里选择typescript，是因为 vue3.x 完全使用 typescript 重构。所以完美支持 typescript，而且 typescript 也是行业趋势。

做完以上操作，我们将项目run起来，执行以下命令：

```bash
# 进入项目目录
cd vue3-admin
# 安装依赖
npm install
# run
npm run dev
```

```bash
➜  vue3-admin git:(master) npm run dev

> vue3-admin@0.0.0 dev /Users/tongren/Projects/Blog/vue3-admin
> vite

Pre-bundling dependencies:
  vue
(this will be run only when your dependencies or config have changed)

  vite v2.2.1 dev server running at:

  > Local:    http://localhost:3000/
  > Network:  http://10.10.18.232:3000/

  ready in 486ms.
```

不知道有多少小伙伴看到了这个耗时了吗？ 毫秒级响应，真的是快的不行。打开 http://localhost:3000/ 就能看见页面了。

<img class="shadow" alt="加载失败！" src="/img/vue3-admin/vue3-admin-vite2-rundev.png" />
<p class="image-tips">http://localhost:3000/</p>

同时也可以依据社区模板创建项目，更多的方式可以查看 [社区维护模板](https://github.com/vitejs/awesome-vite#templates)。

## 目录结构

再分析下目录结构，如下：

```
.
├── dist/
├── node_modules/
├── public/
    └── favicon.ico
└── src/
    ├── assets/
    ├── components/
        └── HelloWorld.vue
    ├── App.vue
    ├── main.ts
    └── shims-vue.d.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

可以看到，对比 `vue-cli` 创建的工程，比较特殊的是 `index.html` 并不是在 `public` 文件夹中？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

查看 `index.html` 中的代码，也可以看出，项目的主入口，即为 `/src/main.ts`，且使用的是 `module` 的方式。这是因为 vite 是基于 [原生ES模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)， 在开发期间，vite 相当于启用了一个服务器，而 `index.html`就充当了项目的入口。

`package.json`

```json
{
  "name": "vue3-admin",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "vue": "^3.0.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.2.1",
    "@vue/compiler-sfc": "^3.0.5",
    "typescript": "^4.1.3",
    "vite": "^2.1.5",
    "vue-tsc": "^0.0.24"
  }
}
```

也可以看出，官方vite2选择的 vue版本已经默认是 vue3.x 了。

## vite配置

我们再来看一眼 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```

可以看出，对比 vite1.x中只能构建vue3工程来说，vite2 通过插件 `@vitejs/plugin-vue` 的方式来支持vue。对于其他框架“一视同仁”。这意味着，vite 已经不再是仅仅构建vue工程的工具了。你同样可以用vite2 来构建 `react` 工程。  
现在按照项目中常用的配置，我们来配置一下 vite。

```ts
import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 公共基础路径
  base: '/',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      // scss，全局变量引入
      scss: {
        // additionalData: `@import "src/assets/styles/init.scss";`
      }
    }
  },
  resolve: {
    // 别名
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
    }
  },
  server: {
    // 端口
    port: 3000,
    // 代理
    proxy: {
    //   '/api': {
    //     target: 'http://xxxxxx.com',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   },
    }
  },
})

```
> 如果显示 path 或者 __dirname 找不到，可以运行 `yarn add @types/node -D` 添加对ts对node的支持。 

在vite1.x 中， 别名前面必须带斜杠`/`的问题，在2.x中已经得以解决。暂时就写上这些常用的配置，更多的可以参考 [vite配置](https://cn.vitejs.dev/config/)

## 添加mock

vite的功能拓展，依赖于插件的形式，我们这里想要添加 `mock` 服务。依赖于插件 [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock/blob/main/README.zh_CN.md)。

添加依赖，这里的 `cross-env` 是用于设置环境变量。

```sh
yarn add mockjs -S

yarn add vite-plugin-mock cross-env -D
```

配置vite

```ts
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [ viteMockServe({ supportTs: true }) ],
  // othor
});
```

修改 `package.json`, 设置环境变量。

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development vite",
    "build": "vite build"
  },
} 
```

在项目目录下创建 `/mock/test.ts`。

```ts
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      };
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];
```
启动项目，访问 http://localhost:3000/api/get ，可以访问到mock的数据。

## 构建

项目构建，直接运行 `yarn build` 或者 `npm run build` 即可。

```bash
➜  vue3-admin git:(master) ✗ yarn build   
yarn run v1.22.10
warning package.json: No license field
$ vue-tsc --noEmit && vite build
vite v2.2.1 building for production...
✓ 14 modules transformed.
dist/index.html                  0.47kb
dist/assets/index.83e959fa.css   0.34kb / brotli: 0.18kb
dist/assets/index.d0b38ec0.js    2.03kb / brotli: 0.88kb
dist/assets/vendor.05decbbe.js   43.31kb / brotli: 15.60kb
✨  Done in 13.08s.
```

vite的构建依赖于 [Rollup](https://rollupjs.org/guide/en/) ，在`vite.config.ts`中，`build.rollupOptions`选项就是用来配置Rollup的。目前的构建是单纯的spa单页面应用。随着项目的继续，我们后面也会遇到构建的相关配置问题，再往后我们也会涉及到ssr、ssg等方式的构建。这里暂时就不深入研究了。

# 后记

基本上vite的简单上手就是这些了，随着项目的进行，后面我们会对vite有更多的定制，也会引入更多的插件。

