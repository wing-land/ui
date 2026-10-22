import { fileURLToPath } from 'node:url'
import { syntaxThemes } from './theme/shiki.js'

// A variable, because `content` is only in the config types when @nuxt/content is installed.
const contentConfig = { content: { build: { markdown: { highlight: { theme: syntaxThemes } } } } }

// Only the tokens are global by default. The `wingUi` options in the app's config add the rest.
export default defineNuxtConfig({
  modules: [fileURLToPath(new URL('./nuxt/module', import.meta.url))],
  css: [fileURLToPath(new URL('./app/assets/css/tokens.css', import.meta.url))],
  imports: {
    presets: [
      {
        from: '@wing-land/ui',
        // Generic names such as useClipboard (also in VueUse) stay explicit imports.
        imports: [
          'provideUiConfig',
          'useConfirm',
          'useFieldContext',
          'useFormErrors',
          'useToast',
          'useUiConfig',
        ],
      },
    ],
  },
  // Read by @nuxt/content when the app uses it. The app's own highlight settings win.
  ...contentConfig,
})
