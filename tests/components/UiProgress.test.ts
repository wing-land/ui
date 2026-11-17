import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiProgress from '../../app/components/UiProgress.vue'
import { expectAccessible } from './helpers'

describe('UiProgress', () => {
  it('reports its value and draws the bar to scale', async () => {
    const screen = await render(UiProgress, { props: { value: 64, label: 'Uploading' } })
    const bar = page.getByRole('progressbar', { name: 'Uploading' })
    await expect.element(bar).toHaveAttribute('aria-valuenow', '64')
    await expect.element(bar).toHaveAttribute('aria-valuemax', '100')
    const fill = screen.container.querySelector<HTMLElement>('.ui-progress__bar')!
    expect(fill.style.width).toBe('64%')
    await expectAccessible(screen.container)
  })

  it('keeps out-of-range values inside the track', async () => {
    const screen = await render(UiProgress, { props: { value: 150, label: 'Uploading' } })
    expect(screen.container.querySelector<HTMLElement>('.ui-progress__bar')!.style.width).toBe(
      '100%',
    )
  })

  it('leaves out the value while the total is unknown', async () => {
    await render(UiProgress, { props: { label: 'Preparing' } })
    const bar = page.getByRole('progressbar', { name: 'Preparing' })
    await expect.element(bar).not.toHaveAttribute('aria-valuenow')
  })
})
