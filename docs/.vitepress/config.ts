import { fileURLToPath } from 'node:url'
import { defineConfigWithTheme } from 'vitepress'
import { createThemeConfig, type DocsThemeConfig } from '../../vitepress/config.js'
import { componentGroups, pageLink } from './component-groups'
import { docsBase } from './paths'

export default defineConfigWithTheme<DocsThemeConfig>({
  // Keeps the theme choice that visitors saved before the theme moved into the package.
  extends: createThemeConfig({ colorModeStorageKey: 'wingland-docs-theme' }),
  lang: 'en',
  title: 'wing(ui)',
  description: 'Vue UI components',
  base: docsBase,
  // The index renders its category headings in a loop, which the Markdown parser cannot see.
  transformPageData(pageData) {
    if (pageData.relativePath !== 'components/index.md') return
    pageData.headers = componentGroups.map((group) => ({
      level: 2,
      title: group.text,
      slug: group.id,
      link: `#${group.id}`,
      children: [],
    }))
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^@wing-land\/ui$/,
          replacement: fileURLToPath(new URL('../../index.ts', import.meta.url)),
        },
      ],
    },
  },
  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Design', link: '/design' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Components', link: '/components/' },
          { text: 'Design', link: '/design' },
          { text: 'Config', link: '/config' },
          { text: 'VitePress', link: '/vitepress' },
        ],
      },
      ...componentGroups.map((group) => ({
        text: group.text,
        items: group.pages.map((page) => ({ text: page.text, link: pageLink(page) })),
      })),
    ],
    footerLinks: [{ text: 'GitHub', link: 'https://github.com/wing-land/ui' }],
  },
})
