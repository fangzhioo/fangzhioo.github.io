---
title:      【拓展】JavaScript黑科技写法
subtitle:   记录一些看到的js黑科技的，有趣的写法！
keyword:    JavaScript, 黑科技
date: 2019-04-26 10:51:24
catalog: true
tags:
    - JavaScript
categories: 
    - Web
---

# 前言

有时候，在网上查阅一些资料或者看一些demo时，发现的一些有趣的JavaScript的黑科技写法，就像记录下这些。  

# 主体

1. **一行代码取一个随机色**

```js
function getRandomColor(){
    return "#" + Math.floor((Math.random()*(1<<24))).toString(16);
}
```

2. **一行代码完成一个评级组件**

```js
function getRateStar(rate){
    return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
}
```

3. **如何优雅的实现金钱格式化**  
比如：1234567890 --> 1,234,567,890  

```js
function formatCash(cash){
    return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```

4. **简单有效地让两个整数交换数值**  
常规方法 但是会存在整型数据溢出，对于32位字符最大表示2147483647，大于这个数时，就失败了。  

```js
// 运用C的位操作
var a = 1, b = 2;
a ^= b;
b ^= a;
a ^= b;
```

5. **最少的代码实现数组去重**

```js
[...new Set([1, "1", 0, 2, 1, 3])]
```

6. **短路表达式**  

```js
var a = b && 1 ;
// 相当于
if(b){
    a = 1;
} else {
    a = b;
}
// 还有或运算
var a = b || 1 ;
// 相当于
if(b){
    a = b;
} else {
    a = 1;
}
```

大家都知道上面的`&&`与运算和`||`或运算，对应还有`&`和`|`。这两者的区别在于，**会不会判断执行第二个条件**。  
比如，`a&&b`中，如果`a`为`false`，那么`b`部分便不会执行判断，直接输出`false`；但是对于`a&b`，如果`a`为`false`，还是会去判断执行`b`部分的结果（`b`也可能是个返回`boolean`类型的函数）。这里使用的短路表达式只能使用`&&`和`||`，而不能使用`&`和`|`。  

7. **取出一个数字数组中的最大值和最小值**  

```js
// 最小值
function getMinInArray(numbers) {
    return Math.min.apply(Math, numbers);
}
// 最大值
function getMaxInArray(numbers) {
    return Math.max.apply(Math, numbers);
}
```

8. **快速排序**  

```js
function quickSort(arr){
    var left=[],right=[];
    var flag = arr.length/2;
    if(!flag){
        return arr;
    }
    var mid = arr.splice(flag,1);
    arr.forEach(function(num){
        num<=mid ? left.push(num) : right.push(num);
    })
    return quickSort(left).concat(mid,quickSort(right));
}
```

9. **判断是否为数组、字符串**

官方有提供 `typeof` 方法，但是有一定的局限性，没有办法完全判断。比如，`typeof {}` 和 `typeof []` 的结果都是 `object`，就无法区分具体是对象，还是数组。  
其实JavaScript的原型链告诉我们，为什么输出的都是`object`，这里就不拓展了。

```js
// 判断是否为数组
function isArray(arg){
    return Object.prototype.toString.call(arg) !== "[object Array]"
}
// 判断是否为字符串
function isString(arg){
    return Object.prototype.toString.call(arg) !== "[object String]"
}
```