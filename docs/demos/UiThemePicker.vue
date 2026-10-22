<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiThemePicker } from '@wing-land/ui'
const theme = shallowRef('system')
</script>
<template>
  <div class="demo">
    <UiThemePicker v-model="theme" />
    <p>Selected: {{ theme }}</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
