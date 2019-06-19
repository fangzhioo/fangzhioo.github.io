---
title:      【转载】前端组件化（二）：优化 DOM 操作
subtitle:   React小书by胡子大哈
keyword:    React.js,React.js 小书,教程,组件,虚拟 DOM
date: 2019-05-06 16:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# 前端组件化（二）：优化 DOM 操作

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。本文是一个关于如何使用 React.js 实现前端组件化的教程的第二部分，介绍了如何优化虚拟 DOM。
tags: [React.js,React.js 小书,教程,组件,虚拟 DOM]


看看上一节我们的代码，仔细留意一下 `changeLikeText` 函数，这个函数包含了 DOM 操作，现在看起来比较简单，那是因为现在只有 `isLiked` 一个状态。由于数据状态改变会导致需要我们去更新页面的内容，所以假想一下，如果你的组件依赖了很多状态，那么你的组件基本全部都是 DOM 操作。

一个组件的显示形态由多个状态决定的情况非常常见。代码中混杂着对 DOM 的操作其实是一种不好的实践，手动管理数据和 DOM 之间的关系会导致代码可维护性变差、容易出错。所以我们的例子这里还有优化的空间：如何尽量减少这种手动 DOM 操作？

## 状态改变 -> 构建新的 DOM 元素更新页面

这里要提出的一种解决方案：*一旦状态发生改变，就重新调用  `render`  方法，构建一个新的 DOM 元素*。这样做的好处是什么呢？好处就是你可以在 `render` 方法里面使用最新的 `this.state` 来构造不同 HTML 结构的字符串，并且通过这个字符串构造不同的 DOM 元素。页面就更新了！听起来有点绕，看看代码怎么写，修改原来的代码为：

```javascript
  class LikeButton {
    constructor () {
      this.state = { isLiked: false }
    }

    setState (state) {
      this.state = state
      this.el = this.render()
    }

    changeLikeText () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      this.el = createDOMFromString(`
        <button class='like-btn'>
          <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>👍</span>
        </button>
      `)
      this.el.addEventListener('click', this.changeLikeText.bind(this), false)
      return this.el
    }
  }
```

其实只是改了几个小地方：

1. `render` 函数里面的 HTML 字符串会根据 `this.state` 不同而不同（这里是用了 ES6 的模版字符串，做这种事情很方便）。
2. 新增一个 `setState` 函数，这个函数接受一个对象作为参数；它会设置实例的 `state`，然后重新调用一下 `render` 方法。
3. 当用户点击按钮的时候， `changeLikeText`  会构建新的 `state` 对象，这个新的 `state` ，传入 `setState` 函数当中。

这样的结果就是，用户每次点击，`changeLikeText` 都会调用改变组件状态然后调用 `setState` ；`setState` 会调用 `render` ，`render` 方法会根据  `state` 的不同重新构建不同的 DOM 元素。

也就是说，*你只要调用 `setState`，组件就会重新渲染*。我们顺利地消除了手动的 DOM 操作。

## 重新插入新的 DOM 元素

上面的改进不会有什么效果，因为你仔细看一下就会发现，其实重新渲染的 DOM 元素并没有插入到页面当中。所以在这个组件外面，你需要知道这个组件发生了改变，并且把新的 DOM 元素更新到页面当中。

重新修改一下 `setState` 方法：

```javascript
...
    setState (state) {
      const oldEl = this.el
      this.state = state
      this.el = this.render()
      if (this.onStateChange) this.onStateChange(oldEl, this.el)
    }
...
```

使用这个组件的时候：

```javascript
const likeButton = new LikeButton()
wrapper.appendChild(likeButton.render()) // 第一次插入 DOM 元素
likeButton.onStateChange = (oldEl, newEl) => {
  wrapper.insertBefore(newEl, oldEl) // 插入新的元素
  wrapper.removeChild(oldEl) // 删除旧的元素
}
```

这里每次 `setState` 都会调用 `onStateChange` 方法，而这个方法是实例化以后时候被设置的，所以你可以自定义 `onStateChange` 的行为。*这里做的事是，每当 `setState` 中构造完新的 DOM 元素以后，就会通过 `onStateChange` 告知外部插入新的 DOM 元素，然后删除旧的元素，页面就更新了*。这里已经做到了进一步的优化了：现在不需要再手动更新页面了。

非一般的暴力，因为每次 `setState` 都重新构造、新增、删除 DOM 元素，会导致浏览器进行大量的重排，严重影响性能。不过没有关系，这种暴力行为可以被一种叫 Virtual-DOM 的策略规避掉，但这不是本文所讨论的范围。

这个版本的点赞功能很不错，我可以继续往上面加功能，而且还不需要手动操作DOM。但是有一个不好的地方，如果我要重新另外做一个新组件，譬如说评论组件，那么里面的这些 `setState` 方法要重新写一遍，其实这些东西都可以抽出来，变成一个通用的模式。[下一节](http://react.huziketang.com/blog/lesson4)我们把这个通用模式抽离到一个类当中。

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
