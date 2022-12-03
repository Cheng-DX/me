import type { Ref } from 'vue'
import createMD from 'markdown-it'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/github-dark.css'

const renderer = createMD({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      }
      catch (err) {
        console.error(err)
      }
    }
    return ''
  },
})

export function useRenderMD(source: Ref<string>) {
  return computed(() => {
    return renderer.render(source.value || 'Loading...')
  })
}
