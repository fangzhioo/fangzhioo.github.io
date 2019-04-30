---
title:      "【JS基础整理】数组Array"
subtitle:   "JavaScript基础知识整理——数组"
date: 2019-03-26 10:51:24
catalog: true
tags:
    - JavaScript
    - Array
categories: 
    - Web
---

# 前言

数组 `Array` 官方定义的一个类型，存若干数据（有序），数组相关的基础知识整理。详细的可以查看[W3C的相关介绍][1]。  

> Array 对象用于在单个的变量中存储多个值。  

## 初始化

初始化一个数组的方式有两种，字面量和构造函数。

```js
// 1. 字面量创建  
var arr = []; // 创建了一个空数组
var arr1 = [1,,"abc",true,3.14];
console.log(arr1); // 第二个元素是 undefined

// 2. 构造函数创建
var arr2 = new Array(); // [] 创建了一个空数组
arr2 = new Array(1,2,3); // [1,2,3]
//看一下变量的类型
console.log(typeof(arr1)); // object
console.log(typeof(arr2)); // object

//当只传一个参数的时候，若果是一个数字，创建一个长度为这个数字的数组
var arr3 = new Array(20); // 不是[20]，是创建一个长度为20的数组
console.log(arr3.length,arr3); // 20  []

//如果是负值，会报错
// arr3 = new Array(-2);
// Array.html:30 Uncaught RangeError: Invalid array length
console.log(arr3);
```

## length

`length` 是数组的可读可写的属性。  

```js
var arr4 = [1,2,3,4];
// js中数组不存在数组越界
// 可以通过小标添加新的元素
arr4[4] = 5;
console.log(arr4,arr4.length); // [1,2,3,4,5] 5
// length可读可写的属性
arr4.length = 10;
console.log(arr4,arr4.length); // [1,2,3,4,5,empty × 5] 10
// 如果把长度设置成比原有数组长度小，会删除超出长度的元素
arr4.length = 3;
console.log(arr4,arr4.length); // [1,2,3] 3
```

## 访问和遍历数组元素

访问数组中的元素，通过索引（下标）获取元素。

```js
var arr5 = [1,2,3,4];
// 通过索引获取元素
console.log(arr5[0],arr5[5]); // 1 undefined
arr5[2] = 'abc'; // 直接修改某个元素
console.log(arr5);
```

遍历一个数组的方式有很多，有官方提供的，自己实现的等。  

```js
var arr5 = [1,2,3,4,5]
// 方法一   for循环遍历 数组得到遍历  
for(var i = 0; i < arr5.length; i++){
    console.log(arr5[i]);
}

// 方法二   快速遍历for in遍历  据说性能上要比其他的便利快
for(var index in arr5){
    // 这里的变量index是数组的索引
    console.log(index);
}

// 方法三   forEach()遍历，官方给我们提供的方法，需要传一个函数
// 这个函数有一个隐形的参数，代表数组的元素
// 函数内是遍历数组时对每个数组做什么操作
// 并不支持 break
arr5.forEach(function(num){
    console.log(num);
});
```

## 数组的常用方法

数组`Array`对象本身提供了许多方法，这里列举下常用的一些方法。比如 `push`和`pop`、`shift`和`unshift`、`slice`、`sort`等。

```js
var arr7 = [1,2];
// push() 向数组的末尾添加一个或更多元素，并返回新的长度。
console.log(arr7.push(3,4,5)); // 5

// pop() 删除并返回数组的最后一个元素
console.log(arr7.pop()); // 5

// shift() 删除并返回数组的第一个元素
console.log(arr7.shift()); // 1

// unshift() 向数组的开头添加一个或更多元素，并返回新的长度。
console.log(arr7.unshift(1,2)); // 5

// join() 把数组元素拼接成一个字符串（以某个字符串为连接符）不传参就是直接连接""
console.log(arr7.join('/')); // "1/2/2/3/4"

var arr8 = ['a','b','c'];
// reverse() 数组倒序
console.log(arr8.reverse()); // ["c", "b", "a"]

// concat() 拼接两个或更多的数组,返回值是一个新的数组，不会改变原数组
console.log(arr8.concat(['d','e'])); // ["c", "b", "a", "d", "e"]

// slice() 截取数组的一部分,返回值是一个新数组，不会改变原数组
// 第一个参数：起始位置  第二个参数：结束为止的前一个索引
console.log(arr8.slice(0,3)); // ["c", "b", "a"]

// splice() 删除数组元素并向数组添加数组元素 返回删除的元素的数组
// 第一个参数：必须，起始位置（起始索引）
// 第二个参数：必须，如果为0，表示不删除元素，如果为2，删除元素的长度
// 第三、四..参数可以省略，替换的数组元素
arr8.splice(1,0,"z"); // []
console.log(arr8); // ["c", "z", "b", "a"]
arr8.splice(2,1,'w');// ["b"]
console.log(arr8);// ["c", "z", "w", "a"]

// toString() 把数组转成字符串
console.log(arr8.toString()); // "c,z,w,a"

// indexOf() 从头部查找某个元素的索引（第一次出现的位置）
console.log(arr8.indexOf('a')); // 3

// lastIndexOf()  从尾部开始查找（第一次出现的位置）
console.log(arr8.lastIndexOf('a')); // 3

var arr9 = [1,6,3,8,5];
// sort() 排序  参数也是函数function，function有两个隐藏参数，函数内是以何种方式去排序
arr9.sort(function(num1,num2){
    // num1和num2是数组里相邻的两个元素
    // 这个函数必须要有返回值，是 true 或 false
    return num1 - num2; // true 是从大到小  false从小到大
})// 原始的排序需要双层for循环
console.log(arr9); // [1, 3, 5, 6, 8]
```

## 数组和字符串转化

实际运用中，会经常涉及数组与字符串之间的互相转换问题。

```js
var str = 'hello world welcome to my blog';
// 字符串-->数组
// 参数1 分隔符 参数2 个数限制
var arr6 = str.split(' ', 2);
console.log(arr6); // ["hello", "world"]
// 数组-->字符串
// 参数1 连接符
var str2 = arr6.join('*');
console.log(str2); // "hello*world"
var str3 = arr6.toString();
console.log(str3);// "hello,world"

// 对于toString方法，Number变量调用，传入Number（整数），返回对应的进制形式
var value = 3; // 下面将十进制的数字3，转化为二进制的字符串11
console.log(value.toString(2)); // "11"
```

## 数组的迭代方式

```js
var arr = [1, 2, 3, 4, 5, 6, 3, 2];
// every() 参数函数全部返回真值，every()返回真值
function cb (obj, index, arr) {
    return obj > 3;
}
var re = arr.every(cb);
console.log(re); // false

// some() 参数函数只要有一个返回真值，some()返回真值
var re2 = arr.some(cb);
console.log(re2);
var re3 = arr.some(function (obj, index, arr) {
    return obj > 3;
});
console.log(re3); // true

// filter() 过滤掉不符合条件的元素，剩下的元素以新数组的形式返回
var arr2 = arr.filter(function (obj, index, arr) {
    return obj >= 3;
});
console.log(arr2); // [3, 4, 5, 6, 3]

// forEach() 对每个元素，执行特定操作
arr.forEach(function (obj, index, arr) {
    arr[index] = ++obj
});
console.log(arr); // [2, 3, 4, 5, 6, 7, 4, 3]
```

## 数组相关拓展

1. 快速排序

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


# 后记

数组的运用在JavaScript中的运用十分普遍广泛，这部分的基础尤为重要。在实际的工作中，可能运用到第三方的类库，比如[JQuery][2]、[Lodash][3]等，但是掌握最基础的，才能明白其中的原理。

---  

[1]: http://www.w3school.com.cn/jsref/jsref_obj_array.asp
[2]: http://www.w3school.com.cn/jquery/traversing_map.asp
[3]: https://www.html.cn/doc/lodash/