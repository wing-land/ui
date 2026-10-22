<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { UiPagination } from '@wing-land/ui'
const page = shallowRef(4)
const pageSize = 20
// offset and limit for an API that pages with them.
const offset = computed(() => (page.value - 1) * pageSize)
</script>
<template>
  <div class="demo">
    <UiPagination v-model:page="page" :total="480" :page-size="pageSize" />
    <p>offset={{ offset }}&amp;limit={{ pageSize }}</p>
    <UiPagination
      v-model:page="page"
      :total="480"
      :page-size="pageSize"
      size="sm"
      navigation-label="Pagination (compact)"
    />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 12px;
  padding: 1rem 0;
}
p {
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
}
</style>
