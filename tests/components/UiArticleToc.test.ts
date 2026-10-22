import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiArticleToc from '../../app/components/UiArticleToc.vue'
import UiProfileIdentity from '../../app/components/UiProfileIdentity.vue'

const links = [
  { id: 'intro', text: 'Intro' },
  { id: 'usage', text: 'Usage' },
]
let article: HTMLElement | undefined

afterEach(() => article?.remove())

describe('UiArticleToc', () => {
  it('omits numbers when numbered is false', async () => {
    const screen = await render(UiArticleToc, { props: { links, depth: 2, numbered: false } })
    expect(screen.container.querySelector('.toc-number')).toBeNull()
  })

  it('renders the rail layout as an always-open list', async () => {
    const screen = await render(UiArticleToc, {
      props: { links, depth: 2, layout: 'rail', density: 'compact' },
    })
    const root = screen.container.querySelector('.ui-article-toc')!
    expect(root.tagName).toBe('DIV')
    expect(root.classList).toContain('ui-article-toc--compact')
    expect(root.querySelector('summary')).toBeNull()
    await expect.element(page.getByRole('link', { name: 'Usage' })).toBeVisible()
  })

  it('marks the heading being read when trackActive is on', async () => {
    article = document.createElement('div')
    article.innerHTML =
      '<h2 id="intro">Intro</h2><div style="height:2000px"></div><h2 id="usage">Usage</h2><div style="height:2000px"></div>'
    document.body.prepend(article)
    await page.viewport(1280, 800)
    await render(UiArticleToc, { props: { links, depth: 2, trackActive: true } })
    document.getElementById('usage')!.scrollIntoView()
    await expect
      .element(page.getByRole('link', { name: 'Usage' }))
      .toHaveAttribute('aria-current', 'true')
    await expect
      .element(page.getByRole('link', { name: 'Intro' }))
      .not.toHaveAttribute('aria-current')
  })

  it('marks a heading stopped at its scroll-margin below activeOffset', async () => {
    article = document.createElement('div')
    article.innerHTML =
      '<h2 id="intro">Intro</h2><div style="height:2000px"></div><h2 id="usage" style="scroll-margin-top:134px">Usage</h2><div style="height:2000px"></div>'
    document.body.prepend(article)
    await page.viewport(1280, 800)
    await render(UiArticleToc, { props: { links, depth: 2, trackActive: true } })
    document.getElementById('usage')!.scrollIntoView()
    await expect
      .element(page.getByRole('link', { name: 'Usage' }))
      .toHaveAttribute('aria-current', 'true')
  })
})

describe('UiProfileIdentity', () => {
  it('generates a unique heading id and honours headingLevel', async () => {
    const props = { name: 'wing', imageSrc: '/a.png', imageAlt: '', headingLevel: 3 as const }
    await render({ render: () => [h(UiProfileIdentity, props), h(UiProfileIdentity, props)] })
    const headings = page.getByRole('heading', { level: 3, name: 'wing' }).elements()
    expect(headings).toHaveLength(2)
    expect(headings[0]!.id).not.toBe(headings[1]!.id)
  })
})
