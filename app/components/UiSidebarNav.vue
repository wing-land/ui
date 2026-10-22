<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import { currentValue, type UiNavMatch } from '../lib/navigation'
import type { UiNavGroup } from '../lib/types'

withDefaults(
  defineProps<{
    groups: readonly UiNavGroup[]
    currentHref?: string
    navigationLabel?: string
    linkComponent?: UiLinkComponent
    match?: UiNavMatch
  }>(),
  { currentHref: undefined, navigationLabel: undefined, linkComponent: undefined, match: 'exact' },
)
const ui = useUiConfig()
</script>

<template>
  <nav class="ui-sidebar-nav" :aria-label="navigationLabel || ui.messages.navigation.sidebar">
    <section v-for="group in groups" :key="group.label" class="group">
      <h2>{{ group.label }}</h2>
      <ul>
        <li v-for="item in group.items" :key="item.href">
          <component
            :is="linkComponent ?? ui.linkComponent"
            :href="item.href"
            :aria-current="currentValue(item.href, currentHref, match)"
            >{{ item.label }}</component
          >
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-sidebar-nav {
  padding-inline: 10px;
}
.group + .group {
  margin-top: 32px;
}
h2 {
  margin: 0 0 12px;
  color: var(--color-muted);
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  display: block;
  min-height: 32px;
  padding: 5px 10px;
  color: var(--color-muted);
  border-radius: var(--radius-control);
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    color: var(--color-accent);
    background: var(--color-surface);
  }

  &[aria-current] {
    color: var(--color-accent);
    background: var(--color-surface);
    font-weight: 600;
  }
}
</style>
