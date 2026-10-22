import { fileURLToPath } from 'node:url'
import { defineNuxtModule, installModule } from 'nuxt/kit'
import type { NuxtModule } from 'nuxt/schema'

export interface ModuleOptions {
  /** Loads base.css (body, links, images) and prose.css (article text). */
  css: { base: boolean; prose: boolean }
  /** Loads Inter, the first font in `--font-body`, as a web font. */
  font: boolean
  /** Message language. Also sets `<html lang>` unless the app sets it. */
  locale?: 'ja' | 'en'
  /** Time zone for dates, such as `Asia/Tokyo`. */
  timeZone?: string
  /** Applies the saved or OS color theme before the first paint, via @nuxtjs/color-mode. */
  colorMode: boolean
}

const cssFile = (name: string) =>
  fileURLToPath(new URL(`../app/assets/css/${name}.css`, import.meta.url))

export default defineNuxtModule<ModuleOptions>({
  meta: { name: '@wing-land/ui', configKey: 'wingUi' },
  defaults: { css: { base: false, prose: false }, font: false, colorMode: false },
  async setup(options, nuxt) {
    const files = [
      options.font && cssFile('fonts'),
      options.css.base && cssFile('base'),
      options.css.prose && cssFile('prose'),
    ].filter((file) => typeof file === 'string')
    // Right after tokens.css, so the app's own CSS still loads later and wins.
    const tokens = nuxt.options.css.indexOf(cssFile('tokens'))
    nuxt.options.css.splice(tokens + 1, 0, ...files)

    nuxt.options.runtimeConfig.public.wingUi = {
      locale: options.locale ?? '',
      timeZone: options.timeZone ?? '',
    }
    if (options.locale) {
      const head = nuxt.options.app.head
      head.htmlAttrs = { lang: options.locale, ...head.htmlAttrs }
    }

    if (options.colorMode) {
      // Its own option types do not match installModule's generic NuxtModule type.
      const colorMode = (await import('@nuxtjs/color-mode')).default as NuxtModule
      // An empty suffix gives `<html class="dark">`, which tokens.css reads.
      await installModule(colorMode, { classSuffix: '', storageKey: 'wing-ui-color-mode' })
    }
  },
})
