---
title:      【Vue3】Composition API 之 Reactivity APIs
subtitle:   响应式API，reactive、toRefs、ref、computed、readonly、watchEffect、watch
keyword:    vue3, 响应式API, 组合式API, reactive, toRefs, ref, computed, readonly, watchEffect, watch
date: 2021-03-01 14:08:52
catalog: true
header-img:
tags:
    - Vue3
    - CompositionAPI
categories: 
    - Vue
---

# 前言

Vue双向绑定原理是采用**发布订阅者模式**，在初始化时劫持数据的各个属性的setter/getter，在数据变动时发布消息给订阅者，触发响应的监听回调。在 vue2.x 中，实现数据劫持的核心方法是 `Object.defineProperty`，即，通过劫持数据的 `getter/setter` 的方式，订阅到数据的变化，从而实现双向绑定。但是引用类型的内部引用，无法通过这个方法劫持。这也是为什么数组或者深层次的对象的内部数据发生变化，却没有引起视图变化的原因。所以在vue2.x中有[一系列的方法（$set、$delete等等）](https://cn.vuejs.org/v2/api/#Vue-set) 或者使用 `watch` 来解决这个问题。

>  在IE8以上才有`Object.defineProperty`方法，所以 vue2.x不兼容IE8及以下版本。

```js
let obj = {}, value = 1
Object.defineProperty(obj, 'a' , {
    // 劫持了属性 a 的 getter
    get() {
        console.log('这里监听到了数据获取')
        return value
    },
    // 劫持了属性 a 的 setter
    set(newValue, value) {
        if(newValue !== value) {
            value = newValue
            console.log('这里监听到了数据更改')
        }
    }
})
console.log(obj.a) // 这里监听到了数据获取   1
obj.a = 2 // 这里监听到了数据更改
```
很明显，[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法实现的双向绑定，不仅要遍历 `data`逐个劫持，还不能监听深层对象或者数组的变化。

这时候，ES6中的 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 就闪亮✨登场！！vue3.x 已经同时使用 `Object.defineProperty` 和 `Proxy` 来实现数据劫持，而前者只是用来兼容IE浏览器，而采用了 `Proxy`来实现的 `响应式APIs`拥有更简洁性能更好的表现。 `Proxy`字面意思为 “代理”。类似某明星（`data`），通过经纪人（`Proxy`）来对外交流（`getter/setter`）。

Proxy.handler方法与[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)相同， 可以用这些方法实现监听。

> 响应式的实现步骤：
> - ~~当某个值发生变化时进行检测~~：我们不再需要这样做，因为 Proxy 允许我们拦截它
> - 跟踪更改它的函数：我们在 Proxy 中的 getter 中执行此操作，称为 effect
> - 触发函数以便它可以更新最终值：我们在 Proxy 中的 setter 中进行该操作，名为 trigger

```js
let data = {
    msg: {
        a: 10
    },
    arr: [1, 2, 3]
}
let handler = {
    get(target, key) {
        // 懒监听，去获取的时候才监听对象里面的对象，而不是直接递归循环监听
        console.log('获取key: ' + key)
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        let oldValue = target[key]
        console.log('更新key: ' + key)
        if (oldValue !== value) {
            // 通知view更新
        }
        return Reflect.set(target, key, value)
    }
}
let proxy = new Proxy(data, handler)
proxy.arr.push(4)

/**
 *  打印结果如下：
    获取key: arr
    获取key: push
    获取key: length
    更新key: 3
    更新key: length
 */

```

为什么每次都有`length`，其实`Proxy`的监听数组实现是把数组变成了一个类数组对象而已。

```js
// 类数组对象
const arr = {
    0: 'a', 
    1: 'b',
    length: 2
}
```

# 正文

在vue2.x中，提供了 `Vue.observable()` 来构建一个响应式对象，而在vue3.x中，提供了方法 `reactive`，来构建响应式的数据。

## 响应式基础API

响应式基础API是基于 `Proxy`，所以返回的响应式副本对象都为`Proxy`类型。 我们来学习一下这一系列的构建方法和辅助函数。

### reactive

`reactive` 返回参数对象的一个响应式副本。而且这个响应式是“深度”的，即，它将影响所有的嵌套属性。

```html
<template>
  <div @click="handleClick">{{ state.name }} {{ state.age}}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup(){
    const state = reactive({
      name: 'kirito',
      age: 16,
    })

    const handleClick = () => {
      // name和age 是经过 reactive 代理后的数据，它的变化将被观察，这里值变化，视图将更新
      state.name = 'fangzhi'
      state.age = 20
    }

    return {
      state,

      handleClick
    }
  }
}
</script>
```

### readonly

> 获取一个对象 (响应式或纯对象) 或 `ref` 并返回原始代理的只读代理。只读代理是深层的：访问的任何嵌套 `property` 也是只读的。

顾名思义，创建的对象是只读的。一般用于无法修改的枚举或者数据。

```js
import { reactive, readonly } from 'vue'

const state = reactive({ name: 'kirito', age: 16 })
// 可以是一个响应式对象
const onlyreadState = readonly(state);
// 也可以是一个纯对象
const onlyreadObj = readonly({ name: 'tom', age: 22 })

```

### isProxy

用于检查对象是否由 `reactive` 或者 `readonly` 来创建的。

```js
import { ref, reactive, readonly, isProxy } from 'vue'

const state = reactive({ name: 'kirito' })
const count = ref(0)
const obj = { name: 'sakura' }
const read = readonly(state)
const readByObj = readonly({ name: 'tom' })

isProxy(state) // true
isProxy(count) // false
isProxy(obj) // false
isProxy(read) // true
isProxy(readByObj) // true
```

### 其他辅助函数

其他不常用的函数还有很多，这里列举以下：

- isReactive 检查对象是否由 `reactive` 创建。
- isReadonly 检查对象是否由 `readonly` 创建
- toRaw 返回响应式副本的原始对象
- markRaw 标记一个对象，使其无法被响应式基础API转换为代理副本
- shallowReactive 创建一个不嵌套的响应式副本（只有自身的 `property`具有响应性 ）
- shallowReadonly 创建一个不嵌套的只读响应式副本（只有自身的 `property`为可读，深层嵌套的属性可以修改）

## Refs

Refs 是基于响应式基础API的高阶方法。通过 `ref` 创建的响应式对象与 `reactive`创建的有所不同，它返回的是一个 `RefImpl` 对象，且响应式的数据被挂载到了它的 `value`属性上。

<img class="shadow" alt="加载失败！" src="/img/vue3/reactive-vs-refs.png" />
<p class="image-tips">reactive 和 ref 返回对象有所不同</p>

### ref

`ref` 方法可以创建响应式对象，不同于 `reactive`，它也可以接受一个基本类型参数。

```html
<template>
  <div>{{ count }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const count = ref(0)
    
    console.log(count.value)

    return {
      count
    }
  }
})
</script>
```

这时，在 `setup` 中取值和赋值的，其实都是在其属性`value`下，如果使用的是 `jsx` 或者 `render function`，那么取值都要从`value`属性中获取。但是如果是 `template`，会被自动拆解，不需要在模板中额外的写`.value`。

```ts
// https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/ref.ts#L30
const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val) : val

// https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/ref.ts#L41
export function ref(value?: unknown) {
  return createRef(value)
}

// https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/ref.ts#L54
class RefImpl<T> {
  private _value: T

  public readonly __v_isRef = true

  constructor(private _rawValue: T, public readonly _shallow = false) {
    this._value = _shallow ? _rawValue : convert(_rawValue)
  }

  get value() {
    track(toRaw(this), TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newVal) {
    if (hasChanged(toRaw(newVal), this._rawValue)) {
      this._rawValue = newVal
      this._value = this._shallow ? newVal : convert(newVal)
      trigger(toRaw(this), TriggerOpTypes.SET, 'value', newVal)
    }
  }
}

function createRef(rawValue: unknown, shallow = false) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

以上是官方ref实现的源码，我们可以看到，当你使用`ref`传入一个对象作为参数时，其实使用的还是`reactive`。

除了创建响应式对象，`ref` 还可以创建对组件实例的引用。

```html
<template>
  <div ref="refDiv">I'm Kirito</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup () {
    // 变量名需要和 template 中的 ref 保持一致
    const refDiv = ref<HTMLElement>()

    // 等同于 vue2.x 的 mounted 选项 挂载之后的生命周期
    onMounted(() => {
      console.log(refDiv.value?.innerText) // I'm Kirito
    })

    return {
      refDiv
    }
  }
})
</script>
```

### isRef

检查对象是否为 `RefImpl`对象，即是否被`ref`创建。

```ts
import { ref, reactive, isRef } from 'vue'

const count = ref(0)
const state = reactive({ name: 'kirito' })
const obj = { name: 'fangzhi' }

isRef(count) // true
isRef(state) // false
isRef(obj)  // false
```

### unref

用来返回被 `ref` 包装的值。如果入参不是 `RefImpl` 对象，则直接返回入参。语法糖其实就是 `val = isRef(val) ? val.value : val`

### toRef

用来为一个响应式对象(`reactive`)的属性创建一个 `ref`，可以保持对这个响应式对象属性的响应式连接。

```ts
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

一般在 需要将 `props` 传递给一个复合函数时, `toRef` 就显得很有用。

```ts
export default {
  setup(props) {
    useSomeHook(toRef(props, 'foo'))
  }
}
```

# 后记

<!-- vue3.0 响应式原理(超详细) -->
[1][https://juejin.cn/post/6858899262596448270#heading-13]
