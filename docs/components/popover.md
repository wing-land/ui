---
api:
  UiPopover:
    props:
      label: 'Accessible name of the panel. Use it when the panel has no heading.'
      side: 'Side of the trigger to open on. Opens on the other side when there is no room.'
      align: 'Alignment relative to the trigger.'
      modal: 'While open, keeps focus inside the panel and hides the rest of the page from screen readers.'
      open: 'Whether the panel is open.'
    slots:
      trigger: 'Button that opens and closes the panel. Place one component that renders a button element, such as UiButton.'
      default: 'Panel content. `close` closes the panel.'
---

# Popover

## UiPopover

A panel that floats next to its trigger. Use it to hold short controls, such as filter conditions or simple settings.

<DocsDemo name="UiPopover" />

### Code

<<< ../demos/UiPopover.vue{vue}

### Usage

Put the trigger button in the `trigger` slot and the panel content in the default slot. To close the panel from inside, call `close` from the slot props. For a list of actions only, use [UiDropdownMenu](./dropdown-menu.md#uidropdownmenu); for a short hint only, use [UiTooltip](./tooltip.md#uitooltip).

### Accessibility

Renders the panel with `role="dialog"`, and the trigger reports the open state with `aria-expanded`. Escape and an outside click close the panel and return focus to the trigger. Built on the Reka UI Popover.

### API

<DocsApi name="UiPopover" />
