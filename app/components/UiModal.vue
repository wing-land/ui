<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, useId, watch } from 'vue'
import { useUiConfig } from '../lib/config'
import { lockScroll, unlockScroll } from '../lib/scroll-lock'
import UiButton from './UiButton.vue'

export type UiModalCloseReason = 'escape' | 'backdrop' | 'close-button'

const props = withDefaults(
  defineProps<{
    /** Accessible name when there is no `title`. */
    label?: string
    title?: string
    description?: string
    size?: 'small' | 'default' | 'large'
    /** `start` and `end` slide in from the side as a full-height drawer. */
    placement?: 'center' | 'start' | 'end'
    role?: 'dialog' | 'alertdialog'
    closeLabel?: string
    /** When false, Escape, the backdrop and the close button do not close the dialog. */
    dismissible?: boolean
    /** Return false to keep the dialog open, for example to confirm discarding a draft. */
    beforeClose?: (reason: UiModalCloseReason) => boolean | Promise<boolean>
  }>(),
  {
    label: undefined,
    title: undefined,
    description: undefined,
    size: 'default',
    placement: 'center',
    role: 'dialog',
    closeLabel: undefined,
    dismissible: true,
    beforeClose: undefined,
  },
)
defineOptions({ inheritAttrs: false })
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ open: []; close: [] }>()

const ui = useUiConfig()
const titleId = useId()
const descriptionId = useId()
const dialog = shallowRef<HTMLDialogElement | null>(null)
let returnFocusTo: HTMLElement | null = null
let locked = false

function show() {
  if (!dialog.value || dialog.value.open) return
  returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
  dialog.value.showModal()
  lockScroll()
  locked = true
  open.value = true
  emit('open')
}

function close() {
  dialog.value?.close()
}

async function requestClose(reason: UiModalCloseReason) {
  if (!props.dismissible) return
  if (props.beforeClose && !(await props.beforeClose(reason))) return
  close()
}

// Escape goes through the same checks as the other ways of closing.
function onCancel(event: Event) {
  event.preventDefault()
  void requestClose('escape')
}

function onClose() {
  if (locked) unlockScroll()
  locked = false
  open.value = false
  returnFocusTo?.focus()
  returnFocusTo = null
  emit('close')
}

watch(open, (value) => (value ? show() : close()))
onMounted(() => {
  if (open.value) show()
})
onBeforeUnmount(() => {
  if (locked) unlockScroll()
  locked = false
})

defineExpose({ open: show, close })
</script>

<template>
  <Teleport to="body">
    <dialog
      v-bind="$attrs"
      ref="dialog"
      class="ui-modal"
      :class="[`ui-modal--${size}`, `ui-modal--${placement}`]"
      :role="role === 'alertdialog' ? 'alertdialog' : undefined"
      :aria-label="title ? undefined : label"
      :aria-labelledby="title ? titleId : undefined"
      :aria-describedby="description ? descriptionId : undefined"
      @cancel="onCancel"
      @close="onClose"
      @click.self="requestClose('backdrop')"
    >
      <div class="ui-modal__content">
        <div class="ui-modal__toolbar">
          <div class="ui-modal__header">
            <slot name="header">
              <h2 v-if="title" :id="titleId" class="ui-modal__title">{{ title }}</h2>
            </slot>
          </div>
          <UiButton
            v-if="dismissible"
            class="ui-modal__close"
            variant="ghost"
            icon="close"
            :label="closeLabel ?? ui.messages.common.close"
            @click="requestClose('close-button')"
          />
        </div>
        <div class="ui-modal__body">
          <p v-if="description" :id="descriptionId" class="ui-modal__description">
            {{ description }}
          </p>
          <slot />
        </div>
        <div v-if="$slots.footer" class="ui-modal__footer"><slot name="footer" /></div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-modal {
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: var(--color-canvas);
  color: var(--color-text);

  &--small {
    width: min(440px, calc(100vw - 32px));
  }

  &--large {
    width: min(1200px, calc(100vw - 32px));
  }

  &--start,
  &--end {
    width: min(360px, calc(100vw - 48px));
    height: 100dvh;
    max-height: 100dvh;
    margin-block: 0;
    border-block: 0;
    border-radius: 0;

    &.ui-modal--small {
      width: min(280px, calc(100vw - 48px));
    }

    &.ui-modal--large {
      width: min(480px, calc(100vw - 48px));
    }
  }

  &--start {
    margin-inline: 0 auto;
    border-inline-start: 0;
  }

  &--end {
    margin-inline: auto 0;
    border-inline-end: 0;
  }

  &::backdrop {
    background: rgb(0 0 0 / 80%);
  }

  &__content {
    padding: 4px 16px 16px;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-min);
  }

  &__header {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
  }

  &__body {
    padding-top: var(--space-2);
  }

  &__description {
    margin: 0 0 var(--space-4);
    color: var(--color-muted);
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    padding-top: var(--space-4);
  }

  &__close {
    flex: none;
    border: 0;

    :deep(.ui-icon) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
