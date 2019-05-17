---
title:      "【JS基础整理】BOM 和 DOM"
subtitle:   "JavaScript基础知识整理——BOM 和 DOM"
date: 2019-03-16 10:51:24
catalog: true
tags:
    - JavaScript
    - BOM&DOM
categories: 
    - Web
---

# 前言

`BOM（Browser Object Model）`指的是**浏览器对象模型**，在我们使用浏览器时，会和浏览器有一定的交互，比如移动、调整浏览器大小；返回上一级或者下一级页面等。这些事件和方法就属于`BOM`。详细的说明可以查看W3C的[Browser对象][1]。  
`DOM（Document Object Model）`指的是**文档对象模型**，在浏览器载入HTML文档时，就会成为Document对象，这个对象可以让我们访问到HTML页面中的所有元素。详细的说明可以查看W3C的[HTML DOM Document 对象][2]。  

# BOM

BOM（Browser Object Model）浏览器对象模型，BOM就是JavaScript获取记忆管理各个浏览器的内容。通过什么方式来管理浏览器？ 主要就是通过window对象。我们可以在浏览器（谷歌）按`F12`，打开控制台，直接输入`window`或者`this`。就可以看到打印出的`window`对象。  

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-1.png" />

当我们定义一个全局变量或者函数时，这个变量或函数就是挂载到window上，成为window的属性或函数。  

```js
// 变量
var a_global = "Here is Fz'Blog";

console.log(a_global);        // Here is Fz'Blog
console.log(window.a_global); // Here is Fz'Blog

// 函数
function a_welcome() {
    console.log("Welcome to Fz'Blog");
}

a_welcome();        // Welcome to Fz'Blog 
window.a_welcome(); // Welcome to Fz'Blog
```

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-2.png" /> 

## window常用属性

在我们与浏览器交互时，需要用到很对浏览器提供的接口属性。这部分常用的属性就在window对象上，比如`ducument`、`history`、`location`、`screen`和`navigator`等等。  

- **ducument**  
浏览器载入HTML文档都会成为`Document对象`。而`window.document`属性就是访问`Document对象`的入口。可以通过这个入口，访问页面上个每个DOM元素。详细的可以查看下面的DOM。  

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-3.png" /> 

- **history**  
`History对象`包含用户（在浏览器窗口中）访问过的 URL。`window.history`属性提供访问的入口。  

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-4.png" /> 

可以通过这个属性，实现按照历史记录返回上一页（`window.history.back`），跳转下一个（`window.history.forward`）或者跳转到具体页面（`window.history.go`）。  

- **location**  
`Location对象`包含有关当前 URL 的信息。可通过 `window.location` 属性来访问。

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-5.png" />  

可以通过这个属性，带本地缓存刷新页面（`window.location.reload()`），也可以禁用本地缓存刷新页面（`window.location.reload(true)`）。

- **screen**  
`Screen对象`包含有关客户端显示屏幕的信息。可通过 `window.screen` 属性来访问。

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-6.png" /> 

- **navigator**  
`Navigator对象`包含有关浏览器的信息。可通过 `window.navigator` 属性来访问。

<img class="shadow" alt="加载失败！" src="/img/article/js-base/bom-dom-7.png" />  

可以通过这个属性，判断当前设备。再做H5页面时，可能需求判断手机是安卓还是IOS，就可以通过这个属性来判断。

## window常用方法
 
浏览器提供了一些方法，使得我们更简单地实现对浏览器的交互。常用的包括`alert`、`confirm`、`close`、`open`、`resizeTo`和`scrollTo`等等。详细的这部分方法，可以查看[W3C的Window对象][3]。这些方法都可以完成一些浏览器操作，我们选择`open`方法简单实现下与浏览器的交互。  
`window.open` 用于打开一个新的浏览器窗口或查找一个已命名的窗口。

<p><span id="window-open-btn" style="text-decoration: underline;cursor: pointer;">点击看文章</span></p>

```js
// 第一个参数：指定打开的是哪个页面
// 第二个参数：是否是新窗口打开
// 第三个参数：指定窗口的位置以及大小，窗口的特性width，height，top，left，toolbar location是否显示地址栏 (IE有效)
window.open('https://fangzhioo.github.io/','blank','width=400px,height=600px,top=0,left=0,toolbar=yes,location=no;');
```

## window常用事件

浏览器为我们提供了很多事件，我们通过这些事件，可以完成很多的浏览器交互。比如`onscroll`、`onload`、`onresize`和`onreset`等等。浏览器提供的事件众多，这里我们选择`onscroll`事件来简单实现下对浏览器事件的处理。  
`window.onscroll`事件在元素滚动条在滚动时触发。我们可以滚动下页面，查看效果。  

<div style="border:1px solid #cfcfcf;padding:20px;text-align:center;" >距离顶部：<span style="color:red;font-weight:600;" id="window-onscroll-view">0</span> px</div>

```js
window.onscroll = function () {
    console.log(`距离顶部：${window.pageYOffset}px`)
}
```

## 定时器

定时器其实也算是window的常用方法，但由于比较特殊，这里单独列举下。定时器分为 **连续定时器** 和 **延时定时器**。  
**连续定时器** 方法是 `setInterval()` 按照指定的周期（以毫秒为单位）来调用函数或表达式。这种方式会不停地调用函数，直到浏览器窗口被关闭或者使用 `clearInterval()` 方法停止它。  
**延时定时器** 方法是 `setTimeout()` 按照指定的毫秒数之后调用函数或表达式，只会执行一次。在执行之前，关闭浏览器窗口或者使用`clearTimeout()` 方法停止它。  
定时器可以用来实现一些动画效果。我们运用定时器方法，来实现一个倒计时。  

<div style="border:1px solid #cfcfcf;padding:20px;text-align:center;color:red;" id="clock" >请开始倒计时！</div>
<div style="padding:20px 0;">
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" id="play" class="btn btn-default">开始</button>
        <button type="button" id="pause" class="btn btn-default">暂停</button>
        <button type="button" id="reset" class="btn btn-default">重置播放</button>
    </div>
</div>

下面也可以尝试自己定义倒计时的时间，单位为 **分钟** 。点击 **Let's Go!** 开始计时。  

<div class="input-group input-group-sm">
    <input type="number" id="input_clock" min="1" max="1440" class="form-control" value="3" placeholder="请输入倒计时">
    <span class="input-group-btn"><button class="btn btn-default" id="diy-clock-btn" type="button">Let's Go!</button></span>
</div>

```html
<div id="clock"></div>
<div>
    <button id="play">开始</button>
    <button id="pause">暂定</button>
    <button id="reset">重置</button>
</div>
```

```js
var clock = document.getElementById("clock");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var timer = null;
var countdown = 2 * 60 * 60 * 1000; // 120min
function run(T) {
    if (T <= 0) {
        // 已经过期了
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        countdown = 2 * 60 * 60 * 1000; // 120min
        clock.innerHTML = "时间到！！";
    } else {
        // 继续
        var H = Math.floor(T / 3600000) ? Math.floor(T / 3600000) : "00";
        var M = Math.floor(T % 3600000 / 60000) ? Math.floor(T % 3600000 / 60000) : "00";
        var S = Math.floor(T % 60000 / 1000);
        clock.innerHTML = `${H} : ${M} : ${S}`;
        countdown += -1000;
    }
}

play.onclick = function () {
    if (timer === null) {
        timer = setInterval(function () {
            run(countdown);
        }, 1000)
    }
}

pause.onclick = function () {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

reset.onclick = function () {
    pause.click();
    countdown = 2 * 60 * 60 * 1000; // 120min
    play.click();
}
```

# DOM



---

<script async defer src="/js/js-base-bom-dom.js"></script>

[1]: http://www.w3school.com.cn/jsref/dom_obj_window.asp
[2]: http://www.w3school.com.cn/jsref/dom_obj_document.asp
[3]: http://www.w3school.com.cn/jsref/dom_obj_window.asp