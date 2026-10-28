# VitePress

The VitePress theme builds a docs site like this one from the library's components. It has a header, a sidebar, a page outline, local search, and a light and dark switch. This page covers how to set it up and what you can change.

## Setup

Add VitePress along with the library and an SCSS compiler.

```sh
pnpm add @wing-land/ui
pnpm add -D vitepress sass-embedded
```

Extend the theme config in `.vitepress/config.ts`. Use `defineConfigWithTheme()` so that `themeConfig` is typed.

```ts
// .vitepress/config.ts
import { defineConfigWithTheme } from 'vitepress'
import wingConfig, { type DocsThemeConfig } from '@wing-land/ui/vitepress/config'

export default defineConfigWithTheme<DocsThemeConfig>({
  extends: wingConfig,
  lang: 'ja',
  title: 'My docs',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/' },
          { text: 'Install', link: '/guide/install' },
        ],
      },
    ],
    footerLinks: [{ text: 'GitHub', link: 'https://github.com/...' }],
  },
})
```

Use the theme in `.vitepress/theme/index.ts`.

```ts
// .vitepress/theme/index.ts
export { default } from '@wing-land/ui/vitepress'
```

The config does the following.

- Turns on local search, with an index that splits Japanese text into words
- Highlights code with the library's Shiki themes
- Applies the saved theme or the OS theme before the first paint
- Lets Vite compile the library's `.vue` source, in both the dev server and the build
  {.docs-checklist}

The theme does the following.

- Loads tokens.css, fonts.css, base.css, and prose.css
- Registers `createUi()` and sets the locale from the page's `lang`
- Styles the Markdown output: headings, lists, tables, code blocks, and custom containers such as `::: tip`
  {.docs-checklist}

The theme does not replace VitePress's default theme feature for feature.

- A different sidebar for each path. `sidebar` is a single list shown on every page.
- Edit links, last updated dates, and previous and next page links
- A language menu for VitePress locales. Each locale still gets its own text from its `lang`.
  {.docs-checklist .is-no}

## Theme config

These are the `themeConfig` options the theme reads.

| Option                | Type                                  | Default                                    |
| --------------------- | ------------------------------------- | ------------------------------------------ |
| `nav`                 | `{ text, link }[]`                    | `[]`                                       |
| `sidebar`             | `{ text, items: { text, link }[] }[]` | `[]`                                       |
| `footerLinks`         | `{ text, link }[]`                    | `[]`                                       |
| `labels`              | `Partial<DocsLabels>`                 | The text for the site `lang`               |
| `colorModeStorageKey` | string                                | Set by `createThemeConfig()`               |
| `search`              | VitePress local search options        | `provider: 'local'` with the theme's index |

Links in `nav`, `sidebar`, and internal `footerLinks` are paths without the `base`; the theme adds it. A nav item is shown as current when the page path is its link or starts with it, so `/guide/` stays current on `/guide/install`. Footer links to external sites get the external link mark.

On a phone-sized screen, the header nav and the sidebar are hidden, and the sidebar opens in a drawer from the menu button.

## Text

The theme text follows the site `lang`: Japanese for `ja` and `ja-*`, English otherwise. The components' own text, such as "Skip to content" and the theme switch, follows the same `lang`.

To change part of the text, pass only the keys to change in `labels`. In the text, `{title}` becomes the site or heading title and `{count}` becomes the number of results.

```ts
export default defineConfigWithTheme<DocsThemeConfig>({
  extends: wingConfig,
  lang: 'ja',
  themeConfig: {
    labels: { searchPlaceholder: 'サイト内検索' },
  },
})
```

The copy button on code blocks is named by VitePress's `markdown.codeCopyButtonTitle`. The config sets it to `'Copy code'`; set it yourself on a Japanese site.

```ts
export default defineConfigWithTheme<DocsThemeConfig>({
  extends: wingConfig,
  lang: 'ja',
  markdown: { codeCopyButtonTitle: 'コードをコピー' },
})
```

### All text

<DocsThemeLabels />

## Logo

The header and the footer show the site `title`. To show a logo instead, pass a `brand` slot to `DocsLayout`. The header link to the home page keeps the `home` text as its name, so the logo can be decorative.

```ts
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import { h } from 'vue'
import wingTheme, { DocsLayout } from '@wing-land/ui/vitepress'
import Logo from './Logo.vue'

export default {
  extends: wingTheme,
  Layout: () => h(DocsLayout, null, { brand: () => h(Logo) }),
} satisfies Theme
```

## Adding to the theme

Extend the theme to register your own components or pass more settings. VitePress runs the theme's `enhanceApp` before yours.

```ts
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import { createUi } from '@wing-land/ui'
import wingTheme from '@wing-land/ui/vitepress'
import ApiTable from './ApiTable.vue'
import './custom.css'

export default {
  extends: wingTheme,
  enhanceApp({ app }) {
    app.use(createUi({ timeZone: 'Asia/Tokyo' }))
    app.component('ApiTable', ApiTable)
  },
} satisfies Theme
```

Settings passed to `createUi()` here reach every page, except `locale`: the theme sets the locale from `lang` on each page. To change the components' text, pass `messages` ([Config](/config#locale-and-text)).

## Dark theme

The theme switch saves the choice in localStorage, and the config's script applies it before the first paint. The default key is `wing-ui-color-mode`, the same key the Nuxt Layer uses. To use another key, extend `createThemeConfig()` instead of the default export.

```ts
import { defineConfigWithTheme } from 'vitepress'
import { createThemeConfig, type DocsThemeConfig } from '@wing-land/ui/vitepress/config'

export default defineConfigWithTheme<DocsThemeConfig>({
  extends: createThemeConfig({ colorModeStorageKey: 'my-docs-theme' }),
})
```

## Page styles

The page text is rendered inside `.docs-content`, which also has the `prose` class from prose.css. Add your own rules under `.docs-content` to change the article styles.

The theme also has two classes for Markdown pages.

### Checklists

`.docs-checklist` turns a list into one with check marks. Add `.is-no` as well for cross marks. In Markdown, write the classes on the line after the last item, indented like the item text.

```md
- Works offline
- Ships Japanese text
  {.docs-checklist}

- Works without JavaScript
  {.docs-checklist .is-no}
```

### Demos

The theme's rules for headings, links, lists, and tables skip elements inside `.docs-demo`. Wrap live component demos in it so they look the same as in an app.

```md
<div class="docs-demo">
  <MyButton>Save</MyButton>
</div>
```
