# Config

Text, the link component, the date format, and other settings can be set once for the whole app, so you do not pass them to each component as props. This page covers how to pass settings and what each one does.

## Passing settings

<DocsFigure name="config-layers" />

Settings can be passed in three places. Inner settings take priority, and anything not passed is inherited from the outer level.

- `createUi()`: settings for the whole app, registered as a Vue plugin.
- `provideUiConfig()` and UiConfigProvider: change settings for part of the screen. Call `provideUiConfig()` inside a component's `setup`; wrap an area of a template with [UiConfigProvider](./components/config-provider.md#uiconfigprovider).
- Component props: some components, such as those with `linkComponent`, also take a setting's value as a prop. A prop takes priority over the settings.

### Vue

```ts
import { createApp } from 'vue'
import { createUi, ja } from '@wing-land/ui'

createApp(App)
  .use(createUi({ locale: ja, timeZone: 'Asia/Tokyo' }))
  .mount('#app')
```

### Nuxt

The Nuxt Layer already registers `createUi()` with NuxtLink as the link component. Set the locale and time zone with `wingUi` in `nuxt.config.ts`.

```ts
export default defineNuxtConfig({
  extends: ['@wing-land/ui/nuxt'],
  wingUi: { locale: 'ja', timeZone: 'Asia/Tokyo' },
})
```

For settings passed as functions or objects, such as text overrides and the date format, register `createUi()` again in an app plugin. Anything you leave out is inherited from the Nuxt Layer, so the link component and locale stay as they are.

```ts
// app/plugins/ui.ts
import { createUi } from '@wing-land/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createUi({ messages: { common: { retry: 'Try again' } } }))
})
```

Settings passed with `provideUiConfig()` in `app.vue` do not reach the error page (`error.vue`), because the error page is shown in place of `app.vue`.

### Switching settings

`provideUiConfig()` also accepts a ref or a getter. When the value changes, the components update.

```ts
import { shallowRef } from 'vue'
import { ja, provideUiConfig } from '@wing-land/ui'

const locale = shallowRef(ja)
provideUiConfig(() => ({ locale: locale.value }))
```

## Settings

| Setting           | Type                              | Default                                |
| ----------------- | --------------------------------- | -------------------------------------- |
| locale            | UiLocale (`en` and `ja` included) | `en`                                   |
| messages          | UiMessagesOverride                | None                                   |
| linkComponent     | string \| Component               | `'a'` (`NuxtLink` with the Nuxt Layer) |
| isExternalLink    | (href: string) => boolean         | `isExternalHref`                       |
| formatDate        | UiDateFormatter                   | `formatDotDate`                        |
| timeZone          | string                            | The runtime's time zone                |
| requiredIndicator | `'text'` \| `'asterisk'`          | `'text'`                               |

## Locale and text

A locale is the set of text that components show or announce. `en` and `ja` are included. Without a setting, `en` is used.

To change only part of the text, pass just the text to change in `messages`.

```ts
import { ja, provideUiConfig } from '@wing-land/ui'

provideUiConfig({
  locale: ja,
  messages: {
    article: { allPosts: 'すべての記事' },
    common: { retry: 'もう一度試す' },
  },
})
```

<DocsFigure name="locale-switch" />

`messages` overrides belong to a locale. When nested settings keep the same locale, the outer overrides carry over to the inner level. When the inner level switches the locale, the outer overrides are dropped and the new locale's text is used.

For another language, create a `UiLocale`. Layering it on `en` with `mergeMessages()` shows untranslated text in English.

```ts
import { en, mergeMessages, type UiLocale } from '@wing-land/ui'

const fr: UiLocale = {
  code: 'fr',
  messages: mergeMessages(en.messages, { common: { close: 'Fermer' } }),
}
```

### All text

The `en` and `ja` text. Text defined as a function shows the result of calling it with example arguments.

<DocsMessages />

## Link component

`linkComponent` is the component used when components render a link. The default is the `<a>` element; with the Nuxt Layer it is NuxtLink.

Components pass `href` to the link component. NuxtLink works as is. vue-router's RouterLink takes `to`, so provide a component that passes `href` to `to`.

```ts
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

export const HrefLink = defineComponent({
  props: { href: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () => h(RouterLink, { ...attrs, to: props.href }, slots)
  },
})
```

`isExternalLink` is the function that decides whether a link goes to an external site. The default `isExternalHref` treats links that start with `http://`, `https://`, or `//` as external. Links to external sites get an arrow icon and "(external site)" text for screen readers.

## Dates

`formatDate` is the function UiDate and other components use to display dates. The default `formatDotDate` shows dates as `2026.10.20`.

<DocsFigure name="date" />

A date-only string such as `2026-10-20` is treated as a calendar date and never shifted by time zone. A year-month string such as `2026-10` or a year such as `2026` is also a calendar date and is shown without the missing parts, as `2026.10` or `2026`. A value with a time gets its date in the `timeZone` time zone.

Without `timeZone`, the runtime's time zone is used. Set `timeZone` when you render dates with SSR; otherwise the server and the browser can show different dates.

For a locale-aware format, use `createIntlDateFormatter()`. It takes the same options as `Intl.DateTimeFormat`.

```ts
import { createIntlDateFormatter, en, provideUiConfig } from '@wing-land/ui'

// October 20, 2026
provideUiConfig({ locale: en, formatDate: createIntlDateFormatter({ dateStyle: 'long' }) })
```

You can also pass your own function. It is called as `formatDate(value, context)`, where `context` holds `locale`, `timeZone`, and `kind`. `kind` is the type of date, such as `published` or `updated`.

## Required indicator

`requiredIndicator` is the mark UiField adds to required fields. `'text'` shows the locale's "Required" text and `'asterisk'` shows `*`. Pass `requiredIndicator` to a UiField to change it for that field only.

## Composables and functions

Along with the settings, these composables and functions are exported.

| Name                                | Use                                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `useUiConfig()`                     | Returns the current settings as `ComputedRef<UiConfig>`                                                                |
| `useClipboard()`                    | Copies with `copy(text)` and returns `status` (`idle`, `copied`, or `error`). `copied` resets after 2 seconds          |
| `useDismiss()`                      | Closes a panel on an outside click, a focus move, or Esc. Closing with Esc returns focus to the trigger                |
| `formatDotDate`                     | The default date format                                                                                                |
| `createIntlDateFormatter()`         | Creates a date format with `Intl.DateTimeFormat`                                                                       |
| `toDateTimeAttribute()`             | Creates the string for a `<time>` element's `datetime` attribute                                                       |
| `formatRelativeTime()`              | Creates relative time text such as "5 minutes ago"                                                                     |
| `isExternalHref()`                  | The default external link check                                                                                        |
| `mergeMessages()`                   | Layers overrides on a locale's text                                                                                    |
| `currentValue()`, `normalizeHref()` | Decide whether a navigation item is the current page                                                                   |
| `useFieldContext()`                 | In your own input, returns the enclosing UiField's ids for the input and description, and its error and required state |

Toasts are covered on the [useToast()](./components/toaster.md) page, confirmation dialogs on [useConfirm()](./components/dialog.md), and form errors on [useFormErrors()](./components/field.md).

Use `useDismiss()` when you build your own panel. Clicks inside the elements passed as `inside` do not close it.

```ts
import { shallowRef } from 'vue'
import { useDismiss } from '@wing-land/ui'

const open = shallowRef(false)
const panel = shallowRef<HTMLElement | null>(null)
const trigger = shallowRef<HTMLButtonElement | null>(null)
useDismiss({ open, inside: [panel, trigger], returnFocusTo: trigger })
```
