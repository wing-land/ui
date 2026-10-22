---
api:
  UiConnectionStatus:
    props:
      status: 'Connection status. `connected`, `connecting`, `reconnecting`, or `offline`.'
      compact: 'Shows only the dot, without the frame. The status is conveyed by screen reader text and the native `title` attribute.'
      labels: 'Text for each status. Defaults to the locale text.'
---

# Connection Status

## UiConnectionStatus

Shows the connection to the server with a colored dot and text, inside a pill-shaped frame. Place it in the header of an app that syncs in real time.

<DocsDemo name="UiConnectionStatus" />

### Code

<<< ../demos/UiConnectionStatus.vue{vue}

### Usage

There are four statuses: `connected`, `connecting`, `reconnecting`, and `offline`. Where space is tight, `compact` shows only the dot and moves the status text into screen reader text and a native `title`. A native `title` does not appear on keyboard focus or touch, so keep the text visible where people need to read it. Besides color, the dot shows the status by its fill: solid, light, or outline only.

### Accessibility

Renders `role="status"` and announces only when the status changes, not the status when the page loads. With `compact`, the status text is still available to screen readers.

### API

<DocsApi name="UiConnectionStatus" />
