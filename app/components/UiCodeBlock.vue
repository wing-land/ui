<script setup lang="ts">
import { useClipboard } from '../lib/clipboard'
import { useUiConfig } from '../lib/config'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    code: string
    language?: string
    filename?: string
    codeClass?: string
    codeAriaLabel?: string
    copyLabel?: string
    copiedLabel?: string
    copyErrorLabel?: string
  }>(),
  {
    language: 'text',
    filename: '',
    codeClass: '',
    codeAriaLabel: '',
    copyLabel: undefined,
    copiedLabel: undefined,
    copyErrorLabel: undefined,
  },
)
const ui = useUiConfig()
const { status, copy } = useClipboard()
</script>

<template>
  <div class="ui-code-block">
    <span class="code-label">{{ filename || language }}</span>
    <!-- The name stays "Copy"; the status line below announces the result. -->
    <button
      type="button"
      class="copy-button"
      :aria-label="copyLabel ?? ui.messages.clipboard.copy"
      @click="copy(props.code)"
    >
      <UiIcon :name="status === 'copied' ? 'check' : 'copy'" />
    </button>
    <pre
      :class="codeClass"
      tabindex="0"
      :aria-label="codeAriaLabel || ui.messages.codeBlock.region(language)"
    ><slot><code>{{ code }}</code></slot></pre>
    <p class="copy-status" :class="{ 'is-error': status === 'error' }" role="status">
      {{
        status === 'copied'
          ? (copiedLabel ?? ui.messages.clipboard.copied)
          : status === 'error'
            ? (copyErrorLabel ?? ui.messages.codeBlock.copyFailed)
            : ''
      }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-code-block {
  position: relative;
  margin: 0 0 32px;
  padding: 44px 0 16px;
  border-radius: var(--radius-control);
  background: var(--color-code-background);
  color: var(--color-code-foreground);

  &::before {
    content: '';
    position: absolute;
    top: 38px;
    right: 20px;
    left: 20px;
    border-top: 1px solid var(--color-line);
  }
}
.code-label {
  position: absolute;
  top: 10px;
  left: 20px;
  color: var(--color-muted);
  font-size: 12px;
  line-height: 20px;
}
.copy-button {
  position: absolute;
  top: 5px;
  right: 12px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 30px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: var(--color-field);
  color: var(--color-muted);
  cursor: pointer;

  // Widens the hit area to 42px without making the visible button larger.
  &::after {
    content: '';
    position: absolute;
    inset: -7px -6px;
  }

  &:hover {
    border-color: var(--color-muted);
    color: var(--color-accent);
  }
}
pre {
  margin: 0;
  padding: 0 20px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.8;
  tab-size: 2;

  :deep(code) {
    display: block;
    min-width: max-content;
    font: inherit;
    white-space: pre;
  }

  :deep(.line) {
    display: block;
  }
}
.copy-status {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  margin: 0;

  &.is-error {
    position: static;
    width: auto;
    height: auto;
    padding: 8px 20px 0;
    overflow: visible;
    clip-path: none;
    white-space: normal;
    color: var(--color-code-comment);
    font-size: 13px;
  }
}
</style>
