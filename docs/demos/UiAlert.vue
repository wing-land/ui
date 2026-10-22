<script setup lang="ts">
import { UiAlert, UiButton } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiAlert title="Synced">All changes are saved to the server.</UiAlert>
    <UiAlert tone="success" title="Token created" />
    <UiAlert tone="warning" title="Connection is unstable"
      >Edits are saved on this device until you reconnect.</UiAlert
    >
    <UiAlert tone="danger" title="Could not save">
      Check your network connection.
      <template #actions><UiButton size="sm">Retry</UiButton></template>
    </UiAlert>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 12px;
  padding: 1rem 0;
}
</style>
