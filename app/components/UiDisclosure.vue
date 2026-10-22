<script setup lang="ts">
import { shallowRef } from 'vue'
import UiIcon from './UiIcon.vue'

withDefaults(
  defineProps<{
    summary?: string
    /** `bordered` frames each item, `divided` draws lines above and below, `plain` has no lines. */
    variant?: 'bordered' | 'divided' | 'plain'
  }>(),
  { summary: undefined, variant: 'bordered' },
)
defineSlots<{ default?: () => unknown; summary?: () => unknown }>()
const open = defineModel<boolean>('open', { default: false })
const details = shallowRef<HTMLDetailsElement | null>(null)

// A native `details` opens and closes even before JavaScript runs; the model follows it.
function onToggle() {
  if (details.value) open.value = details.value.open
}
</script>

<template>
  <details
    ref="details"
    class="ui-disclosure"
    :class="`ui-disclosure--${variant}`"
    :open="open"
    @toggle="onToggle"
  >
    <summary class="ui-disclosure__summary">
      <UiIcon class="ui-disclosure__icon" name="chevron-right" /><slot name="summary">{{
        summary
      }}</slot>
    </summary>
    <div class="ui-disclosure__content"><slot /></div>
  </details>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-disclosure__summary {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: var(--control-min);
  cursor: pointer;
  font-weight: 600;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    color: var(--color-accent);
  }
}
.ui-disclosure__icon {
  flex: none;

  [open] > .ui-disclosure__summary > & {
    transform: rotate(90deg);
  }
}
.ui-disclosure__content {
  padding: 0 0 var(--space-4) calc(1em + 6px);
}
.ui-disclosure--bordered {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);

  & + & {
    margin-top: var(--space-2);
  }

  > .ui-disclosure__summary {
    padding-inline: var(--space-3);

    // Inside the frame, so the ring does not overlap the next item.
    &:focus-visible {
      outline-offset: -2px;
    }
  }

  &[open] > .ui-disclosure__summary {
    border-bottom: 1px solid var(--color-line);
  }

  > .ui-disclosure__content {
    padding: var(--space-3) var(--space-4) var(--space-4);
  }
}
.ui-disclosure--divided {
  border-block: 1px solid var(--color-line);

  // Neighbors share one line.
  & + & {
    margin-top: -1px;
  }

  > .ui-disclosure__summary {
    padding-inline: var(--space-1);
  }
}
</style>
