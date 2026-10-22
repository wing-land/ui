---
api:
  UiListStatus:
    props:
      kind: 'Status. `loading` shows a spinner, and `error` shows a retry button.'
      message: 'Text describing the status.'
      bordered: 'Adds a border.'
      retryLabel: 'Text of the retry button. Defaults to the locale text.'
      retryDisabled: 'Disables the retry button.'
    events:
      retry: 'Emitted when the retry button is pressed.'
  UiEmptyState:
    props:
      title: 'Heading describing the state.'
      description: 'Extra explanation.'
      icon: 'Icon placed above the heading.'
      headingLevel: 'Heading level.'
    slots:
      default: 'Content added below the description.'
      actions: 'Next steps.'
  UiSpinner:
    props:
      label: 'Accessible name. When set, it is announced with `role="status"`. Omit it when nearby text already says something is loading.'
      size: 'Size. Numbers are in px.'
  UiSkeleton:
    props:
      lines: 'Number of lines. The last line is shorter so the block reads as a paragraph.'
      width: 'Width.'
      height: 'Height of each line.'
---

# Loading & Empty

Components that show loading, empty, and error states.

## UiListStatus

Shows the loading, empty, or error state of a list in a single line of text.

<DocsDemo name="UiListStatus" />

### Code

<<< ../demos/UiListStatus.vue{vue}

### Usage

Choose `kind` from `loading`, `empty`, and `error`, and pass the text as `message`. `loading` shows a spinner before the text, and `error` shows a retry button. To show an empty state more prominently with a heading and actions, use [UiEmptyState](#uiemptystate).

### Accessibility

`loading` uses `role="status"` and `error` uses `role="alert"`, so changes are announced. `empty` gets no role.

### API

<DocsApi name="UiListStatus" />

## UiEmptyState

Guidance shown when a list or search has nothing to show. It groups a heading, description, and next steps.

<DocsDemo name="UiEmptyState" />

### Code

<<< ../demos/UiEmptyState.vue{vue}

### Usage

Use the heading to say what is missing. If there is a next step, such as "Create new", put a button in the `actions` slot.

### Accessibility

The heading renders at `headingLevel`, so choose a level that fits the page structure. The icon is decorative and hidden from screen readers.

### API

<DocsApi name="UiEmptyState" />

## UiSpinner

A spinning circle that shows something is in progress.

<DocsDemo name="UiSpinner" />

### Code

<<< ../demos/UiSpinner.vue{vue}

### Usage

By default it matches the text size and uses the text color. For a button's busy state, use UiButton's `loading`. It stops spinning when `prefers-reduced-motion` is on, without base.css.

### Accessibility

With `label`, it is announced with `role="status"`. When nearby text already says something is loading, such as "Loading…" next to it, omit `label` and treat the spinner as decorative.

### API

<DocsApi name="UiSpinner" />

## UiSkeleton

Shows the shape of content that is still loading, so the layout does not shift when it arrives.

<DocsDemo name="UiSkeleton" />

### Code

<<< ../demos/UiSkeleton.vue{vue}

### Usage

For text, set the number of lines with `lines`; the last line is shorter. For images and cards, set the shape with `width` and `height`. It has no animation.

### Accessibility

It is hidden from screen readers, so say that content is loading with `aria-busy` or text on a nearby element.

### API

<DocsApi name="UiSkeleton" />
