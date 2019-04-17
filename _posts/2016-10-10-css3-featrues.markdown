---
layout:     post
title:      "CSS3新特性"
subtitle:   " \"animation transform transition\""
author:     "Fz"
header-style: "text"
extra_css: "/css/post-css3-features.css"
extra_js: "/js/in-post/css-features.js"
catalog: true
tags:
    - CSS3
---

# 前言  

CSS（Cascading Style Sheet 层叠样式表）主要是负责网站内容添加样式，但是随着现代浏览器的更新，CSS能做到的效果也越来越华丽。其中出现的CSS3是CSS最新的标准。

在W3C中也有详细的对 [CSS3][1] 的介绍，CSS3一般分为以下几个重要的模块：
- 选择器 
- 背景和边框
- 动画 
- 转换
- …… 

这里主要回顾下CSS3新特性中的[**transform（转换）**](#transform)、[**transition（过渡）**](#transition)和[**animation（动画）**](#animation)。

---  
<p id="transform"></p>

## transform（转换）

transform（转换）能够实现我们对DOM元素的缩放（scale）、平移（translate）、拉伸（skew）和旋转（rotate），一般transform分为**2D转换**和**3D转换**。 
> 两个主要属性用于定义CSS转换：`transform` 和 `transform-origin`  
> `transform-origin` —— 指定原点的位置。默认情况下，它位于元素的中心，可以移动。它被几个转换使用，如旋转，缩放或倾斜，需要一个特定的点作为参数。  
> `transform` —— 指定应用于元素的变换。这是由一个空格分隔的变换列表，按照合成操作的要求，一个接一个地应用变换。复合变换按从右到左的顺序进行应用。  

**2D转换**  

2D转换顾名思义，就只在平面上做元素的转换，可以把界面想象成一张纸，元素就是画在纸上的图案，我们用对应的方法，对这个图案进行缩放，旋转等操作。
2D转换的方法主要有 `translate(x,y)`、`rotate(angle)`、`scale(x-angle,y-angle)`、`skew(x-angle,y-angle)`、`matrix(n,n,n,n,n,n)`。

> Internet Explorer 10、Firefox 以及 Opera 支持 transform 属性。Chrome 和 Safari 需要前缀 -webkit-。Internet Explorer 9 需要前缀 -ms-。  

* `translate(x,y)` 平移的意思，第一个参数表示X轴，第二个表示Y轴，负值则取反方向。  

我们将一个div元素实现向右平移 50 像素同时向下平移 20 像素。  

<div class="ele-box"><div class="ele transform_2d_translate"></div></div>

```css
div {
    transform: translate(50px,20px);
    -ms-transform: translate(50px,20px);		/* IE 9 */
    -webkit-transform: translate(50px,20px);	/* Safari and Chrome */
    -o-transform: translate(50px,20px);		    /* Opera */
    -moz-transform: translate(50px,20px);		/* Firefox */
}
```

* `rotate(angle)` 旋转的意思，参数angle的单位是deg（角度）表示以元素的中心为重心，顺时针开始旋转，负值则取逆时针。  

我们将一个div元素实现顺时针旋转 30 度。  

<div class="ele-box"><div class="ele transform_2d_rotate"></div></div>

```css
div {
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);		/* IE 9 */
    -webkit-transform: rotate(30deg);	/* Safari and Chrome */
    -o-transform: rotate(30deg);		/* Opera */
    -moz-transform: rotate(30deg);		/* Firefox */
}
```

* `scale(x-angle,y-angle)` 比例的意思，没有单位，第一个参数表示X轴方向变化，第二个参数表示Y轴方向变化， 当值大于1时，按比例放大；当值大于0小于1时，按比例缩小；当值大于-1小于0时，旋转180度按比例缩小；当值小于-1时，旋转180度按比例放大。  

我们将一个div元素（150px*150px）实现把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 0.5 倍

<div class="ele-box"><div class="ele transform_2d_scale"></div></div>

```css
div {
    transform: scale(2,0.5);
    -ms-transform: scale(2,0.5);	    /* IE 9 */
    -webkit-transform: scale(2,0.5);	/* Safari 和 Chrome */
    -o-transform: scale(2,0.5);	        /* Opera */
    -moz-transform: scale(2,0.5);	    /* Firefox */
}
```

* `skew(x-angle,y-angle)` 倾斜、扭曲的意思 ，第一个参数表示X轴方向，第二个参数表示Y轴方向，翻转一定的角度，单位deg（角度）  

我们将一个div元素实现围绕 X 轴把元素翻转 30 度，围绕 Y 轴翻转 20 度。  

<div class="ele-box"><div class="ele transform_2d_skew"></div></div>

```css
div {
    transform: skew(30deg,20deg);
    -ms-transform: skew(30deg,20deg);	    /* IE 9 */
    -webkit-transform: skew(30deg,20deg);	/* Safari and Chrome */
    -o-transform: skew(30deg,20deg);	    /* Opera */
    -moz-transform: skew(30deg,20deg);	    /* Firefox */
}
```

* `matrix(n,n,n,n,n,n)` 矩阵、模型的意思，是把所有 2D 转换方法组合在一起。以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。并不是太了解，有兴趣的朋友可以自行拓展下，这里就不多说了。  

我们将一个div元素实现元素旋转 30 度。  

<div class="ele-box"><div class="ele transform_2d_matrix"></div></div>

```css
div {
    transform:matrix(0.866,0.5,-0.5,0.866,0,0);
    -ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* IE 9 */
    -moz-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Firefox */
    -webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Safari and Chrome */
    -o-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* Opera */
}
```

**3D转换**  

对比2D转换，3D转换可以想象成三维空间上的转换，把界面想象成三维空间，元素可以是三维空间中具体的事物，除了X轴、Y轴还拥有Z轴（垂直于界面）的概念。  

> Internet Explorer 10 和 Firefox 支持 3D 转换。Chrome 和 Safari 需要前缀 -webkit-。Opera 仍然不支持 3D 转换（它只支持2D转换）。  

<img class="shadow" src="/img/in-post/css3-features/post-css3-features-xyz.jpg" />

对应的3D转换的方法，则是在2D方法的基础上，加上3D或者加上对应轴的描述。如`translate3d(x,y,z)`、`rotate3d(x,y,z,angle)`、`translateZ(z)`，`rotateX(angle)`等；

* `translate3d(x,y,z)`、`translateX(x)`、`translateY(y)`、`translateZ(z)` 3D平移，在三维空间中重新定位一个元素。  


我们将一个div元素实现向X轴（向右）平移 50 像素，向Y轴（向下）平移 20 像素同时向Z轴（向上）平移 40 像素。

<div class="ele-box"><div class="ele transform_3d_translate3d"></div></div>

```css
div {
    transform: translate3d(50px, 20px, 40px);
    -webkit-transform:  translate3d(50px, 20px, 40px);	/* Safari 和 Chrome */
    -moz-transform:  translate3d(50px, 20px, 40px);	    /* Firefox */
}
```

* `rotate3d(x,y,z,angle)`、`rotateX(angle)`、`rotateY(angle)`、`rotateZ(angle)` 3D旋转。在三维空间中，旋转需要一个由x，y，z和原点（由 `transform-origin` 属性定义）共同描述的向量，作为旋转轴。  
`rotate3d(x,y,z,angle)` (x，y，z)配合原点描述旋转轴，angle为旋转角度。  
`rotateX(angle)` 描述以X轴为旋转轴，旋转角度为angle，相当于`rotate3d(1, 0, 0, angle)`  
`rotateY(angle)` 描述以Y轴为旋转轴，旋转角度为angle，相当于`rotate3d(0, 1, 0, angle)`  
`rotateZ(angle)` 描述以Z轴为旋转轴，旋转角度为angle，相当于`rotate3d(0, 0, 1, angle) ` 

我们将一个div元素实现在（1，1，1）和原点定义的旋转轴上顺时针旋转 60 度。

<div class="ele-box"><div class="ele transform_3d_rotate3d"></div></div>

```css
div {
    transform: rotate3d(1, 1, 1, 60deg);
    -webkit-transform: rotate3d(1, 1, 1, 60deg);	/* Safari 和 Chrome */
    -moz-transform: rotate3d(1, 1, 1, 60deg);	    /* Firefox */
}
```

那么我们再有一个div，实现围绕X轴顺时针旋转 60 度。

<div class="ele-box"><div class="ele transform_3d_rotateX"></div></div>

```css
div {
    transform: rotateX(60deg);          /* 相当于rotate3d(1, 0, 0, 60deg)  */
    -webkit-transform: rotateX(60deg);  /* Safari 和 Chrome */
    -moz-transform: rotateX(60deg);     /* Firefox */
}
```

* `scale3d(x, y, z)`、`scaleX(x)`、`scaleY(y)`、`scaleZ(z)` 3D缩放，定义在三维空间中元素大小的变换。由于缩放的量有矢量定义，当坐标值在（-1,1）之内时，则沿该方向缩小，反之放大，值为1时，则保持不变。  
`scale3d(x, y, z)` 三个参数表示在每个方向上的缩放量  
`scaleX(x)` 定义了沿x轴（水平）调整元素大小的变换，相当于`scale(x, 1)`或`scale3d(x, 1, 1)`  
`scaleY(y)` 定义了沿y轴（垂直方向）调整元素大小的变换，等于`scale(1, y)`或`scale3d(1, y, 1)`  
`scaleZ(z)` 定义了沿着z轴调整元素大小的的变换，`scaleZ(z)`相当于`scale3d(1, 1, z)  `

我们将一个div元素实现X轴方向缩放 2 倍，Y轴方向缩放 0.8 倍，Z轴方向缩放 0.2 倍。

<div class="ele-box"><div class="ele transform_3d_scale3d"></div></div>

```css
div {
    transform: scale3d(2, 0.8, 0.2);
    -webkit-transform:  scale3d(2, 0.8, 0.2);	/* Safari 和 Chrome */
    -moz-transform:  scale3d(2, 0.8, 0.2);	    /* Firefox */
}
```

* `matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)` 3D变换的矩阵，定义一个用于3D变换的4×4齐次矩阵。  
本人表示一脸懵逼，有兴趣的朋友可以去拓展下，告辞！！！  

---  
<p id="transition"></p>

## transition（过渡）

我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。  

`transition` 是 `transition-property`，`transition-duration`，`transition-timing-function`和`transition-delay` 的组合（速记）属性。  

- `transition-property` 规定设置过滤效果的CSS属性名称  
- `transition-duration` 规定完成过渡效果所需要的时间
- `transition-timing-function` 规定速度效果的速度曲线
- `transition-delay` 定义过渡效果开始的延迟时间  

其中`transition-property` 和 `transition-duration` 是必须规定的。一般在元素的不同状态之间添加过渡效果，比如 `:hover`、`:active` 等或者JavaScript动态设置。

> Internet Explorer 10、Firefox、Chrome 以及 Opera 支持 transition 属性。Safari 需要前缀 -webkit-。Internet Explorer 9 以及更早的版本，不支持 transition 属性。Chrome 25 以及更早的版本，需要前缀 -webkit-。  

我们将一个div元素添加一个过渡效果。  

<div class="ele-box"><div class="transition_1">hover me</div></div>

```css
div {
    width: 150px;
    height: 150px;
    background-color: aqua;
    /*transition-property: all;
    transition-duration: 1s;
    transition-timing-function: ease;
    transition-delay: 0.5s;*/
    transition: all 1s ease 0.5s;
    -moz-transition: all 1s ease 0.5s;      /* Firefox 4 */
    -webkit-transition: all 1s ease 0.5s;   /* Safari 和 Chrome */
    -o-transition: all 1s ease 0.5s;        /* Opera */
}
div:hover {
    width: 300px;
    height: 300px;
    background-color: gold;
}
```

那么，在CSS3之前，是如何实现这种效果的呢？当然是JavaScript以及JQuery啦！接下来我们就对比下CSS3、JavaScript和JQuery三种方式实现过渡效果的例子。  

**CSS3实现**

```css
    div {
        height: 0;
        width: 0;
        overflow: hidden;
        border: 1px solid #cfcfcf;
        transition: all 0.6s ease;
    }
    div:hover {
        height: 200px;
        width: 150px;
    }
```

<p><span id="transition-css-btn">点击看妹子</span></p>
<div class="ele-box">
    <div id="transition-css-ele"><img src="https://tuimeizi.cn/pure?w=150&h=150&s=0" alt="加载失败"/></div>
</div>

**JavaScript实现**  

```js
    var js_btn = document.getElementById("transition-js-btn");
    var js_ele = document.getElementById("transition-js-ele");
    var flag = false, height = 0, timer;
    function step(){
        height = flag ? (height+1) : (height-1);
        if(height < 0){
            height = 0;
            clearInterval(timer);
            return;
        }else if(height > 310){
            height = 310;
            clearInterval(timer);
            return;
        }
        js_ele.style.height = height+"px";
        setTimeout(step,1);
    }
    js_btn.onclick=function(){
        if(timer){
            clearInterval(timer);
        }
        flag =! flag;
        step();
    }
```

<p><span id="transition-jq-btn">点击看妹子</span></p>
<div class="ele-box">
    <div id="transition-jq-ele"><img src="https://tuimeizi.cn/pure?w=150&h=150&s=0" alt="加载失败"/></div>
</div>

**JQuery实现**  

```js
    var flag = false;
    $("#transition-jq-btn").on("click",function(){
        flag =! flag;
        if(flag){
            $("#transition-jq-ele").stop().slideDown();
        }else{
            $("#transition-jq-ele").stop().slideUp();
        }
        // $("#transition-jq-ele").stop().slideToggle();
    })
```

<p><span id="transition-js-btn">点击看妹子</span></p>
<div class="ele-box">
    <div id="transition-js-ele"><img src="https://tuimeizi.cn/pure?w=150&h=150&s=0" alt="加载失败"/></div>
</div>


---  
<p id="animation"></p>

## animation（动画）

---

[1]: http://www.w3school.com.cn/css3/css3_intro.asp