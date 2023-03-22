<script setup lang="ts">
import { useOpenai } from '~/composables/useOpenai'
import { renderer } from '~/composables'

const { resetApiKey, isReady, openai } = useOpenai()
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

async function fetch() {
  if (content.value === '')
    return
  addMessage({
    role: 'user',
    content: content.value,
  })

  content.value = ''
  loading.value = true
  try {
    const { data } = await openai.value.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages.value,
    })
    addMessage(data.choices[0].message as Message)
  }
  catch (e: any) {
    error.value = e.message
  }
  finally {
    loading.value = false
  }
}
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
      <div flex justify-center items-center>
        <input v-model="content" h-30px wp-50 pl-10px r-20px @keypress.enter="fetch()">
        {{ error }}
        <button :disabled="content === ''" btn-primary h-30px w-100px m-0 ml-20px @click="fetch()">
          {{ loading ? 'Loading...' : 'Send' }}
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
</style>

