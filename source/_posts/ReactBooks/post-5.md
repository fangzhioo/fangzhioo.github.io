---
title:      【转载】React.js 基本环境安装
subtitle:   React小书by胡子大哈
keyword:    React.js,React.js 小书,安装,教程,React.js 下载
date: 2019-05-08 18:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# React.js 基本环境安装

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。React.js 单独使用基本上是不可能的事情，需要配合一些第三方工具，本文是教你如何下载和安装 React.js 的教程。
tags: [React.js,React.js 小书,安装,教程,React.js 下载]

## 安装 React.js

React.js 单独使用基本上是不可能的事情。不要指望着类似于 jQuery 下载放到 `<head />` 标签就开始使用。使用 React.js 不管在开发阶段生产阶段都需要一堆工具和库辅助，编译阶段你需要借助 Babel；需要 Redux 等第三方的状态管理工具来组织代码；如果你要写单页面应用那么你需要 React-router。这就是所谓的“React.js全家桶”。

本课程不会教大家如何配置这些东西，因为这不是课程的重点，网上有很多的资料，大家可以去参考那些资料。我们这里会直接使用 React.js 官网所推荐使用的工具 `create-react-app` 工具。它可以帮助我们一键生成所需要的工程目录，并帮我们做好各种配置和依赖，也帮我们隐藏了这些配置的细节。也就是所谓的“开箱即用”。

工具地址：[https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)

<a href="http://huzidaha.github.io/static/assets/img/posts/C9754D1A-0989-49B2-AC9F-B8D9717198CB.png" target="_blank">![React.js 安装教程图片](http://huzidaha.github.io/static/assets/img/posts/C9754D1A-0989-49B2-AC9F-B8D9717198CB.png)</a>

在安装之前要确认你的机器上安装了 node.js 环境包括 npm。如果没有安装的同学可以到 node.js 的官网下载自己电脑的对应的安装包来安装好环境。

<a href="http://huzidaha.github.io/static/assets/img/posts/70B2D77C-1656-4D9E-B57E-671BE1D568AD.png" target="_blank">![React.js 安装教程图片](http://huzidaha.github.io/static/assets/img/posts/70B2D77C-1656-4D9E-B57E-671BE1D568AD.png)</a>

安装好环境以后，只需要按照官网的指引安装 `create-react-app` 即可。

```shell
npm install -g create-react-app
```

这条命令会往我们的机器上安装一条叫 `create-react-app` 的命令，安装好以后就可以直接使用它来构建一个 react 的前端工程：

```shell
create-react-app hello-react
```

这条命令会帮我们构建一个叫 `hello-react` 的工程，并且会自动地帮助我们安装所需要的依赖，现在只需要安静地等待它安装完。

> 额外的小贴士：
> 如果有些同学安装过程比较慢，那是很有可能是因为 npm 下载的时候是从国外的源下载的缘故。所以可以把 npm 的源改成国内的 taobao 的源，这样会加速下载过程。在执行上面的命令之前可以先修改一下 npm 的源：
> `npm config set registry https://registry.npm.taobao.org`

下载完以后我们就可以启动工程了，进入工程目录然后通过 npm 启动工程：

```shell
cd hello-react
npm start
```

终端提示成功：

<a href="http://huzidaha.github.io/static/assets/img/posts/A25CB842-11DE-4DC7-A805-85AEF2A64163.png" target="_blank">![React.js 安装教程图片](http://huzidaha.github.io/static/assets/img/posts/A25CB842-11DE-4DC7-A805-85AEF2A64163.png)</a>

并且会自动打开浏览器，就可以看到 React 的工程顺利运行的效果：

<a href="http://huzidaha.github.io/static/assets/img/posts/React_App.png" target="_blank">![React.js 安装教程图片](http://huzidaha.github.io/static/assets/img/posts/React_App.png)</a>

这时候我们把 `src/App.js` 文件中的 `<h2>` 标签的内容修改为 `Hello React`，

```html
<h2>Hello React</h2>
```

保存一下，然后户就会发现浏览器自动刷新，并且我们的修改也生效了：

<a href="http://huzidaha.github.io/static/assets/img/posts/3FDC1B75-AACD-40A4-9101-1AF8C57EFBF4.png" target="_blank">![React.js 安装教程图片](http://huzidaha.github.io/static/assets/img/posts/3FDC1B75-AACD-40A4-9101-1AF8C57EFBF4.png)</a>

到这里我们的环境已经安装好了，并且顺利地运行了我们第一个例子。接下来我们会探讨 React.js 的组件的基本写法。

# 目录

第一个阶段

- Lesson1 - [React.js 简介][1]
- Lesson2 - [前端组件化（一）：从一个简单的例子讲起][2]
- Lesson3 - [前端组件化（二）：优化 DOM 操作][3]
- Lesson4 - [前端组件化（三）：抽象出公共组件类][4]
- Lesson5 - [React.js 基本环境安装][5]
- Lesson6 - [使用 JSX 描述UI信息][6]
- Lesson7 - [组件的 render 方法][7]
- Lesson8 - [组件的组合、嵌套和组件树][8]
- Lesson9 - [事件监听][9]
- Lesson10 - [组件的 state 和 setState][10]
- Lesson11 - [配置组件的props][11]
- Lesson12 - [state vs props][12]
- Lesson13 - [渲染列表数据][13]
- Lesson14 - [实战分析：评论功能（一）][14]
- Lesson15 - [实战分析：评论功能（一）][15]
- Lesson16 - [实战分析：评论功能（一）][16]

第二个阶段

- Lesson17 - [前端应用状态管理 —— 状态提升][17]
- Lesson18 - [挂载阶段的组件生命周期（一）][18]
- Lesson19 - [挂载阶段的组件生命周期（二）][19]
- Lesson20 - [更新阶段的组件生命周期][20]
- Lesson21 - [ref 和 React.js 中的 DOM 操作][21]
- Lesson22 - [props.children 和容器类组件][22]
- Lesson23 - [dangerouslySetHTML 和 style 属性][23]
- Lesson24 - [PropTypes 和组件参数验证][24]
- Lesson25 - [实战分析：评论功能（四）][25]
- Lesson26 - [实战分析：评论功能（五）][26]
- Lesson27 - [实战分析：评论功能（六）][27]

第三个阶段

- Lesson28 - [高阶组件（Higher-Order Components）][28]
- Lesson29 - [React.js 的 context][29]
- Lesson30 - [动手实现 Redux（一）：优雅地修改共享状态][30]
- Lesson31 - [动手实现 Redux（二）：抽离 store 和监控数据变化][31]
- Lesson32 - [动手实现 Redux（三）：纯函数（Pure Function）简介][32]
- Lesson33 - [动手实现 Redux（四）：共享结构的对象提高性能][33]
- Lesson34 - [动手实现 Redux（五）：不要问为什么的 reducer][34]
- Lesson35 - [动手实现 Redux（六）：Redux 总结][35]

第四个阶段  

- Lesson36 - [动手实现 React-redux（一）：初始化工程][36]
- Lesson37 - [动手实现 React-redux（二）：结合 context 和 store][37]
- Lesson38 - [动手实现 React-redux（三）：connect 和 mapStateToProps][38]
- Lesson39 - [动手实现 React-redux（四）：mapDispatchToProps][39]
- Lesson40 - [动手实现 React-redux（五）：Provider][40]
- Lesson41 - [动手实现 React-redux（六）：React-redux 总结][41]
- Lesson42 - [使用真正的 Redux 和 React-redux][42]
- Lesson43 - [Smart 组件 vs Dumb 组件][43]
- Lesson44 - [实战分析：评论功能（七）][44]
- Lesson45 - [实战分析：评论功能（八）][45]
- Lesson46 - [实战分析：评论功能（九）][46]

[1]: https://fangzhioo.github.io/Reprint/ReactBooks/post-1/
[2]: https://fangzhioo.github.io/Reprint/ReactBooks/post-2/
[3]: https://fangzhioo.github.io/Reprint/ReactBooks/post-3/
[4]: https://fangzhioo.github.io/Reprint/ReactBooks/post-4/
[5]: https://fangzhioo.github.io/Reprint/ReactBooks/post-5/
[6]: https://fangzhioo.github.io/Reprint/ReactBooks/post-6/
[7]: https://fangzhioo.github.io/Reprint/ReactBooks/post-7/
[8]: https://fangzhioo.github.io/Reprint/ReactBooks/post-8/
[9]: https://fangzhioo.github.io/Reprint/ReactBooks/post-9/
[10]: https://fangzhioo.github.io/Reprint/ReactBooks/post-10/
[11]: https://fangzhioo.github.io/Reprint/ReactBooks/post-11/
[12]: https://fangzhioo.github.io/Reprint/ReactBooks/post-12/
[13]: https://fangzhioo.github.io/Reprint/ReactBooks/post-13/
[14]: https://fangzhioo.github.io/Reprint/ReactBooks/post-14/
[15]: https://fangzhioo.github.io/Reprint/ReactBooks/post-15/
[16]: https://fangzhioo.github.io/Reprint/ReactBooks/post-16/
[17]: https://fangzhioo.github.io/Reprint/ReactBooks/post-17/
[18]: https://fangzhioo.github.io/Reprint/ReactBooks/post-18/
[19]: https://fangzhioo.github.io/Reprint/ReactBooks/post-19/
[20]: https://fangzhioo.github.io/Reprint/ReactBooks/post-20/
[21]: https://fangzhioo.github.io/Reprint/ReactBooks/post-21/
[22]: https://fangzhioo.github.io/Reprint/ReactBooks/post-22/
[23]: https://fangzhioo.github.io/Reprint/ReactBooks/post-23/
[24]: https://fangzhioo.github.io/Reprint/ReactBooks/post-24/
[25]: https://fangzhioo.github.io/Reprint/ReactBooks/post-25/
[26]: https://fangzhioo.github.io/Reprint/ReactBooks/post-26/
[27]: https://fangzhioo.github.io/Reprint/ReactBooks/post-27/
[28]: https://fangzhioo.github.io/Reprint/ReactBooks/post-28/
[29]: https://fangzhioo.github.io/Reprint/ReactBooks/post-29/
[30]: https://fangzhioo.github.io/Reprint/ReactBooks/post-30/
[31]: https://fangzhioo.github.io/Reprint/ReactBooks/post-31/
[32]: https://fangzhioo.github.io/Reprint/ReactBooks/post-32/
[33]: https://fangzhioo.github.io/Reprint/ReactBooks/post-33/
[34]: https://fangzhioo.github.io/Reprint/ReactBooks/post-34/
[35]: https://fangzhioo.github.io/Reprint/ReactBooks/post-35/
[36]: https://fangzhioo.github.io/Reprint/ReactBooks/post-36/
[37]: https://fangzhioo.github.io/Reprint/ReactBooks/post-37/
[38]: https://fangzhioo.github.io/Reprint/ReactBooks/post-38/
[39]: https://fangzhioo.github.io/Reprint/ReactBooks/post-39/
[40]: https://fangzhioo.github.io/Reprint/ReactBooks/post-40/
[41]: https://fangzhioo.github.io/Reprint/ReactBooks/post-41/
[42]: https://fangzhioo.github.io/Reprint/ReactBooks/post-42/
[43]: https://fangzhioo.github.io/Reprint/ReactBooks/post-43/
[44]: https://fangzhioo.github.io/Reprint/ReactBooks/post-44/
[45]: https://fangzhioo.github.io/Reprint/ReactBooks/post-45/
[46]: https://fangzhioo.github.io/Reprint/ReactBooks/post-46/

* * *

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react{{ page.url }}"> http://huziketang.com/books/react{{ page.url }} </a>
  </li>
</ul>
