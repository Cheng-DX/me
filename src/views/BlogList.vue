<script setup lang="ts">
const blogs = [
  'test',
  'long',
]
</script>

<template>
  <div>
    <router-link v-for="blog in blogs" :key="blog" :to="`/blogs/${blog}`">
      {{ blog }}
    </router-link>
  </div>
</template>
