<script setup lang="ts">
import type { UiIconName } from '../lib/icons'
import UiIcon from './UiIcon.vue'

withDefaults(
  defineProps<{
    /** `accent` adds a colored bar at the start, `outline` keeps only the border, `subtle` fills the box. */
    variant?: 'accent' | 'outline' | 'subtle'
    icon?: UiIconName
  }>(),
  { variant: 'accent', icon: undefined },
)
defineSlots<{ default?: () => unknown }>()
</script>

<template>
  <aside class="ui-note" :class="[`ui-note--${variant}`, { 'ui-note--with-icon': icon }]">
    <template v-if="icon">
      <UiIcon class="ui-note__icon" :name="icon" />
      <div class="ui-note__body"><slot /></div>
    </template>
    <slot v-else />
  </aside>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-note {
  --ui-note-padding: 24px;

  padding: var(--ui-note-padding);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  margin-block: 32px;

  @media (max-width: 600px) {
    --ui-note-padding: 20px;
  }
}
// The bar is 3px wider than the other borders, so take it out of the padding to keep the
// content the same distance from every edge.
.ui-note--accent {
  border-inline-start: 4px solid var(--color-accent);
  padding-inline-start: calc(var(--ui-note-padding) - 3px);
}
.ui-note--subtle {
  border-color: transparent;
  background: var(--color-surface);
}
.ui-note--with-icon {
  display: flex;
  gap: 12px;
}
.ui-note__icon {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 0.2em;
  color: var(--color-muted);

  .ui-note--accent & {
    color: var(--color-accent);
  }
}
.ui-note__body {
  flex: 1;
  min-width: 0;
}
</style>
