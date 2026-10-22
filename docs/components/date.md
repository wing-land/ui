---
api:
  UiDate:
    props:
      date: 'Date to show.'
      kind: 'Kind passed to `formatDate` in the [config](../config.md).'
      label: 'Text before the date. Announced as "label: date" and also shown in the tooltip.'
      icon: 'Icon placed before the date.'
      relative: 'Shows relative time such as "5 minutes ago". SSR outputs the absolute date, which switches after the page shows in the browser. Updates every minute and puts the absolute time in `title`.'
      now: 'Base time for relative time. Mainly for tests; when set, it stops updating on its own.'
  UiPostDate:
    props:
      date: 'Date to show.'
      kind: 'Published or updated date. Changes the announcement and icon.'
      label: 'Text before the date. Defaults to the locale text.'
---

# Date

Components that show dates. UiDate shows a date or relative time, and UiPostDate shows the published or updated date of a post.

## UiDate

Shows a date in the configured format, or as relative time.

<DocsDemo name="UiDate" />

### Code

<<< ../demos/UiDate.vue{vue}

### Usage

Dates are formatted with `formatDate` in the [config](../config.md). Pass `kind` to use different formats for different purposes within that function. With `relative`, it shows relative time such as "5 minutes ago" and updates it every minute.

### Accessibility

Renders a `<time>` element with a machine-readable date in its `datetime` attribute. With `label`, the label and date are announced together, such as "Published: January 1, 2026".

### API

<DocsApi name="UiDate" />

## UiPostDate

Shows the published or updated date of a post. It adds an icon and label for the kind of date to [UiDate](#uidate).

<DocsDemo name="UiPostDate" />

### Code

<<< ../demos/UiPostDate.vue{vue}

### Usage

Pass `published` or `updated` to `kind`. Published dates get a calendar icon, and updated dates a pencil icon. When `label` is omitted, the locale's "Published" or "Updated" text is used.

### Accessibility

Like UiDate, it renders a `<time>` element and announces the label and date together.

### API

<DocsApi name="UiPostDate" />
