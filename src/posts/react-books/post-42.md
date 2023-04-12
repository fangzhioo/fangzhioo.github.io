---
title:      【React.js小书】使用真正的 Redux 和 React-redux
subtitle:    提炼实战经验中基础的、重要的、频繁的知识进行重点讲解，让你能用最少的精力深入了解实战中最需要的 React.js 知识。
keyword:    react.js,web,props,state,javascript
date: 2019-06-14 14:08:52
catalog: true
tags:
    - React
    - 转载
categories: 
    - Reprint
---

# 使用真正的 Redux 和 React-redux

现在 `make-react-redux` 工程代码中的 Redux 和 React-redux 都是我们自己写的，现在让我们来使用真正的官方版本的 Redux 和 React-redux。

在工程目录下使用 npm 安装 Redux 和 React-redux 模块：

```bash
npm install redux react-redux --save
```

把 `src/` 目录下 `Header.js`、`ThemeSwitch.js`、`Content.js` 的模块导入中的：

```javascript
import { connect } from './react-redux'
```

改成：

```javascript
import { connect } from 'react-redux'
```

也就是本来从本地 `./react-redux` 导入的 `connect` 改成从第三方 `react-redux` 模块中导入。

修改 `src/index.js`，把前面部分的代码调整为：

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Header from './Header'
import Content from './Content'
import './index.css'

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)

...
```

我们删除了自己写的 `createStore`，改成使用第三方模块 `redux` 的 `createStore`；`Provider` 本来从本地的 `./react-redux` 引入，改成从第三方 `react-redux` 模块中引入。其余代码保持不变。

接着删除 `src/react-redux.js`，它的已经用处不大了。最后启动工程 `npm start`：

<a href="http://huzidaha.github.io/static/assets/img/posts/A6103C15-A0C3-4540-9147-67ABC24FCD48.png" target="_blank">![实例图片](http://huzidaha.github.io/static/assets/img/posts/A6103C15-A0C3-4540-9147-67ABC24FCD48.png)</a>

可以看到我们原来的业务代码其实都没有太多的改动，实际上我们实现的 `redux` 和 `react-redux` 和官方版本在该场景的用法上是兼容的。接下来的章节我们都会使用官方版本的 `redux` 和 `react-redux`。

## 课后练习

* <a target="_blank" href="http://scriptoj.com/problems/17">React-redux 实现用户列表的显示、增加、删除</a>



* * *

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a>
  </li>
</ul>
