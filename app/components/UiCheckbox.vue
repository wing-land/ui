<script setup lang="ts">
import { computed, shallowRef, useAttrs, useId, watchEffect } from 'vue'
import { useFieldControl } from '../lib/field'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    id?: string
    required?: boolean
    disabled?: boolean
    invalid?: boolean
    /** Shows a mixed state, for example when only some items below are selected. */
    indeterminate?: boolean
  }>(),
  {
    label: undefined,
    description: undefined,
    id: undefined,
    required: undefined,
    disabled: undefined,
    invalid: undefined,
  },
)
defineOptions({ inheritAttrs: false })
defineSlots<{ default?: () => unknown }>()
const model = defineModel<boolean>({ default: false })

const attrs = useAttrs()
const descriptionId = useId()
const control = useFieldControl(props, () => (props.description ? descriptionId : undefined))
const input = shallowRef<HTMLInputElement | null>(null)
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

watchEffect(() => {
  if (input.value) input.value.indeterminate = props.indeterminate
})
</script>

<template>
  <div class="ui-checkbox" v-bind="rootAttrs">
    <input
      v-bind="inputAttrs"
      :id="control.id.value"
      ref="input"
      v-model="model"
      class="ui-checkbox__input"
      type="checkbox"
      :required="control.required.value"
      :disabled="control.disabled.value"
      :aria-invalid="control.invalid.value ? 'true' : undefined"
      :aria-describedby="control.describedBy.value"
    />
    <div class="ui-checkbox__text">
      <label :for="control.id.value" class="ui-checkbox__label"
        ><slot>{{ label }}</slot></label
      >
      <p v-if="description" :id="descriptionId" class="ui-checkbox__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/choice';

@include component-base.base;

.ui-checkbox {
  @include choice.row;
}
.ui-checkbox__input {
  @include choice.native;
}
.ui-checkbox__text {
  @include choice.text;
}
.ui-checkbox__label {
  @include choice.label;
}
.ui-checkbox__description {
  @include choice.description;
}
</style>
