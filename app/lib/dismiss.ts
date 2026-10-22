import { getCurrentScope, onScopeDispose, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'

export type DismissReason = 'escape' | 'outside'

type MaybeElement = HTMLElement | null | undefined

export interface UseDismissOptions {
  open: Ref<boolean>
  /** Elements treated as inside, such as the panel and its trigger. */
  inside: MaybeRefOrGetter<MaybeElement | readonly MaybeRefOrGetter<MaybeElement>[]>
  /** Receives focus after Escape. Outside clicks leave focus where the user put it. */
  returnFocusTo?: MaybeRefOrGetter<MaybeElement>
  onDismiss?: (reason: DismissReason) => void
}

export function useDismiss({ open, inside, returnFocusTo, onDismiss }: UseDismissOptions) {
  function isInside(target: EventTarget | null) {
    if (!(target instanceof Node)) return true
    const elements = toValue(inside)
    const list = Array.isArray(elements) ? elements : [elements]
    return list.some((element) => toValue(element)?.contains(target))
  }

  function dismiss(reason: DismissReason) {
    open.value = false
    if (reason === 'escape') toValue(returnFocusTo)?.focus()
    onDismiss?.(reason)
  }

  // focusin only dismisses on a concrete outside target; radio selection can emit
  // focusout with a null relatedTarget in Firefox.
  function onOutside(event: Event) {
    if (!isInside(event.target)) dismiss('outside')
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || event.defaultPrevented) return
    event.preventDefault()
    dismiss('escape')
  }

  function listen(active: boolean) {
    if (active) {
      document.addEventListener('pointerdown', onOutside)
      document.addEventListener('focusin', onOutside)
      document.addEventListener('keydown', onKeydown)
    } else {
      document.removeEventListener('pointerdown', onOutside)
      document.removeEventListener('focusin', onOutside)
      document.removeEventListener('keydown', onKeydown)
    }
  }

  const stop = watch(
    open,
    (isOpen, wasOpen) => {
      if (typeof document === 'undefined' || isOpen === Boolean(wasOpen)) return
      listen(isOpen)
    },
    { immediate: true },
  )

  if (getCurrentScope()) {
    onScopeDispose(() => {
      stop()
      if (open.value && typeof document !== 'undefined') listen(false)
    })
  }

  return { dismiss }
}
