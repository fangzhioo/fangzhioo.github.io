---
title:      【JS基础整理】字符串String
subtitle:   JavaScript基础知识整理——字符串
keyword:    String, 字符串
date: 2019-03-21 10:50:24
catalog: true
tags:
    - JavaScript
    - String
categories: 
    - Web
---

# 前言

字符串是JavaScript中，最基本的值类型之一。详细的介绍请参考W3C的[String对象][1]。

> String 对象用于处理文本（字符串）。

## 初始化

初始化字符串，可以分为两种，字面量和构造函数。  

```js
// 1. 字面量方式 双引号或单引号都代表的是字符串
var str = "hello world !";
var str1 = 'welcome to my blog !';
typeof(str); // String

// 2. 构造函数
var str2 = new String("hello world !");
typeof(str2); //object
```

在JavaScript中 `String` 类型的的字符串也可以使用 `Object` 类型中包含的属性和方法，js会默认的将 `String` 类型转换成 `Object`。

## length和获取字符

对字符串而言，是由一个一个的字符拼接而成，可以说，字符是字符串的基本单位。但是JavaScript中，没有字符串和字符的区别。对比Java中，就明显很多，字符只能用单引号，字符串只能用双引号。  

```js
var str = "abcdefg";
// length 计算字符串的长度
console.log(str.length); // 7

// charAt() 返回特定索引位置的字符 默认为0
console.log(str.charAt()); // a
// charCodeAt() 返回特定位置字符在Unicode码中的十进制数 默认为0
console.log(str.charCodeAt()); // 97

// Unicode码转字符
// A-Z对应65-90  a-z对应97-122
var c = String.fromCharCode(65);
console.log(c); // A
```

详细的Unicode码比较多，这里展示其中一部分，如ASCII码对应的十进制数，可以参考下图。  

<img class="shadow" src="/img/article/js-base/ASCII.jpg" alt="ASCII码表" />

## 字符串的常用方法

```js
// indexOf() 从前到后检索子串，返回子串开始位置的索引，无此子串返回-1
var str = 'hello world hello world hello world';
var position = str.indexOf('hello');
console.log(position); // 0
// 如果传入第二个参数（正整数），第二个参数为开始查找的位置，查找方向不变
var position2 = str.indexOf('hello', 35); // -1
console.log(position2);

// lastIndexOf() 从后到前检索子串，返回子串开始位置的索引，无此子串返回-1
var position3 = str.lastIndexOf('hello');
console.log(position3); // 24

// toUpperCase() 原串中所有字母变成大写，新串返回
var str2 = 'hello WORLD';
var str3 = str2.toUpperCase();
console.log(str2); // hello WORLD
console.log(str3); // HELLO WORLD

// toLowerCase() 原串中所有字母变成小写，新串返回
var str4 = str2.toLowerCase();
console.log(str4); // hello world

// concat() 拼接字符串，和 + 一致
var str5 = 'hello';
var str6 = ' world';
var str7 = str5.concat(str6); // hello world
console.log(str7 + '-----' + str5); // hello world-----hello

// localeCompare() 用本地特定的顺序(0123456789aAbB.....zZ)来比较两个字符串 小 -1；等 0；大 1
var str8 = 'A';
var str9 = 'a';
console.log(str8.localeCompare(str9)); // 1

// slice() 提取字符串的片断，并在新的字符串中返回被提取的部分。
var str10 = 'abcdefg';
//正数时  参数1 起始位置 参数2 结束位置后一位
console.log(str10.slice(3, 5)); // de
//负数时  参数1 加长度（转正）参数2 加长度（转正）
console.log(str10.slice(-2, -1)); // f

// substring() 提取字符串中两个指定的索引号之间的字符。
//正数时  参数1 起始位置 参数2 结束位置后一位
console.log(str10.substring(3, 5)); // de
//负数时  参数1 置0 参数2 置0 相当于str10.substring(0, 0)
console.log(str10.substring(-1, -5)); // ""

// substr() 从起始索引号提取字符串中指定数目的字符。
//正数时  参数1 起始位置 参数2 返回新串的长度
console.log(str10.substr(3, 2)); // de
//负数时  参数1 加长度 参数2 置0
console.log(str10.substr(-3, 2)); // ef
```

> String 对象的方法 slice()、substring() 和 substr() （不建议使用）都可返回字符串的指定部分。slice() 比 substring() 要灵活一些，因为它允许使用负数作为参数。slice() 与 substr() 有所不同，因为它用两个字符的位置来指定子串，而 substr() 则用字符位置和长度来指定子串。

## 字符串与数组的转换

实际运用中，会经常涉及数组与字符串之间的互相转换问题。

```js
var str = 'hello world welcome to my blog';
// 字符串 --> 数组
// 参数1 分隔符 参数2 个数限制
var arr = str.split(' ', 2);
console.log(arr); // ["hello", "world"]
// 数组 --> 字符串
// 参数1 连接符
var str2 = arr6.join('*');
console.log(str2); // "hello*world"
var str3 = arr6.toString();
console.log(str3);// "hello,world"
```

## 字符串与数值的转换

数值类型 `Number` 和 字符串 `String` 之间的转换，在实际应用中十分广泛。在学习的时候，严格按照类型来处理是很重要的。

```js
//  字符串 --> 数值
// 【方法一】Number() 构造函数法
// 纯数值字符串，直接输出对应整型或浮点型；数值字符串前有0，忽略0
Number("-999.99"); // -999.99
// 布尔值，真转成1，假转成0
Number(true); // 1
// undefined，转成NaN（Not a Number 非数值）, NaN自身不等（NaN!==NaN）
Number(undefined); // NaN
// 非纯数值字符串，空串转化成0；其他，转NaN
Number("1234abc"); // NaN

// 【方法二】parseInt()/parseFloat() 官方提供函数用于将字符串转化为数值
// 如果第一个字符不是数值字符，返回NaN
parseInt("a123456"); // NaN
// 如果第一个字符是数值字符串，检测第二个……，直到检测到非数值字符，然后将前面数值部分返回
parseInt("1234abc"); // 1234
parseInt("12.34"); // 12
// 对于含小数点的字符串，可以用parseFloat转换为浮点型
parseFloat("12.34"); // 12.34
// 小数点数量超过一个时，只保留第一个小数点后和第二个小数点前的部分
parseFloat("12.34.56"); // 12.34

// 【方法三】隐式转换 只能是纯数值字符串或者空字符串
var str = "123";
console.log(+str); // 123

//  数值 --> 字符串
// 【方法一】toString() 官方提供的方法
var num = 123;
num.toString(); // "123"
// 数值toString方法 也可以接受一个参数，转换为对应进制的字符串 默认为十进制
var num1 = 3;
num.toString(); // "3" 十进制
num.toString(2); // "11" 二进制

// 【方法二】隐式转换
var num = 100;
console.log(""+num); // "100"
```

# 后记

字符串的应用是JavaScript中最基本的部分之一，需要对基本的属性、方法有一定认识，才能为以后更深入的学习JavaScript做铺垫。

---  

[1]: http://www.w3school.com.cn/jsref/jsref_obj_string.asp