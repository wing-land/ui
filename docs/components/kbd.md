---
api:
  UiKbd:
    slots:
      default: 'Name of the key.'
---

# Kbd

## UiKbd

Shows a key on the keyboard, with a thicker bottom edge like a key cap. Use it to show which key to press in shortcuts and instructions.

<DocsDemo name="UiKbd" />

### Code

<<< ../demos/UiKbd.vue{vue}

### Usage

Use one UiKbd per key. For combinations such as "Ctrl + K", place one for each key.

### Accessibility

Renders a native `<kbd>` element, and its text is read as is. For keys that are only symbols, use names that make sense when read aloud.

### API

<DocsApi name="UiKbd" />
