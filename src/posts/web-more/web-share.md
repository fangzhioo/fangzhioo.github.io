---
title:      【分享】在阿里DT完成一系列产品后，分享下团队前端部分的技术选型～
subtitle:   主要是分享这段时间，开发所运用的技术栈，个人觉得比较实用，分享给大家参考下～
keyword:    React.js, TypeScript, Antd, Umi.js, Pont
date: 2020-05-17 14:08:52
catalog: true
header-img:
tags:
    - Share
categories: 
    - More
---


# 开发环境准备

## node

### 安装 node.js / npm

尽量安装 10.x 以上版本。如果已经安装好了 node.js，那么其中已经自带**npm**（包管理工具）。

---

## vscode 代码编辑器

前端代码推荐使用 vscode 开发，因为需要配合后面用到的**pont**接口层生成工具，还有就是对 `typescript` 比较友好。

可以去官网自行下载安装 [官方站点](https://code.visualstudio.com/)。

在插件拓展里，可以搜索安装需要的插件。来对 `React.js` 、`typescript` 等更加友好的支持。

常见的插件有如下：

- 软件中文包：Chinese (Simplified) Language Pack for Visual Studio Code
- 代码 lint：ESLint
- 路径补全：Path Autocomplete
- 代码美化：prettier
- 接口工具：Pont
- React 支持： ES7 React/Redux/GraphQL/React-Native snippets
- Git 拓展： GitLens — Git supercharged
- 开发辅助： Visual Studio IntelliCode
- ……

---

# 前端语言和框架

---

## ES6

对于 `javascript` ，我们并不陌生，这里说的 `ES6`，甚至 ES7、ES8 等又是什么回事？

> ECMAScript 6.0（简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

这里特别说到 ES6，是因为从 ES5 到 ES6，有了很大的变化，且我们的项目中，都是以 ES6 为标准书写的代码。所以我们这里简单介绍少 ES6 中的常用写法，方便后续代码的理解和书写。

### const、let 和 var

`const`、`let`和`var`都是用来声明变量的作用。`const`和`let`是 ES6 开始引入的概念。 `const` 用来表示常量，一旦声明就无法改变值。 但这是指基本数据类型，对数组和对象修改属性和数组项并不受影响。  
`let` 用法相当与`var`，只是`let`只在块级作用域起作用，不存在变量提升。在项目中，尽量不要使用`var`。用`let`和`const`就足够了。

### 解构

> ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

```javascript
let a = 1;
let b = 2;
let c = 3;
// 变量赋值可以写成解构形式
let [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

let [, , third] = ['foo', 'bar', 'baz'];
third; // "baz"

let [x, , y] = [1, 2, 3];
x; // 1
y; // 3

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

let [x, y, ...z] = ['a'];
x; // "a"
y; // undefined
z; // []

// 解构不仅可以用于数组，还可以用于对象
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo; // "aaa"
bar; // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz; // undefined
```

项目中，会频繁的用到解构赋值，所以这个非常重要，需要理解解构的语法。

### 箭头函数

> ES6 允许使用“箭头”（=>）定义函数。

```js
var f = (v) => v;

// 等同于
var f = function (v) {
  return v;
};
```

值得一提的是，项目中，涉及到 `class` 组件时，会有 `this` 指针的问题，所以能用箭头函数，**尽量用箭头函数定义函数**。

### 对象的拓展

> ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
const foo = 'bar';
const baz = { foo };
baz; // {foo: "bar"}
// 等同于
const baz = { foo: foo };
```

这里对象的拓展用法，在项目用的比较普遍。

### Promise 对象

> Promise 是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理和更强大。 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。 Promise 对象有以下两个特点。（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。 Promise 对象是一个构造函数，用来生成 Promise 实例。

```js
// 创建一个Promise函数
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

// 可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value) {
  // resolve(value);
}, function(error) {
  // reject(error);
});
```

项目大量用到这个，就是 fetch 请求了。

### async / await

> ES2017 标准引入了 async 函数，使得异步操作变得更加方便，它就是 Generator 函数的语法糖。 async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。

这是一种异步转同步的方案，我们项目中可能需要留意的是，Generator 函数，在 dva 定义的 modal 中，`yield` 关键词的作用，就类似这里的异步转同步。

### Class 的语法

> ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

概念类比 java 中的 `class`，这里我们可能更需要关注的是 React 类组件

```js
import React, { Component } from 'react';

class Page extends Component {
  render() {
    return <div>page</div>;
  }
}
export default Page;
```

这里定义的 Page 类，继承自 React 的 Component。拥有 React 组件提供的各种钩子。

### Module 的语法

> ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。模块功能主要由两个命令构成：export 和 import。export 命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。

```js
// a.js
export const appName = 'Fz\'Blog';
export default const SystemName = 'cloud-blog';
```

使用 `export` 命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

```js
import { appName } from './a.js';
import SystemName from './a.js';
```

更多详细的内容可以看这个——[ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)

---

## TypeScript

`typescript` 面对 `javascript` 有什么优势？为什么选择前者，比较下两者的不同。

> Typescript 是 Javascript 的超集。（Typescript = Type + Javascript）

更加详细的文档，可以[查看这里](https://ts.xcatliu.com/introduction/what-is-typescript) 在线示例可以[查看这里](https://www.typescriptlang.org/play/)

### 基本语法

前面提到了，`Typescript` 就是在 `Javascript` 加了一层**type**。 大家对 java 比较熟悉，java 是一个典型的强类型语言，任何变量都需要有自己的类型声明，但是 `Javascript` 却是一个弱类型语言。 一个 `number` 类型的变量可以被赋值为 `string` 类型，这就带来了诸多的麻烦。  
`Typescript` 就是解决类型匹配很好的方案。我们可以看下面一段 java 代码和 typescript 代码。

Java：

```java
String str = "我是字符串";

public class Cat {
  private String name = "biubiu";

  public String cry() {
    return "喵喵喵～";
  }
}
```

TypeScript:

```typescript
const str: string = '我是字符串';

class Cat {
  private name: string = 'biubiu';

  // ? 表示该属性可能不存在 即 undefined
  age?: number;

  cry(): string {
    console.log(this.name);
    return '喵喵喵～';
  }
}
```

类型声明时，`Typescript` 与 `Java` 刚好相反，`Java` 的类型定义在变量前，`Typescript` 的类型定义在变量后。

### 基本类型

Java => Typescript  
Java: Float, Integer, Double ==> Typescript：number  
Java: String ==> Typescript: string  
Java: Boolean ==> Typescript: boolean

示例：  
Java：

```java
boolean userMan = true;
int userAge = 81;
float userAverage = 10.5;
String userName = "桐人";
```

Typescript：

```typescript
let userMan: boolean = true;
let userAge: number = 81;
let userAverage: number = 10.5;
let userName: string = '桐人';
```

### 任意值

> 由于前端数据来源比较广而脆弱，对数据类型的灵活性要求也比较高，Typescript 发明了 any 类型，来应对各种类型不匹配的 edge case，快速解决类型问题无法编译通过的问题。

在不清楚数据类型时，可以用`any`来定义。不过不建议大量使用。不然使用 `typescript` 就没有什么意义了。

### 复合类型

enum 语法比较一致

```typescript
// Java
enum WeekDayEnum {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

// Typescript
enum WeekDayEnum {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

// 附上初始值：
enum WeekDayEnum {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 7,
}
```

### interface、type 和 class

`interface`接口，类比 java 中的 interface，接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。 `type` 用来定义数据结构。 `class` 类比 java，有私有和静态属性，可以继承，构造方法……

```typescript
interface Person {
    firstName:string,
    lastName:string,
    sayHi: ()=>string
}

type User = {
	name: string;
}

class Cat = {
  name: string;
  age: number;
}
```

三者都可以用来定义数据结构，但是意义不同，使用场景也不同。

由于 typescript 的宗旨是兼容 js，运行时要擦除所有类型信息，因此`interface`和`type`在运行时是会被完全消除的。而`class`经过编译后，在运行时依然存在。因此如果要声明的类型只是纯粹的类型信息，只需要声明`interface`即可。

### 类型推导

> Typescript 能够在静态分析中推导出类型，不需要像 Java 那样处处定义。这也是 Typescript 把类型定义放在变量后，而 Java 把类型定义放在变量前的原因。

```js
// 对于这里的变量，typescript可以通过赋值获取变量的类型，和上面的定义效果是相同的
let userMan = true;
let userAge = 81;
let userAverage = 10.5;
let userName = '桐人';
```

### 函数定义

上面例子中已经有函数的例子了，java 在定义时，返回值以参数类型都需要写。并且写在变量之前。而 typescript 则是之后。看下面的例子 🌰：

```typescript
const multiply: (a: number, b: number) => number = (a, b) => a * b;
```

### 文件类型

- .ts Typescript 文件
- .tsx Typescript + JSX，支持 JSX 语法
- .d.ts 相当于 C++ .h 文件，只有类型声明，没有实现代码。

更多的内容可以查看[官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)

---

## React.js

什么是 react.js? 为什么选择 react.js？

> React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。一个通过 react 框架构成的前端应用，其构成结构为：元素 -> 组件 -> 模块 -> 页面 -> 站点； **牢记重点：状态、组件、单向数据流。**

`React.js` 是一个帮助你构建页面 UI 的库。如果你熟悉 MVC 概念的话，那么 React 的组件就相当于 MVC 里面的 View。如果你不熟悉也没关系，你可以简单地理解为，`React.js` 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。一个组件的显示形态和行为有可能是由某些数据决定的。而数据是可能发生改变的，这时候组件的显示形态就会发生相应的改变。而 `React.js` 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。 `React.js` 不是一个框架，它只是一个库。**它只提供 UI （view）层面的解决方案**。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 `Redux`、`React-router` 等来协助提供完整的解决方法。

一个小 `Demo` 帮你理解 react 在做什么？

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>What's Reactjs?</title>
    <style media="screen">
      .like-btn {
        font-size: 50px;
      }
    </style>
  </head>

  <body>
    <div class="wrapper"></div>
  </body>

  <script type="text/javascript">
    /* Component */
    class Component {
      constructor(props = {}) {
        this.props = props;
      }

      setState(state) {
        const oldEl = this.el;
        this.state = state;
        this.el = this.renderDOM();
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
      }

      renderDOM() {
        this.el = createDOMFromString(this.render());
        if (this.onClick) {
          this.el.addEventListener('click', this.onClick.bind(this), false);
        }
        return this.el;
      }
    }

    const createDOMFromString = (domString) => {
      const div = document.createElement('div');
      div.innerHTML = domString;
      return div;
    };

    const mount = (component, wrapper) => {
      wrapper.appendChild(component.renderDOM());
      component.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl);
        wrapper.removeChild(oldEl);
      };
    };

    /* ========================================= */
    class LikeButton extends Component {
      constructor(props) {
        super(props);
        this.state = { isLiked: false };
      }

      onClick() {
        this.setState({
          isLiked: !this.state.isLiked,
        });
      }

      render() {
        return `
          <button class='like-btn' style="background-color: ${this.props.bgColor}">
            <span class='like-text'>
              ${this.state.isLiked ? '取消' : '点赞'}
            </span>
            <span>👍</span>
          </button>
        `;
      }
    }

    class RedBlueButton extends Component {
      constructor(props) {
        super(props);
        this.state = {
          color: 'red',
        };
      }

      onClick() {
        this.setState({
          color: 'blue',
        });
      }

      render() {
        return `
          <div style='color: ${this.state.color};'>${this.state.color}</div>
        `;
      }
    }

    const wrapper = document.querySelector('.wrapper');
    mount(new LikeButton({ bgColor: 'red' }), wrapper);
    mount(new LikeButton(), wrapper);
    mount(new RedBlueButton(), wrapper);
  </script>
</html>
```

**更详细的理解 React.js 可以查看[这里](http://fangzhioooo.gitee.io);**

### jsx

这种看起来“在 JavaScript 写的标签的”语法叫 JSX。但注意的是，在写组件的时候，需要引入 react。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Page extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));
```

想了解更多可以查看[jsx 的原理](http://fangzhioooo.gitee.io)

从 jsx 到页面的过程，大致如下：

![jsx编译过程](https://images.gitee.com/uploads/images/2020/0525/162108_2554daa9_2106937.png)

所以为啥不可以直接从 jsx 直接解析为 dom，而是先解析为 js 对象后，再经过`react-dom`，解析为 dom？第一点，在于可以复用结构，我们不一定仅仅渲染成 dom，也可以去渲染成其他的结构。比如，想象有个`react-dingding`，那我们也可以把这个 js 对象解析成钉钉小程序需要的页面？  
第二点，在于方便做 diff 算法。

总结：

1. JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
2. React.js 可以用 JSX 来描述你的组件长什么样的。
3. JSX 在编译的时候会变成相应的 JavaScript 对象描述。
4. react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

### 组件

React.js 中一切皆组件，用 React.js 写的其实就是 React.js 组件。我们在编写 React.js 组件的时候，一般都需要继承 React.js 的 `Component`。一个组件类必须要实现一个 render 方法，这个 render 方法必须要返回一个 JSX 元素。并且不能并排返回多个元素，只能包裹在一个元素中。若有返回多个的需求，React.js 提供`Fragment`标签，可以实现。

```jsx
import React, { Component } from 'react'

class Header extends Component {
  static defaultProps = {
    title: '详情',
  }
  render () {
    return (
			<div>首页 / { this.props.title }</div>
    )
  }
}

class Page extends Component {
  const renderContent = () => `我是一篇文章！`;
  render () {
	const title = <h1>我是标题</h1>;
	const divClass = 'page-wapper';
	const isSuccess = true;
    return (
      <div className={divClass}>
		<Header title="xx详情" />
		{ title }
        <p> 1 + 2 = {1+2} </p>
		<p> { this.renderContent() } </p>
		<p> { isSuccess===true ? '成功' : '失败'  } </p>
      </div>
    )
  }
}

```

组件中，可以定义 jsx 变量，组件之间也是可以嵌套、组合的。 `{}`内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等。  
render 会把这些代码返回的内容如实地渲染到页面上，非常的灵活。 ⚠️ 注意这里的类名，用的是`className`，因为`class`是 js 的关键字，类似的比如`htmlFor`用来替代`label`的`for`属性。

### Props

组件是相互独立、可复用的单元，一个组件可能在不同地方被用到。但是在不同的场景下对这个组件的需求可能会根据情况有所不同。React.js 的 props 就可以帮助我们达到这个效果。 ⚠️ 注意无法在组件内修改组件的 props。只能是父组件修改 props，传入子组件触发更新。

那么怎么把 props 传进去呢？在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值。比如上面的`<Header />` 传入的参数`title`。

总结：

1. 为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
2. 组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
3. 可以通过给组件添加类属性 defaultProps 来配置默认参数。
4. props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

### State

一个组件的显示形态是可以由它数据状态`state`和配置参数`props`决定的。一个组件可以拥有自己的状态`state`。但是状态不能直接赋值修改，只能通过`setState`进行修改。

```jsx
import React, { Component } from 'react';

class Page extends Component {
  state = {
    count: 0,
  };

  handleBtnClick = () => {
    setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div>
        <p>当前数量：{this.state.count} </p>
        <p>
          <button onClick={this.handleBtnClick}>加一</button>
        </p>
      </div>
    );
  }
}
```

### 生命周期

可以为 class 组件声明一些特殊的方法，当组件挂载或更新或卸载时就会去执行这些方法，称为组件生命周期方法。当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下： • `constructor()` • `static getDerivedStateFromProps()` • `render()` • `componentDidMount()` 当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下： • `static getDerivedStateFromProps()` • `shouldComponentUpdate()` • `render()` • `getSnapshotBeforeUpdate()` • `componentDidUpdate()` 当组件从 DOM 中移除时会调用如下方法： • `componentWillUnmount()` 当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法： • `static getDerivedStateFromError()` • `componentDidCatch()`

⚠️ 注意，这里的生命周期指的是，React@17+版本，对比之前版本，删去了`componentWillMount`, `componentWillReceiveProps`和`componentWillUpdate`三个生命钩子。

![react 生命周期](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/5144/1556372331485-d7c09d5c-a9fa-4301-9d36-8a7f7cfef7e6.png?x-oss-process=image/resize,w_746)

### 事件处理

在 React.js 里面监听事件是很容易的事情，你只需要给需要监听事件的元素加上属性类似于 `onClick`、`onKeyDown` 这样的属性。建议在书写监听函数时，也使用驼峰式写法。参考上面的例子。

⚠️ 注意，上面的例子`handleBtnClick`使用的是箭头函数。是因为其中使用了`this`指针，只有使用箭头函数，才能保证函数内部的`this`指向这个组件。如果不使用箭头函数，则需要使用`bind`来指定`this`的指向。

```jsx
import React, { Component } from 'react';

class Page extends Component {
  state = {
    count: 0,
  };

  // 这里使用不是箭头函数，如果未绑定this，内部的this会是 undefined
  handleBtnClick() {
    setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <p>当前数量：{this.state.count} </p>
        <p>
          <button onClick={this.handleBtnClick.bind(this)}>加一</button>
        </p>
      </div>
    );
  }
}
```

如果需要向事件函数中传递参数，则应该如下写法：

```jsx
<button onClick={this.handleBtnClick.bind(this, 'param')}>加一</button>
```

### 列表和 key

列表数据在前端非常常见，我们经常要处理这种类型的数据，例如文章列表、评论列表、用户列表… React.js 当然也允许我们处理列表数据，但在使用 React.js 处理列表数据的时候，需要掌握一些规则。

1. 使用 map 渲染列表数据

```jsx
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' },
];

class Index extends Component {
  render() {
    return (
      <div>
        {users.map((user) => {
          return (
            <div>
              <div>姓名：{user.username}</div>
              <div>年龄：{user.age}</div>
              <div>性别：{user.gender}</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
```

以上代码虽然可以正确地渲染出结果，但是打开控制台就发现，报出了很多错误`a key should be provided for list items`。意思是，列表的每一项，应该设置一个唯一的`**key**`来标记，这和 diff 算法有关。 React.js 的是非常高效的，它高效依赖于所谓的 Virtual-DOM 策略。简单来说，能复用的话 React.js 就会尽量复用，没有必要的话绝对不碰 DOM。对于列表元素来说也是这样，但是处理列表元素的复用性会有一个问题：元素可能会在一个列表中改变位置。但是如果设置了唯一的 key，那么我们就知道哪些元素改变了，需要重新渲染。 ⚠️ 注意，不要使用`index`作为元素的 key，尽量是后台返回数据的 id 作为唯一 key。

### 父组件和子组件通信

**父级组件通过 props 传递与子级组件进行数据&状态的通信，子级组件通过回调函数与父子组件进行通信。**

```jsx
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  // 父级组件触发回调函数后获取到传递过来的数据，变更 state，重新渲染
  handleChange = (data) => {
    this.setState({
      value: data,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.value}</h1>
        <Child data={value} onChange={this.handleChange} />
      </div>
    );
  }
}

// 子级组件通过 onChange 回调函数传递数据
class Child extends React.Component {
  handleClick = () => {
    this.props.onChange(2);
  };

  render() {
    return <div onClick={this.handleClick}>{this.props.data}</div>;
  }
}
```

---

# 工具和 UI

## Umi.js

> umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。然后配以完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求，目前内外部加起来已有 50+ 的插件。

为什么使用 umi.js?

### ✨ 特性

- 📦 开箱即用，内置 react、react-router 等
- 🏈 类 next.js 且功能完备的路由约定，同时支持配置的路由方式
- 🎉 完善的插件体系，覆盖从源码到构建产物的每个生命周期
- 🚀 高性能，通过插件支持 PWA、以路由为单元的 code splitting 等
- 💈 支持静态页面导出，适配各种环境，比如中台业务、无线业务、egg、支付宝钱包、云凤蝶等
- 🚄 开发启动快，支持一键开启 dll 等
- 🐠 一键兼容到 IE9，基于 umi-plugin-polyfills
- 🍁 完善的 TypeScript 支持，包括 d.ts 定义和 umi test
- 🌴 与 dva 数据流的深入融合，支持 duck directory、model 的自动加载、code splitting 等等

关于 roadhog 与 umi.js 的关系？

> roadhog 是基于 webpack 的封装工具，目的是简化 webpack 的配置。 umi 可以简单地理解为 roadhog + 路由，思路类似`next.js/nuxt.js`，辅以一套插件机制，目的是通过框架的方式简化 React 开发。

umi 架构图

![umi架构图](https://gw.alipayobjects.com/zos/rmsportal/zvfEXesXdgTzWYZCuHLe.png)

构建流程图

![umi生命周期](https://gw.alipayobjects.com/zos/rmsportal/NKsqmTAttwTzYVMJMcnB.png)

在下面，我们会详细讲到从零搭建一个 umi 的应用。

这里是[官方文档](https://umijs.org/zh/guide/)，使用中，我们更多的关注是 [配置](https://umijs.org/zh/config/)

DT 前端推行使用的工程化解决方案——[pri](https://prijs.github.io/pri-docs/usage/)。其发自 umi.js

## Dva

> dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

dva 就是一种 react 状态管理的解决方案，关于 redux，你可以查看下面的参考文档学习更多。这里简单介绍下。

• [官方文档](https://www.redux.org.cn/)

最常见的 Web 类示例之一: TodoList = Todo list + Add todo button

react 正常写法：

![react](https://cdn.yuque.com/yuque/0/2018/png/103904/1528436560812-2586a0b5-7a6a-4a07-895c-f822fa85d5de.png)

redux 的工作流程：

![redux.gif](https://cdn.yuque.com/yuque/0/2018/png/103904/1528436134375-4c15f63d-72f1-4c73-94a6-55b220d2547c.png)

redux-saga 的结构：

![redux-saga](https://cdn.yuque.com/yuque/0/2018/png/103904/1528436167824-7fa834ea-aa6c-4f9f-bab5-b8c5312bcf7e.png)

dva 流程：

![dva流程图.png](https://cdn.yuque.com/yuque/0/2018/png/103904/1528436195004-cd3800f2-f13d-40ba-bb1f-4efba99cfe0d.png)

原作者关于这块的介绍，[请查看](https://www.yuque.com/flying.ni/the-tower/tvzasn)。

## Ant Design

> antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

为啥用 Ant Design？

### ✨ 特性

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 全链路开发和设计工具体系。
- 🌍 数十个国际化语言支持。
- 🎨 深入每个细节的主题定制能力。

这里 UI 组件，在项目中会大量用到，具体的用法可以查看[组件库](https://ant-design.gitee.io/components/button-cn/)，有详细的使用 Demo 和文档说明。

⚠️ 这里主要说明的是，目前项目用的 Ant 版本是 4.0+ 。而之前项目中使用的一直是 3+版本。 在 4+版本中，更改了许多的 Api。涉及常用的组件有：图标（Icon）、表单（Form）等。如果你之前有使用过 Ant@3+版本，在使用时，需要留意 Api 的改变。这里推荐使用新的 4+版本，因为解决了许多之前版本的问题，如，icon 加载导致打包文件体积过大。具体详情查看[从 v3 到 v4](https://ant-design.gitee.io/docs/react/migration-v4-cn)。

## Pont

> pont 在法语中是“桥”的意思，寓意着前后端之间的桥梁 Pont 把 swagger、rap、dip 等多种接口文档平台，转换成 Pont 元数据。Pont 利用接口元数据，可以高度定制化生成前端接口层代码，接口 mock 平台和接口测试平台。

关于 pont 更多的信息，可以查看[官方文档](https://github.com/alibaba/pont)

![pont.png](https://camo.githubusercontent.com/bbb2dc0083048244d9ab8bf651a31082630f99c4dd2134d20c6c08fd8414009b/68747470733a2f2f696d672e616c6963646e2e636f6d2f7466732f54423135705a47493654704b31526a535a4b5058586133557058612d313538342d313039302e706e67)

# 开发和发布

## 从零开始构建项目

现有的 OneData 系列的三个产品，均采用的前端也是目前这一套技术栈；接下来，我们从零开始搭建一个前端项目，以 `OneData` 为基础。

### 使用 create-umi 脚手架创建基础项目

可以参看[官方文档](https://umijs.org/zh/guide/create-umi-app.html),

> 你可以通过 `yarn create umi` 或 `npm create umi` 使用 `create-umi`。推荐使用 `yarn create` 命令，能确保每次使用最新的脚手架。

```sh
$ yarn create umi
$ ...
$ ...
$ curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
success Installed "create-umi@0.21.2" with binaries:
      - create-umi
? Select the boilerplate type ant-design-pro
? 🤓 Which language do you want to use? TypeScript
? 🚀 Do you need all the blocks or a simple scaffold? simple
? 🦄 Time to use better, faster and latest antd@4! Yes
Cloning into '/Users/fz/Desktop/Project/onedefine/onedefine-ts'...
remote: Enumerating objects: 189, done.
remote: Counting objects: 100% (189/189), done.
remote: Compressing objects: 100% (174/174), done.
remote: Total 189 (delta 21), reused 67 (delta 8), pack-reused 0
Receiving objects: 100% (189/189), 297.17 KiB | 31.00 KiB/s, done.
Resolving deltas: 100% (21/21), done.
> 🚚 clone success
> Clean up...
✨ File Generate Done
✨  Done in 196.52s.
```

⚠️ 注意这里选择选项， 选择 _ant-design-pro_ 、_TypeScript_、*simple*和*Yes*，主要是选择使用 Typescript 和使用 antd@4 以上版本。

这是创建的文件结构如下：

```
root
├── config                                      # umi 配置，包含路由，构建等配置
├── dist                                        # 构建项目目标位置 build后创建
├── public                                      # 公共静态资源 如favicon
├── src
│   ├── components                              # 业务通用组件
│   ├── layouts                                 # 通用布局
│   ├── locales                                 # 国际化资源
│   ├── models                                  # 全局 dva model
│   │   ├── ....                                    # 所有的model定义
│   │   └── global.ts                               # 全局属性相关 如，导航展开控制
│   ├── pages                                   # 业务页面入口和常用模板
│   │   ├── ...                                     # 各种页面
│   │   ├── 404.tsx                                  # 404页面
│   │   └── document.ejs                            # index.html
│   ├── services                                # 后台接口服务 自定义的接口请求
│   ├── pont                                    # 后台接口服务以及BO pont接口自动化生成接口
│   ├── utils                                   # 工具库
│   │   ├── request.ts                              # 请求方法函数 基于umi-request/fetch
│   │   ├── utils.ts                                # 工具类函数
│   │   ├── utils.less                              # 工具类样式
│   │   └── utils.test.ts                          # 工具类函数测试方法
│   ├── global.less                             # 全局样式
│   ├── global.tsx                              # 全局JS 主要是serviceWorker相关配置
│   └── typings.d.ts                            # ts声明文件
├── tests                                       # 测试工具
├── README.md
├── pont-config.json                                # pont的配置文件
└── package.json                                    # npm配置文件

```

继续修改下项目，删除不需要的模块，如用户登陆界面、权限路由控制等。

### 接入接口层自动生成工具 pont

**这里需要后端提供的接口尽量标准（openapi），关于 api 文档，官方推荐 swagger2+版本，请求方法明确；虽然理论上可以实现 RESTful 风格的接口，但是暂时不太好实践 ，后端暂时不要使用。**

1. 在根目录下添加`pont-config.json`和其中指定的`templatePath`文件`pontTemplate.ts`.

别忘了在 global.tsx 中添加

```js
import '@/pont';
```

pont-config.json

```json
{
  "outDir": "./src/pont",
  "originUrl": "http://localhost:7001/v2/api-docs",
  "templatePath": "./pontTemplate"
}
```

pontTemplate.ts

```js
import { CodeGenerator, Interface } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  getInterfaceContentInDeclaration(inter: Interface) {
    const paramsCode = inter.getParamsCode();
    const bodyParamsCode = inter.getBodyParamsCode();
    const hasGetParams = !!inter.parameters.filter((param) => param.in !== 'body').length;
    const requestParams = bodyParamsCode
      ? `{ ${hasGetParams ? 'params, ' : ''}data }:{ params${
          hasGetParams ? '' : '?'
        }: Params, data: ${bodyParamsCode} }`
      : `{ ${hasGetParams ? 'params' : ''} }:{ params${hasGetParams ? '' : '?'}: Params }`;

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function request(${requestParams}): Promise<Response>;

      `;
  }

  getInterfaceContent(inter: Interface) {
    const paramsCode = inter.getParamsCode();
    const bodyParamsCode = inter.getBodyParamsCode();
    const method = inter.method.toUpperCase();
    const requestParams = bodyParamsCode
      ? `{params={},data}:{params: Params,data: ${bodyParamsCode}}`
      : `{params={}}:{params: Params}`;

    return `
      /**
      * @description ${inter.description}
      */

    import Request from '@/utils/request';
    import * as defs from '../../baseClass';

    export ${paramsCode};

    export const init = ${inter.response.initialValue};

    export async function request(${requestParams}): Promise<any> {
      return Request('${inter.path}',{
        method: '${method}',
        params,
        ${bodyParamsCode ? 'data,' : ''}
      });
    }

   `;
  }
}
```

2. 添加项目对 pont 的支持，这里的`pont-engine`,需要执行

```sh
npm install pont-engine --save-dev
```

值得注意的是，pontTemplate.ts 中的`getInterfaceContent`，表示了你该如何调用你的 fetch 以及入参方式，这里我使用的是`umi-request`,你可以查看[官方文档](https://github.com/umijs/umi-request),了解 fetch 的详细用法。

目前构建的项目中，派发请求传递参数方法如下：

```js
dispatch({
  type: 'global/fetchMicroData',
  payload: {
    // query参数放在params中， 如get请求
    params: {
      id: 1,
      name: 'test',
    },
    // body参数放在data中， 如post请求
    data: {
      username: 'biubiu',
      age: 10,
    },
  },
});
```

⚠️ 注意 quary 参数和 body 参数传递并不冲突，可以两者同时传递。

这里需要后端配合接入 openapi 接口文档才能使用 pont 自动生成，如这里使用的 swagger，接入后，会在指定的文件夹（我们这里指定的是`pont`）下生成一个名为`api-lock.json`的文件，就是用来描述后端`接口`和`BO对象`。

3. 前端需要配合 vscode 的插件，才能生成对应的 service。生成的 pont 接口文件结构如下：

```
pont
├── mods                            # 自动化生成的接口请求方法
├── api-lock.json                          # 根据swagger文档，生成的pont接口描述文件
├── api.d.ts                               # pont声明文件，描述BO对象和API请求
├── baseClass.ts                           # BO对象结构
└── index.ts
```

### 代理请求

前端需要连接后端服务调试时，就会遇到跨域等一系列问题。这里介绍下项目中如何解决前后端联调问题的。

目前这里有两个解决方案。

1. 修改 host  
   访问线上项目，获取到 cookie 后，修改 host，让线上地址指向本地 localhost。  
   如访问 `yourdomain.com`后，修改 host， 将`yourdomain.com`指向 `localhost`.这种方法很麻烦。且需要频繁修改 host。所以一般不这样做。

2. 代理请求在应对这种情况时，前端开发已经有了好的解决方法，通过提供的 umi 插件，实现代理请求。  
   在 `config` 中，会有一个 `proxy.ts` 文件，用来定义接口代理的配置。这个功能只在`dev`环境生效，线上需要自己配置实现，如`nginx反向代理`。

```js
export default {
  dev: {
    '/commonapi': {
      target: 'http://localhost:7001/commonapi',
      changeOrigin: true,
      pathRewrite: { '^/commonapi': '' },
    },
    '/serachapi': {
      target: 'http://localhost:7001/serachapi',
      changeOrigin: true,
      pathRewrite: { '^/serachapi': '' },
    },
  },
  pre: {
    '/': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
```

上面是此项目中的配置，正则匹配路由，代理到指定的地址下，这里的配置只添加了`/commonapi`和`/searchapi`开头的配置。后续需要，可以再此添加。

### 创建一个页面

以 onedefine 为例，添加一个页面。添加`数据大盘`这个界面；

1. 在 `page` 中添加文件夹 `dashboard`,在其下添加页面`index.tsx`；

2. 在 `config/router.config.ts` 中添加上路由配置，并在`src/locales`中，配置国际化支持；  
   具体添加页面和配置 router 可以查看本次提交

3. 在 `models` 中新建 `dashboard.ts` ，作为数据大盘页面的 state；

4. 在 model 中定义需要的前端对象，这里建议不要直接使用 pont 中定义好的对象；用下面这样继承的方式，方便后面调试和更改；命名方式可以将 BO 改为 VO。

```js
// 这里定义前端需要使用的VO 如这里的大盘展示需要的数据对象。
export class AnalysisVO extends IndexPageCountBO {}
```

5. 编写 model 模块的`effects`和`reducers`。

```js
{
effects: {
      *fetchDashboardAnalysis({payload={}},{call,put}){
            const response:CustomWebResult<AnalysisVO> = yield call(API.commonApiRpc.getDefineCount.request,payload);
            if(response){
            yield put({
                  type: 'SAVE_STATE',
                  payload: {
                        analysis: response.data || new AnalysisVO
                  }
            })
            }
      }
},
reducers: {
      SAVE_STATE(state, action) {
            return {
            ...state,
            ...action.payload,
            };
      },
},
}

```

6. 在`connect.d.ts`中,声明 dashboard 的 state 结构；

7. 在页面中用 dva 提供的高阶函数包装页面组件；

```js
export default connect(({ dashboard, loading }: ConnectState) => ({
  analysisData: dashboard.analysis,
  loading: loading.effects['dashboard/fetchDashboardAnalysis'],
}))(Analysis);
```

8. 页面正确的位置派发请求，并获取数据展示；

```js
useEffect(() => {
  if (dispatch) {
    dispatch({
      type: 'dashboard/fetchDashboardAnalysis',
    });
  }
}, []);
```

以上就是一个模块从零搭建的过程，这边建议，page 和 model 尽量是一一对应上的。当然其中会有一些如`global`,`common`等用来管理全局状态和通用状态的 model。

## 发布

### 如何部署

对于`umi.js`的项目而言，项目构建只需要在项目根目录下运行 `npm run build`，就可以打包构建项目了，会在根目录下生成`dist`文件夹，如果没有设置按需加载，那么只会打包出 `index.html`、`umi.js`和`umi.css` 三个文件。一般而言，只需要将这些静态资源发布到 web 服务器即可。

因为目前项目使用的是`volecity`的模版引擎，严格来说，是前后端不分离的写法。在已经提供了`index.html`的情况，我们只需要向模版页面提供**js**和**css**，并在页面中添加 `react 的根节点元素`即可。那我们部署的流程如下：

1. 前端打包;
2. 将打包好的`umi.js`和`umi.css`文件移动到工程静态资源文件夹下;
3. `volecity`模版中引入 js 和 css;
4. 后端 aone 发布。

注意前端需要配置为禁止打包 hash 和使用 hash 路由，如果静态资源未配置，那么建议也不要页面按需加载打包了。  
当然也有通过配置 `config.ts`中的`base`，部署到非根目录，再在`controller`中，添加对应的路径映射，避免了页面路由和 api 请求冲突。

### 版本控制

目前通过静态资源文件夹名实现版本控制。

前端项目的`package.json`中，会配置一条命令`deploy`,当你运行`npm run deploy`，就会按照版本号作为文件夹名，打包静态资源到类路径下的`static`文件夹下。

```json
{
  "name": "xxxx",
  "version": "0.0.2",
  "private": true,
  "description": "xxx前端项目",
  "scripts": {
    "build": "umi build",
    "deploy": "umi build && mkdir ../onedefine-start/src/main/resources/static/${npm_package_version} &&  cp  -r dist/* ../onedefine-start/src/main/resources/static/${npm_package_version}",
    "dev": "npm run start:dev"
  },
  ……
}
```

java 代码如下：

```java
 	@Value("${front.version}")
    private String projectFrontVersion;
	/**
     * 首页页面
     **/
    @GetMapping("/")
    public ModelAndView root() throws Exception {
        ModelAndView mav = new ModelAndView("index");
        mav.addObject("projectfrontversion", projectFrontVersion);
        return mav;
    }
```

`index.vm`如下：

```html
	## 判断前端版本
  #if(!$!projectfrontversion)
    <h1>前端版本获取失败</h1>
  #else
    <link rel="stylesheet" href="/static/$!projectfrontversion/umi.css"/>
    <script type="text/javascript" src="/static/$!projectfrontversion/umi.js"></script>
  #end
```

以上部署方法比较死板，需要修改很多文件。按照之前的 def 发布经验，即使不使用 diamond 的情况下，也可以通过配置中心的方式控制版本。这里不多介绍。

# 相关链接

- [Umi.js](https://umijs.org/zh/guide/)
- [Ant Design](https://ant.design/docs/react/introduce-cn)
- [Pont](https://github.com/alibaba/pont)
- [React.js](https://react.docschina.org/docs/getting-started.html)
- [Typescript](https://www.tslang.cn/docs/home.html)
- ...
