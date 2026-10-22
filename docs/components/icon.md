---
api:
  UiIcon:
    props:
      name: 'Name of the icon.'
      label: 'Accessible name. When omitted, the icon is treated as decorative.'
      size: 'Width and height. Numbers are in px. Defaults to `1em`. A size set in CSS takes precedence.'
---

# Icon

## UiIcon

Displays one of the line icons built into the library. By default it matches the text size and uses the text color.

<DocsDemo name="UiIcon" />

### Code

<<< ../demos/UiIcon.vue{vue}

### Usage

Icon names are typed as `UiIconName`, and the full set is exported as `uiIcons`. Pass the same names to the `icon` prop of buttons and inputs.

### Accessibility

By default the icon is decorative and hidden from screen readers with `aria-hidden`. When the icon alone carries meaning, pass `label` to add `role="img"` and an accessible name.

### API

<DocsApi name="UiIcon" />
