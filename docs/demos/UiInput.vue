<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiField, UiInput } from '@wing-land/ui'
const title = shallowRef('Weekly notes')
const expires = shallowRef('')
const filter = shallowRef('')
</script>
<template>
  <div class="demo">
    <UiField label="Title">
      <UiInput v-model="title" :maxlength="100" show-count />
    </UiField>
    <UiField label="Expires at">
      <UiInput v-model="expires" type="datetime-local" />
    </UiField>
    <UiField label="Disabled" disabled>
      <UiInput model-value="Cannot be changed" />
    </UiField>
    <UiInput v-model="filter" size="sm" icon="search" aria-label="Filter" placeholder="Filter" />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 24px;
  max-width: 420px;
  padding: 1rem 0;
}
.demo > :deep(.ui-field) {
  margin: 0;
}
</style>
