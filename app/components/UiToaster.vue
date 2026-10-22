<script setup lang="ts">
import { ToastPortal, ToastProvider, ToastViewport } from 'reka-ui'
import { useUiConfig } from '../lib/config'
import { useToastManagerInstance } from '../lib/toast'
import UiToastList from './internal/UiToastList.vue'

withDefaults(
  defineProps<{
    /** Default milliseconds before a toast closes. */
    duration?: number
    /** Toasts beyond this number are hidden until earlier ones close. */
    limit?: number
    position?: 'bottom-end' | 'bottom-center' | 'top-end' | 'top-center'
  }>(),
  { duration: 5000, limit: 3, position: 'bottom-end' },
)
const ui = useUiConfig()
const manager = useToastManagerInstance()
</script>

<template>
  <ToastProvider
    :toast-manager="manager"
    :label="ui.messages.toast.label"
    :duration="duration"
    :limit="limit"
    swipe-direction="right"
  >
    <UiToastList />
    <ToastPortal>
      <ToastViewport
        class="ui-toaster"
        :class="`ui-toaster--${position}`"
        :label="ui.messages.toast.region"
      />
    </ToastPortal>
  </ToastProvider>
</template>

<!-- Not scoped: Reka UI teleports these panels, so the scoped attribute does not reach them. -->
<style lang="scss">
@use '../assets/scss/component-base';

@include component-base.base('.ui-toaster');

.ui-toaster {
  position: fixed;
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: min(380px, calc(100vw - 32px));
  max-height: 100dvh;
  margin: 0;
  padding: var(--space-4);
  list-style: none;
  outline: none;

  &--bottom-end {
    right: 0;
    bottom: 0;
    flex-direction: column-reverse;
  }

  &--bottom-center {
    bottom: 0;
    left: 50%;
    flex-direction: column-reverse;
    transform: translateX(-50%);
  }

  &--top-end {
    top: 0;
    right: 0;
  }

  &--top-center {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:empty {
    padding: 0;
  }
}
</style>
