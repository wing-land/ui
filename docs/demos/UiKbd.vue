<script setup lang="ts">
import { UiKbd } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <p>Press <UiKbd>Ctrl</UiKbd> + <UiKbd>K</UiKbd> to search notes.</p>
    <p>Close the panel with <UiKbd>Esc</UiKbd>.</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
p {
  margin: 0 0 8px;
}
</style>
