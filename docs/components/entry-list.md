---
api:
  UiEntryList:
    props:
      items: 'Items. `UiEntryListItem` is `{ href, title, description?, date?, dateLabel?, key?, external? }`. `key` defaults to `href`. With `external`, the item is shown and announced as an external link.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      headingLevel: 'Heading level of item titles.'
      compact: 'Tightens spacing and places the date above the title.'
      columns: '`2` lays items out in two columns. Falls back to one column when a column would be narrower than 260px.'
    slots:
      title: 'Title content.'
      badge: 'Small label placed after the title.'
      meta: 'Extra details placed below the description.'
---

# Entry List

## UiEntryList

A list of links to posts or updates, separated by thin lines. Each item shows a date, title, and description.

<DocsDemo name="UiEntryList" />

### Code

<<< ../demos/UiEntryList.vue{vue}

### Usage

Dates are optional, so it also works for lists without dates. Combine `compact` and `columns` to show something like a list of categories in two tight columns. Add a status after the title or details below the description with the `badge` and `meta` slots.

The layout follows the list's own width, not the screen's, so it also fits side panels. At 560px or narrower, the date moves above the title. The date column is at least `--ui-entry-list-date-width` (`6em` by default) wide and grows for longer dates, so set the variable to keep long dates aligned. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

Renders a `<ul>` list, and each item is a single link. Titles are headings, so choose `headingLevel` to fit the page structure. Dates use the `<time>` element, and external links get "external site" text.

### API

<DocsApi name="UiEntryList" />
