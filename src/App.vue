<script setup lang="ts">
const background = '#22272d'
const color = '#adbac7'
</script>

<template>
  <div class="root" min-h-screen>
    <router-view />
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
}
</style>
