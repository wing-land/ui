import type { DocsLabels } from './types'

export const enLabels: DocsLabels = {
  home: '{title} home',
  mainNavigation: 'Main',
  openPageList: 'Open page list',
  pages: 'Pages',
  onThisPage: 'On this page',
  headingLink: 'Link to "{title}"',
  searchDocs: 'Search docs',
  searchPlaceholder: 'Search',
  clearSearch: 'Clear search',
  searchResults: 'Search results',
  resultCountOne: '{count} result',
  resultCountOther: '{count} results',
  noResults: 'No results',
}

export const jaLabels: DocsLabels = {
  home: '{title} トップ',
  mainNavigation: 'メイン',
  openPageList: 'ページ一覧を開く',
  pages: 'ページ一覧',
  onThisPage: 'このページの内容',
  headingLink: '「{title}」へのリンク',
  searchDocs: 'ドキュメントを検索',
  searchPlaceholder: '検索',
  clearSearch: '検索語を消去',
  searchResults: '検索結果',
  resultCountOne: '{count} 件',
  resultCountOther: '{count} 件',
  noResults: '見つかりませんでした',
}

export function isJapanese(lang: string) {
  return lang === 'ja' || lang.startsWith('ja-')
}

export function resolveLabels(lang: string, override?: Partial<DocsLabels>): DocsLabels {
  return { ...(isJapanese(lang) ? jaLabels : enLabels), ...override }
}

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match))
}
