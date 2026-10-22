---
api:
  UiSelect:
    props:
      options: 'Options. Strings or `{ value, label, disabled? }`.'
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      placeholder: 'First option with an empty value. Cannot be chosen when required.'
      size: '`sm` is 32px tall. Use it only where controls are packed together, such as toolbars.'
      required: 'Makes the input required. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      invalid: 'Puts the input in the error state. Inside UiField, it is set automatically when there is an error.'
      modelValue: 'Selected value. An empty string when nothing is selected.'
  UiCombobox:
    props:
      items: 'Options. Strings or `{ value, label, description?, disabled? }`.'
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      placeholder: 'Placeholder of the input.'
      icon: 'Icon placed at the start of the input.'
      filter: 'Filters options by the typed text. Set to false when filtering on the server.'
      loading: 'Shows a loading state.'
      emptyText: 'Text shown when there are no options. Defaults to the locale text.'
      required: 'Makes the input required. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      invalid: 'Puts the input in the error state. Inside UiField, it is set automatically when there is an error.'
      modelValue: 'Selected value.'
      search: 'Text being typed.'
      open: 'Whether the list of options is open.'
---

# Select

Components for choosing a value from options. UiSelect picks from a list, and UiCombobox narrows down options as the user types.

## UiSelect

A select field built on the native `<select>` element. Inside UiField, it is tied to the label and errors automatically. In browsers that support customizable select (`appearance: base-select`), the open list is styled like UiDropdownMenu; other browsers show their native list.

<DocsDemo name="UiSelect" />

### Code

<<< ../demos/UiSelect.vue{vue}

### Usage

Use it when there are many options. With only a few, show them all with [UiRadioGroup](./radio.md#uiradiogroup). Pass `placeholder` to add an option with an empty value at the top.

### Accessibility

Because it is a native `<select>` element, keyboard behavior and announcements follow the browser and OS. The label, description, and errors are tied to it in the same way as UiInput.

### API

<DocsApi name="UiSelect" />

## UiCombobox

A field where the user types to narrow down a list of options and picks one. Use it when there are many options and users search by part of a name.

<DocsDemo name="UiCombobox" />

### Code

<<< ../demos/UiCombobox.vue{vue}

### Usage

By default it filters `items` by the typed text. To search on the server, set `filter` to false and replace `items` as `v-model:search` changes. Set `loading` while a search is running.

### Accessibility

Renders the input with `role="combobox"` and the list with `role="listbox"`. The Up and Down arrow keys move through options, Enter picks one, and Escape closes the list. The label, description, and errors are tied to it in the same way as UiInput. Built on the Reka UI Combobox.

### API

<DocsApi name="UiCombobox" />
