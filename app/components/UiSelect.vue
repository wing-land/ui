<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useFieldControl } from '../lib/field'
import type { UiSelectOption } from '../lib/types'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    options: readonly (string | UiSelectOption)[]
    id?: string
    /** First option with an empty value. It stays selectable unless the select is required. */
    placeholder?: string
    size?: 'md' | 'sm'
    required?: boolean
    disabled?: boolean
    invalid?: boolean
  }>(),
  {
    id: undefined,
    placeholder: undefined,
    size: 'md',
    required: undefined,
    disabled: undefined,
    invalid: undefined,
  },
)
defineOptions({ inheritAttrs: false })
const model = defineModel<string>({ default: '' })

const attrs = useAttrs()
const control = useFieldControl(props)
const normalized = computed(() =>
  props.options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  ),
)
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const selectAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})
</script>

<template>
  <div
    class="ui-select"
    :class="[
      `ui-select--${size}`,
      {
        'is-invalid': control.invalid.value,
        'is-disabled': control.disabled.value,
        'is-dense': size === 'sm',
        'is-placeholder': placeholder !== undefined && model === '',
      },
    ]"
    v-bind="rootAttrs"
  >
    <select
      v-bind="selectAttrs"
      :id="control.id.value"
      v-model="model"
      class="ui-select__control"
      :required="control.required.value"
      :disabled="control.disabled.value"
      :aria-invalid="control.invalid.value ? 'true' : undefined"
      :aria-describedby="control.describedBy.value"
    >
      <option v-if="placeholder !== undefined" value="" :disabled="control.required.value">
        {{ placeholder }}
      </option>
      <option
        v-for="option in normalized"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <UiIcon class="ui-select__icon" name="chevron-down" />
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/control';
@use '../assets/scss/floating';

@include component-base.base;

.ui-select {
  @include control.box;

  position: relative;
  padding-inline: 0;

  &.is-dense {
    padding-inline: 0;
  }

  &.is-placeholder .ui-select__control {
    color: var(--color-muted);
  }
}
.ui-select__control {
  @include control.native;

  align-self: stretch;
  padding-inline: 12px 36px;
  appearance: none;
  cursor: pointer;

  .is-dense & {
    padding-inline: 8px 32px;
  }
}
// Customizable select styles the open list like the other menus. Other browsers keep the
// native list, which needs no fallback.
@supports (appearance: base-select) {
  .ui-select__control,
  .ui-select__control::picker(select) {
    appearance: base-select;
  }

  .ui-select__control {
    display: flex;
    align-items: center;
    padding-block: 0;

    &::picker-icon {
      display: none;
    }

    &::picker(select) {
      margin-block: 6px;
      border: 1px solid var(--color-line);
      border-radius: var(--radius-popover);
      background: var(--color-canvas);
      color: var(--color-text);
      box-shadow: var(--shadow-popover);
      padding: 4px;
    }
  }

  option {
    @include floating.item;

    &:is(:hover, :focus-visible) {
      background: var(--color-surface);
    }

    &:checked {
      font-weight: 600;
    }

    &::checkmark {
      order: 1;
      margin-inline-start: auto;
      color: var(--color-accent);
    }

    &:disabled {
      color: var(--color-muted);
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
.ui-select__icon {
  position: absolute;
  inset-inline-end: 12px;
  color: var(--color-muted);
  pointer-events: none;

  .is-dense & {
    inset-inline-end: 8px;
  }
}
</style>
