---
api:
  UiAlert:
    props:
      tone: 'Meaning. Changes the color and icon.'
      title: 'Heading. Can also be passed in the `title` slot.'
      announce: 'Announces the alert when it appears: `role="alert"` for `danger` and `warning`, `role="status"` otherwise. Do not use it for messages present when the page loads.'
    slots:
      title: 'Heading.'
      default: 'Body.'
      actions: 'Actions placed below the body.'
---

# Alert

## UiAlert

A box that reports a status, such as information, success, a warning, or an error. It uses a light background, border, and icon that match the meaning, so it does not rely on color alone.

<DocsDemo name="UiAlert" />

### Code

<<< ../demos/UiAlert.vue{vue}

### Usage

Choose `tone` from `info`, `success`, `warning`, and `danger`. Put next steps such as "Retry" in the `actions` slot. For short messages that disappear on their own, use [UiToaster](./toaster.md#uitoaster); for notes in body text, use [UiNote](./note.md#uinote).

### Accessibility

When an alert appears later as the result of an action, add `announce` so it is read out. `danger` and `warning` use `role="alert"` and are read immediately; other tones use `role="status"`. Do not add `announce` to messages present when the page loads.

### API

<DocsApi name="UiAlert" />
