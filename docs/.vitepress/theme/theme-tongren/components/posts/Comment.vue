<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
const utterancesRef = ref()
const { isDark } = useData()
onMounted(() => {
  nextTick(() => {
    let utterances = document.createElement('script')
    utterances.async = true
    utterances.setAttribute('src', 'https://utteranc.es/client.js')
    utterances.setAttribute('repo', 'fangzhioo/fangzhioo.github.io')
    utterances.setAttribute('issue-term', 'pathname')
    utterances.setAttribute('theme', isDark.value ? 'github-dark' : 'github-light')
    utterances.setAttribute('crossorigin', 'anonymous')
    utterancesRef.value.appendChild(utterances)
    //hack method to change utterances theme when change site theme
    watch(isDark, (newVal, oldVal) => {
      if (newVal !== oldVal) location.replace(location.href)
    })
  })
})
</script>

<template>
  <div class="fz-doc-bottom-comment">
    <div ref="utterancesRef"></div>
  </div>
</template>

<style>
/*global  style*/
.fz-doc-bottom-comment {
  padding: 20px 0;
  .utterances {
    max-width: inherit !important;
  }
}
</style>
