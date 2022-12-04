import _ from '~/list.json'
import type { Blog } from '~/types'

const blogs = ref<Blog[]>(_)

export function useBlogs() {
  const index = ref(0)
  const router = useRouter()
  const current = computed(() => blogs.value[index.value])

  const next = () => {
    index.value = (index.value + 1) % blogs.value.length
    router.push(`/blogs/${current.value.name}`)
  }
  const prev = () => {
    index.value = (index.value - 1 + blogs.value.length) % blogs.value.length
    router.push(`/blogs/${current.value.name}`)
  }

  return {
    blogs,
    current,
    next,
    prev,
  }
}
