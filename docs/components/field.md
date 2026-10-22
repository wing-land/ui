---
api:
  UiField:
    props:
      label: 'Label.'
      description: 'Description below the label.'
      error: 'Error message. Multiple messages are listed. Nothing is shown when empty.'
      required: 'Shows the required indicator and passes `required` to the input.'
      disabled: 'Disables the input.'
      id: '`id` of the input. Generated when omitted. Set it when the error summary links to the input.'
      group: 'Renders `<fieldset>` and `<legend>`. Use it to group several inputs, such as checkboxes. `radiogroup` also adds the required and error state to the group.'
      hideLabel: 'Hides the label from the screen while keeping it for screen readers.'
      requiredIndicator: 'How required fields are marked. Defaults to the value in the [config](../config.md) (`text` by default).'
    slots:
      default: 'The input. Pass the slot props to native elements.'
      label: 'Label content.'
      description: 'Description content.'
  UiFormErrorSummary:
    props:
      errors: 'Errors. `{ id?, message }`. With `id`, the item links to that input.'
      title: 'Heading. Defaults to the locale text.'
      headingLevel: 'Heading level.'
      autofocus: 'Moves focus to the summary when it receives a new list of errors.'
---

# Field

A component that shows the label, description, and errors of a form field, and a summary of errors after a failed submit.

## UiField

A wrapper that groups the label, description, and errors of a form field. It passes `id`, `aria-describedby`, `aria-invalid`, and `required` to the input inside, such as UiInput.

<DocsDemo name="UiField" />

### Code

<<< ../demos/UiField.vue{vue}

### Usage

Put only one input inside each UiField. For native elements, pass the default slot props (`id`, `describedBy`, `invalid`, `required`, `disabled`) to the element. By default, required fields show the text "Required" next to the label. To use an asterisk instead, set the `requiredIndicator` prop on UiField, or `requiredIndicator` in the [config](../config.md) to change every field.

### Accessibility

The label is a `<label>` tied to the input. The description and errors are linked with `aria-describedby`, and the error state with `aria-invalid`. Errors are shown with an icon and text, not color alone. With `group`, the inputs are grouped in a `<fieldset>` with a `<legend>`.

### API

<DocsApi name="UiField" />

## UiFormErrorSummary

A list of errors placed at the top of a form after a failed submit. It takes focus when shown, and each item moves to the related input.

<DocsDemo name="UiFormErrorSummary" />

### Code

<<< ../demos/UiFormErrorSummary.vue{vue}

### Usage

Errors can be managed with `useFormErrors()`. Pass a response shaped like `{ errors: { name: ["…"] } }`, such as ASP.NET Core's ValidationProblemDetails, to `setFromProblem()` to fill both the field errors and the summary.

```ts
const form = useFormErrors({ ids: { expiresAt: 'token-expires' } })
const response = await fetch('/api/tokens', { method: 'POST', body })
if (!response.ok && !form.setFromProblem(await response.json())) showGeneralError()
// <UiFormErrorSummary :errors="form.summary.value" />
// <UiField id="name" :error="form.get('name')">…</UiField>
```

Each item links to the input whose `id` matches the field name. When the `id` differs, map it with `ids`. Once the user fixes an input, remove its error with `clear(name)`.

### Accessibility

Renders a `<section>` named by its heading. With `autofocus`, focus moves to the summary each time a new list of errors arrives, so screen reader users also notice that the submit failed.

### API

<DocsApi name="UiFormErrorSummary" />
