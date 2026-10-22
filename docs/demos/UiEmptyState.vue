<script setup lang="ts">
import { UiButton, UiEmptyState } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiEmptyState
      icon="search"
      title="No items yet"
      description="Create your first item to get started."
    >
      <template #actions><UiButton variant="solid" icon="plus">New item</UiButton></template>
    </UiEmptyState>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
