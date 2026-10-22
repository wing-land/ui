<script setup lang="ts">
import { UiButton, UiIcon, UiVisuallyHidden } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiButton>
      <UiIcon name="search" />
      <UiVisuallyHidden>Search</UiVisuallyHidden>
    </UiButton>
    <p>The button's accessible name is "Search".</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
