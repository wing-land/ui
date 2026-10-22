<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import UiIcon from './UiIcon.vue'
import UiVisuallyHidden from './UiVisuallyHidden.vue'

withDefaults(
  defineProps<{
    href: string
    target?: string
    linkComponent?: UiLinkComponent
    /** Omit for the locale's text, or pass an empty string to hide it. */
    announcement?: string
  }>(),
  { target: undefined, linkComponent: undefined, announcement: undefined },
)
const ui = useUiConfig()
</script>

<template>
  <component
    :is="linkComponent ?? ui.linkComponent"
    :href="href"
    :target="target"
    class="ui-external-link"
  >
    <span class="link-label"><slot /></span>
    <UiIcon name="external" />
    <UiVisuallyHidden v-if="announcement ?? ui.messages.common.externalSite">{{
      announcement ?? ui.messages.common.externalSite
    }}</UiVisuallyHidden>
  </component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-external-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  text-decoration: none;

  &:hover {
    color: var(--color-accent);
  }

  .link-label {
    min-width: 0;
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  .ui-icon {
    width: 1em;
    height: 1em;
    vertical-align: 0;
  }
}
</style>
