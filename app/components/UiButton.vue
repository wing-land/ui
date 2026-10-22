<script setup lang="ts">
import { computed, useSlots, warn, watchEffect } from 'vue'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiIconName } from '../lib/icons'
import UiIcon from './UiIcon.vue'
import UiSpinner from './UiSpinner.vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'outline' | 'solid' | 'ghost'
    tone?: 'neutral' | 'danger'
    /** `sm` is for dense groups such as toolbars and tables; standalone actions stay `md`. */
    size?: 'md' | 'sm'
    icon?: UiIconName
    iconPosition?: 'start' | 'end'
    /** Accessible name. Required when the button shows only an icon. */
    label?: string
    loading?: boolean
    disabled?: boolean
    block?: boolean
    /** Renders a link styled as a button. Use it for navigation, not for actions. */
    href?: string
    target?: string
    linkComponent?: UiLinkComponent
  }>(),
  {
    type: 'button',
    variant: 'outline',
    tone: 'neutral',
    size: 'md',
    icon: undefined,
    iconPosition: 'start',
    label: undefined,
    href: undefined,
    target: undefined,
    linkComponent: undefined,
  },
)
const slots = useSlots()
const ui = useUiConfig()
const iconOnly = computed(() => Boolean(props.icon) && !slots.default)
const isLink = computed(() => Boolean(props.href) && !props.disabled)
const classes = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  `ui-button--${props.size}`,
  {
    'ui-button--danger': props.tone === 'danger',
    'ui-button--icon-only': iconOnly.value,
    'ui-button--block': props.block,
    'ui-button--loading': props.loading,
  },
])

watchEffect(() => {
  if (iconOnly.value && !props.label) warn('UiButton: an icon-only button needs `label`.')
})

// Loading keeps focus on the button, so block activation instead of using `disabled`.
function guard(event: MouseEvent) {
  if (!props.loading) return
  event.preventDefault()
  event.stopImmediatePropagation()
}
</script>

<template>
  <component
    :is="linkComponent ?? ui.linkComponent"
    v-if="isLink"
    :href="href"
    :target="target"
    :class="classes"
    :aria-label="iconOnly ? label : undefined"
  >
    <UiIcon v-if="icon && iconPosition === 'start'" :name="icon" />
    <slot />
    <UiIcon v-if="icon && iconPosition === 'end'" :name="icon" />
  </component>
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="disabled"
    :aria-disabled="loading || undefined"
    :aria-busy="loading || undefined"
    :aria-label="iconOnly ? label : undefined"
    @click="guard"
  >
    <UiSpinner v-if="loading && iconPosition === 'start'" />
    <UiIcon v-else-if="icon && iconPosition === 'start'" :name="icon" />
    <slot />
    <UiSpinner v-if="loading && iconPosition === 'end'" />
    <UiIcon v-else-if="icon && iconPosition === 'end'" :name="icon" />
  </button>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-width: var(--control-min);
  min-height: var(--control-min);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard),
    color var(--duration-fast) var(--easing-standard);

  &:hover {
    background: var(--color-surface);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: transparent;
  }
}
.ui-button--danger {
  color: var(--color-danger);

  &.ui-button--outline {
    border-color: currentColor;
  }
}
.ui-button--solid {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-on-accent);

  &:hover {
    background: color-mix(in srgb, var(--color-accent) 85%, var(--color-canvas));
  }

  &:disabled:hover {
    background: var(--color-accent);
  }

  &.ui-button--danger {
    border-color: var(--color-danger);
    background: var(--color-danger);
    color: var(--color-canvas);

    &:hover {
      background: color-mix(in srgb, var(--color-danger) 85%, var(--color-canvas));
    }

    &:disabled:hover {
      background: var(--color-danger);
    }
  }
}
.ui-button--ghost {
  border-color: transparent;
}
.ui-button--sm {
  gap: 6px;
  min-width: var(--control-dense);
  min-height: var(--control-dense);
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-small);
}
.ui-button--icon-only {
  padding: 0;

  &.ui-button--md {
    width: var(--control-min);
  }

  &.ui-button--sm {
    width: var(--control-dense);
  }
}
.ui-button--block {
  display: flex;
  width: 100%;
}
.ui-button--loading {
  cursor: progress;
}
</style>
