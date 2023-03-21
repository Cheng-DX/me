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

const messages = ref<Message[]>([])
const content = ref('')

async function fetch() {
  if (content.value === '')
    return

  messages.value.push({
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

    messages.value.push(data.choices[0].message as Message)
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
    <div v-for="(message, index) in messages" :key="index" mt-10px>
      <div font-bold text-green>
        {{ message.role === 'assistant' ? 'ChatGPT' : 'You' }}
      </div>
      <div v-html="renderer.render(message.content)" />
    </div>
    <div mt-10px>
      <div font-bold text-start mt-10px mb-10px text-red>
        {{ loading ? 'Loading...' : '' }}
      </div>
      <div flex justify-center items-center>
        <input v-model="content" h-30px wp-50 pl-10px r-20px>
        {{ error }}
        <button :disabled="content === ''" btn-primary h-30px w-100px m-0 ml-20px @click="fetch()">
          Send
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

