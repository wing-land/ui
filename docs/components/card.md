---
api:
  UiCard:
    props:
      href: 'Makes the whole card a link.'
      button: 'Makes the whole card a button when there is no `href`.'
      target: '`target` of the link.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
    slots:
      default: 'Card content.'
      media: 'Area above the content, such as an image or thumbnail. It spans the card edge to edge, with a line below it.'
---

# Card

## UiCard

A group of information inside a thin border. Pass `href` to make the whole card a link, or `button` to make it a button.

<DocsDemo name="UiCard" />

### Code

<<< ../demos/UiCard.vue{vue}

### Usage

Use `href` or `button` when the whole card stands for one destination or action. Interactive cards change their background to `--color-surface` on hover and keyboard focus. Add the `ui-card__title` class to an element inside to give it the accent color at the same time.

Put an image or illustration in the `media` slot to show it above the content. The slot has no padding, and an `<img>`, `<svg>`, or `<video>` placed directly in it fills the width. Set its height with `aspect-ratio` or the image's own size.

### Accessibility

Renders a link with `href`, a `<button>` with `button`, and a `<div>` with neither. Since the whole card becomes a link or button, do not put other links or buttons inside. An image in `media` that only decorates the card should have an empty `alt`, so the link or button is named by its text.

### API

<DocsApi name="UiCard" />
