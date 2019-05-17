---
title:      防抖（Debounce）和节流（Throttle）
subtitle:   事件持续或频繁触发优化解决方案
date: 2019-05-17 14:08:52
catalog: true
header-img:
tags:
    - Debounce
    - Throttle
categories: 
    - Horizons
---

# 前言

在前端开发时，我们经常会需要绑定一些持续触发的事件，如`mousemove`、`resize`、`scroll`等。瞬间的操作都会导致这些事件会被高频触发。 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。还有，比如输入框实时检查时，通常使用的 `oninput` 的事件，这样用户输入过程中，都会触发请求服务器的操作。这些都不是我们想要的结果。
在这种需求下，**防抖（Debounce）** 和 **节流（Throttle）** 就是比较合适的解决方案。

# 正文

## 防抖（Debounce）

> Debounce
> n. 防反跳，按键防反跳（Debounce）为什么要去抖动呢？机械按键在按下时，并非按下就接触的很好，尤其是有簧片的机械开关，会在接触的瞬间反复的开合多次，直到开关状态完全改变。  

我们希望开关只捕获到那次最后的精准的状态切换。在 Javascript 中，那些 DOM 频繁触发的事件，我们想在某个时间点上去执行我们的回调，而不是每次事件每次触发，我们就执行该回调。有点啰嗦，再简单一点的说，我们希望多次触发的相同事件的触发合并为一次触发（其实还是触发了好多次，只是我们只关注那一次）。  

所以，在 Javascript 中，我们就希望频繁事件的回调函数在某段连续时间内，在事件触发后只执行一次。  



## 节流（Throttle）


# 后记

我在这个 [大佬的Blog][1] 中，看到了一个有趣的可视化Demo。有兴趣的可以去大佬Blog查看详情。

参考[这个issue][2]

---

[1]: http://blog.nimius.net/2014/04/javascript-debounce-throttle/
[2]: https://github.com/lishengzxc/bblog/issues/7