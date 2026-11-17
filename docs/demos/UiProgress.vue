<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { UiProgress } from '@wing-land/ui'

const uploaded = ref(64)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => (uploaded.value = uploaded.value >= 100 ? 0 : uploaded.value + 4), 400)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="demo">
    <p class="row">
      <span>review-board.png — {{ uploaded }}%</span>
      <UiProgress :value="uploaded" label="Uploading review-board.png" />
    </p>
    <p class="row">
      <span>Preparing…</span>
      <UiProgress label="Preparing the export" />
    </p>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  gap: 1rem;
  max-width: 360px;
  padding: 1rem 0;
}
.row {
  display: grid;
  gap: 6px;
  margin: 0;
  font-size: 14px;
}
</style>
