<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiSearchInput } from '@wing-land/ui'
const query = shallowRef('')
const filter = shallowRef('design')
</script>
<template>
  <div class="demo">
    <UiSearchInput v-model="query" label="Search notes" placeholder="Search notes" />
    <UiSearchInput v-model="filter" size="sm" label="Filter tags" />
    <p>Query: {{ query || '—' }}</p>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 12px;
  max-width: 420px;
  padding: 1rem 0;
}
p {
  margin: 0;
}
</style>
