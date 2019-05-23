---
title:      HTML5新特性
subtitle:   网页多媒体 —— video 和 audio
keyword:    HTML5, 网页多媒体, video, audio
date: 2017-09-18 10:51:24
catalog: true
tags:
    - HTML5
categories: 
    - Web
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

这里介绍下HTML5中的网页多媒体标签，HTML5 通过HTML标签 `audio` 和 `video` 来支持嵌入式的媒体，使开发者能够方便地将媒体嵌入到HTML文档中。

## audio

`audio` 是HTML5提供的播放音频文件的标准。  

<div class="ele-box">
    <audio id="audioplayer" controls>
        <source src="http://music.163.com/song/media/outer/url?id=705376.mp3" type="audio/mpeg">
        您的浏览器不支持 audio 标签。
    </audio>
</div>

```html
<audio id="audioplayer" controls>  
    <source src="music.ogg" type="audio/ogg">
    <source src="music.mp3" type="audio/mpeg">
    您的浏览器不支持 audio 标签。
</audio>
```

可以用 `<source/>` 标签来指定多个文件，以为不同的浏览提供可支持编码的格式。其支持一下MIME类型：  

| Format | MIME-TYPE |  
| :--: | :--: |  
| MP3 | audio/mpeg |  
| Ogg | audio/ogg |  
| Wav | audio/wav |  

`audio` 常用到的属性包括以下几个:  

- `controls` 显示音乐控件（播放，暂定，音量等控件）  
- `autopaly` 自动播放  
- `loop`     在播放完成后循环
- `preload`  在网页加载过程中加载音乐文件，有三个值可以设置，`"none"` 表示不缓冲；`"auto"` 表示缓冲音频文件；`metadata` 表示仅仅缓冲文件的元数据。如果设置了`autoplay`，则此属性无效。  

到这里，`audio`的用法和属性基本就介绍完了，但是在使用的时候，因为实际需求和美观度，我们不会直接使用标签提供的控件，也不会直接展示标签。这就需要我们自定义了。下面我们就来介绍下`audio`标签的事件，然后去自定义一个音乐播放器吧！  

<div class="ele-box">
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" id="play" class="btn btn-default">播放</button>
        <button type="button" id="pause" class="btn btn-default">暂停</button>
        <button type="button" id="stop" class="btn btn-default">停止播放</button>
        <button type="button" id="reset" class="btn btn-default">重置播放</button>
        <button type="button" id="stopvol" class="btn btn-default">静音</button>
    </div>
    <div style="display:flex;align-item:center;">
        <input type="range" style="max-width:300px;margin-top:20px;" name="vol" id="volbt" value="50" max="100" min="0"/>
        <span id="vol" style="display:inline-block;padding-left:20px;">50</span>
    </div>
</div>

```html
<button id="play">播放</button>  
<button id="pause">暂停</button>  
<button id="stop">停止播放</button>  
<button id="reset">重置播放</button>  
<button id="stopvol">静音</button>  
<input type="range" name="vol" id="vol" value="50" max="100" min="0"/><span id="vol">50</span>
```

```js
var audioplayer = document.getElementById("audioplayer"); //获取到播放器示例
// 获取各个自定义的按钮
var playbt= document.getElementById("play");
var stopbt= document.getElementById("stop");
var pause= document.getElementById("pause");
var resetbt= document.getElementById("reset");
var stopVolbt=document.getElementById("stopvol");
var volbt= document.getElementById("volbt");
var vol = document.getElementById("vol");
var flag=true;//记录是否静音
var volValue= 0.5; //记录静音前 你的音量 音乐最大值是1，最小值是0

playbt.onclick=function(){  //播放
    audioplayer.play();
}

pause.onclick=function(){  //暂停
    audioplayer.pause();
}

stopbt.onclick=function(){  //停止播放
    audioplayer.pause();
    audioplayer.currentTime=0; //当前播放的时间
}

resetbt.onclick=function(){  //重置播放
    stopbt.click();
    audioplayer.play();
}

stopVolbt.onclick=function(){   // 静音
    if(flag){
        audioplayer.volume=0;
        stopVolbt.innerText="开启静音";
        volbt.value=0;
        vol.innerHTML = 0;
    }else{
        audioplayer.volume=volValue;
        stopVolbt.innerText="静音";
        volbt.value=volValue*100;
        vol.innerHTML = volValue*100;
    }
    flag=!flag;
}

volbt.oninput=function(){   //音量控制
    vol.innerHTML = this.value;
    audioplayer.volume=this.value/100;
    volValue=audioplayer.volume;
}
```

这样，我们就通过自己定义的控件，实现对音乐的播放控制。但是只有这些还是不够的，音乐播放除了控件，我们还需要进度的显示、时间的显示，那我们继续来自定义进度。  
首先我们完成做一个进度条。  

<div class="ele-box">
    <div id="a-bar" class="bar">
        <div id="a-bar_content" class="bar_content"></div>
        <div id="musicTime" class="bar_time"></div>
    </div>
</div>

```html
<!--进度条-->
<div id="a-bar" class="bar">
    <div id="a-bar_content" class="bar_content"></div>
    <div id="musicTime" class="bar_time"></div>
</div>
```

```css
.bar{
    position: relative;
    width: 240px;
    height: 20px;
    background: white;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid gray;
}
.bar_content{
    width: 0px;
    height: 18px;
    background-color: gray;
    background-image: repeating-linear-gradient(-45deg,red,gold 30px,yellow 30px,green 60px);
    background-size: 600px 100%;
    animation: mymove 12s linear infinite;
    border-radius: 5px;
}
.bar_time{
    width:100px;
    height: 20px;
    line-height: 20px;
    text-align: right;
    position: absolute;
    right: -85px;
    top: 0;
}
@keyframes mymove{
    from{background-position: 0% 0%;}
    to{background-position: 600px 0%;}
}
```

再添加上对播放进度的监听和进度条拖动的事件。  

```js
//获取进度条
var timer = null;
var barContent = document.getElementById("a-bar_content");
var musicTime = document.getElementById("musicTime");
//进度条
function change() {
    musicTime.innerHTML = (function () {
        var t = Math.round(audioplayer.currentTime); // 当前已经播放的时间
        var dt = Math.round(audioplayer.duration);  // 音乐的完整时间
        return (Math.floor(t / 60) + ":" + t % 60 + " / " + Math.floor(dt / 60) + ":" + (dt % 60));
    })()

    // 240为设计的进度条总长度
    barContent.style.width = audioplayer.currentTime / audioplayer.duration * 240 + "px";
    if (audioplayer.currentTime === audioplayer.duration) {
        clearInterval(timer); // 播放结束
    } else {
        timer = setTimeout(change, 100)
    }
}
change();

//进度条方向控制 
var bar = document.getElementById("a-bar");
bar.onclick = function (e) {
    oEvent = e || window.event;
    barContent.style.width = oEvent.offsetX + "px";
    barContent.style.transition = "width 0.1s ease";
    audioplayer.currentTime = oEvent.offsetX / 240 * audioplayer.duration;
}
```

最后别忘了在前面控件事件的地方加上对进度条的控制。做完这些，一个美（chou）观（lou）的播放器就完成了。当然，你完全可以发挥自己的设计能力，设计出一个更好看更实用的播放器，甚至可以加上歌词的滚动或是类似网易云音乐那样黑胶唱片播放的效果。  

在这里，你可以选择播放的本地文件来测试下播放器。

<div class="ele-box">
    <div style="font-size:20px;font-weight:600;padding:10px 0;"> 文件：<span id="musicName"></span></div>
    <div><button id="btn" type="button" class="btn btn-default">选择文件</button></div>
    <input id="input_file" style="display: none;" type="file" value="" />
</div>

或者资源外链来测试。  

<div class="ele-box">
    <div class="input-group input-group-sm">
      <input type="text" id="input_link" class="form-control" value="http://music.163.com/song/media/outer/url?id=705376.mp3" placeholder="请输入资源外链">
      <span class="input-group-btn">
        <button class="btn btn-default" id="btn2" type="button">Let's Go!</button>
      </span>
    </div>
</div>

这里顺便记录下，如何获取**网易云音乐有效永久外链**？
想获取一首歌的外链时，需要获取到歌曲的ID。你可以在播放页面点击 **分享** -> **复制链接**，粘贴出来就能看到ID了。再将获取ID填入这个地址（`http://music.163.com/song/media/outer/url?id=你获取的ID.mp3`）中，就可以得到有效永久外链了。  

## video

`video` 标签定义视频，比如电影片段或其他视频流。

<div class="video-ele-box">
    <video id="videoplayer" poster="https://tuimeizi.cn/pure?w=600&h=350&s=0" controls width="100%" height="100%">
        <source src="https://www.apacara.com/media/video/myVideo.mp4" type="video/mp4" />
        <source src="https://www.apacara.com/media/video/myVideo.ogv" type="video/ogg" />
        <source src="https://www.apacara.com/media/video/myVideo.webm" type="video/webm" />
        <object width="800" height="500" type="application/x-shockwave-flash" data="video.swf">
            <param name="movie" value="myvideo.swf" />
            <param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
        </object>
        您的浏览器不支持 video 标签。
    </video>
</div>

```html
<video id="videoplayer" poster="poster.png" controls width="100%" height="100%">
    <source src="myvideo.mp4" type="video/mp4" />
    <source src="myvideo.ogv" type="video/ogg" />
    <source src="myvideo.webm" type="video/webm" />
    <source src="myvideo.rmvb" type="video/webm" />
    <object width="800" height="500" type="application/x-shockwave-flash" data="video.swf">
        <param name="movie" value="myvideo.swf" />
        <param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
    </object>
    您的浏览器不支持 video 标签。
</video>
```

可以用 `<source/>` 标签来指定多个文件，以为不同的浏览提供可支持编码的格式。其支持一下MIME类型：

| Format | MIME-TYPE |  
| :--: | :--: |  
| MP4 | video/mp4 |  
| WebM | video/webm |  
| Ogg | video/ogg |  

`video` 常用到的属性与 `audio` 基本一致，包括一下几个：

- `controls` 显示音乐控件（播放，暂定，音量等控件）  
- `autopaly` 自动播放  
- `loop`     在播放完成后循环  
- `poster`   视频封面海报
- `preload`  在网页加载过程中加载音乐文件，有三个值可以设置，`"none"` 表示不缓冲；`"auto"` 表示缓冲音频文件；`metadata` 表示仅仅缓冲文件的元数据。如果设置了`autoplay`，则此属性无效。  

`video` 和 `audio` 都属于网页多媒体，属性和操作都十分类似。我们用同样的方式，来帮助理解自定义视频播放器。详细的这里就不做介绍了，直接放代码了！  

<div class="ele-box">
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" id="v-play" class="btn btn-default">播放</button>
        <button type="button" id="v-pause" class="btn btn-default">暂停</button>
        <button type="button" id="v-stop" class="btn btn-default">停止播放</button>
        <button type="button" id="v-reset" class="btn btn-default">重置播放</button>
        <button type="button" id="v-stopvol" class="btn btn-default">静音</button>
        <button type="button" id="v-full" class="btn btn-default">全屏</button>
    </div>
    <div style="display:flex;align-item:center;margin-bottom:20px;">
        <input type="range" style="max-width:300px;margin-top:20px;" id="v-volbt" value="50" max="100" min="0"/>
        <span id="v-vol" style="display:inline-block;padding-left:20px;">50</span>
    </div>
    <!--进度条-->
    <div id="v-bar" class="bar">
        <div id="v-bar_content" class="bar_content"></div>
        <div id="videoTime" class="bar_time"></div>
    </div>
</div>

```html
<button id="v-play">播放</button>
<button id="v-pause">暂停</button>
<button id="v-stop">停止播放</button>
<button id="v-reset">重置播放</button>
<button id="v-stopvol">静音</button><span id="v-vol">50</span>
<button id="v-full">全屏</button>
<input type="range" id="v-vol" value="50" max="100" min="0"/>
 <!--进度条-->
<div id="v-bar" class="bar">
    <div id="v-bar_content" class="bar_content"></div>
    <div id="videoTime" class="bar_time"></div>
</div>
```

```js
var videoplayer = document.getElementById("videoplayer");
var vPlaybt = document.getElementById("v-play");
var vStopbt = document.getElementById("v-stop");
var vPause = document.getElementById("v-pause");
var vResetbt = document.getElementById("v-reset");
var vVolbt = document.getElementById("v-volbt");
var vVol = document.getElementById("v-vol");
var vStopVolbt = document.getElementById("v-stopvol");
//获取进度条
var vTimer = null;
var vBarContent = document.getElementById("v-bar_content");
var videoTime = document.getElementById("videoTime");
var vFlag = true;//记录是否静音
var vVolValue = 0.5;//记录静音前 你的音量

//播放
vPlaybt.onclick = function () {
    videoplayer.play();
}
//暂停
vPause.onclick = function () {
    videoplayer.pause();
}
//停止播放
vStopbt.onclick = function () {
    videoplayer.pause();
    //当前播放的时间
    videoplayer.currentTime = 0;
    vBarContent.style.width = 0;
}
//重置
vResetbt.onclick = function () {
    vStopbt.click();
    videoplayer.play();
}
//音量控制
vVolbt.oninput = function () {
    //音乐最大值是1，最小值是0
    vVol.innerHTML = this.value;
    videoplayer.volume = this.value / 100;
    vVolValue = videoplayer.volume;
}
// 静音
vStopVolbt.onclick = function () {
    if (vFlag) {
        videoplayer.volume = 0;
        vStopVolbt.innerText = "开启";
        vVolbt.value = 0;
        vVol.innerHTML = 0;
    } else {
        videoplayer.volume = vVolValue;
        vStopVolbt.innerText = "静音";
        vVolbt.value = vVolValue * 100;
        vVol.innerHTML = vVolValue * 100;
    }
    vFlag = !vFlag;
}
//进度条
function vChange() {
    videoTime.innerHTML = (function () {
        var t = Math.round(videoplayer.currentTime);
        var dt = Math.round(videoplayer.duration);
        return (Math.floor(t / 60) + ":" + t % 60 + " / " + Math.floor(dt / 60) + ":" + (dt % 60));
    })()
    //videoplayer.duration 音乐的完整时间
    vBarContent.style.width = videoplayer.currentTime / videoplayer.duration * 240 + "px";
    if (videoplayer.currentTime == videoplayer.duration) {
        clearInterval(vTimer);
    } else {
        vTimer = setTimeout(vChange, 100)
    }
}
vChange();
//进度条方向控制
var vBar = document.getElementById("v-bar");
vBar.onclick = function (e) {
    oEvent = e || window.event;
    vBarContent.style.width = oEvent.offsetX + "px";
    vBarContent.style.transition = "width 0.1s ease";
    videoplayer.currentTime = oEvent.offsetX / 240 * videoplayer.duration;
    videoplayer.play();
}
//全屏
var elem = document.getElementById("v-full");
elem.onclick = function () {
    if (elem.webkitRequestFullScreen) {
        videoplayer.webkitRequestFullScreen();
    } else {
        alert("您的浏览器不支持全屏。。快换电脑！！")
    }
}
```

同样的，你可以选择播放的本地文件来测试下播放器。

<div class="ele-box">
    <div style="font-size:20px;font-weight:600;padding:10px 0;"> 文件：<span id="videoName"></span></div>
    <div><button id="v-btn" type="button" class="btn btn-default">选择文件</button></div>
    <input id="v-input_file" style="display: none;" type="file" value="" />
</div>

或者资源外链来测试。  

<div class="ele-box">
    <div class="input-group input-group-sm">
      <input type="text" id="v-input_link" class="form-control" value="" placeholder="请输入资源外链">
      <span class="input-group-btn">
        <button class="btn btn-default" id="v-btn2" type="button">Let's Go!</button>
      </span>
    </div>
</div>

有时候会出现视频无法自动播放。查找资料后发现，添加 `muted` 属性，就可以通过地址栏进入网页时自动播放了。  

---  
[1]: http://www.w3school.com.cn/html/html5_intro.asp  
[2]: http://www.w3school.com.cn/html/html_elements.asp  
[3]: https://cloud.tencent.com/developer/chapter/13536  
[4]: https://cloud.tencent.com/developer/chapter/13538  

<style>@import "/css/html5-features.css";</style>
<script async defer src="/js/html5-features.js"></script>