import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import FileRouter from 'unplugin-vue-file-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defaultExportResolver } from '@chengdx/default-export-resolver'
import { presets as composablesPresets } from '@chengdx/composables'
import { replaceSubstring } from '@chengdx/shared'
import yaml from 'js-yaml'

export default defineConfig({
  base: '/me',
  build: {
    outDir: 'docs',
  },
  plugins: [
    Inspect(),
    UnoCSS(),
    Vue(),
    FileRouter({
      matchRoute: [
        {
          rule: filename => filename === '[blog-content]',
          resolver: () => ':blogname',
        },
      ],
    }),
    AutoImport({
      dts: true,
      resolvers: [
        defaultExportResolver([
          { name: 'defu', from: 'defu' },
        ]),
      ],
      include: [
        /\.[tj]sx?$/,
        /\.vue$/, /\.vue\?vue/,
        /\.md$/,
      ],
      imports: [
        'vue',
        'vue-router',
        {
          'vue-router': [
            'RouterView',
            'RouterLink',
          ],
        },
        composablesPresets,
      ],
    }),
    {
      name: 'markdown-resolver',
      transform(src, id) {
        if (id.endsWith('.md')) {
          const first = src.indexOf('---')
          const second = src.indexOf('---', first + 3)
          const metaString = src.substring(first + 3, second)
          let meta
          try {
            meta = yaml.load(metaString)
          }
          catch (e) {
            console.error(e)
          }

          src = replaceSubstring(src, first, second + 3, '')
          src = src.replaceAll('`', '\\`')
          src = src.replaceAll('${', '\\${')
          return {
            code: `export const meta = ${JSON.stringify(meta, null, 2)}
export default \`${src}\``,
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
