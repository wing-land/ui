<script setup lang="ts">
import { computed, useId } from 'vue'
import type { UiRequiredIndicator } from '../lib/config'
import type { UiChoiceOption } from '../lib/types'
import UiField from './UiField.vue'

const props = withDefaults(
  defineProps<{
    items: readonly (string | UiChoiceOption)[]
    label: string
    description?: string
    error?: string | readonly string[] | null
    required?: boolean
    disabled?: boolean
    /** Form field name. Generated when omitted. */
    name?: string
    orientation?: 'vertical' | 'horizontal'
    requiredIndicator?: UiRequiredIndicator
  }>(),
  {
    description: undefined,
    error: undefined,
    name: undefined,
    orientation: 'vertical',
    requiredIndicator: undefined,
  },
)
const model = defineModel<string | null>({ default: null })

const id = useId()
const groupName = computed(() => props.name ?? id)
const options = computed(() =>
  props.items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item)),
)
</script>

<template>
  <UiField
    class="ui-radio-group"
    :class="`ui-radio-group--${orientation}`"
    group="radiogroup"
    :label="label"
    :description="description"
    :error="error"
    :required="required"
    :disabled="disabled"
    :required-indicator="requiredIndicator"
  >
    <div class="ui-radio-group__items">
      <div v-for="(option, index) in options" :key="option.value" class="ui-radio">
        <input
          :id="`${id}-${index}`"
          v-model="model"
          class="ui-radio__input"
          type="radio"
          :name="groupName"
          :value="option.value"
          :required="required"
          :disabled="option.disabled"
          :aria-describedby="option.description ? `${id}-${index}-description` : undefined"
        />
        <div class="ui-radio__text">
          <label :for="`${id}-${index}`" class="ui-radio__label">{{ option.label }}</label>
          <p
            v-if="option.description"
            :id="`${id}-${index}-description`"
            class="ui-radio__description"
          >
            {{ option.description }}
          </p>
        </div>
      </div>
    </div>
  </UiField>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/choice';

@include component-base.base;

.ui-radio-group--horizontal .ui-radio-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-6);
}
.ui-radio {
  @include choice.row;
}
.ui-radio__input {
  @include choice.native;
}
.ui-radio__text {
  @include choice.text;
}
.ui-radio__label {
  @include choice.label;
}
.ui-radio__description {
  @include choice.description;
}
</style>
