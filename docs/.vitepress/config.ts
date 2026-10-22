import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { syntaxThemes } from '../../theme/shiki'
import { componentGroups, pageLink } from './component-groups'
import { docsBase } from './paths'
import { searchIndexOptions } from './search'
export default defineConfig({
  lang: 'en',
  title: 'wing(ui)',
  description: 'Vue UI components',
  base: docsBase,
  // Hash links stop headings where style.css `scroll-margin-top` puts them, under the sticky header.
  scrollOffset: 80,
  appearance: false,
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
  head: [
    [
      'script',
      {},
      `try{const mode=localStorage.getItem('wingland-docs-theme')||'system';document.documentElement.classList.toggle('dark',mode==='dark'||(mode==='system'&&matchMedia('(prefers-color-scheme: dark)').matches))}catch{document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme: dark)').matches)}`,
    ],
  ],
  markdown: {
    theme: { light: syntaxThemes.default, dark: syntaxThemes.dark },
    headers: true,
    codeCopyButtonTitle: 'Copy code',
  },
  vite: {
    // VitePress 1.x bundles Vite 5, whose Sass default is the deprecated legacy JS API.
    css: {
      preprocessorOptions: { scss: { api: 'modern-compiler' }, sass: { api: 'modern-compiler' } },
    },
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
        ],
      },
      ...componentGroups.map((group) => ({
        text: group.text,
        items: group.pages.map((page) => ({ text: page.text, link: pageLink(page) })),
      })),
    ],
    // The index is built by VitePress; DocsSearch renders it because the custom layout has no search box.
    search: { provider: 'local', options: { miniSearch: { options: searchIndexOptions } } },
    socialLinks: [{ icon: 'github', link: 'https://github.com/wing-land/ui' }],
  },
})
