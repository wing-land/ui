<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import UiButton from './UiButton.vue'

const props = withDefaults(
  defineProps<{
    /** Number of items across all pages. */
    total: number
    pageSize?: number
    /** Pages shown on each side of the current page. */
    siblingCount?: number
    /** Renders links instead of buttons, for pages that have their own URL. */
    hrefFor?: (page: number) => string
    size?: 'md' | 'sm'
    navigationLabel?: string
    linkComponent?: UiLinkComponent
  }>(),
  {
    pageSize: 20,
    siblingCount: 1,
    hrefFor: undefined,
    size: 'md',
    navigationLabel: undefined,
    linkComponent: undefined,
  },
)
const page = defineModel<number>('page', { default: 1 })

const ui = useUiConfig()
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const current = computed(() => Math.min(Math.max(1, page.value), pageCount.value))
const items = computed(() => {
  const last = pageCount.value
  const start = Math.max(2, current.value - props.siblingCount)
  const end = Math.min(last - 1, current.value + props.siblingCount)
  const pages: (number | 'gap-start' | 'gap-end')[] = [1]
  // A gap of one page shows that page instead of an ellipsis.
  if (start === 3) pages.push(2)
  else if (start > 3) pages.push('gap-start')
  for (let number = start; number <= end; number++) pages.push(number)
  if (end === last - 2) pages.push(last - 1)
  else if (end < last - 2) pages.push('gap-end')
  if (last > 1) pages.push(last)
  return pages
})

function go(target: number) {
  if (target >= 1 && target <= pageCount.value) page.value = target
}
</script>

<template>
  <nav
    v-if="pageCount > 1"
    class="ui-pagination"
    :aria-label="navigationLabel ?? ui.messages.pagination.navigation"
  >
    <UiButton
      icon="arrow-left"
      :size="size"
      :label="ui.messages.common.previous"
      :href="hrefFor && current > 1 ? hrefFor(current - 1) : undefined"
      :link-component="linkComponent"
      :disabled="current <= 1"
      @click="hrefFor || go(current - 1)"
    />
    <ul class="ui-pagination__pages">
      <li v-for="item in items" :key="item">
        <span v-if="typeof item === 'string'" class="ui-pagination__gap" aria-hidden="true">…</span>
        <UiButton
          v-else
          :size="size"
          :href="hrefFor ? hrefFor(item) : undefined"
          :link-component="linkComponent"
          :aria-label="ui.messages.pagination.page(item)"
          :aria-current="item === current ? 'page' : undefined"
          @click="hrefFor || go(item)"
          >{{ item }}</UiButton
        >
      </li>
    </ul>
    <UiButton
      icon="arrow-right"
      :size="size"
      :label="ui.messages.common.next"
      :href="hrefFor && current < pageCount ? hrefFor(current + 1) : undefined"
      :link-component="linkComponent"
      :disabled="current >= pageCount"
      @click="hrefFor || go(current + 1)"
    />
  </nav>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}
.ui-pagination__pages {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0;
  }

  :deep(.ui-button) {
    min-width: var(--control-min);
    justify-content: center;
    font-variant-numeric: tabular-nums;
  }

  :deep(.ui-button--sm) {
    min-width: var(--control-dense);
  }

  :deep(.ui-button[aria-current]),
  :deep(.ui-button[aria-current]:hover) {
    border-color: var(--color-accent);
    background: var(--color-accent);
    color: var(--color-on-accent);
    // Switches at once, so the number never sits on a half-faded background.
    transition: none;
  }
}
.ui-pagination__gap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 100%;
  color: var(--color-muted);
}
</style>
