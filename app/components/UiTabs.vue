<script setup lang="ts">
import { computed } from 'vue'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import type { UiTabItem } from '../lib/types'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    items: readonly UiTabItem[]
    /** Accessible name of the tab list. */
    label?: string
    /** `manual` waits for Enter or Space before switching, for panels that are slow to show. */
    activationMode?: 'automatic' | 'manual'
    orientation?: 'horizontal' | 'vertical'
    /** Keeps hidden panels in the page so that their state, such as form input, survives. */
    keepMounted?: boolean
  }>(),
  { label: undefined, activationMode: 'automatic', orientation: 'horizontal' },
)
type PanelSlot = (props: { item: UiTabItem }) => unknown
// Each panel can also use a slot named after its item's `value`.
defineSlots<{ panel?: PanelSlot; [value: string]: PanelSlot | undefined }>()
const model = defineModel<string>()
const value = computed(() => model.value ?? props.items[0]?.value)
</script>

<template>
  <TabsRoot
    class="ui-tabs"
    :class="`ui-tabs--${orientation}`"
    :model-value="value"
    :activation-mode="activationMode"
    :orientation="orientation"
    :unmount-on-hide="!keepMounted"
    @update:model-value="model = String($event)"
  >
    <TabsList class="ui-tabs__list" :aria-label="label">
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        class="ui-tabs__trigger"
        :value="item.value"
        :disabled="item.disabled"
      >
        <UiIcon v-if="item.icon" :name="item.icon" />{{ item.label
        }}<span v-if="item.badge !== undefined" class="ui-tabs__badge">{{ item.badge }}</span>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="item in items" :key="item.value" class="ui-tabs__panel" :value="item.value">
      <slot :name="item.value" :item="item"><slot name="panel" :item="item" /></slot>
    </TabsContent>
  </TabsRoot>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-tabs--vertical {
  display: flex;
  gap: var(--space-6);
}
.ui-tabs__list {
  display: flex;
  gap: var(--space-4);
  border-bottom: 1px solid var(--color-line);
  overflow-x: auto;
  scrollbar-width: thin;

  .ui-tabs--vertical & {
    flex-direction: column;
    gap: 0;
    border-bottom: 0;
    border-inline-end: 1px solid var(--color-line);
  }
}
.ui-tabs__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: var(--control-min);
  margin-bottom: -1px;
  padding: 0 2px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-muted);
  font: inherit;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard);

  &:hover {
    color: var(--color-text);
    border-bottom-color: var(--color-muted);
  }

  &[data-state='active'] {
    border-bottom-color: var(--color-accent);
    color: var(--color-accent);
    font-weight: 600;
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline-offset: -2px;
  }

  .ui-tabs--vertical & {
    justify-content: flex-start;
    margin: 0 -1px 0 0;
    padding: 0 var(--space-4) 0 0;
    border-bottom: 0;
    border-inline-end: 2px solid transparent;

    &[data-state='active'] {
      border-inline-end-color: var(--color-accent);
    }

    &:hover:not([data-state='active']) {
      border-inline-end-color: var(--color-muted);
    }
  }
}
.ui-tabs__badge {
  padding: 0 6px;
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
.ui-tabs__panel {
  flex: 1;
  min-width: 0;
  padding-top: var(--space-4);

  .ui-tabs--vertical & {
    padding-top: 0;
  }

  &:focus-visible {
    outline-offset: 2px;
  }
}
</style>
