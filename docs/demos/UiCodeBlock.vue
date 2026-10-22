<script setup lang="ts">
import { UiCodeBlock } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiCodeBlock
      code="const greeting = 'Hello'"
      language="ts"
      filename="example.ts"
      code-aria-label="TypeScript code. Long lines scroll horizontally."
      copy-label="Copy"
      copied-label="Copied"
      copy-error-label="Could not copy. Select the code and copy it manually."
    />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
