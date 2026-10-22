<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton } from '@wing-land/ui'
const count = shallowRef(0)
const saving = shallowRef(false)
function save() {
  saving.value = true
  setTimeout(() => (saving.value = false), 1500)
}
</script>
<template>
  <div class="demo">
    <div class="row">
      <UiButton @click="count++">Clicked {{ count }}</UiButton>
      <UiButton variant="solid">Save</UiButton>
      <UiButton variant="ghost">Cancel</UiButton>
      <UiButton tone="danger">Delete</UiButton>
      <UiButton variant="solid" tone="danger">Delete permanently</UiButton>
    </div>
    <div class="row">
      <UiButton icon="plus">New item</UiButton>
      <UiButton icon="arrow-right" icon-position="end" href="/">View all</UiButton>
      <UiButton icon="search" label="Search" />
      <UiButton :loading="saving" variant="solid" @click="save">{{
        saving ? 'Saving' : 'Save changes'
      }}</UiButton>
      <UiButton disabled>Disabled</UiButton>
    </div>
    <div class="row" role="toolbar" aria-label="Formatting">
      <UiButton size="sm" variant="ghost" icon="copy" label="Copy" />
      <UiButton size="sm">Small button</UiButton>
      <UiButton size="sm" variant="solid">Apply</UiButton>
    </div>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  padding: 1rem 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
