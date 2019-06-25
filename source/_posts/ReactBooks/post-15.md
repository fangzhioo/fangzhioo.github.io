---
title:      【React.js小书】实战分析：评论功能（二）
subtitle:   本文带大家一起来学习如何分析、编写评论功能，包含了：处理用户输入、向父组件传递数据等部分。本文是评论功能的第二部分。
keyword:    React.js,React.js 小书,组件,实战,评论功能
date: 2019-05-18 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# 实战分析：评论功能（二）

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

[上一节][14]我们构建了基本的代码框架，现在开始完善其他的内容。

## 处理用户输入

我们从 `ComponentInput` 组件开始，学习 React.js 是如何处理用户输入的。首先修改 `ComponentInput.js`，完善 `ComponentInput` 的 `render` 函数中的 HTML 结构：

```javascript
import React, { Component } from 'react'

class CommentInput extends Component {
  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea />
          </div>
        </div>
        <div className='comment-field-button'>
          <button>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
```

在浏览器中可以看到 `ComponentInput` 的结构和样式都已经生效：

<a href="http://huzidaha.github.io/static/assets/img/posts/E384080A-1876-4C76-B2B8-940D3EB2E774.png" target="_blank">![React.js 小书实战之评论功能图片](http://huzidaha.github.io/static/assets/img/posts/E384080A-1876-4C76-B2B8-940D3EB2E774.png)</a>

因为还没有加入处理逻辑，所以你输入内容，然后点击发布是不会有什么效果的。用户可输入内容一个是用户名（username），一个是评论内容（content），我们在组件的构造函数中初始化一个 `state` 来保存这两个状态：

```javascript
...
class CommentInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  ...
}
...
```

然后给输入框设置 `value` 属性，让它们的 `value` 值等于 `this.state` 里面相应的值：

```javascript
...
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content} />
          </div>
        </div>
...
```

可以看到接受用户名输入的 `<input />` 和接受用户评论内容的 `<textarea />` 的 `value` 值分别由 `state.username` 和 `state.content` 控制。这时候你到浏览器里面去输入内容看看，你会发现你什么都输入不了。

这是为什么呢？React.js 认为所有的状态都应该由 React.js 的 state 控制，只要类似于 `<input />`、`<textarea />`、`<select />` 这样的输入控件被设置了 `value` 值，那么它们的值永远以被设置的值为准。值不变，`value` 就不会变化。

例如，上面设置了 `<input />` 的 `value` 为 `this.state.username`，`username` 在 `constructor` 中被初始化为空字符串。即使用户在输入框里面尝试输入内容了，还是没有改变 `this.state.username` 是空字符串的事实。

所以应该怎么做才能把用户内容输入更新到输入框当中呢？在 React.js 当中必须要用 `setState` 才能更新组件的内容，所以我们需要做的就是：监听输入框的 `onChange` 事件，然后获取到用户输入的内容，再通过 `setState` 的方式更新 `state` 中的 `username`，这样 `input` 的内容才会更新。

```html
...
    <div className='comment-field-input'>
      <input
        value={this.state.username}
        onChange={this.handleUsernameChange.bind(this)} />
    </div>
...
```

上面的代码给 `input` 加上了 `onChange` 事件监听，绑定到 `this.handleUsernameChange` 方法中，该方法实现如下：

```javascript
...
  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }
...
```

在这个方法中，我们通过 `event.target.value` 获取 `<input />` 中用户输入的内容，然后通过 `setState` 把它设置到 `state.username` 当中，这时候组件的内容就会更新，`input` 的 `value` 值就会得到更新并显示到输入框内。这时候输入已经没有问题了：

<a href="http://huzidaha.github.io/static/assets/img/posts/10C463F1-26E4-4E05-8945-9B56D5F68CDD.png" target="_blank">![React.js 小书实战之评论功能图片](http://huzidaha.github.io/static/assets/img/posts/10C463F1-26E4-4E05-8945-9B56D5F68CDD.png)</a>

类似于 `<input />`、`<select />`、`<textarea>` 这些元素的 `value` 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）。对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法。另外还有非受控组件，这里暂时不提及。

同样地，让 `<textarea />` 成为受控组件：

```javascript
...
  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }
...
      <div className='comment-field'>
        <span className='comment-field-name'>评论内容：</span>
        <div className='comment-field-input'>
          <textarea
            value={this.state.content}
            onChange={this.handleContentChange.bind(this)} />
        </div>
      </div>
...
```

## 向父组件传递数据

当用户在 `CommentInput` 里面输入完内容以后，点击发布，内容其实是需要显示到 `CommentList` 组件当中的。但这两个组件明显是单独的、分离的组件。我们再回顾一下之前是怎么划分组件的：

<a href="http://huzidaha.github.io/static/assets/img/posts/DAFA784B-6AD3-474B-9A87-316E5741DED6.png" target="_blank">![React.js 小书实战之评论功能图片](http://huzidaha.github.io/static/assets/img/posts/DAFA784B-6AD3-474B-9A87-316E5741DED6.png)</a>

可以看到，`CommentApp` 组件将 `CommentInput` 和 `CommentList` 组合起来，它是它们俩的父组件，可以充当桥接两个子组件的桥梁。*所以当用户点击发布按钮的时候，我们就将 `CommentInput` 的 state 当中最新的评论数据传递给父组件 `CommentApp` ，然后让父组件把这个数据传递给 `CommentList` 进行渲染。*

`CommentInput` 如何向 `CommentApp` 传递的数据？父组件 `CommentApp` 只需要通过 `props` 给子组件 `CommentInput` 传入一个回调函数。当用户点击发布按钮的时候，`CommentInput` 调用 `props` 中的回调函数并且将 `state` 传入该函数即可。

先给发布按钮添加事件：

```javascript
...
      <div className='comment-field-button'>
        <button
          onClick={this.handleSubmit.bind(this)}>
          发布
        </button>
      </div>
...
```

用户点击按钮的时候会调用 `this.handleSubmit` 方法：

```javascript
...
  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({username, content})
    }
    this.setState({ content: '' })
  }
...
```

`handleSubmit` 方法会判断 `props` 中是否传入了 `onSubmit` 属性。有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。然后再通过 `setState` 清空用户输入的评论内容（但为了用户体验，保留输入的用户名）。

修改 `CommentApp.js` ，让它可以通过传入回调来获取到新增评论数据：

```javascript
class CommentApp extends Component {
  handleSubmitComment (comment) {
    console.log(comment)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput
          onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList />
      </div>
    )
  }
}
```

在 `CommentApp` 中给 `CommentInput` 传入一个 `onSubmit` 属性，这个属性值是 `CommentApp` 自己的一个方法 `handleSubmitComment`。这样 `CommentInput` 就可以调用 `this.props.onSubmit(…)` 把数据传给 `CommenApp`。

现在在 `CommentInput` 中输入完评论内容以后点击发布，就可以看到 `CommentApp` 在控制台打印的数据：

<a href="http://huzidaha.github.io/static/assets/img/posts/7F15DF0A-1DC8-436A-98F4-E6072DCD78BE.png" target="_blank">![React.js 小书实战之评论功能图片](http://huzidaha.github.io/static/assets/img/posts/7F15DF0A-1DC8-436A-98F4-E6072DCD78BE.png)</a>

这样就顺利地把数据传递给了父组件，接下来我们开始处理评论列表相关的逻辑。

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
