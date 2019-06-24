---
title:      【转载】挂载阶段的组件生命周期（二）
subtitle:   React.js 将组件渲染，构造 DOM 元素后塞入页面的过程称为组件的挂载。本文介绍了挂载阶段的组件生命周期。
keyword:    React.js,React.js 小书,挂载,组件,生命周期
date: 2019-05-22 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# 挂载阶段的组件生命周期（二）

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

这一节我们来讨论一下对于一个组件来说，`constructor` 、`componentWillMount`、`componentDidMount`、`componentWillUnmount` 这几个方法在一个组件的出生到死亡的过程里面起了什么样的作用。

一般来说，所有关于组件自身的状态的初始化工作都会放在 `constructor` 里面去做。你会发现本书所有组件的 `state` 的初始化工作都是放在 `constructor` 里面的。假设我们现在在做一个时钟应用：

<a href="http://huzidaha.github.io/static/assets/img/posts/FECF7A01-5C87-4E03-AA98-03BB30538C66.png" target="_blank">![React.js 小书组件的生命周期图片](http://huzidaha.github.io/static/assets/img/posts/FECF7A01-5C87-4E03-AA98-03BB30538C66.png)</a>

我们会在 `constructor` 里面初始化 `state.date`，当然现在页面还是静态的，等下一会让时间动起来。

```javascript
class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }

  render () {
    return (
      <div>
        <h1>
          <p>现在的时间是</p>
          {this.state.date.toLocaleTimeString()}
        </h1>
      </div>
    )
  }
}
```

一些组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等，就可以放在 `componentWillMount` 里面进行，例如 Ajax：

```javascript
...
  componentWillMount () {
    ajax.get('http://json-api.com/user', (userData) => {
      this.setState({ userData })
    })
  }
...
```

当然在我们这个例子里面是定时器的启动，我们给 `Clock` 启动定时器：

```javascript
class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }

  componentWillMount () {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
  }
  ...
}
```

我们在 `componentWillMount` 中用 `setInterval` 启动了一个定时器：每隔 1 秒更新中的 `state.date`，这样页面就可以动起来了。我们用一个 `Index` 把它用起来，并且插入页面：

```javascript
class Index extends Component {
  render () {
    return (
      <div>
        <Clock />
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
```

像上一节那样，我们修改这个 `Index` 让这个时钟可以隐藏或者显示：

```javascript
class Index extends Component {
  constructor () {
    super()
    this.state = { isShowClock: true }
  }

  handleShowOrHide () {
    this.setState({
      isShowClock: !this.state.isShowClock
    })
  }

  render () {
    return (
      <div>
        {this.state.isShowClock ? <Clock /> : null }
        <button onClick={this.handleShowOrHide.bind(this)}>
          显示或隐藏时钟
        </button>
      </div>
    )
  }
}
```

现在页面上有个按钮可以显示或者隐藏时钟。你试一下显示或者隐藏时钟，虽然页面上看起来功能都正常，在控制台你会发现报错了：

<a href="http://huzidaha.github.io/static/assets/img/posts/340BBCEA-35CC-4B35-B352-267F381477EF.png" target="_blank">![React.js 小书组件的生命周期图片](http://huzidaha.github.io/static/assets/img/posts/340BBCEA-35CC-4B35-B352-267F381477EF.png)</a>

这是因为，*当时钟隐藏的时候，我们并没有清除定时器*。时钟隐藏的时候，定时器的回调函数还在不停地尝试 `setState`，由于 `setState` 只能在已经挂载或者正在挂载的组件上调用，所以 React.js 开始疯狂报错。

多次的隐藏和显示会让 React.js 重新构造和销毁 `Clock` 组件，每次构造都会重新构建一个定时器。而销毁组件的时候没有清除定时器，所以你看到报错会越来越多。而且因为 JavaScript 的闭包特性，这样会导致严重的内存泄漏。

这时候`componentWillUnmount` 就可以派上用场了，它的作用就是在组件销毁的时候，做这种清场的工作。例如清除该组件的定时器和其他的数据清理工作。我们给 `Clock` 添加 `componentWillUnmount`，在组件销毁的时候清除该组件的定时器：

```javascript
...
  componentWillUnmount () {
    clearInterval(this.timer)
  }
...
```

这时候就没有错误了。

## 总结
我们一般会把组件的 `state`  的初始化工作放在 `constructor` 里面去做；在 `componentWillMount` 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 `componentWillUnmount` 里面去做。

说一下本节没有提到的 `componentDidMount` 。一般来说，有些组件的启动工作是依赖 DOM 的，例如动画的启动，而 `componentWillMount` 的时候组件还没挂载完成，所以没法进行这些启动工作，这时候就可以把这些操作放在 `componentDidMount` 当中。`componentDidMount` 的具体使用我们会在接下来的章节当中结合 DOM 来讲。

## 课后练习
* <a target="_blank" href="http://scriptoj.com/problems/10">React.js 加载、刷新数据</a>

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
- Lesson15 - [实战分析：评论功能（二）][15]
- Lesson16 - [实战分析：评论功能（三）][16]

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

[1]: https://fangzhioo.github.io/reprint/ReactBooks/post-1/
[2]: https://fangzhioo.github.io/reprint/ReactBooks/post-2/
[3]: https://fangzhioo.github.io/reprint/ReactBooks/post-3/
[4]: https://fangzhioo.github.io/reprint/ReactBooks/post-4/
[5]: https://fangzhioo.github.io/reprint/ReactBooks/post-5/
[6]: https://fangzhioo.github.io/reprint/ReactBooks/post-6/
[7]: https://fangzhioo.github.io/reprint/ReactBooks/post-7/
[8]: https://fangzhioo.github.io/reprint/ReactBooks/post-8/
[9]: https://fangzhioo.github.io/reprint/ReactBooks/post-9/
[10]: https://fangzhioo.github.io/reprint/ReactBooks/post-10/
[11]: https://fangzhioo.github.io/reprint/ReactBooks/post-11/
[12]: https://fangzhioo.github.io/reprint/ReactBooks/post-12/
[13]: https://fangzhioo.github.io/reprint/ReactBooks/post-13/
[14]: https://fangzhioo.github.io/reprint/ReactBooks/post-14/
[15]: https://fangzhioo.github.io/reprint/ReactBooks/post-15/
[16]: https://fangzhioo.github.io/reprint/ReactBooks/post-16/
[17]: https://fangzhioo.github.io/reprint/ReactBooks/post-17/
[18]: https://fangzhioo.github.io/reprint/ReactBooks/post-18/
[19]: https://fangzhioo.github.io/reprint/ReactBooks/post-19/
[20]: https://fangzhioo.github.io/reprint/ReactBooks/post-20/
[21]: https://fangzhioo.github.io/reprint/ReactBooks/post-21/
[22]: https://fangzhioo.github.io/reprint/ReactBooks/post-22/
[23]: https://fangzhioo.github.io/reprint/ReactBooks/post-23/
[24]: https://fangzhioo.github.io/reprint/ReactBooks/post-24/
[25]: https://fangzhioo.github.io/reprint/ReactBooks/post-25/
[26]: https://fangzhioo.github.io/reprint/ReactBooks/post-26/
[27]: https://fangzhioo.github.io/reprint/ReactBooks/post-27/
[28]: https://fangzhioo.github.io/reprint/ReactBooks/post-28/
[29]: https://fangzhioo.github.io/reprint/ReactBooks/post-29/
[30]: https://fangzhioo.github.io/reprint/ReactBooks/post-30/
[31]: https://fangzhioo.github.io/reprint/ReactBooks/post-31/
[32]: https://fangzhioo.github.io/reprint/ReactBooks/post-32/
[33]: https://fangzhioo.github.io/reprint/ReactBooks/post-33/
[34]: https://fangzhioo.github.io/reprint/ReactBooks/post-34/
[35]: https://fangzhioo.github.io/reprint/ReactBooks/post-35/
[36]: https://fangzhioo.github.io/reprint/ReactBooks/post-36/
[37]: https://fangzhioo.github.io/reprint/ReactBooks/post-37/
[38]: https://fangzhioo.github.io/reprint/ReactBooks/post-38/
[39]: https://fangzhioo.github.io/reprint/ReactBooks/post-39/
[40]: https://fangzhioo.github.io/reprint/ReactBooks/post-40/
[41]: https://fangzhioo.github.io/reprint/ReactBooks/post-41/
[42]: https://fangzhioo.github.io/reprint/ReactBooks/post-42/
[43]: https://fangzhioo.github.io/reprint/ReactBooks/post-43/
[44]: https://fangzhioo.github.io/reprint/ReactBooks/post-44/
[45]: https://fangzhioo.github.io/reprint/ReactBooks/post-45/
[46]: https://fangzhioo.github.io/reprint/ReactBooks/post-46/

* * *

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react{{ page.url }}"> http://huziketang.com/books/react{{ page.url }} </a>
  </li>
</ul>
