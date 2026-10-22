---
api:
  UiDropdownMenu:
    props:
      items: "Items. `{ label, value?, icon?, href?, tone?, disabled?, shortcut?, onSelect? }`, `{ type: 'separator' }`, or `{ type: 'label', label }`."
      label: 'Accessible name of the menu. Defaults to the name of the trigger.'
      side: 'Side of the trigger to open on. Opens on the other side when there is no room.'
      align: 'Alignment relative to the trigger.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      open: 'Whether the menu is open.'
    events:
      select: "Emitted when an item is chosen, with the item's `value` (or `label` when omitted)."
    slots:
      trigger: 'Button that opens the menu.'
---

# Dropdown Menu

## UiDropdownMenu

A menu of actions that opens from a button. Use it to group actions that do not need to be visible all the time, such as "More actions".

<DocsDemo name="UiDropdownMenu" />

### Code

<<< ../demos/UiDropdownMenu.vue{vue}

### Usage

Put the trigger button in the `trigger` slot. Choosing an item emits `select` and also calls the item's `onSelect`, if any. Items with `href` become links. Give destructive actions such as deleting `tone: 'danger'`, and confirm them with [UiConfirmDialog](./dialog.md#uiconfirmdialog) before running them.

### Accessibility

Renders `role="menu"` and `role="menuitem"`. The Up and Down arrow keys move through items, Enter chooses one, and Escape closes the menu and returns focus to the trigger. Typing a character moves to the next item that starts with it. Built on the Reka UI DropdownMenu.

### API

<DocsApi name="UiDropdownMenu" />
