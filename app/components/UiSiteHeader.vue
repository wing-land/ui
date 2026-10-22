<script setup lang="ts">
import { onMounted, shallowRef, useId, watch } from 'vue'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import { useDismiss } from '../lib/dismiss'
import { currentValue, type UiNavMatch } from '../lib/navigation'
import type { UiNavItem } from '../lib/types'
import UiButton from './UiButton.vue'

const props = withDefaults(
  defineProps<{
    navigation: readonly UiNavItem[]
    /** Renders the site name as plain text when omitted. */
    brandHref?: string
    brandLabel?: string
    linkComponent?: UiLinkComponent
    navigationLabel?: string
    skipTarget?: string
    skipLabel?: string
    headerId?: string
    activeHref?: string
    /** `prefix` also marks a section while one of its pages is open. */
    match?: UiNavMatch
    /** Folds the navigation behind a menu button on narrow screens. */
    collapsible?: boolean
    menuLabel?: string
  }>(),
  {
    brandHref: undefined,
    brandLabel: undefined,
    linkComponent: undefined,
    navigationLabel: undefined,
    skipTarget: '#main',
    skipLabel: undefined,
    headerId: 'top',
    activeHref: '',
    match: 'exact',
    menuLabel: undefined,
  },
)
defineOptions({ inheritAttrs: false })
const ui = useUiConfig()
const navId = useId()
const root = shallowRef<HTMLElement | null>(null)
const menuButton = shallowRef<{ $el: HTMLElement } | null>(null)
const menuOpen = shallowRef(false)
// Until hydration the navigation stays visible, so it works without JavaScript.
const enhanced = shallowRef(false)

useDismiss({ open: menuOpen, inside: root, returnFocusTo: () => menuButton.value?.$el })
watch(
  () => props.activeHref,
  () => (menuOpen.value = false),
)
onMounted(() => (enhanced.value = true))
</script>

<template>
  <a class="skip-link" :href="skipTarget">{{
    skipLabel ?? ui.messages.navigation.skipToContent
  }}</a>
  <header
    v-bind="$attrs"
    :id="headerId"
    ref="root"
    class="ui-site-header"
    :class="{ 'ui-site-header--collapsible': collapsible }"
  >
    <component
      :is="brandHref ? (linkComponent ?? ui.linkComponent) : 'span'"
      :href="brandHref"
      class="brand"
      :aria-label="brandHref ? brandLabel : undefined"
      ><slot name="brand"
    /></component>
    <UiButton
      v-if="collapsible && enhanced"
      ref="menuButton"
      class="menu-button"
      variant="ghost"
      icon="menu"
      :label="menuLabel ?? ui.messages.common.menu"
      :aria-expanded="menuOpen"
      :aria-controls="navId"
      @click="menuOpen = !menuOpen"
    />
    <nav
      :id="navId"
      :class="{ 'is-collapsed': collapsible && enhanced && !menuOpen }"
      :aria-label="navigationLabel ?? ui.messages.navigation.main"
    >
      <component
        :is="linkComponent ?? ui.linkComponent"
        v-for="item in navigation"
        :key="item.href"
        :href="item.href"
        :class="{ 'is-active': currentValue(item.href, activeHref, match) }"
        :aria-current="currentValue(item.href, activeHref, match)"
        >{{ item.label }}</component
      >
    </nav>
    <slot name="actions" />
    <slot name="user" />
  </header>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-site-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-block: 28px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 12px;
    padding-block: 20px;
  }
}
.brand {
  font-size: 24px;
  text-decoration: none;
  margin-right: auto;
}
nav {
  display: flex;
  gap: 24px;

  a {
    display: grid;
    align-items: center;
    min-height: 44px;
    border-bottom: 2px solid transparent;
    text-decoration: none;

    &:hover {
      border-bottom-color: var(--color-muted);
    }

    &.router-link-active,
    &.is-active {
      border-bottom-color: var(--color-accent);
      font-weight: 600;
    }

    &.is-active:hover {
      border-bottom-color: var(--color-accent);
    }
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
    column-gap: 20px;
    order: 3;
    width: 100%;
  }
}
.menu-button {
  display: none;
}
@media (max-width: 600px) {
  .ui-site-header--collapsible {
    .menu-button {
      display: inline-flex;
      order: 2;
    }

    nav {
      flex-direction: column;
      gap: 0;

      &.is-collapsed {
        display: none;
      }

      a {
        align-self: flex-start;
      }
    }
  }
}
.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  transform: translateY(-200%);
  background: var(--color-canvas);
  padding: var(--space-2);
  z-index: var(--z-sticky);

  &:focus {
    transform: none;
  }
}
</style>
