import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import DocsLanguageMenu from '../../vitepress/DocsLanguageMenu.vue'
import { localeLinks } from '../../vitepress/locales'
import { expectAccessible } from './helpers'

const locales = {
  root: { label: '日本語', lang: 'ja' },
  en: { label: 'English', lang: 'en' },
}

describe('localeLinks', () => {
  it('links to the same page in every locale', () => {
    const links = localeLinks({
      locales,
      currentLocale: 'en',
      relativePath: 'en/guide/install.md',
      cleanUrls: true,
      samePage: true,
    })
    expect(links).toEqual([
      { key: 'root', label: '日本語', lang: 'ja', link: '/guide/install', current: false },
      { key: 'en', label: 'English', lang: 'en', link: '/en/guide/install', current: true },
    ])
  })

  it('maps index pages to their directory and keeps .html without clean URLs', () => {
    const link = (relativePath: string, cleanUrls: boolean) =>
      localeLinks({ locales, currentLocale: 'root', relativePath, cleanUrls, samePage: true }).map(
        (locale) => locale.link,
      )
    expect(link('index.md', true)).toEqual(['/', '/en/'])
    expect(link('guide/index.md', true)).toEqual(['/guide/', '/en/guide/'])
    expect(link('guide.md', false)).toEqual(['/guide.html', '/en/guide.html'])
  })

  it('uses a locale link set in the config', () => {
    const links = localeLinks({
      locales: { ...locales, en: { label: 'English', link: '/english/' } },
      currentLocale: 'en',
      relativePath: 'english/guide.md',
      cleanUrls: true,
      samePage: true,
    })
    expect(links.map((locale) => locale.link)).toEqual(['/guide', '/english/guide'])
  })

  it("links to each locale's home page when samePage is false", () => {
    const links = localeLinks({
      locales,
      currentLocale: 'root',
      relativePath: 'guide.md',
      cleanUrls: true,
      samePage: false,
    })
    expect(links.map((locale) => locale.link)).toEqual(['/', '/en/'])
  })
})

async function renderMenu() {
  const screen = await render(DocsLanguageMenu, {
    props: {
      locales: localeLinks({
        locales,
        currentLocale: 'root',
        relativePath: 'guide.md',
        cleanUrls: true,
        samePage: true,
      }),
    },
  })
  const trigger = screen.getByRole('button', { name: 'Language (current: 日本語)' })
  return { screen, trigger }
}

describe('DocsLanguageMenu', () => {
  it('lists each locale as a link and marks the current one', async () => {
    const { screen, trigger } = await renderMenu()
    await trigger.click()
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true')
    const english = screen.getByRole('link', { name: 'English' })
    await expect.element(english).toHaveAttribute('href', '/en/guide')
    await expect.element(english).toHaveAttribute('lang', 'en')
    await expect
      .element(screen.getByRole('link', { name: '日本語' }))
      .toHaveAttribute('aria-current', 'true')
    await expectAccessible(screen.container)
  })

  it('moves focus to the current locale with ArrowDown and returns it on Escape', async () => {
    const { screen, trigger } = await renderMenu()
    ;(trigger.element() as HTMLElement).focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect.element(screen.getByRole('link', { name: '日本語' })).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect.element(trigger).toHaveFocus()
  })
})
