<script setup lang="ts">
import { UiCopyField } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiCopyField
      label="Personal access token"
      description="This token is shown only once. Store it somewhere safe."
      value="nya_pat_5f3c9a1e7b2d4c6f8a0e"
    />
  </div>
</template>
<style scoped>
.demo {
  max-width: 520px;
  padding: 1rem 0;
}
</style>
