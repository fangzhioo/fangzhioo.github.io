import{_ as e,o as a,c as t,a as o}from"./chunks/framework.9fab0263.js";const n=JSON.parse('{"title":"【React.js 小书】React.js 简介","description":"","frontmatter":{},"headers":[],"relativePath":"fe/react-books/post-1.md","lastUpdated":1716978866000}'),r={name:"fe/react-books/post-1.md"},s=o('<h1 id="【react-js-小书】react-js-简介" tabindex="-1">【React.js 小书】React.js 简介 <a class="header-anchor" href="#【react-js-小书】react-js-简介" aria-label="Permalink to &quot;【React.js 小书】React.js 简介&quot;">​</a></h1><p>之前在学习 React.js，看到这个大佬的文章，个人觉得受益良多。但不知道什么原因，我经常不能正常访问<a href="http://huziketang.com" target="_blank" rel="noreferrer">大佬的站点</a>。于是，将大佬的文章转载到自己的站点中。如果能访问，可以去大佬的站点查看。<br> 下面就是大佬关于 React.js 的相关文章，希望对大家有帮助。</p><h2 id="react-js-简介" tabindex="-1">React.js 简介 <a class="header-anchor" href="#react-js-简介" aria-label="Permalink to &quot;React.js 简介&quot;">​</a></h2><blockquote><p>React.js 小书是一个开源、免费、专业、简单的 React.js 教程。</p></blockquote><p>React.js 是一个帮助你构建页面 UI 的库。如果你熟悉 MVC 概念的话，那么 React 的组件就相当于 MVC 里面的 View。如果你不熟悉也没关系，你可以简单地理解为，React.js 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。</p><p>一个组件的显示形态和行为有可能是由某些数据决定的。而数据是可能发生改变的，这时候组件的显示形态就会发生相应的改变。而 React.js 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。</p><p>React.js 不是一个框架，它只是一个库。它只提供 UI （view）层面的解决方案。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 Redux、React-router 等来协助提供完整的解决方法。</p><p>我们将按照下面的步骤来一步一步来：</p><ul><li><a href="/fe/react-books/post-2">前端组件化（一）：从一个简单的例子讲起</a></li><li><a href="/fe/react-books/post-3">前端组件化（二）：优化 DOM 操作</a></li><li><a href="/fe/react-books/post-4">前端组件化（三）：抽象出公共组件类</a></li><li><a href="/fe/react-books/post-5">React.js 基本环境安装</a></li><li><a href="/fe/react-books/post-6">使用 JSX 描述 UI 信息</a></li><li><a href="/fe/react-books/post-7">组件的 render 方法</a></li><li><a href="/fe/react-books/post-8">组件的组合、嵌套和组件树</a></li><li><a href="/fe/react-books/post-9">事件监听</a></li><li><a href="/fe/react-books/post-10">组件的 state 和 setState</a></li><li><a href="/fe/react-books/post-11">配置组件的 props</a></li><li><a href="/fe/react-books/post-12">state vs props</a></li><li><a href="/fe/react-books/post-13">渲染列表数据</a></li><li><a href="/fe/react-books/post-14">实战分析：评论功能（一）</a></li><li><a href="/fe/react-books/post-15">实战分析：评论功能（二）</a></li><li><a href="/fe/react-books/post-16">实战分析：评论功能（三）</a></li><li><a href="/fe/react-books/post-17">前端应用状态管理 —— 状态提升</a></li><li><a href="/fe/react-books/post-18">挂载阶段的组件生命周期（一）</a></li><li><a href="/fe/react-books/post-19">挂载阶段的组件生命周期（二）</a></li><li><a href="/fe/react-books/post-20">更新阶段的组件生命周期</a></li><li><a href="/fe/react-books/post-21">ref 和 React.js 中的 DOM 操作</a></li><li><a href="/fe/react-books/post-22">props.children 和容器类组件</a></li><li><a href="/fe/react-books/post-23">dangerouslySetHTML 和 style 属性</a></li><li><a href="/fe/react-books/post-24">PropTypes 和组件参数验证</a></li><li><a href="/fe/react-books/post-25">实战分析：评论功能（四）</a></li><li><a href="/fe/react-books/post-26">实战分析：评论功能（五）</a></li><li><a href="/fe/react-books/post-27">实战分析：评论功能（六）</a></li><li><a href="/fe/react-books/post-28">高阶组件（Higher-Order Components）</a></li><li><a href="/fe/react-books/post-29">React.js 的 context</a></li><li><a href="/fe/react-books/post-30">动手实现 Redux（一）：优雅地修改共享状态</a></li><li><a href="/fe/react-books/post-31">动手实现 Redux（二）：抽离 store 和监控数据变化</a></li><li><a href="/fe/react-books/post-32">动手实现 Redux（三）：纯函数（Pure Function）简介</a></li><li><a href="/fe/react-books/post-33">动手实现 Redux（四）：共享结构的对象提高性能</a></li><li><a href="/fe/react-books/post-34">动手实现 Redux（五）：不要问为什么的 reducer</a></li><li><a href="/fe/react-books/post-35">动手实现 Redux（六）：Redux 总结</a></li><li><a href="/fe/react-books/post-36">动手实现 React-redux（一）：初始化工程</a></li><li><a href="/fe/react-books/post-37">动手实现 React-redux（二）：结合 context 和 store</a></li><li><a href="/fe/react-books/post-38">动手实现 React-redux（三）：connect 和 mapStateToProps</a></li><li><a href="/fe/react-books/post-39">动手实现 React-redux（四）：mapDispatchToProps</a></li><li><a href="/fe/react-books/post-40">动手实现 React-redux（五）：Provider</a></li><li><a href="/fe/react-books/post-41">动手实现 React-redux（六）：React-redux 总结</a></li><li><a href="/fe/react-books/post-42">使用真正的 Redux 和 React-redux</a></li><li><a href="/fe/react-books/post-43">Smart 组件 vs Dumb 组件</a></li><li><a href="/fe/react-books/post-44">实战分析：评论功能（七）</a></li><li><a href="/fe/react-books/post-45">实战分析：评论功能（八）</a></li><li><a href="/fe/react-books/post-46">实战分析：评论功能（九）</a></li></ul><hr><ul style="font-size:14px;margin-top:-10px;"><li> 作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a></li><li> 原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a></li></ul>',11),i=[s];function l(c,f,p,h,k,b){return a(),t("div",null,i)}const u=e(r,[["render",l]]);export{n as __pageData,u as default};