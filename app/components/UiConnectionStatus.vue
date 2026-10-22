<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../lib/config'
import type { UiConnectionState } from '../lib/types'

const props = defineProps<{
  status: UiConnectionState
  /** Shows only the dot. The status is still read aloud. */
  compact?: boolean
  labels?: Partial<Record<UiConnectionState, string>>
}>()
const ui = useUiConfig()
const label = computed(
  () => props.labels?.[props.status] ?? ui.value.messages.connection[props.status],
)
</script>

<template>
  <!-- role="status" announces changes, not the first state, so loading the page stays quiet. -->
  <span
    class="ui-connection-status"
    :class="[`ui-connection-status--${status}`, { 'ui-connection-status--compact': compact }]"
    role="status"
    :title="compact ? label : undefined"
  >
    <span class="ui-connection-status__dot" aria-hidden="true" /><span
      :class="{ 'is-visually-hidden': compact }"
      >{{ label }}</span
    >
  </span>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-connection-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  padding: 0 12px 0 10px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  color: var(--color-muted);
  font-size: var(--font-size-small);
  white-space: nowrap;
}
// The dot alone needs no frame.
.ui-connection-status--compact {
  min-height: 0;
  padding: 0;
  border: 0;
}
.ui-connection-status__dot {
  width: 8px;
  height: 8px;
  border: 1px solid currentcolor;
  border-radius: 50%;

  .ui-connection-status--connected & {
    border-color: var(--color-success);
    background: var(--color-success);
  }

  .ui-connection-status--connecting &,
  .ui-connection-status--reconnecting & {
    border-color: var(--color-warning);
    background: var(--color-warning-surface);
  }

  .ui-connection-status--offline & {
    border-color: var(--color-danger);
    background: transparent;
  }
}
// Last, so it wins ties with the rules above on the same element.
.is-visually-hidden {
  @include component-base.visually-hidden;
}
</style>
