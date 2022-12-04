<script setup lang="ts">
import { useBlogs } from '~/composables/useBlogs'

const { blogs } = useBlogs()
</script>

<template>
  <div v-for="{ author, date, name, title } in blogs" :key="name">
    <router-link :to="`/blogs/${name}`">
      {{ title }}
    </router-link>
  </div>
</template>
