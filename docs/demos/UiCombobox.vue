<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { UiCombobox, UiField, type UiChoiceOption } from '@wing-land/ui'
const notes: UiChoiceOption[] = [
  { value: 'n1', label: 'Weekly review', description: 'Projects' },
  { value: 'n2', label: 'Reading list', description: 'Personal' },
  { value: 'n3', label: 'Weekend plans', description: 'Personal' },
  { value: 'n4', label: 'Design system', description: 'Work' },
]
const linked = shallowRef<string | null>(null)

// Server-side search: the component does not filter, and the results follow `search`.
const search = shallowRef('')
const results = shallowRef<UiChoiceOption[]>([])
const loading = shallowRef(false)
let timer: ReturnType<typeof setTimeout> | undefined
watch(search, (term) => {
  clearTimeout(timer)
  loading.value = true
  timer = setTimeout(() => {
    const query = term.toLowerCase()
    results.value = notes.filter((note) => note.label.toLowerCase().includes(query))
    loading.value = false
  }, 400)
})
</script>
<template>
  <div class="demo">
    <UiField label="Link to note">
      <UiCombobox v-model="linked" :items="notes" placeholder="Type a note title" />
    </UiField>
    <UiField label="Search notes" description="Results come from the server.">
      <UiCombobox
        v-model:search="search"
        :items="results"
        :filter="false"
        :loading="loading"
        icon="search"
      />
    </UiField>
  </div>
</template>
<style scoped>
.demo {
  max-width: 420px;
  padding: 1rem 0;
}
</style>
