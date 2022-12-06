<script setup lang="ts">
const router = useRouter()
const items = ref([
  { name: 'Blogs', link: '/blog-list', icon: 'i-carbon-blog' },
  { name: 'Project', link: '/project', icon: 'i-carbon-align-box-middle-left' },
  { name: 'Image Generator', link: '/generate-image', icon: 'i-carbon-image-reference' },
])
const apiKey = useLocalStorage('apiKey', '')
const hasApiKey = computed(() => apiKey.value !== '')
</script>

<template>
  <header p-1rem flex justify-between items-center border-b-coolgray border-b-outset border-b-1>
    <router-link to="/" flex-center>
      <img src="https://avatars.githubusercontent.com/u/68094066?v=4" w-7 h-7 b-rounded alt="logo">
    </router-link>
    <div flex-center>
      <div v-for="item in items" :key="item.name" p-inline-2>
        <router-link :to="item.link" flex-center>
          <div :class="item.icon" mr-1 mt-1 h-5 w-5 />
          <span>
            {{ item.name }}
          </span>
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
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
