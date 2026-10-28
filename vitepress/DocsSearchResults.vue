<script setup lang="ts">
import { computed } from 'vue'
import { useDocsLabels } from './inject'
import { fill } from './labels'

export type SearchHit = { id: string; title: string; titles: string[] }

const props = defineProps<{
  id: string
  hits: SearchHit[]
  activeIndex: number
  searched: boolean
}>()
const emit = defineEmits<{ select: [hit: SearchHit]; hover: [index: number] }>()
const labels = useDocsLabels()
const status = computed(() => {
  const count = props.hits.length
  if (!count) return labels.value.noResults
  return fill(count === 1 ? labels.value.resultCountOne : labels.value.resultCountOther, { count })
})
</script>

<template>
  <ul
    v-show="hits.length"
    :id="id"
    class="docs-search-results"
    role="listbox"
    :aria-label="labels.searchResults"
  >
    <li
      v-for="(hit, i) in hits"
      :id="`${id}-${i}`"
      :key="hit.id"
      class="docs-search-result"
      :class="{ 'is-active': i === activeIndex }"
      role="option"
      :aria-selected="i === activeIndex"
      @mousedown.prevent
      @click="emit('select', hit)"
      @mousemove="emit('hover', i)"
    >
      <span v-if="hit.titles.length" class="docs-search-result__path">{{
        hit.titles.join(' › ')
      }}</span>
      <span class="docs-search-result__title">{{ hit.title }}</span>
    </li>
  </ul>
  <p class="docs-search-status" role="status">
    <template v-if="searched">{{ status }}</template>
  </p>
</template>

<style scoped>
.docs-search-results {
  max-height: min(60vh, 480px);
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
}

.docs-search-result {
  display: grid;
  gap: 2px;
  padding: 8px 12px;
  border-radius: var(--radius-control);
  cursor: pointer;
}

.docs-search-result.is-active {
  background: var(--color-surface);
}

.docs-search-result__path {
  color: var(--color-muted);
  font-size: 13px;
}

.docs-search-result__title {
  font-weight: 600;
}

.docs-search-status {
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 14px;
}
</style>
