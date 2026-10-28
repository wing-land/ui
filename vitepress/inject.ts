import { computed, inject, type ComputedRef, type InjectionKey } from 'vue'
import { enLabels } from './labels'
import type { DocsLabels } from './types'

export const docsLabelsKey: InjectionKey<ComputedRef<DocsLabels>> = Symbol('docs-labels')

export function useDocsLabels() {
  return inject(
    docsLabelsKey,
    computed(() => enLabels),
    true,
  )
}
