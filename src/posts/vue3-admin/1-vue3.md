---
title:      【Vue3-Admin】初识Vue3
subtitle:   初识Vue3
keyword:    vue3, 响应式API, 组合式API
date: 2021-04-01 14:08:52
catalog: true
tags:
    - Vue3
categories: 
    - Vue
---

# 前言

Vue.js 作者尤雨溪2020-7-18宣布 Vue 3 已进入 [RC 阶段][1]，这意味着 Vue 3 内核的 API 和实现已到达稳定状态。 到现在已经过去快一年时间了，是时候开启一波 Vue3 的学习之路了～ 前面已经陆陆续续整理了一部分关于[Vue3的内容](https://fangzhioo.github.io/tags/#Vue3)

因为是从 Vue2.x 而来，那我们首先研究的就是，对比v2，有哪些注意点？ [官方][2]也有很细致的解答。Vue3中需要关注的一些新功能包括：  

- [组合式 API](https://vue3js.cn/docs/zh/guide/composition-api-introduction.html)
- [Teleport](https://vue3js.cn/docs/zh/guide/teleport.html#teleport)
- [片段](https://vue3js.cn/docs/zh/guide/migration/fragments.html)
- [触发组件选项](https://vue3js.cn/docs/zh/guide/component-custom-events.html)
- [createRenderer API 来自 @vue/runtime-core 创建自定义渲染器](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core)
- [单文件组件组合式 API 语法糖 (`<script setup>`)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md) 实验性
- [单文件组件状态驱动的 CSS 变量 (`<style vars>`)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md) 实验性
- [单文件组件 `<style scoped> ` 现在可以包含全局规则或只针对插槽内容的规则](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)

# 正文

对比v2版本，最核心的特性，就应该是 组合式API 了，甚至在2.x版本中，也有单独的npm包（[@vue/composition-api](https://github.com/vuejs/composition-api/blob/master/README.zh-CN.md)），来支持这种写法。

## 对比Option API

在vue2.x中，实现一个 todo list 的代码如下： 


```html
<template>
  <div id="app">
    <input type="text" v-model="val" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      val:'',
      todos:[ 
        {id:0, title:'吃饭', done:false},
        {id:1, title:'睡觉', done:false},
        {id:2, title:'lsp', done:false},
      ]
    }
  },
  methods:{
    addTodo(){
      this.todos.push({
        id:this.todos.length,
        title:this.val,
        done:false
      })
      this.val = ''
    }
  }
}
</script>
```

当需求不断增多，就出现watch、computed、inject、provide等配置，这样整体文件会变得逐渐臃肿、越来越混乱，且代码可复用性也不高。 下面是大佬做的[动画](https://juejin.cn/post/6890545920883032071)。

<img class="shadow" alt="加载失败！" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bd101840df446c78d52e9c14711aae7~tplv-k3u1fbpfcp-watermark.image" />
<p class="image-tips">option api</p>

此时，万恶的产品经理提出需求， 在list上方，添加一个倒计时，并在结束时，提示结束。 那么我们要在 template 中添加模板；继续在 data 从添加 countTime 变量来记录一下倒计时；再需要在 methods 中添加处理倒计时的函数；甚至还需要在 watch 中添加判断倒计时结束的逻辑等等。在编写代码时，滚动条反复上下移动，就体会到什么叫 “反复横跳😣” 。如果还有其他逻辑，那么整个单文件逻辑揉杂在一起，难以维护。

<img class="shadow" alt="加载失败！" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/568b0ced69f241d282cf2c512e4e5f33~tplv-k3u1fbpfcp-watermark.image" />
<p class="image-tips">option api 缺陷</p>

```html
<template>
  <div>
    <h1 @click="handleCountTime">{{countTimeText}}</h1>
    <input type="text" v-model="val" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countTime: 0,
      timer: null,
      val: '',
      todos: [
        { id: 0, title: '吃饭', done: false },
        { id: 1, title: '睡觉', done: false },
        { id: 2, title: 'lsp', done: false },
      ],
    };
  },
  computed: {
    countTimeText() {
      if (this.countTime === 0) {
        return '活动已结束，点击开始';
      }
      return `距离结束还有 ${this.countTime} 秒`;
    },
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: this.todos.length,
        title: this.val,
        done: false,
      });
      this.val = '';
    },
    handleCountTime() {
      if (this.timer !== null) {
        return;
      }
      this.countTime = 10;
      this.timer = setInterval(() => {
        this.countTime += -1;
        if (this.countTime === 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  },
  watch: {
    countTime: {
      handler(n) {
        if (n === 0) {
          console.log('活动已结束');
        }
      },
    },
  },
};
</script>

```

在vue2.x中，为了解决“反复横跳”，我们需要将代码按照功能分块组织，`mixin` 就是来做这些的。我们抽离出 `countTime.js`。

```js
export default {
  data() {
    return {
      countTime: 0,
      timer: null,
    };
  },
  computed: {
    countTimeText() {
      if (this.countTime === 0) {
        return '活动已结束，点击开始';
      }
      return `距离结束还有 ${this.countTime} 秒`;
    },
  },
  methods: {
    handleCountTime() {
      if (this.timer !== null) {
        return;
      }
      this.countTime = 10;
      this.timer = setInterval(() => {
        this.countTime += -1;
        if (this.countTime === 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  },
  watch: {
    countTime: {
      handler(n) {
        if (n === 0) {
          console.log('活动已结束');
        }
      },
    },
  },
};

```

然后在 `App.vue`中，

```js
import countTime from './countTime.js'
export default {
  mixins:[countTime],
  data(){
	...
  },
...
}

```

这样确实拆分了代码，但是有一个贼严重的问题，就是不打开 `countTime.js`，`App.vue`里的 `this` 上，`countTime`，`handleCountTime` 这些属性，是完全不知道从哪来的，你不知道是 `mixin`，还是全局 `install`，还是 `Vue.prototype.countTime` 设置的，数据来源完全模糊，调试爽死你，这也是option的一个大问题，`this` 是个**黑盒** ，template里写的 `handleCountTime`和 `countTime`，完全不知道从哪来的。


<img class="shadow" alt="加载失败！" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f3bca255dc8459f9dd56edf8d5388d5~tplv-k3u1fbpfcp-zoom-1.image" />


而且由于逻辑都在 `countTime.js` 中，所以也会出现一些严重的问题，比如，如果还有其他的 mixin 引入，且其中也有 countTime 这个变量，那会造成数据混乱，并且调试起来很困难。如果使用的地方众多，那就是一场灾难了。

此时，我们的**组合式API（Composition API）**踩着七彩祥云来了。顾名思义，通过组合的方式，可以把零散在各个data，methods、computed等中的代码，重新组合。功能聚集于一处。 

<img class="shadow" alt="加载失败！" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d05799744a6341fd908ec03e5916d7b6~tplv-k3u1fbpfcp-watermark.image" />
<p class="image-tips">Composition API</p>

<img class="shadow" alt="加载失败！" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4146605abc9c4b638863e9a3f2f1b001~tplv-k3u1fbpfcp-watermark.image" />
<p class="image-tips">基于函数的组合api</p>

升级为vue3.x， 我们重新编写 `todo list` 这个demo。如下：

```html
<template>
  <div id="app">
    <input type="text" v-model="val" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from 'vue'

export default {
  setup(){
    let val = ref('')
    let todos = reactive([ 
        {id:0, title:'吃饭', done:false},
        {id:1, title:'睡觉', done:false},
        {id:2, title:'lsp', done:false},
    ])
    function addTodo(){
      todos.push({
        id:todos.length,
        title:val.value,
        done:false
      })
      val.value = ''
    }
    return {val, todos, addTodo}
  }
}
</script>

```

> 此处的 vue 已经是 3.x版本了

接下来，利用函数我们可以吧功能完整独立的拆分成模块或者函数，方便组织代码，并且解决了mixin混乱的问题。  

比如我们的倒计时，抽离一个 `useCountTime.js`;

```js

import { ref, computed, onBeforeUnmount } from 'vue';

export default function useCountTime() {
  let timer = null;

  const countTime = ref(0);
  const countTimeText = computed(() => {
    if (countTime.value === 0) {
      return '活动已结束，点击开始';
    }
    return `距离结束还有 ${countTime.value} 秒`;
  });

  const handleCountTime = () => {
    if (timer !== null) {
      return;
    }
    countTime.value = 10;
    timer = setInterval(() => {
      countTime.value += -1;
      if (countTime.value === 0) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  watch([countTime], (ns) => {
    if (ns[0] === 0) {
      console.log('活动已经结束');
    }
  });

  return {
    countTimeText,
    countTime,
    handleCountTime,
  };
}

```

接下来，在 `App.vue` 中直接引用就行了。

```html
<template>
  <div id="app">
    <h1 @click="handleCountTime">{{countTimeText}}</h1>
    ...
  </div>
</template>

<script>
import useCountTime from './useCountTime';

export default {
  setup() {
    const { countTimeText, handleCountTime } = useCountTime();

    // ...

    return {
      countTimeText,
      handleCountTime,
    };
  },
};
</script>

```

是不是感觉特别丝滑呢，有了这种组合式的方式， 通过解构重新赋值为新的变量名的方式，也可以解决mixin重名的问题，而且所有逻辑整合在一起。阅读维护简直赞👍 ！！！

## composition API是如何做到于 options API和谐共处的？

在 vue3.x中，也可以和vue2.x中一样使用 options API的部分选项， 比如 `mounted`、`methods`等。那么会有人担心了，他们之间不会互相影响吗？我们可以查看[vue3.x中的一段源码](https://github.com/vuejs/vue-next/blob/870f2a7ba35245fd8c008d2ff666ea130a7e4704/packages/runtime-core/src/component.ts#L576)。

```js
  // 2. call setup()
  const { setup } = Component
  if (setup) {
    // ...
  }else {
      // ...
  }
```

可以看出，作者有判断是否写了`setup`，调用后的结果统一处理了。

# 后记

把大家撩的着实痒痒，很多人就开始动手写东西了，随之而来的便是一些应用上的疑问：

- 没有this了，我要怎么获取组件实例？
- 没有this了，怎么派发自定义事件？
- 我该如何在reactive和ref之间做选择？
- setup函数太长了怎么办？
- 我的属性怎么就不响应了
- watchEffect和watch有啥不同？
- 生命周期钩子能不能写多个？顺序是怎样的？



[1]: https://github.com/vuejs/rfcs/issues/189  
[2]: https://vue3js.cn/docs/zh/guide/migration/introduction.html
