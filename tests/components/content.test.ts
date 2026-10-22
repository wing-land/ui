import { afterEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiAlert from '../../app/components/UiAlert.vue'
import UiArticleEnding from '../../app/components/UiArticleEnding.vue'
import UiAvatar from '../../app/components/UiAvatar.vue'
import UiCard from '../../app/components/UiCard.vue'
import UiDate from '../../app/components/UiDate.vue'
import UiEntryList from '../../app/components/UiEntryList.vue'
import { expectAccessible } from './helpers'

afterEach(() => vi.restoreAllMocks())

describe('UiDate', () => {
  it('switches to relative time after mount and keeps the absolute date in the tooltip', async () => {
    const screen = await render(UiDate, {
      props: {
        date: '2026-10-20T03:00:00Z',
        relative: true,
        label: 'Updated',
        now: new Date('2026-10-20T03:05:00Z'),
      },
    })
    const time = screen.container.querySelector('time')!
    await expect.element(time).toHaveAttribute('aria-label', 'Updated: 5 minutes ago')
    expect(time.getAttribute('title')).toMatch(/^Updated: /)
    expect(time.getAttribute('datetime')).toBe('2026-10-20T03:00:00Z')
  })
})

describe('UiEntryList', () => {
  it('renders slots and announces external entries', async () => {
    const screen = await render(UiEntryList, {
      props: {
        items: [
          { href: '/a', title: 'Local' },
          { href: 'https://example.com', title: 'Remote', external: true, key: 'remote' },
        ],
      },
      slots: { meta: ({ item }: { item: { title: string } }) => h('span', `meta ${item.title}`) },
    })
    await expect.element(screen.getByText('meta Local')).toBeVisible()
    await expect
      .element(page.getByRole('link', { name: /Remote.*\(external site\)/ }))
      .toBeVisible()
    await expectAccessible(screen.container)
  })
})

describe('UiCard', () => {
  it('renders as a link, a button or a plain box', async () => {
    const link = await render(UiCard, {
      props: { href: '/x' },
      slots: { default: () => 'Link card' },
    })
    await expect
      .element(page.getByRole('link', { name: 'Link card' }))
      .toHaveClass('ui-card--interactive')
    await link.unmount()
    const button = await render(UiCard, {
      props: { button: true },
      slots: { default: () => 'Button card' },
    })
    await expect
      .element(page.getByRole('button', { name: 'Button card' }))
      .toHaveAttribute('type', 'button')
    await button.unmount()
    const box = await render(UiCard, { slots: { default: () => 'Static card' } })
    expect(box.container.querySelector('.ui-card')!.tagName).toBe('DIV')
  })

  it('puts media edge to edge above the padded content', async () => {
    const screen = await render(UiCard, {
      props: { button: true },
      slots: {
        media: () => h('img', { alt: '', src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=' }),
        default: () => 'Media card',
      },
    })
    const card = screen.container.querySelector('.ui-card')!
    const media = card.querySelector('.ui-card__media')!
    const body = card.querySelector('.ui-card__body')!
    // Spans keep the content valid inside a <button>.
    expect([media.tagName, body.tagName]).toEqual(['SPAN', 'SPAN'])
    expect(media.getBoundingClientRect().width).toBeCloseTo(card.clientWidth, 0)
    expect(getComputedStyle(body).paddingTop).toBe('20px')
    await expect.element(page.getByRole('button', { name: 'Media card' })).toBeVisible()
  })
})

describe('UiArticleEnding', () => {
  it('copies the share URL itself when copyStatus is omitted', async () => {
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    const screen = await render(UiArticleEnding, {
      props: {
        listHref: '/posts',
        shareUrl: 'https://example.com/p',
        newer: { href: '/n', title: 'Next' },
      },
    })
    await page.getByRole('button', { name: 'Copy link' }).click()
    expect(writeText).toHaveBeenCalledWith('https://example.com/p')
    await vi.waitFor(() =>
      expect(screen.container.querySelector('[role="status"]')!.textContent).toBe('Link copied.'),
    )
    expect(screen.emitted('copy')).toHaveLength(1)
  })
})

describe('UiAvatar', () => {
  it('falls back to initials when the image fails', async () => {
    await render(UiAvatar, { props: { name: 'Ada Lovelace', src: '/missing.png' } })
    await expect.element(page.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL')
  })
})

describe('UiAlert', () => {
  it('only announces when asked, and uses alert for danger', async () => {
    const quiet = await render(UiAlert, { props: { tone: 'danger', title: 'Failed' } })
    expect(quiet.container.querySelector('[role]')).toBeNull()
    await quiet.unmount()
    await render(UiAlert, { props: { tone: 'danger', title: 'Failed', announce: true } })
    await expect.element(page.getByRole('alert')).toHaveTextContent('Failed')
    await expectAccessible()
  })
})
