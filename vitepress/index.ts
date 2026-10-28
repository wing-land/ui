// An ambient module declaration cannot be imported, so consumers' type checks pick it up from here.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./shims.d.ts" />
import type { Theme } from 'vitepress'
import { createUi } from '../app/lib/config'
import DocsLayout from './DocsLayout.vue'
import '../app/assets/css/tokens.css'
import '../app/assets/css/fonts.css'
import '../app/assets/css/base.css'
import '../app/assets/css/prose.css'
import './style.css'

export type { DocsLabels, DocsNavItem, DocsSidebarGroup, DocsThemeConfig } from './types'
export { DocsLayout }

const theme: Theme = {
  Layout: DocsLayout,
  enhanceApp({ app }) {
    // DocsLayout sets the locale from the page's `lang`, so each VitePress locale gets its own text.
    app.use(createUi())
  },
}

export default theme
