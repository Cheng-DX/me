import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS(),
  ],
})
