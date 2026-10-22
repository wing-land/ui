<script setup lang="ts">
import { computed, useId } from 'vue'
import UiAvatar from './UiAvatar.vue'

const props = withDefaults(
  defineProps<{
    name: string
    alias?: string
    description?: string
    /** Shows the initials of `name` when omitted. */
    imageSrc?: string
    /** Empty by default, because the name is shown next to the image. */
    imageAlt?: string
    headingId?: string
    headingLevel?: 2 | 3 | 4
    imageSize?: number
  }>(),
  {
    alias: '',
    description: '',
    imageSrc: undefined,
    imageAlt: '',
    headingId: undefined,
    headingLevel: 2,
    imageSize: 512,
  },
)
const generatedId = useId()
const id = computed(() => props.headingId ?? generatedId)
</script>

<template>
  <section class="ui-profile-identity" :aria-labelledby="id">
    <UiAvatar
      class="avatar"
      :name="name"
      :src="imageSrc"
      :alt="imageAlt"
      :size="160"
      :image-size="imageSize"
    />
    <div class="identity-copy">
      <component :is="`h${headingLevel}`" :id="id" class="identity-name">
        {{ name }} <small v-if="alias">{{ alias }}</small>
      </component>
      <div v-if="$slots.description" class="identity-description"><slot name="description" /></div>
      <p v-else-if="description?.trim()">{{ description }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-profile-identity {
  // 560px matches the former 600px viewport breakpoint minus the page gutters.
  container: ui-profile-identity / inline-size;
  // The text wraps below the image once it would be narrower than 360px, based on the
  // component's own width rather than the viewport.
  display: flex;
  flex-wrap: wrap;
  gap: 20px 32px;
  align-items: flex-start;
  padding-bottom: 64px;
  border-bottom: 1px solid var(--color-line);

  @media (max-width: 600px) {
    padding-bottom: 48px;
  }
}
.ui-profile-identity .avatar {
  display: flex;
  flex: none;

  @container ui-profile-identity (max-width: 560px) {
    width: 112px;
    height: 112px;
  }
}
.identity-copy {
  flex: 1 1 360px;
  min-width: 0;

  .identity-name {
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.4;

    small {
      color: var(--color-muted);
      font-size: 18px;
      font-weight: 500;
      white-space: nowrap;

      @container ui-profile-identity (max-width: 560px) {
        font-size: 16px;
      }
    }

    @container ui-profile-identity (max-width: 560px) {
      font-size: 28px;
    }
  }

  p,
  .identity-description {
    margin: 20px 0 0;
    font-size: 16px;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }

  p {
    white-space: pre-line;
  }

  .identity-description {
    :deep(p) {
      margin: 0 0 1em;
    }

    :deep(p:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
