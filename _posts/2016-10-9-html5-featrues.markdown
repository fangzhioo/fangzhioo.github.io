---
layout:     post
title:      "HTML5新特性"
subtitle:   "canvas画布、video视频、audio音频"
author:     "Fz"
header-style: "text"
catalog: true
tags:
    - HTML5
    - 前端
---

# 前言

最近因为博客的开通，想着把之前的学习笔记整理下。所以这里并不是教程什么的，单纯的是整理下最初的学习记录，也算是回顾下以前的知识。  
作为前端，`HTML`和`CSS`是最基础的技能点。只有充分理解和掌握了这方面的知识，才能创造出更优质的界面。  

# HTML简介

超文本标记语言（Hyper Text Markup Language），它通过标记符号来标记要显示的网页中的各个部分。网页文件本身是一种文本文件，通过在文本文件中添加标记符，为其添加语义，可以告诉浏览器如何显示其中的内容（如：文字处理，画面安排，图片显示等）。  
**HTML一句话，就是给文本添加语义的，在HTML标签的世界中，除了语义之外，其它的一概没有！**  

# HTML骨架结构

```html
<!DOCTYPE html>
<html>
    <head lang="en">
        <meta charset="utf-8" />
        <title>哔哩哔哩</title>
        <meta name="Keywords" content="HTML,CSS,博客" />
        <meta name="Description" content="HTML牛批！" />
        <link rel="icon" href="favicon.ico" />
    </head>
    <body>
        Hello World ！！！
    </body>
</html>
```  

- `<!DOCTYPE html>` 文档类型声明：这句话是告诉浏览器我这是一个什么类型的文档，你要按照什么类型来给我渲染；  
- `<html></html>` 作为文档根元素，包含一个不可见的 `head` 和一个可见的 `body`；  
- `<head lang="en"></head>` 规定文档相关的通用信息（元数据），包括文档的标题，文档的样式和脚本的链接（定义）等，head后面的 `lang="en"`是对语言进行设置；  
- `<meta charset="utf-8" />` `<meta />`用来设置元数据内容，这里的`charset="utf-8"`表示字符集设置为**utf-8**；同理，下面的 `<meta name="Keywords" content="HTML,CSS,博客" />` 、`<meta name="Description" content="HTML牛批！" />` 分别表示关键字和描述，多用于SEO优化；  
- `<title>哔哩哔哩</title>` 设置网页地址栏主标题；  
- `<link rel="icon" href="favicon.ico" />` 指定了外部资源与当前文档的关系，多用于外链css文件。rel是告诉浏览器我这是一个什么类型的外链东西，href标明了链接这个东西的地址或者路径。这里的`rel="icon" href="favicon.ico"`是对网站的地址栏设置logo；  
- `<body></body>` 表示的是HTML文档的主体内容，也是我们最在意的部分，这部分会显示在浏览器上。任何一个HTML文档，只允许存在一个 `<body>` 元素。  

# HTML标签

HTML文档就是由一系列 HTML元素定义的。这些元素由HTML标签包裹并为其添加语义，比如`<h1>我是标题</h1>`，文本内容 “我是标题” 因为被h1标签包裹，才让浏览器得知这是个标题，然后按照标题的样式渲染。  
一般来说标签都是**双标签**（如`<p></p>`、`<h1></h1>`等），但也有**单标签**（如`<img />`、`<br />`等）。不管是哪一种，标签都需要闭合。  
HTML标签众多，详细的可以去 [W3school][2] 或者 [腾讯云-开发者手册][3] 查看详细。这里就不展开了。  

---  

# HTML5新标签

虽然标签众多，但是早期的标签有许多并非单纯的表达语义的，比如 `<b></b>`、`<em></em>`等，只是改变了样式，这违背了之前添加语义的初衷，所以HTML5新标准中，许多标签被废弃。  
除了这些[被废弃的标签][4]，HTML5中也新增了许多更具有语义化的标签，这里我们着重讲一讲这些有趣的[HTML5新标签][1]。  



---  
[1]: http://www.w3school.com.cn/html/html5_intro.asp  
[2]: http://www.w3school.com.cn/html/html_elements.asp  
[3]: https://cloud.tencent.com/developer/chapter/13536  
[4]: https://cloud.tencent.com/developer/chapter/13538