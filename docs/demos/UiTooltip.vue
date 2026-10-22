<script setup lang="ts">
import { UiButton, UiTooltip } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiTooltip text="Copy a link to this note">
      <UiButton icon="copy" label="Copy link" />
    </UiTooltip>
    <UiTooltip text="Opens on the right" side="right">
      <UiButton>Hover or focus</UiButton>
    </UiTooltip>
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  gap: 8px;
  padding: 2rem 0 1rem;
}
</style>
