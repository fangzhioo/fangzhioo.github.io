# 防抖（Debounce）和节流（Throttle）

在前端开发时，我们经常会需要绑定一些持续触发的事件，如`mousemove`、`resize`、`scroll`等。瞬间的操作都会导致这些事件会被高频触发。 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。还有，比如输入框实时检查时，通常使用的 `oninput` 的事件，这样用户输入过程中，都会触发请求服务器的操作。这些都不是我们想要的结果。
在这种需求下，**防抖（Debounce）** 和 **节流（Throttle）** 就是比较合适的解决方案。

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
  var timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 wait 毫秒时执行 func 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 func
    var context = this,
      args = arguments
    var run = function () {
      timer = null
      func.apply(context, args)
    }
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 func
    clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作）
    // 再过 wait 毫秒就执行 func
    timer = setTimeout(run, wait)
  }
}
```

这种方法，简单粗暴，需要高频地创建定时器。当然，这只是简单的**延时 debounce**，即一个周期后，再执行函数。还有一种**前缘 debounce**，即一个周期开始的同时，执行函数。

其实这种方案已经有成熟的第三方库支持了，像**lodash**、**underscore.js**等，我们来分析下`underscore.js`提供的`.debounce`方法，代码如下：

```js
_.debounce = function (func, wait, immediate) {
  var timeout, result

  var later = function (context, args) {
    timeout = null
    if (args) result = func.apply(context, args)
  }

  var debounced = restArgs(function (args) {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) result = func.apply(this, args)
    } else {
      timeout = _.delay(later, wait, this, args)
    }

    return result
  })

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
```

他提供的`debounce`还接受第三个参数`immediate`，分析可以看出，这个参数是用来配置回调函数是在一个周期的最开始执行（`immediate`为`true`）还是最后执行（`immediate`为`false`），即，上面提到的**延迟 debounce**和**前缘 debounce**。如果`immediate`为`true`，意味着是一个同步的回调，可以传递返回值。详细的可以查看 [underscorejs 的 debounce][3]

再有`lodash`的`debounce`，接受更多的配置，有兴趣的可以去查看 [lodash 的 debounce 源代码][4]。

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
  threshhold || (threshhold = 250)
  // 记录上次执行的时间
  var last
  // 定时器
  var timer
  // 返回的函数，每过 threshhold 毫秒就执行一次 func 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 func
    var context = this
    var now = +new Date(),
      args = arguments
    // 如果距离上次执行 func 函数的时间小于 threshhold，那么就放弃
    // 执行 func，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)
      // 保证在当前时间区间结束后，再执行一次 func
      timer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, threshhold)
      // 在时间区间的最开始和到达指定间隔的时候执行一次 func
    } else {
      last = now
      func.apply(context, args)
    }
  }
}
```

这里每次回调执行以后，需要保存执行的函数的时间戳，为了计算下一次事件触发与本次的时间间隔，从而判断要不要执行回调函数。类似前面的防抖函数，这里除了**延时 throttle**也有**前缘 throttle**。

同样的，我们分析下`underscore.js`提供的`.throttle`方法，代码如下：

```js
_.throttle = function (func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : _.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = _.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}
```

这个函数也同样提供第三个参数`options`，但这个参数是一个对象集，`options.previous`相当于我们自己实现的`last`。它还支持传入`options.leading`和`options.trailing`来控制真正回调触发的时机。也即，**延时**和**前缘**。详细的可以查看 [underscorejs 的 throttle][5]。

再有`lodash`的`throttle`，配置差不多。有兴趣的可以去查看 [lodash 的 throttle 源代码][6]。

我在这个 ~~[大佬的 Blog][1]~~ (好像无法访问了，源码直接放下面好了)中，看到了一个有趣的可视化 Demo。借鉴这个 Demo，我们来做一个可视化的 Demo，来简单粗暴的展示下效果。

<div style="box-sizing: border-box;padding:10px">
    <div style="width: 100%;height: 200px;background: #f5f5f5;border: 1px solid #aaa;box-sizing: border-box;padding: 25px;text-align: center;font-size: 18px;" id="moveonme">请在这里移动你的鼠标（手机端在此滑动手指）</div>
    <div id="showbox" style="width: 100%;padding-top:5px;">
        <canvas id="paintonme" height="360" width="320"></canvas>
    </div>
</div>

<script setup>
import { onMounted } from 'vue'
    
/*
 * @Author: fangzhioo 
 * @Date: 2019-05-20 14:51:04 
 * @Last Modified by: fzoo
 * @Last Modified time: 2019-05-21 09:22:29
 */
var helpers = {
    /**
     * debouncing, executes the function if there was no new event in $wait milliseconds
     * @param func
     * @param wait
     * @param scope
     * @returns {Function}
     */
    debounce: function (func, wait, scope) {
        var timeout;
        return function () {
            var context = scope || this,
                args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * in case of a "storm of events", this executes once every $threshold
     * @param fn
     * @param threshhold
     * @param scope
     * @returns {Function}
     */
    throttle: function (fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
}
function NIM_demo() {
    this.canvas = document.getElementById("paintonme");
    this.context = this.canvas.getContext("2d");

    this.movearea = document.getElementById("moveonme");
    this.showbox = document.getElementById("showbox");

    this.canvasTimeScale = 5 * 1000;

    this.paintColors = ["#bbd", "#464", "#d88"];
    this.totalLanes = this.paintColors.length;

    this.leftMargin = 100;

    var self = this;

    this.init = function () {
        this.canvas.width = this.showbox.clientWidth;
        this.flush();
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            // PHONE OR IPAD
            this.movearea.addEventListener("touchmove", this.regularHandler);
            this.movearea.addEventListener("touchmove", helpers.debounce(self.debounceHandler, 100, this));
            this.movearea.addEventListener("touchmove", helpers.throttle(self.throttleHander, 100, this));
        } else {
            // PC
            this.movearea.addEventListener("mousemove", this.regularHandler);
            this.movearea.addEventListener("mousemove", helpers.debounce(self.debounceHandler, 100, this));
            this.movearea.addEventListener("mousemove", helpers.throttle(self.throttleHander, 100, this));
        }
    }

    /**
     * painting the rectangle / line
     * @param lane
     * @param time
     */
    this.paintRect = function (lane, time) {
        if (time > this.canvasTimeScale) {
            this.startTime += time;
            time = 0;
            this.flush()
        }
        //            console.log(lane,time);
        this.context.fillStyle = this.paintColors[lane];

        var x = (this.canvas.width - this.leftMargin) / this.canvasTimeScale * time + this.leftMargin;
        var y = this.canvas.height / this.totalLanes * lane;
        var height = this.canvas.height / this.totalLanes;
        var width = 1;

        this.context.fillRect(x, y, width, height);
    }

    this.flush = function () {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.font = "200 18px Roboto,Helvetica,Arial";
        this.context.fillStyle = this.paintColors[0];
        this.context.fillText("Regular", 0, 60);

        this.context.fillStyle = this.paintColors[1];
        this.context.fillText("Debounce", 0, 180);

        this.context.fillStyle = this.paintColors[2];
        this.context.fillText("Throttle", 0, 300);
    }
    /**
     * get the time difference
     * @returns {number}
     */
    this.getTimeDiff = function () {
        var time = new Date().getTime();
        if (!this.startTime) {
            this.startTime = time;
        }
        time -= this.startTime;
        return time;
    }

    this.regularHandler = function () {
        self.paintRect(0, self.getTimeDiff());
    }
    this.debounceHandler = function () {
        self.paintRect(1, self.getTimeDiff());
    }
    this.throttleHander = function () {
        self.paintRect(2, self.getTimeDiff());
    }
}

onMounted(() => {
    // 实例化
    var demo = new NIM_demo();
    demo.init();
})

</script>

**Regular** 代表正常事件触发。  
**Debounce** 代表防抖方案事件触发。  
**Throttle** 代表节流方案事件触发。

从图中可以清晰的看出，防抖方案（Debounce）有效的阻止了短期内相同事件重复触发。使得连续触发事件可以在合适的时间点得到处理。而 节流方案（Throttle）有效的使得短期内相同高频的事件重复触发变得低频。

::: details 示例代码

```js
/*
 * @Author: fangzhioo
 * @Date: 2019-05-20 14:51:04
 * @Last Modified by: fzoo
 * @Last Modified time: 2019-05-21 09:22:29
 */
var helpers = {
  /**
   * debouncing, executes the function if there was no new event in $wait milliseconds
   * @param func
   * @param wait
   * @param scope
   * @returns {Function}
   */
  debounce: function (func, wait, scope) {
    var timeout
    return function () {
      var context = scope || this,
        args = arguments
      var later = function () {
        timeout = null
        func.apply(context, args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  /**
   * in case of a "storm of events", this executes once every $threshold
   * @param fn
   * @param threshhold
   * @param scope
   * @returns {Function}
   */
  throttle: function (fn, threshhold, scope) {
    threshhold || (threshhold = 250)
    var last, deferTimer
    return function () {
      var context = scope || this

      var now = +new Date(),
        args = arguments
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }
}

function NIM_demo() {
  this.canvas = document.getElementById('paintonme')
  this.context = this.canvas.getContext('2d')

  this.movearea = document.getElementById('moveonme')
  this.showbox = document.getElementById('showbox')

  this.canvasTimeScale = 5 * 1000

  this.paintColors = ['#bbd', '#464', '#d88']
  this.totalLanes = this.paintColors.length

  this.leftMargin = 100

  var self = this

  this.init = function () {
    this.canvas.width = this.showbox.clientWidth
    this.flush()
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // PHONE OR IPAD
      this.movearea.addEventListener('touchmove', this.regularHandler)
      this.movearea.addEventListener('touchmove', helpers.debounce(self.debounceHandler, 100, this))
      this.movearea.addEventListener('touchmove', helpers.throttle(self.throttleHander, 100, this))
    } else {
      // PC
      this.movearea.addEventListener('mousemove', this.regularHandler)
      this.movearea.addEventListener('mousemove', helpers.debounce(self.debounceHandler, 100, this))
      this.movearea.addEventListener('mousemove', helpers.throttle(self.throttleHander, 100, this))
    }
  }

  /**
   * painting the rectangle / line
   * @param lane
   * @param time
   */
  this.paintRect = function (lane, time) {
    if (time > this.canvasTimeScale) {
      this.startTime += time
      time = 0
      this.flush()
    }
    //            console.log(lane,time);
    this.context.fillStyle = this.paintColors[lane]

    var x = ((this.canvas.width - this.leftMargin) / this.canvasTimeScale) * time + this.leftMargin
    var y = (this.canvas.height / this.totalLanes) * lane
    var height = this.canvas.height / this.totalLanes
    var width = 1

    this.context.fillRect(x, y, width, height)
  }

  this.flush = function () {
    this.context.fillStyle = '#ffffff'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.context.font = '200 18px Roboto,Helvetica,Arial'
    this.context.fillStyle = this.paintColors[0]
    this.context.fillText('Regular', 0, 60)

    this.context.fillStyle = this.paintColors[1]
    this.context.fillText('Debounce', 0, 180)

    this.context.fillStyle = this.paintColors[2]
    this.context.fillText('Throttle', 0, 300)
  }
  /**
   * get the time difference
   * @returns {number}
   */
  this.getTimeDiff = function () {
    var time = new Date().getTime()
    if (!this.startTime) {
      this.startTime = time
    }
    time -= this.startTime
    return time
  }

  this.regularHandler = function () {
    self.paintRect(0, self.getTimeDiff())
  }
  this.debounceHandler = function () {
    self.paintRect(1, self.getTimeDiff())
  }
  this.throttleHander = function () {
    self.paintRect(2, self.getTimeDiff())
  }
}

var demo = new NIM_demo()
demo.init()
```

:::

## 常用场景

- 防抖方案（Debounce）

  - 搜索框搜索输入。只需用户最后一次输入完，再发送请求
  - 手机号、邮箱验证输入检测
  - 窗口大小 Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

- 节流方案（Throttle）
  - 滚动加载，加载更多或滚到底部监听
  - 谷歌搜索框，搜索联想功能
  - 高频点击提交，表单重复提交（抢购、秒杀等）

::: tip 听个故事
就以 throttle 为例，某日，老师给你布置了一个作业，让你深入理解一下 throttle，第二天上课来聊聊。张三心里非常高兴，这个概念在经典书籍《JavaScript 高级程序设计》中见过，打开一看，就两页，而且解释地非常清晰，看完就高兴地干别的事情去了。而李四，觉得高程三讲的有点少，而去谷歌了下其他关于 throttle 的知识点，兴奋地看到 throttle 函数的好几种写法，发现高程三只是用了最简单的方式，还有更优雅运用场景更多的写法，或许此时他已经发现和 throttle 同时出现的还有个 debounce，这是什么鬼？反正老师没说，以后再看吧，于是心满意足地玩游戏去了。而王五，和李四一样发现了 debounce，这是什么？一起了解了吧，继而发现 debounce 的用法居然和高程三中的 throttle 一样！继续挖下去，发现高程三中的 throttle 函数其实应该叫 debounce，看到最后，王五已经把 throttle 和 debounce 彻底理解了。
:::

---

[1]: http://blog.nimius.net/2014/04/javascript-debounce-throttle/
[2]: https://github.com/lishengzxc/bblog/issues/7
[3]: https://underscorejs.org/#debounce
[4]: https://github.com/lodash/lodash/blob/3.10.1/lodash.src.js#L7811
[5]: https://underscorejs.org/#throttle
[6]: https://github.com/lodash/lodash/blob/3.10.1/lodash.src.js#L8401
