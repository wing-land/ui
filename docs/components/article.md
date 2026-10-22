---
api:
  UiArticleHeader:
    props:
      title: 'Title of the post. Shown as an `<h1>`.'
      publishedAt: 'Published date. Not shown when omitted.'
      updatedAt: 'Updated date. Not shown when omitted.'
      datesLabel: 'Accessible name of the group of dates. Defaults to the locale text.'
  UiArticleToc:
    props:
      links: 'Headings. `{ id, text, children? }`.'
      depth: 'Depth of headings to show. `3` also shows `children`.'
      title: 'Title of the table of contents. Defaults to the locale text.'
      navigationLabel: 'Accessible name of the `<nav>`. Defaults to the locale text.'
      showLabel: 'Text of the control that expands the list. Defaults to the locale text.'
      hideLabel: 'Text of the control that collapses the list. Defaults to the locale text.'
      numbered: 'Numbers the items.'
      trackActive: 'Marks the heading being read with `aria-current="true"`. Off by default because it recalculates on every scroll.'
      activeOffset: 'The last heading within this distance (px) from the top of the viewport is treated as the one being read. A heading with a larger `scroll-margin-top` uses that value instead, so a jump to it from the TOC marks it as current.'
      layout: '`auto` collapses below 1280px wide and sticks to the viewport above it. `inline` is always collapsible. `rail` is an always-open list whose placement is left to the parent.'
      density: '`compact` makes each row 32px. Use it in a side column.'
  UiArticleEnding:
    props:
      older: 'Previous post. `{ href, title, publishedAt? }`. The date is not shown when omitted.'
      newer: 'Next post. Same shape as `older`.'
      listHref: 'URL of the list of posts. The link is hidden when omitted.'
      copyStatus: 'Text showing the result of copying. When omitted, the component copies the URL and shows the result itself.'
      shareUrl: 'URL to copy. Defaults to the URL of the current page.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      labels:
        type: 'Partial<{ end, adjacent, older, newer, allPosts, copyLink }>'
        description: 'Text of the headings and actions. Defaults to the locale text.'
    events:
      copy: 'Emitted when the user copies the link. Copy the URL here when you pass `copyStatus`.'
---

# Article

Components for blog posts and other articles: the title and dates at the top, a table of contents, and links at the end.

## UiArticleHeader

Shows the title and the published and updated dates at the top of a post.

<DocsDemo name="UiArticleHeader" />

### Code

<<< ../demos/UiArticleHeader.vue{vue}

### Usage

Dates are shown with [UiPostDate](./date.md#uipostdate). Each date appears only when you pass it, so the header also works for drafts and pages without dates.

### Accessibility

Renders a `<header>` element with the title as an `<h1>`. The group of dates gets an accessible name from `datesLabel`.

### API

<DocsApi name="UiArticleHeader" />

## UiArticleToc

A table of contents for the headings of a post. On wide screens it sticks to the side of the viewport, and on narrow screens it is collapsed.

<DocsDemo name="UiArticleToc" />

### Code

<<< ../demos/UiArticleToc.vue{vue}

### Usage

Pass each heading's `id` and text to `links`. To show subheadings too, put them in `children` and set `depth` to `3`. Besides the default `auto`, `layout` can be `inline`, which is always collapsible, or `rail`, which is always open.

### Accessibility

Renders a `<nav>` landmark. Collapsing uses the native `<details>` element, so it opens and closes even before JavaScript runs. With `trackActive`, the item for the heading being read gets `aria-current="true"`.

### API

<DocsApi name="UiArticleToc" />

## UiArticleEnding

Shows links to the previous and next posts and the list of posts, plus an action that copies the URL, at the end of a post.

<DocsDemo name="UiArticleEnding" />

### Code

<<< ../demos/UiArticleEnding.vue{vue}

### Usage

Pass the previous and next posts as `older` and `newer`, and the list of posts as `listHref`. Each is optional, and its link is hidden when omitted. By default the component copies the URL itself and shows the result. To copy in your app instead, copy on the `copy` event and pass the result text to `copyStatus`. The previous and next posts sit side by side and stack when the component is 560px or narrower. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

Renders the whole area as a `<footer>` and the links to the previous and next posts as a `<nav>`, each with an accessible name. The result of copying is announced with `role="status"`.

### API

<DocsApi name="UiArticleEnding" />
