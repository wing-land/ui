---
api:
  UiPagination:
    props:
      total: 'Total number of items.'
      pageSize: 'Number of items per page.'
      siblingCount: 'Number of pages shown on each side of the current page.'
      hrefFor: 'Function that returns the URL of a page. When set, pages render as links instead of buttons.'
      size: '`sm` is 32px tall.'
      navigationLabel: 'Accessible name of the `<nav>`. Defaults to the locale text.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      page: 'Current page, counted from 1.'
  UiLoadMore:
    props:
      loading: 'Shows the loading state.'
      hasMore: 'Set to false to hide the button.'
      label: 'Button text. Defaults to the locale text.'
      status: 'Status text, such as a count. Announced each time it changes.'
    events:
      load: 'Emitted when the button is pressed.'
---

# Pagination

Components for splitting a long list. UiPagination moves between numbered pages, and UiLoadMore loads more items.

## UiPagination

Page number navigation for a list with a known number of items. It shows framed buttons for the previous and next pages, with the page numbers between them. The current page is filled with the accent color.

<DocsDemo name="UiPagination" />

### Code

<<< ../demos/UiPagination.vue{vue}

### Usage

The current page comes back through `v-model:page`. If each page has its own URL, pass `hrefFor` to render links instead of buttons. For offset/limit APIs, use `offset = (page - 1) * pageSize`. Nothing is shown when there is only one page. For lists with an unknown number of items, use [UiLoadMore](#uiloadmore).

### Accessibility

Renders a `<nav>` landmark and adds `aria-current="page"` to the current page. Each page button gets an accessible name such as "Page 3", and the ellipsis is hidden from screen readers.

### API

<DocsApi name="UiPagination" />

## UiLoadMore

A "Load more" button placed at the end of a list. It handles the loading state and announces the count.

<DocsDemo name="UiLoadMore" />

### Code

<<< ../demos/UiLoadMore.vue{vue}

### Usage

Pressing the button emits `load`; your app loads the next items and updates `loading` and `status`. When nothing is left, set `hasMore` to false.

### Accessibility

`status` is shown with `role="status"` and announced each time it changes. When the last page loads and the button disappears, focus moves to the status text so it is not lost.

### API

<DocsApi name="UiLoadMore" />
