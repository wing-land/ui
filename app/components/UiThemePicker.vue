<script setup lang="ts">
import { computed, nextTick, shallowRef, useId } from 'vue'
import { useUiConfig } from '../lib/config'
import { useDismiss } from '../lib/dismiss'
import type { ThemeLabels } from '../lib/types'
import UiIcon from './UiIcon.vue'

const props = defineProps<{ modelValue: string; labels?: Partial<ThemeLabels> }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const ui = useUiConfig()
const text = computed<ThemeLabels>(() => ({ ...ui.value.messages.theme, ...props.labels }))
const panelId = useId()
const open = shallowRef(false)
const root = shallowRef<HTMLElement | null>(null)
const trigger = shallowRef<HTMLButtonElement | null>(null)
const options = [
  { value: 'system', label: 'system', icon: 'monitor' },
  { value: 'light', label: 'light', icon: 'sun' },
  { value: 'dark', label: 'dark', icon: 'moon' },
] as const
const selected = computed(
  () => options.find((option) => option.value === props.modelValue) || options[0]!,
)
useDismiss({ open, inside: root, returnFocusTo: trigger })
async function focusSelection() {
  open.value = true
  await nextTick()
  root.value?.querySelector<HTMLInputElement>('input:checked')?.focus()
}
</script>

<template>
  <div ref="root" class="theme-control ui-theme-picker">
    <button
      ref="trigger"
      type="button"
      :aria-label="`${text.theme} (${text.current}: ${text[selected.label]})`"
      :aria-expanded="open"
      :aria-controls="open ? panelId : undefined"
      @click="open = !open"
      @keydown.down.prevent="focusSelection()"
    >
      <UiIcon :name="selected.icon" />
    </button>
    <div v-if="open" :id="panelId" class="theme-panel">
      <fieldset>
        <legend>{{ text.theme }}</legend>
        <label v-for="option in options" :key="option.value">
          <input
            :checked="selected.value === option.value"
            type="radio"
            :name="panelId"
            :value="option.value"
            @change="emit('update:modelValue', option.value)"
          />
          <UiIcon :name="option.icon" />
          <span class="theme-option-text">{{ text[option.label] }}</span>
          <UiIcon v-if="selected.value === option.value" class="theme-option-check" name="check" />
        </label>
      </fieldset>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/floating';

@include component-base.base;

.theme-control {
  position: relative;
  width: fit-content;
}
button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  background: transparent;
  cursor: pointer;

  &:hover,
  &[aria-expanded='true'] {
    background: var(--color-surface);
  }

  .ui-icon {
    width: 22px;
    height: 22px;
    stroke-width: 1.7;
  }
}
.theme-panel {
  @include floating.panel;

  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 180px;
  padding: 4px;
}
fieldset {
  display: grid;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
// Same as the label row of UiDropdownMenu.
legend {
  padding: 6px 10px 2px;
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
}
label {
  @include floating.item;

  position: relative;

  &:hover {
    background: var(--color-surface);
  }

  &:has(:focus-visible) {
    outline: var(--focus-ring-width) solid var(--color-accent);
    outline-offset: -2px;
  }
}
// The radio stays in the row for keyboard and screen readers; the check icon shows the choice.
input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.theme-option-text {
  flex: 1;
}
.theme-option-check {
  color: var(--color-accent);
}
</style>
