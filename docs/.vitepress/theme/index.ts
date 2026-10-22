import type { Theme } from 'vitepress'
import { createUi } from '../../../app/lib/config'
import { en } from '../../../app/lib/messages'
import Layout from './DocsLayout.vue'
import DocsApi from './DocsApi.vue'
import DocsDemo from './DocsDemo.vue'
import DocsFigure from './DocsFigure.vue'
import DocsMessages from './DocsMessages.vue'
import DocsTokens from './DocsTokens.vue'
import DocsWordmark from './DocsWordmark.vue'
import '../../../app/assets/css/tokens.css'
import '../../../app/assets/css/fonts.css'
import '../../../app/assets/css/base.css'
import '../../../app/assets/css/prose.css'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(createUi({ locale: en }))
    app.component('DocsApi', DocsApi)
    app.component('DocsDemo', DocsDemo)
    app.component('DocsFigure', DocsFigure)
    app.component('DocsMessages', DocsMessages)
    app.component('DocsTokens', DocsTokens)
    app.component('DocsWordmark', DocsWordmark)
  },
} satisfies Theme
