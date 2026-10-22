<script setup lang="ts">
import { UiAvatar } from '@wing-land/ui'
import sample from './assets/sample.svg'
</script>
<template>
  <div class="demo">
    <UiAvatar name="Margaret Hamilton" :src="sample" :size="56" />
    <UiAvatar name="Ada Lovelace" />
    <UiAvatar name="No Image" src="/missing.png" :size="32" />
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 1rem 0;
}
</style>
