<script setup lang="ts">
const items = ref([
  { name: 'Blogs', link: '/blog-list' },
  { name: 'Project', link: '/project' },
])
</script>

<template>
  <header p-1rem flex justify-between items-center>
    <img src="https://avatars.githubusercontent.com/u/68094066?v=4" w-10 h-10 b-circle alt="logo">
    <div flex>
      <div v-for="item in items" :key="item.name" p-inline-2>
        <router-link :to="item.link">
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </header>
  <main m-auto p-8>
    <router-view />
  </main>
</template>

<style scoped>

</style>
