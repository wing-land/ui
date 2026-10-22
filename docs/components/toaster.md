---
api:
  UiToaster:
    props:
      duration: 'Time in milliseconds before a toast closes on its own.'
      limit: 'Maximum number of toasts shown at once. Extra toasts wait until earlier ones close.'
      position: 'Position on the screen.'
---

# Toaster

## UiToaster

The place where toasts appear: short messages about the result of an action, such as a save completing or the connection dropping. Place one at the root of your app and show toasts with `useToast()`.

<DocsDemo name="UiToaster" />

### Code

<<< ../demos/UiToaster.vue{vue}

### Usage

```ts
const toast = useToast()
toast.show({ title: 'Saved', tone: 'success' })
toast.show({ id: 'offline', title: 'Offline', tone: 'warning', duration: 0 })
await toast.promise(save(), { loading: 'Saving…', success: 'Saved', error: 'Could not save' })
```

Toasts with `duration: 0` do not close on their own. Showing a toast with an existing `id` replaces it. When adding an action button, describe in `altText` how to do the same thing without the toast. Toasts disappear, so never make them the only way to perform an action.

### Accessibility

Toasts marked `important` are announced right away; others wait until the current announcement finishes. F8 moves focus to the toast area. Toasts do not close on their own while hovered or focused. Built on the Reka UI Toast.

### API

<DocsApi name="UiToaster" />
