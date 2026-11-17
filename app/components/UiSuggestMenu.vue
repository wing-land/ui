<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useId,
  useTemplateRef,
  watch,
} from 'vue'
import type { UiSuggestItem } from '../lib/types'
import UiAvatar from './UiAvatar.vue'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    items: readonly UiSuggestItem[]
    /** Accessible name of the list. */
    label: string
    /**
     * Where the list opens, such as the caret's rectangle from `Range.getBoundingClientRect()`.
     * The list opens below it, or above when there is no room.
     */
    anchor: DOMRect | null
    /** `id` of the list. Option ids are `${id}-option-${index}`, with `index` counting every item. */
    id?: string
  }>(),
  { id: undefined },
)
const emit = defineEmits<{ select: [value: string] }>()
defineSlots<{ footer?: () => unknown }>()
const open = defineModel<boolean>('open', { default: false })
/** `value` of the highlighted item. The arrow keys stay with the caller, which keeps keyboard focus. */
const active = defineModel<string | null>('active', { default: null })

interface Section {
  key: number
  label?: { id: string; text: string }
  options: { index: number; item: Extract<UiSuggestItem, { value: string }> }[]
}

const fallbackId = useId()
const listId = computed(() => props.id ?? fallbackId)
const optionId = (index: number) => `${listId.value}-option-${index}`
const panel = useTemplateRef<HTMLElement>('panel')

// A listbox may hold only options and groups, so each label starts a labelled group and separators sit between groups.
const sections = computed(() => {
  const result: Section[] = []
  let current: Section = { key: 0, options: [] }
  props.items.forEach((item, index) => {
    if (item.type === 'separator' || item.type === 'label') {
      if (current.label || current.options.length > 0) result.push(current)
      current = { key: index, options: [] }
      if (item.type === 'label')
        current.label = { id: `${listId.value}-label-${index}`, text: item.label }
      return
    }
    current.options.push({ index, item })
  })
  if (current.label || current.options.length > 0) result.push(current)
  return result
})
const position = shallowRef({ left: 0, top: 0, maxHeight: 360 })

const gap = 6
const margin = 8
const preferredHeight = 360

// Below the anchor when it fits, otherwise on whichever side has more room; always inside the viewport.
function place() {
  const anchor = props.anchor
  const element = panel.value
  if (!anchor || !element) return
  const below = window.innerHeight - anchor.bottom - gap - margin
  const above = anchor.top - gap - margin
  const height = Math.min(element.scrollHeight, preferredHeight)
  const openBelow = below >= height || below >= above
  const maxHeight = Math.max(0, Math.min(preferredHeight, openBelow ? below : above))
  const shown = Math.min(height, maxHeight)
  const width = element.offsetWidth
  const left = Math.max(margin, Math.min(anchor.left, window.innerWidth - width - margin))
  const top = openBelow ? anchor.bottom + gap : anchor.top - gap - shown
  position.value = { left, top, maxHeight }
}

function scrollActiveIntoView() {
  const index = props.items.findIndex(
    (item) => item.type !== 'separator' && item.type !== 'label' && item.value === active.value,
  )
  if (index >= 0) document.getElementById(optionId(index))?.scrollIntoView({ block: 'nearest' })
}

watch(
  () => [open.value, props.anchor, props.items] as const,
  () => void nextTick(place),
)
watch(active, () => void nextTick(scrollActiveIntoView))
onMounted(() => window.addEventListener('resize', place))
onBeforeUnmount(() => window.removeEventListener('resize', place))

defineExpose({ optionId })
</script>

<template>
  <Teleport to="body">
    <!-- Keyboard focus stays where the person is typing: nothing in the list can take focus. -->
    <div
      v-if="open && anchor"
      ref="panel"
      class="ui-suggest-menu"
      :style="{
        left: `${position.left}px`,
        top: `${position.top}px`,
        maxHeight: `${position.maxHeight}px`,
      }"
      @mousedown.prevent
    >
      <div :id="listId" class="ui-suggest-menu__items" role="listbox" :aria-label="label">
        <div
          v-for="(section, sectionIndex) in sections"
          :key="section.key"
          :role="section.label ? 'group' : 'presentation'"
          :aria-labelledby="section.label?.id"
          :class="{ 'ui-suggest-menu__section': sectionIndex > 0 }"
        >
          <div
            v-if="section.label"
            :id="section.label.id"
            class="ui-suggest-menu__label"
            role="presentation"
          >
            {{ section.label.text }}
          </div>
          <div
            v-for="{ index, item } in section.options"
            :id="optionId(index)"
            :key="index"
            class="ui-suggest-menu__item"
            :class="{ 'is-muted': item.tone === 'muted' }"
            role="option"
            :aria-selected="item.value === active"
            :data-highlighted="item.value === active ? '' : undefined"
            @mousemove="active = item.value"
            @click="emit('select', item.value)"
          >
            <UiAvatar
              v-if="item.avatar"
              :name="item.avatar.name"
              :src="item.avatar.src"
              alt=""
              :size="24"
            />
            <UiIcon v-else-if="item.icon" :name="item.icon" />
            <span class="ui-suggest-menu__text">{{ item.label }}</span>
            <span v-if="item.meta" class="ui-suggest-menu__meta">{{ item.meta }}</span>
          </div>
        </div>
      </div>
      <div v-if="$slots.footer" class="ui-suggest-menu__footer" aria-hidden="true">
        <slot name="footer" />
      </div>
    </div>
  </Teleport>
</template>

<!-- Not scoped, like the other floating panels that are teleported to the body. -->
<style lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/floating';

@include component-base.base("[class*='ui-suggest-menu']");

.ui-suggest-menu {
  @include floating.panel;

  position: fixed;
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 240px;
  padding: 4px;
}
.ui-suggest-menu__items {
  min-height: 0;
  overflow-y: auto;
}
.ui-suggest-menu__item {
  @include floating.item;

  &.is-muted {
    color: var(--color-muted);
  }
}
.ui-suggest-menu__text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
.ui-suggest-menu__meta {
  flex: none;
  color: var(--color-muted);
  font-size: 12px;
}
.ui-suggest-menu__label {
  padding: 6px 10px 2px;
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
}
.ui-suggest-menu__section {
  margin: 4px -4px 0;
  padding: 4px 4px 0;
  border-top: 1px solid var(--color-line);
}
.ui-suggest-menu__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin: 4px -4px -4px;
  padding: 6px 14px;
  border-top: 1px solid var(--color-line);
  color: var(--color-muted);
  font-size: 11px;
}
</style>
