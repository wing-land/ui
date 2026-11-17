---
api:
  UiSuggestMenu:
    props:
      items: "Items. `{ value, label, meta?, icon?, avatar?, tone? }`, `{ type: 'separator' }`, or `{ type: 'label', label }`. `avatar` is `{ name, src? }` and replaces the icon. `tone: 'muted'` greys out an item, such as one that creates something new."
      label: 'Accessible name of the list.'
      anchor: "Rectangle the list opens from, such as the caret's from `Range.getBoundingClientRect()`. The list opens below it, or above when there is no room. Nothing is shown while it is `null`."
      id: '`id` of the list. Option ids are `${id}-option-${index}`, where `index` counts every item, labels and separators included.'
      open: 'Whether the list is open.'
      active: '`value` of the highlighted item.'
    events:
      select: "Emitted with the item's `value` when an item is clicked."
    slots:
      footer: 'Hints below the list, such as which keys choose an item.'
    exposed:
      optionId: 'Returns the `id` of the option at an index of `items`.'
---

# Suggest Menu

## UiSuggestMenu

A list of suggestions that opens at the caret while someone types, such as the notes to link to after `[` or the people to mention after `@`.

<DocsDemo name="UiSuggestMenu" />

### Code

<<< ../demos/UiSuggestMenu.vue{vue}

### Usage

Keyboard focus stays in the field or editor where the person is typing, so the list does not handle keys itself. The caller watches the typed text, opens the list with the caret's rectangle as `anchor`, moves `active` with the Up and Down arrow keys, and inserts the active item on Enter. Clicking an item emits `select` without moving focus out of the editor.

Use [UiDropdownMenu](./dropdown-menu.md) for actions that open from a button, and [UiCombobox](./select.md) when the person picks a value in a form field.

### Accessibility

Renders `role="listbox"` and `role="option"`, and marks the active option with `aria-selected`. Because focus stays in the editor, set `aria-controls` to the list's `id` and `aria-activedescendant` to the active option's id on the element being typed in, so that screen readers announce the highlighted suggestion. Nothing in the list can take focus, and the key hints in the `footer` slot are hidden from screen readers.

### API

<DocsApi name="UiSuggestMenu" />
