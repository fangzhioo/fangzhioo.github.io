<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from '../composables/data'
import { isActive } from '../utils/shared'
import VPLink from './VPLink.vue'

defineProps<{
  item: DefaultTheme.NavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <VPLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive(page.relativePath, item.activeMatch || item.link, !!item.activeMatch)
    }"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    tabindex="0"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.VPNavBarMenuLink.active {
  color: var(--vp-c-brand);
}

.VPNavBarMenuLink:hover {
  color: var(--vp-c-brand);
}
</style>
