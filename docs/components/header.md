---
api:
  UiSiteHeader:
    props:
      navigation: 'Navigation items. `{ href, label }`.'
      brandHref: 'Link target of the site name. When omitted, the site name is plain text.'
      brandLabel: 'Accessible name of the site name link. Used only with `brandHref`.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      navigationLabel: 'Accessible name of the `<nav>`. Defaults to the locale text.'
      skipTarget: 'Target of the skip link.'
      skipLabel: 'Text of the skip link. Defaults to the locale text.'
      headerId: '`id` of the `<header>` element.'
      activeHref: 'URL of the current page.'
      match: 'With `prefix`, an item is also treated as current while a page under it is shown.'
      collapsible: 'Collapses the navigation behind a menu button at 600px wide or less. Stays expanded until JavaScript runs.'
      menuLabel: 'Accessible name of the menu button. Defaults to the locale text.'
    slots:
      brand: 'Content of the site name.'
      actions: 'Actions placed to the right of the navigation.'
      user: 'User display placed at the far right.'
  UiAppHeader:
    props:
      navigation: 'Navigation items. `{ href, label }`. Placed on the right, and scrolls horizontally when space runs out.'
      activeHref: 'URL of the current page.'
      match: 'With `prefix`, an item is also treated as current while a page under it is shown.'
      navigationLabel: 'Accessible name of the `<nav>`. Defaults to the locale text.'
      brandHref: 'Link target of the site name. When set, the `brand` slot is wrapped in a link.'
      brandLabel: 'Accessible name of the site name link.'
      menu: 'Shows a menu button at the start. Use it to open a list of pages in a drawer.'
      menuLabel: 'Accessible name of the menu button. Defaults to the locale text.'
      skipTarget: 'Target of the skip link, such as `#main`. When omitted, no skip link is shown.'
      skipLabel: 'Text of the skip link. Defaults to the locale text.'
      contained: 'Aligns the content width with UiContainer. The background and bottom line still span the full width.'
      sticky: 'Sticks the header to the top of the viewport.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
    events:
      menu: 'Emitted when the menu button is pressed.'
    slots:
      brand: 'Site or app name.'
      default: 'Content placed in the space after the site name, such as a search field or connection status.'
      actions: 'Actions placed at the far right.'
---

# Header

Headers placed at the top of the page. Use UiSiteHeader for content sites and UiAppHeader for apps and documentation.

## UiSiteHeader

A header with the site name, the main navigation, and a skip link. On narrow screens, the navigation can collapse behind a menu button.

<DocsDemo name="UiSiteHeader" />

### Code

<<< ../demos/UiSiteHeader.vue{vue}

### Usage

Pass the current page as `activeHref`. To also mark an item as current on the pages under it, set `match="prefix"`. With `collapsible`, the navigation collapses at 600px wide or less. It stays expanded until JavaScript runs, so the links work while the page loads.

### Accessibility

Renders `<header>` and `<nav>` landmarks, with a skip link to `skipTarget` at the start. The current page's item gets `aria-current="page"`, and with `match="prefix"`, an item gets `aria-current="true"` while a page under it is shown. The menu button reports its state with `aria-expanded` and `aria-controls`.

### API

<DocsApi name="UiSiteHeader" />

## UiAppHeader

A 56px tall header for apps and documentation. It places the site name, navigation, and actions on one line, with a thin line below.

<DocsDemo name="UiAppHeader" />

### Code

<<< ../demos/UiAppHeader.vue{vue}

### Usage

[UiAppShell](./shell.md#uiappshell) uses this component as its header. To hide the navigation on narrow screens, open a [UiDrawer](./dialog.md#uidrawer) from the menu button shown with `menu`, and put the same items inside it. Like UiSiteHeader, it marks the current item with bold text and a line below it.

### Accessibility

Renders `<header>` and `<nav>` landmarks. When `skipTarget` is set, a skip link to the main content comes first. Current items are marked with `aria-current` in the same way as UiSiteHeader.

### API

<DocsApi name="UiAppHeader" />
