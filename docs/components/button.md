---
api:
  UiButton:
    props:
      type: '`type` of the `<button>`. Not used when rendered as a link.'
      variant: 'Visual style.'
      tone: 'Meaning. Use `danger` for actions that cannot be undone, such as deleting.'
      size: '`sm` is 32px tall. Use it only where actions are packed together, such as toolbars and tables.'
      icon: 'Icon placed before or after the text.'
      iconPosition: 'Position of the icon.'
      label: 'Accessible name. Required for icon-only buttons.'
      loading: 'Puts the button in a busy state. It keeps focus but ignores presses, and gets `aria-busy` and `aria-disabled`.'
      block: 'Stretches the button to the full width of its parent.'
      disabled: 'Disables the button. Renders a button even when `href` is set.'
      href: 'Renders the button as a link. Use it for navigation, not for actions.'
      target: '`target` of the link.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
    slots:
      default: 'Button text.'
---

# Button

## UiButton

A button that performs an action. It comes in three styles, `outline`, `solid`, and `ghost`, and becomes a link with the same look when you pass `href`.

<DocsDemo name="UiButton" />

### Code

<<< ../demos/UiButton.vue{vue}

### Usage

Use the thin-bordered `outline` style by default, and the `solid` style, filled with the accent color, for the main action you want to emphasize. Anything that only moves to another page should be a link with `href`; actions such as submitting or deleting should be buttons. While an async action runs, set `loading` to show a spinner in place of the icon.

### Accessibility

Renders a `<button>` without `href`, and a link with it. Always give icon-only buttons an accessible name with `label`. Unlike `disabled`, `loading` keeps focus on the button and reports the busy state with `aria-busy` and `aria-disabled`.

### API

<DocsApi name="UiButton" />
