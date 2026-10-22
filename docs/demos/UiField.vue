<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiField, UiInput } from '@wing-land/ui'
const name = shallowRef('')
const email = shallowRef('ada@')
</script>
<template>
  <div class="demo">
    <UiField label="Name" description="Shown to other members." required>
      <UiInput v-model="name" autocomplete="name" />
    </UiField>
    <UiField
      label="Email"
      required
      required-indicator="asterisk"
      error="Enter a full email address."
    >
      <UiInput v-model="email" type="email" autocomplete="email" />
    </UiField>
    <UiField
      v-slot="field"
      label="Color"
      description="A native element receives the same attributes."
    >
      <input
        :id="field.id"
        type="color"
        :aria-describedby="field.describedBy"
        :aria-invalid="field.invalid || undefined"
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
