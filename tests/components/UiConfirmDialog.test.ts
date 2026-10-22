import { describe, expect, it } from 'vitest'
import { defineComponent, h, shallowRef } from 'vue'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiConfirmDialog from '../../app/components/UiConfirmDialog.vue'
import { useConfirm } from '../../app/lib/confirm'

function harness() {
  const result = shallowRef('none')
  const Component = defineComponent({
    setup() {
      const { dialog, confirm } = useConfirm()
      async function remove() {
        const ok = await confirm({ title: 'Delete note?', confirmLabel: 'Delete', tone: 'danger' })
        result.value = String(ok)
      }
      return () => [
        h('button', { type: 'button', onClick: remove }, 'Delete note'),
        h(UiConfirmDialog, dialog),
      ]
    },
  })
  return { Component, result }
}

describe('UiConfirmDialog with useConfirm', () => {
  it('resolves true on confirm and focuses cancel first', async () => {
    const { Component, result } = harness()
    await render(Component)
    await page.getByRole('button', { name: 'Delete note' }).click()
    await expect.element(page.getByRole('alertdialog', { name: 'Delete note?' })).toBeVisible()
    await expect.element(page.getByRole('button', { name: 'Cancel' })).toHaveFocus()
    await page.getByRole('button', { name: 'Delete', exact: true }).click()
    await expect.poll(() => result.value).toBe('true')
    await expect.element(page.getByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('resolves false on cancel and on Escape', async () => {
    const { Component, result } = harness()
    await render(Component)
    await page.getByRole('button', { name: 'Delete note' }).click()
    await page.getByRole('button', { name: 'Cancel' }).click()
    await expect.poll(() => result.value).toBe('false')
    result.value = 'none'
    await page.getByRole('button', { name: 'Delete note' }).click()
    await userEvent.keyboard('{Escape}')
    await expect.poll(() => result.value).toBe('false')
  })
})
