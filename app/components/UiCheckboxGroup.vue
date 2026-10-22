<script setup lang="ts">
import { computed } from 'vue'
import type { UiRequiredIndicator } from '../lib/config'
import type { UiChoiceOption } from '../lib/types'
import UiCheckbox from './UiCheckbox.vue'
import UiField from './UiField.vue'

const props = withDefaults(
  defineProps<{
    items: readonly (string | UiChoiceOption)[]
    label: string
    description?: string
    error?: string | readonly string[] | null
    required?: boolean
    disabled?: boolean
    orientation?: 'vertical' | 'horizontal'
    requiredIndicator?: UiRequiredIndicator
  }>(),
  {
    description: undefined,
    error: undefined,
    orientation: 'vertical',
    requiredIndicator: undefined,
  },
)
const model = defineModel<readonly string[]>({ default: () => [] })

const options = computed(() =>
  props.items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item)),
)

// The value follows the order of `items`, not the order of clicks.
function toggle(value: string, checked: boolean) {
  const selected = new Set(model.value)
  if (checked) selected.add(value)
  else selected.delete(value)
  model.value = options.value.map((option) => option.value).filter((item) => selected.has(item))
}
</script>

<template>
  <UiField
    class="ui-checkbox-group"
    :class="`ui-checkbox-group--${orientation}`"
    group
    :label="label"
    :description="description"
    :error="error"
    :required="required"
    :disabled="disabled"
    :required-indicator="requiredIndicator"
  >
    <template #default="{ invalid }">
      <div class="ui-checkbox-group__items">
        <UiCheckbox
          v-for="option in options"
          :key="option.value"
          :model-value="model.includes(option.value)"
          :label="option.label"
          :description="option.description"
          :value="option.value"
          :disabled="option.disabled"
          :invalid="invalid"
          @update:model-value="toggle(option.value, $event)"
        />
      </div>
    </template>
  </UiField>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-checkbox-group--horizontal .ui-checkbox-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-6);
}
</style>
