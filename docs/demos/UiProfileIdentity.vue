<script setup lang="ts">
import { UiProfileIdentity } from '@wing-land/ui'
import sample from './assets/sample.svg'
</script>
<template>
  <div class="demo">
    <UiProfileIdentity
      name="Hana Yamada"
      alias="hanako"
      description="A short introduction for the profile."
      :image-src="sample"
      image-alt="Abstract illustration of mountains"
    />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
