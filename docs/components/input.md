---
api:
  UiInput:
    props:
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      type: 'Input type. The value is a string even for `number`.'
      size: '`sm` is 32px tall. Use it only where controls are packed together, such as toolbars.'
      icon: 'Icon placed at the start.'
      required: 'Makes the input required. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      readonly: 'Makes the input read-only. The value can still be selected and copied.'
      invalid: 'Puts the input in the error state. Inside UiField, it is set automatically when there is an error.'
      maxlength: 'Maximum number of characters.'
      showCount: 'Shows the character count as "12 / 100". Requires `maxlength`.'
      modelValue: 'Input value.'
    slots:
      trailing: 'Actions placed at the end of the input.'
    exposed:
      focus: 'Focuses the input.'
      select: 'Selects the input value.'
  UiTextarea:
    props:
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      rows: 'Number of visible rows.'
      required: 'Makes the input required. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      readonly: 'Makes the input read-only. The value can still be selected and copied.'
      invalid: 'Puts the input in the error state. Inside UiField, it is set automatically when there is an error.'
      maxlength: 'Maximum number of characters.'
      showCount: 'Shows the character count as "12 / 100". Requires `maxlength`.'
      modelValue: 'Input value.'
    exposed:
      focus: 'Focuses the input.'
  UiSearchInput:
    props:
      label: 'Accessible name when used outside UiField. Defaults to the locale text.'
      clearLabel: 'Accessible name of the clear button. Defaults to the locale text.'
      size: '`sm` is 32px tall. Use it only where controls are packed together, such as toolbars.'
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      modelValue: 'Search text.'
    events:
      clear: 'Emitted when the clear button clears the value.'
    exposed:
      focus: 'Focuses the input.'
  UiCopyField:
    props:
      value: 'Value to show and copy.'
      label: 'Label.'
      description: 'Description below the label.'
      id: '`id` of the input.'
      copyLabel: 'Text of the copy button. Defaults to the locale text.'
      copiedLabel: 'Text shown when copying succeeds. Defaults to the locale text.'
      copyFailedLabel: 'Text shown when copying fails. Defaults to the locale text.'
    events:
      copy: 'Emitted after copying, with whether it succeeded.'
---

# Input

Text input fields. Covers single-line and multi-line input, search, and values meant to be copied.

## UiInput

A single-line text input. Inside UiField, it is tied to the label and errors automatically.

<DocsDemo name="UiInput" />

### Code

<<< ../demos/UiInput.vue{vue}

### Usage

Attributes such as `placeholder`, `autocomplete`, and `name` go to the `<input>` element, while `class` and `style` go to the outer element. For dates and times, use the native input types (`date`, `datetime-local`, `time`). Do not use a placeholder in place of a label.

### Accessibility

Renders a native `<input>` element. Inside UiField, the label, description, and errors are tied to it with `<label>` and `aria-describedby`, and `aria-invalid` is added on error. With `showCount`, the character count and limit are also announced to screen readers.

### API

<DocsApi name="UiInput" />

## UiTextarea

A multi-line text input. It shows 4 rows by default and can be resized vertically only.

<DocsDemo name="UiTextarea" />

### Code

<<< ../demos/UiTextarea.vue{vue}

### Usage

Change the number of rows with `rows`. For fields with a character limit, use `maxlength` and `showCount` to show a count such as "12 / 100".

### Accessibility

Renders a native `<textarea>` element. The label, description, and errors are tied to it in the same way as UiInput.

### API

<DocsApi name="UiTextarea" />

## UiSearchInput

A search field. When it has a value, it shows a clear button that clears the value and returns focus to the input.

<DocsDemo name="UiSearchInput" />

### Code

<<< ../demos/UiSearchInput.vue{vue}

### Usage

Inside UiField it uses the field's label; outside, `label` becomes its accessible name. To update results as the user types, without a search button, search when the `v-model` value changes.

### Accessibility

Renders an `<input type="search">` element. Give the clear button an accessible name with `clearLabel`.

### API

<DocsApi name="UiSearchInput" />

## UiCopyField

A field that shows a value meant to be copied, such as an API token or an invite link. The value is read-only, and the copy button copies it to the clipboard.

<DocsDemo name="UiCopyField" />

### Code

<<< ../demos/UiCopyField.vue{vue}

### Usage

Focusing the input selects the whole value. If copying fails, the value is also left selected so the user can copy it by hand.

### Accessibility

Renders UiField with a read-only UiInput. The result of copying is shown on screen and announced with `role="status"`.

### API

<DocsApi name="UiCopyField" />
