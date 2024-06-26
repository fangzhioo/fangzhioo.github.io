# React.js 基本环境安装

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

## 安装 React.js

React.js 单独使用基本上是不可能的事情。不要指望着类似于 jQuery 下载放到 `<head />` 标签就开始使用。使用 React.js 不管在开发阶段生产阶段都需要一堆工具和库辅助，编译阶段你需要借助 Babel；需要 Redux 等第三方的状态管理工具来组织代码；如果你要写单页面应用那么你需要 React-router。这就是所谓的“React.js 全家桶”。

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

到这里我们的环境已经安装好了，并且顺利地运行了我们第一个例子。接下来我们会探讨 [React.js 的组件][6]的基本写法。

---

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a>
  </li>
</ul>
