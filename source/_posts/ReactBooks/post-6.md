---
title:      【转载】使用 JSX 描述 UI 信息
subtitle:   React小书by胡子大哈
keyword:    React.js,React.js 简介,React.js 小书,React.js 教程
date: 2019-05-09 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# 使用 JSX 描述 UI 信息

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。本文通过一个简单的例子讲解 React.js 描述页面 UI 的方式，介绍 JSX 原理，并且使用 JSX 来描述 React.js 组件。
tags: [React.js,React.js 小书,JSX,JavaScript]

这一节我们通过一个简单的例子讲解 React.js 描述页面 UI 的方式。把 `src/index.js` 中的代码改成：

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Header extends Component {
  render () {
    return (
      <div>
        <h1>React 小书</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Header />,
  document.getElementById('root')
)
```

我们在文件头部从 `react` 的包当中引入了 `React` 和 React.js 的组件父类 `Component`。记住，只要你要写 React.js 组件，那么就必须要引入这两个东西。

`ReactDOM` 可以帮助我们把 React 组件渲染到页面上去，没有其它的作用了。你可以发现它是从 `react-dom` 中引入的，而不是从 `react` 引入。有些朋友可能会疑惑，为什么不把这些东西都包含在 `react` 包当中呢？我们稍后会回答这个问题。

接下来的代码你看起来会比较熟悉，但又会有点陌生。你看其实它跟我们前几节里面讲的内容其实很类似，一个组件继承 `Component` 类，有一个 `render` 方法，并且把这个组件的 HTML 结构返回；这里 return 的东西就比较奇怪了，它并不是一个字符串，看起来像是纯 HTML 代码写在 JavaScript 代码里面。你也许会说，这不就有语法错误了么？这完全不是合法的 JavaScript 代码。这种看起来“在 JavaScript 写的标签的”语法叫 JSX。

## JSX 原理

为了让大家深刻理解 JSX 的含义。有必要简单介绍了一下 JSX 稍微底层的运作原理，这样大家可以更加深刻理解 JSX 到底是什么东西，为什么要有这种语法，它是经过怎么样的转化变成页面的元素的。

思考一个问题：如何用 JavaScript 对象来表现一个 DOM 元素的结构，举个例子：

```html
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```

每个 DOM 元素的结构都可以用 JavaScript 的对象来表示。你会发现一个 DOM 元素包含的信息其实只有三个：标签名，属性，子元素。

所以其实上面这个 HTML 所有的信息我们都可以用合法的 JavaScript 对象来表示：

```javascript
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```

你会发现，HTML 的信息和 JavaScript 所包含的结构和信息其实是一样的，我们可以用 JavaScript 对象来描述所有能用 HTML 表示的 UI 信息。但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。

上面的代码：

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Header extends Component {
  render () {
    return (
      <div>
        <h1 className='title'>React 小书</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Header />,
  document.getElementById('root')
)
```

经过编译以后会变成：

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Header extends Component {
  render () {
    return (
     React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          { className: 'title' },
          "React 小书"
        )
      )
    )
  }
}

ReactDOM.render(
  React.createElement(Header, null), 
  document.getElementById('root')
);
```

`React.createElement` 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等。这样的代码就是合法的 JavaScript 代码了。所以使用 React 和 JSX 的时候一定要经过编译的过程。

这里再重复一遍：*所谓的 JSX 其实就是 JavaScript 对象*。每当在 JavaScript 代码中看到这种 JSX 结构的时候，脑子里面就可以自动做转化，这样对你理解 React.js 的组件写法很有好处。

有了这个表示 HTML 结构和信息的对象以后，就可以拿去构造真正的 DOM 元素，然后把这个 DOM 元素塞到页面上。这也是我们最后一段代码中 `ReactDOM.render` 所干的事情：

```javascript
ReactDOM.render(
  <Header />,
  document.getElementById('root')
)
```

`ReactDOM.render` 功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上（在这里是 id 为 `root` 的 `div` 元素）。

所以可以总结一下从 JSX 到页面到底经过了什么样的过程：

<a href="http://huzidaha.github.io/static/assets/img/posts/44B5EC06-EAEB-4BA2-B3DC-325703E4BA45.png" target="_blank">![JSX 描述 React.js 组件图片](http://huzidaha.github.io/static/assets/img/posts/44B5EC06-EAEB-4BA2-B3DC-325703E4BA45.png)</a>

有些同学可能会问，为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？

第一个原因是，当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 `react-dom` 单独抽离出来的原因，可以想象有一个叫 `react-canvas` 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 `react-app` 可以帮我们把它转换成原生的 App（实际上这玩意叫 `ReactNative`）。

第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。这个在以后的章节中我们会提到。

## 总结

要记住几个点：

1. JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
2. React.js 可以用 JSX 来描述你的组件长什么样的。
3. JSX 在编译的时候会变成相应的 JavaScript 对象描述。
4. `react-dom` 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

## 课后练习题

* <a target="_blank" href="http://scriptoj.com/problems/1">用 React.js 在页面上渲染标题</a>

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
