<script setup lang="ts">
import UiDisclosure from '../../../app/components/UiDisclosure.vue'
import UiTableScroll from '../../../app/components/UiTableScroll.vue'
import { en, ja } from '../../../app/lib/messages'

// Sample arguments for the messages that are functions, so the table can show a real result.
const sampleArgs: Record<string, unknown[]> = {
  'codeBlock.region': ['TypeScript'],
  'image.viewLarger': ['Sunset'],
  'form.characterCount': [12, 100],
  'pagination.page': [3],
  'avatarGroup.more': [3],
}

function show(section: string, key: string, value: unknown) {
  if (typeof value !== 'function') return String(value)
  const args = sampleArgs[`${section}.${key}`]
  if (!args) throw new Error(`No sample arguments for ${section}.${key}`)
  return (value as (...values: unknown[]) => string)(...args)
}

const sections = Object.entries(en.messages).map(([section, values]) => ({
  section,
  rows: Object.entries(values as Record<string, unknown>).map(([key, value]) => {
    const args = sampleArgs[`${section}.${key}`]
    return {
      key: args ? `${key}(${args.map((arg) => JSON.stringify(arg)).join(', ')})` : key,
      en: show(section, key, value),
      ja: show(
        section,
        key,
        (ja.messages as Record<string, Record<string, unknown>>)[section]![key],
      ),
    }
  }),
}))
</script>

<template>
  <div class="docs-messages">
    <UiDisclosure
      v-for="{ section, rows } in sections"
      :key="section"
      :summary="section"
      variant="divided"
    >
      <UiTableScroll :label="`${section} text`" density="compact">
        <table>
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">en</th>
              <th scope="col">ja</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.key">
              <th scope="row">
                <code>{{ row.key }}</code>
              </th>
              <td>{{ row.en }}</td>
              <td>{{ row.ja }}</td>
            </tr>
          </tbody>
        </table>
      </UiTableScroll>
    </UiDisclosure>
  </div>
</template>

<style scoped>
.docs-messages {
  margin-block: 24px 32px;
}
/* The docs make Markdown tables scroll as blocks; these tables scroll inside UiTableScroll. */
.docs-messages table {
  display: table;
}
.docs-messages :deep(.ui-disclosure summary) {
  font-family: var(--font-mono);
}
th[scope='row'] code {
  white-space: nowrap;
}
</style>
