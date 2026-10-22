import { afterEach, expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import { h } from 'vue'
import UiCodeBlock from '../../app/components/UiCodeBlock.vue'
import UiEntryList from '../../app/components/UiEntryList.vue'
import UiField from '../../app/components/UiField.vue'
import UiInput from '../../app/components/UiInput.vue'

// The setup file loads tokens.css only, which is what a project without base.css gets.
afterEach(() => document.body.removeAttribute('style'))

test('components bring their own baseline without styling the app', () => {
  document.body.style.fontFamily = 'Georgia'
  document.body.style.color = 'rgb(10, 20, 30)'
  render({
    render: () =>
      h('div', [
        h('a', { id: 'app-link', href: '/app' }, 'App link'),
        h('button', { id: 'app-button' }, 'App button'),
        h(UiEntryList, { items: [{ href: '/entry', title: 'Entry' }] }),
        h(UiCodeBlock, { code: 'const a = 1' }),
        h(UiField, { label: 'Name', hideLabel: true }, () => h(UiInput)),
      ]),
  })
  const style = (selector: string) => getComputedStyle(document.querySelector(selector)!)

  expect(style('.entry-link').color).toBe('rgb(10, 20, 30)')
  expect(style('.entry-link').boxSizing).toBe('border-box')
  expect(style('.copy-button').fontFamily).toContain('Georgia')
  expect(document.querySelector('.ui-field__label')!.getBoundingClientRect().width).toBe(1)

  expect(style('#app-link').color).not.toBe('rgb(10, 20, 30)')
  expect(style('#app-button').fontFamily).not.toContain('Georgia')
})
