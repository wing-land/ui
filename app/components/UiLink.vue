<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import UiExternalLink from './UiExternalLink.vue'

// `external` defaults to undefined because Vue would otherwise cast an absent boolean to false.
const props = withDefaults(
  defineProps<{
    href: string
    /** Omit to detect external links with the configured `isExternalLink`. */
    external?: boolean
    target?: string
    linkComponent?: UiLinkComponent
    announcement?: string
  }>(),
  { external: undefined, target: undefined, linkComponent: undefined, announcement: undefined },
)
const ui = useUiConfig()
const isExternal = computed(() => props.external ?? ui.value.isExternalLink(props.href))
</script>

<template>
  <UiExternalLink
    v-if="isExternal"
    :href="href"
    :target="target"
    :link-component="linkComponent"
    :announcement="announcement"
    ><slot
  /></UiExternalLink>
  <component
    :is="linkComponent ?? ui.linkComponent"
    v-else
    :href="href"
    :target="target"
    class="ui-link"
    ><slot
  /></component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

// Same hover color as links in `.prose`, so a link looks the same inside and outside an article.
.ui-link:hover {
  color: var(--color-accent);
}
</style>
