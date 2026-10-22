<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiCheckbox } from '@wing-land/ui'
const agreed = shallowRef(false)
const archived = shallowRef(false)
</script>
<template>
  <div class="demo">
    <UiCheckbox v-model="agreed" label="I have saved the token" />
    <UiCheckbox
      v-model="archived"
      label="Include archived notes"
      description="Archived notes are hidden from the list by default."
    />
    <UiCheckbox label="Select all" indeterminate />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
