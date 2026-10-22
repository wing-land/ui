<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiSwitch } from '@wing-land/ui'
const sync = shallowRef(true)
</script>
<template>
  <div class="demo">
    <UiSwitch
      v-model="sync"
      label="Sync automatically"
      description="Changes are saved as you type."
    />
    <UiSwitch label="Beta features" disabled />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
