<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { UiLoadMore } from '@wing-land/ui'
const total = 45
const shown = shallowRef(20)
const loading = shallowRef(false)
const status = computed(() => `Showing ${shown.value} of ${total}`)

function load() {
  loading.value = true
  setTimeout(() => {
    shown.value = Math.min(total, shown.value + 20)
    loading.value = false
  }, 600)
}
</script>
<template>
  <div class="demo">
    <UiLoadMore :loading="loading" :has-more="shown < total" :status="status" @load="load" />
    <button v-if="shown >= total" type="button" class="reset" @click="shown = 20">Reset</button>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
  text-align: center;
}
</style>
