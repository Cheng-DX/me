<script setup lang="ts">
import { useOpenai } from '~/composables/useOpenai'
import { useTheme } from '~/composables/useTheme'

const items = ref([
  // { name: '', link: '/blog-list', icon: 'i-carbon-blog' },
  // { name: 'Project', link: '/project', icon: 'i-carbon-align-box-middle-left' },
  // { name: 'IG', link: '/generate-image', icon: 'i-carbon-image-reference' },
  { name: 'ChatGPT', link: '/chat-gpt', icon: 'i-carbon-chat' },
])

const { resetApiKey } = useOpenai()
function reset() {
  const r = window.confirm('Are you sure to reset Api Key?')
  if (r)
    resetApiKey()
}

const { isDark, toggleDark } = useTheme()
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
      <a flex cursor-pointer @click="reset">
        <div mr-1 mt-1 h-5 w-5 i-carbon-virtual-column-key />
        <span>Reset</span>
      </a>
      <a
        i-carbon-logo-github
        c-current
        w-5
        h-5
        p-inline-2
        href="https://github.com/Cheng-DX"
      />
      <div
        :class="isDark ? 'i-carbon-moon' : 'i-carbon-sunny'"
        s-18px
        cursor-pointer
        @click="toggleDark"
      />
    </div>
  </header>
  <main m-auto pt-2 class="main-container">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.main-container {
  padding: 20px;
}
@media screen and (width < 768px) {
  .main-container {
    padding: 10px;
  }
}
</style>
