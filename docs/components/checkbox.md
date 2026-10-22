---
api:
  UiCheckbox:
    props:
      label: 'Label. Can also be passed in the default slot.'
      description: 'Description below the label.'
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      required: 'Makes the input required. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      invalid: 'Puts the input in the error state. Inside UiField, it is set automatically when there is an error.'
      indeterminate: 'Shows that only some items are selected.'
      modelValue: 'Whether the checkbox is checked.'
    slots:
      default: 'Label content.'
  UiCheckboxGroup:
    props:
      items: 'Options. Strings or `{ value, label, description?, disabled? }`.'
      label: 'Label of the group.'
      description: 'Description below the label.'
      error: 'Error message.'
      required: 'Shows the required indicator.'
      disabled: 'Disables all options.'
      orientation: 'Layout direction. `horizontal` lines options up in a wrapping row.'
      requiredIndicator: 'How required fields are marked. Defaults to the value in the [config](../config.md).'
      modelValue: 'Selected values.'
---

# Checkbox

A checkbox for turning one option on or off, and a group of checkboxes for choosing from several options.

## UiCheckbox

A single checkbox. Use it to turn one option on or off, such as agreeing to terms.

<DocsDemo name="UiCheckbox" />

### Code

<<< ../demos/UiCheckbox.vue{vue}

### Usage

The value comes back through `v-model` as a boolean. Use `indeterminate` to show that only some items are selected, as in a "Select all" checkbox. To choose from several options, use [UiCheckboxGroup](#uicheckboxgroup).

### Accessibility

Renders a native `<input type="checkbox">`, and the whole label is clickable. The description is linked with `aria-describedby`, and the error state with `aria-invalid`.

### API

<DocsApi name="UiCheckbox" />

## UiCheckboxGroup

A group of checkboxes where any number of options can be chosen. It shows the label, description, and errors for the whole group.

<DocsDemo name="UiCheckboxGroup" />

### Code

<<< ../demos/UiCheckboxGroup.vue{vue}

### Usage

The chosen values come back as an array, in the order of `items` rather than the order they were picked. It shows its own label and errors, so do not wrap it in UiField.

### Accessibility

Groups the checkboxes in a `<fieldset>` with a `<legend>`, so the group label gives context to each checkbox. Errors are linked to both the group and each checkbox.

### API

<DocsApi name="UiCheckboxGroup" />
