<script setup lang="ts">
import { useBlogContent, useRenderMD } from '~/composables'
const route = useRoute()

const blogname = computed(() => {
  return route.params.blogname as string
})

const { content } = useBlogContent(blogname)
const result = useRenderMD(content)
</script>

<template>
  <div max-w-80ch m-auto v-html="result" />
</template>

<style scoped>

</style>
