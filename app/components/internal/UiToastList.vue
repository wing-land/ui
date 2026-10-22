<script setup lang="ts">
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  useToastManager,
} from 'reka-ui'
import { useUiConfig } from '../../lib/config'
import type { UiToastData, UiToastTone } from '../../lib/toast'
import type { UiIconName } from '../../lib/icons'
import UiIcon from '../UiIcon.vue'
import UiSpinner from '../UiSpinner.vue'

const ui = useUiConfig()
const { toasts } = useToastManager<UiToastData>()

const icons: Record<UiToastTone, UiIconName | undefined> = {
  neutral: undefined,
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
}

function toneOf(tone: UiToastTone | undefined, status: string | undefined): UiToastTone {
  if (tone) return tone
  if (status === 'success') return 'success'
  if (status === 'error') return 'danger'
  return 'neutral'
}
</script>

<template>
  <ToastRoot
    v-for="toast in toasts"
    :key="toast.id"
    :toast="toast"
    class="ui-toast"
    :class="[
      `ui-toast--${toneOf(toast.data?.tone, toast.status)}`,
      { 'ui-toast--single': !toast.description },
    ]"
  >
    <UiSpinner v-if="toast.status === 'loading'" class="ui-toast__icon" :size="16" />
    <UiIcon
      v-else-if="icons[toneOf(toast.data?.tone, toast.status)]"
      class="ui-toast__icon"
      :name="icons[toneOf(toast.data?.tone, toast.status)]!"
    />
    <div class="ui-toast__body">
      <ToastTitle class="ui-toast__title" />
      <ToastDescription v-if="toast.description" class="ui-toast__description" />
    </div>
    <ToastAction v-if="toast.actionProps" class="ui-toast__action" />
    <ToastClose class="ui-toast__close" :aria-label="ui.messages.common.close">
      <UiIcon name="close" />
    </ToastClose>
  </ToastRoot>
</template>

<!-- Not scoped: Reka UI teleports these panels, so the scoped attribute does not reach them. -->
<style lang="scss">
@use '../../assets/scss/component-base';

@include component-base.base("[class*='ui-toast']");

.ui-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-popover);
  background: var(--color-canvas);
  color: var(--color-text);
  box-shadow: var(--shadow-popover);
  font-size: var(--font-size-small);

  // A title-only toast is one line, so center it against the close button.
  &--single {
    align-items: center;
  }

  &[data-limited] {
    display: none;
  }

  &[data-swipe='move'] {
    transform: translateX(var(--reka-toast-swipe-move-x));
  }

  @each $tone in info, success, warning, danger {
    &--#{$tone} {
      border-color: var(--color-#{$tone});

      .ui-toast__icon {
        color: var(--color-#{$tone});
      }
    }
  }
}
.ui-toast__icon {
  flex: none;
  margin-top: 3px;

  .ui-toast--single > & {
    margin-top: 0;
  }
}
.ui-toast__body {
  flex: 1;
  min-width: 0;
}
.ui-toast__title {
  font-weight: 600;
  line-height: 1.5;
}
.ui-toast__description {
  margin-top: 2px;
  color: var(--color-muted);
  line-height: 1.6;
}
.ui-toast__action,
.ui-toast__close {
  flex: none;
  min-height: var(--control-dense);
  padding: 0 8px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:hover {
    background: var(--color-surface);
  }
}
.ui-toast__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--control-dense);
  padding: 0;
  border: 0;
}
</style>
