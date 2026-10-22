<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiField, UiFormErrorSummary, UiInput, useFormErrors } from '@wing-land/ui'
const name = shallowRef('')
const expiresAt = shallowRef('')
const form = useFormErrors({ ids: { expiresAt: 'token-expires' } })

function checkName() {
  if (!name.value.trim()) form.set({ ...form.errors.value, name: ['Enter a name.'] })
}

// Stands in for a request that answers with an ASP.NET Core ValidationProblem.
function submit() {
  const errors: Record<string, string[]> = {}
  if (!name.value.trim()) errors.name = ['Enter a name.']
  if (!expiresAt.value) errors.expiresAt = ['Choose when the token expires.']
  if (!form.setFromProblem({ status: 400, errors })) form.clear()
}
</script>
<template>
  <form class="demo" novalidate @submit.prevent="submit">
    <UiFormErrorSummary :errors="form.summary.value" />
    <UiField id="name" label="Name" required :error="form.get('name')">
      <UiInput v-model="name" @blur="checkName" @input="name.trim() && form.clear('name')" />
    </UiField>
    <UiField id="token-expires" label="Expires at" required :error="form.get('expiresAt')">
      <UiInput v-model="expiresAt" type="date" @input="form.clear('expiresAt')" />
    </UiField>
    <UiButton type="submit" variant="solid">Create token</UiButton>
  </form>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 24px;
  justify-items: start;
  max-width: 420px;
  padding: 1rem 0;
}
.demo > :deep(.ui-field) {
  justify-self: stretch;
  margin: 0;
}
.demo > :deep(.ui-form-error-summary) {
  margin: 0;
}
</style>
