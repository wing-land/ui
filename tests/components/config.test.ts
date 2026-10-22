import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'
import { createIntlDateFormatter, createUi, formatDotDate, ja } from '../../index'
import UiConfigProvider from '../../app/components/UiConfigProvider.vue'
import UiLink from '../../app/components/UiLink.vue'
import UiPostDate from '../../app/components/UiPostDate.vue'

const FakeLink = defineComponent({
  props: { href: { type: String, required: true } },
  setup:
    (props, { slots }) =>
    () =>
      h('a', { href: props.href, 'data-fake-link': '' }, slots.default?.()),
})

describe('UI config', () => {
  it('uses English and dotted dates by default', async () => {
    const screen = await render(UiPostDate, { props: { date: '2026-10-20', kind: 'published' } })
    await expect.element(screen.getByText('2026.10.20')).toBeVisible()
    await expect
      .element(screen.container.querySelector('time')!)
      .toHaveAttribute('aria-label', 'Published: 2026.10.20')
  })

  it('keeps year-only and year-month dates without a made-up day', () => {
    const context = { locale: 'en' }
    expect(formatDotDate('2025-03', context)).toBe('2025.03')
    expect(formatDotDate('2025', context)).toBe('2025')
    const long = createIntlDateFormatter({ dateStyle: 'long' })
    expect(long('2025-03', context)).toBe('March 2025')
    expect(long('2025', context)).toBe('2025')
    expect(long('2025-03-01', context)).toBe('March 1, 2025')
  })

  it('formats ISO date-times in the configured time zone', async () => {
    const screen = await render(UiPostDate, {
      props: { date: '2026-10-19T23:30:00Z', kind: 'updated' },
      global: { plugins: [createUi({ timeZone: 'Asia/Tokyo' })] },
    })
    await expect.element(screen.getByText('2026.10.20')).toBeVisible()
  })

  it('lets a provider switch the locale for its subtree', async () => {
    const screen = await render(UiConfigProvider, {
      props: { config: { locale: ja } },
      slots: { default: () => h(UiPostDate, { date: '2026-10-20', kind: 'published' }) },
    })
    await expect.element(screen.container.querySelector('time')!).toHaveAttribute('title', '公開日')
  })

  it('renders internal links with the configured link component', async () => {
    const screen = await render(UiLink, {
      props: { href: '/posts' },
      slots: { default: () => 'Posts' },
      global: { plugins: [createUi({ linkComponent: FakeLink })] },
    })
    await expect
      .element(screen.getByRole('link', { name: 'Posts' }))
      .toHaveAttribute('data-fake-link', '')
  })

  it('marks external links and announces them', async () => {
    const screen = await render(UiLink, {
      props: { href: 'https://example.com' },
      slots: { default: () => 'Example' },
    })
    await expect
      .element(screen.getByRole('link', { name: 'Example (external site)' }))
      .toBeVisible()
  })
})
