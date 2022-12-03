import { createApp } from 'vue'
import { routes } from 'virtual:file-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'uno.css'
import '~/styles/markdown.css'

const app = createApp(App)
const router = createRouter({
  routes: [
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
  history: createWebHashHistory(),
})
app.use(router)
app.mount('#app')
