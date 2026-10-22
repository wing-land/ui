<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiAccountItem } from '../lib/types'

withDefaults(
  defineProps<{
    items: readonly UiAccountItem[]
    variant?: 'regular' | 'columns' | 'spacious' | 'tiles'
    /** Columns for `tiles`. `2` falls back to one column when a column would be narrower than 220px. */
    columns?: 1 | 2
    linkComponent?: UiLinkComponent
  }>(),
  { variant: 'regular', columns: 1, linkComponent: undefined },
)
const ui = useUiConfig()
</script>

<template>
  <ul
    class="account-list ui-account-list"
    :class="{
      columns: variant === 'columns',
      spacious: variant === 'spacious',
      tiles: variant === 'tiles',
      'tiles-2': variant === 'tiles' && columns === 2,
    }"
  >
    <li v-for="item in items" :key="item.id ?? item.href">
      <component
        :is="linkComponent ?? ui.linkComponent"
        :href="item.href"
        :aria-label="item.accessibleLabel"
        class="account-link"
      >
        <span class="icon-slot" aria-hidden="true">
          <span class="icon" :style="{ maskImage: `url('${item.iconSrc}')` }" />
        </span>
        <span class="account-label">{{ item.label }}</span>
      </component>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.account-list {
  // 560px matches the former 600px viewport breakpoint minus the page gutters.
  container: ui-account-list / inline-size;
  list-style: none;
  margin: 0;
  padding: 0;

  &:not(.spacious, .columns, .tiles) li + li {
    border-top: 1px solid var(--color-line);
  }

  &.columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(270px, 100%), 1fr));
    gap: 0 24px;

    li {
      min-width: 0;
      border-top: 1px solid var(--color-line);
    }
  }

  &.spacious {
    display: grid;
    // At most two columns; one column once a column would be narrower than 260px.
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(100%, max(260px, calc((100% - 24px) / 2))), 1fr)
    );
    gap: 0 24px;

    // Each item draws both lines and overlaps the next row by 1px, so rows share one line and
    // the last row is closed in both the one- and two-column layouts.
    li {
      margin-bottom: -1px;
      border-block: 1px solid var(--color-line);
    }
  }

  &.tiles {
    display: grid;
    gap: 12px;
  }

  &.tiles-2 {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(100%, max(220px, calc((100% - 12px) / 2))), 1fr)
    );
  }
}
.account-link {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding-inline: 4px;
  color: var(--color-text);
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition:
    color var(--duration-fast) var(--easing-standard),
    background-color var(--duration-fast) var(--easing-standard);

  &:is(:hover, :focus-visible) {
    color: var(--color-accent);
    background: var(--color-surface);
  }

  .tiles & {
    padding-inline: 8px 12px;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-control);
  }

  .spacious & {
    min-height: 72px;
    padding-inline: 8px;

    @container ui-account-list (max-width: 560px) {
      min-height: 64px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @container ui-account-list (max-width: 560px) {
    font-size: 16px;
  }
}
.icon-slot {
  display: grid;
  place-items: center;
  width: 40px;
  height: 24px;

  .spacious & {
    height: 28px;
  }
}
.icon {
  display: block;
  width: 24px;
  height: 24px;
  background: currentColor;
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;

  .spacious & {
    width: 28px;
    height: 28px;
  }
}
</style>
