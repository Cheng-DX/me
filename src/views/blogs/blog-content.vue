<script setup lang="ts">
import { useBlogContent, useRenderMD } from '~/composables'
import { useBlogs } from '~/composables/useBlogs'
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
    <footer flex justify-end>
      <router-link to="/blog-list" mt-14 mr-10 opacity-50 hover:opacity-80 transition-all c-white text-5>
        cd ../
      </router-link>
    </footer>
  </div>
</template>
