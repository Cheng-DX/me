import type { Ref } from 'vue'

export function useBlogContent(blogname: Ref<string>) {
  const content = ref<string>('')
  const meta = ref<{
    title?: string
    date?: string | number
    author?: string
  }>({})

  async function loadContent() {
    try {
      const module = (await import(`~/blogs/${blogname.value}.md`)) as any
      content.value = module.default as string
      meta.value = module.meta as any
    }
    catch (e) {
      console.error(`[ERROR] Failed to load ${blogname.value}.md`)
    }
  }

  watch(blogname, loadContent, {
    immediate: true,
  })

  return {
    content,
    loadContent,
    meta,
  }
}
