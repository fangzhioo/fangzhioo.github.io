# 渲染列表数据

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

列表数据在前端非常常见，我们经常要处理这种类型的数据，例如文章列表、评论列表、用户列表…一个前端工程师几乎每天都需要跟列表数据打交道。

React.js 当然也允许我们处理列表数据，但在使用 React.js 处理列表数据的时候，需要掌握一些规则。我们这一节会专门讨论这方面的知识。

## 渲染存放 JSX 元素的数组

假设现在我们有这么一个用户列表数据，存放在一个数组当中：

```javascript
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]
```

如果现在要把这个数组里面的数据渲染页面上要怎么做？开始之前要补充一个知识。之前说过 JSX 的表达式插入 `{}` 里面可以放任何数据，如果我们往 `{}` 里面放一个存放 JSX 元素的数组会怎么样？

```javascript
...

class Index extends Component {
  render () {
    return (
      <div>
        {[
          <span>React.js </span>,
          <span>is </span>,
          <span>good</span>
        ]}
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
```

我们往 JSX 里面塞了一个数组，这个数组里面放了一些 JSX 元素（其实就是 JavaScript 对象）。到浏览器中，你在页面上会看到：

<a href="http://huzidaha.github.io/static/assets/img/posts/3ADE3817-7D91-4462-830D-1802D8345326.png" target="_blank">![React.js 小书渲染列表数据图片](http://huzidaha.github.io/static/assets/img/posts/3ADE3817-7D91-4462-830D-1802D8345326.png)</a>

审查一下元素，看看会发现什么：

<a href="http://huzidaha.github.io/static/assets/img/posts/05FD6746-FEF5-4253-9802-EB563643DEDC.png" target="_blank">![React.js 小书渲染列表数据图片](http://huzidaha.github.io/static/assets/img/posts/05FD6746-FEF5-4253-9802-EB563643DEDC.png)</a>

React.js 把插入表达式数组里面的每一个 JSX 元素一个个罗列下来，渲染到页面上。所以这里有个关键点：_如果你往 `{}` 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来_。

## 使用 map 渲染列表数据

知道这一点以后你就可以知道怎么用循环把元素渲染到页面上：循环上面用户数组里面的每一个用户，为每个用户数据构建一个 JSX，然后把 JSX 放到一个新的数组里面，再把新的数组插入 `render` 方法的 JSX 里面。看看代码怎么写：

```javascript
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class Index extends Component {
  render() {
    const usersElements = [] // 保存每个用户渲染以后 JSX 的数组
    for (let user of users) {
      usersElements.push(
        // 循环每个用户，构建 JSX，push 到数组中
        <div>
          <div>姓名：{user.username}</div>
          <div>年龄：{user.age}</div>
          <div>性别：{user.gender}</div>
          <hr />
        </div>
      )
    }

    return <div>{usersElements}</div>
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
```

这里用了一个新的数组 `usersElements`，然后循环 `users` 数组，为每个 `user` 构建一个 JSX 结构，然后 push 到 `usersElements` 中。然后直接用表达式插入，把这个 `userElements` 插到 return 的 JSX 当中。因为 React.js 会自动化帮我们把数组当中的 JSX 罗列渲染出来，所以可以看到页面上显示：

<a href="http://huzidaha.github.io/static/assets/img/posts/AABC1755-55EA-4E42-8763-A15234DB1F02.png" target="_blank">![React.js 小书渲染列表数据图片](http://huzidaha.github.io/static/assets/img/posts/AABC1755-55EA-4E42-8763-A15234DB1F02.png)</a>

但我们一般不会手动写循环来构建列表的 JSX 结构，可以直接用 ES6 自带的 `map`（不了解 `map` 函数的同学可以先了解相关的知识再来回顾这里），代码可以简化成：

```javascript
class Index extends Component {
  render() {
    return (
      <div>
        {users.map(user => {
          return (
            <div>
              <div>姓名：{user.username}</div>
              <div>年龄：{user.age}</div>
              <div>性别：{user.gender}</div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
```

这样的模式在 JavaScript 中非常常见，一般来说，在 React.js 处理列表就是用 `map` 来处理、渲染的。现在进一步把渲染单独一个用户的结构抽离出来作为一个组件，继续优化代码：

```javascript
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <div>姓名：{user.username}</div>
        <div>年龄：{user.age}</div>
        <div>性别：{user.gender}</div>
        <hr />
      </div>
    )
  }
}

class Index extends Component {
  render() {
    return (
      <div>
        {users.map(user => (
          <User user={user} />
        ))}
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
```

这里把负责展示用户数据的 JSX 结构抽离成一个组件 `User` ，并且通过 `props` 把 `user` 数据作为组件的配置参数传进去；这样改写 `Index` 就非常清晰了，看一眼就知道负责渲染 `users` 列表，而用的组件是 `User`。

## key! key! key!

现在代码运作正常，好像没什么问题。打开控制台看看：

<a href="http://huzidaha.github.io/static/assets/img/posts/85CA5037-99C1-422C-99A4-AADA978C6801.png" target="_blank">![React.js 小书渲染列表数据图片](http://huzidaha.github.io/static/assets/img/posts/85CA5037-99C1-422C-99A4-AADA978C6801.png)</a>

React.js 报错了。如果需要详细解释这里报错的原因，估计要单独写半本书。但可以简单解释一下。

React.js 的是非常高效的，它高效依赖于所谓的 Virtual-DOM 策略。简单来说，能复用的话 React.js 就会尽量复用，没有必要的话绝对不碰 DOM。对于列表元素来说也是这样，但是处理列表元素的复用性会有一个问题：元素可能会在一个列表中改变位置。例如：

```html
<div>a</div>
<div>b</div>
<div>c</div>
```

假设页面上有这么 3 个列表元素，现在改变一下位置：

```html
<div>a</div>
<div>c</div>
<div>b</div>
```

`c` 和 `b` 的位置互换了。但其实 React.js 只需要交换一下 DOM 位置就行了，但是它并不知道其实我们只是改变了元素的位置，所以它会重新渲染后面两个元素（再执行 Virtual-DOM 策略），这样会大大增加 DOM 操作。但如果给每个元素加上唯一的标识，React.js 就可以知道这两个元素只是交换了位置：

```html
<div key="a">a</div>
<div key="b">b</div>
<div key="c">c</div>
```

这样 React.js 就简单的通过 `key` 来判断出来，这两个列表元素只是交换了位置，可以尽量复用元素内部的结构。

这里没听懂没有关系，后面有机会会继续讲解这部分内容。现在只需要记住一个简单的规则：_对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 `key` 属性，这个 `key` 必须是每个元素唯一的标识_。一般来说，`key` 的值可以直接后台数据返回的 `id`，因为后台的 `id` 都是唯一的。

在上面的例子当中，每个 `user` 没有 `id` 可以用，可以直接用循环计数器 `i` 作为 `key`：

```javascript
...
class Index extends Component {
  render () {
    return (
      <div>
        {users.map((user, i) => <User key={i} user={user} />)}
      </div>
    )
  }
}
...
```

再看看，控制台已经没有错误信息了。但这是不好的做法，这只是掩耳盗铃（具体原因大家可以自己思考一下）。记住一点：在实际项目当中，如果你的数据顺序可能发生变化，标准做法是最好是后台数据返回的 `id` 作为列表元素的 `key`。

## 课后练习

- <a target="_blank" href="http://scriptoj.com/problems/8">打印章节标题</a>

---

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react </a>
  </li>
</ul>
