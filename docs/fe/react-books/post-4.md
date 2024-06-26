# 前端组件化（三）：抽象出公共组件类

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

为了让代码更灵活，可以写更多的组件，我们把这种模式抽象出来，放到一个 `Component` 类当中：

```javascript
class Component {
  setState(state) {
    const oldEl = this.el
    this.state = state
    this._renderDOM()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  _renderDOM() {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}
```

这个是一个组件父类 `Component`，所有的组件都可以继承这个父类来构建。它定义的两个方法，一个是我们已经很熟悉的 `setState`；一个是私有方法 `_renderDOM`。`_renderDOM` 方法会调用 `this.render` 来构建 DOM 元素并且监听 `onClick` 事件。所以，组件子类继承的时候只需要实现一个返回 HTML 字符串的 `render` 方法就可以了。

还有一个额外的 `mount` 的方法，其实就是把组件的 DOM 元素插入页面，并且在 `setState` 的时候更新页面：

```javascript
const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDOM())
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeChild(oldEl)
  }
}
```

这样的话我们重新写点赞组件就会变成：

```javascript
class LikeButton extends Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }

  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return `
        <button class='like-btn'>
          <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>👍</span>
        </button>
      `
  }
}

mount(new LikeButton(), wrapper)
```

这样还不够好。在实际开发当中，你可能需要给组件传入一些自定义的配置数据。例如说想配置一下点赞按钮的背景颜色，如果我给它传入一个参数，告诉它怎么设置自己的颜色。那么这个按钮的定制性就更强了。所以我们可以给组件类和它的子类都传入一个参数 `props`，作为组件的配置参数。修改 `Component` 的构造函数为：

```javascript
...
    constructor (props = {}) {
      this.props = props
    }
...
```

继承的时候通过 `super(props)` 把 `props` 传给父类，这样就可以通过 `this.props` 获取到配置参数：

```javascript
class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = { isLiked: false }
  }

  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return `
        <button class='like-btn' style="background-color: ${this.props.bgColor}">
          <span class='like-text'>
            ${this.state.isLiked ? '取消' : '点赞'}
          </span>
          <span>👍</span>
        </button>
      `
  }
}

mount(new LikeButton({ bgColor: 'red' }), wrapper)
```

这里我们稍微修改了一下原有的 `LikeButton` 的 `render` 方法，让它可以根据传入的参数 `this.props.bgColor` 来生成不同的 `style` 属性。这样就可以自由配置组件的颜色了。

只要有了上面那个 `Component` 类和 `mount` 方法加起来不足 40 行代码就可以做到组件化。如果我们需要写另外一个组件，只需要像上面那样，简单地继承一下 `Component` 类就好了：

```javascript
class RedBlueButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red'
    }
  }

  onClick() {
    this.setState({
      color: 'blue'
    })
  }

  render() {
    return `
        <div style='color: ${this.state.color};'>${this.state.color}</div>
      `
  }
}
```

简单好用，现在可以灵活地组件化页面了。`Component` 完整的代码可以在这里找到 [reactjs-in-40](https://github.com/huzidaha/reactjs-in-40)。

## 总结

我们用了很长的篇幅来讲一个简单的点赞的例子，并且在这个过程里面一直在优化编写的方式。最后抽离出来了一个类，可以帮助我们更好的做组件化。在这个过程里面我们学到了什么？

组件化可以帮助我们解决前端结构的复用性问题，整个页面可以由这样的不同的组件组合、嵌套构成。

一个组件有自己的显示形态（上面的 HTML 结构和内容）行为，组件的显示形态和行为可以由数据状态（state）和配置参数（props）共同决定。数据状态和配置参数的改变都会影响到这个组件的显示形态。

当数据变化的时候，组件的显示需要更新。所以如果组件化的模式能提供一种高效的方式自动化地帮助我们更新页面，那也就可以大大地降低我们代码的复杂度，带来更好的可维护性。

好了，课程结束了。你已经学会了怎么使用 React.js 了，因为我们已经写了一个——当然我是在开玩笑，但是上面这个 `Component` 类其实和 React 的 `Component` 使用方式很类似。掌握了这几节的课程，你基本就掌握了基础的 React.js 的概念。

接下来我们开始正式进入主题，开始[正式介绍 React.js][5]。你会发现，有了前面的铺垫，下面讲的内容理解起来会简单很多了。

---

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a>
  </li>
</ul>
