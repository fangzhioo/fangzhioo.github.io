---
title:      【React.js小书】实战分析：评论功能（六）
subtitle:   本文带大家一起来学习如何分析、编写评论功能，包括：删除评论、显示代码块和对整个评论功能的总结。本文是评论功能的第六部分。
keyword:    React.js,React.js 小书,组件,实战,评论功能
date: 2019-05-30 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# 实战分析：评论功能（六）

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

## 删除评论
现在发布评论，评论不会消失，评论越来越多并不是什么好事。所以我们给评论组件加上删除评论的功能，这样就可以删除不想要的评论了。修改 `src/Comment.js` 的 `render` 方法，新增一个删除按钮：

```javascript
...
  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>
            {comment.username}
          </span>：
        </div>
        <p>{comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span className='comment-delete'>
          删除
        </span>
      </div>
    )
  }
... 
```

我们在后面加了一个删除按钮，因为 `index.css` 定义了样式，所以鼠标放到特定的评论上才会显示删除按钮，让用户体验好一些。

我们知道评论列表数据是放在 `CommentApp` 当中的，而这个删除按钮是在 `Comment` 当中的，现在我们要做的事情是用户点击某条评论的删除按钮，然后在 `CommentApp` 中把相应的数据删除。但是 `CommentApp` 和 `Comment` 的关系是这样的：

<a href="http://huzidaha.github.io/static/assets/img/posts/DAFA784B-6AD3-474B-9A87-316E5741DED6.png" target="_blank">![React.js 小书实战评论功能图片](http://huzidaha.github.io/static/assets/img/posts/DAFA784B-6AD3-474B-9A87-316E5741DED6.png)</a>

`Comment` 和 `CommentApp` 之间隔了一个 `CommentList`，`Comment` 无法直接跟 `CommentApp` 打交道，只能通过 `CommentList` 来转发这种删除评论的消息。修改 `Comment`  组件，让它可以把删除的消息传递到上一层：

```javascript
class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }
...
  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render () {
    ...
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          删除
        </span>
      </div>
    )
  }

```

现在在使用 `Comment` 的时候，可以传入 `onDeleteComment` 和 `index` 两个参数。`index` 用来标志这个评论在列表的下标，这样点击删除按钮的时候我们才能知道你点击的是哪个评论，才能知道怎么从列表数据中删除。用户点击删除会调用 `handleDeleteComment` ，它会调用从上层传入的 `props. onDeleteComment` 函数告知上一层组件删除的消息，并且把评论下标传出去。现在修改 `src/CommentList.js` 让它把这两个参数传进来：

```javascript
class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  static defaultProps = {
    comments: []
  }

  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
      </div>
    )
  }
}
```

当用户点击按钮的时候，`Comment` 组件会调用 `props.onDeleteComment`，也就是 `CommentList` 的 `handleDeleteComment` 方法。而 `handleDeleteComment` 会调用 `CommentList` 所接受的配置参数中的 `props.onDeleteComment`，并且把下标传出去。

也就是说，我们可以在 `CommentApp` 给 `CommentList` 传入一个 `onDeleteComment` 的配置参数来接受这个删除评论的消息，修改 `CommentApp.js`：

```javascript
...
  handleDeleteComment (index) {
    console.log(index)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)} />
      </div>
    )
  }
}
...
```

现在点击删除按钮，可以在控制台看到评论对应的下标打印了出来。其实这就是这么一个过程：`CommentList` 把下标 `index` 传给 `Comment`。点击删除按钮的时候，`Comment` 把 `index` 传给了 `CommentList`，`CommentList` 再把它传给 `CommentApp`。现在可以在 `CommentApp` 中删除评论了：

```javascript
...
  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }
...
```

我们通过 `comments.splice` 删除特定下标的评论，并且通过 `setState` 重新渲染整个评论列表；当然了，还需要把最新的评论列表数据更新到 LocalStorage 中，所以我们在删除、更新以后调用了 `_saveComments` 方法把数据同步到 LocalStorage 中。

现在就可以愉快地删除评论了。但是，你删除评论以后 5 秒钟后就会在控制台中看到报错了：

<a href="http://huzidaha.github.io/static/assets/img/posts/83C3CDDD-F8C5-4C37-B848-852E98E0E464.png" target="_blank">![React.js 小书实战评论功能图片](http://huzidaha.github.io/static/assets/img/posts/83C3CDDD-F8C5-4C37-B848-852E98E0E464.png)</a>

这是因为我们忘了清除评论的定时器，修改 `src/Comment.js`，新增生命周期 `commentWillUnmount` 在评论组件销毁的时候清除定时器：

```javascript
...
  componentWillUnmount () {
    clearInterval(this._timer)
  }
...
```

这才算完成了第 5 个需求。

## 显示代码块
用户在的输入内容中任何以 \`\` 包含的内容都会用 `<code>` 包含起来显示到页面上。`<code>` 这是一个 HTML 结构，需要往页面动态插入 HTML 结构我们只能用 `dangerouslySetInnerHTML` 了，修改 `src/Comment.js`，把原来 `render()` 函数中的：

```javascript
<p>{comment.content}</p>
```

修改成：

```javascript
<p dangerouslySetInnerHTML={{
  __html: this._getProcessedContent(comment.content)
}} />
```

我们把经过 `this._getProcessedContent` 处理的评论内容以 HTML 的方式插入到 `<p>` 元素中。`this._getProcessedContent` 要把  \`\` 包含的内容用 `<code>` 包裹起来，一个正则表达式就可以做到了：

```javascript
...
  _getProcessedContent (content) {
    return content
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
...
```

但是这样做会有严重的 XSS 漏洞，用户可以输入任意的 HTML 标签，用  `<script>` 执行任意的 JavaScript 代码。所以在替换代码之前，我们要手动地把这些 HTML 标签进行转义：

```javascript
...
  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
...
```

前 5 个 `replace` 实际上是把类似于 `<`、`>` 这种内容替换转义一下，防止用户输入  HTML 标签。最后一行代码才是实现功能的代码。

这时候在评论框中输入：

> 这是代码块 \`console.log\`，这是 <h1>正常内容</h1>。

然后点击发布，看看效果：

<a href="http://huzidaha.github.io/static/assets/img/posts/5C18C820-E406-4D38-95DC-B4FEA70E34EE.png" target="_blank">![React.js 小书实战评论功能图片](http://huzidaha.github.io/static/assets/img/posts/5C18C820-E406-4D38-95DC-B4FEA70E34EE.png)</a>

我们安全地完成了第 6 个需求。到目前为止，第二阶段的实战已经全部完成，你可以在[这里](https://github.com/huzidaha/react-naive-book-examples)找到完整的代码。

## 总结
到这里第二阶段已经全部结束，我们已经掌握了全部 React.js 实战需要的入门知识。接下来我们会学习两个相对比较高级的 React.js 的概念，然后进入 React-redux 的世界，让它们配合 React.js 来构建更成熟的前端页面。

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
