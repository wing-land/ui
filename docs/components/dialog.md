---
api:
  UiModal:
    props:
      label: 'Accessible name of the dialog when there is no `title`.'
      title: 'Heading. Becomes the accessible name of the dialog.'
      description: 'Description below the heading. Linked with `aria-describedby`.'
      size: 'Width. `small` is 440px, the default is 640px, and `large` is up to 1200px.'
      placement: 'Position. `start` and `end` turn it into a full-height panel that opens from the edge of the screen. Usually use [UiDrawer](#uidrawer) instead.'
      role: 'Use `alertdialog` when a response is required, such as a confirmation.'
      closeLabel: 'Accessible name of the close button. Defaults to the locale text.'
      dismissible: 'When false, user actions do not close the dialog.'
      beforeClose: 'Called when the user tries to close the dialog. Return false to keep it open. `reason` is `escape`, `backdrop`, or `close-button`.'
      open: 'Whether the dialog is open.'
    events:
      open: 'Emitted when the dialog opens.'
      close: 'Emitted when the dialog closes.'
    slots:
      header: 'Content placed where the heading goes. Use it instead of `title`.'
      default: 'Body.'
      footer: 'Actions placed at the bottom right.'
    exposed:
      open:
        type: '() => void'
        description: 'Opens the dialog.'
      close: 'Closes the dialog without calling `beforeClose`.'
  UiConfirmDialog:
    props:
      title: 'The question. Becomes the accessible name of the dialog.'
      description: 'Extra explanation.'
      confirmLabel: 'Text of the confirm button. Defaults to the locale text.'
      cancelLabel: 'Text of the cancel button. Defaults to the locale text.'
      tone: 'With `danger`, the confirm button uses the destructive color.'
      loading: 'Puts the confirm button in a busy state and prevents closing.'
      open: 'Whether the dialog is open.'
    events:
      confirm: 'Emitted when the confirm button is pressed.'
      cancel: 'Emitted when the dialog closes any other way (cancel button, Escape, close button, or backdrop).'
    slots:
      default: 'Content added below the description.'
  UiDrawer:
    props:
      side: 'Side to open from.'
      label: 'Accessible name when there is no `title`.'
      title: 'Heading.'
      description: 'Description below the heading.'
      size: 'Width. `small` is 280px, the default is 360px, and `large` is 480px.'
      closeLabel: 'Accessible name of the close button. Defaults to the locale text.'
      dismissible: 'When false, user actions do not close the drawer.'
      beforeClose: 'Called when the user tries to close the drawer. Return false to keep it open.'
      open: 'Whether the drawer is open.'
    events:
      open: 'Emitted when the drawer opens.'
      close: 'Emitted when the drawer closes.'
    slots:
      default: 'Body.'
      header: 'Content placed where the heading goes.'
      footer: 'Actions placed at the bottom.'
    exposed:
      open:
        type: '() => void'
        description: 'Opens the drawer.'
      close: 'Closes the drawer without calling `beforeClose`.'
---

# Dialog

Dialogs shown on top of the page: a general modal, a confirmation dialog, and a drawer that opens from the edge of the screen.

## UiModal

A modal dialog shown on top of the page. While it is open, the rest of the page cannot be used, keeping attention on the dialog.

<DocsDemo name="UiModal" />

### Code

<<< ../demos/UiModal.vue{vue}

### Usage

Open and close it with `v-model:open` or the exposed `open()` and `close()` methods. To ask whether unsaved input can be discarded, return false from `beforeClose` to keep it open. When `dismissible` is false, neither Escape, the backdrop, nor the close button closes it, and the close button is hidden.

### Accessibility

Renders a native `<dialog>` element opened with `showModal()`, so focus and screen readers cannot reach anything outside it. While open, it stops the page behind it from scrolling, and when closed, it returns focus to the element that was focused before. `title` or `label` becomes its accessible name. With nested modals, scrolling resumes when the last one closes.

### API

<DocsApi name="UiModal" />

## UiConfirmDialog

A small dialog that asks for confirmation before an action that cannot be undone.

<DocsDemo name="UiConfirmDialog" />

### Code

<<< ../demos/UiConfirmDialog.vue{vue}

### Usage

The confirm button only emits `confirm`; closing the dialog is up to your app. While an async action runs, set `loading` to true to wait for it without the dialog closing.

#### useConfirm

`useConfirm()` lets you use one dialog placed in the same component as a Promise.

```ts
const { dialog, confirm } = useConfirm()
// Template: <UiConfirmDialog v-bind="dialog" />
if (await confirm({ title: 'Delete this item?', confirmLabel: 'Delete', tone: 'danger' })) remove()
```

Closing with the cancel button, Escape, or the close button resolves to `false`.

### Accessibility

Renders a [UiModal](#uimodal) with `role="alertdialog"` and `title` as its accessible name. To prevent accidental confirmation, initial focus goes to the cancel button.

### API

<DocsApi name="UiConfirmDialog" />

## UiDrawer

A panel that opens from the left or right edge of the screen. Use it for navigation on narrow screens or to show details.

<DocsDemo name="UiDrawer" />

### Code

<<< ../demos/UiDrawer.vue{vue}

### Usage

Choose the side with `side` and the width with `size`. Opening and closing, `beforeClose`, and `dismissible` work the same as UiModal.

### Accessibility

Uses the same native `<dialog>` element as [UiModal](#uimodal), and handles focus, background scrolling, and returning focus after closing the same way. `title` or `label` becomes its accessible name.

### API

<DocsApi name="UiDrawer" />
