---
api:
  UiSeparator:
    props:
      orientation: 'Direction of the line.'
      decorative: 'Treats the line as purely visual and hides it from screen readers.'
---

# Separator

## UiSeparator

A thin line that separates content. Supports horizontal and vertical orientation.

<DocsDemo name="UiSeparator" />

### Code

<<< ../demos/UiSeparator.vue{vue}

### Usage

Place a vertical line between items laid out in a row with flex, and it stretches to the height of the row.

### Accessibility

Adds `role="separator"` by default, plus `aria-orientation="vertical"` when vertical. For a line that only replaces spacing and does not mark a break in content, add `decorative` to hide it from screen readers.

### API

<DocsApi name="UiSeparator" />
