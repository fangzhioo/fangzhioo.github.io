---
outline: 2
---

# PC 踩坑记录

## `transform` 导致字体不清晰

`transform` 在**渲染非整数的 `px` 时**就会出现字体模糊

#### 解决方法

```css
/* 方案一 */
目标元素 {
  -webkit-font-smoothing: antialiased;
}

/* 方案二 */
目标元素 {
  transform: perspective(1px);
}
```

[详细说明 CSS-TRACKS](https://css-tricks.com/forums/topic/transforms-cause-font-smoothing-weirdness-in-webkit/)

## 删除 `PWA` 服务后，浏览器无法更新到最新页面

本站之前使用了 `PWA`，在切换到 `vitepress` 后移除了 `PWA` 服务，在部署后浏览器仍然访问的是 `vuepress` 版本的

#### 解决方法

```js
/* 注销 PWA 服务 */
if (window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}

/* 删除浏览器中的缓存 */
if ('caches' in window) {
  caches.keys().then(function (keyList) {
    return Promise.all(
      keyList.map(function (key) {
        return caches.delete(key)
      })
    )
  })
}
```

## 一个 19 位的数字类型精度丢失问题

在今天对接某 API 时，出现了一个长度为 19 的 number 数字，在经过 axios 的 `res.json()` 之后，数据精度丢失问题。

如 `1714908912015130369` 在控制台输入后，会变成 `1714908912015130400` 精度丢失。

js 中，不区分 int float 等等，只有一个 Number 类型。占 64 位（8 字节）。

数字类型采用 64 位浮点格式表示，我们可以利用 Number 对象的属性 Number.MAX_VALUE , Number.MIN_VALUE 来查看；JavaScript 中 Number 范围为正负 2 的 53 次方，也即从最小值-9007199254740992 到最大值+9007199254740992 之间的范围。−9007199254740992 and 9007199254740992 （即正负 2 的 53 次方）
