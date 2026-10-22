<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../lib/config'
import type { UiToggleGroupItem } from '../lib/types'

const props = withDefaults(
  defineProps<{
    items: readonly (string | UiToggleGroupItem)[]
    /** Accessible name of the group. */
    label: string
    multiple?: boolean
    /** Adds a first button that clears the selection. Pass a string to change its text. */
    allOption?: boolean | string
  }>(),
  { allOption: false },
)
const selected = defineModel<string | null | readonly string[]>({ required: true })
const ui = useUiConfig()

const options = computed(() =>
  props.items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item)),
)
const allLabel = computed(() =>
  typeof props.allOption === 'string' ? props.allOption : ui.value.messages.common.all,
)
const selectedValues = computed<readonly string[]>(() => {
  const value = selected.value
  if (Array.isArray(value)) return value
  return typeof value === 'string' ? [value] : []
})

function isSelected(value: string) {
  return selectedValues.value.includes(value)
}

function toggle(value: string) {
  if (!props.multiple) {
    selected.value = value
    return
  }
  const values = selectedValues.value
  selected.value = values.includes(value) ? values.filter((v) => v !== value) : [...values, value]
}

function clear() {
  selected.value = props.multiple ? [] : null
}
</script>

<template>
  <div class="ui-toggle-group" role="group" :aria-label="label">
    <button
      v-if="allOption"
      type="button"
      class="ui-toggle-group__item"
      :aria-pressed="selectedValues.length === 0"
      @click="clear"
    >
      {{ allLabel }}
    </button>
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="ui-toggle-group__item"
      :aria-pressed="isSelected(option.value)"
      :disabled="option.disabled"
      @click="toggle(option.value)"
    >
      {{ option.label
      }}<span v-if="option.count !== undefined" class="ui-toggle-group__count">{{
        option.count
      }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-toggle-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.ui-toggle-group__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 6px 16px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: var(--font-size-small);
  cursor: pointer;

  &:hover {
    background: var(--color-surface);
  }

  &[aria-pressed='true'] {
    border-color: var(--color-accent);
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.ui-toggle-group__count {
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
}
</style>
