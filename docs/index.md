---
title: Introduction
---

# <DocsWordmark />

wing(ui) is a UI component library for Vue 3 and Nuxt 4 apps. Besides basics such as buttons and form controls, it includes site headers and article page parts. It is built with Japanese sites in mind and ships Japanese and English text.

Component styles apply only inside the components and never change your app's own elements. Page-wide and article styles are separate files, so you load only the ones you need.

This page walks through adding the library to an app and rendering a component.

## Requirements

- Vue 3.5 or later
- A build setup that compiles `.vue` files and SCSS

The library ships as `.vue` source files, not as a prebuilt bundle. Component styles are written in SCSS, so your app needs an SCSS compiler such as `sass-embedded`. Nuxt and Vite compile SCSS once `sass-embedded` is installed.

## Installation

Add the library from npm, along with an SCSS compiler.

```sh
pnpm add @wing-land/ui
pnpm add -D sass-embedded
```

## Nuxt

Add the Nuxt Layer to `extends` in `nuxt.config.ts`.

```ts
export default defineNuxtConfig({
  extends: ['@wing-land/ui/nuxt'],
})
```

With only this, the Nuxt Layer does the following.

- Registers the components. Write `<UiButton>` and the like in a template; no imports needed.
- Auto-imports composables such as `useToast()`, `useConfirm()`, `useFormErrors()`, and `useUiConfig()`
- Loads tokens.css
- Sets the link component to NuxtLink
- When the app uses Nuxt Content, highlights code with the library's Shiki themes
  {.docs-checklist}

Turn on the other features with the `wingUi` options.

```ts
export default defineNuxtConfig({
  extends: ['@wing-land/ui/nuxt'],
  wingUi: {
    css: { base: true, prose: true },
    font: true,
    locale: 'ja',
    timeZone: 'Asia/Tokyo',
    colorMode: true,
  },
})
```

| Option      | What it does                                                                      | Default                 |
| ----------- | --------------------------------------------------------------------------------- | ----------------------- |
| `css.base`  | Loads base.css, which styles `body`, links, images, and more                      | `false`                 |
| `css.prose` | Loads prose.css, which styles article text inside `.prose`                        | `false`                 |
| `font`      | Loads Inter as a web font                                                         | `false`                 |
| `locale`    | Sets the text to `'ja'` or `'en'`. Also sets `<html lang>` unless the app sets it | `'en'`                  |
| `timeZone`  | Time zone used to display dates                                                   | The runtime's time zone |
| `colorMode` | Applies the dark theme from the first paint, following the saved theme or the OS  | `false`                 |

The Nuxt Layer does not do the following.

- Change the styles of your app's own elements, such as `body` and links (unless `css.base` is on)
- Override individual text or set a date format. Pass these from an app plugin ([Config](/config#nuxt)).
- Highlight code outside Nuxt Content. Import the Shiki themes from `@wing-land/ui/theme/shiki` ([Design](/design#code-colors)).
  {.docs-checklist .is-no}

## Vue

In a Vite project, `@vitejs/plugin-vue` and `sass-embedded` are all you need to build.

Register `createUi()` when you create the app, and load tokens.css. Import components in the files that use them.

```ts
// main.ts
import { createApp } from 'vue'
import { createUi, en } from '@wing-land/ui'
import '@wing-land/ui/tokens.css'
import App from './App.vue'

createApp(App)
  .use(createUi({ locale: en, timeZone: 'Asia/Tokyo' }))
  .mount('#app')
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { UiButton } from '@wing-land/ui'
</script>

<template>
  <UiButton variant="solid">Save</UiButton>
</template>
```

To match the page and article styles to the library too, load base.css and prose.css in addition to tokens.css. To use Inter as a web font, also load fonts.css.

```ts
import '@wing-land/ui/tokens.css'
import '@wing-land/ui/fonts.css'
import '@wing-land/ui/base.css'
import '@wing-land/ui/prose.css'
```

## Dark theme

The dark colors apply when `<html>` has the `dark` class or `data-theme="dark"`. In Nuxt, turning on `wingUi.colorMode` makes the theme follow the saved choice or the OS. In Vue, your app decides the theme and sets it on `<html>`. See [Design](/design#light-and-dark) for how to switch.

## Next steps

- [Components](/components/): the look, usage, and props of every component
- [Design](/design): which CSS files to load, tokens, and colors
- [Config](/config): locale, link component, date format, and other settings
