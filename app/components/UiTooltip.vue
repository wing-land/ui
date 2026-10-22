<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'

withDefaults(
  defineProps<{
    /** Extra description of the trigger. It is not shown on touch screens, so keep it non-essential. */
    text: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    /** Milliseconds before the tooltip opens on hover. Keyboard focus opens it at once. */
    delay?: number
    disabled?: boolean
  }>(),
  { side: 'top', delay: 400 },
)
defineSlots<{ default?: () => unknown }>()
</script>

<template>
  <TooltipProvider :delay-duration="delay" :disabled="disabled">
    <TooltipRoot>
      <TooltipTrigger as-child><slot /></TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="ui-tooltip" :side="side" :side-offset="6" :collision-padding="8">
          {{ text }}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<!-- Not scoped: Reka UI teleports these panels, so the scoped attribute does not reach them. -->
<style lang="scss">
@use '../assets/scss/component-base';

@include component-base.base('.ui-tooltip');

.ui-tooltip {
  z-index: var(--z-toast);
  max-width: min(280px, calc(100vw - 16px));
  padding: 4px 8px;
  border-radius: var(--radius-control);
  background: var(--color-text);
  color: var(--color-canvas);
  font-size: 12px;
  line-height: 1.5;
}
</style>
