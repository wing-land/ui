// Plain JS: VitePress loads its config in Node, which does not strip types inside node_modules.
import { syntaxThemes } from '../theme/shiki.js'
import { searchIndexOptions } from './search.js'

const packageName = '@wing-land/ui'

/** @param {string} storageKey */
function colorModeScript(storageKey) {
  const key = JSON.stringify(storageKey)
  const dark = `matchMedia('(prefers-color-scheme: dark)').matches`
  return `try{const mode=localStorage.getItem(${key})||'system';document.documentElement.classList.toggle('dark',mode==='dark'||(mode==='system'&&${dark}))}catch{document.documentElement.classList.toggle('dark',${dark})}`
}

/** @type {typeof import('./config').createThemeConfig} */
export function createThemeConfig({ colorModeStorageKey = 'wing-ui-color-mode' } = {}) {
  return {
    // The theme has its own light and dark switch, and the inline script applies it before the first paint.
    appearance: false,
    // Hash links stop headings where style.css `scroll-margin-top` puts them, under the sticky header.
    scrollOffset: 80,
    head: [['script', {}, colorModeScript(colorModeStorageKey)]],
    markdown: {
      theme: { light: syntaxThemes.default, dark: syntaxThemes.dark },
      headers: true,
      codeCopyButtonTitle: 'Copy code',
    },
    vite: {
      // VitePress 1.x bundles Vite 5, whose Sass default is the deprecated legacy JS API.
      css: {
        preprocessorOptions: {
          scss: { api: 'modern-compiler' },
          sass: { api: 'modern-compiler' },
        },
      },
      // The package ships .vue and .ts source, so Vite must compile it instead of loading it as is.
      optimizeDeps: { exclude: [packageName] },
      ssr: { noExternal: [packageName] },
    },
    themeConfig: {
      colorModeStorageKey,
      // DocsSearch reads the index VitePress builds for the local provider.
      search: { provider: 'local', options: { miniSearch: { options: searchIndexOptions } } },
    },
  }
}

export default createThemeConfig()
