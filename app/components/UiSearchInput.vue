<script setup lang="ts">
import { shallowRef } from 'vue'
import { useUiConfig } from '../lib/config'
import { useFieldContext } from '../lib/field'
import UiButton from './UiButton.vue'
import UiInput from './UiInput.vue'

withDefaults(
  defineProps<{
    /** Accessible name when the input is not inside a UiField. */
    label?: string
    clearLabel?: string
    size?: 'md' | 'sm'
    id?: string
    disabled?: boolean
  }>(),
  { label: undefined, clearLabel: undefined, size: 'md', id: undefined, disabled: undefined },
)
const emit = defineEmits<{ clear: [] }>()
const model = defineModel<string>({ default: '' })

const ui = useUiConfig()
const field = useFieldContext()
const input = shallowRef<InstanceType<typeof UiInput> | null>(null)

function clear() {
  model.value = ''
  emit('clear')
  input.value?.focus()
}

defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
  <UiInput
    :id="id"
    ref="input"
    v-model="model"
    class="ui-search-input"
    type="search"
    icon="search"
    :size="size"
    :disabled="disabled"
    :aria-label="field ? undefined : (label ?? ui.messages.form.search)"
  >
    <template #trailing>
      <UiButton
        v-if="model"
        class="ui-search-input__clear"
        variant="ghost"
        size="sm"
        icon="close"
        :label="clearLabel ?? ui.messages.form.clear"
        @click="clear"
      />
    </template>
  </UiInput>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-search-input :deep(.ui-input__box) {
  padding-inline: 14px 4px;
  border-radius: 999px;
}
.ui-search-input__clear {
  min-height: 32px;
  border: 0;
  border-radius: 999px;
}
</style>
