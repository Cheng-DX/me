<script setup lang="ts">
const background = '#22272d'
const color = '#adbac7'

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
  <div fixed right-5 bottom-5 h-10 w-10 bgc-4b5259 b-circle flex-center cursor-pointer @click="backToTop()">
    <div i-carbon-up-to-top h-5 w-5 bg-white font-1000 />
  </div>
</template>

<style>
.root {
  --bg: v-bind(background);
  --color: v-bind(color);
}
.root {
  background-color: var(--bg);
  color: var(--color);
}
html {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  color-scheme: dark;
}
</style>
