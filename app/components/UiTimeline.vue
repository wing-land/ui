<script setup lang="ts" generic="T extends UiTimelineItem">
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import { toDateTimeAttribute } from '../lib/date'
import type { UiTimelineItem } from '../lib/types'

withDefaults(
  defineProps<{
    items: readonly T[]
    headingLevel?: 2 | 3 | 4
    /** `compact` tightens spacing for short entries such as a day's schedule. */
    density?: 'default' | 'compact'
    linkComponent?: UiLinkComponent
  }>(),
  { headingLevel: 3, density: 'default', linkComponent: undefined },
)
defineSlots<{ meta?: (props: { item: T }) => unknown }>()
const ui = useUiConfig()
</script>

<template>
  <ol class="timeline ui-timeline" :class="{ 'is-compact': density === 'compact' }">
    <li v-for="item in items" :key="item.key ?? `${toDateTimeAttribute(item.date)}:${item.title}`">
      <time :datetime="toDateTimeAttribute(item.date)">{{
        item.dateLabel || ui.formatDate(item.date)
      }}</time>
      <span
        class="timeline-marker"
        :class="{ 'timeline-marker--filled': item.filled }"
        aria-hidden="true"
      />
      <div class="timeline-content">
        <component :is="`h${headingLevel}`" class="timeline-title"
          ><component
            :is="linkComponent ?? ui.linkComponent"
            v-if="item.href"
            :href="item.href"
            class="timeline-link"
            >{{ item.title }}</component
          ><template v-else>{{ item.title }}</template></component
        >
        <p v-if="item.description">{{ item.description }}</p>
        <div v-if="$slots.meta" class="timeline-meta"><slot name="meta" :item="item" /></div>
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

  &--filled::before {
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
.timeline-link {
  color: inherit;
  text-decoration-color: var(--color-line);
  text-underline-offset: 0.25em;

  &:hover {
    text-decoration-color: currentcolor;
  }
}
.timeline-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 8px;
  margin-top: 4px;
  color: var(--color-muted);
  font-size: 13px;
}
.timeline-content {
  @container ui-timeline (max-width: 560px) {
    grid-column: 2;
    grid-row: 1;
    padding-top: 24px;
  }
}

// The date column is short in compact timelines, so it keeps its column at every width.
.is-compact {
  margin: 0;

  li {
    grid-template-columns: minmax(var(--ui-timeline-date-width, 3.2em), max-content) 16px minmax(
        0,
        1fr
      );
    gap: 8px;
    min-height: 76px;

    @container ui-timeline (max-width: 560px) {
      grid-template-columns: minmax(var(--ui-timeline-date-width, 3.2em), max-content) 16px minmax(
          0,
          1fr
        );
      gap: 8px;
    }
  }

  time,
  .timeline-marker,
  .timeline-content {
    @container ui-timeline (max-width: 560px) {
      grid-column: auto;
      grid-row: auto;
      padding-top: 0;
    }
  }

  time {
    padding-top: 1px;
  }

  .timeline-content {
    padding-bottom: 16px;
  }

  .timeline-title {
    font-size: 16px;
    line-height: 1.5;
  }

  p {
    margin-top: 4px;
    font-size: 13px;
    line-height: 1.7;
  }
}
</style>
