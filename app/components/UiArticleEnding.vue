<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '../lib/clipboard'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiMessages } from '../lib/messages'
import type { Neighbor } from '../lib/types'
import UiCard from './UiCard.vue'
import UiPostDate from './UiPostDate.vue'

const props = withDefaults(
  defineProps<{
    older?: Neighbor | null
    newer?: Neighbor | null
    /** Hides the link to the list of posts when omitted. */
    listHref?: string
    /** Omit to let the component copy `shareUrl` and announce the result itself. */
    copyStatus?: string
    /** Defaults to the current page URL. */
    shareUrl?: string
    linkComponent?: UiLinkComponent
    labels?: Partial<UiMessages['article'] & { copyLink: string }>
  }>(),
  {
    older: undefined,
    newer: undefined,
    listHref: undefined,
    copyStatus: undefined,
    shareUrl: undefined,
    linkComponent: undefined,
    labels: undefined,
  },
)
const emit = defineEmits<{ copy: [] }>()
const ui = useUiConfig()
const clipboard = useClipboard({ resetAfter: 0 })
const link = computed(() => props.linkComponent ?? ui.value.linkComponent)
const text = computed(() => ({
  ...ui.value.messages.article,
  copyLink: ui.value.messages.clipboard.copyLink,
  ...props.labels,
}))
const status = computed(() => {
  if (props.copyStatus !== undefined) return props.copyStatus
  const { linkCopied, copyLinkFailed } = ui.value.messages.clipboard
  const state = clipboard.status.value
  return state === 'copied' ? linkCopied : state === 'error' ? copyLinkFailed : ''
})

function copy() {
  emit('copy')
  if (props.copyStatus === undefined) void clipboard.copy(props.shareUrl ?? window.location.href)
}
</script>

<template>
  <footer class="article-ending ui-article-ending" :aria-label="text.end">
    <nav v-if="older || newer" class="article-neighbors" :aria-label="text.adjacent">
      <UiCard
        v-if="older"
        class="neighbor-card older"
        :href="older.href"
        :link-component="linkComponent"
      >
        <span class="neighbor-direction"><span aria-hidden="true">←</span> {{ text.older }}</span>
        <span class="neighbor-title ui-card__title">{{ older.title }}</span>
        <span v-if="older.publishedAt" class="neighbor-date"
          ><UiPostDate :date="older.publishedAt" kind="published"
        /></span>
      </UiCard>
      <UiCard
        v-if="newer"
        class="neighbor-card newer"
        :href="newer.href"
        :link-component="linkComponent"
      >
        <span class="neighbor-direction">{{ text.newer }} <span aria-hidden="true">→</span></span>
        <span class="neighbor-title ui-card__title">{{ newer.title }}</span>
        <span v-if="newer.publishedAt" class="neighbor-date"
          ><UiPostDate :date="newer.publishedAt" kind="published"
        /></span>
      </UiCard>
    </nav>
    <div class="article-end-actions">
      <component :is="link" v-if="listHref" :href="listHref">{{ text.allPosts }}</component>
      <button type="button" @click="copy">{{ text.copyLink }}</button>
    </div>
    <p class="copy-status" role="status">{{ status }}</p>
  </footer>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.article-ending {
  // 560px matches the former 600px viewport breakpoint minus the page gutters.
  container: ui-article-ending / inline-size;
  border-top: 1px solid var(--color-line);
  margin-top: 48px;
  padding-top: 24px;
  scroll-margin-top: 24px;
}
.article-neighbors {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @container ui-article-ending (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
}
.older {
  grid-column: 1;
}
.newer {
  grid-column: 2;

  .neighbor-direction {
    text-align: right;
  }

  @container ui-article-ending (max-width: 560px) {
    grid-column: 1;

    .neighbor-direction,
    .neighbor-date {
      text-align: left;
    }
  }

  @container ui-article-ending (width > 560px) {
    .neighbor-date {
      text-align: right;
    }
  }
}
.neighbor-direction,
.neighbor-date {
  color: var(--color-muted);
  font-size: 14px;
}
.neighbor-title {
  font-weight: 600;
  line-height: 1.7;
  overflow-wrap: anywhere;
}
.neighbor-date {
  margin-top: auto;
}
.article-end-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 24px;

  a,
  button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 8px 16px;
    font: inherit;
    color: var(--color-text);
    border: 1px solid var(--color-muted);
    border-radius: var(--radius-control);
    background: transparent;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: var(--color-surface);
    }
  }
}
.copy-status {
  min-height: 1.8em;
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 14px;
}
</style>
