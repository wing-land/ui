import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiButton from '../../app/components/UiButton.vue'
import { expectAccessible } from './helpers'

describe('UiButton', () => {
  it('applies variant, tone and size classes', async () => {
    const screen = await render(UiButton, {
      props: { variant: 'solid', tone: 'danger', size: 'sm' },
      slots: { default: () => 'Delete' },
    })
    const button = screen.getByRole('button', { name: 'Delete' })
    await expect
      .element(button)
      .toHaveClass('ui-button', 'ui-button--solid', 'ui-button--danger', 'ui-button--sm')
    await expect.element(button).toHaveAttribute('type', 'button')
  })

  it('names icon-only buttons with label', async () => {
    const screen = await render(UiButton, { props: { icon: 'search', label: 'Search' } })
    await expect
      .element(screen.getByRole('button', { name: 'Search' }))
      .toHaveClass('ui-button--icon-only')
    await expectAccessible(screen.container)
  })

  it('keeps focus but blocks activation while loading', async () => {
    const onClick = vi.fn()
    const screen = await render(UiButton, {
      props: { loading: true, onClick },
      slots: { default: () => 'Save' },
    })
    const button = screen.getByRole('button', { name: 'Save' })
    await expect.element(button).toHaveAttribute('aria-busy', 'true')
    const element = button.element() as HTMLButtonElement
    expect(element.disabled).toBe(false)
    element.focus()
    element.click()
    expect(onClick).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(element)
  })

  it('renders a link for navigation and falls back to a button when disabled', async () => {
    const screen = await render(UiButton, {
      props: { href: '/posts' },
      slots: { default: () => 'All posts' },
    })
    await expect
      .element(screen.getByRole('link', { name: 'All posts' }))
      .toHaveAttribute('href', '/posts')
    await screen.rerender({ disabled: true } as never)
    await expect.element(screen.getByRole('button', { name: 'All posts' })).toBeDisabled()
  })
})
