<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiRadioGroup } from '@wing-land/ui'
const expiry = shallowRef<string | null>('30')
const visibility = shallowRef<string | null>(null)
</script>
<template>
  <div class="demo">
    <UiRadioGroup
      v-model="expiry"
      label="Expiry"
      orientation="horizontal"
      :items="[
        { value: '7', label: '7 days' },
        { value: '30', label: '30 days' },
        { value: '90', label: '90 days' },
      ]"
    />
    <UiRadioGroup
      v-model="visibility"
      label="Visibility"
      required
      :items="[
        { value: 'private', label: 'Private', description: 'Only you can open the note.' },
        { value: 'members', label: 'Members', description: 'Everyone in the workspace.' },
      ]"
    />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 24px;
  padding: 1rem 0;
}
</style>
