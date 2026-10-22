import { describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiSiteHeader from '../../app/components/UiSiteHeader.vue'
import { currentValue } from '../../app/lib/navigation'

describe('currentValue', () => {
  it('distinguishes the page from its section', () => {
    expect(currentValue('/posts', '/posts/')).toBe('page')
    expect(currentValue('/posts', '/posts/hello', 'exact')).toBeUndefined()
    expect(currentValue('/posts', '/posts/hello', 'prefix')).toBe('true')
    expect(currentValue('/', '/posts', 'prefix')).toBeUndefined()
    expect(currentValue('/guide.html', '/guide')).toBe('page')
    expect(currentValue('/post', '/posts', 'prefix')).toBeUndefined()
  })

  it('compares fragment-only links as written', () => {
    expect(currentValue('#inbox', '#inbox')).toBe('page')
    expect(currentValue('#projects', '#inbox')).toBeUndefined()
  })
})

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
]

describe('UiSiteHeader', () => {
  it('marks the current section with prefix matching', async () => {
    await render(UiSiteHeader, {
      props: {
        navigation,
        brandHref: '/',
        brandLabel: 'Home page',
        activeHref: '/posts/hello',
        match: 'prefix',
      },
    })
    await expect
      .element(page.getByRole('link', { name: 'Posts' }))
      .toHaveAttribute('aria-current', 'true')
    await expect
      .element(page.getByRole('link', { name: 'Home', exact: true }))
      .not.toHaveAttribute('aria-current')
  })

  it('folds the navigation behind a menu button on narrow screens', async () => {
    await page.viewport(400, 800)
    const screen = await render(UiSiteHeader, {
      props: { navigation, brandHref: '/', brandLabel: 'Home page', collapsible: true },
    })
    const nav = screen.container.querySelector('nav')!
    const menu = page.getByRole('button', { name: 'Menu' })
    await expect.element(menu).toHaveAttribute('aria-expanded', 'false')
    await expect.element(nav).not.toBeVisible()
    await menu.click()
    await expect.element(page.getByRole('link', { name: 'Posts' })).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect.element(menu).toHaveAttribute('aria-expanded', 'false')
    await expect.element(menu).toHaveFocus()
    const menuElement = menu.element()
    await page.viewport(1280, 800)
    await expect.element(menuElement).not.toBeVisible()
    await expect.element(nav).toBeVisible()
  })
})
