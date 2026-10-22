---
api:
  UiBadge:
    props:
      tone: 'Meaning. Changes the color. Uses the same values as UiAlert.'
      icon: 'Icon placed before the text.'
    slots:
      default: 'Status text.'
---

# Badge

## UiBadge

A small label that shows the status of an item. Use it to tell statuses apart in a list, such as archived, revoked, or expired.

<DocsDemo name="UiBadge" />

### Code

<<< ../demos/UiBadge.vue{vue}

### Usage

Choose `tone` from `neutral`, `info`, `success`, `warning`, and `danger`. Put only short status text inside; do not use it for counts or actions.

### Accessibility

Renders a `<span>`, and its text is read as is. Color alone does not convey the status, so always write the status as text.

### API

<DocsApi name="UiBadge" />
