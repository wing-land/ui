---
api:
  UiVisuallyHidden:
    props:
      as: 'Element to render.'
    slots:
      default: 'Content for screen readers only.'
---

# Visually Hidden

## UiVisuallyHidden

Hides its content from the screen while keeping it available to screen readers. Use it for the name of an icon-only button, or for context that sighted users get from the layout.

<DocsDemo name="UiVisuallyHidden" />

### Code

<<< ../demos/UiVisuallyHidden.vue{vue}

### Usage

Renders a `<span>` by default. Use `as` to render another element, such as a heading. Without the component, the `.ui-sr-only` class in base.css gives the same result.

### Accessibility

Unlike `display: none`, the content stays in the accessibility tree and is read by screen readers. Do not put focusable elements inside.

### API

<DocsApi name="UiVisuallyHidden" />
