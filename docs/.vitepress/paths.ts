export const docsBase = '/'

export function docsUrl(path: string) {
  return `${docsBase}${path.replace(/^\/+/, '')}`
}
