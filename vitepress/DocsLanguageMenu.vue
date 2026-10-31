<script setup lang="ts">
import { computed, nextTick, shallowRef, useId } from 'vue'
import UiIcon from '../app/components/UiIcon.vue'
import { useDismiss } from '../app/lib/dismiss'
import { useDocsLabels } from './inject'
import { fill } from './labels'
import type { DocsLocaleLink } from './locales'

const props = defineProps<{ locales: readonly DocsLocaleLink[] }>()
const labels = useDocsLabels()
const panelId = useId()
const open = shallowRef(false)
const root = shallowRef<HTMLElement | null>(null)
const trigger = shallowRef<HTMLButtonElement | null>(null)
const current = computed(() => props.locales.find((locale) => locale.current))

useDismiss({ open, inside: root, returnFocusTo: trigger })

async function focusCurrent() {
  open.value = true
  await nextTick()
  root.value?.querySelector<HTMLAnchorElement>('a[aria-current="true"], a')?.focus()
}
</script>

<template>
  <div ref="root" class="docs-language-menu">
    <button
      ref="trigger"
      type="button"
      :aria-label="fill(labels.languageCurrent, { language: current?.label ?? '' })"
      :aria-expanded="open"
      :aria-controls="open ? panelId : undefined"
      @click="open = !open"
      @keydown.down.prevent="focusCurrent()"
    >
      <UiIcon name="globe" />
    </button>
    <nav v-if="open" :id="panelId" class="docs-language-panel" :aria-label="labels.language">
      <p class="docs-language-title" aria-hidden="true">{{ labels.language }}</p>
      <ul>
        <li v-for="locale in locales" :key="locale.key">
          <a
            :href="locale.link"
            :lang="locale.lang"
            :hreflang="locale.lang"
            :aria-current="locale.current ? 'true' : undefined"
            @click="open = false"
          >
            <span class="docs-language-text">{{ locale.label }}</span>
            <UiIcon v-if="locale.current" class="docs-language-check" name="check" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.docs-language-menu {
  position: relative;
  width: fit-content;
}
/* Same size and states as the UiThemePicker trigger next to it. */
button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
button:hover,
button[aria-expanded='true'] {
  background: var(--color-surface);
}
button:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-accent);
  outline-offset: 2px;
}
button .ui-icon {
  width: 22px;
  height: 22px;
  stroke-width: 1.7;
}
.docs-language-panel {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: var(--z-popover);
  min-width: 180px;
  max-width: min(320px, calc(100vw - 16px));
  padding: 4px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-popover);
  background: var(--color-canvas);
  color: var(--color-text);
  box-shadow: var(--shadow-popover);
}
.docs-language-title {
  margin: 0;
  padding: 6px 10px 2px;
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
}
ul {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: var(--control-dense);
  padding: 4px 10px;
  border-radius: var(--radius-control);
  color: var(--color-text);
  font-size: var(--font-size-small);
  line-height: 1.5;
  text-decoration: none;
}
a:hover {
  background: var(--color-surface);
}
a:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-accent);
  outline-offset: -2px;
}
.docs-language-text {
  flex: 1;
}
.docs-language-check {
  color: var(--color-accent);
}
</style>
