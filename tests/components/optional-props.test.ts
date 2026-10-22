import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiAccountList from '../../app/components/UiAccountList.vue'
import UiArticleEnding from '../../app/components/UiArticleEnding.vue'
import UiArticleHeader from '../../app/components/UiArticleHeader.vue'
import UiArticleToc from '../../app/components/UiArticleToc.vue'
import UiPhotoAlbumCard from '../../app/components/UiPhotoAlbumCard.vue'
import UiProfileIdentity from '../../app/components/UiProfileIdentity.vue'
import UiSiteHeader from '../../app/components/UiSiteHeader.vue'
import UiTimeline from '../../app/components/UiTimeline.vue'

test('site header shows the site name as text without brandHref', async () => {
  const screen = await render(UiSiteHeader, {
    props: { navigation: [] },
    slots: { brand: 'Sample' },
  })
  const brand = screen.container.querySelector('.brand')!
  expect(brand.tagName).toBe('SPAN')
  expect(brand.hasAttribute('aria-label')).toBe(false)
})

test('article header omits the dates when there are none', async () => {
  const screen = await render(UiArticleHeader, { props: { title: 'Draft' } })
  expect(screen.container.querySelector('h1')!.textContent).toBe('Draft')
  expect(screen.container.querySelector('.article-meta')).toBeNull()
})

test('article toc shows only top-level headings by default', async () => {
  const links = [{ id: 'a', text: 'A', children: [{ id: 'a1', text: 'A1' }] }]
  const screen = await render(UiArticleToc, { props: { links } })
  expect(screen.container.querySelector('.toc-sublist')).toBeNull()
})

test('article ending hides the list link without listHref', async () => {
  const screen = await render(UiArticleEnding, { props: { older: { href: '/o', title: 'Older' } } })
  expect(screen.container.querySelector('.article-end-actions a')).toBeNull()
  expect(screen.container.querySelector('.article-end-actions button')).not.toBeNull()
})

test('timeline uses the given heading level', async () => {
  const items = [{ date: '2026-10-20', title: 'Launched' }]
  const screen = await render(UiTimeline, { props: { items, headingLevel: 2 } })
  expect(screen.container.querySelector('h2.timeline-title')!.textContent).toBe('Launched')
})

test('profile identity falls back to initials without an image', async () => {
  const screen = await render(UiProfileIdentity, { props: { name: 'Ada Lovelace' } })
  expect(screen.container.querySelector('img')).toBeNull()
  expect(screen.container.querySelector('.ui-avatar__initials')!.textContent).toBe('AL')
})

test('photo album card is named by its visible text without openLabel', async () => {
  const screen = await render(UiPhotoAlbumCard, {
    props: { cover: '/cover.png', coverAlt: '', title: 'Mountains' },
  })
  const card = screen.container.querySelector('.ui-photo-album-card')!
  expect(card.hasAttribute('aria-label')).toBe(false)
  expect(card.querySelector('.album-count')).toBeNull()
  expect(card.querySelector('.album-tags')).toBeNull()
  await expect.element(screen.getByRole('button', { name: 'Mountains' })).toBeVisible()
})

test('account list items need only a link, label, and icon', async () => {
  const items = [{ href: 'https://example.com', label: 'Example', iconSrc: '/icon.svg' }]
  const screen = await render(UiAccountList, { props: { items } })
  await expect.element(screen.getByRole('link', { name: 'Example' })).toBeVisible()
})
