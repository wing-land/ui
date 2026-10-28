export type DocsNavItem = { text: string; link: string }
export type DocsSidebarGroup = { text: string; items: DocsNavItem[] }

export interface DocsLabels {
  /** `{title}` becomes the site title. */
  home: string
  mainNavigation: string
  openPageList: string
  pages: string
  onThisPage: string
  /** `{title}` becomes the heading text. */
  headingLink: string
  searchDocs: string
  searchPlaceholder: string
  clearSearch: string
  searchResults: string
  /** `{count}` becomes the number of results. */
  resultCountOne: string
  resultCountOther: string
  noResults: string
}

export interface DocsThemeConfig {
  nav?: DocsNavItem[]
  sidebar?: DocsSidebarGroup[]
  footerLinks?: DocsNavItem[]
  /** Overrides part of the text chosen from the site `lang`. */
  labels?: Partial<DocsLabels>
  /** localStorage key for the saved light or dark choice. Set by `createThemeConfig()`. */
  colorModeStorageKey?: string
}
