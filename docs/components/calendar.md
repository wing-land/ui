---
api:
  UiCalendar:
    props:
      events: 'Events. `UiCalendarEvent` is `{ key, title, start, end?, kind?, href?, highlighted? }`. `start` and `end` are `YYYY-MM-DD` for all-day events and `YYYY-MM-DDTHH:mm` for timed ones; `end` is exclusive.'
      label: 'Accessible name of the calendar, such as the period it shows.'
      view: '`month`, `week`, or `day`.'
      today: 'Today as `YYYY-MM-DD`, in the time zone the app shows.'
      weekStartsOn: '`0` starts weeks on Sunday, `1` on Monday.'
      startHour: 'First hour of the time grid in the week and day views.'
      endHour: 'Hour where the time grid ends in the week and day views.'
      maxPerDay: 'Events shown in a month cell before the rest are counted.'
      linkComponent: 'Component used for event links. Defaults to `linkComponent` in the [config](../config.md).'
      date: 'Selected day as `YYYY-MM-DD`. It also decides which month, week, or day is shown. Use `v-model:date`.'
    slots:
      event: 'Text of an event. Receives `event`. Defaults to its title.'
---

# Calendar

## UiCalendar

Shows events in a month grid, or along the hours of a week or a day. Choosing a day selects it.

<DocsDemo name="UiCalendar" />

### Code

<<< ../demos/UiCalendar.vue{vue}

### Usage

Bind the selected day with `v-model:date`. The month, week, or day that contains it is shown, so moving to the previous or next period means changing `date`. Build the controls that do this (the period title, previous and next buttons, and the view switch) with UiButton and UiTabs or UiToggleGroup next to the calendar.

Dates are plain `YYYY-MM-DD` strings, and times are local times without an offset. Convert your events into the time zone you want to show before passing them, and pass `today` in the same time zone.

An event with `kind: 'deadline'` marks a point in time: a hollow square in the month view and a dashed line in the week and day views. A timed event without `end` lasts 30 minutes. Events that overlap in time are placed side by side.

In the month view, a cell shows up to `maxPerDay` events and counts the rest. Below 560px, cells show only the marks, so show the selected day's events elsewhere, for example in a list next to the calendar.

### Accessibility

The month view is a grid (`role="grid"`): weekdays are column headers with their full names, and each day is a grid cell. The selected day has `aria-selected`, and today has `aria-current="date"`. Each day's name gives the full date and, because the event chips are hidden from screen readers, the number and titles of its events. Only the selected day is in the tab order, and selection follows focus: the arrow keys move by day and week, Home and End move to the start and end of the week, and Page Up and Page Down move by month. Days of the neighbouring months are shown in the muted color rather than faded, so they keep enough contrast.

In the week and day views, each day's events are a group named by the date, and all-day events are a separate group. Timed events read their start and end times, and deadlines are read with "Due" before the time. Events with `href` are links. The week's day headers are named by their visible text, so voice control can find them, followed by today and the day's events.

The month view's event chips are not links. Show the selected day's events as links elsewhere, for example in a list next to the calendar.

### API

<DocsApi name="UiCalendar" />
