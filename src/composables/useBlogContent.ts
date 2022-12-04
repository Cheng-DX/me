import { replaceSubstring } from '@chengdx/shared'
import type { Ref } from 'vue'

export function useBlogContent(blogname: Ref<string>) {
  const content = ref<string>('')
  const meta = ref<{
    title?: string
    date?: string | number
    author?: string
  }>({})

  async function loadContent() {
    const BASE_URL = 'https://raw.githubusercontent.com/Cheng-DX/me/main/blogs/'
    try {
      const res = (await fetch(`${BASE_URL}${blogname.value}.md`))
      let mdtext = await res.text()

      const first = mdtext.indexOf('---')
      const second = mdtext.indexOf('---', first + 3)
      const mString = mdtext.substring(first + 3, second)
      let m
      try {
        m = yaml.load(mString)
      }
      catch (e) {
        console.error(e)
      }

      mdtext = replaceSubstring(mdtext, first, second + 3, '')
      mdtext = mdtext.replaceAll('`', '\\`')
      mdtext = mdtext.replaceAll('${', '\\${')

      meta.value = JSON.stringify(m, null, 2) as any
      content.value = mdtext
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
