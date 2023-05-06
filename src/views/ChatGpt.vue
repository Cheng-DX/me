<script setup lang="ts">
import Axios from 'axios'
import { loadAll } from 'js-yaml'
import { useOpenai } from '~/composables/useOpenai'
import { useChatContext } from '~/composables/useChat'
import { renderer } from '~/composables'
import { useId } from '~/composables/useId'

const { resetApiKey, isReady, apiKey } = useOpenai()
const messageCards = ref<HTMLDivElement>()
const {
  messages,
  content,
  fetchable,
  loading,
  send,
  clear,
  newChat,
  removeChat,
  id,
  ids,
  messagesMap,
} = useChatContext(apiKey, messageCards)

const name = ref('')
const renamingId = ref('')
const renaming = ref(false)

function rename(id: string) {
  name.value = messagesMap.value[id].name
  renamingId.value = id
  renaming.value = true
}
function save() {
  renaming.value = false
  messagesMap.value[renamingId.value].name = name.value
  name.value = ''
}

onMounted(() => {
  messageCards.value?.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
})
</script>

<template>
  <div flex>
    <aside w-220px style="max-height: calc(100vh - 80px)" overflow-scroll>
      <div btn-primary @click="newChat()">
        ADD
      </div>
      <div
        v-for="_id in ids"
        :key="_id"
        flex items-center justify-between
        h-50px m-block-2 r-7
        class="card"
      >
        <input
          v-if="renaming && renamingId === _id"
          v-model="name"
          mr-1 p-block-2px p-inline-5px
          style="background-color: #cccccc1e; border-radius: 5px;"
          class="inner-input"
          @keypress.exact.enter="save()"
        >
        <span v-else cursor-pointer flex-1 style="line-height: 50px;" @click="id = _id">
          {{ messagesMap[_id].name || _id }}
        </span>
        <div flex>
          <div
            v-if="renaming && renamingId === _id"
            i-carbon-save
            s-16px btn-primary mr-2
            @click="save()"
          />
          <div v-else i-carbon-edit s-16px btn-primary mr-2 @click="rename(_id)" />
          <div i-carbon-trash-can s-16px btn-danger @click="removeChat(_id)" />
        </div>
      </div>
    </aside>
    <main ref="messageCards" flex-1 ml-20px mb-50px style="max-height: calc(100vh - 150px)" overflow-scroll>
      <div v-if="isReady">
        <div
          v-for="(message, index) in messages" :key="index" mt-10px
          class="card"
          flex
          items-start
        >
          <div
            font-500 text-15px font-italic flex items-center mr-10px mt-10px
            class="translate-y-50%"
            :class="loading && index === messages.length - 1 ? 'loading' : ''"
          >
            <div v-if="message.role === 'assistant'" i-tabler-brand-openai />
            <div v-else i-carbon-ai-results-very-high />
          </div>
          <div
            style="width: calc(100% - 28px);min-height: 54px;"
            :class="loading && index === messages.length - 1 && 'content'"
            v-html="renderer.render(message.content)"
          />
        </div>
      </div>
      <div v-else>
        <h3>
          It seems like you haven't set your API key yet. Click the button below to set it.
        </h3>
        <button
          btn-primary
          h-10 @click="resetApiKey()"
        >
          Set API key
        </button>
      </div>
      <div mt-10px fixed bottom-10px wp-80>
        <div w-full h-auto flex items-center>
          <div p-block-8px p-inline-20px flex-1 flex bgc-383a40 r-8>
            <input
              v-model="content"
              flex-1
              transition
              class="inner-input"
              placeholder="Send with Enter"
              autofocus="true"
              @keypress.exact.enter="send()"
            >
          </div>
          <button w-42px h-30px ml-11px r-6 p-block-10px btn-primary :disabled="!fetchable" @click="send()">
            <div i-carbon-send-alt-filled s-20px c-ffffffd9 />
          </button>
          <button w-42px h-30px ml-11px r-6 p-block-10px btn-danger :disabled="loading" @click="clear()">
            <div i-carbon-clean s-20px c-ffffffd9 />
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.card {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #cccccc4c;
  text-align: justify;
}

@media screen and (width < 768px) {
  .card {
    padding: 5px 10px;
  }
}

.inner-input {
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  line-height: 25px;
  resize: none;
}

/* opacity */
@keyframes loading {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.1;
  }
}
.loading {
  animation: loading 1.7s infinite ease-in-out;
}

.content > :not(ol):not(ul):not(pre):last-child:after,
.content > ol:last-child li:last-child:after,
.content > pre:last-child code:after,
.content > ul:last-child li:last-child:after {
  content: '|';
  width: 3px;
  height: 100%;
  background-color: #ffffff73;
  color: transparent;
  margin-left: 2px;
}
</style>

<style>
.error {
  color: #ff5555;
}
</style>

