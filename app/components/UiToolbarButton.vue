<script setup lang="ts">
import { ToolbarButton } from 'reka-ui'
import type { UiIconName } from '../lib/icons'
import UiButton from './UiButton.vue'

const props = withDefaults(
  defineProps<{
    icon?: UiIconName
    /** Accessible name. Required when the button shows only an icon. */
    label?: string
    /** Makes the button a toggle, such as bold. Leave it unset for plain actions. */
    pressed?: boolean
    disabled?: boolean
  }>(),
  { icon: undefined, label: undefined, pressed: undefined },
)
const emit = defineEmits<{ 'update:pressed': [value: boolean]; click: [event: MouseEvent] }>()
defineSlots<{ default?: () => unknown }>()

function onClick(event: MouseEvent) {
  if (props.pressed !== undefined) emit('update:pressed', !props.pressed)
  emit('click', event)
}
</script>

<template>
  <ToolbarButton as-child :disabled="disabled">
    <UiButton
      class="ui-toolbar-button"
      :class="{ 'is-pressed': pressed }"
      variant="ghost"
      size="sm"
      :icon="icon"
      :label="label"
      :aria-pressed="pressed === undefined ? undefined : String(pressed)"
      @click="onClick"
    >
      <template v-if="$slots.default" #default><slot /></template>
    </UiButton>
  </ToolbarButton>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-toolbar-button.is-pressed {
  background: var(--color-surface);
  color: var(--color-accent);
}
</style>
