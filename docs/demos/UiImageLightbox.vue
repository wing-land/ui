<script setup lang="ts">
import { UiImageLightbox } from '@wing-land/ui'
import sample from './assets/sample.svg'
</script>
<template>
  <div class="demo">
    <UiImageLightbox :src="sample" alt="Abstract illustration of mountains"
      ><img :src="sample" alt="Abstract illustration of mountains" width="320" height="240"
    /></UiImageLightbox>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
