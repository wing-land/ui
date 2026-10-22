<script setup lang="ts">
import { ToolbarRoot } from 'reka-ui'

withDefaults(
  defineProps<{
    /** Accessible name, such as "Formatting". */
    label: string
    orientation?: 'horizontal' | 'vertical'
    /** Moves focus from the last control back to the first with the arrow keys. */
    loop?: boolean
  }>(),
  { orientation: 'horizontal', loop: true },
)
defineSlots<{ default?: () => unknown }>()
</script>

<template>
  <ToolbarRoot
    class="ui-toolbar"
    :class="`ui-toolbar--${orientation}`"
    :aria-label="label"
    :orientation="orientation"
    :loop="loop"
  >
    <slot />
  </ToolbarRoot>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);

  &--vertical {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
