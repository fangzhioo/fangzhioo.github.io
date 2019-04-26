---
title:      "JavaScript黑科技写法"
subtitle:   "记录一些看到的js黑科技的，有趣的写法！"
date: 2019-04-26 10:51:24
catalog: true
tags:
    - JavaScript
    - 前端
catagories: 
    - Web
---

# 前言

有时候，在网上查阅一些资料或者看一些demo时，发现的一些有趣的JavaScript的黑科技写法，就像记录下这些。  

# 主体

1. 一行代码取一个随机色

```js
function getRandomColor(){
    return "#" + Math.floor((Math.random()*(1<<24))).toString(16);
}
```

2. 一行代码完成一个评级组件

```js
function getRateStar(rate){
    return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
}
```

3. 如何优雅的实现金钱格式化：1234567890 --> 1,234,567,890

```js
function formatCash(cash){
    return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```
