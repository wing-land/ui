<script setup lang="ts">
import { UiFigure } from '@wing-land/ui'
import sample from './assets/sample.svg'
</script>
<template>
  <div class="demo">
    <UiFigure :src="sample" alt="Abstract illustration of mountains" caption="Sample image"
      ><img :src="sample" alt="Abstract illustration of mountains" width="320" height="240"
    /></UiFigure>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
