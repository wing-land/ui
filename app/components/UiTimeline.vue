<script setup lang="ts">
import { useUiConfig } from '../lib/config'
import { toDateTimeAttribute } from '../lib/date'
import type { UiTimelineItem } from '../lib/types'

withDefaults(defineProps<{ items: readonly UiTimelineItem[]; headingLevel?: 2 | 3 | 4 }>(), {
  headingLevel: 3,
})
const ui = useUiConfig()
</script>

<template>
  <ol class="timeline ui-timeline">
    <li v-for="item in items" :key="`${toDateTimeAttribute(item.date)}:${item.title}`">
      <time :datetime="toDateTimeAttribute(item.date)">{{ ui.formatDate(item.date) }}</time>
      <span class="timeline-marker" aria-hidden="true" />
      <div class="timeline-content">
        <component :is="`h${headingLevel}`" class="timeline-title">{{ item.title }}</component>
        <p v-if="item.description">{{ item.description }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.timeline {
  // 560px matches the former 600px viewport breakpoint minus the page gutters.
  container: ui-timeline / inline-size;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
}
li {
  display: grid;
  // The date column grows for long dates instead of overflowing.
  grid-template-columns: minmax(var(--ui-timeline-date-width, 6.5em), max-content) 24px minmax(
      0,
      1fr
    );
  gap: 12px;
  min-height: 112px;

  // The line runs only between the first and last markers.
  &:first-child .timeline-marker {
    background: linear-gradient(transparent 12px, var(--color-line) 12px);
  }

  // The last item has no line below it, so it takes only the space of its content.
  &:last-child {
    min-height: 0;
  }

  &:last-child .timeline-marker {
    height: 12px;
  }

  @container ui-timeline (max-width: 560px) {
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 16px;
  }
}
time {
  padding-top: 1px;
  color: var(--color-muted);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @container ui-timeline (max-width: 560px) {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
    padding-top: 0;
  }
}
.timeline-marker {
  position: relative;
  display: block;
  width: 1px;
  height: 100%;
  margin-inline: auto;
  background: var(--color-line);

  // The first event is filled and the rest are hollow, so the start of the list stands out.
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    width: 11px;
    height: 11px;
    border: 1.5px solid var(--color-muted);
    border-radius: 50%;
    background: var(--color-canvas);
    transform: translate(-50%, -50%);
  }

  li:first-child > &::before {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }

  @container ui-timeline (max-width: 560px) {
    grid-column: 1;
    grid-row: 1 / 3;
  }
}
.timeline-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
p {
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
.timeline-content {
  @container ui-timeline (max-width: 560px) {
    grid-column: 2;
    grid-row: 1;
    padding-top: 24px;
  }
}
</style>
