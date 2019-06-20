---
title:      防抖（Debounce）和节流（Throttle）
subtitle:   事件持续或频繁触发优化解决方案
keyword:    Debounce, Throttle
date: 2019-05-17 14:08:52
catalog: true
header-img:
tags:
    - Debounce
    - Throttle
categories: 
    - More
---

# 前言

在前端开发时，我们经常会需要绑定一些持续触发的事件，如`mousemove`、`resize`、`scroll`等。瞬间的操作都会导致这些事件会被高频触发。 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。还有，比如输入框实时检查时，通常使用的 `oninput` 的事件，这样用户输入过程中，都会触发请求服务器的操作。这些都不是我们想要的结果。
在这种需求下，**防抖（Debounce）** 和 **节流（Throttle）** 就是比较合适的解决方案。

# 正文

## 防抖（Debounce）

> Debounce
> n. 防反跳

在 Javascript 中，那些 DOM 频繁触发的事件，我们想在某个时间点上去执行我们的回调，而不是每次事件每次触发，我们就执行该回调。简单一点的说，我们希望多次触发的相同事件的触发合并为一次触发（其实还是触发了好多次，只是我们只关注那一次）。  

所以，在 Javascript 中，我们就希望频繁事件的回调函数在某段连续时间内，在事件触发后只执行一次。那么我们需要设定一个周期延迟执行动作，若在期间又被触发，则重新设定周期，直到一个周期结束，再执行回调事件。  

```js
/**
* 防抖函数，在周期内没有新事件触发，则执行函数
* @param func 实际要执行的函数
* @param wait 延迟时间，单位是毫秒（ms）
* @returns {Function}  返回一个防抖函数
*/
function debounce(func, wait) {
    // 定时器，用来 setTimeout
    var timer;
    // 返回一个函数，这个函数会在一个时间区间结束后的 wait 毫秒时执行 func 函数
    return function() {
        // 保存函数调用时的上下文和参数，传递给 func
        var context = this,
            args = arguments;
        var run = function() {
            timer = null;
            func.apply(context, args);
        };
        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 func
        clearTimeout(timer);
        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作）
        // 再过 wait 毫秒就执行 func
        timer = setTimeout(run, wait);
    };
}
```

这种方法，简单粗暴，需要高频地创建定时器。当然，这只是简单的**延时debounce**，即一个周期后，再执行函数。还有一种**前缘debounce**，即一个周期开始的同时，执行函数。  

其实这种方案已经有成熟的第三方库支持了，像**lodash**、**underscore.js**等，我们来分析下`underscore.js`提供的`.debounce`方法，代码如下：  

```js
_.debounce = function (func, wait, immediate) {
    var timeout, result;

    var later = function (context, args) {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function (args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            timeout = _.delay(later, wait, this, args);
        }

        return result;
    });

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};
```

他提供的`debounce`还接受第三个参数`immediate`，分析可以看出，这个参数是用来配置回调函数是在一个周期的最开始执行（`immediate`为`true`）还是最后执行（`immediate`为`false`），即，上面提到的**延迟debounce**和**前缘debounce**。如果`immediate`为`true`，意味着是一个同步的回调，可以传递返回值。详细的可以查看 [underscorejs的debounce][3]  

再有`lodash`的`debounce`，接受更多的配置，有兴趣的可以去查看 [lodash的debounce源代码][4]。

## 节流（Throttle）

> Throttle
> n. 节流阀

连续高频触发事件时，动作会被定期执行，响应平滑。节流的策略是，固定周期内，只执行一次动作，若有新事件触发，不执行。周期结束后，又有事件触发，开始新的周期。  

```js
/**
 * 节流函数，在大量的事件触发时，按照节流周期，只执行一次
 * @param func          实际要执行的函数
 * @param threshhold    执行间隔，单位是毫秒（ms）
 * @returns {Function}  返回一个节流函数
 */
function throttle(func, threshhold) {
    // 默认间隔为 250ms
    threshhold || (threshhold = 250);
    // 记录上次执行的时间
    var last;
    // 定时器
    var timer;
    // 返回的函数，每过 threshhold 毫秒就执行一次 func 函数
    return function () {
        // 保存函数调用时的上下文和参数，传递给 func
        var context = this;
        var now = +new Date,
            args = arguments;
        // 如果距离上次执行 func 函数的时间小于 threshhold，那么就放弃
        // 执行 func，并重新计时
        if (last && now < last + threshhold) {
            clearTimeout(timer);
            // 保证在当前时间区间结束后，再执行一次 func
            timer = setTimeout(function () {
                last = now;
                func.apply(context, args);
            }, threshhold);
        // 在时间区间的最开始和到达指定间隔的时候执行一次 func
        } else {
            last = now;
            func.apply(context, args);
        }
    };
}
```

这里每次回调执行以后，需要保存执行的函数的时间戳，为了计算下一次事件触发与本次的时间间隔，从而判断要不要执行回调函数。类似前面的防抖函数，这里除了**延时throttle**也有**前缘throttle**。  

同样的，我们分析下`underscore.js`提供的`.throttle`方法，代码如下：  

```js
_.throttle = function (func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};
```

这个函数也同样提供第三个参数`options`，但这个参数是一个对象集，`options.previous`相当于我们自己实现的`last`。它还支持传入`options.leading`和`options.trailing`来控制真正回调触发的时机。也即，**延时**和**前缘**。详细的可以查看 [underscorejs的throttle][5]。

再有`lodash`的`throttle`，配置差不多。有兴趣的可以去查看 [lodash的throttle源代码][6]。

# 后记

我在这个 [大佬的Blog][1] 中，看到了一个有趣的可视化Demo。借鉴这个Demo，我们来做一个可视化的Demo，来简单粗暴的展示下效果。  

<div style="box-sizing: border-box;padding:10px">
    <div style="width: 100%;height: 200px;background: #f5f5f5;border: 1px solid #aaa;box-sizing: border-box;padding: 25px;text-align: center;font-size: 18px;" id="moveonme">move your mouse or finger here</div>
    <div id="showbox" style="width: 100%;padding-top:5px;">
        <canvas id="paintonme" height="360" width="320"></canvas>
    </div>
</div>

不难看出，方案有效的实现了防抖和节流的作用。

---

[1]: http://blog.nimius.net/2014/04/javascript-debounce-throttle/
[2]: https://github.com/lishengzxc/bblog/issues/7
[3]: https://underscorejs.org/#debounce
[4]: https://github.com/lodash/lodash/blob/3.10.1/lodash.src.js#L7811
[5]: https://underscorejs.org/#throttle
[6]: https://github.com/lodash/lodash/blob/3.10.1/lodash.src.js#L8401

<script async defer src="/js/more-debounce-throttle.js"></script>
