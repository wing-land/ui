<script setup lang="ts">
import { useUiConfig } from '../lib/config'
import UiButton from './UiButton.vue'
import UiSpinner from './UiSpinner.vue'

defineProps<{
  kind: 'error' | 'loading' | 'empty'
  message: string
  bordered?: boolean
  retryLabel?: string
  retryDisabled?: boolean
}>()
defineEmits<{ retry: [] }>()
const ui = useUiConfig()
</script>

<template>
  <div
    class="ui-list-status"
    :class="{ 'ui-list-status--bordered': bordered, 'ui-list-status--error': kind === 'error' }"
    :role="kind === 'error' ? 'alert' : kind === 'loading' ? 'status' : undefined"
  >
    <p><UiSpinner v-if="kind === 'loading'" class="ui-list-status__spinner" />{{ message }}</p>
    <UiButton v-if="kind === 'error'" :disabled="retryDisabled" @click="$emit('retry')">{{
      retryLabel ?? ui.messages.common.retry
    }}</UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-list-status {
  color: var(--color-muted);

  &--bordered {
    padding: 24px 8px;
    border-top: 1px solid var(--color-line);
  }

  &--error p {
    margin-bottom: 16px;
  }
}
p {
  margin: 0;
}
.ui-list-status__spinner {
  margin-inline-end: var(--space-2);
}
</style>
