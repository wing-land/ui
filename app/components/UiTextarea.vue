<script setup lang="ts">
import { computed, shallowRef, useAttrs, useId } from 'vue'
import { useUiConfig } from '../lib/config'
import { useFieldControl } from '../lib/field'

const props = withDefaults(
  defineProps<{
    id?: string
    rows?: number
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
    maxlength?: number
    /** Shows "length / maxlength" below the textarea. Needs `maxlength`. */
    showCount?: boolean
  }>(),
  {
    id: undefined,
    rows: 4,
    required: undefined,
    disabled: undefined,
    readonly: false,
    invalid: undefined,
    maxlength: undefined,
  },
)
defineOptions({ inheritAttrs: false })
const model = defineModel<string>({ default: '' })

const ui = useUiConfig()
const attrs = useAttrs()
const countId = useId()
const counting = computed(() => props.showCount && props.maxlength !== undefined)
const control = useFieldControl(props, () => (counting.value ? countId : undefined))
const textarea = shallowRef<HTMLTextAreaElement | null>(null)
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const textareaAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

defineExpose({ focus: () => textarea.value?.focus() })
</script>

<template>
  <div class="ui-textarea" v-bind="rootAttrs">
    <div
      class="ui-textarea__box"
      :class="{ 'is-invalid': control.invalid.value, 'is-disabled': control.disabled.value }"
    >
      <textarea
        v-bind="textareaAttrs"
        :id="control.id.value"
        ref="textarea"
        v-model="model"
        class="ui-textarea__control"
        :rows="rows"
        :required="control.required.value"
        :disabled="control.disabled.value"
        :readonly="readonly"
        :maxlength="maxlength"
        :aria-invalid="control.invalid.value ? 'true' : undefined"
        :aria-describedby="control.describedBy.value"
      />
    </div>
    <p v-if="counting" class="ui-textarea__count" :class="{ 'is-over': model.length > maxlength! }">
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

.ui-textarea__box {
  @include control.box;

  align-items: stretch;
  padding-block: 10px;
}
.ui-textarea__control {
  @include control.native;

  min-height: 3lh;
  resize: vertical;
}
.ui-textarea__count {
  @include control.count;
}
// Last, so it wins ties with the rules above on the same element.
.is-visually-hidden {
  @include component-base.visually-hidden;
}
</style>
