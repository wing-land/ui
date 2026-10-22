<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiModal } from '@wing-land/ui'
const open = shallowRef(false)
const draft = shallowRef('')
const legacy = shallowRef<{ open: () => void; close: () => void } | null>(null)
function confirmDiscard() {
  return draft.value === '' || window.confirm('Discard your changes?')
}
</script>
<template>
  <div class="demo">
    <UiButton @click="open = true">Open with v-model</UiButton>
    <UiButton @click="legacy?.open()">Open with ref</UiButton>
    <UiModal
      v-model:open="open"
      title="Rename item"
      description="Closing with unsaved input asks for confirmation."
      :before-close="confirmDiscard"
    >
      <input v-model="draft" aria-label="New name" />
      <template #footer>
        <UiButton variant="ghost" @click="open = false">Cancel</UiButton>
        <UiButton variant="solid" @click="((draft = ''), (open = false))">Save</UiButton>
      </template>
    </UiModal>
    <UiModal ref="legacy" label="Example">
      <p>Close it with Escape or the close button.</p>
      <UiButton @click="legacy?.close()">Close</UiButton>
    </UiModal>
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  gap: 8px;
  padding: 1rem 0;
}
</style>
