<script setup lang="ts">
import { UiBadge } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiBadge>Draft</UiBadge>
    <UiBadge tone="info">Shared</UiBadge>
    <UiBadge tone="success" icon="check">Active</UiBadge>
    <UiBadge tone="warning">Expires soon</UiBadge>
    <UiBadge tone="danger">Revoked</UiBadge>
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 1rem 0;
}
</style>
