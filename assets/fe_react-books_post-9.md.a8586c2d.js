import{_ as s,o as n,c as a,a as l}from"./chunks/framework.9fab0263.js";const B=JSON.parse('{"title":"事件监听","description":"","frontmatter":{},"headers":[],"relativePath":"fe/react-books/post-9.md","lastUpdated":1716978866000}'),e={name:"fe/react-books/post-9.md"},p=l(`<h1 id="事件监听" tabindex="-1">事件监听 <a class="header-anchor" href="#事件监听" aria-label="Permalink to &quot;事件监听&quot;">​</a></h1><blockquote><p>React.js 小书是一个开源、免费、专业、简单的 React.js 教程。</p></blockquote><p>在 React.js 里面监听事件是很容易的事情，你只需要给需要监听事件的元素加上属性类似于 <code>onClick</code>、<code>onKeyDown</code> 这样的属性，例如我们现在要给 <code>Title</code> 加上点击的事件监听：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Title</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">extends</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">handleClickOnTitle</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Click on title.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onClick</span><span style="color:#89DDFF;">={this.</span><span style="color:#BABED8;">handleClickOnTitle</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#BABED8;">React 小书</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>只需要给 <code>h1</code> 标签加上 <code>onClick</code> 的事件，<code>onClick</code> 紧跟着是一个表达式插入，这个表达式返回一个 <code>Title</code> 自己的一个实例方法。当用户点击 <code>h1</code> 的时候，React.js 就会调用这个方法，所以你在控制台就可以看到 <code>Click on title.</code> 打印出来。</p><p>在 React.js 不需要手动调用浏览器原生的 <code>addEventListener</code> 进行事件监听。React.js 帮我们封装好了一系列的 <code>on*</code> 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 <code>on*</code> 就可以了。而且你不需要考虑不同浏览器兼容性的问题，React.js 都帮我们封装好这些细节了。</p><p>React.js 封装了不同类型的事件，这里就不一一列举，有兴趣的同学可以参考官网文档： <a href="https://facebook.github.io/react/docs/events.html#supported-events" target="_blank" rel="noreferrer">SyntheticEvent - React</a>，多尝试不同的事件。另外要注意的是，这些事件属性名都必须要用驼峰命名法。</p><p>没有经过特殊处理的话，_这些 <code>on_</code> 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上*。也就是说，<code>&lt;Header onClick={…} /&gt;</code>这样的写法不会有什么效果的。这一点要注意，但是有办法可以做到这样的绑定，以后我们会提及。现在只要记住一点就可以了：这些<code>on\\*</code> 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。</p><h2 id="event-对象" tabindex="-1">event 对象 <a class="header-anchor" href="#event-对象" aria-label="Permalink to &quot;event 对象&quot;">​</a></h2><p>和普通浏览器一样，事件监听函数会被自动传入一个 <code>event</code> 对象，这个对象和普通的浏览器 <code>event</code> 对象所包含的方法和属性都基本一致。不同的是 React.js 中的 <code>event</code> 对象并不是浏览器提供的，而是它自己内部所构建的。React.js 将浏览器原生的 <code>event</code> 对象封装了一下，对外提供统一的 API 和属性，这样你就不用考虑不同浏览器的兼容性问题。这个 <code>event</code> 对象是符合 W3C 标准（ <a href="https://www.w3.org/TR/DOM-Level-3-Events/" target="_blank" rel="noreferrer">W3C UI Events</a> ）的，它具有类似于<code>event.stopPropagation</code>、<code>event.preventDefault</code> 这种常用的方法。</p><p>我们来尝试一下，这次尝试当用户点击 <code>h1</code> 的时候，把 <code>h1</code> 的 <code>innerHTML</code> 打印出来：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Title</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">extends</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">handleClickOnTitle</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">e</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">target</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">innerHTML</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onClick</span><span style="color:#89DDFF;">={this.</span><span style="color:#BABED8;">handleClickOnTitle</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#BABED8;">React 小书</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>再看看控制台，每次点击的时候就会打印”React 小书“。</p><h2 id="关于事件中的-this" tabindex="-1">关于事件中的 this <a class="header-anchor" href="#关于事件中的-this" aria-label="Permalink to &quot;关于事件中的 this&quot;">​</a></h2><p>一般在某个类的实例方法里面的 <code>this</code> 指的是这个实例本身。但是你在上面的 <code>handleClickOnTitle</code> 中把 <code>this</code> 打印出来，你会看到 <code>this</code> 是 <code>null</code> 或者 <code>undefined</code>。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">handleClickOnTitle</span><span style="color:#BABED8;"> (e) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// =&gt; null or undefined</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（<code>this.handleClickOnTitle</code>），而是直接通过函数调用 （<code>handleClickOnTitle</code>），所以事件监听函数内并不能通过 <code>this</code> 获取到实例。</p><p>如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 <code>bind</code> 到当前实例上再传入给 React.js。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Title</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">extends</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">handleClickOnTitle</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onClick</span><span style="color:#89DDFF;">={this.</span><span style="color:#BABED8;">handleClickOnTitle</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">this</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#BABED8;">React 小书</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><code>bind</code> 会把实例方法绑定到当前实例上，然后我们再把绑定后的函数传给 React.js 的 <code>onClick</code> 事件监听。这时候你再看看，点击 <code>h1</code> 的时候，就会把当前的实例打印出来：</p><p><a href="http://huzidaha.github.io/static/assets/img/posts/07937EC0-AAFE-4FD5-ABB7-06A69EBF54C7.png" target="_blank"><img src="http://huzidaha.github.io/static/assets/img/posts/07937EC0-AAFE-4FD5-ABB7-06A69EBF54C7.png" alt="React.js 小书事件监听图片"></a></p><p>你也可以在 <code>bind</code> 的时候给事件监听函数传入一些参数：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Title</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">extends</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">handleClickOnTitle</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">word</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">word</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onClick</span><span style="color:#89DDFF;">={this.</span><span style="color:#BABED8;">handleClickOnTitle</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">this,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#BABED8;">React 小书</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>这种 <code>bind</code> 模式在 React.js 的事件监听当中非常常见，<code>bind</code> 不仅可以帮我们把事件监听方法中的 <code>this</code> 绑定到当前组件实例上；还可以帮助我们在在渲染列表元素的时候，把列表元素传入事件监听函数当中——这个将在以后的章节提及。</p><p>如果有些同学对 JavaScript 的 <code>this</code> 模式或者 <code>bind</code> 函数的使用方式不是特别了解到话，可能会对这部分内容会有些迷惑，可以补充对 JavaScript 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this" target="_blank" rel="noreferrer">this</a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank" rel="noreferrer">bind</a> 相关的知识再来回顾这部分内容。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>为 React 的组件添加事件监听是很简单的事情，你只需要使用 React.js 提供了一系列的 <code>on*</code> 方法即可。</p><p>React.js 会给每个事件监听传入一个 <code>event</code> 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。</p><p>React.js 的事件监听方法需要手动 <code>bind</code> 到当前实例，这种模式在 React.js 中非常常用。</p><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ul><li><a target="_blank" href="http://scriptoj.com/problems/5">不能摸的狗（一）</a></li></ul><hr><ul style="font-size:14px;margin-top:-10px;"><li> 作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha" target="_blank">胡子大哈</a></li><li> 原文链接：<a href="http://huziketang.com/books/react"> http://huziketang.com/books/react</a></li></ul>`,33),o=[p];function c(t,r,i,F,y,D){return n(),a("div",null,o)}const b=s(e,[["render",c]]);export{B as __pageData,b as default};
