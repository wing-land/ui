<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiSearchInput, UiTabs } from '@wing-land/ui'
const tab = shallowRef('body')
const list = shallowRef('active')
const query = shallowRef('')
</script>
<template>
  <div class="demo">
    <UiTabs
      v-model="tab"
      label="Note"
      :items="[
        { value: 'body', label: 'Body' },
        { value: 'links', label: 'Links', badge: 4 },
        { value: 'backlinks', label: 'Backlinks', badge: 2 },
      ]"
    >
      <template #body><p>The note itself.</p></template>
      <template #links><p>4 links from this note.</p></template>
      <template #backlinks><p>2 notes link here.</p></template>
    </UiTabs>
    <UiTabs
      v-model="list"
      label="Notes to show"
      :items="[
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' },
      ]"
    >
      <template #end>
        <UiSearchInput
          v-model="query"
          size="sm"
          label="Filter this list"
          placeholder="Filter this list"
        />
      </template>
      <template #panel="{ item }"
        ><p>{{ item.label }} notes{{ query ? ` matching “${query}”` : '' }}</p></template
      >
    </UiTabs>
    <UiTabs
      label="Settings"
      orientation="vertical"
      :items="[
        { value: 'profile', label: 'Profile' },
        { value: 'tokens', label: 'Access tokens' },
      ]"
    >
      <template #panel="{ item }"
        ><p>{{ item.label }} settings</p></template
      >
    </UiTabs>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 32px;
  padding: 1rem 0;
}
p {
  margin: 0;
}
</style>
