---
api:
  UiSidebarNav:
    props:
      groups: 'Groups. `{ label, items: { href, label }[] }`.'
      currentHref: 'URL of the current page.'
      navigationLabel: 'Accessible name of the `<nav>`. Defaults to the locale text.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      match: 'With `prefix`, an item is also treated as current while a page under it is shown.'
---

# Sidebar Nav

## UiSidebarNav

Navigation for a sidebar that lists pages in groups under headings. Use it to move between pages of documentation or settings.

<DocsDemo name="UiSidebarNav" />

### Code

<<< ../demos/UiSidebarNav.vue{vue}

### Usage

Pass the current page as `currentHref`. To also mark an item as current on the pages under it, set `match="prefix"`. On narrow screens, put it inside a [UiDrawer](./dialog.md#uidrawer).

### Accessibility

Renders a `<nav>` landmark with an `<h2>` for each group heading. The current page's item gets `aria-current="page"`, and with `match="prefix"`, an item gets `aria-current="true"` while a page under it is shown.

### API

<DocsApi name="UiSidebarNav" />
