import { computed, inject, provide, toValue, useId } from 'vue'
import type { ComputedRef, InjectionKey, MaybeRefOrGetter } from 'vue'

export interface UiFieldContext {
  id: ComputedRef<string>
  describedBy: ComputedRef<string | undefined>
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
}

/** Attributes a field passes to a native control through its default slot. */
export interface UiFieldSlotProps {
  id: string
  describedBy: string | undefined
  invalid: boolean
  required: boolean
  disabled: boolean
}

export interface UiFieldControlProps {
  id?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
}

const fieldKey: InjectionKey<UiFieldContext | null> = Symbol('wing-land-ui-field')

export function provideField(context: UiFieldContext | null) {
  provide(fieldKey, context)
}

export function useFieldContext() {
  return inject(fieldKey, null)
}

export function joinIds(...ids: (string | undefined | false)[]) {
  return ids.filter(Boolean).join(' ') || undefined
}

// Props win over the surrounding field, so a control can still be used on its own.
export function useFieldControl(
  props: UiFieldControlProps,
  ownDescribedBy?: MaybeRefOrGetter<string | undefined>,
) {
  const field = useFieldContext()
  const fallbackId = useId()
  return {
    field,
    id: computed(() => props.id ?? field?.id.value ?? fallbackId),
    required: computed(() => props.required ?? field?.required.value ?? false),
    disabled: computed(() => props.disabled ?? field?.disabled.value ?? false),
    invalid: computed(() => props.invalid ?? field?.invalid.value ?? false),
    describedBy: computed(() => joinIds(field?.describedBy.value, toValue(ownDescribedBy))),
  }
}
