---
api:
  UiTimeline:
    props:
      items: 'Events. `{ date, title, description? }`.'
      headingLevel: 'Heading level of event titles.'
---

# Timeline

## UiTimeline

Lists dated events in order along a vertical line. The first event has a filled dot and the rest have hollow dots. Use it for a career history or a changelog.

<DocsDemo name="UiTimeline" />

### Code

<<< ../demos/UiTimeline.vue{vue}

### Usage

Pass events to `items` in the order you want them shown. It does not sort them, so your app decides between newest first and oldest first. Dates are formatted with `formatDate` in the [config](../config.md).

The layout follows the timeline's own width. At 560px or narrower, the date moves above the title. The date column is at least `--ui-timeline-date-width` (`6.5em` by default) wide and grows for longer dates. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

Renders an `<ol>` list, with dates in `<time>` elements and each event title as a heading (`<h3>` by default; change it with `headingLevel` to fit the page structure). The line and dots are decorative and hidden from screen readers.

### API

<DocsApi name="UiTimeline" />
