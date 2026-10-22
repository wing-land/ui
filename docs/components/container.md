---
api:
  UiContainer:
    slots:
      default: 'Content to align.'
---

# Container

## UiContainer

Sets the maximum width and side margins of its content. Use it to align the header, main content, and footer to the same width.

<DocsDemo name="UiContainer" />

### Code

<<< ../demos/UiContainer.vue{vue}

### Usage

The maximum width comes from `--width-site` (1120px by default) and the side margins from `--gutter`. Both are CSS variables, so your app can override them.

### Accessibility

A layout-only `<div>` with no landmark or other role.

### API

<DocsApi name="UiContainer" />
