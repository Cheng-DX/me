<script setup lang="ts">
import { useBlogContent, useRenderMD } from '~/composables'
const route = useRoute()

const blogname = computed(() => {
  return route.params.blogname as string
})

const { content, meta } = useBlogContent(blogname)
const result = useRenderMD(content)
</script>

<template>
  <div m-auto max-w-80ch>
    <h1 mb-10 break-all>
      {{ meta?.title }}
    </h1>
    <div v-html="result" />
  </div>
</template>
