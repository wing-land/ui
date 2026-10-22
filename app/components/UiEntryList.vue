<script setup lang="ts" generic="T extends UiEntryListItem">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import { toDateTimeAttribute } from '../lib/date'
import type { UiEntryListItem } from '../lib/types'
import UiIcon from './UiIcon.vue'
import UiVisuallyHidden from './UiVisuallyHidden.vue'

withDefaults(
  defineProps<{
    items: readonly T[]
    linkComponent?: UiLinkComponent
    headingLevel?: 2 | 3 | 4
    compact?: boolean
    columns?: 1 | 2
  }>(),
  { linkComponent: undefined, headingLevel: 2, compact: false, columns: 1 },
)
defineSlots<{
  title?: (props: { item: T }) => unknown
  badge?: (props: { item: T }) => unknown
  meta?: (props: { item: T }) => unknown
}>()
const ui = useUiConfig()
</script>

<template>
  <ul
    class="entry-list ui-entry-list"
    :class="{ 'is-compact': compact, 'has-two-columns': columns === 2 }"
  >
    <li v-for="item in items" :key="item.key ?? item.href">
      <component
        :is="linkComponent ?? ui.linkComponent"
        :href="item.href"
        class="entry-link"
        :class="{ 'is-undated': !item.date }"
      >
        <time v-if="item.date" :datetime="toDateTimeAttribute(item.date)">{{
          item.dateLabel || ui.formatDate(item.date)
        }}</time>
        <div class="entry-content">
          <component :is="`h${headingLevel}`" class="entry-title"
            ><slot name="title" :item="item">{{ item.title }}</slot
            ><span v-if="$slots.badge" class="entry-badge"><slot name="badge" :item="item" /></span
          ></component>
          <p v-if="item.description">{{ item.description }}</p>
          <div v-if="$slots.meta" class="entry-meta"><slot name="meta" :item="item" /></div>
        </div>
        <UiIcon class="entry-arrow" :name="item.external ? 'external' : 'arrow-right'" :size="16" />
        <UiVisuallyHidden v-if="item.external">{{
          ui.messages.common.externalSite
        }}</UiVisuallyHidden>
      </component>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

// Layout follows the list's own width, so it also fits narrow columns such as side panels.
.entry-list {
  // 560px matches the former 600px viewport breakpoint minus the page gutters.
  container: ui-entry-list / inline-size;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0;
  }

  li + li {
    border-top: 1px solid var(--color-line);
  }

  &.is-compact {
    border-top: 1px solid var(--color-line);

    li {
      border-bottom: 1px solid var(--color-line);
      border-top: 0;
    }

    .entry-link {
      grid-template-columns: minmax(0, 1fr) 16px;
      gap: 12px;
      min-height: 76px;
      padding: 12px;
    }

    time {
      grid-column: 1 / -1;
    }

    .entry-title {
      font-size: 16px;
    }

    p {
      margin-top: 2px;
      line-height: 1.6;
    }
  }

  &.has-two-columns {
    display: grid;
    // At most two columns; one column once a column would be narrower than 260px.
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(100%, max(260px, calc((100% - 20px) / 2))), 1fr)
    );
    gap: 0 20px;

    li {
      border-bottom: 1px solid var(--color-line);
      border-top: 0;
    }
  }
}
.entry-link {
  display: grid;
  // The date column grows for long dates instead of overflowing.
  grid-template-columns:
    minmax(var(--ui-entry-list-date-width, 6em), max-content)
    minmax(0, 1fr) 16px;
  gap: 20px;
  padding: 24px 8px;
  min-height: 44px;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: background-color var(--duration-fast) var(--easing-standard);

  &:is(:hover, :focus-visible) {
    background: var(--color-surface);

    .entry-title {
      color: var(--color-accent);
      text-decoration: none;
    }
  }

  @container ui-entry-list (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 16px;
    gap: 8px 12px;
    padding-inline: 4px;
  }
}
time {
  color: var(--color-muted);
  font-size: 14px;
  padding-top: 2px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @container ui-entry-list (max-width: 560px) {
    grid-column: 1 / -1;
    padding-top: 0;
  }
}
.entry-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.7;

  @container ui-entry-list (max-width: 560px) {
    font-size: 16px;
  }
}
p {
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.8;
}
.entry-link.is-undated {
  grid-template-columns: minmax(0, 1fr) 16px;
}
.entry-badge {
  display: inline-flex;
  margin-inline-start: var(--space-2);
  vertical-align: 0.1em;
  font-size: var(--font-size-small);
  font-weight: 400;
}
.entry-meta {
  margin-top: var(--space-2);
  color: var(--color-muted);
  font-size: var(--font-size-small);
}
.entry-arrow {
  margin-top: 6px;
  color: var(--color-muted);
}
</style>
