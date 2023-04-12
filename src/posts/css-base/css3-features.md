---
title: 【CSS】CSS3新特性
description: animation动画、transform转换、transition过渡
keyword: animation, transform, transition
lastUpdated: 2018-12-20 10:51:24
---

<style client>
.ele-box{
    display: flex;
    justify-content: center;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #cfcfcf;
    border-radius: 4px;
 }
 .ele{
     display: block;
     width: 150px;
     height: 150px;
     margin-right: 20px;
     text-align: center;
     line-height: 150px;
     color: #ffffff;
     background-color:#E87DA1; 
     background-image: url(https://picsum.photos/150/150);
     background-repeat: no-repeat;
 }
 
 /* 2D */
 .transform_2d_translate:hover{
     transform: translate(50px,20px);
     -ms-transform: translate(50px,20px);		/* IE 9 */
     -webkit-transform: translate(50px,20px);	/* Safari and Chrome */
     -o-transform: translate(50px,20px);		/* Opera */
     -moz-transform: translate(50px,20px);		/* Firefox */
 }
 .transform_2d_rotate:hover{
     transform: rotate(30deg);
     -ms-transform: rotate(30deg);		/* IE 9 */
     -webkit-transform: rotate(30deg);	/* Safari and Chrome */
     -o-transform: rotate(30deg);		/* Opera */
     -moz-transform: rotate(30deg);		/* Firefox */
 }
 .transform_2d_scale:hover{
     transform: scale(2,0.5);
     -ms-transform: scale(2,0.5);	/* IE 9 */
     -webkit-transform: scale(2,0.5);	/* Safari 和 Chrome */
     -o-transform: scale(2,0.5);	/* Opera */
     -moz-transform: scale(2,0.5);	/* Firefox */
 }
 .transform_2d_skew:hover{
     transform: skew(30deg,20deg);
     -ms-transform: skew(30deg,20deg);	/* IE 9 */
     -webkit-transform: skew(30deg,20deg);	/* Safari and Chrome */
     -o-transform: skew(30deg,20deg);	/* Opera */
     -moz-transform: skew(30deg,20deg);	/* Firefox */
 }
 .transform_2d_matrix:hover{
     transform:matrix(0.866,0.5,-0.5,0.866,0,0);
     -ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* IE 9 */
     -moz-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Firefox */
     -webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Safari and Chrome */
     -o-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* Opera */
 }
 
 /* 3D */
 .transform_3d_translate3d:hover{
     transform: translate3d(50px,20px,40px);
     -webkit-transform:  translate3d(50px,20px,40px);	/* Safari 和 Chrome */
     -moz-transform:  translate3d(50px,20px,40px);	    /* Firefox */
 }
 .transform_3d_rotate3d:hover{
     transform: rotate3d(1,1,1,60deg);
     -webkit-transform: rotate3d(1,1,1,60deg);	/* Safari 和 Chrome */
     -moz-transform: rotate3d(1,1,1,60deg);	    /* Firefox */
 }
 .transform_3d_rotateX:hover{
     transform: rotateX(60deg);          /* 相当于rotate3d(1, 0, 0, 60deg)  */
     -webkit-transform: rotateX(60deg);	/* Safari 和 Chrome */
     -moz-transform: rotateX(60deg);	    /* Firefox */
 }
 .transform_3d_scale3d:hover{
     transform: scale3d(2, 0.8, 0.2);
     -webkit-transform:  scale3d(2, 0.8, 0.2);	/* Safari 和 Chrome */
     -moz-transform:  scale3d(2, 0.8, 0.2);	    /* Firefox */
 }
 
 /* transition */
 .transition_1 {
     width: 150px;
     height: 150px;
     text-align: center;
     line-height: 150px;
     color: #ffffff;
     background-color: #E87DA1;
     /*transition-property: all;
     transition-duration: 1s;
     transition-timing-function: ease;
     transition-delay: 0.5s;*/
     transition: all 1s ease 0.5s;
     -moz-transition: all 1s ease 0.5s;      /* Firefox 4 */
     -webkit-transition: all 1s ease 0.5s;   /* Safari 和 Chrome */
     -o-transition: all 1s ease 0.5s;        /* Opera */
 }
 .transition_1:hover {
     width: 300px;
     height: 300px;
     line-height: 300px;
     background-color: gold;
 }
 
 #transition-css-btn,#transition-js-btn,#transition-jq-btn{
     text-decoration: underline;
     cursor: pointer;
 }
 #transition-css-ele {
     transition: height 0.6s ease;
 }
 #transition-js-ele,#transition-css-ele {
     height: 0;
     width: 150px;
     overflow: hidden;
     border: 1px solid #cfcfcf;
     box-sizing: border-box;
 }
 #transition-jq-ele{
     display: none;
     height: 150px;
     width: 150px;
     overflow: hidden;
     border: 1px solid #cfcfcf;
 }
 .ele-box img{
     padding: 0;
     margin: 0;
 }
 
 /* 旋转效果 */ 
 .ele-content{
     position: relative;
     width: 200px;
     margin: 0 auto;
 }
 .content-card{
     width: 200px;
     height: 380px;
 }
 .content-card img{
     position: absolute;
 }
 .card-back,.card-front{
     transition: all 0.4s;
     backface-visibility: hidden;
     -webkit-backface-visibility: hidden;
     /*当元素背对我们的时候，隐藏元素*/
 }
 .card-back{
     transform: rotateY(180deg);
 }
 .card-front{
     transform: rotateY(0deg);
 }
 .content-card:hover .card-back{
     transform: rotateY(0deg);
 }
 .content-card:hover .card-front{
     transform: rotateY(180deg);
 }
 
 /* animation */
 .animation-1 {
     width: 100%;
     height: 250px;
     position: relative;
 }
 .animation-1-ele {
     position: relative;
     width: 60px;
     height: 60px;
     background-color: #E87DA1;
     animation: myMove 2s ease infinite 1s alternate;
     -webkit-animation :myMove 2s ease infinite 1s alternate; 
     -moz-animation :myMove 2s ease infinite 1s alternate;
     -ms-animation :myMove 2s ease infinite 1s alternate;
     -o-animation :myMove 2s ease infinite 1s alternate;
 }
 @keyframes myMove{
     0%{top: 0;left: 0;}
     50%{top: 150px;left: 150px;border-radius: 50%;}
     100%{top: 0;left: 0;}
 }
 /* 适配不同浏览器内核 */
 @-webkit-keyframes myMove{
     0%{top: 0;left: 0;}
     50%{top: 150px;left: 150px;border-radius: 50%;}
     100%{top: 0;left: 0;}
 }
 @-moz-keyframes myMove{
     0%{top: 0;left: 0;}
     50%{top: 150px;left: 150px;border-radius: 50%;}
     100%{top: 0;left: 0;}
 }
 @-ms-keyframes myMove{
     0%{top: 0;left: 0;}
     50%{top: 150px;left: 150px;border-radius: 50%;}
     100%{top: 0;left: 0;}
 }
 @-o-keyframes myMove{
     0%{top: 0;left: 0;}
     50%{top: 150px;left: 150px;border-radius: 50%;}
     100%{top: 0;left: 0;}
 }
 
 /* 帧动画 */
 .animation-girl{
     width: 180px;
     height: 300px;
     background: url(/img/article/css3-features/charector.png);
     animation: girl 1s infinite step-end;
 }
 @keyframes girl{
     0%{
         background-position: 0 0;
     }
     14.3%{
         background-position: -180px 0;
     }
     28.6%{
         background-position: -360px 0;
     }
     42.9%{
         background-position: -540px 0;
     }
     57.2%{
         background-position: -720px 0;
     }
     71.5%{
         background-position: -900px 0;
     }
     85.8%{
         background-position: -1080px 0;
     }
     100%{
         background-position: 0 0;
     }
 }
</style>


# CSS3 新特性

CSS（Cascading Style Sheet 层叠样式表）主要是负责网站内容添加样式，但是随着现代浏览器的更新，CSS 能做到的效果也越来越华丽。其中出现的 CSS3 是 CSS 最新的标准。

在 W3C 中也有详细的对 [CSS3][1] 的介绍，CSS3 一般分为以下几个重要的模块：

- 选择器
- 背景和边框
- 动画
- 转换
- ……

这里主要回顾下 CSS3 新特性中的**transform（转换）**、**transition（过渡）**和**animation（动画）**。

## Transform

transform（转换）能够实现我们对 DOM 元素的缩放（scale）、平移（translate）、拉伸（skew）和旋转（rotate），一般 transform 分为**2D 转换**和**3D 转换**。

> 两个主要属性用于定义 CSS 转换：`transform` 和 `transform-origin`  
> `transform-origin` —— 指定原点的位置。默认情况下，它位于元素的中心，可以移动。它被几个转换使用，如旋转，缩放或倾斜，需要一个特定的点作为参数。  
> `transform` —— 指定应用于元素的变换。这是由一个空格分隔的变换列表，按照合成操作的要求，一个接一个地应用变换。复合变换按从右到左的顺序进行应用。

### 2D 转换

2D 转换顾名思义，就只在平面上做元素的转换，可以把界面想象成一张纸，元素就是画在纸上的图案，我们用对应的方法，对这个图案进行缩放，旋转等操作。
2D 转换的方法主要有 `translate(x,y)`、`rotate(angle)`、`scale(x-angle,y-angle)`、`skew(x-angle,y-angle)`、`matrix(n,n,n,n,n,n)`。

> Internet Explorer 10、Firefox 以及 Opera 支持 transform 属性。Chrome 和 Safari 需要前缀 -webkit-。Internet Explorer 9 需要前缀 -ms-。

- `translate(x,y)` 平移的意思，第一个参数表示 X 轴，第二个表示 Y 轴，负值则取反方向。

我们将一个 div 元素实现向右平移 50 像素同时向下平移 20 像素。

```css
div {
  transform: translate(50px, 20px);
  -ms-transform: translate(50px, 20px); /* IE 9 */
  -webkit-transform: translate(50px, 20px); /* Safari and Chrome */
  -o-transform: translate(50px, 20px); /* Opera */
  -moz-transform: translate(50px, 20px); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_2d_translate"></div></div>

- `rotate(angle)` 旋转的意思，参数 angle 的单位是 deg（角度）表示以元素的中心为重心，顺时针开始旋转，负值则取逆时针。

我们将一个 div 元素实现顺时针旋转 30 度。

```css
div {
  transform: rotate(30deg);
  -ms-transform: rotate(30deg); /* IE 9 */
  -webkit-transform: rotate(30deg); /* Safari and Chrome */
  -o-transform: rotate(30deg); /* Opera */
  -moz-transform: rotate(30deg); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_2d_rotate"></div></div>

- `scale(x-angle,y-angle)` 比例的意思，没有单位，第一个参数表示 X 轴方向变化，第二个参数表示 Y 轴方向变化， 当值大于 1 时，按比例放大；当值大于 0 小于 1 时，按比例缩小；当值大于-1 小于 0 时，旋转 180 度按比例缩小；当值小于-1 时，旋转 180 度按比例放大。

我们将一个 div 元素（150px\*150px）实现把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 0.5 倍

```css
div {
  transform: scale(2, 0.5);
  -ms-transform: scale(2, 0.5); /* IE 9 */
  -webkit-transform: scale(2, 0.5); /* Safari 和 Chrome */
  -o-transform: scale(2, 0.5); /* Opera */
  -moz-transform: scale(2, 0.5); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_2d_scale"></div></div>

- `skew(x-angle,y-angle)` 倾斜、扭曲的意思 ，第一个参数表示 X 轴方向，第二个参数表示 Y 轴方向，翻转一定的角度，单位 deg（角度）

我们将一个 div 元素实现围绕 X 轴把元素翻转 30 度，围绕 Y 轴翻转 20 度。

```css
div {
  transform: skew(30deg, 20deg);
  -ms-transform: skew(30deg, 20deg); /* IE 9 */
  -webkit-transform: skew(30deg, 20deg); /* Safari and Chrome */
  -o-transform: skew(30deg, 20deg); /* Opera */
  -moz-transform: skew(30deg, 20deg); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_2d_skew"></div></div>

- `matrix(n,n,n,n,n,n)` 矩阵、模型的意思，是把所有 2D 转换方法组合在一起。以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个 2D 变换，相当于直接应用一个[a b c d e f]变换矩阵。并不是太了解，有兴趣的朋友可以自行拓展下，这里就不多说了。

我们将一个 div 元素实现元素旋转 30 度。

```css
div {
  transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0);
  -ms-transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0); /* IE 9 */
  -moz-transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0); /* Firefox */
  -webkit-transform: matrix(
    0.866,
    0.5,
    -0.5,
    0.866,
    0,
    0
  ); /* Safari and Chrome */
  -o-transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0); /* Opera */
}
```

<div class="ele-box"><div class="ele transform_2d_matrix"></div></div>

### 3D 转换

对比 2D 转换，3D 转换可以想象成三维空间上的转换，把界面想象成三维空间，元素可以是三维空间中具体的事物，除了 X 轴、Y 轴还拥有 Z 轴（垂直于界面）的概念。

> Internet Explorer 10 和 Firefox 支持 3D 转换。Chrome 和 Safari 需要前缀 -webkit-。Opera 仍然不支持 3D 转换（它只支持 2D 转换）。

<img class="shadow" src="/img/article/css3-features/post-css3-features-xyz.jpg" />

对应的 3D 转换的方法，则是在 2D 方法的基础上，加上 3D 或者加上对应轴的描述。如`translate3d(x,y,z)`、`rotate3d(x,y,z,angle)`、`translateZ(z)`，`rotateX(angle)`等；

- `translate3d(x,y,z)`、`translateX(x)`、`translateY(y)`、`translateZ(z)` 3D 平移，在三维空间中重新定位一个元素。

我们将一个 div 元素实现向 X 轴（向右）平移 50 像素，向 Y 轴（向下）平移 20 像素同时向 Z 轴（向上）平移 40 像素。

```css
div {
  transform: translate3d(50px, 20px, 40px);
  -webkit-transform: translate3d(50px, 20px, 40px); /* Safari 和 Chrome */
  -moz-transform: translate3d(50px, 20px, 40px); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_3d_translate3d"></div></div>

- `rotate3d(x,y,z,angle)`、`rotateX(angle)`、`rotateY(angle)`、`rotateZ(angle)` 3D 旋转。在三维空间中，旋转需要一个由 x，y，z 和原点（由 `transform-origin` 属性定义）共同描述的向量，作为旋转轴。  
  `rotate3d(x,y,z,angle)` (x，y，z)配合原点描述旋转轴，angle 为旋转角度。  
  `rotateX(angle)` 描述以 X 轴为旋转轴，旋转角度为 angle，相当于`rotate3d(1, 0, 0, angle)`  
  `rotateY(angle)` 描述以 Y 轴为旋转轴，旋转角度为 angle，相当于`rotate3d(0, 1, 0, angle)`  
  `rotateZ(angle)` 描述以 Z 轴为旋转轴，旋转角度为 angle，相当于`rotate3d(0, 0, 1, angle) `

我们将一个 div 元素实现在（1，1，1）和原点定义的旋转轴上顺时针旋转 60 度。

```css
div {
  transform: rotate3d(1, 1, 1, 60deg);
  -webkit-transform: rotate3d(1, 1, 1, 60deg); /* Safari 和 Chrome */
  -moz-transform: rotate3d(1, 1, 1, 60deg); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_3d_rotate3d"></div></div>

那么我们再有一个 div，实现围绕 X 轴顺时针旋转 60 度。

```css
div {
  transform: rotateX(60deg); /* 相当于rotate3d(1, 0, 0, 60deg)  */
  -webkit-transform: rotateX(60deg); /* Safari 和 Chrome */
  -moz-transform: rotateX(60deg); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_3d_rotateX"></div></div>

- `scale3d(x, y, z)`、`scaleX(x)`、`scaleY(y)`、`scaleZ(z)` 3D 缩放，定义在三维空间中元素大小的变换。由于缩放的量有矢量定义，当坐标值在（-1,1）之内时，则沿该方向缩小，反之放大，值为 1 时，则保持不变。  
  `scale3d(x, y, z)` 三个参数表示在每个方向上的缩放量  
  `scaleX(x)` 定义了沿 x 轴（水平）调整元素大小的变换，相当于`scale(x, 1)`或`scale3d(x, 1, 1)`  
  `scaleY(y)` 定义了沿 y 轴（垂直方向）调整元素大小的变换，等于`scale(1, y)`或`scale3d(1, y, 1)`  
  `scaleZ(z)` 定义了沿着 z 轴调整元素大小的的变换，`scaleZ(z)`相当于`scale3d(1, 1, z)  `

我们将一个 div 元素实现 X 轴方向缩放 2 倍，Y 轴方向缩放 0.8 倍，Z 轴方向缩放 0.2 倍。

```css
div {
  transform: scale3d(2, 0.8, 0.2);
  -webkit-transform: scale3d(2, 0.8, 0.2); /* Safari 和 Chrome */
  -moz-transform: scale3d(2, 0.8, 0.2); /* Firefox */
}
```

<div class="ele-box"><div class="ele transform_3d_scale3d"></div></div>

- `matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)` 3D 变换的矩阵，定义一个用于 3D 变换的 4×4 齐次矩阵。  
  本人表示一脸懵逼，有兴趣的朋友可以去拓展下，告辞！！！

## Transition

我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。

`transition` 是 `transition-property`，`transition-duration`，`transition-timing-function`和`transition-delay` 的组合（速记）属性。

- `transition-property` 规定设置过滤效果的 CSS 属性名称
- `transition-duration` 规定完成过渡效果所需要的时间
- `transition-timing-function` 规定速度效果的速度曲线
- `transition-delay` 定义过渡效果开始的延迟时间

其中`transition-property` 和 `transition-duration` 是必须规定的。一般在元素的不同状态之间添加过渡效果，比如 `:hover`、`:active` 等或者 JavaScript 动态设置。

> Internet Explorer 10、Firefox、Chrome 以及 Opera 支持 transition 属性。Safari 需要前缀 -webkit-。Internet Explorer 9 以及更早的版本，不支持 transition 属性。Chrome 25 以及更早的版本，需要前缀 -webkit-。

我们将一个 div 元素添加一个过渡效果。

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
  -moz-transition: all 1s ease 0.5s; /* Firefox 4 */
  -webkit-transition: all 1s ease 0.5s; /* Safari 和 Chrome */
  -o-transition: all 1s ease 0.5s; /* Opera */
}
div:hover {
  width: 300px;
  height: 300px;
  background-color: gold;
}
```

<div class="ele-box"><div class="transition_1">hover me</div></div>

那么，在 CSS3 之前，是如何实现这种效果的呢？当然是 JavaScript 以及 JQuery 啦！接下来我们就对比下 CSS3、JavaScript 和 JQuery 三种方式实现过渡效果的例子。

### CSS3 实现

```css
div {
  height: 0; /*  修改height到150px 即可触发过渡 */
  width: 150px;
  overflow: hidden;
  border: 1px solid #cfcfcf;
  transition: height 0.6s ease;
}
```

<p><span id="transition-css-btn">点击看图</span></p>
<div class="ele-box">
    <div id="transition-css-ele"><img src="https://picsum.photos/150/150" alt="加载失败"/></div>
</div>

### JavaScript 实现

```js
var js_btn = document.getElementById('transition-js-btn');
var js_ele = document.getElementById('transition-js-ele');
var flag = false,
  height = 0,
  timer = null;

function step() {
  height = flag ? height + 1 : height - 1;
  if (height < 0) {
    height = 0;
    clearInterval(timer);
    return;
  } else if (height > 150) {
    height = 150;
    clearInterval(timer);
    return;
  }
  js_ele.style.height = height + 'px';
}

js_btn.onclick = function () {
  if (timer) {
    clearInterval(timer);
  }
  flag = !flag;
  timer = setInterval(step, 1);
};
```

<p><span id="transition-js-btn">点击看图</span></p>
<div class="ele-box">
    <div id="transition-js-ele"><img src="https://picsum.photos/150/150" alt="加载失败"/></div>
</div>

### JQuery 实现

```js
$('#transition-jq-btn').on('click', function () {
  $('#transition-jq-ele').stop().slideToggle();
});
```

<p><span id="transition-jq-btn">点击看图</span></p>
<div class="ele-box">
    <div id="transition-jq-ele"><img src="https://picsum.photos/150/150" alt="加载失败"/></div>
</div>

到这里，大家应该也能感受到 CSS3 过渡属性带来的好处了，而且对于浏览器性能而言，CSS3 性能也是更优！

那么我们结合之前的 `transform` ，来实现一个 3D 旋转效果。

```html
<div class="content">
  <div class="card">
    <img class="front" src="card_front.png" />
    <img class="back" src="card_back.png" />
  </div>
</div>
```

```css
.content {
  position: relative;
  width: 200px;
  margin: 0 auto;
}
.card {
  width: 200px;
  height: 380px;
}
.card img {
  position: absolute;
}
.back,
.front {
  transition: all 0.4s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /*当元素背对我们的时候，隐藏元素*/
}
.back {
  transform: rotateY(180deg);
}
.front {
  transform: rotateY(0deg);
}
.card:hover .back {
  transform: rotateY(0deg);
}
.card:hover .front {
  transform: rotateY(180deg);
}
```

<div class="ele-box">
    <div class="ele-content">
        <div class="content-card">
            <img class="card-front" src="https://picsum.photos/200/380" alt="front" />
            <img class="card-back" src="https://picsum.photos/200/380" alt="back" />
        </div>
    </div>
</div>

## Animation

动画是使元素从一种样式逐渐变化为另一种样式的效果。通过`animation`，我们能够创建动画效果，在许多网页中取代 gif 动图、Flash 动画以及 JavaScript 动态设置。

`animation` 是 `animation-name`，`animation-duration`，`animation-timing-function`，`animation-delay`，`animation-iteration-count`，`animation-direction`，`animation-fill-mode` 的组合（速记）属性。  
`animation-play-state` 则不包括其中。

- `animation-name` 规定 `@keyframes` 动画的名称
- `animation-duration` 规定动画完成一个周期所花费的秒或毫秒。默认是 0。
- `animation-timing-function` 执行动画完全的曲线 默认是 "ease"
- `animation-delay` 动画开始的延迟时间 默认 0
- `animation-iteration-count` 动画完成次数 默认 1 infinite 表示无穷次
- `animation-direction` 规定动画是否在下一周期逆向地播放。默认是 "normal"。
- `animation-fill-mode` 动画执行完毕停留在最后一秒的位置
- `animation-play-state` 规定对象动画时间之外的状态。

其中 `animation-name` 动画的名称和 `animation-duration` 动画时间（默认 0，不执行）两项是必须的规定的。

> Internet Explorer 10、Firefox 以及 Opera 支持 @keyframes 规则和 animation 属性。Chrome 和 Safari 需要前缀 -webkit-。Internet Explorer 9，以及更早的版本，不支持 @keyframe 规则或 animation 属性。

在`animation`中，最主要的还是`animation-name`中定义的 `@keyframes` 规则。`@keyframes ` 规则用于创建动画。在 `@keyframes` 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。 详细的可以查看 [腾讯云的开发者文档][2]。
在`@keyframes`方法中，我们可以改变样式任意多次，我们用百分比来规定变化的趋势，或者用关键词 `from` 和 `to` 等同于 0% 和 100%。分别表示动画的开始和结束。为了更多的支持，建议使用百分比。

我们来实现一个简单的动画效果。将一个 div 元素移动起来。

```css
div {
  position: relative;
  width: 60px;
  height: 60px;
  background-color: #e87da1;
  animation: myMove 2s ease infinite 1s alternate;
  -webkit-animation: myMove 2s ease infinite 1s alternate;
  -moz-animation: myMove 2s ease infinite 1s alternate;
  -ms-animation: myMove 2s ease infinite 1s alternate;
  -o-animation: myMove 2s ease infinite 1s alternate;
  /* 下面相当于 animation: myMove 2s ease infinite 1s alternate; */
  /* animation-name: myMove;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-delay: 1s;
    animation-iteration-count:infinite;
    animation-fill-mode: alternate; */
}
@keyframes myMove {
  0% {
    top: 0;
    left: 0;
  }
  50% {
    top: 150px;
    left: 150px;
    border-radius: 50%;
  }
  100% {
    top: 0;
    left: 0;
  }
}
/* 适配不同浏览器内核 */
@-webkit-keyframes myMove {
  /* Safari 和 Chrome */
  0% {
    top: 0;
    left: 0;
  }
  50% {
    top: 150px;
    left: 150px;
    border-radius: 50%;
  }
  100% {
    top: 0;
    left: 0;
  }
}
@-moz-keyframes myMove {
  /* Firefox */
  0% {
    top: 0;
    left: 0;
  }
  50% {
    top: 150px;
    left: 150px;
    border-radius: 50%;
  }
  100% {
    top: 0;
    left: 0;
  }
}
@-ms-keyframes myMove {
  0% {
    top: 0;
    left: 0;
  }
  50% {
    top: 150px;
    left: 150px;
    border-radius: 50%;
  }
  100% {
    top: 0;
    left: 0;
  }
}
@-o-keyframes myMove {
  /* Opera */
  0% {
    top: 0;
    left: 0;
  }
  50% {
    top: 150px;
    left: 150px;
    border-radius: 50%;
  }
  100% {
    top: 0;
    left: 0;
  }
}
```

<div class="ele-box">
    <div class="animation-1">
        <div class="animation-1-ele"></div>
    </div>
</div>

这里就实现了一个简单的动画效果，我们看下 myMove 中定义的动画，有三个状态，0%，50%和 100%。然后在 2s 完成这样一个周期动画。三种状态对应其时刻的样式。当然也可以写更多的样式，比如宽高，背景色什么的。

### 逐帧动画

大家都知道，逐帧动画是在**连续的关键帧**中分解动画动作，也就是在时间轴的每帧上逐帧绘制不同的内容，使其连续播放而成动画。那么在这里，我们同样可以用 CSS3 实现逐帧动画的效果。需要用到`animation-timing-function`属性。

`animation-timing-function`属性的值可以为以下几个值：

- `step-start` 跳过第一帧 等同于 `steps(1,start)`
- `step-end` 跳过最后一帧 等同于 `steps(1,end)`
- `steps(n)` 将动画的每一帧之间分为 n 份显示
- `steps(n,start/end)` 将每一帧之间分为 n 份显示，并跳过开头第一帧/结尾第一帧

我们有这样一张图片，可以看出一个女孩奔跑的动作。

<img class="shadow" alt="加载失败！" src="/img/article/css3-features/charector.png" />

现在我们用这张照片实现一个逐帧动画的效果。

```css
div {
  width: 180px;
  height: 300px;
  background: url(/img/girl.png);
  animation: girl 1s infinite step-end;
}
@keyframes girl {
  0% {
    background-position: 0 0;
  }
  14.3% {
    background-position: -180px 0;
  }
  28.6% {
    background-position: -360px 0;
  }
  42.9% {
    background-position: -540px 0;
  }
  57.2% {
    background-position: -720px 0;
  }
  71.5% {
    background-position: -900px 0;
  }
  85.8% {
    background-position: -1080px 0;
  }
  100% {
    background-position: 0 0;
  }
}
```

<div class="ele-box">
    <div class="animation-girl"></div>
</div>

到这里，CSS3 新特性的三个有趣的属性就介绍完了。  
个人觉得还是很炫的，毕竟前端在考虑功能的同时，用户感受和用户体验也是很重要的部分。借助这部分新特性，可以完成的效果还是挺不错的。

<script setup>
import { onMounted, nextTick } from 'vue';
 
function init() {
  // CSS3实现
  var css_btn = document.getElementById("transition-css-btn");
  var css_ele = document.getElementById("transition-css-ele");
  var flag1 = false;
  css_btn.onclick = function () {
      flag1 = !flag1;
      css_ele.style.height = flag1 ? "150px" : "0px";
  }

  // JS实现 
  var js_btn = document.getElementById("transition-js-btn");
  var js_ele = document.getElementById("transition-js-ele");
  var flag2 = false, height = 0, timer = null;

  function step() {
      height = flag2 ? (height + 1) : (height - 1);
      if (height < 0) {
          height = 0;
          clearInterval(timer);
          return;
      } else if (height > 150) {
          height = 150;
          clearInterval(timer);
          return;
      }
      js_ele.style.height = height + "px";
  }

  js_btn.onclick = function () {
      if (timer) {
          clearInterval(timer);
      }
      flag2 = !flag2;
      timer = setInterval(step,1) ;
  }

  // jq实现
  if (typeof window.jQuery === 'undefined') {
    const script = document.createElement('script')
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
    script.onload = () => {
      jQuery("#transition-jq-btn").on("click", function () {
          jQuery("#transition-jq-ele").stop().slideToggle();
      })
    }
  } else {
      jQuery("#transition-jq-btn").on("click", function () {
          jQuery("#transition-jq-ele").stop().slideToggle();
      })
  }


}

onMounted(() => {
    nextTick(() => {
        init()
    })
})
</script>

[1]: http://www.w3school.com.cn/css3/css3_intro.asp
[2]: https://cloud.tencent.com/developer/section/1071790
