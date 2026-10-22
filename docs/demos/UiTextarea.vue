<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiField, UiTextarea } from '@wing-land/ui'
const summary = shallowRef('')
</script>
<template>
  <div class="demo">
    <UiField label="Summary" description="Up to 2,000 characters.">
      <UiTextarea v-model="summary" :maxlength="2000" show-count />
    </UiField>
  </div>
</template>
<style scoped>
.demo {
  max-width: 480px;
  padding: 1rem 0;
}
</style>
