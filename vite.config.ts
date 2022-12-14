import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import FileRouter from 'unplugin-vue-file-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defaultExportResolver } from '@chengdx/default-export-resolver'
import { presets as composablesPresets } from '@chengdx/composables'

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'netlify' ? '/' : '/me/',
    build: {
      outDir: 'docs',
      rollupOptions: {
        output: {
          sanitizeFileName: (name) => {
            return name.startsWith('\0') ? name.slice(1) : name
          },
        },
      },
      target: 'es6',
    },
    assetsInclude: [
      'blogs',
    ],
    plugins: [
      Inspect(),
      UnoCSS(),
      Vue(),
      FileRouter({
        matchRoute: [
          {
            rule: filename => filename === 'blog-content',
            resolver: () => ':blogname',
          },
        ],
      }),
      AutoImport({
        dts: true,
        resolvers: [
          defaultExportResolver([
            { name: 'yaml', from: 'js-yaml' },
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
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
