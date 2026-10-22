<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiFooterLink } from '../lib/types'
import UiExternalLink from './UiExternalLink.vue'

defineProps<{ links: readonly UiFooterLink[]; linkComponent?: UiLinkComponent }>()
const ui = useUiConfig()
</script>

<template>
  <footer class="ui-site-footer">
    <div class="footer-brand"><slot name="brand" /></div>
    <template v-for="link in links" :key="link.href">
      <UiExternalLink
        v-if="link.external"
        :href="link.href"
        :link-component="linkComponent"
        announcement=""
        >{{ link.label }}</UiExternalLink
      >
      <component :is="linkComponent ?? ui.linkComponent" v-else :href="link.href">{{
        link.label
      }}</component>
    </template>
  </footer>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-site-footer {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 24px;
  border-top: 1px solid var(--color-line);
  padding-block: 32px;

  a,
  :deep(.ui-external-link) {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    font-size: 14px;
    text-underline-offset: 0.22em;
  }

  a:hover,
  :deep(.ui-external-link:hover) {
    color: var(--color-accent);
  }

  @media (max-width: 600px) {
    justify-content: flex-start;
  }

  .footer-brand {
    margin-right: auto;
    font-size: 18px;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
}
</style>
