import { defineConfigWithTheme } from 'vitepress'
import wingConfig, { type DocsThemeConfig } from '@wing-land/ui/vitepress/config'

export default defineConfigWithTheme<DocsThemeConfig>({
  extends: wingConfig,
  lang: 'ja',
  title: 'テストサイト',
  locales: {
    root: { label: '日本語', lang: 'ja' },
    en: { label: 'English', lang: 'en', title: 'Test site' },
  },
  themeConfig: {
    nav: [
      { text: 'はじめに', link: '/' },
      { text: 'ガイド', link: '/guide' },
    ],
    sidebar: [
      {
        text: 'ガイド',
        items: [
          { text: 'はじめに', link: '/' },
          { text: 'ガイド', link: '/guide' },
        ],
      },
    ],
    footerLinks: [{ text: 'GitHub', link: 'https://github.com/wing-land/ui' }],
    labels: { searchPlaceholder: 'サイト内検索' },
  },
})
