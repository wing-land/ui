<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { UiCheckboxGroup } from '@wing-land/ui'
const scopes = shallowRef<readonly string[]>([])
const error = computed(() => (scopes.value.length ? null : 'Choose at least one scope.'))
</script>
<template>
  <div class="demo">
    <UiCheckboxGroup
      v-model="scopes"
      label="Scopes"
      required
      :error="error"
      :items="[
        { value: 'read', label: 'read', description: 'Read notes and folders.' },
        { value: 'write', label: 'write', description: 'Create and edit notes.' },
        { value: 'admin', label: 'admin', description: 'Manage members and tokens.' },
      ]"
    />
    <p>Selected: {{ scopes.join(', ') || '—' }}</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
