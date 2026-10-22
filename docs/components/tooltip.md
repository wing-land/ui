---
api:
  UiTooltip:
    props:
      text: 'Hint text.'
      side: 'Side of the trigger to open on. Opens on the other side when there is no room.'
      delay: 'Time in milliseconds between hover and showing the tooltip. It shows right away on focus.'
      disabled: 'Prevents the tooltip from showing.'
    slots:
      default: 'The trigger. Place one focusable element, such as a button or link.'
---

# Tooltip

## UiTooltip

Shows a short hint about its trigger on hover or keyboard focus.

<DocsDemo name="UiTooltip" />

### Code

<<< ../demos/UiTooltip.vue{vue}

### Usage

On hover it appears after a short wait; on keyboard focus it appears right away. It does not show on touch devices, so do not put information needed to use the UI in it. For icon-only buttons, pass the name to UiButton's `label` and use the tooltip for extra hints.

### Accessibility

The hint is linked to the trigger with `aria-describedby` and read as the trigger's description. Escape closes it. Built on the Reka UI Tooltip.

### API

<DocsApi name="UiTooltip" />
