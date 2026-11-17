<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { UiSuggestMenu, type UiSuggestItem } from '@wing-land/ui'

const people = [
  { value: 'kei', label: 'Kei Tanaka', meta: '@kei' },
  { value: 'mio', label: 'Mio Sato', meta: '@mio' },
  { value: 'wing', label: 'Wing', meta: '@wing' },
]
const text = ref('Review by @')
const open = ref(true)
const active = ref<string | null>('kei')
const field = useTemplateRef<HTMLInputElement>('field')
const anchor = ref<DOMRect | null>(null)

const query = computed(() => /@(\w*)$/.exec(text.value)?.[1]?.toLowerCase() ?? null)
const items = computed<UiSuggestItem[]>(() => [
  { type: 'label', label: 'People' },
  ...people
    .filter((person) => query.value !== null && person.value.startsWith(query.value))
    .map((person) => ({ ...person, avatar: { name: person.label } })),
])
const choices = computed(() =>
  items.value.flatMap((item) =>
    item.type === undefined || item.type === 'item' ? [item.value] : [],
  ),
)

function update() {
  open.value = query.value !== null && choices.value.length > 0
  anchor.value = field.value?.getBoundingClientRect() ?? null
  if (!choices.value.includes(active.value ?? '')) active.value = choices.value[0] ?? null
}

function move(step: number) {
  const index = choices.value.indexOf(active.value ?? '')
  active.value = choices.value[(index + step + choices.value.length) % choices.value.length] ?? null
}

function choose(value: string | null) {
  if (!value) return
  text.value = text.value.replace(/@\w*$/, `@${value} `)
  open.value = false
}
</script>

<template>
  <div class="demo">
    <input
      ref="field"
      v-model="text"
      class="field"
      aria-label="Comment"
      aria-controls="demo-people"
      @input="update"
      @focus="update"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="choose(active)"
      @keydown.esc="open = false"
    />
    <UiSuggestMenu
      id="demo-people"
      v-model:open="open"
      v-model:active="active"
      label="People to mention"
      :items="items"
      :anchor="anchor"
      @select="choose"
    >
      <template #footer
        ><span>↑↓ to choose</span><span>Enter to insert</span><span>Esc to close</span></template
      >
    </UiSuggestMenu>
  </div>
</template>

<style scoped>
.demo {
  padding: 1rem 0 9rem;
}
.field {
  width: min(100%, 320px);
  padding: 8px 12px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: var(--color-field);
  color: var(--color-text);
  font: inherit;
}
</style>
