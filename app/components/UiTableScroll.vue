<script setup lang="ts">
import { useUiConfig } from '../lib/config'

withDefaults(
  defineProps<{
    label?: string
    /** `compact` styles the table itself, so it also works outside `.prose`. */
    density?: 'default' | 'compact'
  }>(),
  { label: undefined, density: 'default' },
)
const ui = useUiConfig()
</script>

<template>
  <div
    class="table-scroll ui-table-scroll"
    :class="{ 'ui-table-scroll--compact': density === 'compact' }"
    role="region"
    :aria-label="label ?? ui.messages.table.region"
    tabindex="0"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.table-scroll {
  overflow-x: auto;
  margin-block: 24px 32px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);

  // The frame closes the table, so the last row's own line would double it.
  :deep(table > :last-child > tr:last-child > :is(th, td)) {
    border-bottom: 0;
  }
}
.ui-table-scroll--compact {
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-small);
    line-height: 1.6;
  }

  :deep(:is(th, td)) {
    padding: 6px 12px;
    border: 0;
    border-bottom: 1px solid var(--color-line);
    text-align: left;
    vertical-align: top;
  }

  :deep(thead) {
    background: var(--color-surface);
  }

  :deep(th) {
    font-weight: 600;
    white-space: nowrap;
  }
}
</style>
