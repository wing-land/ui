import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const html = await readFile(new URL('./.output/public/index.html', import.meta.url), 'utf8')

assert.match(html, /<p data-link-component>component</, 'the Nuxt plugin injects NuxtLink')
assert.match(html, /class="router-link-active[^"]*"[^>]*><!--\[-->Internal/, 'internal links use NuxtLink')
assert.match(html, /class="ui-external-link"/, 'external links are detected')
assert.match(html, /<dialog class="ui-modal/, 'teleported dialogs are server-rendered')
const labelFor = /<label class="ui-field__label" for="([^"]+)"/.exec(html)?.[1]
assert.ok(labelFor && html.includes(`id="${labelFor}"`), 'the field label points at the input')
assert.match(html, /role="tablist"/, 'Reka UI tabs are server-rendered')
assert.match(html, /role="toolbar"/, 'Reka UI toolbar is server-rendered')
assert.match(html, /aria-label="パンくずリスト"/, 'wingUi.locale sets the messages')
assert.match(html, /<html[^>]* lang="ja"/, 'wingUi.locale sets <html lang>')
assert.match(html, /wing-ui-color-mode/, 'wingUi.colorMode adds the theme script')
const css = await Promise.all(
  [...html.matchAll(/href="(\/_nuxt\/[^"]+\.css)"/g)].map(([, href]) =>
    readFile(new URL(`./.output/public${href}`, import.meta.url), 'utf8'),
  ),
).then((files) => files.join('') + html)
assert.equal(css.match(/--color-accent:#843b51/g)?.length, 1, 'tokens.css is loaded once')
assert.match(css, /font-family:Inter/, 'wingUi.font loads Inter')
assert.match(css, /\.ui-sr-only/, 'wingUi.css.base loads base.css')
assert.match(css, /\.prose/, 'wingUi.css.prose loads prose.css')
console.log('Nuxt consumer output looks correct.')
