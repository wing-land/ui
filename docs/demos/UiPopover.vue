<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiCheckboxGroup, UiPopover } from '@wing-land/ui'
const tags = shallowRef<readonly string[]>(['work'])
</script>
<template>
  <div class="demo">
    <UiPopover label="Filter notes">
      <template #trigger>
        <UiButton icon="chevron-down" icon-position="end">Filters ({{ tags.length }})</UiButton>
      </template>
      <template #default="{ close }">
        <UiCheckboxGroup v-model="tags" label="Tags" :items="['work', 'personal', 'reading']" />
        <UiButton size="sm" variant="solid" @click="close">Done</UiButton>
      </template>
    </UiPopover>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
