import{_ as s,o as a,c as n,a as l}from"./chunks/framework.9fab0263.js";const u=JSON.parse('{"title":"书签脚本","description":"收录一些实用的书签脚本，没想到书签还能这么玩","frontmatter":{"description":"收录一些实用的书签脚本，没想到书签还能这么玩"},"headers":[],"relativePath":"efficiency/bookmark-scripts.md","lastUpdated":1716978866000}'),o={name:"efficiency/bookmark-scripts.md"},p=l(`<h1 id="书签脚本" tabindex="-1">书签脚本 <a class="header-anchor" href="#书签脚本" aria-label="Permalink to &quot;书签脚本&quot;">​</a></h1><h2 id="回到顶部" tabindex="-1">回到顶部 <a class="header-anchor" href="#回到顶部" aria-label="Permalink to &quot;回到顶部&quot;">​</a></h2><p>只支持窗口滚动，不支持内联滚动</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">javascript</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">void</span><span style="color:#BABED8;"> (</span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">scrollingElement</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">scrollIntoView</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> behavior</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">smooth</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><a href="javascript:void(function(){document.scrollingElement.scrollIntoView({behavior:&#39;smooth&#39;})})()">回到顶部</a></p><h2 id="显示密码" tabindex="-1">显示密码 <a class="header-anchor" href="#显示密码" aria-label="Permalink to &quot;显示密码&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">javascript</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">void</span><span style="color:#BABED8;"> (</span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelectorAll</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input[type=password]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">dom</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">dom</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setAttribute</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><a href="javascript:void(function(){document.querySelectorAll(&#39;input[type=password]&#39;).forEach(function(dom){dom.setAttribute(&#39;type&#39;,&#39;text&#39;)})})()">显示密码</a></p>`,8),e=[p];function t(r,c,i,F,y,D){return a(),n("div",null,e)}const m=s(o,[["render",t]]);export{u as __pageData,m as default};
