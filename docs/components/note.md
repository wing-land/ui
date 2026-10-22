---
api:
  UiNote:
    props:
      variant: '`accent` adds a colored bar at the start, `outline` keeps only the border, and `subtle` fills the box with a light background.'
      icon: 'Icon shown at the start, such as `info`. When omitted, no icon is shown.'
    slots:
      default: 'Content of the note. Use `<h3>` for headings.'
---

# Note

## UiNote

Shows a note alongside the body of a post, inside a border with a colored bar at the start.

<DocsDemo name="UiNote" prose />

### Code

<<< ../demos/UiNote.vue{vue}

### Usage

Use it for notes and cautions that sit outside the flow of the text. To report a status, such as the result of an action or a warning, use [UiAlert](./alert.md#uialert). Use `<h3>` for any heading inside.

### Accessibility

Renders an `<aside>` element to show that the content supplements the body.

### API

<DocsApi name="UiNote" />
