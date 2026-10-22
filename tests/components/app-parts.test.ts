import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiAppHeader from '../../app/components/UiAppHeader.vue'
import UiAppShell from '../../app/components/UiAppShell.vue'
import UiAvatarGroup from '../../app/components/UiAvatarGroup.vue'
import UiBreadcrumb from '../../app/components/UiBreadcrumb.vue'
import UiConnectionStatus from '../../app/components/UiConnectionStatus.vue'
import UiDisclosure from '../../app/components/UiDisclosure.vue'
import UiDrawer from '../../app/components/UiDrawer.vue'
import UiLoadMore from '../../app/components/UiLoadMore.vue'
import UiPagination from '../../app/components/UiPagination.vue'
import UiSeparator from '../../app/components/UiSeparator.vue'
import { expectAccessible } from './helpers'

afterEach(() => page.viewport(414, 896))

describe('UiBreadcrumb', () => {
  it('links the ancestors and marks the current page', async () => {
    const screen = await render(UiBreadcrumb, {
      props: {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Notes', href: '/notes' },
          { label: 'Draft' },
        ],
      },
    })
    await expect.element(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible()
    expect(screen.getByRole('link').elements()).toHaveLength(2)
    expect(screen.getByText('Draft').element().getAttribute('aria-current')).toBe('page')
    await expectAccessible(screen.container)
  })
})

describe('UiSeparator', () => {
  it('is a separator unless it is decorative', async () => {
    const screen = await render({
      render: () => [
        h(UiSeparator, { orientation: 'vertical' }),
        h(UiSeparator, { decorative: true }),
      ],
    })
    const separators = screen.getByRole('separator').elements()
    expect(separators).toHaveLength(1)
    expect(separators[0]!.getAttribute('aria-orientation')).toBe('vertical')
  })
})

describe('UiDisclosure', () => {
  it('follows the native details state', async () => {
    const screen = await render(UiDisclosure, {
      props: { summary: 'Advanced' },
      slots: { default: () => 'Hidden settings' },
    })
    await screen.getByText('Advanced').click()
    await vi.waitFor(() => expect(screen.emitted('update:open')).toEqual([[true]]))
  })
})

describe('UiAvatarGroup', () => {
  const people = ['Ada', 'Grace', 'Alan', 'Linus', 'Barbara', 'Ken'].map((name) => ({ name }))

  it('counts the people that do not fit and names them for screen readers', async () => {
    const screen = await render(UiAvatarGroup, {
      props: { items: people, label: 'Editors', max: 3 },
    })
    const list = screen.getByRole('list', { name: 'Editors' })
    expect(list.getByRole('listitem').elements()).toHaveLength(4)
    expect(screen.container.textContent).toContain('and 3 more')
    await expectAccessible(screen.container)
  })

  it('shows the last avatar instead of "+1"', async () => {
    const screen = await render(UiAvatarGroup, {
      props: { items: people.slice(0, 4), label: 'Editors', max: 3 },
    })
    expect(screen.getByRole('img').elements()).toHaveLength(4)
  })
})

describe('UiPagination', () => {
  it('shortens long ranges and moves between pages', async () => {
    const screen = await render(UiPagination, { props: { total: 200, pageSize: 10, page: 5 } })
    const pages = screen.container.querySelectorAll('.ui-pagination__pages li')
    expect([...pages].map((item) => item.textContent?.trim())).toEqual([
      '1',
      '…',
      '4',
      '5',
      '6',
      '…',
      '20',
    ])
    expect(
      screen.getByRole('button', { name: 'Page 5' }).element().getAttribute('aria-current'),
    ).toBe('page')
    await screen.getByRole('button', { name: 'Next' }).click()
    await screen.getByRole('button', { name: 'Page 20' }).click()
    expect(screen.emitted('update:page')).toEqual([[6], [20]])
    await expectAccessible(screen.container)
  })

  it('renders links with hrefFor and disables the edge', async () => {
    const screen = await render(UiPagination, {
      props: { total: 30, pageSize: 10, page: 1, hrefFor: (page: number) => `?page=${page}` },
    })
    expect(screen.getByRole('link', { name: 'Page 2' }).element().getAttribute('href')).toBe(
      '?page=2',
    )
    expect(
      screen.getByRole('button', { name: 'Previous' }).element().hasAttribute('disabled'),
    ).toBe(true)
  })

  it('renders nothing for a single page', async () => {
    const screen = await render(UiPagination, { props: { total: 5 } })
    expect(screen.container.querySelector('nav')).toBeNull()
  })
})

describe('UiLoadMore', () => {
  it('keeps focus nearby when the last page arrives', async () => {
    const screen = await render(UiLoadMore, { props: { status: 'Showing 20 of 25' } })
    const button = screen.getByRole('button', { name: 'Load more' })
    await button.click()
    expect(screen.emitted('load')).toHaveLength(1)
    button.element().focus()
    await screen.rerender({ hasMore: false, status: 'Showing 25 of 25' } as never)
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('role')).toBe('status'))
  })
})

describe('UiConnectionStatus', () => {
  it('keeps the label for screen readers in compact mode', async () => {
    const screen = await render(UiConnectionStatus, {
      props: { status: 'reconnecting', compact: true },
    })
    const status = screen.getByRole('status').element()
    expect(status.textContent?.trim()).toBe('Reconnecting')
    expect(status.getAttribute('title')).toBe('Reconnecting')
  })
})

describe('UiDrawer', () => {
  it('opens from the side as a dialog and returns focus on close', async () => {
    const screen = await render(
      defineComponent(() => {
        const open = ref(false)
        return () => [
          h('button', { onClick: () => (open.value = true) }, 'Open'),
          h(
            UiDrawer,
            {
              open: open.value,
              'onUpdate:open': (v: boolean) => (open.value = v),
              side: 'end',
              title: 'Backlinks',
            },
            () => 'Linked notes',
          ),
        ]
      }),
    )
    await screen.getByRole('button', { name: 'Open' }).click()
    const dialog = page.getByRole('dialog', { name: 'Backlinks' })
    await expect.element(dialog).toBeVisible()
    expect(dialog.element().classList).toContain('ui-modal--end')
    await dialog.getByRole('button', { name: 'Close' }).click()
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Open'))
  })
})

describe('UiAppHeader', () => {
  it('links the brand, marks the current item and reports the menu button', async () => {
    const main = document.createElement('main')
    main.id = 'main'
    document.body.append(main)
    onTestFinished(() => main.remove())
    const screen = await render(UiAppHeader, {
      props: {
        brandHref: '/',
        brandLabel: 'Docs home',
        navigation: [
          { href: '/guide', label: 'Guide' },
          { href: '/api', label: 'API' },
        ],
        activeHref: '/api',
        menu: true,
        skipTarget: '#main',
      },
      slots: { brand: () => 'Docs' },
    })
    expect(screen.getByRole('link', { name: 'Docs home' }).element().getAttribute('href')).toBe('/')
    expect(screen.getByRole('link', { name: 'API' }).element().getAttribute('aria-current')).toBe(
      'page',
    )
    expect(
      screen.getByRole('link', { name: 'Skip to content' }).element().getAttribute('href'),
    ).toBe('#main')
    await screen.getByRole('button', { name: 'Menu' }).click()
    expect(screen.emitted('menu')).toHaveLength(1)
    await expectAccessible(screen.container)
  })
})

describe('UiAppShell', () => {
  const slots = {
    header: () => 'Nyaledge',
    sidebar: () => h('a', { href: '/notes' }, 'Notes'),
    default: () => h('h1', 'Inbox'),
  }

  it('shows the sidebar as a column on wide screens', async () => {
    await page.viewport(1280, 800)
    const screen = await render(UiAppShell, { slots })
    await expect.element(screen.getByRole('region', { name: 'Sidebar navigation' })).toBeVisible()
    expect(screen.container.querySelector('button')).toBeNull()
    await expectAccessible(screen.container)
  })

  it('moves the sidebar into a drawer on narrow screens', async () => {
    await page.viewport(600, 800)
    const screen = await render(UiAppShell, { slots })
    await screen.getByRole('button', { name: 'Menu' }).click()
    const drawer = page.getByRole('dialog', { name: 'Sidebar navigation' })
    await expect.element(drawer).toBeVisible()
    await expect.element(drawer.getByRole('link', { name: 'Notes' })).toBeVisible()
  })
})
