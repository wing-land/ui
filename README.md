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

Use the Node and pnpm versions pinned in `.node-version` and `packageManager` in `package.json`.

```sh
pnpm install
pnpm exec playwright install --only-shell chromium  # once, for pnpm test
```

| Command          | What it does                                           |
| ---------------- | ------------------------------------------------------ |
| `pnpm dev`       | Serves the docs site locally                           |
| `pnpm build`     | Builds the docs site                                   |
| `pnpm lint`      | Runs ESLint and Stylelint                              |
| `pnpm format`    | Formats files with Prettier                            |
| `pnpm typecheck` | Type-checks the library and the Nuxt test app          |
| `pnpm test`      | Runs component tests in Chromium (Vitest browser mode) |
| `pnpm test:vue`  | Builds `tests/vue-consumer` to check Vue usage         |
| `pnpm test:nuxt` | Builds `tests/nuxt-consumer` to check the Nuxt Layer   |

Demos live in `docs/demos/`. The API table text for each component is in its docs page's frontmatter.

If Playwright cannot install Chromium on your Linux distribution, see Playwright's [system requirements](https://playwright.dev/docs/intro#system-requirements).
