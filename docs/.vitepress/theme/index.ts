import type { Theme } from 'vitepress'
import { h } from 'vue'
import wingTheme, { DocsLayout } from '../../../vitepress'
import DocsApi from './DocsApi.vue'
import DocsDemo from './DocsDemo.vue'
import DocsFigure from './DocsFigure.vue'
import DocsMessages from './DocsMessages.vue'
import DocsThemeLabels from './DocsThemeLabels.vue'
import DocsTokens from './DocsTokens.vue'
import DocsWordmark from './DocsWordmark.vue'
import './style.css'

export default {
  extends: wingTheme,
  Layout: () => h(DocsLayout, null, { brand: () => h(DocsWordmark) }),
  enhanceApp({ app }) {
    app.component('DocsApi', DocsApi)
    app.component('DocsDemo', DocsDemo)
    app.component('DocsFigure', DocsFigure)
    app.component('DocsMessages', DocsMessages)
    app.component('DocsThemeLabels', DocsThemeLabels)
    app.component('DocsTokens', DocsTokens)
    app.component('DocsWordmark', DocsWordmark)
  },
} satisfies Theme
