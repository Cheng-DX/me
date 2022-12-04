<script setup lang="ts">
const items = ref([
  { name: 'Blogs', link: '/blog-list' },
  { name: 'Project', link: '/project' },
])
</script>

<template>
  <header p-1rem flex justify-between items-center border-b-coolgray border-b-outset border-b-1>
    <router-link to="/" flex-center>
      <img src="https://avatars.githubusercontent.com/u/68094066?v=4" w-7 h-7 b-rounded alt="logo">
    </router-link>
    <div flex-center>
      <div v-for="item in items" :key="item.name" p-inline-2>
        <router-link :to="item.link">
          {{ item.name }}
        </router-link>
      </div>
      <a
        i-carbon-logo-github
        c-current
        w-7
        h-7
        p-inline-2
        href="https://github.com/Cheng-DX"
      />
    </div>
  </header>
  <main m-auto p-8 pt-2>
    <router-view />
  </main>
</template>
