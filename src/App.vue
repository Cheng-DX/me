<script setup lang="ts">
function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const position = useLocalStorage('scrollTo', 0)
onMounted(() => {
  setTimeout(() => {
    window.scrollTo({
      top: position.value,
      behavior: 'smooth',
    })
  }, 100)
})
useEventListener('unload', () => {
  position.value = window.scrollY
})
</script>

<template>
  <div ref="content" class="root" min-h-screen>
    <router-view />
  </div>
  <!-- <div fixed right-5 bottom-5 h-8 w-8 bgc-4b5259 r-20 flex-center cursor-pointer @click="backToTop()">
    <div i-carbon-up-to-top h-5 w-5 bg-white />
  </div> -->
</template>

<style>
.root {
  background-color: #22272d;
  color: #adbac7;
}
html {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  color-scheme: dark;
}
</style>
