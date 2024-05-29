---
description: 记录开发中的一些常用方法：环境判断、验证url是否有效、提取身份证信息
---

# 常用方法

> 收集开发中的一些常用方法

## 环境判断

```js
const UA = window.navigator.userAgent.toLowerCase()

// Android
const isAndroid = /android/.test(UA)

// IOS
const isIOS = /iphone|ipad|ipod|ios/.test(UA)

// 浏览器环境
const inBrowser = typeof window !== 'undefined'

// IE
const isIE = /msie|trident/.test(UA)

// Edge
const isEdge = UA.indexOf('edge/') > 0

// Chrome
const isChrome = /chrome\/\d+/.test(UA) && !isEdge

// 微信
const isWeChat = /micromessenger/.test(UA)

// 移动端
const isMobile = 'ontouchstart' in window
```

## 微信 `api promise` 化

::: details 微信 `api promise` 化

```js
function promisify(fn) {
  return function (options) {
    return new Promise((resolve, reject) => {
      fn(
        Object.assign({}, options, {
          success: resolve,
          fail: reject
        })
      )
    })
  }
}

// 例 获取系统信息
promisify(wx.getSystemInfo)
  .then(res => {
    console.log('success', res)
  })
  .catch(err => {
    console.log('fail', err)
  })
```

:::

## 验证 `url` 是否有效

```js
function isUrl(string) {
  if (typeof string !== 'string') {
    return false
  }
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}

isUrl('tongren') // false

isUrl('https://github.com/fangzhioo') // true
isUrl('https://a.b.c') // true
```

::: warning 注意
该技巧只适用于一些验证不严格的场景，[严格场景下可以使用这个 npm 包 —— is-url](https://github.com/segmentio/is-url)
:::

## 提取身份证信息

::: details 提取身份证信息

```js
/**
 * 获取身份证信息
 * @param {String} idCard 身份证号码
 * @param {String} separator 出生年月日的分割字符，默认为 `/`
 * @returns {Object} { age, birthday, gender }
 */
function getIdCardInfo(idCard, separator = '/') {
  if (!/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(idCard)) {
    throw Error(`${idCard}不是一个身份证号码`)
  }
  // 提取 idCard 中的字符
  const idSubstr = (s, e) => idCard.substr(s, e)
  // 拼接日期
  const splice = d => d.join(separator)
  // 获取出生年月日 性别（0 女 1 男）
  let birthday, gender
  if (idCard.length === 18) {
    birthday = splice([idSubstr(6, 4), idSubstr(10, 2), idSubstr(12, 2)])
    gender = idSubstr(-2, 1) & 1
  } else {
    birthday = splice(idSubstr(6, 2), idSubstr(8, 2), idSubstr(10, 2))
    gender = idSubstr(-1, 1) & 1
  }
  // 获取年龄（实岁）
  const birthDate = new Date(birthday)
  const newDate = new Date()
  const year = newDate.getFullYear()
  let age = year - birthDate.getFullYear()
  if (newDate < new Date(splice([year, birthday.substring(5)]))) {
    age--
  }
  return {
    age,
    birthday,
    gender
  }
}
```

:::

## 一行代码取一个随机色

```js
function getRandomColor() {
  return '#' + Math.floor(Math.random() * (1 << 24)).toString(16)
}
```

## 一行代码完成一个评级组件

```js
function getRateStar(rate) {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
}
```

## 如何优雅的实现金钱格式化

比如：1234567890 --> 1,234,567,890

```js
function formatCash(cash) {
  return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
```

## 简单有效地让两个整数交换数值

常规方法 但是会存在整型数据溢出，对于 32 位字符最大表示 2147483647，大于这个数时，就失败了。

```js
// 运用C的位操作
var a = 1,
  b = 2
a ^= b
b ^= a
a ^= b
```

## 最少的代码实现数组去重

```js
;[...new Set([1, '1', 0, 2, 1, 3])]
```

## 短路表达式

大家都知道上面的`&&`与运算和`||`或运算，对应还有`&`和`|`。这两者的区别在于，**会不会判断执行第二个条件**。  
比如，`a&&b`中，如果`a`为`false`，那么`b`部分便不会执行判断，直接输出`false`；但是对于`a&b`，如果`a`为`false`，还是会去判断执行`b`部分的结果（`b`也可能是个返回`boolean`类型的函数）。这里使用的短路表达式只能使用`&&`和`||`，而不能使用`&`和`|`。

::: details 短路表达式

```js
var a = b && 1
// 相当于
if (b) {
  a = 1
} else {
  a = b
}
// 还有或运算
var a = b || 1
// 相当于
if (b) {
  a = b
} else {
  a = 1
}
```

:::

## 取出一个数字数组中的最大值和最小值

::: details 取出一个数字数组中的最大值和最小值

```js
// 最小值
function getMinInArray(numbers) {
  return Math.min.apply(Math, numbers)
}
// 最大值
function getMaxInArray(numbers) {
  return Math.max.apply(Math, numbers)
}
```

:::

## 快速排序

::: details 快速排序

```js
function quickSort(arr) {
  var left = [],
    right = []
  var flag = arr.length / 2
  if (!flag) {
    return arr
  }
  var mid = arr.splice(flag, 1)
  arr.forEach(function (num) {
    num <= mid ? left.push(num) : right.push(num)
  })
  return quickSort(left).concat(mid, quickSort(right))
}
```

:::

## 判断是否为数组、字符串

官方有提供 `typeof` 方法，但是有一定的局限性，没有办法完全判断。比如，`typeof {}` 和 `typeof []` 的结果都是 `object`，就无法区分具体是对象，还是数组。  
其实 JavaScript 的原型链告诉我们，为什么输出的都是`object`，这里就不拓展了。

::: details 判断是否为数组、字符串

```js
// 判断是否为数组
function isArray(arg) {
  return Object.prototype.toString.call(arg) !== '[object Array]'
}
// 判断是否为字符串
function isString(arg) {
  return Object.prototype.toString.call(arg) !== '[object String]'
}
```

:::

## 生成水印

::: details 水印生成

```js
const id = 'ab1814913b0fd86c70557424f'

// 页面添加水印效果
const setWatermark = (str: string) => {
  try {
    const wDom = document.getElementById(id)
    if (!str && wDom) {
      document.body.removeChild(<HTMLElement>document.getElementById(id))
      return
    }
    if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id))
    const can = document.createElement('canvas')
    can.width = 200
    can.height = 130
    const cans: any = can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = '16px Vedana'
    cans.fillStyle = 'rgba(200, 200, 200, 0.30)'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 10, can.height / 2)
    const div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '15px'
    div.style.left = '0px'
    div.style.position = 'fixed'
    div.style.zIndex = '10000000'
    div.style.width = '100vw'
    div.style.height = '100vh'
    div.style.background = `url(${can.toDataURL('image/png')}) left top repeat`
    document.body.appendChild(div)
    return id
  } catch (error) {
    console.warn('Watermark Setting Error：', error)
  }
}


/**
 * 页面添加水印效果
 * @method set 设置水印
 * @method del 删除水印
 */
const watermark = {
  // 设置水印
  set: (str: string) => {
    return setWatermark(str)
  },
  // 删除水印
  del: () => {
    if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id))
  },
}


// 导出方法
export default watermark;

```

:::
