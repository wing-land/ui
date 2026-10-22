export type UiNavMatch = 'exact' | 'prefix'

export function normalizeHref(href: string) {
  const path = href.split(/[?#]/, 1)[0] ?? ''
  return path.replace(/\.html$/, '').replace(/(.)\/$/, '$1')
}

/**
 * `page` marks the current page itself; `true` marks an ancestor section of it.
 * Prefix matching never treats the site root as an ancestor of every page.
 */
export function currentValue(
  itemHref: string,
  currentHref: string | undefined,
  match: UiNavMatch = 'exact',
): 'page' | 'true' | undefined {
  if (!currentHref) return undefined
  const item = normalizeHref(itemHref)
  const current = normalizeHref(currentHref)
  // Fragment-only links such as `#intro` have no path, so they are compared as written.
  if (!item || !current) return itemHref === currentHref ? 'page' : undefined
  if (item === current) return 'page'
  if (match === 'prefix' && item !== '/' && current.startsWith(`${item}/`)) {
    return 'true'
  }
  return undefined
}
