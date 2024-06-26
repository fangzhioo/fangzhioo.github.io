# Window 对象

浏览器 root 对象为 window 对象，而在 nodejs 上，root 对象为 global 对象。

## BOM 和 DOM

`BOM（Browser Object Model）`指的是**浏览器对象模型**，在我们使用浏览器时，会和浏览器有一定的交互，比如移动、调整浏览器大小；返回上一级或者下一级页面等。这些事件和方法就属于`BOM`。详细的说明可以查看 W3C 的[Browser 对象][1]。  
`DOM（Document Object Model）`指的是**文档对象模型**，在浏览器载入 HTML 文档时，就会成为 Document 对象，这个对象可以让我们访问到 HTML 页面中的所有元素。详细的说明可以查看 W3C 的[HTML DOM Document 对象][2]。

### BOM

BOM（Browser Object Model）浏览器对象模型，BOM 就是 JavaScript 获取记忆管理各个浏览器的内容。通过什么方式来管理浏览器？ 主要就是通过 window 对象。我们可以在浏览器（谷歌）按`F12`，打开控制台，直接输入`window`或者`this`。就可以看到打印出的`window`对象。

![window对象](./images/bom-dom/bom-dom-1.png)

当我们定义一个全局变量或者函数时，这个变量或函数就是挂载到 window 上，成为 window 的属性或函数。

```js
// 变量
var a_global = "Here is Fz'Blog"

console.log(a_global) // Here is Fz'Blog
console.log(window.a_global) // Here is Fz'Blog

// 函数
function a_welcome() {
  console.log("Welcome to Fz'Blog")
}

a_welcome() // Welcome to Fz'Blog
window.a_welcome() // Welcome to Fz'Blog
```

![全局属性](./images/bom-dom/bom-dom-2.png)

#### window 常用属性

在我们与浏览器交互时，需要用到很对浏览器提供的接口属性。这部分常用的属性就在 window 对象上，比如`ducument`、`history`、`location`、`screen`和`navigator`等等。

- **document**  
  浏览器载入 HTML 文档都会成为`Document对象`。而`window.document`属性就是访问`Document对象`的入口。可以通过这个入口，访问页面上个每个 DOM 元素。详细的可以查看下面的 DOM。

![document](./images/bom-dom/bom-dom-3.png)

- **history**  
  `History对象`包含用户（在浏览器窗口中）访问过的 URL。`window.history`属性提供访问的入口。

![history](./images/bom-dom/bom-dom-4.png)

可以通过这个属性，实现按照历史记录返回上一页（`window.history.back`），跳转下一个（`window.history.forward`）或者跳转到具体页面（`window.history.go`）。

- **location**  
  `Location对象`包含有关当前 URL 的信息。可通过 `window.location` 属性来访问。

![location](./images/bom-dom/bom-dom-5.png)

可以通过这个属性，带本地缓存刷新页面（`window.location.reload()`），也可以禁用本地缓存刷新页面（`window.location.reload(true)`）。

- **screen**  
  `Screen对象`包含有关客户端显示屏幕的信息。可通过 `window.screen` 属性来访问。

![screen](./images/bom-dom/bom-dom-6.png)

- **navigator**  
  `Navigator对象`包含有关浏览器的信息。可通过 `window.navigator` 属性来访问。

![navigator](./images/bom-dom/bom-dom-7.png)

可以通过这个属性，判断当前设备。再做 H5 页面时，可能需求判断手机是安卓还是 IOS，就可以通过这个属性来判断。

#### window 常用方法

浏览器提供了一些方法，使得我们更简单地实现对浏览器的交互。常用的包括`alert`、`confirm`、`close`、`open`、`resizeTo`和`scrollTo`等等。详细的这部分方法，可以查看[W3C 的 Window 对象][3]。这些方法都可以完成一些浏览器操作，我们选择`open`方法简单实现下与浏览器的交互。  
`window.open` 用于打开一个新的浏览器窗口或查找一个已命名的窗口。

<p><span id="window-open-btn" style="text-decoration: underline;cursor: pointer;">点击看文章</span></p>

```js
// 第一个参数：指定打开的是哪个页面
// 第二个参数：是否是新窗口打开
// 第三个参数：指定窗口的位置以及大小，窗口的特性width，height，top，left，toolbar location是否显示地址栏 (IE有效)
window.open('https://fangzhioo.github.io/', 'blank', 'width=400px,height=600px,top=0,left=0,toolbar=yes,location=no;')
```

#### window 常用事件

浏览器为我们提供了很多事件，我们通过这些事件，可以完成很多的浏览器交互。比如`onscroll`、`onload`、`onresize`和`onreset`等等。浏览器提供的事件众多，这里我们选择`onscroll`事件来简单实现下对浏览器事件的处理。  
`window.onscroll`事件在元素滚动条在滚动时触发。我们可以滚动下页面，查看效果。

<div style="border:1px solid #cfcfcf;padding:20px;text-align:center;" >距离顶部：<span style="color:red;font-weight:600;" id="window-onscroll-view">0</span> px</div>

```js
window.onscroll = function () {
  console.log(`距离顶部：${window.pageYOffset}px`)
}
```

#### 定时器

定时器其实也算是 window 的常用方法，但由于比较特殊，这里单独列举下。定时器分为 **连续定时器** 和 **延时定时器**。  
**连续定时器** 方法是 `setInterval()` 按照指定的周期（以毫秒为单位）来调用函数或表达式。这种方式会不停地调用函数，直到浏览器窗口被关闭或者使用 `clearInterval()` 方法停止它。  
**延时定时器** 方法是 `setTimeout()` 按照指定的毫秒数之后调用函数或表达式，只会执行一次。在执行之前，关闭浏览器窗口或者使用`clearTimeout()` 方法停止它。  
定时器可以用来实现一些动画效果。我们运用定时器方法，来实现一个倒计时。

<div style="border:1px solid #cfcfcf;padding:20px;text-align:center;color:red;" id="clock" >请开始倒计时！</div>
<div style="padding:20px 0;">
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" id="play" class="btn btn-default">开始</button>
        <button type="button" id="pause" class="btn btn-default">暂停</button>
        <button type="button" id="reset" class="btn btn-default">重置播放</button>
    </div>
</div>

下面也可以尝试自己定义倒计时的时间，单位为 **分钟** 。点击 **Let's Go!** 开始计时。

<div class="input-group input-group-sm">
    <input type="number" id="input_clock" min="1" max="1440" class="form-control" value="3" placeholder="请输入倒计时">
    <span class="input-group-btn"><button class="btn btn-default" id="diy-clock-btn" type="button">Let's Go!</button></span>
</div>

```html
<div id="clock"></div>
<div>
  <button id="play">开始</button>
  <button id="pause">暂定</button>
  <button id="reset">重置</button>
</div>
```

```js
var clock = document.getElementById('clock')
var play = document.getElementById('play')
var pause = document.getElementById('pause')
var reset = document.getElementById('reset')
var timer = null
var countdown = 2 * 60 * 60 * 1000 // 120min
function run(T) {
  if (T <= 0) {
    // 已经过期了
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
    countdown = 2 * 60 * 60 * 1000 // 120min
    clock.innerHTML = '时间到！！'
  } else {
    // 继续
    var H = Math.floor(T / 3600000) ? Math.floor(T / 3600000) : '00'
    var M = Math.floor((T % 3600000) / 60000) ? Math.floor((T % 3600000) / 60000) : '00'
    var S = Math.floor((T % 60000) / 1000)
    clock.innerHTML = `${H} : ${M} : ${S}`
    countdown += -1000
  }
}

play.onclick = function () {
  if (timer === null) {
    timer = setInterval(function () {
      run(countdown)
    }, 1000)
  }
}

pause.onclick = function () {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

reset.onclick = function () {
  pause.click()
  countdown = 2 * 60 * 60 * 1000 // 120min
  play.click()
}
```

### DOM

DOM（Document Object Model），即文档对象模型，`HTML DOM Document 对象`。每个 HTML 文档载入浏览器时，都会被浏览器解析成`Document对象`。通过这个对象，我们可以获取到页面上所有的元素对象。同时，`Document对象`也是`Window对象`的一部分。之前提到了，可以通过`window.document`属性访问。相对 BOM 来说，对 DOM 的使用显得更加频繁。

#### DOM 的节点分类

1. 整个文档是一个文档节点；
2. 每个 html 元素是元素节点；
3. html 元素内的文本时文本节点；
4. html 元素的属性是属性节点；
5. 注释是注释节点。

Document 对象集合上，提供很多的属性和方法，来获取信息和访问页面上的元素对象。如`document.body`可以获取到整个`body`的结构；`document.cookie` 可以设置或返回与当前文档有关的所有 cookie 等。详细的内容可以查看 [W3C 的 HTML DOM Document 对象][4]

```html
<h1 id="myh1" class="title">hello world</h1>
<h3 name="myh3">总有些惊奇的机遇</h3>
<h4>比方说当我遇见你</h4>
<img id="myimg" src="https://picsum.photos/300/250" />
<button id="mybtn">点赞</button>
```

```js
// 节点类
console.log(Node.prototype)
// 元素类 Element继承于Node
console.log(Document.prototype)
console.log(Element.prototype)
// 文本类
console.log(Text.prototype)
// 文档入口对象
console.log(typeof document)
console.log(document instanceof Document)

// nodeName 节点名
console.log(document.nodeName)
console.log(document.getElementById('myh1').nodeName)
// nodeValue 节点值
console.log(document.nodeValue)
// childNodes 子节点
console.log(document.childNodes)
console.log(document.getElementById('myh1').childNodes)
// hasChildNodes() 判断有无节点
console.log(document.hasChildNodes())
```

#### 属性和方法

利用`document`提供的属性和方法，我们获取具体的一个元素，并操作这个元素。

```js
// 通过ID查找
var h1 = document.getElementById('myh1')
// 通过类名查找 在IE8以下无法使用
document.getElementsByClassName('myh1')[0]
// 通过name来获取元素
document.getElementsByName('myh3')[0]
// 通过选择器查找元素
document.querySelector('#myh1')
document.querySelector('.title')[0]
document.querySelector('body>h1')
// 通过标签查找
var img = document.getElementsByTagName('myimg')[0]

console.log(h1 instanceof Element)
console.log(img instanceof HTMLCollection)
console.log(img instanceof Element)

// 标签名
console.log(h1.tagName)
console.log(img.tagName)
// id值
console.log(h1.id)
// class
console.log(h1.className)

// 获取节点的文本内容  innerHTML  outerHTML innerText
console.log(h1.innerHTML)
console.log(h1.outerHTML)
console.log(h1.innerText)

// 更改h1的文本内容
h1.innerText = '哈哈哈哈哈。。。'
h1.setAttribute('style', 'border: solid thick gold;')
```

#### 元素节点的操作

也有一些方法`createElement`、`removeChild`、`insertBefore` 和 `repalceChild`，用于增删改替换这些元素。

```js
// getElementsByTagName 通过标签名获取元素
var bodyNode = document.getElementsByTagName('body')[0]

// createElement() 创建h2节点（元素）
var h2Node = document.createElement('h2')
h2Node.innerText = '一剑，一念。'

// appendChild() 添加子节点 将h2Node节点 加入 bodyNode节点
bodyNode.appendChild(h2Node)

// removeChild() 删除节点
var h1Node = document.getElementsByTagName('h1')[0]
bodyNode.removeChild(h1Node)

// insertBefore() 在某节点前插入节点
// 带插入的节点
var h5Node = document.createElement('h5')
h5Node.innerText = '树叶的一生，只是为了归根吗？'
// 参考位置节点
var h4Node = document.getElementsByTagName('h4')[0]
bodyNode.insertBefore(h5Node, h4Node)

// repalceChild() 替换节点
var h6Node = document.createElement('h6')
h6Node.innerText = '我命由我，不由天。'
var h3Node = document.getElementsByTagName('h3')[0]
bodyNode.replaceChild(h6Node, h3Node)
```

#### 文本节点的操作

除了节点元素，还有一些处理纯文本的增删改方法 `appendData`、`deleteData` 等。

```js
// 新建文本节点
var textNode = document.createTextNode('hello world')
// 根据偏移量去分割节点,并获得splitText()返回的文本节点
var returnValue = textNode.splitText(2)
// 添加节点到h1节点
document.querySelector('h1').appendChild(textNode)
// 添加 splitText()返回的文本节点到body节点
document.querySelector('body').appendChild(returnValue)

// 追加文本节点
textNode.appendData('!!!')
// 删除文本
textNode.deleteData(11, 3)
// 替换文本
textNode.replaceData(5, 5, '世界')
// 插入文本
textNode.insertData(5, ' ')
```

#### 节点的事件

不止可以对元素节点的属性获取修改什么的，还有对节点的事件监听。

```js
var mybtn = document.getElementById('mybtn')
//对 mybtn 添加点击事件
div.onclick = function () {
  alert('你点赞了我')
}
```

这里的事件简单介绍下，后续会对事件有详细的整理。

---

[1]: http://www.w3school.com.cn/jsref/dom_obj_window.asp
[2]: http://www.w3school.com.cn/jsref/dom_obj_document.asp
[3]: http://www.w3school.com.cn/jsref/dom_obj_window.asp
[4]: http://www.w3school.com.cn/jsref/dom_obj_document.asp

<script setup>
import { onMounted, nextTick } from 'vue';
   
function init() {
    // 展示open方法
    document.getElementById("window-open-btn").onclick = function () {
        window.open('https://fangzhioo.github.io/', 'blank', 'width=400px,height=600px,top=0,left=0,toolbar=yes,location=no;');
    }

    // onscroll滚动监听
    window.onscroll = function (e) {
        var view = document.getElementById("window-onscroll-view");
        view && (view.innerHTML = window.pageYOffset);
    }

    // 定时器倒计时
    var clock = document.getElementById("clock");
    var play = document.getElementById("play");
    var pause = document.getElementById("pause");
    var reset = document.getElementById("reset");
    var timer = null;
    var countdown = 2 * 60 * 60 * 1000; // 120min
    function run(temp) {
        if (temp === 0) {
            // 已经过期了
            if (timer !== null) {
                clearInterval(timer);
                timer = null;
            }
            countdown = 2 * 60 * 60 * 1000; // 120min
            clock.innerHTML = "时间到！！";
        } else {
            // 继续
            var H = Math.floor(temp / 3600000) ? Math.floor(temp / 3600000) : "00";
            var M = Math.floor(temp % 3600000 / 60000) ? Math.floor(temp % 3600000 / 60000) : "00";
            var S = Math.floor(temp % 60000 / 1000);
            clock.innerHTML = `${H} : ${M} : ${S}`;
            countdown += -1000;
        }
    }

    play.onclick = function () {
        if (timer === null) {
            timer = setInterval(function () {
                run(countdown);
            }, 1000)
        }
    }

    pause.onclick = function () {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    reset.onclick = function () {
        pause.click();
        countdown = 2 * 60 * 60 * 1000; // 120min
        play.click();
    }

    document.getElementById("diy-clock-btn").onclick = function (){
        var T = Math.abs(parseInt(document.getElementById("input_clock").value))* 60 * 1000;
        if(T){
            pause.click();
            countdown = T; // 120min
            play.click();
        }
    }
}

onMounted(() => {
    nextTick(() => {
        init()
    })
})
</script>
