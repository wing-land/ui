<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import { useFieldControl } from '../lib/field'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    id?: string
    disabled?: boolean
    invalid?: boolean
  }>(),
  {
    label: undefined,
    description: undefined,
    id: undefined,
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
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})
</script>

<template>
  <div class="ui-switch" :class="{ 'is-disabled': control.disabled.value }" v-bind="rootAttrs">
    <span class="ui-switch__track">
      <input
        v-bind="inputAttrs"
        :id="control.id.value"
        v-model="model"
        class="ui-switch__input"
        type="checkbox"
        role="switch"
        :disabled="control.disabled.value"
        :aria-invalid="control.invalid.value ? 'true' : undefined"
        :aria-describedby="control.describedBy.value"
      />
      <span class="ui-switch__thumb" aria-hidden="true" />
    </span>
    <div class="ui-switch__text">
      <label :for="control.id.value" class="ui-switch__label"
        ><slot>{{ label }}</slot></label
      >
      <p v-if="description" :id="descriptionId" class="ui-switch__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/choice';

@include component-base.base;

.ui-switch {
  @include choice.row;
}
.ui-switch__track {
  position: relative;
  flex: none;
  width: 36px;
  height: 20px;
  margin-top: 12px;
  border: 1px solid var(--color-muted);
  border-radius: 999px;
  background: var(--color-surface);
  transition:
    background-color var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard);

  &:has(:checked) {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }

  &:has(:focus-visible) {
    outline: var(--focus-ring-width) solid var(--color-accent);
    outline-offset: 2px;
  }

  .is-disabled & {
    opacity: 0.5;
  }
}
.ui-switch__input {
  position: absolute;
  inset: -12px -4px;
  z-index: 1;
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
}
.ui-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-muted);

  :checked + & {
    left: 18px;
    background: var(--color-on-accent);
  }
}
.ui-switch__text {
  @include choice.text;
}
.ui-switch__label {
  @include choice.label;

  .is-disabled & {
    color: var(--color-muted);
    cursor: not-allowed;
  }
}
.ui-switch__description {
  @include choice.description;
}
</style>
