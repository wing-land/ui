---
api:
  UiDisclosure:
    props:
      summary: 'Heading that toggles the content. Can also be passed in the `summary` slot.'
      open: 'Whether the content is open.'
      variant: '`bordered` frames each item, `divided` draws lines above and below, and `plain` shows only the heading and content.'
    slots:
      default: 'Content shown when open.'
      summary: 'Heading content.'
---

# Disclosure

## UiDisclosure

Shows and hides content when its heading is pressed. Use it to collapse content that only some readers need, such as FAQs or extra details.

<DocsDemo name="UiDisclosure" />

### Code

<<< ../demos/UiDisclosure.vue{vue}

### Usage

Pass the heading as `summary` or in the `summary` slot. To control the open state from outside, use `v-model:open`.

Choose the look with `variant`. `bordered` (the default) suits FAQs and settings; stacked items keep an 8px gap. `divided` stacks items into one list that shares lines between them. `plain` blends into body text.

### Accessibility

Renders native `<details>` and `<summary>` elements, so it opens and closes even before JavaScript runs, and the browser reports the open state. Enter or Space toggles it.

### API

<DocsApi name="UiDisclosure" />
