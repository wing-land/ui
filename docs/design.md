# Design

The look of wing(ui) comes from CSS variables (tokens) and three CSS files. This page covers what each file does, the kinds of tokens, and the color rules.

## Stylesheets

<DocsFigure name="files" />

- tokens.css (required): only CSS variables for colors, spacing, corner radii, and so on. Load it whenever you use the components.
- base.css (optional): styles `body`, links, images, and the focus outline.
- prose.css (optional): styles headings, paragraphs, lists, tables, and more inside `.prose` for articles.

Components carry the base styles their own elements need, so they look the same without base.css. Use base.css when you want your app's own `body` and links to match the library as well.

base.css and prose.css use the variables in tokens.css. Load tokens.css whenever you load either of them.

Choose by use case:

- Components only: tokens.css
- Matching the whole page: tokens.css and base.css
- Publishing articles: tokens.css, base.css, and prose.css

The Nuxt Layer loads tokens.css automatically, and the `wingUi.css` option loads base.css and prose.css. See the [Introduction](/) for how to load them.

## Tokens

Tokens are the CSS variables that tokens.css defines on `:root`. Values an app is likely to change, such as colors, corner radii, and the focus outline, are set with tokens inside the components too.

The color tokens are covered in [Colors](#colors). The other tokens are:

<DocsTokens kind="other" />

### Changing values

To change a token, redefine the variable with the same name in your own CSS. Load it after tokens.css.

```css
:root {
  --color-accent: #2f5f86;
  --radius-control: 6px;
}
:root.dark,
:root[data-theme='dark'] {
  --color-accent: #93b8d8;
}
```

The dark colors are defined on `:root.dark` and `:root[data-theme='dark']`. When you change a color, redefine its dark value with the same selectors. Changing only `:root` leaves the original value in the dark theme.

## Colors

### Color roles

<DocsFigure name="color-roles" />

Color variables are named for their use, not for the color itself. For example, `--color-accent` is currently a wine color, but the name means "the color for emphasis". Changing the value to blue does not change where it is used.

<DocsTokens kind="base" />

Keep the accent color to places that should draw the eye, such as the selected item, focus, and primary buttons. Do not use it for large areas such as the page background.

### Status colors

Notices, success, warnings, and errors each pair a text and icon color with a light background. UiAlert, UiBadge, toasts, and others use these pairs as `tone`.

<DocsTokens kind="status" />

Some people find colors hard to tell apart, so never show a status by color alone. Show an icon or text with it, as UiAlert and UiBadge do.

### Light and dark

<DocsFigure name="theme-switch" />

tokens.css has two sets of values, light and dark. The dark values apply only when `<html>` has the `dark` class or `data-theme="dark"`.

tokens.css does not follow the OS setting (`prefers-color-scheme`) on its own. Choosing the theme and setting it on `<html>` is up to the app.

In Nuxt, turning on `wingUi.colorMode` makes the Nuxt Layer do this with [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/). It reads the saved theme or the OS setting and adds the `dark` class to `<html>` before the first paint. Bind UiThemePicker to `preference` from `useColorMode()`.

```vue
<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <UiThemePicker v-model="colorMode.preference" />
</template>
```

In Vue, UiThemePicker only reports whether system, light, or dark was chosen. Checking the OS setting when "system" is chosen is also up to the app. These docs switch the theme with this function:

```ts
function applyTheme(mode: 'system' | 'light' | 'dark') {
  const dark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
}
```

The dark values come with `color-scheme: dark`, so scrollbars and default form controls also follow the theme.

### Code colors

<DocsTokens kind="code" />

Light and dark Shiki themes are provided for syntax highlighting. Pass `syntaxThemes` from `@wing-land/ui/theme/shiki` to your Shiki or Nuxt Content settings. The background, text, and comment colors match the `--color-code-*` values above.

```ts
import { syntaxThemes } from '@wing-land/ui/theme/shiki'

// For Shiki's codeToHtml() and similar
const themes = { light: syntaxThemes.default, dark: syntaxThemes.dark }
```

The Nuxt Layer sets these themes for Nuxt Content automatically. See the [Introduction](/#nuxt).

## Typography

Latin text uses Inter, Japanese text uses the device's system fonts (Hiragino Kaku Gothic, Noto Sans JP, and others), and code uses a monospace font.

Inter can be loaded as a web font: turn on `wingUi.font` in Nuxt, or load `@wing-land/ui/fonts.css` in Vue. Only the Latin characters are loaded. Without it, Inter is used if the device has it; otherwise the fonts listed after Inter in `--font-body` are used.

Body text is 16px with a line height of 1.8. To keep lines from getting too long, body text is at most `--width-prose` (40em) wide.

For articles, prose.css sets the size and spacing of headings, paragraphs, lists, quotes, tables, images, and code inside `.prose`, tuned for Japanese text. For example, paragraphs are 1.5em apart, and lines break so that punctuation and small kana such as 「ゃ」 never start a line.

When you place components or your own parts in an article, add the `ui-not-prose` class to them. prose.css does not apply inside it, so article styles never change how those parts look.
