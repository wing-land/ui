<script setup lang="ts">
import { computed } from 'vue'
import { darkTokens, lightTokens } from './tokens'

const props = defineProps<{
  name: 'files' | 'color-roles' | 'theme-switch' | 'config-layers' | 'locale-switch' | 'date'
}>()

const captions = {
  files: 'Components need tokens.css. Add base.css and prose.css when you need them',
  'color-roles': 'Which color variable is used where on the screen',
  'theme-switch':
    'Adding the dark class to <html> switches the same variables to their dark values',
  'config-layers': 'Inner settings take priority; anything not passed is inherited from outside',
  'locale-switch': 'Text overrides carry over to inner levels only while the locale stays the same',
  date: 'Date-only strings stay as they are; date-times take their date from the time zone',
}
const caption = computed(() => captions[props.name])

const colorLabels = [
  { name: 'canvas', x: 392, y: 28, labelY: 28 },
  { name: 'text', x: 184, y: 45, labelY: 50 },
  { name: 'muted', x: 244, y: 63.5, labelY: 72 },
  { name: 'field', x: 360, y: 103, labelY: 103 },
  { name: 'surface', x: 360, y: 156, labelY: 150 },
  { name: 'line', x: 376, y: 182, labelY: 182 },
  { name: 'accent', x: 370, y: 234, labelY: 230 },
  { name: 'on-accent', x: 354, y: 243, labelY: 256 },
]

const localeBranches = [
  {
    y: 16,
    child: 'Inner level keeps the locale',
    label: 'もう一度試す',
    note: 'Override carries over',
    kept: true,
  },
  {
    y: 112,
    child: 'Inner level switches to en',
    label: 'Retry',
    note: 'Back to the en default',
    kept: false,
  },
]

const dateRows = [
  { y: 16, input: "'2026-10-20'", rule: 'Date only: kept as is', output: '2026.10.20' },
  {
    y: 88,
    input: "'2026-10-20T16:00:00Z'",
    rule: '1 a.m. the next day in Asia/Tokyo',
    output: '2026.10.21',
  },
]

const themes = [
  { x: 20, tokens: lightTokens, html: '<html>' },
  { x: 360, tokens: darkTokens, html: '<html class="dark">' },
].map(({ x, tokens, html }) => ({
  x,
  html,
  color: (name: string) => tokens[`color-${name}`],
}))
</script>

<template>
  <figure class="docs-figure">
    <div class="docs-figure-frame">
      <svg v-if="name === 'files'" viewBox="0 0 640 236" role="img" :aria-label="caption">
        <rect class="box accent-box" x="20" y="16" width="280" height="56" rx="8" />
        <text class="name" x="36" y="40">tokens.css</text>
        <text class="note" x="36" y="60">Colors, spacing, and other variables</text>
        <rect class="box" x="20" y="90" width="280" height="56" rx="8" />
        <text class="name" x="36" y="114">base.css</text>
        <text class="note" x="36" y="134">Styles body, links, and images</text>
        <rect class="box" x="20" y="164" width="280" height="56" rx="8" />
        <text class="name" x="36" y="188">prose.css</text>
        <text class="note" x="36" y="208">Styles article text</text>

        <path class="arrow required" d="M300 44 H394 M386 39 L394 44 L386 49" />
        <text class="note middle strong" x="348" y="36">Required</text>
        <path class="arrow optional" d="M300 118 H394 M386 113 L394 118 L386 123" />
        <text class="note middle" x="348" y="110">Optional</text>
        <path class="arrow optional" d="M300 192 H394 M386 187 L394 192 L386 197" />
        <text class="note middle" x="348" y="184">Optional</text>

        <rect class="box target" x="400" y="18" width="220" height="52" rx="6" />
        <text class="title" x="416" y="40">Components</text>
        <text class="note" x="416" y="59">UiButton, UiModal, …</text>
        <rect class="box target" x="400" y="92" width="220" height="52" rx="6" />
        <text class="title" x="416" y="114">Your app's elements</text>
        <text class="note" x="416" y="133">body, a, img, …</text>
        <rect class="box target" x="400" y="166" width="220" height="52" rx="6" />
        <text class="title" x="416" y="188">Article text</text>
        <text class="note" x="416" y="207">Inside .prose</text>
      </svg>

      <svg
        v-else-if="name === 'color-roles'"
        viewBox="0 0 640 290"
        role="img"
        :aria-label="caption"
      >
        <rect class="fill-canvas stroke-line" x="20" y="16" width="380" height="258" rx="8" />
        <rect class="fill-text" x="44" y="40" width="140" height="10" rx="3" />
        <rect class="fill-muted" x="44" y="60" width="200" height="7" rx="3" />
        <rect class="fill-field stroke-line" x="44" y="84" width="332" height="38" rx="4" />
        <rect class="fill-muted" x="58" y="100" width="110" height="6" rx="3" />
        <rect class="fill-surface" x="44" y="138" width="332" height="36" rx="4" />
        <rect class="fill-text" x="58" y="152" width="120" height="7" rx="3" />
        <path class="stroke-line" d="M44 182 H376" />
        <rect class="fill-text" x="58" y="196" width="100" height="7" rx="3" />
        <rect class="fill-none stroke-line" x="44" y="226" width="104" height="34" rx="4" />
        <rect class="fill-text" x="66" y="240" width="60" height="6" rx="3" />
        <rect class="fill-accent" x="272" y="226" width="104" height="34" rx="4" />
        <rect class="fill-on-accent" x="294" y="240" width="60" height="6" rx="3" />

        <template v-for="label in colorLabels" :key="label.name">
          <path class="leader" :d="`M${label.x} ${label.y} L424 ${label.labelY}`" />
          <circle class="leader-dot" :cx="label.x" :cy="label.y" r="3" />
          <text class="token" x="432" :y="label.labelY + 4">--color-{{ label.name }}</text>
        </template>
      </svg>

      <svg
        v-else-if="name === 'theme-switch'"
        viewBox="0 0 640 210"
        role="img"
        :aria-label="caption"
      >
        <g v-for="theme in themes" :key="theme.x" :transform="`translate(${theme.x} 0)`">
          <rect
            x="0"
            y="16"
            width="260"
            height="150"
            rx="8"
            :fill="theme.color('canvas')"
            :stroke="theme.color('line')"
          />
          <rect x="20" y="38" width="120" height="9" rx="3" :fill="theme.color('text')" />
          <rect x="20" y="56" width="170" height="6" rx="3" :fill="theme.color('muted')" />
          <rect
            x="20"
            y="76"
            width="220"
            height="30"
            rx="4"
            :fill="theme.color('field')"
            :stroke="theme.color('line')"
          />
          <rect x="32" y="88" width="90" height="6" rx="3" :fill="theme.color('muted')" />
          <rect x="20" y="122" width="84" height="28" rx="4" :fill="theme.color('accent')" />
          <rect x="38" y="133" width="48" height="6" rx="3" :fill="theme.color('on-accent')" />
          <rect
            x="114"
            y="122"
            width="84"
            height="28"
            rx="4"
            fill="none"
            :stroke="theme.color('line')"
          />
          <rect x="132" y="133" width="48" height="6" rx="3" :fill="theme.color('text')" />
          <text class="token middle" x="130" y="194">{{ theme.html }}</text>
        </g>
        <path class="arrow switch" d="M292 91 H346 M338 85 L346 91 L338 97" />
      </svg>

      <svg
        v-else-if="name === 'config-layers'"
        viewBox="0 0 640 176"
        role="img"
        :aria-label="caption"
      >
        <rect class="box" x="16" y="16" width="608" height="144" rx="8" />
        <text class="name" x="32" y="44">createUi()</text>
        <text class="note" x="32" y="64">Whole app</text>
        <rect class="box" x="216" y="36" width="392" height="108" rx="6" />
        <text class="name" x="232" y="64">UiConfigProvider</text>
        <text class="note" x="232" y="84">Part of the screen</text>
        <rect class="box accent-box" x="424" y="56" width="168" height="72" rx="6" />
        <text class="name" x="440" y="84">props</text>
        <text class="note" x="440" y="104">Each component</text>
      </svg>

      <svg
        v-else-if="name === 'locale-switch'"
        viewBox="0 0 640 192"
        role="img"
        :aria-label="caption"
      >
        <rect class="box" x="16" y="52" width="220" height="88" rx="8" />
        <text class="title" x="32" y="78">Outer level</text>
        <text class="token" x="32" y="102">locale: ja</text>
        <text class="token" x="32" y="122">retry: もう一度試す</text>
        <path class="arrow switch" d="M236 96 H264 V48 H292 M286 43 L292 48 L286 53" />
        <path class="arrow switch" d="M236 96 H264 V144 H292 M286 139 L292 144 L286 149" />
        <g v-for="branch in localeBranches" :key="branch.y" :transform="`translate(0 ${branch.y})`">
          <rect class="box" x="300" y="0" width="324" height="64" rx="8" />
          <text class="note" x="316" y="22">{{ branch.child }}</text>
          <rect
            class="box"
            :class="{ 'accent-box': branch.kept }"
            x="316"
            y="32"
            width="112"
            height="22"
            rx="4"
          />
          <text class="item middle" x="372" y="47">{{ branch.label }}</text>
          <text class="note" :class="{ strong: branch.kept }" x="444" y="47">
            {{ branch.note }}
          </text>
        </g>
      </svg>

      <svg v-else-if="name === 'date'" viewBox="0 0 640 144" role="img" :aria-label="caption">
        <g v-for="row in dateRows" :key="row.y" :transform="`translate(0 ${row.y})`">
          <rect class="box" x="16" y="0" width="216" height="40" rx="6" />
          <text class="token" x="30" y="25">{{ row.input }}</text>
          <text class="note middle" x="352" y="12">{{ row.rule }}</text>
          <path class="arrow switch" d="M244 20 H460 M454 15 L460 20 L454 25" />
          <rect class="box accent-box" x="472" y="0" width="152" height="40" rx="6" />
          <text class="name" x="490" y="25">{{ row.output }}</text>
        </g>
      </svg>
    </div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.docs-figure-frame {
  overflow-x: auto;
  padding: 16px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: var(--color-surface);
}
svg {
  display: block;
  width: 100%;
  min-width: 480px;
  height: auto;
}
text {
  fill: var(--color-text);
  font-family: var(--font-body);
}
.name,
.token {
  font-family: var(--font-mono);
}
.name {
  font-size: 15px;
  font-weight: 600;
}
.title {
  font-size: 14px;
  font-weight: 600;
}
.note {
  fill: var(--color-muted);
  font-size: 12.5px;
}
.note.strong {
  fill: var(--color-accent);
  font-weight: 600;
}
.token,
.item {
  font-size: 13px;
}
.middle {
  text-anchor: middle;
}
.box {
  fill: var(--color-canvas);
  stroke: var(--color-line);
}
.accent-box {
  fill: var(--color-field);
  stroke: var(--color-accent);
  stroke-width: 1.5;
}
.arrow {
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.required {
  stroke: var(--color-accent);
}
.switch {
  stroke: var(--color-muted);
}
.optional {
  stroke: var(--color-muted);
  stroke-dasharray: 4 3;
}
.leader {
  stroke: var(--color-muted);
}
.leader-dot {
  fill: var(--color-text);
  stroke: var(--color-surface);
  stroke-width: 1.5;
}
.fill-canvas {
  fill: var(--color-canvas);
}
.fill-field {
  fill: var(--color-field);
}
.fill-surface {
  fill: var(--color-surface);
}
.fill-text {
  fill: var(--color-text);
}
.fill-muted {
  fill: var(--color-muted);
}
.fill-accent {
  fill: var(--color-accent);
}
.fill-on-accent {
  fill: var(--color-on-accent);
}
.fill-none {
  fill: none;
}
.stroke-line {
  stroke: var(--color-line);
}
</style>
