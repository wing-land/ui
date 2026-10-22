<script setup lang="ts">
import { withBase } from 'vitepress'
import { computed } from 'vue'
import UiTableScroll from '../../../app/components/UiTableScroll.vue'
import { data, type ComponentApi } from '../api.data'

const props = defineProps<{ name: string }>()
const api = computed(() => {
  const value = data[props.name]
  if (!value) throw new Error(`No API data for ${props.name}`)
  return value
})

const typeLinks: Record<string, string> = {
  UiIconName: '/components/icon',
  UiLinkComponent: '/config',
  UiConfigInput: '/config',
}

const sections: {
  key: keyof ComponentApi
  title: string
  name: string
  value?: string
  type: string
}[] = [
  { key: 'props', title: 'Props', name: 'Prop', value: 'Default', type: 'Type' },
  { key: 'events', title: 'Events', name: 'Event', type: 'Payload' },
  { key: 'slots', title: 'Slots', name: 'Slot', type: 'Slot props' },
  { key: 'exposed', title: 'Exposed', name: 'Name', type: 'Type' },
]
</script>

<template>
  <div class="docs-api">
    <template v-for="section in sections" :key="section.key">
      <section v-if="api[section.key].length" class="docs-api-section">
        <h4>{{ section.title }}</h4>
        <UiTableScroll :label="`${name} ${section.title}`" density="compact">
          <table>
            <thead>
              <tr>
                <th scope="col">{{ section.name }}</th>
                <th v-if="section.value" scope="col">{{ section.value }}</th>
                <th scope="col">{{ section.type }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in api[section.key]" :key="row.name">
                <td class="docs-api-name">
                  <code>{{ row.name }}</code>
                  <span v-if="row.required" class="docs-api-badge">Required</span>
                  <span v-if="row.model" class="docs-api-badge">{{ row.model }}</span>
                  <!-- eslint-disable-next-line vue/no-v-html -- escaped by the API data loader -->
                  <p class="docs-api-description" v-html="row.description" />
                </td>
                <td v-if="section.value" :data-label="section.value">
                  <code v-if="row.default" class="docs-api-default">{{ row.default }}</code>
                  <span v-else class="docs-api-empty">—</span>
                </td>
                <td :data-label="section.type">
                  <a v-if="typeLinks[row.type]" :href="withBase(typeLinks[row.type]!)"
                    ><code>{{ row.type }}</code></a
                  >
                  <code v-else-if="row.type">{{ row.type }}</code>
                  <span v-else class="docs-api-empty">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </UiTableScroll>
      </section>
    </template>
  </div>
</template>

<style scoped>
.docs-api-section h4 {
  margin: 32px 0 8px;
  font-size: 18px;
}

.docs-api :deep(.ui-table-scroll) {
  margin-block: 0 16px;
}

/* The docs make Markdown tables scroll as blocks; these tables scroll inside UiTableScroll. */
.docs-api table {
  display: table;
}

.docs-api th:first-child {
  width: 40%;
}

.docs-api code {
  padding: 0;
  background: none;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.docs-api-default {
  white-space: nowrap;
}

.docs-api-name > code {
  font-weight: 600;
}

.docs-api-badge {
  display: inline-block;
  margin-inline-start: 6px;
  padding: 0 6px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  color: var(--color-muted);
  font-size: 12px;
  line-height: 18px;
  vertical-align: 1px;
}

.docs-api-description {
  margin: 2px 0 0;
  color: var(--color-muted);
}

.docs-api-description:empty {
  display: none;
}

.docs-api-description :deep(code) {
  padding: 0.1em 0.3em;
  background: var(--color-surface);
  color: var(--color-text);
}

.docs-api-empty {
  color: var(--color-muted);
}

@media (max-width: 600px) {
  .docs-api thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  .docs-api :is(table, tbody, tr, td) {
    display: block;
  }

  .docs-api td {
    border-bottom: 0;
    padding-block: 2px;
  }

  .docs-api tr {
    padding-block: 8px;
    border-bottom: 1px solid var(--color-line);
  }

  .docs-api td[data-label]::before {
    content: attr(data-label) ': ';
    color: var(--color-muted);
  }
}
</style>
