<script setup lang="ts">
import { computed } from 'vue'
import UiTableScroll from '../../../app/components/UiTableScroll.vue'
import { darkTokens, lightTokens } from './tokens'

const props = defineProps<{ kind: 'base' | 'status' | 'code' | 'other' }>()

const colors = {
  base: [
    ['canvas', 'Page background. Also the background of floating panels such as menus and dialogs'],
    ['field', 'Inside of inputs. A step brighter than the page so empty fields stand out'],
    ['surface', 'Hover backgrounds, table header rows, and lightly filled parts'],
    ['line', 'Borders and dividers'],
    ['muted', 'Secondary text, dates, and icons'],
    ['text', 'Body text. Also the tooltip background'],
    ['accent', 'Selected items, the focus outline, primary buttons, and hovered links'],
    ['on-accent', 'Text on areas filled with the accent color'],
  ],
  status: [
    ['info', 'Notices and extra information'],
    ['success', 'Completion and success'],
    ['warning', 'States that need attention'],
    ['danger', 'Errors and actions that cannot be undone, such as deleting'],
  ],
  code: [
    ['code-background', 'Code block background'],
    ['code-foreground', 'Code text'],
    ['code-comment', 'Code comments'],
  ],
} as const

const others: { group: string; rows: [string[], string][] }[] = [
  {
    group: 'Typography',
    rows: [
      [['font-body'], 'Body font. Inter for Latin text, the system fonts for Japanese'],
      [['font-mono'], 'Code font'],
      [['font-size-body'], 'Body text size'],
      [['font-size-small'], 'Text size for secondary text and small parts'],
      [['line-height-body'], 'Body line height'],
    ],
  },
  {
    group: 'Width and spacing',
    rows: [
      [['width-prose'], 'Maximum line length of body text'],
      [['width-site'], 'Maximum page width'],
      [['gutter'], 'Space between the screen edge and the content. Changes with the screen width'],
      [
        [
          'space-1',
          'space-2',
          'space-3',
          'space-4',
          'space-5',
          'space-6',
          'space-8',
          'space-12',
          'space-16',
        ],
        'Spacing steps. The number is a multiple of 4px',
      ],
    ],
  },
  {
    group: 'Control size and shape',
    rows: [
      [['control-min'], 'Minimum height of buttons and inputs, large enough to tap'],
      [['control-dense'], 'Smaller height for dense places such as toolbars and menu rows'],
      [['radius-control'], 'Corner radius of buttons, inputs, and cards'],
      [['radius-popover'], 'Corner radius of floating panels such as menus, dialogs, and toasts'],
      [['shadow-popover'], 'Shadow of floating panels'],
    ],
  },
  {
    group: 'Focus and motion',
    rows: [
      [['focus-ring-width'], 'Width of the focus outline'],
      [['focus-ring-offset'], 'Gap between the focus outline and the element'],
      [['duration-fast'], 'Duration of hover color changes'],
      [['easing-standard'], 'Easing of changes'],
    ],
  },
  {
    group: 'Stacking order',
    rows: [
      [
        ['z-sticky', 'z-popover', 'z-toast'],
        'Sticky header, floating panels, then toasts, from bottom to top',
      ],
    ],
  },
]

// A token added to tokens.css without a row here fails the docs build, so this page stays complete.
const listed = new Set([
  ...Object.values(colors).flatMap((rows) => rows.flatMap(([name]) => [`color-${name}`])),
  ...colors.status.map(([name]) => `color-${name}-surface`),
  ...others.flatMap(({ rows }) => rows.flatMap(([names]) => names)),
])
const missing = Object.keys(lightTokens).filter((name) => !listed.has(name))
if (missing.length) throw new Error(`Design page is missing tokens: ${missing.join(', ')}`)

const colorRows = computed(() =>
  props.kind === 'other'
    ? []
    : colors[props.kind].map(([name, usage]) => ({
        name: `--color-${name}`,
        usage,
        light: lightTokens[`color-${name}`]!,
        dark: darkTokens[`color-${name}`]!,
        lightSurface: lightTokens[`color-${name}-surface`],
        darkSurface: darkTokens[`color-${name}-surface`],
      })),
)
const label = {
  base: 'Base colors',
  status: 'Status colors',
  code: 'Code colors',
  other: 'Other tokens',
}
</script>

<template>
  <UiTableScroll :label="label[kind]" density="compact" class="docs-tokens">
    <table v-if="kind !== 'other'">
      <thead>
        <tr>
          <th scope="col">Variable</th>
          <th scope="col">Light</th>
          <th scope="col">Dark</th>
          <th scope="col">Use</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in colorRows" :key="row.name">
          <th scope="row">
            <code>{{ row.name }}</code>
            <code v-if="row.lightSurface" class="docs-tokens-pair">{{ row.name }}-surface</code>
          </th>
          <td v-for="mode in ['light', 'dark'] as const" :key="mode">
            <span
              v-if="row.lightSurface"
              class="docs-tokens-chip"
              :style="{
                color: mode === 'light' ? row.light : row.dark,
                background: mode === 'light' ? row.lightSurface : row.darkSurface,
              }"
              >Aa</span
            >
            <span
              v-else
              class="docs-tokens-swatch"
              :style="{ background: mode === 'light' ? row.light : row.dark }"
            />
            <code class="docs-tokens-value docs-tokens-hex">{{
              mode === 'light' ? row.light : row.dark
            }}</code>
            <code v-if="row.lightSurface" class="docs-tokens-value docs-tokens-hex">{{
              mode === 'light' ? row.lightSurface : row.darkSurface
            }}</code>
          </td>
          <td>{{ row.usage }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else>
      <thead>
        <tr>
          <th scope="col">Variable</th>
          <th scope="col">Value</th>
          <th scope="col">Use</th>
        </tr>
      </thead>
      <tbody v-for="section in others" :key="section.group">
        <tr>
          <th colspan="3" scope="colgroup" class="docs-tokens-group">{{ section.group }}</th>
        </tr>
        <tr v-for="[names, usage] in section.rows" :key="names[0]">
          <th scope="row">
            <code v-for="name in names" :key="name">--{{ name }}</code>
          </th>
          <td>
            <code v-for="name in names" :key="name" class="docs-tokens-value">{{
              lightTokens[name]
            }}</code>
          </td>
          <td>{{ usage }}</td>
        </tr>
      </tbody>
    </table>
  </UiTableScroll>
</template>

<style scoped>
.docs-tokens {
  margin-block: 24px 32px;
}
/* The docs make Markdown tables scroll as blocks; these tables scroll inside UiTableScroll. */
.docs-tokens table {
  display: table;
}
th,
td {
  vertical-align: top;
}
th[scope='row'] code,
td code {
  display: block;
  width: fit-content;
}
th[scope='row'] code {
  white-space: nowrap;
}
/* Long values such as the font list wrap, so the usage column keeps its room. */
td code {
  max-width: 16em;
  overflow-wrap: anywhere;
}
th[scope='row'] code + code {
  margin-top: 2px;
}
.docs-tokens-pair {
  color: var(--color-muted);
}
.docs-tokens-group {
  background: var(--color-canvas);
  color: var(--color-muted);
  font-size: 12px;
}
.docs-tokens-swatch,
.docs-tokens-chip {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 24px;
  margin-bottom: 4px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  font-size: 13px;
  font-weight: 600;
}
.docs-tokens-chip {
  border-color: transparent;
}
.docs-tokens-value {
  color: var(--color-muted);
  font-size: 12px;
}
.docs-tokens-hex {
  white-space: nowrap;
}
.docs-tokens-hex + .docs-tokens-hex {
  margin-top: 2px;
}
</style>
