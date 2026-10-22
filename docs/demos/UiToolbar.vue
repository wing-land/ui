<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiToolbar, UiToolbarButton, UiToolbarSeparator } from '@wing-land/ui'
const bold = shallowRef(false)
const italic = shallowRef(true)
</script>
<template>
  <div class="demo">
    <UiToolbar label="Formatting">
      <UiToolbarButton v-model:pressed="bold">B</UiToolbarButton>
      <UiToolbarButton v-model:pressed="italic"><i>I</i></UiToolbarButton>
      <UiToolbarSeparator />
      <UiToolbarButton icon="external" label="Insert link" />
      <UiToolbarButton icon="copy" label="Copy" />
      <UiToolbarSeparator />
      <UiToolbarButton disabled>Undo</UiToolbarButton>
    </UiToolbar>
    <p>Tab enters the toolbar once; the arrow keys move between buttons.</p>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 8px;
  justify-items: start;
  padding: 1rem 0;
}
p {
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
}
</style>
