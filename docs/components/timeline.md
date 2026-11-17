---
api:
  UiTimeline:
    props:
      items: 'Events to display. See item fields below.'
      headingLevel: 'Heading level of event titles.'
      density: "`compact` tightens spacing and keeps a narrow date column at every width. Use it for short entries such as a day's schedule."
      linkComponent: 'Component used for links. Defaults to `linkComponent` in the [config](../config.md).'
    slots:
      meta: 'Extra details below the description, such as badges. Receives `item`.'
---

# Timeline

## UiTimeline

Lists dated events in order along a vertical line. Dots are hollow by default; set `filled` on an event to highlight it. Use it for a career history, a changelog, or a day's schedule.

<DocsDemo name="UiTimeline" />

### Code

<<< ../demos/UiTimeline.vue{vue}

### Usage

Pass events to `items` in the order you want them shown. It does not sort them, so your app decides between newest first and oldest first. Dates are formatted with `formatDate` in the [config](../config.md).

Set `filled: true` on any event to fill its dot with the accent color. Events without `filled` (or with `filled: false`) have hollow dots, including the first event. The demo highlights the second event.

For a day's schedule, set `density="compact"`, show times with `dateLabel`, and link each event with `href`. Put badges and other details in the `meta` slot.

<DocsDemo name="UiTimelineCompact" />

The layout follows the timeline's own width. At 560px or narrower, the date moves above the title, except in a compact timeline. The date column is at least `--ui-timeline-date-width` (`6.5em` by default) wide and grows for longer dates. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

Renders an `<ol>` list, with dates in `<time>` elements and each event title as a heading (`<h3>` by default; change it with `headingLevel` to fit the page structure). The line and dots are decorative and hidden from screen readers.

### API

<DocsApi name="UiTimeline" />

#### Item fields

Each entry in `items` accepts the following fields:

| Field         | Type                       | Required | Default | Description                                                        |
| ------------- | -------------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `date`        | `string \| number \| Date` | Yes      | —       | Date of the event, also used for the `datetime` attribute.         |
| `dateLabel`   | `string`                   | No       | —       | Text shown instead of the formatted date, such as `10:00`.         |
| `title`       | `string`                   | Yes      | —       | Heading for the event.                                             |
| `href`        | `string`                   | No       | —       | Makes the title a link.                                            |
| `description` | `string`                   | No       | —       | Additional text below the heading.                                 |
| `filled`      | `boolean`                  | No       | `false` | Fills the event's dot with the accent color when `true`.           |
| `key`         | `string`                   | No       | —       | Defaults to the date and title. Set it when two events share both. |
