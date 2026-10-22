<script setup lang="ts">
import { useUiConfig } from '../lib/config'
import UiButton from './UiButton.vue'
import UiModal from './UiModal.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    tone?: 'neutral' | 'danger'
    /** Keeps the dialog open with a busy confirm button while the action runs. */
    loading?: boolean
  }>(),
  {
    description: undefined,
    confirmLabel: undefined,
    cancelLabel: undefined,
    tone: 'neutral',
  },
)
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: []; cancel: [] }>()
const ui = useUiConfig()
let confirmed = false

function confirm() {
  confirmed = true
  emit('confirm')
}

// Any close that did not come from the confirm button counts as a cancel.
function onClose() {
  if (!confirmed) emit('cancel')
  confirmed = false
}
</script>

<template>
  <UiModal
    v-model:open="open"
    class="ui-confirm-dialog"
    size="small"
    role="alertdialog"
    :title="title"
    :description="description"
    :dismissible="!loading"
    @close="onClose"
  >
    <slot />
    <template #footer>
      <UiButton autofocus :disabled="loading" @click="open = false">{{
        cancelLabel ?? ui.messages.common.cancel
      }}</UiButton>
      <UiButton variant="solid" :tone="tone" :loading="loading" @click="confirm">{{
        confirmLabel ?? ui.messages.common.confirm
      }}</UiButton>
    </template>
  </UiModal>
</template>
