import { afterEach, beforeEach, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { h, type Component } from 'vue'
import UiAccountList from '../../app/components/UiAccountList.vue'
import UiArticleEnding from '../../app/components/UiArticleEnding.vue'
import UiEntryList from '../../app/components/UiEntryList.vue'
import UiProfileIdentity from '../../app/components/UiProfileIdentity.vue'
import UiTimeline from '../../app/components/UiTimeline.vue'

// A wide viewport, so any narrow layout below can only come from the component's own width.
beforeEach(() => page.viewport(1280, 800))
afterEach(() => page.viewport(414, 896))

function inBox(width: number, component: Component, props: Record<string, unknown>) {
  render({ render: () => h('div', { style: `width: ${width}px` }, [h(component, props)]) })
}

const top = (selector: string) => document.querySelector(selector)!.getBoundingClientRect().top
const left = (selector: string) => document.querySelector(selector)!.getBoundingClientRect().left

test('entry list puts the date above the title in a narrow container', () => {
  const items = [{ href: '/a', title: 'Entry', date: '2026-10-20' }]
  inBox(320, UiEntryList, { items })
  expect(top('.entry-title')).toBeGreaterThan(top('time'))
  document.body.innerHTML = ''
  inBox(800, UiEntryList, { items })
  expect(top('.entry-title')).toBeLessThan(top('time') + 8)
})

test('entry list grows the date column instead of overflowing', () => {
  inBox(800, UiEntryList, {
    items: [
      { href: '/a', title: 'Entry', date: '2026-10-20', dateLabel: 'Wednesday, October 20, 2026' },
    ],
  })
  const time = document.querySelector('time')!.getBoundingClientRect()
  expect(left('.entry-content')).toBeGreaterThanOrEqual(time.right)
})

test('two-column entry list falls back to one column in a narrow container', () => {
  const items = [
    { href: '/a', title: 'A' },
    { href: '/b', title: 'B' },
  ]
  inBox(400, UiEntryList, { items, columns: 2, compact: true })
  const [first, second] = document.querySelectorAll('.entry-list > li')
  expect(second!.getBoundingClientRect().top).toBeGreaterThan(first!.getBoundingClientRect().top)
  document.body.innerHTML = ''
  inBox(800, UiEntryList, { items, columns: 2, compact: true })
  const [a, b] = document.querySelectorAll('.entry-list > li')
  expect(b!.getBoundingClientRect().top).toBe(a!.getBoundingClientRect().top)
})

test('spacious account list uses at most two columns', () => {
  const items = ['a', 'b', 'c'].map((id) => ({
    id,
    href: `/${id}`,
    label: id,
    accessibleLabel: id,
    iconSrc: '/icon.svg',
  }))
  inBox(400, UiAccountList, { items, variant: 'spacious' })
  const narrow = [...document.querySelectorAll('.account-list > li')].map(
    (li) => li.getBoundingClientRect().left,
  )
  expect(new Set(narrow).size).toBe(1)
  document.body.innerHTML = ''
  inBox(1000, UiAccountList, { items, variant: 'spacious' })
  const wide = [...document.querySelectorAll('.account-list > li')].map(
    (li) => li.getBoundingClientRect().left,
  )
  expect(new Set(wide).size).toBe(2)
})

test('timeline moves the date next to the marker in a narrow container', () => {
  const items = [{ date: '2026-10-20', title: 'Launched' }]
  inBox(320, UiTimeline, { items })
  expect(top('.timeline-content h3')).toBeGreaterThan(top('time'))
  expect(left('time')).toBe(left('.timeline-content'))
})

test('profile identity stacks the text below the image in a narrow container', () => {
  const props = { name: 'Ada Lovelace', imageSrc: '/a.png', imageAlt: '' }
  inBox(320, UiProfileIdentity, props)
  expect(top('.identity-copy')).toBeGreaterThan(top('.avatar'))
  document.body.innerHTML = ''
  inBox(800, UiProfileIdentity, props)
  expect(top('.identity-copy')).toBe(top('.avatar'))
})

test('article ending stacks the neighbor cards in a narrow container', () => {
  const props = {
    older: { href: '/o', title: 'Older' },
    newer: { href: '/n', title: 'Newer' },
    listHref: '/',
  }
  inBox(320, UiArticleEnding, props)
  expect(top('.newer')).toBeGreaterThan(top('.older'))
  document.body.innerHTML = ''
  inBox(800, UiArticleEnding, props)
  expect(top('.newer')).toBe(top('.older'))
})
