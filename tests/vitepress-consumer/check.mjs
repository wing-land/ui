import { readFile, readdir } from 'node:fs/promises'
import assert from 'node:assert/strict'

const dist = new URL('./docs/.vitepress/dist/', import.meta.url)
const html = await readFile(new URL('index.html', dist), 'utf8')

assert.match(html, /<html lang="ja"/, 'the site lang reaches <html lang>')
assert.match(html, /class="docs-shell"/, 'the package Layout renders')
assert.match(html, /aria-label="ページ一覧を開く"/, 'lang: ja picks the Japanese theme text')
assert.match(html, /placeholder="サイト内検索"/, 'themeConfig.labels overrides one label')
assert.match(html, /本文へ移動/, 'the components get the Japanese locale')
assert.match(html, />\s*テストサイト\s*</, 'the brand falls back to the site title')
assert.match(html, /href="https:\/\/github.com\/wing-land\/ui"/, 'footerLinks render')
assert.match(html, /wing-ui-color-mode/, 'the config adds the color mode script')
assert.match(html, /<h2 id="使い方"/, 'markdown.headers feeds the page outline')
const assets = await readdir(new URL('assets/', dist))
const chunks = await readdir(new URL('assets/chunks/', dist))
assert.ok(
  chunks.some((file) => file.startsWith('@localSearchIndex')),
  'the local search index is built',
)
const css = (
  await Promise.all(
    assets
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFile(new URL(`assets/${file}`, dist), 'utf8')),
  )
).join('')
assert.equal(css.match(/--color-accent:\s*#843b51/g)?.length, 1, 'tokens.css is loaded once')
assert.match(css, /\.docs-layout\s*\{/, 'the theme stylesheet is loaded')
console.log('VitePress consumer output looks correct.')
