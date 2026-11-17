import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import UiTabs from '../../app/components/UiTabs.vue'
import { expectAccessible } from './helpers'

const items = [
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
]

describe('UiTabs end slot', () => {
  it('places the controls on the tab row and draws one line under both', async () => {
    const screen = await render(UiTabs, {
      props: { items, label: 'Notes' },
      slots: { end: () => h('button', { type: 'button' }, 'Grid view'), panel: () => 'List' },
    })
    const bar = screen.container.querySelector<HTMLElement>('.ui-tabs__bar')!
    const list = bar.querySelector<HTMLElement>('[role="tablist"]')!
    const end = bar.querySelector<HTMLElement>('.ui-tabs__end')!

    expect(getComputedStyle(bar).display).toBe('flex')
    expect(getComputedStyle(bar).borderBottomStyle).toBe('solid')
    expect(getComputedStyle(list).borderBottomStyle).toBe('none')
    expect(end.textContent).toBe('Grid view')
    expect(list.querySelector('button')).not.toBeNull()
    await expectAccessible(screen.container)
  })

  it('keeps the plain layout without the slot and on vertical tabs', async () => {
    const plain = await render(UiTabs, {
      props: { items, label: 'Notes' },
      slots: { panel: () => 'List' },
    })
    const plainBar = plain.container.querySelector<HTMLElement>('.ui-tabs__bar')!
    expect(getComputedStyle(plainBar).display).toBe('contents')
    expect(getComputedStyle(plainBar.querySelector('[role="tablist"]')!).borderBottomStyle).toBe(
      'solid',
    )

    const vertical = await render(UiTabs, {
      props: { items, label: 'Settings', orientation: 'vertical' },
      slots: { end: () => 'Ignored', panel: () => 'Panel' },
    })
    expect(vertical.container.querySelector('.ui-tabs__end')).toBeNull()
  })
})
