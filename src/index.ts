import { createApp } from 'vue'
import { routes } from 'virtual:file-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
app.use(router)
app.mount('#app')
