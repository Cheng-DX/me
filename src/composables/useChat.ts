import Axios from 'axios'
import type { Ref } from 'vue'
import { useId } from './useId'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface MessagesMap {
  [key: string]: {
    timestamp: number
    name: string
    messages: Message[]
  }
}

export function useMessages(messageCards: Ref<HTMLDivElement | undefined>) {
  const { id, newId, removeId, ids } = useId()
  const messagesMap = useLocalStorage<MessagesMap>('messagesMap', {})
  const content = ref('')
  const loading = ref(false)

  function newChat() {
    newId()
    messagesMap.value[id.value] = {
      timestamp: Date.now(),
      name: '',
      messages: [],
    }
  }

  function removeChat(id: string) {
    removeId(id)
    delete messagesMap.value[id]
  }

  const messages = computed(() => {
    return messagesMap.value[id.value]?.messages || []
  })

  const meta = computed(() => {
    const { timestamp, name } = messagesMap.value[id.value] || {}

    return {
      timestamp,
      name,
    }
  })

  function addMessage(message: Message) {
    messagesMap.value[id.value].messages.push(message)
    nextTick(() => {
      messageCards.value?.scrollTo({
        top: messageCards.value.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  function clear() {
    if (!loading.value)
      messagesMap.value[id.value].messages = []
  }

  return {
    messages,
    content,
    addMessage,
    clear,
    meta,
    newChat,
    removeChat,
    id,
    ids,
    messagesMap,
  }
}

export function useChatContext(apiKey: Ref<string>, messageCards: Ref<HTMLDivElement | undefined>) {
  const { messages, content, addMessage, clear, meta, newChat, removeChat, id, ids, messagesMap } = useMessages(messageCards)

  let fetchingIdFlag = ''

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
        const lastMessage = messagesMap.value[fetchingIdFlag].messages[messagesMap.value[fetchingIdFlag].messages.length - 1]
        if (lastMessage.role === 'assistant') {
          lastMessage.content = s
          nextTick(() => {
            messageCards.value?.scrollTo({
              top: messageCards.value.scrollHeight,
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

  const loading = ref(false)
  const error = ref('')

  const fetchable = computed(() => {
    return content.value.trim() !== '' && !loading.value
  })

  async function fetch() {
    loading.value = true
    axios.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages.value,
      stream: true,
    })
      .then()
      .catch((e: any) => {
        const errorMsg = e?.response?.data?.error?.message || e.message
        error.value = errorMsg
      })
      .finally(() => {
        loading.value = false
      })
  }

  function send() {
    if (content.value.trim() === '')
      return
    fetchingIdFlag = id.value
    addMessage({
      role: 'user',
      content: content.value,
    })
    fetch()
    addMessage({
      role: 'assistant',
      content: '',
    })
    content.value = ''
  }

  return {
    messages,
    meta,
    content,
    send,
    fetchable,
    loading,
    error,
    clear,
    newChat,
    removeChat,
    id,
    ids,
    messagesMap,
  }
}
