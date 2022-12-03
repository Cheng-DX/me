/// <reference types="vite/client" />

declare module 'virtual:file-router' {
  import { RouteRecordRaw } from 'vue-router'
  export const routes: RouteRecordRaw[]
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}