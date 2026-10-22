import { afterEach, describe, expect, it } from 'vitest'
import { lockScroll, unlockScroll } from '../../app/lib/scroll-lock'

let filler: HTMLElement | undefined

afterEach(() => filler?.remove())

describe('lockScroll', () => {
  it('keeps the page width while locked and restores styles on the last unlock', () => {
    filler = document.createElement('div')
    filler.style.height = '3000px'
    document.body.append(filler)
    const contentWidth = () =>
      document.body.clientWidth - Number.parseFloat(getComputedStyle(document.body).paddingRight)
    const width = contentWidth()
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    lockScroll()
    lockScroll()
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe(scrollbarWidth > 0 ? `${scrollbarWidth}px` : '')
    expect(contentWidth()).toBe(width)
    unlockScroll()
    expect(document.body.style.overflow).toBe('hidden')
    unlockScroll()
    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.paddingRight).toBe('')
  })
})
