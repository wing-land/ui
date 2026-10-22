---
api:
  UiToolbar:
    props:
      label: 'Accessible name of the toolbar.'
      orientation: 'Layout direction.'
      loop: 'Arrow keys wrap from the last button to the first and back.'
    slots:
      default: 'UiToolbarButton and UiToolbarSeparator.'
  UiToolbarButton:
    props:
      icon: 'Icon.'
      label: 'Accessible name. Required for icon-only buttons.'
      pressed: 'Pressed state. When set, the button becomes a toggle.'
      disabled: 'Disables the button.'
    events:
      update:pressed: 'Emitted when a button with `pressed` is pressed.'
      click: 'Emitted when the button is pressed.'
    slots:
      default: 'Button text.'
  UiToolbarSeparator: {}
---

# Toolbar

A toolbar that lines up action buttons, with the buttons and separators that go inside it.

## UiToolbar

A toolbar that groups related actions, such as the formatting buttons of an editor. The Tab key enters and leaves it in one step, and the arrow keys move between the buttons inside.

<DocsDemo name="UiToolbar" />

### Code

<<< ../demos/UiToolbar.vue{vue}

### Usage

Put [UiToolbarButton](#uitoolbarbutton) and [UiToolbarSeparator](#uitoolbarseparator) inside. For a vertical toolbar, set `orientation="vertical"`.

### Accessibility

Renders `role="toolbar"` with `label` as its accessible name. Only one button inside is in the tab order; the arrow keys move to the next button, and Home and End move to the first and last. Built on the Reka UI Toolbar.

### API

<DocsApi name="UiToolbar" />

## UiToolbarButton

A button placed inside [UiToolbar](#uitoolbar). It renders as a 32px tall UiButton.

### Usage

Pass `pressed` to make a button with a pressed state, such as a bold toggle. Use `v-model:pressed` to receive the state.

### Accessibility

Always give icon-only buttons an accessible name with `label`. Toggle buttons report their state with `aria-pressed`.

### API

<DocsApi name="UiToolbarButton" />

## UiToolbarSeparator

A line inside [UiToolbar](#uitoolbar) that separates groups of buttons.

### Usage

Place it between actions that are not closely related. The line follows the orientation of the toolbar.

### Accessibility

Renders `role="separator"` and is skipped by arrow key navigation.

### API

<DocsApi name="UiToolbarSeparator" />
