import type { Ref } from 'vue'

export function useBlogContent(blogname: Ref<string>) {
  const content = ref<string>('')

  async function loadContent() {
    try {
      content.value = (await import(`~/blogs/${blogname.value}.md`)).default as string
    }
    catch (e) {
      console.error(`[ERROR] Failed to load ${blogname.value}.md `)
    }
  }

  loadContent()

  return {
    content,
    loadContent,
  }
}
