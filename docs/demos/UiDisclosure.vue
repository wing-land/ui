<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiDisclosure } from '@wing-land/ui'
const open = shallowRef(false)
</script>
<template>
  <div class="demo">
    <div>
      <UiDisclosure v-model:open="open" summary="Advanced settings">
        <p>These settings change how notes are synced.</p>
      </UiDisclosure>
      <UiDisclosure summary="Export">
        <p>Download all notes as Markdown files.</p>
      </UiDisclosure>
      <p class="state">open: {{ open }}</p>
    </div>
    <div>
      <UiDisclosure variant="divided" summary="Divided">
        <p>Neighbors share one line.</p>
      </UiDisclosure>
      <UiDisclosure variant="divided" summary="Another item">
        <p>Use it for a list of questions.</p>
      </UiDisclosure>
    </div>
    <UiDisclosure variant="plain" summary="Plain">
      <p>Blends into body text.</p>
    </UiDisclosure>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 24px;
  padding: 1rem 0;
}
p {
  margin: 0;
}
.state {
  margin-top: 8px;
  color: var(--color-muted);
  font-size: 14px;
}
</style>
