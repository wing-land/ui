<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig, type UiLinkComponent } from '../lib/config'

const props = withDefaults(
  defineProps<{
    /** Makes the whole card one link. */
    href?: string
    /** Makes the whole card one button when there is no `href`. */
    button?: boolean
    target?: string
    linkComponent?: UiLinkComponent
  }>(),
  { href: undefined, target: undefined, linkComponent: undefined },
)
defineSlots<{
  default?: () => unknown
  /** Edge-to-edge area above the content, such as an image or thumbnail. */
  media?: () => unknown
}>()
const ui = useUiConfig()
const tag = computed(() =>
  props.href ? (props.linkComponent ?? ui.value.linkComponent) : props.button ? 'button' : 'div',
)
</script>

<template>
  <component
    :is="tag"
    class="ui-card"
    :class="{ 'ui-card--interactive': href || button, 'ui-card--media': $slots.media }"
    :href="href"
    :target="href ? target : undefined"
    :type="!href && button ? 'button' : undefined"
  >
    <!-- Spans, because a <button> may only contain phrasing content. -->
    <template v-if="$slots.media">
      <span class="ui-card__media"><slot name="media" /></span>
      <span class="ui-card__body"><slot /></span>
    </template>
    <slot v-else />
  </component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-width: 0;
  padding: var(--space-5);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  text-align: inherit;
  text-decoration: none;
}
.ui-card--media {
  gap: 0;
  padding: 0;
  overflow: hidden;
}
.ui-card__media {
  display: block;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-surface);

  > :slotted(:is(img, svg, video)) {
    display: block;
    width: 100%;
    height: auto;
  }
}
.ui-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
}
.ui-card--interactive {
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--easing-standard);

  // The reduced-motion reset in component-base does not reach slot content.
  @media (prefers-reduced-motion: no-preference) {
    :slotted(.ui-card__title) {
      transition: color var(--duration-fast) var(--easing-standard);
    }
  }

  &:is(:hover, :focus-visible) {
    background: var(--color-surface);

    :slotted(.ui-card__title) {
      color: var(--color-accent);
      text-decoration: none;
    }
  }
}
</style>
