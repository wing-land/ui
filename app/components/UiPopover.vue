<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

withDefaults(
  defineProps<{
    /** Accessible name of the panel. Use it when the panel has no heading. */
    label?: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    /** Traps focus and hides the rest of the page from assistive technology while open. */
    modal?: boolean
  }>(),
  { label: undefined, side: 'bottom', align: 'start' },
)
defineSlots<{ trigger?: () => unknown; default?: (props: { close: () => void }) => unknown }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <PopoverRoot v-model:open="open" :modal="modal">
    <PopoverTrigger as-child><slot name="trigger" /></PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="ui-popover"
        :side="side"
        :align="align"
        :side-offset="6"
        :collision-padding="8"
        :aria-label="label"
      >
        <slot :close="() => (open = false)" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<!-- Not scoped: Reka UI teleports these panels, so the scoped attribute does not reach them. -->
<style lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/floating';

@include component-base.base('.ui-popover');

.ui-popover {
  @include floating.panel;

  padding: var(--space-3) var(--space-4);
}
</style>
