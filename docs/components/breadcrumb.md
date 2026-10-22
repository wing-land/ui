---
api:
  UiBreadcrumb:
    props:
      items: 'Levels. `{ label, href? }`. The last item is never a link.'
      navigationLabel: 'Accessible name of the `<nav>`. Defaults to the locale text.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
---

# Breadcrumb

## UiBreadcrumb

A breadcrumb trail showing the levels above the current page. On sites with deep hierarchies, it shows the way back up.

<DocsDemo name="UiBreadcrumb" />

### Code

<<< ../demos/UiBreadcrumb.vue{vue}

### Usage

Pass the levels to `items` from the top down, ending with the current page. The last item is not a link even if it has `href`.

### Accessibility

Renders an `<ol>` inside a `<nav>`. The last item is treated as the current page and gets `aria-current="page"`. The separators between items are icons hidden from screen readers.

### API

<DocsApi name="UiBreadcrumb" />
