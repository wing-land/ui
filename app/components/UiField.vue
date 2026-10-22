<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'
import { useUiConfig, type UiRequiredIndicator } from '../lib/config'
import { joinIds, provideField, type UiFieldSlotProps } from '../lib/field'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    label: string
    description?: string
    /** One message or several. Empty values show no error. */
    error?: string | readonly string[] | null
    required?: boolean
    disabled?: boolean
    /** Id of the control. Generated when omitted. */
    id?: string
    /**
     * Renders a `fieldset` and `legend` for a set of controls such as checkboxes.
     * `radiogroup` also exposes the required and invalid state on the group.
     */
    group?: boolean | 'radiogroup'
    hideLabel?: boolean
    requiredIndicator?: UiRequiredIndicator
  }>(),
  {
    description: undefined,
    error: undefined,
    id: undefined,
    group: false,
    requiredIndicator: undefined,
  },
)
defineSlots<{
  default?: (props: UiFieldSlotProps) => unknown
  label?: () => unknown
  description?: () => unknown
}>()

const ui = useUiConfig()
const generatedId = useId()
const descriptionId = `${generatedId}-description`
const errorId = `${generatedId}-error`
const controlId = computed(() => props.id ?? `${generatedId}-control`)
const errors = computed(() =>
  (typeof props.error === 'string' ? [props.error] : (props.error ?? [])).filter(Boolean),
)
const invalid = computed(() => errors.value.length > 0)
const indicator = computed(() => props.requiredIndicator ?? ui.value.requiredIndicator)
const slots = useSlots()
const describedBy = computed(() =>
  joinIds((props.description || slots.description) && descriptionId, invalid.value && errorId),
)
const slotProps = computed<UiFieldSlotProps>(() => ({
  id: controlId.value,
  describedBy: describedBy.value,
  invalid: invalid.value,
  required: props.required,
  disabled: props.disabled,
}))

// Controls inside a group are separate inputs, so only a single-control field shares its id.
provideField(
  props.group
    ? null
    : {
        id: controlId,
        describedBy,
        invalid,
        required: computed(() => props.required),
        disabled: computed(() => props.disabled),
      },
)
</script>

<template>
  <component
    :is="group ? 'fieldset' : 'div'"
    class="ui-field"
    :class="{ 'ui-field--invalid': invalid, 'ui-field--group': group }"
    :role="group === 'radiogroup' ? 'radiogroup' : undefined"
    :aria-describedby="group ? describedBy : undefined"
    :aria-required="group === 'radiogroup' && required ? 'true' : undefined"
    :aria-invalid="group === 'radiogroup' && invalid ? 'true' : undefined"
    :disabled="group ? disabled || undefined : undefined"
  >
    <component
      :is="group ? 'legend' : 'label'"
      class="ui-field__label"
      :class="{ 'is-visually-hidden': hideLabel }"
      :for="group ? undefined : controlId"
      ><slot name="label">{{ label }}</slot
      ><span
        v-if="required"
        class="ui-field__required"
        :class="`ui-field__required--${indicator}`"
        :aria-hidden="group ? undefined : 'true'"
        >{{ indicator === 'asterisk' ? '*' : ui.messages.form.required }}</span
      ></component
    >
    <p v-if="description || $slots.description" :id="descriptionId" class="ui-field__description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div class="ui-field__control"><slot v-bind="slotProps" /></div>
    <div v-if="invalid" :id="errorId" class="ui-field__error">
      <p v-for="message in errors" :key="message">
        <UiIcon name="error" class="ui-field__error-icon" />{{ message }}
      </p>
    </div>
  </component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-field {
  display: grid;
  gap: 6px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;

  & + & {
    margin-top: var(--space-6);
  }
}
.ui-field__label {
  padding: 0;
  margin-bottom: 2px;
  font-weight: 600;
  line-height: 1.5;
}
.ui-field--group > .ui-field__label {
  margin-bottom: 8px;
}
.ui-field__required {
  margin-inline-start: var(--space-2);
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 400;
  vertical-align: 1px;

  &--asterisk {
    margin-inline-start: 2px;
    color: var(--color-danger);
    font-size: inherit;
    font-weight: 600;
    vertical-align: 0;
  }
}
.ui-field__description {
  margin: 0;
  color: var(--color-muted);
  font-size: var(--font-size-small);
  line-height: 1.6;
}
.ui-field__control {
  min-width: 0;
}
.ui-field__error {
  color: var(--color-danger);
  font-size: var(--font-size-small);
  line-height: 1.6;

  p {
    display: flex;
    gap: 6px;
    margin: 0;
  }
}
.ui-field__error-icon {
  margin-top: 0.3em;
}
// Last, so it wins ties with the rules above on the same element.
.is-visually-hidden {
  @include component-base.visually-hidden;
}
</style>
