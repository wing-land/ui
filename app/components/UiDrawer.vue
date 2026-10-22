<script setup lang="ts">
import { shallowRef } from 'vue'
import UiModal, { type UiModalCloseReason } from './UiModal.vue'

withDefaults(
  defineProps<{
    side?: 'start' | 'end'
    label?: string
    title?: string
    description?: string
    /** Width: `small` is 280px, `default` 360px and `large` 480px. */
    size?: 'small' | 'default' | 'large'
    closeLabel?: string
    dismissible?: boolean
    beforeClose?: (reason: UiModalCloseReason) => boolean | Promise<boolean>
  }>(),
  {
    side: 'start',
    label: undefined,
    title: undefined,
    description: undefined,
    size: 'default',
    closeLabel: undefined,
    dismissible: true,
    beforeClose: undefined,
  },
)
defineOptions({ inheritAttrs: false })
defineSlots<{ default?: () => unknown; header?: () => unknown; footer?: () => unknown }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ open: []; close: [] }>()
const modal = shallowRef<InstanceType<typeof UiModal> | null>(null)

defineExpose({ open: () => modal.value?.open(), close: () => modal.value?.close() })
</script>

<template>
  <UiModal
    v-bind="$attrs"
    ref="modal"
    v-model:open="open"
    class="ui-drawer"
    :placement="side"
    :label="label"
    :title="title"
    :description="description"
    :size="size"
    :close-label="closeLabel"
    :dismissible="dismissible"
    :before-close="beforeClose"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template v-if="$slots.header" #header><slot name="header" /></template>
    <slot />
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </UiModal>
</template>
