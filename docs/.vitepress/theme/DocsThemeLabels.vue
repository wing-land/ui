<script setup lang="ts">
import UiTableScroll from '../../../app/components/UiTableScroll.vue'
import { enLabels, jaLabels } from '../../../vitepress/labels'

const rows = Object.entries(enLabels).map(([key, en]) => ({
  key,
  en,
  ja: jaLabels[key as keyof typeof jaLabels],
}))
</script>

<template>
  <UiTableScroll class="docs-theme-labels" label="Theme text" density="compact">
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
</template>

<style scoped>
.docs-theme-labels {
  margin-block: 24px 32px;
}

/* The docs make Markdown tables scroll as blocks; this table scrolls inside UiTableScroll. */
.docs-theme-labels table {
  display: table;
}

th[scope='row'] code {
  white-space: nowrap;
}
</style>
