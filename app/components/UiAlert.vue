<script setup lang="ts">
import { computed } from 'vue'
import type { UiIconName } from '../lib/icons'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    tone?: 'info' | 'success' | 'warning' | 'danger'
    title?: string
    /**
     * Announce the message when it appears. Danger and warning interrupt as alerts; others are
     * polite status updates. Leave it off for messages that are present when the page loads.
     */
    announce?: boolean
  }>(),
  { tone: 'info', title: undefined },
)
const icons: Record<NonNullable<typeof props.tone>, UiIconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
}
const role = computed(() => {
  if (!props.announce) return undefined
  return props.tone === 'danger' || props.tone === 'warning' ? 'alert' : 'status'
})
</script>

<template>
  <div class="ui-alert" :class="`ui-alert--${tone}`" :role="role">
    <UiIcon class="ui-alert__icon" :name="icons[tone]" />
    <div class="ui-alert__body">
      <p v-if="title || $slots.title" class="ui-alert__title">
        <slot name="title">{{ title }}</slot>
      </p>
      <div v-if="$slots.default" class="ui-alert__content"><slot /></div>
      <div v-if="$slots.actions" class="ui-alert__actions"><slot name="actions" /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid color-mix(in srgb, var(--color-info) 45%, transparent);
  border-radius: var(--radius-control);
  background: var(--color-info-surface);
  color: var(--color-text);

  &--success {
    border-color: color-mix(in srgb, var(--color-success) 45%, transparent);
    background: var(--color-success-surface);
  }

  &--warning {
    border-color: color-mix(in srgb, var(--color-warning) 45%, transparent);
    background: var(--color-warning-surface);
  }

  &--danger {
    border-color: color-mix(in srgb, var(--color-danger) 45%, transparent);
    background: var(--color-danger-surface);
  }
}
.ui-alert__icon {
  width: 20px;
  height: 20px;
  margin-top: 0.2em;
  color: var(--color-info);

  .ui-alert--success & {
    color: var(--color-success);
  }

  .ui-alert--warning & {
    color: var(--color-warning);
  }

  .ui-alert--danger & {
    color: var(--color-danger);
  }
}
.ui-alert__body {
  flex: 1;
  min-width: 0;
}
.ui-alert__title {
  margin: 0;
  font-weight: 600;
}
.ui-alert__content :deep(p) {
  margin: 0;
}
.ui-alert__title + .ui-alert__content {
  margin-top: var(--space-1);
}
.ui-alert__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
</style>
