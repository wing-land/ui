import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiCodeBlock from '../../app/components/UiCodeBlock.vue'

const statusOf = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[role="status"]')!

describe('UiCodeBlock', () => {
  afterEach(() => vi.restoreAllMocks())

  it('copies the code and announces success', async () => {
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    const screen = await render(UiCodeBlock, { props: { code: 'const a = 1', language: 'ts' } })
    await screen.getByRole('button', { name: 'Copy' }).click()
    expect(writeText).toHaveBeenCalledWith('const a = 1')
    await expect.element(statusOf(screen.container)).toHaveTextContent('Copied')
  })

  it('announces a failure', async () => {
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'))
    const screen = await render(UiCodeBlock, { props: { code: 'x' } })
    await screen.getByRole('button', { name: 'Copy' }).click()
    await vi.waitFor(() => {
      expect(statusOf(screen.container).textContent).toContain('Could not copy')
      expect(statusOf(screen.container).classList.contains('is-error')).toBe(true)
    })
  })
})
