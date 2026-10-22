<script setup lang="ts">
import { nextTick, shallowRef, useId, watch } from 'vue'
import { useUiConfig } from '../lib/config'
import type { UiFormError } from '../lib/form'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    errors: readonly UiFormError[]
    title?: string
    headingLevel?: 2 | 3 | 4
    /** Moves focus to the summary whenever a new list of errors arrives, such as after a submit. */
    autofocus?: boolean
  }>(),
  { title: undefined, headingLevel: 2, autofocus: true },
)

const ui = useUiConfig()
const titleId = useId()
const root = shallowRef<HTMLElement | null>(null)

watch(
  () => props.errors,
  async (errors) => {
    if (!props.autofocus || !errors.length) return
    await nextTick()
    root.value?.focus()
  },
  { immediate: true },
)

// A fragment link scrolls but does not move focus, so focus the control and show its label.
function focusControl(id: string) {
  const control = document.getElementById(id)
  if (!control) return
  const label =
    document.querySelector(`label[for="${CSS.escape(id)}"]`) ??
    control.closest('fieldset')?.querySelector('legend')
  ;(label ?? control).scrollIntoView({ block: 'start' })
  control.focus({ preventScroll: true })
}
</script>

<template>
  <section
    v-if="errors.length"
    ref="root"
    class="ui-form-error-summary"
    tabindex="-1"
    :aria-labelledby="titleId"
  >
    <component :is="`h${headingLevel}`" :id="titleId" class="ui-form-error-summary__title">
      <UiIcon name="error" />{{ title ?? ui.messages.form.errorSummary }}
    </component>
    <ul class="ui-form-error-summary__list">
      <li v-for="(error, index) in errors" :key="`${error.id}-${index}`">
        <a v-if="error.id" :href="`#${error.id}`" @click.prevent="focusControl(error.id)">{{
          error.message
        }}</a>
        <template v-else>{{ error.message }}</template>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-form-error-summary {
  margin-block-end: var(--space-6);
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-control);
  background: var(--color-danger-surface);
  color: var(--color-text);

  &:focus-visible {
    outline-offset: 2px;
  }
}
.ui-form-error-summary__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0 0 var(--space-2);
  color: var(--color-danger);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}
.ui-form-error-summary__list {
  margin: 0;
  padding-inline-start: 1.5em;

  li {
    margin-block: 4px;
  }

  a {
    color: var(--color-danger);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }
}
</style>
