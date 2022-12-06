<script setup lang="ts">
import { useOpenai } from '~/composables/useApiKey'

const { resetApiKey, isReady, openai } = useOpenai()
const text = useLocalStorage('text', 'A cat')
const mount = useLocalStorage('mount', 1)
const res = ref<{
  url: string
}[]>([])
const error = ref('')
const loading = ref(false)

async function fetch() {
  if (!isReady.value) {
    window.alert('Please set your API key')
    return
  }
  loading.value = true
  try {
    const r = await openai.value.createImage({
      prompt: text.value,
      n: mount.value,
      size: '1024x1024',
    }) as any
    res.value = r.data.data
  }
  catch (e: any) {
    error.value = `Failed. You can check your network or API key. ${e.message}`
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="isReady">
    <div mb-10>
      <label>Text</label>
      <input v-model="text" h-8 wp-60 p-1 p-inline-4 text-4 border-none rounded ml-4>
      <label ml-4>
        Mount
      </label>
      <input v-model="mount" type="number" max="10" min="1" h-8 wp-5 p-1 p-inline-4 text-4 border-none rounded ml-2>
      <button btn ml-4 h-8 @click="fetch()">
        Generate
      </button>
      <button btn ml-4 h-8 @click="resetApiKey()">
        Reset ApiKey
      </button>
    </div>
    <h3 v-if="loading">
      Loading...
    </h3>
    <h3 v-else-if="error">
      {{ error }}
    </h3>
    <img v-for="i in res" v-else :key="i.url" :src="i.url" w-500px h-500px m-4>
  </div>
  <div v-else>
    <h3>
      It seems like you haven't set your API key yet. Click the button below to set it.
    </h3>
    <button btn h-10 @click="resetApiKey()">
      Set API key
    </button>
  </div>
</template>

