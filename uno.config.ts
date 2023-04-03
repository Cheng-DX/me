import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
    ['flex-center', 'display-flex justify-center items-center'],
    ['btn', 'c-text-0 flex-center r-5 cursor-pointer btn-text border-none disabled:opacity-50 disabled:cursor-not-allowed'],

    ['btn-primary', 'btn bg-primary'],
    ['btn-success', 'btn bg-success'],
    ['btn-danger', 'btn bg-danger'],
    ['btn-text', 'btn bg-text c-text-3'],

    ['bg-primary', 'bgc-5865f2 hover:bgc-4752c4 active:bgc-3c45a5'],
    ['bg-success', 'bgc-248046 hover:bgc-1a6334 active:bgc-15562b'],
    ['bg-danger', 'bgc-da373c hover:bgc-a12828 active:bgc-8f2022'],
    ['bg-text', 'bgc-b8b9bf hover:bgc-e0e1e5 active:bgc-ffffff'],

    ['c-change-1', 'c-text-1 hover:c-text-0 transition-280'],
    ['c-change-2', 'c-text-2 hover:c-text-1 transition-280'],
    ['c-change-3', 'c-text-3 hover:c-text-1 transition-280'],
  ],
  rules: [
    [
      'scroll-y',
      {
        'overflow-y': 'scroll',
      },
    ],
    ['btn-text',
      {
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
        'font-weight': 700,
      },
    ],
    [
      'scroll-x',
      {
        'overflow-x': 'scroll',
      },
    ],
    ['c-text-0', { color: '#ffffff' }],
    ['c-text-1', { color: '#f3f4f5' }],
    ['c-text-2', { color: '#e0e1e5' }],
    ['c-text-3', { color: '#b8b9bf' }],
    [/^wp-(\d+)$/, ([, d]) => ({ width: `${d}%` })],
    [/^hp-(\d+)$/, ([, d]) => ({ height: `${d}%` })],
    [/^r-(\d+)$/, ([, d]) => ({ 'border-radius': `${d}px` })],
    [/^bgc-([0-9a-zA-z]+)$/, ([, s]) => ({ 'background-color': `#${s}` })],
    [/^c-([0-9a-zA-z]+)$/, ([, s]) => ({ color: `#${s}` })],
    [/^s-(\w+)$/, ([, w]) => ({ height: w, width: w })],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: () =>
          import('@iconify-json/carbon/icons.json').then(i => i.default as any),
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default as any),
      },
    }),
    presetWebFonts({
      fonts: {
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
