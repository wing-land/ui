<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiConfirmDialog, useConfirm } from '@wing-land/ui'
const { dialog, confirm } = useConfirm()
const result = shallowRef('')
async function remove() {
  const ok = await confirm({
    title: 'Delete this item?',
    description: 'Deleted items cannot be restored.',
    confirmLabel: 'Delete',
    tone: 'danger',
  })
  result.value = ok ? 'Deleted' : 'Canceled'
}
</script>
<template>
  <div class="demo">
    <UiButton tone="danger" @click="remove">Delete item</UiButton>
    <p role="status">{{ result }}</p>
    <UiConfirmDialog v-bind="dialog" />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
