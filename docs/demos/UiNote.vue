<script setup lang="ts">
import { UiNote } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiNote icon="info">
      <strong>Accent</strong>
      <p>The default. A colored bar marks the start of the note.</p>
    </UiNote>
    <UiNote variant="outline">Outline keeps only the border.</UiNote>
    <UiNote variant="subtle">Subtle fills the box with a light background.</UiNote>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  padding: 1rem 0;
}
.demo :deep(.ui-note) {
  margin: 0;
}
p {
  margin: 4px 0 0;
}
</style>
