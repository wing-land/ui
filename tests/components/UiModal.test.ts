import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref, shallowRef } from 'vue'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiModal from '../../app/components/UiModal.vue'
import { expectAccessible } from './helpers'

function imperativeHarness() {
  const modal = shallowRef<{ open: () => void } | null>(null)
  return () => [
    h('button', { type: 'button', onClick: () => modal.value?.open() }, 'Open dialog'),
    h(UiModal, { ref: modal, label: 'Example dialog' }, () => h('p', 'Body')),
  ]
}

function modelHarness(props: Record<string, unknown> = {}) {
  return defineComponent({
    setup() {
      const open = ref(false)
      return () => [
        h('button', { type: 'button', onClick: () => (open.value = true) }, 'Open dialog'),
        h('output', { 'data-testid': 'state' }, String(open.value)),
        h(
          UiModal,
          {
            open: open.value,
            'onUpdate:open': (value: boolean) => (open.value = value),
            title: 'Edit note',
            description: 'Changes are saved when you close.',
            ...props,
          },
          {
            default: () => h('p', 'Body'),
            footer: () =>
              h('button', { type: 'button', onClick: () => (open.value = false) }, 'Done'),
          },
        ),
      ]
    },
  })
}

describe('UiModal', () => {
  it('opens as a modal dialog, closes on Escape and restores focus', async () => {
    await render({ setup: imperativeHarness })
    const opener = page.getByRole('button', { name: 'Open dialog' })
    await opener.click()
    const dialog = page.getByRole('dialog', { name: 'Example dialog' })
    await expect.element(dialog).toBeVisible()
    expect(document.body.style.overflow).toBe('hidden')
    await expectAccessible(dialog.element())
    await userEvent.keyboard('{Escape}')
    await expect.element(dialog).not.toBeInTheDocument()
    await expect.element(opener).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('syncs v-model:open and labels the dialog with its title and description', async () => {
    await render(modelHarness())
    await page.getByRole('button', { name: 'Open dialog' }).click()
    const dialog = page.getByRole('dialog', { name: 'Edit note' })
    await expect.element(dialog).toHaveAccessibleDescription('Changes are saved when you close.')
    await expect.element(page.getByTestId('state')).toHaveTextContent('true')
    await page.getByRole('button', { name: 'Close' }).click()
    await expect.element(page.getByTestId('state')).toHaveTextContent('false')
    await expect.element(dialog).not.toBeInTheDocument()
  })

  it('stays open when beforeClose returns false', async () => {
    const beforeClose = vi.fn().mockResolvedValue(false)
    await render(modelHarness({ beforeClose }))
    await page.getByRole('button', { name: 'Open dialog' }).click()
    await userEvent.keyboard('{Escape}')
    await page.getByRole('button', { name: 'Close' }).click()
    expect(beforeClose.mock.calls).toEqual([['escape'], ['close-button']])
    await expect.element(page.getByRole('dialog', { name: 'Edit note' })).toBeVisible()
    await page.getByRole('button', { name: 'Done' }).click()
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument()
  })

  it('cannot be dismissed when dismissible is false', async () => {
    await render(modelHarness({ dismissible: false }))
    await page.getByRole('button', { name: 'Open dialog' }).click()
    await expect.element(page.getByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await expect.element(page.getByRole('dialog', { name: 'Edit note' })).toBeVisible()
    await page.getByRole('button', { name: 'Done' }).click()
  })
})
