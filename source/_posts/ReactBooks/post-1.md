---
title:      【转载】React.js简介
subtitle:   React小书by胡子大哈
keyword:    React.js,React.js 简介,React.js 小书,React.js 教程
date: 2019-05-04 14:08:52
catalog: true
header-img:
tags:
    - React
categories: 
    - Reprint
---

#前言

之前在学习React.js，看到这个大佬的文章，个人觉得受益良多。但不知道什么原因，我经常不能正常访问[大佬的站点][47]。于是，将大佬的文章转载到自己的站点中。如果能访问，可以去大佬的站点查看。  
下面就是大佬关于React.js的相关文章，希望对大家有帮助。

# React.js 简介

> React.js 小书是一个开源、免费、专业、简单的 React.js 教程。本文是对于 React.js 小书的简介，是本教程提纲挈领的部分。让你用最少的精力深入了解实战中最需要的 React.js 知识。  
tags: [React.js,React.js 简介,React.js 小书,React.js 教程]

React.js 是一个帮助你构建页面 UI 的库。如果你熟悉 MVC 概念的话，那么 React 的组件就相当于 MVC 里面的 View。如果你不熟悉也没关系，你可以简单地理解为，React.js 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

一个组件的显示形态和行为有可能是由某些数据决定的。而数据是可能发生改变的，这时候组件的显示形态就会发生相应的改变。而 React.js 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。

React.js 不是一个框架，它只是一个库。它只提供 UI （view）层面的解决方案。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 Redux、React-router 等来协助提供完整的解决方法。

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
[47]: http://huziketang.com

* * *  

<ul style='font-size: 14px; margin-top: -10px;'>
  <li>
    作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a>
  </li>
  <li>
    原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a>
  </li>
</ul>
