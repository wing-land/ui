---
api:
  UiConfigProvider:
    props:
      config: 'Config passed to descendants. Items you leave out are inherited from the parent config.'
    slots:
      default: 'The area the config applies to.'
---

# Config Provider

## UiConfigProvider

Passes config such as the locale, the component used for links, and the date format to the components inside it. Use it to change the config for part of a page.

<DocsDemo name="UiConfigProvider" />

### Code

<<< ../demos/UiConfigProvider.vue{vue}

### Usage

Pass the config for the whole app to the `createUi()` plugin. UiConfigProvider wraps the area where part of that config is overridden. To provide config without adding a component, use `provideUiConfig()`. See [Config](../config.md) for the available items.

### Accessibility

Renders no element of its own, only the content of its default slot.

### API

<DocsApi name="UiConfigProvider" />
