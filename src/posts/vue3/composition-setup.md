---
title:      【Vue3】Composition API 之 setup
subtitle:   Composition API 之 setup
keyword:    vue3, 响应式API, 组合式API, setup
date: 2021-03-01 14:08:52
catalog: true
tags:
    - Vue3
    - CompositionAPI
categories: 
    - Vue
---


# 前言

> setup， 一个组件选项，在创建组件之前执行，一旦 props 被解析，并作为组合式 API 的入口点
> 入参：
> {Data} props
> {SetupContext} context


# 正文

## setup的作用

`Composition API` 是针对 Vue框架而言的，而不是对于用户层面的。 他是在 Vue 中，将一系列的 hook 组合起来，向外暴露的 api。比如在 Vue2.x中，你需要调用`mounted`生命周期，在vue3中，由 `Composition API` 给我们提供 `onMounted` hook来调用。

在Vue2.x中，使用的方式叫 `Options API`。在Vue3.x中依然可以使用，但在Vue3.x中，更应该使用新的API。

```js
// vue2.x 中的 Option API 方式
export default {
  data() {
    return {
      name: 'kirito'
    }
  },
  computed: {
    upperCaseName(){
      return this.name.toLocaleUpperCase()
    }
  },
  mounted() {
    this.name = 'Naroto'
  },
  watch: {
    name: {
      handler(n, o) {
        // when name is change, do something
      }
    }
  },
}

// vue3.x 中的 Composition API 方式
import { ref, watch, onMounted, computed } from 'vue';

export default {
  setup() {
    const name = ref('kirito');
    const upperCaseName = () => name.toLocaleUpperCase();

    onMounted(() => {
      name.value = 'Naroto';
    })

    watch([name], (ns, os) => {
      // when name is change, do something
    })

    return {
      name,
      upperCaseName,
    }
  }
}

```

Composition API 中的 `setup` 方法就是用于组合这一系列的hook。**并且所有vue提供的hook，都只能在这个setup函数中起作用**。 

## 返回值

在vue3.x中，没有 `data` 函数，这里的 `setup` 方法返回有两种形式，分别为 `object` 和 `render function`。

- Object（对象）
当返回值是 `object` 时，那这个返回值将用作 `template` 的上下文。

```html
<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  setup() {
    // 返回一个 object
    return {
      count: 0
    }
  }
}
</script>
```

- Render Function （渲染函数）
当然，也可以返回一个渲染函数。常见在jsx语法中。

```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // 返回一个渲染函数，其中 h 方法由 vue 提供
    return () => h('div', [readersNumber.value, h('h1', [book.title])])
  }
}
```

## 调用时机

`setup` 函数是在初始化属性 `props` 之后被调用。按照vue2.x的生命周期的角度，它将在 `beforeCreate` 调用之前被调用。值得注意的是，在Vue3.x中已经删除了 `beforeCreate`和 `created`这两个生命钩子。

```js
import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    console.log('setup');

    // ...
    onBeforeMount(() => console.log('onBeforeMount'));

    onMounted(() => console.log('onMounted'));

    onBeforeUnmount(() => console.log('onBeforeUnmount'));
    
  }
}
```

结果按照下面的顺序输出 

> `setup` -> `onBeforeMount` -> `onMounted` -> `onBeforeUnmount` 

下面是来自官网的生命周期的用法对比：

| Option API(vue2.x) | Composition API(vue3.x) | 调用时机 | 
| ------ | ------ | ------ |
| beforeCreate  |  已删除  | 初始化之前 |
| created  |  已删除  | 初始化之后 |
| beforeMount  |  onBeforeMount  | 挂载之前 |
| mounted  |  onMounted  | 挂载之后 |
| beforeUpdate  |  onBeforeUpdate  | 更新之前 |
| updated  |  onUpdated  | 更新之后 |
| beforeUnmount  |  onBeforeUnmount  | 卸载之前 |
| unmounted  |  onUnmounted  | 卸载之后 |
| errorCaptured  |  onErrorCaptured  | 当捕获一个来自子孙组件的错误时被调用 |
| [renderTracked](https://v3.vuejs.org/api/options-lifecycle-hooks.html#rendertracked)  |  onRenderTracked  | 在跟踪虚拟DOM重新呈现时调用 |
| [renderTriggered](https://v3.vuejs.org/api/options-lifecycle-hooks.html#rendertriggered)  |  onRenderTriggered  | 触发虚拟DOM重新呈现时调用 |

## 参数

在 `setup` 函数中，默认有两个参数，`props`和 `context`。

### props

> setup 函数中的第一个参数是 props。正如在一个标准组件中所期望的那样，setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

但是，因为 **props 是响应式** 的，你 **不能使用 ES6 解构**，因为它会消除 prop 的响应性。如果需要解构 prop，可以通过使用 setup 函数中的 `toRefs` 来安全地完成此操作。也不能在组件中，去直接修改 `props`。

```js
import { toRefs } from 'vue'

export default {
  setup(props) {
    const { title } = toRefs(props)
    console.log(title.value)
  }
}
```


### context

> 传递给 setup 函数的第二个参数是 context。context 是一个普通的 JavaScript 对象，它暴露组件的三个 property

context 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。

```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象)
    console.log(context.attrs)

    // 插槽 (非响应式对象)
    console.log(context.slots)

    // 触发事件 (方法)
    console.log(context.emit)

    // 解构
    const { attrs, slots, emit } = context;
  }
}
```

`attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 `attrs.x` 或 `slots.x` 的方式引用 property。请注意，与 `props` 不同，`attrs` 和 `slots` 是非响应式的。如果你打算根据 `attrs` 或 `slots` 更改应用副作用，那么应该在 `onUpdated` 生命周期钩子中执行此操作。

由于 `setup` 函数的调用时机是在组件的其他选项解析，所以在 `setup` 中无法使用`this`的， 因为调用时，组件实例还未创建。 所以`Option API`中的 `data`、`methods`、`computed`等，是无法访问的。

vue3.x也会提供一个hook， `getCurrentInstance` 用于获取当前组件的实例。

```js
import { getCurrentInstance } from 'vue';

export default {
  setup(props, context) {
    const ctx = getCurrentInstance();

    // context === ctx;
    context.emit('input')
    ctx.emit('input')
  }
}
```

# 后记

`setup` 方法作为 vue3.x 的hook入口，是学习vue3.x的入口，这是十分重要的。（敲黑板、划重点～～）

