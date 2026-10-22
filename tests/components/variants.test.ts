import { expect, test } from 'vitest'
import { h } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiAccountList from '../../app/components/UiAccountList.vue'
import UiButton from '../../app/components/UiButton.vue'
import UiCodeBlock from '../../app/components/UiCodeBlock.vue'
import UiDisclosure from '../../app/components/UiDisclosure.vue'
import UiNote from '../../app/components/UiNote.vue'
import UiPagination from '../../app/components/UiPagination.vue'
import UiTableScroll from '../../app/components/UiTableScroll.vue'

const px = (value: string) => parseFloat(value)

test('note defaults to the accent bar and can show an icon', async () => {
  const screen = await render(UiNote, { props: { icon: 'info' }, slots: { default: 'Text' } })
  const note = screen.container.querySelector<HTMLElement>('.ui-note')!
  expect(px(getComputedStyle(note).borderInlineStartWidth)).toBe(4)
  expect(note.querySelector('.ui-note__icon')).not.toBeNull()
  expect(note.querySelector('.ui-note__body')!.textContent).toBe('Text')
})

test('subtle note keeps the old filled look without an icon', async () => {
  const screen = await render(UiNote, { props: { variant: 'subtle' }, slots: { default: 'Text' } })
  const note = screen.container.querySelector<HTMLElement>('.ui-note')!
  expect(getComputedStyle(note).borderTopColor).toBe('rgba(0, 0, 0, 0)')
  expect(note.querySelector('.ui-note__body')).toBeNull()
})

test('bordered disclosures are framed and keep a gap between neighbors', async () => {
  const screen = await render({
    render: () => [h(UiDisclosure, { summary: 'A' }), h(UiDisclosure, { summary: 'B' })],
  })
  const [first, second] = screen.container.querySelectorAll<HTMLElement>('.ui-disclosure')
  expect(px(getComputedStyle(first!).borderTopWidth)).toBe(1)
  expect(second!.getBoundingClientRect().top - first!.getBoundingClientRect().bottom).toBe(8)
})

test('divided disclosures share one line', async () => {
  const screen = await render({
    render: () => [
      h(UiDisclosure, { summary: 'A', variant: 'divided' }),
      h(UiDisclosure, { summary: 'B', variant: 'divided' }),
    ],
  })
  const [first, second] = screen.container.querySelectorAll<HTMLElement>('.ui-disclosure')
  expect(second!.getBoundingClientRect().top).toBe(first!.getBoundingClientRect().bottom - 1)
})

test('account tiles use two columns when there is room', async () => {
  const items = ['a', 'b'].map((id) => ({ href: `/${id}`, label: id, iconSrc: '/i.svg' }))
  const screen = await render({
    render: () =>
      h('div', { style: 'width: 600px' }, [
        h(UiAccountList, { items, variant: 'tiles', columns: 2 }),
      ]),
  })
  const [a, b] = screen.container.querySelectorAll<HTMLElement>('.account-link')
  expect(a!.getBoundingClientRect().top).toBe(b!.getBoundingClientRect().top)
  expect(px(getComputedStyle(a!).borderTopWidth)).toBe(1)
})

function accentColor() {
  const probe = document.createElement('span')
  probe.style.color = 'var(--color-accent)'
  document.body.append(probe)
  const color = getComputedStyle(probe).color
  probe.remove()
  return color
}

test('pagination fills the current page with the accent color', async () => {
  await render(UiPagination, { props: { total: 50, pageSize: 10, page: 2 } })
  const current = page.getByRole('button', { name: 'Page 2' }).element()
  expect(getComputedStyle(current).backgroundColor).toBe(accentColor())
})

test('solid button is filled with the accent color', async () => {
  const screen = await render(UiButton, { props: { variant: 'solid' }, slots: { default: 'Save' } })
  const button = screen.getByRole('button', { name: 'Save' }).element()
  expect(getComputedStyle(button).backgroundColor).toBe(accentColor())
})

test('table scroll frames the table without doubling the last line', async () => {
  const screen = await render(UiTableScroll, {
    props: { density: 'compact' },
    slots: { default: () => h('table', [h('tbody', [h('tr', [h('td', 'A')])])]) },
  })
  const frame = screen.container.querySelector<HTMLElement>('.ui-table-scroll')!
  expect(px(getComputedStyle(frame).borderTopLeftRadius)).toBeGreaterThan(0)
  expect(px(getComputedStyle(frame.querySelector('td')!).borderBottomWidth)).toBe(0)
})

test('code block copy button is an icon with a stable name', async () => {
  const screen = await render(UiCodeBlock, { props: { code: 'x' } })
  const button = screen.getByRole('button', { name: 'Copy' }).element()
  expect(button.textContent!.trim()).toBe('')
  expect(button.querySelector('svg')).not.toBeNull()
})
