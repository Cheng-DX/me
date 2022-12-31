---
title: 'Maybe computed ref stuff'
---

## Maybe computed ref stuff

在`MaybeComputedRef`的使用中，我一直执着于仅使用resolveUnref来处理变量，但是这样会导致性能问题

比如说，当我在computed内使用resolveUnref时，每个变量的变化都会触发computed的重新计算，这样可能会造成一些不必要的大运算，浪费了computed的缓存功能。

```ts
export function useChart(
  series: MaybeComputedRef<SeriesOption>,
  options: {
    custom?: MaybeComputedRef<EChartsOption>
    tools?: MaybeRef<EChartsOption>[]
  } = {},
) {
  const { custom = {}, tools = [] } = options || {}
  const customRef = resolveRef(custom)
  const seriesRef = resolveRef(series)

  const base = computed(() => {
    return defu(customRef.value, baseConfig, ...tools.map(unref))
  })

  const option = computed<EChartsOption>(() => {
    return {
      ...base.value,
      series: seriesRef.value,
    }
  })

  return option
}
```

