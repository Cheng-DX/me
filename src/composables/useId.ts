export function useId() {
  const id = useLocalStorage<string>('id', '')
  const ids = useLocalStorage<string[]>('ids', [])

  function randomId() {
    return Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8)
  }

  function newId() {
    id.value = randomId()
    ids.value.push(id.value)
  }

  function removeId(_id: string) {
    ids.value = ids.value.filter(_ => _ !== _id)
    id.value = ids.value[0] || ''
  }

  return {
    id,
    ids,
    newId,
    removeId,
  }
}
