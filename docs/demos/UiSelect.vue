<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiField, UiSelect } from '@wing-land/ui'
const sort = shallowRef('updated')
const folder = shallowRef('')
</script>
<template>
  <div class="demo">
    <UiField label="Sort by">
      <UiSelect
        v-model="sort"
        :options="[
          { value: 'updated', label: 'Last updated' },
          { value: 'created', label: 'Date created' },
          { value: 'title', label: 'Title' },
        ]"
      />
    </UiField>
    <UiField label="Folder" required>
      <UiSelect
        v-model="folder"
        :options="['Inbox', 'Work', 'Archive']"
        placeholder="Choose a folder"
      />
    </UiField>
    <p>Selected: {{ sort }} / {{ folder || '—' }}</p>
  </div>
</template>
<style scoped>
.demo {
  max-width: 420px;
  padding: 1rem 0;
}
</style>
