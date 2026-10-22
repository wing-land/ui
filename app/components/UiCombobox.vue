<script setup lang="ts">
import { computed } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import { useUiConfig } from '../lib/config'
import { useFieldControl } from '../lib/field'
import type { UiIconName } from '../lib/icons'
import type { UiChoiceOption } from '../lib/types'
import UiIcon from './UiIcon.vue'
import UiSpinner from './UiSpinner.vue'

const props = withDefaults(
  defineProps<{
    items: readonly (string | UiChoiceOption)[]
    id?: string
    placeholder?: string
    icon?: UiIconName
    /** Filters `items` by the typed text. Turn it off when the server filters, and watch `search`. */
    filter?: boolean
    loading?: boolean
    emptyText?: string
    required?: boolean
    disabled?: boolean
    invalid?: boolean
  }>(),
  {
    id: undefined,
    placeholder: undefined,
    icon: undefined,
    filter: true,
    emptyText: undefined,
    required: undefined,
    disabled: undefined,
    invalid: undefined,
  },
)
const model = defineModel<string | null>({ default: null })
const search = defineModel<string>('search', { default: '' })
const open = defineModel<boolean>('open', { default: false })

const ui = useUiConfig()
const control = useFieldControl(props)
const options = computed(() =>
  props.items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item)),
)
function labelOf(value: unknown) {
  return options.value.find((option) => option.value === value)?.label ?? ''
}
</script>

<template>
  <ComboboxRoot
    v-model="model"
    v-model:open="open"
    class="ui-combobox"
    :ignore-filter="!filter"
    :disabled="control.disabled.value"
    :reset-search-term-on-blur="false"
  >
    <ComboboxAnchor
      class="ui-combobox__box"
      :class="{ 'is-invalid': control.invalid.value, 'is-disabled': control.disabled.value }"
    >
      <UiIcon v-if="icon" class="ui-combobox__icon" :name="icon" />
      <ComboboxInput
        :id="control.id.value"
        v-model="search"
        class="ui-combobox__input"
        :placeholder="placeholder"
        :display-value="labelOf"
        :required="control.required.value"
        :aria-invalid="control.invalid.value ? 'true' : undefined"
        :aria-describedby="control.describedBy.value"
      />
      <UiSpinner v-if="loading" :size="16" />
      <ComboboxTrigger class="ui-combobox__trigger" tabindex="-1">
        <UiIcon name="chevron-down" />
      </ComboboxTrigger>
    </ComboboxAnchor>
    <ComboboxPortal>
      <ComboboxContent
        class="ui-combobox__content"
        position="popper"
        :side-offset="4"
        :collision-padding="8"
      >
        <ComboboxViewport class="ui-combobox__viewport">
          <ComboboxEmpty v-if="!loading" class="ui-combobox__status">{{
            emptyText ?? ui.messages.combobox.empty
          }}</ComboboxEmpty>
          <p v-else-if="!options.length" class="ui-combobox__status">
            {{ ui.messages.common.loading }}
          </p>
          <ComboboxItem
            v-for="option in options"
            :key="option.value"
            class="ui-combobox__item"
            :value="option.value"
            :text-value="option.label"
            :disabled="option.disabled"
          >
            <span class="ui-combobox__text"
              >{{ option.label
              }}<span v-if="option.description" class="ui-combobox__description">{{
                option.description
              }}</span></span
            >
            <ComboboxItemIndicator><UiIcon name="check" /></ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<!-- Not scoped: Reka UI teleports these panels, so the scoped attribute does not reach them. -->
<style lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/control';
@use '../assets/scss/floating';

@include component-base.base("[class*='ui-combobox']");

.ui-combobox__box {
  @include control.box;

  padding-inline-end: 0;
}
.ui-combobox__icon {
  color: var(--color-muted);
}
.ui-combobox__input {
  @include control.native;

  align-self: stretch;
}
.ui-combobox__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 36px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
}
.ui-combobox__content {
  @include floating.panel;

  width: var(--reka-combobox-trigger-width);
  max-width: calc(100vw - 16px);
  max-height: min(320px, var(--reka-combobox-content-available-height));
  overflow-y: auto;
}
.ui-combobox__viewport {
  padding: 4px;
}
.ui-combobox__item {
  @include floating.item;

  justify-content: space-between;
}
.ui-combobox__text {
  display: grid;
}
.ui-combobox__description {
  color: var(--color-muted);
  font-size: 12px;
}
.ui-combobox__status {
  margin: 0;
  padding: 8px 10px;
  color: var(--color-muted);
  font-size: var(--font-size-small);
}
</style>
