---
api:
  UiTableScroll:
    props:
      label: 'Accessible name of the scroll area. Defaults to the locale text.'
      density: '`compact` sets table text to 14px and tightens cell padding. It includes the base table styles, so it also works outside `.prose`.'
    slots:
      default: 'A `<table>` element.'
---

# Table Scroll

## UiTableScroll

Wraps a wide table in a frame with rounded corners so that only the table scrolls horizontally. This keeps the whole page from getting wider on narrow screens.

<DocsDemo name="UiTableScroll" prose />

### Code

<<< ../demos/UiTableScroll.vue{vue}

### Usage

Put a `<table>` element inside as is. Tables are styled inside `.prose`. Outside `.prose`, or for dense layouts such as admin screens, set `density="compact"`.

### Accessibility

Adds `role="region"` and an accessible name, and makes the area focusable so it can be scrolled with the keyboard. Pass a `label` that says what the table contains.

### API

<DocsApi name="UiTableScroll" />
