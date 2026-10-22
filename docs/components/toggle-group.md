---
api:
  UiToggleGroup:
    props:
      items: 'Options. Strings or `{ value, label, count?, disabled? }`.'
      label: 'Accessible name of the group.'
      multiple: 'Allows multiple selection.'
      allOption: 'Adds a button at the start that clears the selection. Pass a string to set its text.'
      modelValue: 'Selected value. `string | null` for single selection, `string[]` for multiple selection.'
  UiTagFilter:
    props:
      tags: 'Tags.'
      label: 'Accessible name of the group.'
      allLabel: 'Text of the button that clears the selection. Defaults to the locale text.'
      modelValue: 'Selected tag. `null` when none is selected.'
---

# Toggle Group

Rows of buttons with a pressed state, used to switch views or filter lists.

## UiToggleGroup

A group of buttons with a pressed state. Supports single and multiple selection, for filtering a list or switching how it is displayed.

<DocsDemo name="UiToggleGroup" />

### Code

<<< ../demos/UiToggleGroup.vue{vue}

### Usage

By default only one button can be selected, and pressing a button selects it. With `multiple`, each press toggles that button. `allOption` adds an "All" button at the start that clears the selection. Pass `count` on an item to show a count after its label.

### Accessibility

Renders `<button>` elements inside `role="group"`, with `label` as the group's accessible name. Each button reports its pressed state with `aria-pressed`. The Tab key moves through the buttons one by one.

### API

<DocsApi name="UiToggleGroup" />

## UiTagFilter

Filters a list by tag. It uses UiToggleGroup with single selection and always shows an "All" button.

<DocsDemo name="UiTagFilter" />

### Code

<<< ../demos/UiTagFilter.vue{vue}

### Usage

Pass an array of tag strings to `tags`. The selected tag comes back through `v-model` and is `null` when "All" is selected. If you need counts or multiple selection, use [UiToggleGroup](#uitogglegroup) directly.

### Accessibility

Like UiToggleGroup, it reports state with `role="group"` and `aria-pressed`.

### API

<DocsApi name="UiTagFilter" />
