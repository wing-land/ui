<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import UiIcon from './UiIcon.vue'

withDefaults(defineProps<{ href: string; linkComponent?: UiLinkComponent }>(), {
  linkComponent: undefined,
})
const ui = useUiConfig()
</script>

<template>
  <component :is="linkComponent ?? ui.linkComponent" :href="href" class="ui-text-arrow-link">
    <span><slot /></span>
    <UiIcon name="arrow-right" />
  </component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-text-arrow-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  color: var(--color-text);
  text-decoration: none;

  > span {
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  &:hover {
    color: var(--color-accent);
  }
}
.ui-icon {
  width: 16px;
  height: 16px;
}
</style>
