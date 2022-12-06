import { Configuration, OpenAIApi } from 'openai'

export function useOpenai() {
  const apiKey = useLocalStorage('apiKey', '')
  const isReady = computed(() => apiKey.value !== '')

  function resetApiKey() {
    const newApiKey = window.prompt('Enter your API key')
    if (newApiKey)
      apiKey.value = newApiKey
    else
      window.alert('Invalid API key')
  }

  const openai = computed(() => {
    const config = new Configuration({
      apiKey: apiKey.value,
    })
    const openai = new OpenAIApi(config)
    return openai
  })

  return {
    apiKey,
    resetApiKey,
    isReady,
    openai,
  }
}
