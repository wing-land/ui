<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import { currentValue, type UiNavMatch } from '../lib/navigation'
import type { UiNavItem } from '../lib/types'
import UiButton from './UiButton.vue'

withDefaults(
  defineProps<{
    navigation?: readonly UiNavItem[]
    activeHref?: string
    match?: UiNavMatch
    navigationLabel?: string
    /** Wraps the `brand` slot in a link. */
    brandHref?: string
    brandLabel?: string
    /** Shows a menu button at the start, for opening a drawer with the site's other navigation. */
    menu?: boolean
    menuLabel?: string
    /** Renders a skip link to this target, such as `#main`. Omit it when the page has its own. */
    skipTarget?: string
    skipLabel?: string
    /** Aligns the content with UiContainer while the bar and its border span the full width. */
    contained?: boolean
    sticky?: boolean
    linkComponent?: UiLinkComponent
  }>(),
  {
    navigation: () => [],
    activeHref: undefined,
    match: 'exact',
    navigationLabel: undefined,
    brandHref: undefined,
    brandLabel: undefined,
    menuLabel: undefined,
    skipTarget: undefined,
    skipLabel: undefined,
    linkComponent: undefined,
  },
)
const emit = defineEmits<{ menu: [] }>()
defineSlots<{ brand?: () => unknown; default?: () => unknown; actions?: () => unknown }>()
const ui = useUiConfig()
</script>

<template>
  <header class="ui-app-header" :class="{ 'ui-app-header--sticky': sticky }">
    <a v-if="skipTarget" class="ui-app-header__skip" :href="skipTarget">{{
      skipLabel ?? ui.messages.navigation.skipToContent
    }}</a>
    <div class="ui-app-header__inner" :class="{ 'is-contained': contained }">
      <UiButton
        v-if="menu"
        class="ui-app-header__menu"
        variant="ghost"
        icon="menu"
        :label="menuLabel ?? ui.messages.common.menu"
        aria-haspopup="dialog"
        @click="emit('menu')"
      />
      <component
        :is="linkComponent ?? ui.linkComponent"
        v-if="brandHref && $slots.brand"
        class="ui-app-header__brand"
        :href="brandHref"
        :aria-label="brandLabel"
        ><slot name="brand"
      /></component>
      <div v-else-if="$slots.brand" class="ui-app-header__brand"><slot name="brand" /></div>
      <div class="ui-app-header__content"><slot /></div>
      <nav
        v-if="navigation.length"
        class="ui-app-header__nav"
        :aria-label="navigationLabel ?? ui.messages.navigation.main"
      >
        <component
          :is="linkComponent ?? ui.linkComponent"
          v-for="item in navigation"
          :key="item.href"
          :href="item.href"
          :aria-current="currentValue(item.href, activeHref, match)"
          >{{ item.label }}</component
        >
      </nav>
      <div v-if="$slots.actions" class="ui-app-header__actions"><slot name="actions" /></div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-app-header {
  border-bottom: 1px solid var(--color-line);
  background: var(--color-canvas);

  &--sticky {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
  }
}
.ui-app-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-2) var(--space-6);
  min-height: 56px;
  padding-inline: var(--space-4);

  &.is-contained {
    width: min(var(--width-site), calc(100% - 2 * var(--gutter)));
    margin-inline: auto;
    padding-inline: 0;
  }
}
.ui-app-header__menu {
  margin-inline: -8px calc(var(--space-2) - var(--space-6));
}
.ui-app-header__brand {
  display: inline-flex;
  align-items: center;
  min-height: var(--control-min);
  color: inherit;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
.ui-app-header__nav {
  display: flex;
  flex: 0 1 auto;
  gap: var(--space-5);
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 56px;
    border-block: 2px solid transparent;
    color: inherit;
    font-size: 15px;
    text-decoration: none;
    white-space: nowrap;
    transition: border-color var(--duration-fast) var(--easing-standard);

    &:hover {
      border-bottom-color: var(--color-muted);
    }

    &[aria-current] {
      border-bottom-color: var(--color-accent);
      font-weight: 600;
    }

    &:focus-visible {
      outline-offset: -2px;
    }
  }
}
.ui-app-header__content {
  flex: 1;
  min-width: 0;
}
.ui-app-header__actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-2);
}
.ui-app-header__skip {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: var(--z-toast);
  padding: 8px 12px;
  background: var(--color-canvas);
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
}
</style>
