<script setup lang="ts">
import type { UiIconName } from '../lib/icons'
import UiIcon from './UiIcon.vue'

withDefaults(
  defineProps<{
    tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    icon?: UiIconName
  }>(),
  { tone: 'neutral', icon: undefined },
)
defineSlots<{ default?: () => unknown }>()
</script>

<template>
  <span class="ui-badge" :class="`ui-badge--${tone}`">
    <UiIcon v-if="icon" :name="icon" /><slot />
  </span>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  // Tone badges are told apart by their fill; the transparent border keeps every badge the same size.
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;

  &--neutral {
    border-color: var(--color-line);
    background: var(--color-surface);
    color: var(--color-muted);
  }

  @each $tone in info, success, warning, danger {
    &--#{$tone} {
      background: var(--color-#{$tone}-surface);
      color: var(--color-#{$tone});
    }
  }
}
</style>
