<script setup lang="ts">
import { UiSeparator } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <p>Notes</p>
    <UiSeparator />
    <div class="row">
      <span>Edit</span>
      <UiSeparator orientation="vertical" decorative />
      <span>Share</span>
    </div>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
p {
  margin: 0;
}
.row {
  display: flex;
  align-items: center;
}
</style>
