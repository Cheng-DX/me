<script setup lang="ts">
function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const route = useRoute()
const position = useLocalStorage('scrollTo', 0)
onMounted(() => {
  if (window.location.hash !== '#/chat-gpt') {
    setTimeout(() => {
      window.scrollTo({
        top: position.value,
        behavior: 'smooth',
      })
    }, 100)
  }
})
useEventListener('unload', () => {
  position.value = window.scrollY
})

const isDark = useLocalStorage('isDark', true)
</script>

<template>
  <div ref="content" :class="isDark ? 'dark' : 'light'" min-h-screen>
    <router-view />
  </div>
  <!-- <div fixed right-5 bottom-5 h-8 w-8 bgc-4b5259 r-20 flex-center cursor-pointer @click="backToTop()">
    <div i-carbon-up-to-top h-5 w-5 bg-white />
  </div> -->
</template>

<style>
.dark {
  background-color: #22272d;
  color: #adbac7;
}
.light {
  background-color: #f3f3f3;
  color: #22272d;
}
html {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  color-scheme: dark;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
