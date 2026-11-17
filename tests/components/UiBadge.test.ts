import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiBadge from '../../app/components/UiBadge.vue'
import { expectAccessible } from './helpers'

it('fills the accent badge with the accent color and keeps its text readable', async () => {
  const screen = await render(UiBadge, { props: { tone: 'accent' }, slots: { default: 'Pinned' } })
  const badge = screen.container.querySelector<HTMLElement>('.ui-badge')!
  const root = getComputedStyle(document.documentElement)
  const probe = document.createElement('span')
  probe.style.color = root.getPropertyValue('--color-accent')
  probe.style.backgroundColor = root.getPropertyValue('--color-on-accent')
  document.body.append(probe)

  expect(getComputedStyle(badge).backgroundColor).toBe(getComputedStyle(probe).color)
  expect(getComputedStyle(badge).color).toBe(getComputedStyle(probe).backgroundColor)
  probe.remove()
  await expectAccessible(screen.container)
})
