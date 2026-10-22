import { describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiThemePicker from '../../app/components/UiThemePicker.vue'
import { expectAccessible } from './helpers'

async function renderPicker() {
  const screen = await render(UiThemePicker, {
    props: { modelValue: 'system' },
  })
  const trigger = screen.getByRole('button', { name: 'Theme (current: System)' })
  return { screen, trigger }
}

describe('UiThemePicker', () => {
  it('opens a panel and keeps it open after selection', async () => {
    const { screen, trigger } = await renderPicker()
    await trigger.click()
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true')
    await screen.getByRole('radio', { name: 'Dark' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([['dark']])
    await expect.element(screen.getByRole('group', { name: 'Theme' })).toBeVisible()
    await expectAccessible(screen.container)
  })

  it('moves focus into the panel with ArrowDown and returns it on Escape', async () => {
    const { screen, trigger } = await renderPicker()
    ;(trigger.element() as HTMLElement).focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect.element(screen.getByRole('radio', { name: 'System' })).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect.element(trigger).toHaveFocus()
  })

  it('closes on an outside pointer press without moving focus to the trigger', async () => {
    const outside = document.createElement('button')
    outside.textContent = 'Outside'
    document.body.append(outside)
    const { trigger } = await renderPicker()
    await trigger.click()
    await page.getByRole('button', { name: 'Outside' }).click()
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect.element(trigger).not.toHaveFocus()
    outside.remove()
  })
})
