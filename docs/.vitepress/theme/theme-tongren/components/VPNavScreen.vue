<script setup lang="ts">
import { ref } from 'vue'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import VPNavScreenMenu from './VPNavScreenMenu.vue'
import VPNavScreenAppearance from './VPNavScreenAppearance.vue'
import VPNavScreenTranslations from './VPNavScreenTranslations.vue'
import VPNavScreenSocialLinks from './VPNavScreenSocialLinks.vue'

defineProps<{
  open: boolean
}>()

const screen = ref<HTMLElement | null>(null)

function lockBodyScroll() {
  disableBodyScroll(screen.value!, { reserveScrollBarGap: true })
}

function unlockBodyScroll() {
  clearAllBodyScrollLocks()
}
</script>

<template>
  <transition name="fade" @enter="lockBodyScroll" @after-leave="unlockBodyScroll">
    <div v-if="open" class="VPNavScreen" ref="screen">
      <div class="container">
        <slot name="nav-screen-content-before" />
        <VPNavScreenMenu class="menu" />
        <VPNavScreenTranslations class="translations" />
        <VPNavScreenAppearance class="appearance" />
        <VPNavScreenSocialLinks class="social-links" />
        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.VPNavScreen {
  position: fixed;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px);
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  padding: 0 32px;
  width: 100%;
  height: calc(100vh - calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px));
  background-color: var(--vp-nav-screen-bg-color);
  overflow-y: auto;
  transition: background-color 0.5s;
  pointer-events: auto;
}

.VPNavScreen.fade-enter-active,
.VPNavScreen.fade-leave-active {
  transition: opacity 0.25s;
}

.VPNavScreen.fade-enter-active .container,
.VPNavScreen.fade-leave-active .container {
  transition: transform 0.25s ease;
}

.VPNavScreen.fade-enter-from,
.VPNavScreen.fade-leave-to {
  opacity: 0;
}

.VPNavScreen.fade-enter-from .container,
.VPNavScreen.fade-leave-to .container {
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .VPNavScreen {
    display: none;
  }
}

.container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
}

.menu + .translations,
.menu + .appearance,
.translations + .appearance {
  margin-top: 24px;
}

.menu + .social-links {
  margin-top: 16px;
}

.appearance + .social-links {
  margin-top: 16px;
}
</style>
