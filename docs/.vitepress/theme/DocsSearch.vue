<script setup lang="ts">
import searchIndexes from '@localSearchIndex'
import MiniSearch from 'minisearch'
import { useRouter } from 'vitepress'
import { computed, onMounted, onUnmounted, shallowRef, useId, watch } from 'vue'
import UiButton from '../../../app/components/UiButton.vue'
import UiKbd from '../../../app/components/UiKbd.vue'
import UiModal from '../../../app/components/UiModal.vue'
import UiSearchInput from '../../../app/components/UiSearchInput.vue'
import { searchIndexOptions, searchQueryOptions } from '../search'
import DocsSearchResults, { type SearchHit } from './DocsSearchResults.vue'

// Matches the breakpoint where style.css hides the header navigation.
const wideScreen = '(min-width: 761px)'

const router = useRouter()
const inlineListId = useId()
const modalListId = useId()
const modalOpen = shallowRef(false)
const inlineOpen = shallowRef(false)
const inlineInput = shallowRef<InstanceType<typeof UiSearchInput> | null>(null)
const query = shallowRef('')
const activeIndex = shallowRef(0)
// VitePress builds one index per locale, and the component pages are a separate locale.
const indexes = shallowRef<MiniSearch[]>([])

const hits = computed<SearchHit[]>(() => {
  if (!indexes.value.length || !query.value.trim()) return []
  return indexes.value
    .flatMap((index) => index.search(query.value, searchQueryOptions))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((result) => ({ id: result.id, title: result.title, titles: result.titles }))
})
const searched = computed(() => Boolean(indexes.value.length && query.value.trim()))
const listId = computed(() => (modalOpen.value ? modalListId : inlineListId))
const activeId = computed(() =>
  hits.value.length ? `${listId.value}-${activeIndex.value}` : undefined,
)

async function loadIndex() {
  if (indexes.value.length) return
  const loaders = Object.values(searchIndexes)
  indexes.value = await Promise.all(
    loaders.map(async (load) => MiniSearch.loadJSON((await load()).default, searchIndexOptions)),
  )
}

function closeInline() {
  inlineOpen.value = false
}

function go(hit: SearchHit) {
  modalOpen.value = false
  closeInline()
  query.value = ''
  ;(document.activeElement as HTMLElement | null)?.blur()
  void router.go(hit.id)
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.isComposing) return
  if (event.key === 'Escape' && !modalOpen.value) {
    // Chrome clears a search input on Escape; here it only closes the results.
    event.preventDefault()
    if (inlineOpen.value && query.value) closeInline()
    else (event.target as HTMLElement).blur()
    return
  }
  const count = hits.value.length
  if (!count) return
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    inlineOpen.value = true
    const step = event.key === 'ArrowDown' ? 1 : -1
    activeIndex.value = (activeIndex.value + step + count) % count
    document.getElementById(activeId.value!)?.scrollIntoView({ block: 'nearest' })
  } else if (event.key === 'Enter') {
    event.preventDefault()
    go(hits.value[activeIndex.value]!)
  }
}

function onInlineFocus() {
  inlineOpen.value = true
  void loadIndex()
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

function onGlobalKeydown(event: KeyboardEvent) {
  const shortcut =
    (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
    (event.key === '/' && !isTyping(event.target))
  if (!shortcut) return
  event.preventDefault()
  if (window.matchMedia(wideScreen).matches) inlineInput.value?.focus()
  else modalOpen.value = true
}

watch(hits, () => {
  activeIndex.value = 0
})
watch(modalOpen, (value) => {
  if (value) void loadIndex()
})
onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <div class="docs-search-inline">
    <UiSearchInput
      ref="inlineInput"
      v-model="query"
      size="sm"
      label="Search docs"
      clear-label="Clear search"
      placeholder="Search"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="inlineOpen && hits.length > 0"
      :aria-controls="inlineListId"
      :aria-activedescendant="inlineOpen ? activeId : undefined"
      @focus="onInlineFocus"
      @input="inlineOpen = true"
      @blur="closeInline"
      @keydown="onInputKeydown"
    />
    <UiKbd v-if="!query" class="docs-search-inline__key" aria-hidden="true">/</UiKbd>
    <div v-show="inlineOpen && searched" class="docs-search-inline__panel">
      <DocsSearchResults
        :id="inlineListId"
        :hits="hits"
        :active-index="activeIndex"
        :searched="searched"
        @select="go"
        @hover="activeIndex = $event"
      />
    </div>
  </div>

  <UiButton
    class="docs-search-button"
    variant="ghost"
    icon="search"
    label="Search"
    @click="modalOpen = true"
  />
  <UiModal v-model:open="modalOpen" label="Search docs" close-label="Close" size="large">
    <UiSearchInput
      v-model="query"
      label="Search docs"
      clear-label="Clear search"
      autofocus
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="hits.length > 0"
      :aria-controls="modalListId"
      :aria-activedescendant="activeId"
      @keydown="onInputKeydown"
    />
    <div v-if="modalOpen" class="docs-search-modal-results">
      <DocsSearchResults
        :id="modalListId"
        :hits="hits"
        :active-index="activeIndex"
        :searched="searched"
        @select="go"
        @hover="activeIndex = $event"
      />
    </div>
  </UiModal>
</template>

<style scoped>
.docs-search-inline {
  position: relative;
  width: 220px;
}

.docs-search-inline__key {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 8px;
  transform: translateY(-50%);
  pointer-events: none;
}

.docs-search-inline__panel {
  position: absolute;
  z-index: var(--z-popover);
  inset-block-start: calc(100% + 6px);
  inset-inline-end: 0;
  width: min(420px, calc(100vw - 32px));
  padding: 8px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: var(--color-canvas);
  box-shadow: var(--shadow-popover);
}

.docs-search-inline__panel :deep(.docs-search-status) {
  margin: 4px 4px 0;
}

.docs-search-modal-results {
  margin-block-start: 12px;
}

.docs-search-button {
  display: none;
}

@media (max-width: 760px) {
  .docs-search-inline {
    display: none;
  }

  .docs-search-button {
    display: inline-flex;
  }
}
</style>
