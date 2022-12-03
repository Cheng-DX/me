<script setup lang="ts">
const { toggleDarkmode } = useDarkmode()
const { theme } = useTheme()
const items = ref([
  { name: 'Blogs', link: 'blogs' },
  { name: 'Project', link: 'project' },
])

watch(theme, () => {
  document.documentElement.style.colorScheme = theme.value
}, { immediate: true, flush: 'post' })
</script>

<template>
  <header p-1rem flex justify-between>
    <img src="https://avatars.githubusercontent.com/u/68094066?v=4" w-10 h-10 alt="logo">
    <div flex>
      <div v-for="item in items" :key="item.name" p-1rem>
        <router-link :to="item.link">
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <button btn @click="toggleDarkmode()">
      Toggle
    </button>
  </header>
  <main m-auto p-8>
    <router-view />
  </main>
</template>

<style scoped>

</style>
