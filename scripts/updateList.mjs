import fs from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'
import consola from 'consola'

const _ = fs.readdirSync(resolve('blogs'))
  .filter(filename => filename.endsWith('.md'))
  .map(filename => {
    const name = filename.replace(/.md$/, '')
    const mdtext = fs.readFileSync(resolve('blogs', filename), 'utf-8')
    const first = mdtext.indexOf('---')
    const second = mdtext.indexOf('---', first + 3)
    const mString = mdtext.substring(first + 3, second)
    let meta
    try {
      meta = yaml.load(mString)
    }
    catch (e) {
      console.error(e)
    }
    consola.success(`Parsed ${name}`)

    return {
      name,
      ...meta,
    }
  })

fs.writeFileSync(resolve('src/list.json'), JSON.stringify(Array.from(new Set(_)), null, 2))
