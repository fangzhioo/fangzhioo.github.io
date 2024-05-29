---
description: 收录了大量高质量站点，提供最简单便捷的网址导航服务
layoutClass: fz-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
