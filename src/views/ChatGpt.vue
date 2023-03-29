<script setup lang="ts">
import Axios from 'axios'
import { loadAll } from 'js-yaml'
import { useOpenai } from '~/composables/useOpenai'
import { renderer } from '~/composables'

const { resetApiKey, isReady, apiKey } = useOpenai()
const error = ref('')
const loading = ref(false)

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = useLocalStorage<Message[]>('messages', [])
const content = ref('')

function addMessage(message: Message) {
  messages.value.push(message)
  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  })
}

function clear() {
  if (!loading.value)
    messages.value = []
}

const axios = Axios.create({
  baseURL: 'https://api.openai.com/v1',
  onDownloadProgress: ({ event }) => {
    try {
      const text = event.target.responseText.trim() as string
      const s = text.split('data: ').filter(_ => _ !== '')
        .map(s => {
          if (!s.includes('[DONE]'))
            return JSON.parse(s).choices[0].delta.content || ''
          return ''
        }).join('')
      const lastMessage = messages.value[messages.value.length - 1]
      if (lastMessage.role === 'assistant') {
        lastMessage.content = s
        nextTick(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          })
        })
      }
    }
    catch (e) {
      console.error(e)
    }
  },
  headers: {
    authorization: `Bearer ${apiKey.value}`,
    accept: '*/*',
  },
})

const fetchable = computed(() => {
  return content.value.trim() !== '' && !loading.value
})
async function fetch() {
  if (!fetchable.value)
    return
  addMessage({
    role: 'user',
    content: content.value,
  })

  content.value = ''
  loading.value = true
  try {
    addMessage({
      role: 'assistant',
      content: 'Thinking...',
    })
    await axios.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages.value,
      stream: true,
    })
  }
  catch (e: any) {
    error.value = e.message
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
})
</script>

<template>
  <div v-if="isReady">
    <div
      v-for="(message, index) in messages" :key="index" mt-10px
      class="card"
    >
      <div font-bold text-green text-1 font-italic>
        {{ message.role === 'assistant' ? 'ChatGPT' : 'You' }}
      </div>
      <div v-html="renderer.render(message.content)" />
    </div>
    <div mt-10px>
      <div w-full h-auto flex items-center>
        <div p-block-8px p-inline-20px flex-1 flex bgc-383a40 r-8>
          <input
            v-model="content"
            flex-1
            transition
            class="inner-input"
            placeholder="给ChatGPT发消息 使用Enter发送"
            autofocus="true"
            @keypress.exact.enter="fetch()"
          >
        </div>
        <button w-42px h-30px ml-11px r-6 p-block-10px btn-primary :disabled="!fetchable" @click="fetch()">
          <div i-carbon-send-alt-filled s-20px c-ffffffd9 />
        </button>
        <button w-42px h-30px ml-11px r-6 p-block-10px btn-danger :disabled="loading" @click="clear()">
          <div i-carbon-clean s-20px c-ffffffd9 />
        </button>
      </div>
    </div>
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

<style scoped>
.card {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #cccccc4c;
}

.inner-input {
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  line-height: 25px;
  resize: none;
}
</style>

