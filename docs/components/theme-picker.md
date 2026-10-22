---
api:
  UiThemePicker:
    props:
      modelValue: 'Selected theme. `system`, `light`, or `dark`.'
      labels: 'Text. Overrides part of `{ theme, current, system, light, dark }`. Defaults to the locale text.'
---

# Theme Picker

## UiThemePicker

Lets the user choose the color theme. Pressing the icon button opens the system, light, and dark options.

<DocsDemo name="UiThemePicker" />

### Code

<<< ../demos/UiThemePicker.vue{vue}

### Usage

The chosen value comes back through `v-model`. In Nuxt with `wingUi.colorMode` enabled, bind it to `useColorMode().preference`; the layer then applies and saves the theme. Otherwise applying and saving the theme is up to your app. For example, add a `dark` class to `<html>` and save the value in `localStorage`.

### Accessibility

The button's accessible name includes the current theme. The button reports its state with `aria-expanded`, and opening it with the Down arrow key moves focus to the selected radio button. The options are native radio buttons in a `<fieldset>`, drawn as menu rows like UiDropdownMenu with a check on the current choice, and stay open after a choice. Closing with Escape returns focus to the button; the panel also closes on an outside click or when focus moves out.

### API

<DocsApi name="UiThemePicker" />
