# wing(ui)

A UI component library for Vue 3 and Nuxt 4 apps. Besides basics such as buttons and form controls, it includes site headers and article page parts. It is built with Japanese sites in mind and ships Japanese and English text.

Component styles apply only inside the components and never change your app's own elements. Page-wide and article styles are separate files, so you load only the ones you need.

The full guide lives in [docs/](docs/). Run `pnpm dev` to browse it locally.

## Requirements

- Vue 3.5 or later
- A build setup that compiles `.vue` files and SCSS, such as Vite or Nuxt with `sass-embedded`

The library ships as `.vue` source files, not as a prebuilt bundle.

## Installation

```sh
pnpm add @wing-land/ui
pnpm add -D sass-embedded
```

## Nuxt

```ts
export default defineNuxtConfig({
  extends: ['@wing-land/ui/nuxt'],
  // Optional
  wingUi: {
    css: { base: true, prose: true },
    font: true,
    locale: 'ja',
    timeZone: 'Asia/Tokyo',
    colorMode: true,
  },
})
```

The Nuxt Layer registers the components, auto-imports composables such as `useToast()`, loads tokens.css, and uses NuxtLink for links. The `wingUi` options load base.css, prose.css, and the Inter web font, set the locale and time zone, and switch the dark theme.

## Vue

```ts
import { createApp } from 'vue'
import { createUi, en } from '@wing-land/ui'
import '@wing-land/ui/tokens.css'
import App from './App.vue'

createApp(App)
  .use(createUi({ locale: en }))
  .mount('#app')
```

Import components from `@wing-land/ui` in the files that use them.

## CSS files

| File                       | Required | What it does                                |
| -------------------------- | -------- | ------------------------------------------- |
| `@wing-land/ui/tokens.css` | Yes      | CSS variables for colors, spacing, and more |
| `@wing-land/ui/base.css`   | No       | Styles `body`, links, images, and focus     |
| `@wing-land/ui/prose.css`  | No       | Styles article text inside `.prose`         |
| `@wing-land/ui/fonts.css`  | No       | Loads Inter as a web font                   |

Shiki themes for syntax highlighting are at `@wing-land/ui/theme/shiki`.

## Development

Requires Node 24.22.1 and pnpm 10.34.6.

```sh
pnpm install
pnpm dev        # docs site
pnpm lint
pnpm typecheck
pnpm test       # component tests in Chromium
pnpm test:nuxt  # builds tests/nuxt-consumer to check the Nuxt Layer
pnpm build      # docs build
```

Demos are in `docs/demos/`, and the API table text is in each page's frontmatter.

`pnpm test` runs Vitest in browser mode. Before the first run, install the browser with `pnpm exec playwright install --only-shell chromium`. On Linux distributions that Playwright does not officially support (such as LMDE), add `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=debian12-x64`.

