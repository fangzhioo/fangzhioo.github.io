---
title:      【转载】dangerouslySetHTML 和 style 属性
subtitle:   介绍两个之前没有提到的属性：dangerouslySetHTML 和 style，在 React.js 组件开发中非常常用，也很简单。
keyword:    React.js,React.js 小书,dangerouslySetHTML,style 属性,教程
date: 2019-05-26 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

# dangerouslySetHTML 和 style 属性

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

这一节我们来补充两个之前没有提到的属性，但是在 React.js 组件开发中也非常常用，但是它们也很简单。

## dangerouslySetHTML

出于安全考虑的原因（XSS 攻击），在 React.js 当中所有的表达式插入的内容都会被自动转义，就相当于 jQuery 里面的 `text(…)` 函数一样，任何的 HTML 格式都会被转义掉：

```javascript
class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>React.js 小书</h1>'
    }
  }

  render () {
    return (
      <div className='editor-wrapper'>
        {this.state.content}
      </div>
    )
  }
}
```

假设上面是一个富文本编辑器组件，富文本编辑器的内容是动态的 HTML 内容，用 `this.state.content` 来保存。我希望在编辑器内部显示这个动态 HTML 结构，但是因为 React.js 的转义特性，页面上会显示：

<a href="http://huzidaha.github.io/static/assets/img/posts/A67A4660-604A-4F42-A743-A059A96344C8.png" target="_blank">![React.js 小书教程图片](http://huzidaha.github.io/static/assets/img/posts/A67A4660-604A-4F42-A743-A059A96344C8.png)</a>

表达式插入并不会把一个 `<h1>` 渲染到页面，而是把它的文本形式渲染了。那要怎么才能做到设置动态 HTML 结构的效果呢？React.js 提供了一个属性 `dangerouslySetInnerHTML`，可以让我们设置动态设置元素的 innerHTML：

```javascript
...
  render () {
    return (
      <div
        className='editor-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
...
```

需要给 `dangerouslySetInnerHTML` 传入一个对象，这个对象的 `__html` 属性值就相当于元素的 `innerHTML`，这样我们就可以动态渲染元素的 `innerHTML` 结构了。

有写朋友会觉得很奇怪，为什么要把一件这么简单的事情搞得这么复杂，名字又长，还要传入一个奇怪的对象。那是因为设置 `innerHTML` 可能会导致跨站脚本攻击（XSS），所以  React.js 团队认为把事情搞复杂可以防止（警示）大家滥用这个属性。这个属性不必要的情况就不要使用。

## style

React.js 中的元素的 `style` 属性的用法和 DOM 里面的 `style` 不大一样，普通的 HTML 中的：

```html
<h1 style='font-size: 12px; color: red;'>React.js 小书</h1>
```

在 React.js 中你需要把 CSS 属性变成一个对象再传给元素：

```jsx
<h1 style={{fontSize: '12px', color: 'red'}}>React.js 小书</h1>
```

`style` 接受一个对象，这个对象里面是这个元素的 CSS 属性键值对，原来 CSS 属性中带 `-` 的元素都必须要去掉 `-` 换成驼峰命名，如 `font-size`  换成 `fontSize`，`text-align` 换成 `textAlign`。

用对象作为 `style` 方便我们动态设置元素的样式。我们可以用 `props` 或者 `state` 中的数据生成样式对象再传给元素，然后用 `setState` 就可以修改样式，非常灵活：

```jsx
<h1 style={{fontSize: '12px', color: this.state.color}}>React.js 小书</h1>
```

只要简单地 `setState({color: 'blue'})` 就可以修改元素的颜色成蓝色。

## 课后练习

* <a target="_blank" href="http://scriptoj.com/problems/12">覆盖默认样式</a>

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
