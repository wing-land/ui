---
api:
  UiRadioGroup:
    props:
      items: 'Options. Strings or `{ value, label, description?, disabled? }`.'
      label: 'Label of the group.'
      description: 'Description below the label.'
      error: 'Error message.'
      required: 'Makes the group required and adds `aria-required` to it.'
      disabled: 'Disables all options.'
      name: 'Name submitted with the form. Generated when omitted.'
      orientation: 'Layout direction. `horizontal` lines options up in a wrapping row.'
      requiredIndicator: 'How required fields are marked. Defaults to the value in the [config](../config.md).'
      modelValue: 'Selected value. `null` when nothing is selected.'
---

# Radio

## UiRadioGroup

A group of radio buttons for choosing one of several options. Use it when users should see and compare all the options.

<DocsDemo name="UiRadioGroup" />

### Code

<<< ../demos/UiRadioGroup.vue{vue}

### Usage

The chosen value comes back through `v-model` and is `null` when nothing is selected. It shows its own label and errors, so do not wrap it in UiField. With many options, use [UiSelect](./select.md#uiselect).

### Accessibility

Groups native radio buttons in a `<fieldset>` with `role="radiogroup"`. The arrow keys move the selection, and the Tab key leaves the group. The required and error states are reported with `aria-required` and `aria-invalid` on the group.

### API

<DocsApi name="UiRadioGroup" />
