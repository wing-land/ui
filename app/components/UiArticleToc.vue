<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useUiConfig } from '../lib/config'
import type { TocLink } from '../lib/types'

const props = withDefaults(
  defineProps<{
    links: readonly TocLink[]
    depth?: 2 | 3
    title?: string
    navigationLabel?: string
    showLabel?: string
    hideLabel?: string
    numbered?: boolean
    /** Highlights the heading being read. Off by default because it updates on scroll. */
    trackActive?: boolean
    /** Distance from the viewport top, in pixels, at which a heading becomes current. */
    activeOffset?: number
    /**
     * `auto` folds the list below 1280px and sticks it to the viewport above.
     * `rail` is always open and leaves placement to the parent, such as a sticky side column.
     */
    layout?: 'auto' | 'inline' | 'rail'
    /** `compact` uses 32px rows for side columns. */
    density?: 'default' | 'compact'
  }>(),
  {
    depth: 2,
    title: undefined,
    navigationLabel: undefined,
    showLabel: undefined,
    hideLabel: undefined,
    numbered: true,
    activeOffset: 96,
    layout: 'auto',
    density: 'default',
  },
)
const ui = useUiConfig()
const details = shallowRef<HTMLElement | null>(null)
const activeId = shallowRef<string | null>(null)
const trackedIds = computed(() =>
  props.links.flatMap((link) => [
    link.id,
    ...(props.depth === 3 ? (link.children ?? []).map((child) => child.id) : []),
  ]),
)
let frame = 0

function updateActive() {
  frame = 0
  let current: string | null = null
  for (const id of trackedIds.value) {
    const heading = document.getElementById(id)
    if (!heading) continue
    // A jump to `#id` stops the heading at its scroll-margin, which may sit below `activeOffset`.
    // The extra pixel absorbs sub-pixel scroll positions.
    const margin = parseFloat(getComputedStyle(heading).scrollMarginTop) || 0
    if (heading.getBoundingClientRect().top <= Math.max(props.activeOffset, margin) + 1)
      current = id
  }
  activeId.value = current
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateActive)
}

// The server renders an open TOC, so links remain available without JS.
// Set the mobile default once after hydration; later resizes preserve the reader's choice.
onMounted(() => {
  if (details.value instanceof HTMLDetailsElement) {
    details.value.open = !window.matchMedia('(max-width: 600px)').matches
  }
  if (!props.trackActive) return
  updateActive()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate, { passive: true })
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
})
</script>

<template>
  <component
    :is="layout === 'rail' ? 'div' : 'details'"
    ref="details"
    class="article-toc ui-article-toc"
    :class="[`ui-article-toc--${layout}`, { 'ui-article-toc--compact': density === 'compact' }]"
    :open="layout === 'rail' ? undefined : true"
  >
    <p v-if="layout === 'rail'" class="toc-title">{{ title ?? ui.messages.toc.title }}</p>
    <summary v-else>
      {{ title ?? ui.messages.toc.title
      }}<span class="toc-action" aria-hidden="true"
        ><span class="when-open">{{ hideLabel ?? ui.messages.toc.hide }}</span
        ><span class="when-closed">{{ showLabel ?? ui.messages.toc.show }}</span></span
      >
    </summary>
    <nav :aria-label="navigationLabel ?? ui.messages.toc.navigation">
      <ul>
        <li v-for="(link, index) in links" :key="link.id">
          <a :href="`#${link.id}`" :aria-current="activeId === link.id ? 'true' : undefined"
            ><span v-if="numbered" class="toc-number" aria-hidden="true">{{ index + 1 }}.</span
            ><span>{{ link.text }}</span></a
          >
          <ul v-if="depth === 3 && link.children?.length" class="toc-sublist">
            <li v-for="(child, childIndex) in link.children" :key="child.id">
              <a :href="`#${child.id}`" :aria-current="activeId === child.id ? 'true' : undefined"
                ><span v-if="numbered" class="toc-number" aria-hidden="true"
                  >{{ index + 1 }}.{{ childIndex + 1 }}.</span
                ><span>{{ child.text }}</span></a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.article-toc {
  margin-block: 32px;
  border-block: 1px solid var(--color-line);

  &[open] .when-closed,
  &:not([open]) .when-open {
    display: none;
  }

  &.ui-article-toc--auto {
    @media (min-width: 1280px) {
      position: sticky;
      top: 24px;
      max-height: calc(100vh - 48px);
      overflow-y: auto;
      margin: 0;
    }
  }

  &.ui-article-toc--rail {
    margin: 0;
    border: 0;
  }
}
summary {
  min-height: 44px;
  padding: 12px 4px;
  cursor: pointer;
  font-weight: 600;

  @media (min-width: 1280px) {
    .ui-article-toc--auto > & {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--color-canvas);
    }
  }
}
.toc-title {
  margin: 0;
  padding: 0 4px 8px;
  font-weight: 600;
}
.toc-action {
  float: right;
  font-size: 14px;
  color: var(--color-muted);
  font-weight: 400;
}
nav {
  padding: 0 4px 16px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 0;
}
a {
  display: flex;
  gap: 8px;
  padding-block: 8px;
  line-height: 1.7;
  color: inherit;
  text-decoration: none;

  &:hover,
  &[aria-current] {
    color: var(--color-accent);
    text-decoration: none;
  }
}
.toc-number {
  flex: none;
  font-weight: 600;
  white-space: nowrap;
}
.toc-sublist {
  padding-left: 20px;
  font-size: 0.9375em;
}
.ui-article-toc--rail nav {
  padding-bottom: 0;
}
.ui-article-toc--compact {
  .toc-title,
  summary {
    font-size: 14px;
  }

  nav > ul {
    border-inline-start: 1px solid var(--color-line);
  }

  a {
    align-items: center;
    min-height: var(--control-dense);
    margin-inline-start: -1px;
    padding-block: 4px;
    padding-inline: 12px 4px;
    border-inline-start: 2px solid transparent;
    font-size: 14px;
    line-height: 1.5;

    &[aria-current] {
      border-inline-start-color: var(--color-accent);
    }
  }

  .toc-sublist {
    padding-left: 0;
    font-size: inherit;

    a {
      padding-inline-start: 24px;
    }
  }
}
</style>
