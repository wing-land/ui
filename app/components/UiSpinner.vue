<script setup lang="ts">
import UiVisuallyHidden from './UiVisuallyHidden.vue'

defineProps<{
  /** Announced as a status message. Omit when the surrounding text already says what is loading. */
  label?: string
  size?: string | number
}>()
</script>

<template>
  <span class="ui-spinner" :role="label ? 'status' : undefined">
    <svg
      viewBox="0 0 24 24"
      :width="size ?? '1em'"
      :height="size ?? '1em'"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle class="ui-spinner__track" cx="12" cy="12" r="9" />
      <path class="ui-spinner__arc" d="M12 3a9 9 0 0 1 9 9" />
    </svg>
    <UiVisuallyHidden v-if="label">{{ label }}</UiVisuallyHidden>
  </span>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-spinner {
  display: inline-flex;
  flex: none;
  vertical-align: -0.125em;

  svg {
    animation: ui-spinner-rotate 0.8s linear infinite;
  }
}
.ui-spinner__track {
  opacity: 0.25;
}
@keyframes ui-spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
