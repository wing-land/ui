<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiConnectionStatus, type UiConnectionState } from '@wing-land/ui'
const states: UiConnectionState[] = ['connected', 'connecting', 'reconnecting', 'offline']
const status = shallowRef<UiConnectionState>('connected')
</script>
<template>
  <div class="demo">
    <div class="row">
      <UiConnectionStatus :status="status" />
      <UiConnectionStatus :status="status" compact />
    </div>
    <div class="row">
      <UiButton v-for="state in states" :key="state" size="sm" @click="status = state">{{
        state
      }}</UiButton>
    </div>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  padding: 1rem 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}
</style>
