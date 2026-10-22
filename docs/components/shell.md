---
api:
  UiAppShell:
    props:
      sidebarLabel: 'Accessible name of the sidebar. Defaults to the locale text.'
      asideLabel: 'Accessible name of the side panel.'
      menuLabel: 'Accessible name of the menu button. Defaults to the locale text.'
      skipLabel: 'Text of the skip link. Defaults to the locale text.'
      mainId: '`id` of the `<main>` element. Used as the skip link target.'
      sidebarOpen: 'Whether the sidebar drawer is open on narrow screens.'
      asideOpen: 'Whether the side panel drawer is open on narrow screens.'
    slots:
      header: 'Header content. `toggleAside` opens and closes the side panel, and `asideCollapsed` tells whether the side panel has moved into a drawer.'
      sidebar: 'Sidebar content.'
      default: 'Main content.'
      aside: 'Side panel content.'
---

# Shell

## UiAppShell

The frame of an app screen. It lays out a [UiAppHeader](./header.md#uiappheader) at the top, a sidebar on the left, the main content, and a side panel on the right, and each column scrolls on its own.

<DocsDemo name="UiAppShell" />

### Code

<<< ../demos/UiAppShell.vue{vue}

### Usage

At 960px wide or less, the sidebar moves into a drawer and a menu button appears at the start of the header. At 1200px wide or less, the side panel moves into a drawer on the right. Add the button that opens the side panel yourself, using `toggleAside` from the `header` slot. Until JavaScript runs, narrow screens show only the main column.

### Accessibility

Renders the sidebar with `role="region"`, the main content as `<main>`, and the side panel as `<aside>`, with a skip link to the main content first. The sidebar and side panel get accessible names from `sidebarLabel` and `asideLabel`. The main content and side panel are focusable, so they can be scrolled with the keyboard. The drawers on narrow screens use [UiDrawer](./dialog.md#uidrawer).

### API

<DocsApi name="UiAppShell" />
