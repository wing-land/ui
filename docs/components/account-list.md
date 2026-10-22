---
api:
  UiAccountList:
    props:
      items: 'Accounts. Each item is `{ href, label, iconSrc, id?, accessibleLabel? }`. `id` defaults to `href`.'
      variant: 'Layout. `columns` flows into columns based on the width, `spacious` uses two columns with more space, and `tiles` frames each link.'
      columns: 'Number of columns for `tiles`, `1` or `2`. `2` falls back to one column when a column would be narrower than 220px.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
---

# Account List

## UiAccountList

A list of links to accounts on other services, each with an icon. Use it for contact details on a profile page or a list of social accounts.

<DocsDemo name="UiAccountList" />

### Code

<<< ../demos/UiAccountList.vue{vue}

### Usage

Choose the layout with `variant`: `regular` is one column, `columns` flows into columns based on the width, `spacious` uses two columns with more space, and `tiles` frames each link as a tile. With `tiles`, choose one or two columns with `columns`. The icon fills the shape of the `iconSrc` image with the text color, so pass a single-color SVG. The layout follows the list's own width: `spacious` falls back to one column when a column would be narrower than 260px. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

Renders a `<ul>` list, and the icons are hidden from screen readers. By default each link is named by its visible label. `accessibleLabel` replaces it, so use it only to add context, and keep the label in it, such as "GitHub profile" for the label "GitHub".

### API

<DocsApi name="UiAccountList" />
