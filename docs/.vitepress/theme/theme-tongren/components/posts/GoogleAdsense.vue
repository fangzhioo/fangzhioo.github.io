<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
const utterancesRef = ref()
onMounted(() => {
  nextTick(() => {
    //@ts-ignore
    ;(window.adsbygoogle || []).push({})
  })
})
</script>

<template>
  <div class="fz-doc-sidebar-ad">
    <!-- home-sidebar-ad -->
    <ins
      class="adsbygoogle"
      style="display: block"
      ref="utterancesRef"
      data-ad-client="ca-pub-3409699730406381"
      data-ad-slot="9537617432"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<style>
.fz-doc-sidebar-ad {
  padding: 20px 0;
}
</style>
