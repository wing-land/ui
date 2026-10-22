---
api:
  UiSwitch:
    props:
      label: 'Label. Can also be passed in the default slot.'
      description: 'Description below the label.'
      id: '`id` of the input. Inside UiField, the UiField value is used.'
      disabled: 'Disables the input. Inside UiField, the UiField value is used.'
      invalid: 'Puts the input in the error state. Inside UiField, it is set automatically when there is an error.'
      modelValue: 'Whether the switch is on.'
    slots:
      default: 'Label content.'
---

# Switch

## UiSwitch

A switch that turns a setting on or off. Use it for settings that take effect as soon as they are pressed.

<DocsDemo name="UiSwitch" />

### Code

<<< ../demos/UiSwitch.vue{vue}

### Usage

The value comes back through `v-model` as a boolean. In a form that is confirmed with a submit button, use [UiCheckbox](./checkbox.md#uicheckbox) instead.

### Accessibility

Renders a native checkbox with `role="switch"`, which is announced as on or off. The Space key toggles it. The description and errors are linked in the same way as UiCheckbox.

### API

<DocsApi name="UiSwitch" />
