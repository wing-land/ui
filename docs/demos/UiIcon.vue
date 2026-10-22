<script setup lang="ts">
import { UiIcon, uiIcons, type UiIconName } from '@wing-land/ui'
const names = Object.keys(uiIcons) as UiIconName[]
</script>
<template>
  <div class="demo">
    <ul class="icons">
      <li v-for="name in names" :key="name">
        <UiIcon :name="name" :size="24" />
        <code>{{ name }}</code>
      </li>
    </ul>
    <p><UiIcon name="info" label="Information" /> With label, the icon is announced.</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}
li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
</style>
