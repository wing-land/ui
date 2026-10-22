<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiBreadcrumbItem } from '../lib/types'
import UiIcon from './UiIcon.vue'

withDefaults(
  defineProps<{
    /** The last item is the current page and is not linked. */
    items: readonly UiBreadcrumbItem[]
    navigationLabel?: string
    linkComponent?: UiLinkComponent
  }>(),
  { navigationLabel: undefined, linkComponent: undefined },
)
const ui = useUiConfig()
</script>

<template>
  <nav class="ui-breadcrumb" :aria-label="navigationLabel ?? ui.messages.navigation.breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="`${index}-${item.label}`">
        <UiIcon v-if="index" class="ui-breadcrumb__separator" name="chevron-right" />
        <span v-if="index === items.length - 1" aria-current="page">{{ item.label }}</span>
        <component
          :is="linkComponent ?? ui.linkComponent"
          v-else-if="item.href"
          :href="item.href"
          >{{ item.label }}</component
        >
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-muted);
  font-size: var(--font-size-small);
}
li {
  display: inline-flex;
  align-items: center;
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;

  &:hover {
    color: var(--color-accent);
    text-decoration: underline;
  }
}
[aria-current] {
  color: var(--color-text);
}
.ui-breadcrumb__separator {
  margin-inline: 6px;
}
</style>
