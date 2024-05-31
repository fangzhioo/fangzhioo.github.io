import{_ as s,o as a,c as n,a as e}from"./chunks/framework.9fab0263.js";const D=JSON.parse('{"title":"动手实现 Redux（六）：Redux 总结","description":"","frontmatter":{},"headers":[],"relativePath":"fe/react-books/post-35.md","lastUpdated":1716978866000}'),p={name:"fe/react-books/post-35.md"},l=e(`<h1 id="动手实现-redux-六-redux-总结" tabindex="-1">动手实现 Redux（六）：Redux 总结 <a class="header-anchor" href="#动手实现-redux-六-redux-总结" aria-label="Permalink to &quot;动手实现 Redux（六）：Redux 总结&quot;">​</a></h1><p>不知不觉地，到这里大家不仅仅已经掌握了 Redux，而且还自己动手写了一个 Redux。我们从一个非常原始的代码开始，不停地在发现问题、解决问题、优化代码的过程中进行推演，最后把 Redux 模式自己总结出来了。这就是所谓的 Redux 模式，我们再来回顾一下这几节我们到底干了什么事情。</p><p>我们从一个简单的例子的代码中发现了共享的状态如果可以被任意修改的话，那么程序的行为将非常不可预料，所以我们提高了修改数据的门槛：你必须通过 <code>dispatch</code> 执行某些允许的修改操作，而且必须大张旗鼓的在 <code>action</code> 里面声明。</p><p>这种模式挺好用的，我们就把它抽象出来一个 <code>createStore</code>，它可以产生 <code>store</code>，里面包含 <code>getState</code> 和 <code>dispatch</code> 函数，方便我们使用。</p><p>后来发现每次修改数据都需要手动重新渲染非常麻烦，我们希望自动重新渲染视图。所以后来加入了订阅者模式，可以通过 <code>store.subscribe</code> 订阅数据修改事件，每次数据更新的时候自动重新渲染视图。</p><p>接下来我们发现了原来的“重新渲染视图”有比较严重的性能问题，我们引入了“共享结构的对象”来帮我们解决问题，这样就可以在每个渲染函数的开头进行简单的判断避免没有被修改过的数据重新渲染。</p><p>我们优化了 <code>stateChanger</code> 为 reducer，定义了 reducer 只能是纯函数，功能就是负责初始 <code>state</code>，和根据 <code>state</code> 和 <code>action</code> 计算具有共享结构的新的 <code>state</code>。</p><p><code>createStore</code> 现在可以直接拿来用了，套路就是：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 定一个 reducer</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">reducer</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">state</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">action</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">/* 初始化 state 和 switch case */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 生成 store</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> store </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">createStore</span><span style="color:#BABED8;">(reducer)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 监听数据变化重新渲染页面</span></span>
<span class="line"><span style="color:#BABED8;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">subscribe</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">renderApp</span><span style="color:#BABED8;">(store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getState</span><span style="color:#BABED8;">()))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 首次渲染页面</span></span>
<span class="line"><span style="color:#82AAFF;">renderApp</span><span style="color:#BABED8;">(store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getState</span><span style="color:#BABED8;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 后面可以随意 dispatch 了，页面自动更新</span></span>
<span class="line"><span style="color:#BABED8;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dispatch</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">...</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>现在的代码跟 React.js 一点关系都没有，接下来我们要把 React.js 和 Redux 结合起来，用 Redux 模式帮助管理 React.js 的应用状态。</p><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ul><li><a target="_blank" href="http://scriptoj.com/problems/16">实现 Users Reducer</a></li></ul><hr><ul style="font-size:14px;margin-top:-10px;"><li> 作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a></li><li> 原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a></li></ul>`,14),o=[l];function t(c,r,i,d,u,y){return a(),n("div",null,o)}const A=s(p,[["render",t]]);export{D as __pageData,A as default};