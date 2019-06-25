---
title:      【转载】props.children 和容器类组件
subtitle:   嵌套的 JSX 结构在组件内部可以通过 props.children 获取到，这种组件编写方式在编写容器类型组件时非常有用。
keyword:    React.js,React.js 小书,容器,props,教程
date: 2019-05-25 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# props.children 和容器类组件

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

有一类组件，充当了容器的作用，它定义了一种外层结构形式，然后你可以往里面塞任意的内容。这种结构在实际当中非常常见，例如这种带卡片组件：

<a href="http://huzidaha.github.io/static/assets/img/posts/45A7AD7E-CC88-4957-B1EF-09DFE7755590.png" target="_blank">![React.js 小书容器组件图片](http://huzidaha.github.io/static/assets/img/posts/45A7AD7E-CC88-4957-B1EF-09DFE7755590.png)</a>

组件本身是一个不带任何内容的方形的容器，我可以在用这个组件的时候给它传入任意内容：

<a href="http://huzidaha.github.io/static/assets/img/posts/6BD73C14-60FE-44BA-A93C-B637BD07DE59.png" target="_blank">![React.js 小书容器组件图片](http://huzidaha.github.io/static/assets/img/posts/6BD73C14-60FE-44BA-A93C-B637BD07DE59.png)</a>

基于我们目前的知识储备，可以迅速写出这样的代码：

```javascript
class Card extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.content}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Card content={
    <div>
      <h2>React.js 小书</h2>
       <div>开源、免费、专业、简单</div>
      订阅：<input />
    </div>
  } />,
  document.getElementById('root')
)
```

我们通过给 `Card` 组件传入一个 `content` 属性，这个属性可以传入任意的 JSX 结构。然后在 `Card` 内部会通过 `{this.props.content}` 把内容渲染到页面上。

这样明显太丑了，如果 `Card` 除了 `content` 以外还能传入其他属性的话，那么这些 JSX 和其他属性就会混在一起。很不好维护，如果能像下面的代码那样使用 `Card` 那想必也是极好的：

```javascript
ReactDOM.render(
  <Card>
    <h2>React.js 小书</h2>
    <div>开源、免费、专业、简单</div>
    订阅：<input />
  </Card>,
  document.getElementById('root')
)
```

如果组件标签也能像普通的 HTML 标签那样编写内嵌的结构，那么就方便很多了。实际上，React.js 默认就支持这种写法，所有嵌套在组件中的 JSX 结构都可以在组件内部通过 `props.children` 获取到：

```javascript
class Card extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
```

把 `props.children` 打印出来，你可以看到它其实是个数组：

<a href="http://huzidaha.github.io/static/assets/img/posts/4CD84934-5A7F-4942-A5F5-3C935E113499.png" target="_blank">![React.js 小书容器组件图片](http://huzidaha.github.io/static/assets/img/posts/4CD84934-5A7F-4942-A5F5-3C935E113499.png)</a>

React.js 就是把我们嵌套的 JSX 元素一个个都放到数组当中，然后通过 `props.children` 传给了 `Card`。

由于 JSX 会把插入表达式里面数组中的 JSX 一个个罗列下来显示。所以其实就相当于在 `Card` 中嵌套了什么 JSX 结构，都会显示在 `Card` 的类名为 `card-content` 的 `div` 元素当中。

这种嵌套的内容成为了 `props.children` 数组的机制使得我们编写组件变得非常的灵活，我们甚至可以在组件内部把数组中的 JSX 元素安置在不同的地方：

```javascript
class Layout extends Component {
  render () {
    return (
      <div className='two-cols-layout'>
        <div className='sidebar'>
          {this.props.children[0]}
        </div>
        <div className='main'>
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}
```

这是一个两列布局组件，嵌套的 JSX 的第一个结构会成为侧边栏，第二个结构会成为内容栏，其余的结构都会被忽略。这样通过这个布局组件，就可以在各个地方高度复用我们的布局。

## 总结

使用自定义组件的时候，可以在其中嵌套 JSX 结构。嵌套的结构在组件内部都可以通过 `props.children` 获取到，这种组件编写方式在编写容器类型的组件当中非常有用。而在实际的 React.js 项目当中，我们几乎每天都需要用这种方式来编写组件。

## 课后练习

* <a target="_blank" href="http://scriptoj.com/problems/13">黑色边框的容器组件</a>

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
