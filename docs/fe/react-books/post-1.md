# 【React.js 小书】React.js 简介

之前在学习 React.js，看到这个大佬的文章，个人觉得受益良多。但不知道什么原因，我经常不能正常访问[大佬的站点](http://huziketang.com)。于是，将大佬的文章转载到自己的站点中。如果能访问，可以去大佬的站点查看。  
下面就是大佬关于 React.js 的相关文章，希望对大家有帮助。

## React.js 简介

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。

React.js 是一个帮助你构建页面 UI 的库。如果你熟悉 MVC 概念的话，那么 React 的组件就相当于 MVC 里面的 View。如果你不熟悉也没关系，你可以简单地理解为，React.js 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

一个组件的显示形态和行为有可能是由某些数据决定的。而数据是可能发生改变的，这时候组件的显示形态就会发生相应的改变。而 React.js 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。

React.js 不是一个框架，它只是一个库。它只提供 UI （view）层面的解决方案。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 Redux、React-router 等来协助提供完整的解决方法。

我们将按照下面的步骤来一步一步来：

- [前端组件化（一）：从一个简单的例子讲起](/fe/react-books/post-2)
- [前端组件化（二）：优化 DOM 操作](/fe/react-books/post-3)
- [前端组件化（三）：抽象出公共组件类](/fe/react-books/post-4)
- [React.js 基本环境安装](/fe/react-books/post-5)
- [使用 JSX 描述 UI 信息](/fe/react-books/post-6)
- [组件的 render 方法](/fe/react-books/post-7)
- [组件的组合、嵌套和组件树](/fe/react-books/post-8)
- [事件监听](/fe/react-books/post-9)
- [组件的 state 和 setState](/fe/react-books/post-10)
- [配置组件的 props](/fe/react-books/post-11)
- [state vs props](/fe/react-books/post-12)
- [渲染列表数据](/fe/react-books/post-13)
- [实战分析：评论功能（一）](/fe/react-books/post-14)
- [实战分析：评论功能（二）](/fe/react-books/post-15)
- [实战分析：评论功能（三）](/fe/react-books/post-16)
- [前端应用状态管理 —— 状态提升](/fe/react-books/post-17)
- [挂载阶段的组件生命周期（一）](/fe/react-books/post-18)
- [挂载阶段的组件生命周期（二）](/fe/react-books/post-19)
- [更新阶段的组件生命周期](/fe/react-books/post-20)
- [ref 和 React.js 中的 DOM 操作](/fe/react-books/post-21)
- [props.children 和容器类组件](/fe/react-books/post-22)
- [dangerouslySetHTML 和 style 属性](/fe/react-books/post-23)
- [PropTypes 和组件参数验证](/fe/react-books/post-24)
- [实战分析：评论功能（四）](/fe/react-books/post-25)
- [实战分析：评论功能（五）](/fe/react-books/post-26)
- [实战分析：评论功能（六）](/fe/react-books/post-27)
- [高阶组件（Higher-Order Components）](/fe/react-books/post-28)
- [React.js 的 context](/fe/react-books/post-29)
- [动手实现 Redux（一）：优雅地修改共享状态](/fe/react-books/post-30)
- [动手实现 Redux（二）：抽离 store 和监控数据变化](/fe/react-books/post-31)
- [动手实现 Redux（三）：纯函数（Pure Function）简介](/fe/react-books/post-32)
- [动手实现 Redux（四）：共享结构的对象提高性能](/fe/react-books/post-33)
- [动手实现 Redux（五）：不要问为什么的 reducer](/fe/react-books/post-34)
- [动手实现 Redux（六）：Redux 总结](/fe/react-books/post-35)
- [动手实现 React-redux（一）：初始化工程](/fe/react-books/post-36)
- [动手实现 React-redux（二）：结合 context 和 store](/fe/react-books/post-37)
- [动手实现 React-redux（三）：connect 和 mapStateToProps](/fe/react-books/post-38)
- [动手实现 React-redux（四）：mapDispatchToProps](/fe/react-books/post-39)
- [动手实现 React-redux（五）：Provider](/fe/react-books/post-40)
- [动手实现 React-redux（六）：React-redux 总结](/fe/react-books/post-41)
- [使用真正的 Redux 和 React-redux](/fe/react-books/post-42)
- [Smart 组件 vs Dumb 组件](/fe/react-books/post-43)
- [实战分析：评论功能（七）](/fe/react-books/post-44)
- [实战分析：评论功能（八）](/fe/react-books/post-45)
- [实战分析：评论功能（九）](/fe/react-books/post-46)

---

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a>
  </li>
</ul>
