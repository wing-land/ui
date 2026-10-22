<script setup lang="ts">
import { uiIcons } from '../../../app/lib/icons'

defineProps<{ slug: string }>()

const tiles = [0, 1, 2].flatMap((col) =>
  [0, 1].map((row) => ({ x: 42 + col * 54, y: 23 + row * 40 })),
)
const accounts = [
  { x: 24, y: 28 },
  { x: 124, y: 28 },
  { x: 24, y: 64 },
  { x: 124, y: 64 },
]
const pages = ['‹', '1', '2', '3', '…', '9', '›']
const themeIcons = (['monitor', 'sun', 'moon'] as const).map((name) => ({
  name,
  paths: uiIcons[name].paths,
  selected: name === 'sun',
}))
</script>

<template>
  <!-- Schematic drawings only; the card text names each page. -->
  <svg class="docs-thumbnail" viewBox="0 0 240 120" aria-hidden="true" focusable="false">
    <template v-if="slug === 'config-provider'">
      <rect class="ao dash" x="36" y="14" width="168" height="92" rx="8" />
      <rect class="a" x="48" y="10" width="36" height="8" rx="4" />
      <rect class="p" x="52" y="30" width="64" height="60" rx="4" />
      <rect class="bt" x="60" y="42" width="40" height="6" rx="3" />
      <rect class="b" x="60" y="56" width="48" height="6" rx="3" />
      <rect class="b" x="60" y="70" width="32" height="6" rx="3" />
      <rect class="p" x="124" y="30" width="64" height="60" rx="4" />
      <rect class="bt" x="132" y="42" width="36" height="6" rx="3" />
      <rect class="b" x="132" y="56" width="44" height="6" rx="3" />
      <rect class="b" x="132" y="70" width="28" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'icon'">
      <circle class="st" cx="57" cy="57" r="10" />
      <path class="st" d="M64 64 L71 71" />
      <path class="st" d="M88 62 L100 50 L112 62 M92 59 V72 H108 V59" />
      <polygon
        class="st"
        points="140,46 144,55 154,56 146.5,62.5 149,72 140,67 131,72 133.5,62.5 126,56 136,55"
      />
      <circle class="st" cx="180" cy="60" r="12" />
      <path class="st-a" d="M174 60 l4 4 l8 -8" />
    </template>

    <template v-else-if="slug === 'visually-hidden'">
      <rect class="b" x="40" y="57" width="44" height="6" rx="3" />
      <rect class="ao dash" x="92" y="48" width="56" height="24" rx="4" />
      <rect class="b" x="156" y="57" width="44" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'container'">
      <rect class="p" x="20" y="14" width="200" height="92" rx="4" />
      <path class="ao dash" d="M64 14 V106 M176 14 V106" />
      <rect class="bt" x="76" y="28" width="80" height="6" rx="3" />
      <rect class="b" x="76" y="44" width="88" height="6" rx="3" />
      <rect class="b" x="76" y="56" width="80" height="6" rx="3" />
      <rect class="b" x="76" y="68" width="88" height="6" rx="3" />
      <rect class="b" x="76" y="80" width="60" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'header'">
      <rect class="p" x="20" y="20" width="200" height="80" rx="4" />
      <path class="s" d="M20 44 H220" />
      <rect class="tx" x="32" y="29" width="28" height="6" rx="3" />
      <rect class="b" x="120" y="29" width="20" height="6" rx="3" />
      <rect class="bt" x="148" y="29" width="20" height="6" rx="3" />
      <rect class="b" x="176" y="29" width="20" height="6" rx="3" />
      <rect class="a" x="148" y="42" width="20" height="2" />
      <rect class="b" x="32" y="58" width="120" height="6" rx="3" />
      <rect class="b" x="32" y="70" width="150" height="6" rx="3" />
      <rect class="b" x="32" y="82" width="100" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'footer'">
      <rect class="p" x="20" y="20" width="200" height="80" rx="4" />
      <rect class="f2" x="21" y="68" width="198" height="31" />
      <path class="s" d="M20 68 H220" />
      <rect class="b" x="32" y="32" width="120" height="6" rx="3" />
      <rect class="b" x="32" y="44" width="150" height="6" rx="3" />
      <rect class="bt" x="32" y="76" width="28" height="5" rx="2.5" />
      <rect class="b" x="32" y="87" width="20" height="5" rx="2.5" />
      <rect class="bt" x="80" y="76" width="28" height="5" rx="2.5" />
      <rect class="b" x="80" y="87" width="24" height="5" rx="2.5" />
      <rect class="bt" x="128" y="76" width="28" height="5" rx="2.5" />
      <rect class="b" x="128" y="87" width="18" height="5" rx="2.5" />
      <rect class="m" x="176" y="87" width="32" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'shell'">
      <rect class="p" x="20" y="14" width="200" height="92" rx="4" />
      <path class="s" d="M20 32 H220 M68 32 V106 M176 32 V106" />
      <rect class="tx" x="28" y="20" width="24" height="6" rx="3" />
      <rect class="b" x="28" y="40" width="32" height="5" rx="2.5" />
      <rect class="a" x="28" y="51" width="26" height="5" rx="2.5" />
      <rect class="b" x="28" y="62" width="30" height="5" rx="2.5" />
      <rect class="b" x="28" y="73" width="22" height="5" rx="2.5" />
      <rect class="bt" x="78" y="42" width="60" height="6" rx="3" />
      <rect class="b" x="78" y="56" width="88" height="5" rx="2.5" />
      <rect class="b" x="78" y="66" width="80" height="5" rx="2.5" />
      <rect class="b" x="78" y="76" width="88" height="5" rx="2.5" />
      <rect class="b" x="184" y="42" width="26" height="5" rx="2.5" />
      <rect class="b" x="184" y="52" width="20" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'separator'">
      <rect class="b" x="44" y="26" width="120" height="6" rx="3" />
      <rect class="b" x="44" y="38" width="150" height="6" rx="3" />
      <path class="s" d="M40 60 H200" />
      <rect class="b" x="44" y="76" width="56" height="6" rx="3" />
      <path class="s" d="M114 72 V90" />
      <rect class="b" x="128" y="76" width="56" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'button'">
      <rect class="a" x="40" y="44" width="76" height="32" rx="4" />
      <rect class="oa" x="56" y="57" width="44" height="6" rx="3" />
      <rect class="p" x="124" y="44" width="76" height="32" rx="4" />
      <rect class="bt" x="140" y="57" width="44" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'toggle-group'">
      <rect class="a" x="44" y="28" width="40" height="24" rx="12" />
      <rect class="oa" x="54" y="37" width="20" height="6" rx="3" />
      <rect class="p" x="90" y="28" width="40" height="24" rx="12" />
      <rect class="b" x="100" y="37" width="20" height="6" rx="3" />
      <rect class="p" x="136" y="28" width="40" height="24" rx="12" />
      <rect class="b" x="146" y="37" width="20" height="6" rx="3" />
      <rect class="p" x="182" y="28" width="22" height="24" rx="12" />
      <rect class="b" x="188" y="37" width="10" height="6" rx="3" />
      <rect class="a" x="44" y="68" width="56" height="24" rx="12" />
      <rect class="oa" x="54" y="77" width="22" height="6" rx="3" />
      <rect class="oa faint" x="82" y="77" width="8" height="6" rx="3" />
      <rect class="p" x="106" y="68" width="56" height="24" rx="12" />
      <rect class="b" x="116" y="77" width="22" height="6" rx="3" />
      <rect class="m" x="144" y="77" width="8" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'toolbar'">
      <rect class="p" x="36" y="42" width="168" height="36" rx="4" />
      <rect class="f2" x="46" y="49" width="22" height="22" rx="3" />
      <text class="k bold" x="57" y="64.5">B</text>
      <text class="k italic" x="83" y="64.5">I</text>
      <text class="k underline" x="109" y="64.5">U</text>
      <path class="s" d="M130 50 V70" />
      <path class="st" d="M142 54 H160 M142 60 H160 M142 66 H160" />
      <path class="st" d="M172 54 H190 M176 60 H190 M172 66 H190" />
    </template>

    <template v-else-if="slug === 'theme-picker'">
      <template v-for="(icon, index) in themeIcons" :key="icon.name">
        <rect
          class="p"
          :class="{ 'focus-stroke': icon.selected }"
          :x="54 + index * 48"
          y="42"
          width="36"
          height="36"
          rx="6"
        />
        <path
          v-for="d in icon.paths"
          :key="d"
          :class="icon.selected ? 'st-a thin' : 'st thin'"
          :d="d"
          :transform="`translate(${62 + index * 48} 50) scale(0.8333)`"
          vector-effect="non-scaling-stroke"
        />
      </template>
    </template>

    <template v-else-if="slug === 'field'">
      <rect class="bt" x="60" y="24" width="48" height="6" rx="3" />
      <rect class="p danger-stroke" x="60" y="36" width="120" height="28" rx="4" />
      <rect class="b" x="70" y="47" width="60" height="6" rx="3" />
      <circle class="d" cx="64" cy="80" r="4" />
      <rect class="d" x="72" y="77" width="80" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'input'">
      <rect class="p focus-stroke" x="50" y="22" width="140" height="28" rx="4" />
      <rect class="bt" x="60" y="33" width="56" height="6" rx="3" />
      <path class="tx-stroke" d="M120 29 V43" />
      <rect class="p" x="50" y="66" width="140" height="28" rx="14" />
      <circle class="st thin" cx="66" cy="79" r="5" />
      <path class="st thin" d="M70 83 L74 87" />
      <rect class="b" x="82" y="77" width="70" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'select'">
      <rect class="p" x="60" y="14" width="120" height="26" rx="4" />
      <rect class="bt" x="70" y="24" width="50" height="6" rx="3" />
      <path class="st thin" d="M162 25 l5 5 l5 -5" />
      <rect class="sh" x="62" y="50" width="120" height="60" rx="4" />
      <rect class="p" x="60" y="47" width="120" height="60" rx="4" />
      <rect class="b" x="70" y="56" width="60" height="5" rx="2.5" />
      <rect class="f2" x="64" y="67" width="112" height="18" rx="3" />
      <rect class="tx" x="70" y="73.5" width="70" height="5" rx="2.5" />
      <path class="st-a thin" d="M160 76 l3 3 l6 -6" />
      <rect class="b" x="70" y="92" width="50" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'checkbox'">
      <rect class="a" x="70" y="28" width="16" height="16" rx="3" />
      <path class="st-oa" d="M74 36 l3 3 l6 -6" />
      <rect class="b" x="96" y="33" width="72" height="6" rx="3" />
      <rect class="a" x="70" y="52" width="16" height="16" rx="3" />
      <path class="st-oa" d="M74 60 l3 3 l6 -6" />
      <rect class="b" x="96" y="57" width="56" height="6" rx="3" />
      <rect class="p strong-stroke" x="70" y="76" width="16" height="16" rx="3" />
      <rect class="b" x="96" y="81" width="64" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'radio'">
      <circle class="p focus-stroke" cx="78" cy="36" r="8" />
      <circle class="a" cx="78" cy="36" r="4" />
      <rect class="b" x="96" y="33" width="72" height="6" rx="3" />
      <circle class="p strong-stroke" cx="78" cy="60" r="8" />
      <rect class="b" x="96" y="57" width="56" height="6" rx="3" />
      <circle class="p strong-stroke" cx="78" cy="84" r="8" />
      <rect class="b" x="96" y="81" width="64" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'switch'">
      <rect class="a" x="70" y="32" width="36" height="20" rx="10" />
      <circle class="oa" cx="96" cy="42" r="7" />
      <rect class="b" x="116" y="39" width="60" height="6" rx="3" />
      <rect class="ln" x="70" y="68" width="36" height="20" rx="10" />
      <circle class="cv" cx="80" cy="78" r="7" />
      <rect class="b" x="116" y="75" width="48" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'link'">
      <rect class="b" x="40" y="29" width="50" height="6" rx="3" />
      <rect class="tx" x="96" y="29" width="60" height="6" rx="3" />
      <path class="tx-stroke thin" d="M96 40 H156" />
      <rect class="b" x="162" y="29" width="38" height="6" rx="3" />
      <rect class="tx" x="40" y="57" width="70" height="6" rx="3" />
      <path class="tx-stroke thin" d="M40 68 H110" />
      <path class="st thin" d="M118 66 l7 -7 M119 59 h6 v6" />
      <rect class="tx" x="40" y="85" width="60" height="6" rx="3" />
      <path class="st thin" d="M108 88 h14 m-5 -5 l5 5 l-5 5" />
    </template>

    <template v-else-if="slug === 'sidebar-nav'">
      <rect class="m" x="72" y="16" width="30" height="4" rx="2" />
      <rect class="b" x="80" y="29" width="60" height="5" rx="2.5" />
      <rect class="f2" x="72" y="40" width="96" height="18" rx="3" />
      <rect class="a" x="80" y="46.5" width="56" height="5" rx="2.5" />
      <rect class="b" x="80" y="65" width="48" height="5" rx="2.5" />
      <rect class="m" x="72" y="84" width="34" height="4" rx="2" />
      <rect class="b" x="80" y="97" width="52" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'tabs'">
      <rect class="a" x="40" y="24" width="36" height="6" rx="3" />
      <rect class="b" x="92" y="24" width="36" height="6" rx="3" />
      <rect class="b" x="144" y="24" width="36" height="6" rx="3" />
      <path class="s" d="M30 40 H210" />
      <rect class="a" x="36" y="38" width="44" height="3" />
      <rect class="b" x="40" y="56" width="140" height="6" rx="3" />
      <rect class="b" x="40" y="68" width="120" height="6" rx="3" />
      <rect class="b" x="40" y="80" width="150" height="6" rx="3" />
      <rect class="b" x="40" y="92" width="90" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'breadcrumb'">
      <rect class="b" x="30" y="57" width="36" height="6" rx="3" />
      <path class="st thin" d="M74 56 l4 4 l-4 4" />
      <rect class="b" x="88" y="57" width="44" height="6" rx="3" />
      <path class="st thin" d="M140 56 l4 4 l-4 4" />
      <rect class="tx" x="154" y="57" width="52" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'pagination'">
      <template v-for="(label, index) in pages" :key="index">
        <rect
          :class="index === 3 ? 'a' : 'p'"
          :x="24 + index * 28"
          y="48"
          width="24"
          height="24"
          rx="4"
        />
        <text class="k small" :class="{ 'on-accent': index === 3 }" :x="36 + index * 28" y="64">
          {{ label }}
        </text>
      </template>
    </template>

    <template v-else-if="slug === 'account-list'">
      <template v-for="(item, index) in accounts" :key="index">
        <rect class="p" :x="item.x" :y="item.y" width="92" height="28" rx="4" />
        <circle class="m" :cx="item.x + 14" :cy="item.y + 14" r="7" />
        <rect class="b" :x="item.x + 27" :y="item.y + 11" width="50" height="6" rx="3" />
      </template>
    </template>

    <template v-else-if="slug === 'avatar'">
      <circle class="f2" cx="70" cy="60" r="24" />
      <text class="k muted" x="70" y="65.5">AL</text>
      <circle class="ln ring" cx="132" cy="60" r="14" />
      <circle class="m ring" cx="152" cy="60" r="14" />
      <circle class="a ring" cx="172" cy="60" r="14" />
      <circle class="f2 ring" cx="192" cy="60" r="14" />
      <text class="k small" x="192" y="64">+3</text>
    </template>

    <template v-else-if="slug === 'badge'">
      <rect class="ok-s" x="40" y="34" width="60" height="20" rx="10" />
      <rect class="ok" x="52" y="41" width="36" height="6" rx="3" />
      <rect class="w-s" x="108" y="34" width="52" height="20" rx="10" />
      <rect class="w" x="120" y="41" width="28" height="6" rx="3" />
      <rect class="i-s" x="168" y="34" width="40" height="20" rx="10" />
      <rect class="i" x="178" y="41" width="20" height="6" rx="3" />
      <rect class="f2 line-stroke" x="40" y="66" width="56" height="20" rx="10" />
      <rect class="bt" x="52" y="73" width="32" height="6" rx="3" />
      <rect class="d-s" x="104" y="66" width="64" height="20" rx="10" />
      <rect class="d" x="116" y="73" width="40" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'card'">
      <template v-for="x in [28, 124]" :key="x">
        <rect class="cv" :x="x" y="18" width="88" height="84" rx="4" />
        <rect class="ln" :x="x" y="18" width="88" height="34" rx="4" />
        <rect class="ln" :x="x" y="40" width="88" height="12" />
        <rect class="s" :x="x" y="18" width="88" height="84" rx="4" />
        <rect class="bt" :x="x + 10" y="62" width="50" height="6" rx="3" />
        <rect class="b" :x="x + 10" y="76" width="64" height="5" rx="2.5" />
        <rect class="b" :x="x + 10" y="86" width="44" height="5" rx="2.5" />
      </template>
    </template>

    <template v-else-if="slug === 'connection-status'">
      <rect class="p" x="56" y="26" width="128" height="26" rx="13" />
      <circle class="ok" cx="72" cy="39" r="5" />
      <rect class="bt" x="84" y="36" width="80" height="6" rx="3" />
      <rect class="p" x="56" y="68" width="128" height="26" rx="13" />
      <circle class="w" cx="72" cy="81" r="5" />
      <rect class="b" x="84" y="78" width="64" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'date'">
      <text class="k muted date" x="40" y="44">2026.10.21</text>
      <path class="sm thin" d="M41 72 l9 -9 l3 3 l-9 9 h-3 z" />
      <text class="k muted date" x="62" y="75">2026.10.21</text>
      <rect class="b" x="40" y="91" width="76" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'entry-list'">
      <path class="s" d="M24 18 H216 M24 46 H216 M24 74 H216 M24 102 H216" />
      <template v-for="y in [18, 46, 74]" :key="y">
        <rect class="m" x="32" :y="y + 11" width="36" height="5" rx="2.5" />
        <rect class="tx" x="80" :y="y + 8" width="90" height="6" rx="3" />
        <rect class="b" x="80" :y="y + 18" width="70" height="4" rx="2" />
        <path class="st thin" :d="`M202 ${y + 10} l4 4 l-4 4`" />
      </template>
    </template>

    <template v-else-if="slug === 'table-scroll'">
      <defs>
        <linearGradient id="docs-thumbnail-fade" x1="0" x2="1">
          <stop class="fade-stop" offset="0" stop-opacity="0" />
          <stop class="fade-stop" offset="1" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect class="p" x="24" y="18" width="230" height="80" rx="4" />
      <rect class="f2" x="25" y="19" width="229" height="18" />
      <path class="s" d="M24 37 H240 M24 57 H240 M24 77 H240 M84 18 V98 M144 18 V98 M204 18 V98" />
      <template v-for="x in [32, 92, 152, 212]" :key="x">
        <rect class="bt" :x="x" y="25" width="36" height="5" rx="2.5" />
        <rect class="b" :x="x" y="44.5" width="40" height="5" rx="2.5" />
        <rect class="b" :x="x" y="64.5" width="32" height="5" rx="2.5" />
        <rect class="b" :x="x" y="84.5" width="44" height="5" rx="2.5" />
      </template>
      <rect x="196" y="16" width="44" height="84" fill="url(#docs-thumbnail-fade)" />
      <rect class="ln" x="24" y="106" width="216" height="4" rx="2" />
      <rect class="m" x="24" y="106" width="120" height="4" rx="2" />
    </template>

    <template v-else-if="slug === 'timeline'">
      <path class="s" d="M84 28 V92" />
      <template v-for="(y, index) in [28, 60, 92]" :key="y">
        <rect class="m" x="32" :y="y - 2.5" width="36" height="5" rx="2.5" />
        <circle :class="index === 0 ? 'a' : 'p strong-stroke'" cx="84" :cy="y" r="5" />
        <rect class="tx" x="100" :y="y - 6" width="80" height="6" rx="3" />
        <rect class="b" x="100" :y="y + 4" width="60" height="4" rx="2" />
      </template>
    </template>

    <template v-else-if="slug === 'article'">
      <rect class="tx" x="28" y="18" width="120" height="10" rx="3" />
      <rect class="m" x="28" y="36" width="60" height="4" rx="2" />
      <rect class="b" x="28" y="52" width="130" height="5" rx="2.5" />
      <rect class="b" x="28" y="62" width="120" height="5" rx="2.5" />
      <rect class="b" x="28" y="72" width="130" height="5" rx="2.5" />
      <rect class="b" x="28" y="82" width="90" height="5" rx="2.5" />
      <rect class="bt" x="28" y="96" width="70" height="6" rx="3" />
      <path class="s" d="M172 30 V82" />
      <rect class="m" x="172" y="18" width="36" height="4" rx="2" />
      <rect class="b" x="180" y="34" width="40" height="4" rx="2" />
      <rect class="a" x="171" y="44" width="2.5" height="12" />
      <rect class="tx" x="180" y="48" width="32" height="4" rx="2" />
      <rect class="b" x="180" y="62" width="36" height="4" rx="2" />
      <rect class="b" x="180" y="74" width="28" height="4" rx="2" />
    </template>

    <template v-else-if="slug === 'code-block'">
      <rect class="cb" x="28" y="18" width="184" height="84" rx="4" />
      <rect class="p" x="182" y="26" width="22" height="20" rx="3" />
      <rect class="sm thin" x="189" y="31" width="8" height="9" rx="1" />
      <path class="sm thin" d="M187 35 v6 a1 1 0 0 0 1 1 h5" />
      <rect class="a" x="40" y="30" width="22" height="5" rx="2.5" />
      <rect class="cf" x="66" y="30" width="40" height="5" rx="2.5" />
      <rect class="cf" x="52" y="44" width="60" height="5" rx="2.5" />
      <rect class="a" x="52" y="58" width="30" height="5" rx="2.5" />
      <rect class="cf" x="86" y="58" width="50" height="5" rx="2.5" />
      <rect class="cc" x="52" y="72" width="76" height="5" rx="2.5" />
      <rect class="cf" x="40" y="86" width="12" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'disclosure'">
      <rect class="p" x="40" y="14" width="160" height="24" rx="4" />
      <path class="st thin" d="M52 22 l4 4 l-4 4" />
      <rect class="bt" x="66" y="23" width="80" height="6" rx="3" />
      <rect class="p" x="40" y="44" width="160" height="62" rx="4" />
      <path class="st thin" d="M50 54 l4 4 l4 -4" />
      <rect class="tx" x="66" y="53" width="90" height="6" rx="3" />
      <path class="s" d="M40 68 H200" />
      <rect class="b" x="52" y="77" width="130" height="5" rx="2.5" />
      <rect class="b" x="52" y="89" width="100" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'figure'">
      <rect class="ln" x="60" y="14" width="120" height="70" rx="4" />
      <polygon class="cv" points="72,76 100,46 120,66 132,56 168,76" />
      <circle class="cv" cx="150" cy="34" r="7" />
      <rect class="m" x="80" y="94" width="80" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'kbd'">
      <rect class="ln" x="58" y="43" width="44" height="40" rx="6" />
      <rect class="p" x="58" y="38" width="44" height="40" rx="6" />
      <text class="k large" x="80" y="64">⌘</text>
      <text class="k muted" x="120" y="65">+</text>
      <rect class="ln" x="138" y="43" width="44" height="40" rx="6" />
      <rect class="p" x="138" y="38" width="44" height="40" rx="6" />
      <text class="k large" x="160" y="64">K</text>
    </template>

    <template v-else-if="slug === 'note'">
      <rect class="p" x="36" y="28" width="168" height="64" rx="4" />
      <rect class="a" x="36" y="28" width="4" height="64" />
      <circle class="st-a thin" cx="56" cy="46" r="7" />
      <path class="st-a thin" d="M56 45 V50 M56 42 V42.5" />
      <rect class="tx" x="72" y="43" width="60" height="6" rx="3" />
      <rect class="b" x="72" y="58" width="116" height="5" rx="2.5" />
      <rect class="b" x="72" y="70" width="90" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'photo-album'">
      <template v-for="(tile, index) in tiles" :key="index">
        <rect
          :class="index === 0 ? 'm' : 'ln'"
          :x="tile.x"
          :y="tile.y"
          width="48"
          height="34"
          rx="3"
        />
        <polygon
          class="cv"
          :points="`${tile.x + 8},${tile.y + 28} ${tile.x + 20},${tile.y + 14} ${tile.x + 28},${tile.y + 22} ${tile.x + 34},${tile.y + 18} ${tile.x + 42},${tile.y + 28}`"
        />
      </template>
    </template>

    <template v-else-if="slug === 'dropdown-menu'">
      <rect class="p" x="40" y="12" width="64" height="24" rx="4" />
      <rect class="bt" x="50" y="21" width="30" height="6" rx="3" />
      <path class="st thin" d="M87 22 l4 4 l4 -4" />
      <rect class="sh" x="42" y="47" width="120" height="64" rx="6" />
      <rect class="p" x="40" y="44" width="120" height="64" rx="6" />
      <rect class="b" x="52" y="53" width="60" height="5" rx="2.5" />
      <rect class="f2" x="44" y="63" width="112" height="18" rx="3" />
      <rect class="tx" x="52" y="69.5" width="70" height="5" rx="2.5" />
      <path class="s" d="M44 88 H156" />
      <rect class="d" x="52" y="95" width="48" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'popover'">
      <rect class="p" x="60" y="12" width="60" height="24" rx="4" />
      <rect class="bt" x="74" y="21" width="32" height="6" rx="3" />
      <rect class="sh" x="62" y="47" width="120" height="60" rx="6" />
      <rect class="p" x="60" y="44" width="120" height="60" rx="6" />
      <rect class="tx" x="72" y="56" width="60" height="6" rx="3" />
      <rect class="b" x="72" y="72" width="90" height="5" rx="2.5" />
      <rect class="b" x="72" y="84" width="76" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'tooltip'">
      <rect class="tx" x="88" y="32" width="64" height="18" rx="3" />
      <rect class="cv" x="98" y="39" width="44" height="4" rx="2" />
      <rect class="p" x="80" y="56" width="80" height="32" rx="4" />
      <rect class="bt" x="98" y="69" width="44" height="6" rx="3" />
    </template>

    <template v-else-if="slug === 'alert'">
      <rect class="d-s danger-stroke" x="32" y="30" width="176" height="60" rx="4" />
      <circle class="d" cx="52" cy="50" r="8" />
      <rect class="cv" x="51" y="44.5" width="2" height="6" rx="1" />
      <circle class="cv" cx="52" cy="54" r="1.2" />
      <rect class="d" x="68" y="46" width="70" height="6" rx="3" />
      <rect class="d faint" x="68" y="60" width="120" height="5" rx="2.5" />
      <rect class="d faint" x="68" y="72" width="90" height="5" rx="2.5" />
    </template>

    <template v-else-if="slug === 'dialog'">
      <rect class="b" x="20" y="16" width="120" height="6" rx="3" />
      <rect class="b" x="20" y="30" width="160" height="6" rx="3" />
      <rect class="b" x="20" y="44" width="140" height="6" rx="3" />
      <rect class="scrim" x="0" y="0" width="240" height="120" />
      <rect class="p" x="56" y="20" width="128" height="80" rx="6" />
      <rect class="tx" x="68" y="32" width="64" height="6" rx="3" />
      <path class="st thin" d="M166 31 l6 6 m0 -6 l-6 6" />
      <rect class="b" x="68" y="48" width="100" height="5" rx="2.5" />
      <rect class="b" x="68" y="58" width="84" height="5" rx="2.5" />
      <rect class="p" x="108" y="74" width="32" height="16" rx="3" />
      <rect class="a" x="144" y="74" width="32" height="16" rx="3" />
    </template>

    <template v-else-if="slug === 'loading-empty'">
      <circle class="track" cx="64" cy="60" r="14" />
      <path class="arc" d="M64 46 a14 14 0 0 1 14 14" />
      <rect class="ln" x="100" y="42" width="100" height="8" rx="4" />
      <rect class="ln" x="100" y="58" width="80" height="8" rx="4" />
      <rect class="ln" x="100" y="74" width="90" height="8" rx="4" />
    </template>

    <template v-else-if="slug === 'toaster'">
      <rect class="b" x="20" y="16" width="120" height="6" rx="3" />
      <rect class="b" x="20" y="30" width="160" height="6" rx="3" />
      <rect class="p faint" x="116" y="50" width="88" height="24" rx="6" />
      <rect class="p" x="108" y="58" width="104" height="26" rx="6" />
      <rect class="sh" x="102" y="71" width="116" height="36" rx="6" />
      <rect class="p" x="100" y="68" width="116" height="36" rx="6" />
      <circle class="ok" cx="114" cy="86" r="6" />
      <path class="st-oa thin" d="M111 86 l2 2 l4 -4" />
      <rect class="tx" x="126" y="79" width="60" height="5" rx="2.5" />
      <rect class="b" x="126" y="90" width="76" height="4" rx="2" />
    </template>
  </svg>
</template>

<style scoped>
.docs-thumbnail {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 1;
}
.p {
  fill: var(--color-canvas);
  stroke: var(--color-line);
}
.s {
  fill: none;
  stroke: var(--color-line);
}
.sm {
  fill: none;
  stroke: var(--color-muted);
}
.b {
  fill: var(--color-line);
}
.bt {
  fill: var(--color-muted);
}
.m {
  fill: var(--color-muted);
}
.tx {
  fill: var(--color-text);
}
.ln {
  fill: var(--color-line);
}
.cv {
  fill: var(--color-canvas);
}
.f2 {
  fill: var(--color-surface);
}
.a {
  fill: var(--color-accent);
}
.oa {
  fill: var(--color-on-accent);
}
.ao {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1.5;
}
.dash {
  stroke-dasharray: 4 3;
}
.st,
.st-a,
.st-oa,
.tx-stroke {
  fill: none;
  stroke: var(--color-text);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.st-a {
  stroke: var(--color-accent);
}
.st-oa {
  stroke: var(--color-on-accent);
}
.thin {
  stroke-width: 1.5;
}
.focus-stroke {
  stroke: var(--color-accent);
  stroke-width: 1.5;
}
.strong-stroke {
  stroke: var(--color-muted);
  stroke-width: 1.5;
}
.line-stroke {
  stroke: var(--color-line);
}
.danger-stroke {
  stroke: var(--color-danger);
}
.ring {
  stroke: var(--color-surface);
  stroke-width: 2;
}
.sh {
  fill: rgb(0 0 0 / 10%);
}
.scrim {
  fill: rgb(0 0 0 / 25%);
}
.faint {
  opacity: 0.55;
}
.d {
  fill: var(--color-danger);
}
.d-s {
  fill: var(--color-danger-surface);
}
.ok {
  fill: var(--color-success);
}
.ok-s {
  fill: var(--color-success-surface);
}
.w {
  fill: var(--color-warning);
}
.w-s {
  fill: var(--color-warning-surface);
}
.i {
  fill: var(--color-info);
}
.i-s {
  fill: var(--color-info-surface);
}
.cb {
  fill: var(--color-code-background);
}
.cf {
  fill: var(--color-code-foreground);
}
.cc {
  fill: var(--color-code-comment);
}
/* The spinner draws in the text color, with the track at 25% opacity. */
.track {
  fill: none;
  stroke: var(--color-text);
  stroke-opacity: 0.25;
  stroke-width: 3;
}
.arc {
  fill: none;
  stroke: var(--color-text);
  stroke-width: 3;
  stroke-linecap: round;
}
.fade-stop {
  stop-color: var(--color-surface);
}
.k {
  fill: var(--color-text);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  text-anchor: middle;
}
.k.small {
  font-size: 11px;
  font-weight: 500;
}
.k.large {
  font-size: 18px;
}
.k.date {
  font-size: 13px;
  font-weight: 400;
  text-anchor: start;
}
.k.muted {
  fill: var(--color-muted);
}
.k.on-accent {
  fill: var(--color-on-accent);
}
.k.bold {
  font-weight: 700;
}
.k.italic {
  font-style: italic;
  font-weight: 500;
}
.k.underline {
  font-weight: 500;
  text-decoration: underline;
}
</style>
