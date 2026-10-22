<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useClipboard } from '../lib/clipboard'
import { useUiConfig } from '../lib/config'
import UiButton from './UiButton.vue'
import UiField from './UiField.vue'
import UiInput from './UiInput.vue'

const props = withDefaults(
  defineProps<{
    value: string
    label: string
    description?: string
    id?: string
    copyLabel?: string
    copiedLabel?: string
    copyFailedLabel?: string
  }>(),
  {
    description: undefined,
    id: undefined,
    copyLabel: undefined,
    copiedLabel: undefined,
    copyFailedLabel: undefined,
  },
)
const emit = defineEmits<{ copy: [success: boolean] }>()

const ui = useUiConfig()
const { status, copy } = useClipboard()
const input = shallowRef<InstanceType<typeof UiInput> | null>(null)
const message = computed(() => {
  if (status.value === 'copied') return props.copiedLabel ?? ui.value.messages.clipboard.copied
  if (status.value === 'error') {
    return props.copyFailedLabel ?? ui.value.messages.clipboard.copyFailed
  }
  return ''
})

async function onCopy() {
  const success = await copy(props.value)
  // On failure the text is selected so the reader can copy it by hand.
  if (!success) input.value?.select()
  emit('copy', success)
}
</script>

<template>
  <UiField :id="id" class="ui-copy-field" :label="label" :description="description">
    <div class="ui-copy-field__row">
      <UiInput
        ref="input"
        class="ui-copy-field__input"
        :model-value="value"
        readonly
        spellcheck="false"
        @focus="input?.select()"
      />
      <UiButton icon="copy" @click="onCopy">{{ copyLabel ?? ui.messages.clipboard.copy }}</UiButton>
    </div>
    <p class="ui-copy-field__status" :class="{ 'is-error': status === 'error' }" role="status">
      {{ message }}
    </p>
  </UiField>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-copy-field__row {
  display: flex;
  gap: var(--space-2);
}
.ui-copy-field__input {
  flex: 1;
  min-width: 0;

  :deep(input) {
    font-family: var(--font-mono);
  }
}
.ui-copy-field__status {
  margin: 4px 0 0;
  color: var(--color-muted);
  font-size: var(--font-size-small);

  // The live region stays in the page so that its first message is announced.
  &:empty {
    margin: 0;
  }

  &.is-error {
    color: var(--color-danger);
  }
}
</style>
