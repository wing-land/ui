let lockCount = 0
let previousOverflow = ''
let previousPaddingRight = ''

// Counted so that nested dialogs release the page only when the last one closes.
export function lockScroll() {
  if (typeof document === 'undefined') return
  if (lockCount++ === 0) {
    const { body, documentElement } = document
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    previousOverflow = body.style.overflow
    previousPaddingRight = body.style.paddingRight
    // Padding stands in for the hidden scrollbar so the page does not shift sideways.
    // A stable gutter already keeps that space.
    if (
      scrollbarWidth > 0 &&
      !getComputedStyle(documentElement).scrollbarGutter.includes('stable')
    ) {
      const padding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${padding + scrollbarWidth}px`
    }
    body.style.overflow = 'hidden'
  }
}

export function unlockScroll() {
  if (typeof document === 'undefined' || lockCount === 0) return
  if (--lockCount === 0) {
    document.body.style.overflow = previousOverflow
    document.body.style.paddingRight = previousPaddingRight
  }
}
