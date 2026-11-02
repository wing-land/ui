export interface DocsLocaleConfig {
  label?: string
  lang?: string
  link?: string
}

export interface DocsLocaleLink {
  key: string
  label: string
  lang?: string
  /** Path without the `base`. */
  link: string
  current: boolean
}

export interface DocsLocaleLinkOptions {
  locales: Record<string, DocsLocaleConfig>
  currentLocale: string
  /** The page's source path, such as `en/guide/index.md`. */
  relativePath: string
  cleanUrls: boolean
  /** Links to the same page in each locale. When false, links to each locale's home page. */
  samePage: boolean
}

// Same default as VitePress: the root locale lives at `/`, any other key at `/<key>/`.
function localeHome(key: string, locale: DocsLocaleConfig) {
  return locale.link ?? (key === 'root' ? '/' : `/${key}/`)
}

function pagePath(relativePath: string, home: string, cleanUrls: boolean) {
  const source = `/${relativePath}`
  const withinLocale = source.startsWith(home) ? source.slice(home.length) : relativePath
  return withinLocale.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, cleanUrls ? '' : '.html')
}

export function localeLinks(options: DocsLocaleLinkOptions): DocsLocaleLink[] {
  const { locales, currentLocale, relativePath, cleanUrls, samePage } = options
  const currentHome = localeHome(currentLocale, locales[currentLocale] ?? {})
  const page = samePage ? pagePath(relativePath, currentHome, cleanUrls) : ''
  return Object.entries(locales).map(([key, locale]) => ({
    key,
    label: locale.label ?? key,
    lang: locale.lang,
    link: localeHome(key, locale) + page,
    current: key === currentLocale,
  }))
}
