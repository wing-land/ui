<script setup lang="ts">
import { computed, shallowRef, useAttrs, useId } from 'vue'
import { useUiConfig } from '../lib/config'
import { useFieldControl } from '../lib/field'
import type { UiIconName } from '../lib/icons'
import UiIcon from './UiIcon.vue'

// Boolean state props default to undefined so that a surrounding UiField can supply them.
const props = withDefaults(
  defineProps<{
    id?: string
    type?:
      | 'text'
      | 'email'
      | 'url'
      | 'password'
      | 'tel'
      | 'search'
      | 'number'
      | 'date'
      | 'datetime-local'
      | 'time'
    /** `sm` is 32px for toolbars and other dense groups. */
    size?: 'md' | 'sm'
    icon?: UiIconName
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
    maxlength?: number
    /** Shows "length / maxlength" below the input. Needs `maxlength`. */
    showCount?: boolean
  }>(),
  {
    id: undefined,
    type: 'text',
    size: 'md',
    icon: undefined,
    required: undefined,
    disabled: undefined,
    readonly: false,
    invalid: undefined,
    maxlength: undefined,
  },
)
defineOptions({ inheritAttrs: false })
defineSlots<{ trailing?: () => unknown }>()
const model = defineModel<string>({ default: '' })

const ui = useUiConfig()
const attrs = useAttrs()
const countId = useId()
const counting = computed(() => props.showCount && props.maxlength !== undefined)
const control = useFieldControl(props, () => (counting.value ? countId : undefined))
const input = shallowRef<HTMLInputElement | null>(null)
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

defineExpose({ focus: () => input.value?.focus(), select: () => input.value?.select() })
</script>

<template>
  <div class="ui-input" :class="`ui-input--${size}`" v-bind="rootAttrs">
    <div
      class="ui-input__box"
      :class="{
        'is-invalid': control.invalid.value,
        'is-disabled': control.disabled.value,
        'is-dense': size === 'sm',
      }"
    >
      <UiIcon v-if="icon" class="ui-input__icon" :name="icon" />
      <input
        v-bind="inputAttrs"
        :id="control.id.value"
        ref="input"
        v-model="model"
        class="ui-input__control"
        :type="type"
        :required="control.required.value"
        :disabled="control.disabled.value"
        :readonly="readonly"
        :maxlength="maxlength"
        :aria-invalid="control.invalid.value ? 'true' : undefined"
        :aria-describedby="control.describedBy.value"
      />
      <slot name="trailing" />
    </div>
    <p v-if="counting" class="ui-input__count" :class="{ 'is-over': model.length > maxlength! }">
      <span aria-hidden="true">{{ model.length }} / {{ maxlength }}</span
      ><span :id="countId" class="is-visually-hidden">{{
        ui.messages.form.characterCount(model.length, maxlength!)
      }}</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/control';

@include component-base.base;

.ui-input__box {
  @include control.box;
}
.ui-input__control {
  @include control.native;

  align-self: stretch;

  &::-webkit-search-cancel-button {
    appearance: none;
  }
}
.ui-input__icon {
  color: var(--color-muted);
}
.ui-input__count {
  @include control.count;
}
// Last, so it wins ties with the rules above on the same element.
.is-visually-hidden {
  @include component-base.visually-hidden;
}
</style>
