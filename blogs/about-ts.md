---
title: 'About TypeScript'
---

### Write type-safe function judgement in TypeScript
```ts
export function isFunction<T extends Function>(_: unknown): _ is T {
  return typeof _ === 'function'
}

```