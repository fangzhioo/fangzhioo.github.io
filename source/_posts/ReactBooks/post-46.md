---
title:      【React.js小书】实战分析：评论功能（九）
subtitle:    提炼实战经验中基础的、重要的、频繁的知识进行重点讲解，让你能用最少的精力深入了解实战中最需要的 React.js 知识。
keyword:    react.js,web,props,state,javascript
date: 2019-06-18 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# 实战分析：评论功能（九）

现在我们有三个 Dumb 组件，一个控制评论的 reducer。我们还缺什么？需要有人去 LocalStorage 加载数据，去控制新增、删除评论，去把数据保存到 LocalStorage 里面。之前这些逻辑我们都是零散地放在各个组件里面的（主要是 `CommentApp` 组件），那是因为当时我们还没对 Dumb 和 Smart 组件类型划分的认知，状态和视图之间也没有这么泾渭分明。

而现在我们知道，这些逻辑是应该放在 Smart 组件里面的：

<a href="http://huzidaha.github.io/static/assets/img/posts/6F7A1EE0-9AF4-4AB3-B554-A01E9074FC3C.png" target="_blank">![实例图片](http://huzidaha.github.io/static/assets/img/posts/6F7A1EE0-9AF4-4AB3-B554-A01E9074FC3C.png)</a>

了解 MVC、MVP 架构模式的同学应该可以类比过去，Dumb 组件就是 View（负责渲染），Smart 组件就是 Controller（Presenter），State 其实就有点类似 Model。其实不能完全类比过去，它们还是有不少差别的。但是本质上兜兜转转还是把东西分成了三层，所以说前端很喜欢炒别人早就玩烂的概念，这话果然不假。废话不多说，我们现在就把这些应用逻辑抽离到 Smart 组件里面。

## Smart CommentList

对于 `CommentList` 组件，可以看到它接受两个参数：`comments` 和 `onDeleteComment`。说明需要一个 Smart 组件来负责把 `comments` 数据传给它，并且还得响应它删除评论的请求。我们新建一个 Smart 组件 `src/containers/CommentList.js` 来干这些事情：

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

// CommentListContainer
// 一个 Smart 组件，负责评论列表数据的加载、初始化、删除评论
// 沟通 CommentList 和 state
class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  componentWillMount () {
    // componentWillMount 生命周期中初始化评论
    this._loadComments()
  }

  _loadComments () {
    // 从 LocalStorage 中加载评论
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    // this.props.initComments 是 connect 传进来的
    // 可以帮我们把数据初始化到 state 里面去
    this.props.initComments(comments)
  }

  handleDeleteComment (index) {
    const { comments } = this.props
    // props 是不能变的，所以这里新建一个删除了特定下标的评论列表
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    // 保存最新的评论列表到 LocalStorage
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onDeleteComment) {
      // this.props.onDeleteComment 是 connect 传进来的
      // 会 dispatch 一个 action 去删除评论
      this.props.onDeleteComment(index)
    }
  }

  render () {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)} />
    )
  }
}

// 评论列表从 state.comments 中获取
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 提供给 CommentListContainer
    // 当从 LocalStorage 加载评论列表以后就会通过这个方法
    // 把评论列表初始化到 state 当中
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    // 删除评论
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)
```

代码有点长，大家通过注释应该了解这个组件的基本逻辑。有一点要额外说明的是，我们一开始传给 `CommentListContainer` 的 `props.comments` 其实是 reducer 里面初始化的空的 `comments` 数组，因为还没有从 LocalStorage 里面取数据。

而 `CommentListContainer` 内部从 LocalStorage 加载 `comments` 数据，然后调用 `this.props.initComments(comments)` 会导致 `dispatch`，从而使得真正从 LocalStorage 加载的 `comments` 初始化到 state 里面去。

因为 `dispatch` 了导致 `connect` 里面的 `Connect` 包装组件去 state 里面取最新的 `comments` 然后重新渲染，这时候 `CommentListContainer` 才获得了有数据的 `props.comments`。

这里的逻辑有点绕，大家可以回顾一下我们之前实现的 `react-redux.js` 来体会一下。

## Smart CommentInput

对于 `CommentInput` 组件，我们可以看到它有三个参数：`username`、`onSubmit`、`onUserNameInputBlur`。我们需要一个 Smart 的组件来管理用户名在 LocalStorage 的加载、保存；用户还可能点击“发布”按钮，所以还需要处理评论发布的逻辑。我们新建一个 Smart 组件 `src/containers/CommentInput.js` 来干这些事情：

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

// CommentInputContainer
// 负责用户名的加载、保存，评论的发布
class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '' }
  }

  componentWillMount () {
    // componentWillMount 生命周期中初始化用户名
    this._loadUsername()
  }

  _loadUsername () {
    // 从 LocalStorage 加载 username
    // 然后可以在 render 方法中传给 CommentInput
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    // 看看 render 方法的 onUserNameInputBlur
    // 这个方法会在用户名输入框 blur 的时候的被调用，保存用户名
    localStorage.setItem('username', username)
  }

  handleSubmitComment (comment) {
    // 评论数据的验证
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    // 新增评论保存到 LocalStorage 中
    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))
    // this.props.onSubmit 是 connect 传进来的
    // 会 dispatch 一个 action 去新增评论
    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }

  render () {
    return (
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)
```

同样地，对代码的解释都放在了注释当中。这样就构建了一个 Smart 的 `CommentInput`。

## Smart CommentApp

接下来的事情都是很简单，我们用 `CommentApp` 把这两个 Smart 的组件组合起来，把 `src/CommentApp.js` 移动到 `src/containers/CommentApp.js`，把里面的内容替换为：

```javascript
import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export default class CommentApp extends Component {
  render() {
    return (
      <div className='wrapper'>
        <CommentInput />
        <CommentList />
      </div>
    )
  }
}
```

原本很复杂的 `CommentApp` 现在变得异常简单，因为它的逻辑都分离到了两个 Smart 组件里面去了。原来的 `CommentApp` 确实承载了太多它不应该承担的责任。分离这些逻辑对我们代码的维护和管理也会带来好处。

最后一步，修改 `src/index.js`：
 
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './index.css'

const store = createStore(commentsReducer)

ReactDOM.render(
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
);
```

通过 `commentsReducer` 构建一个 `store`，然后让 `Provider` 把它传递下去，这样我们就完成了最后的重构。

我们最后的组件树是这样的：

<a href="http://huzidaha.github.io/static/assets/img/posts/170B1159-C690-4DDA-9118-95AF810D40C6.png" target="_blank">![实例图片](http://huzidaha.github.io/static/assets/img/posts/170B1159-C690-4DDA-9118-95AF810D40C6.png)</a>

文件目录：

```
src
├── components
│   ├── Comment.js
│   ├── CommentInput.js
│   └── CommentList.js
├── containers
│   ├── CommentApp.js
│   ├── CommentInput.js
│   └── CommentList.js
│   reducers
│     └── comments.js
├── index.css
└── index.js
```

所有代码可以在这里找到： [comment-app3](https://github.com/huzidaha/react-naive-book-examples/tree/master/comment-app3/src)。

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
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a>
  </li>
</ul>
