import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiInput from '../../app/components/UiInput.vue'
import { expectAccessible } from './helpers'

describe('UiInput plain title', () => {
  it('reads as a heading at rest and shows the box while focused', async () => {
    const screen = await render(UiInput, {
      props: { variant: 'plain', size: 'title', modelValue: 'Room ownership' },
      attrs: { 'aria-label': 'Page title' },
    })
    const box = screen.container.querySelector<HTMLElement>('.ui-input__box')!
    const input = screen.getByRole('textbox', { name: 'Page title' })

    expect(getComputedStyle(box).borderTopColor).toBe('rgba(0, 0, 0, 0)')
    expect(getComputedStyle(box).backgroundColor).toBe('rgba(0, 0, 0, 0)')
    expect(parseFloat(getComputedStyle(box).fontSize)).toBeGreaterThanOrEqual(26)
    expect(getComputedStyle(box).fontWeight).toBe('600')

    await userEvent.click(input)
    await expect.element(input).toHaveFocus()
    expect(box.matches(':focus-within')).toBe(true)
    // The box animates its border color, so read the style once the transition has finished.
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(getComputedStyle(box).borderTopColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(getComputedStyle(box).outlineStyle).toBe('solid')
    await expectAccessible(screen.container)
  })

  it('keeps the boxed look by default', async () => {
    const screen = await render(UiInput, { attrs: { 'aria-label': 'Name' } })
    const box = screen.container.querySelector<HTMLElement>('.ui-input__box')!
    expect(getComputedStyle(box).borderTopColor).not.toBe('rgba(0, 0, 0, 0)')
  })
})
