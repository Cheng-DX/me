import type { MaybeCallable } from '@chengdx/shared'
import { replaceSubstring, resolveCallable } from '@chengdx/shared'
import type { Ref } from 'vue'
import type { Blog } from '~/types'

export function useBlogContent(blogname: Ref<string>, options?: {
  url?: MaybeCallable<string, [string]>
}) {
  const BASE_URL = 'https://raw.githubusercontent.com/Cheng-DX/me/main/blogs/'
  const { url = (name: string) => `${BASE_URL}${name}.md` } = options || {}

  const content = ref<string>('')
  const meta = ref<Blog>({})

  async function loadContent() {
    try {
      const res = await fetch(resolveCallable(url, blogname.value))
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
      meta.value = m
      content.value = mdtext
    }
    catch (e) {
      console.error(`[ERROR] Failed to load ${blogname.value}.md`)
    }
  }

  watch(blogname, () => {
    loadContent()
  }, {
    immediate: true,
    flush: 'post',
  })

  return {
    content,
    loadContent,
    meta,
  }
}
