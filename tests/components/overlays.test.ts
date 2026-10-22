import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiButton from '../../app/components/UiButton.vue'
import UiCombobox from '../../app/components/UiCombobox.vue'
import UiDropdownMenu from '../../app/components/UiDropdownMenu.vue'
import UiField from '../../app/components/UiField.vue'
import UiPopover from '../../app/components/UiPopover.vue'
import UiTabs from '../../app/components/UiTabs.vue'
import UiToaster from '../../app/components/UiToaster.vue'
import UiToolbar from '../../app/components/UiToolbar.vue'
import UiToolbarButton from '../../app/components/UiToolbarButton.vue'
import UiTooltip from '../../app/components/UiTooltip.vue'
import { useToast } from '../../app/lib/toast'
import { expectAccessible } from './helpers'

describe('UiPopover', () => {
  it('opens from its trigger and returns focus on Escape', async () => {
    const screen = await render(UiPopover, {
      props: { label: 'Filters' },
      slots: { trigger: () => h(UiButton, null, () => 'Filters'), default: () => 'Panel' },
    })
    const trigger = screen.getByRole('button', { name: 'Filters' })
    await trigger.click()
    await expect.element(page.getByRole('dialog', { name: 'Filters' })).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger.element()))
    expect(trigger.element().getAttribute('aria-expanded')).toBe('false')
  })
})

describe('UiDropdownMenu', () => {
  it('moves with the arrow keys and reports the selected item', async () => {
    const onArchive = vi.fn()
    const screen = await render(UiDropdownMenu, {
      props: {
        items: [
          { label: 'Rename', value: 'rename' },
          { label: 'Archive', value: 'archive', onSelect: onArchive },
          { type: 'separator' },
          { label: 'Delete', value: 'delete', tone: 'danger' },
        ],
      },
      slots: { trigger: () => h(UiButton, { icon: 'more', label: 'Note actions' }) },
    })
    const trigger = screen.getByRole('button', { name: 'Note actions' })
    trigger.element().focus()
    await userEvent.keyboard('{Enter}')
    const menu = page.getByRole('menu')
    await expect.element(menu).toBeVisible()
    // The panel is teleported, so this fails if its styles are scoped to the component.
    expect(getComputedStyle(menu.element()).borderTopWidth).toBe('1px')
    expect(menu.getByRole('menuitem').elements()).toHaveLength(3)
    await userEvent.keyboard('{ArrowDown}{Enter}')
    await vi.waitFor(() => expect(screen.emitted('select')).toEqual([['archive']]))
    expect(onArchive).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger.element()))
  })
})

describe('UiTooltip', () => {
  it('describes its trigger when focused', async () => {
    const screen = await render(UiTooltip, {
      props: { text: 'Archive this note' },
      slots: { default: () => h(UiButton, { icon: 'more', label: 'Archive' }) },
    })
    const trigger = screen.getByRole('button', { name: 'Archive' })
    await userEvent.tab()
    expect(document.activeElement).toBe(trigger.element())
    await expect.element(page.getByRole('tooltip')).toHaveTextContent('Archive this note')
  })
})

describe('UiToaster and useToast', () => {
  it('shows a toast with an action and closes it', async () => {
    const onUndo = vi.fn()
    const screen = await render(
      defineComponent(() => {
        const toast = useToast()
        return () => [
          h(UiToaster),
          h(
            'button',
            {
              onClick: () =>
                toast.show({
                  title: 'Note archived',
                  tone: 'success',
                  duration: 0,
                  action: {
                    label: 'Undo',
                    altText: 'Open the archive to restore it',
                    onClick: onUndo,
                  },
                }),
            },
            'Archive',
          ),
        ]
      }),
    )
    await screen.getByRole('button', { name: 'Archive' }).click()
    const toast = page.getByRole('listitem').filter({ hasText: 'Note archived' })
    await expect.element(toast).toBeVisible()
    expect(getComputedStyle(toast.element()).borderTopWidth).toBe('1px')
    await toast.getByRole('button', { name: 'Undo' }).click()
    expect(onUndo).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(page.getByText('Note archived').elements()).toHaveLength(0))
  })
})

describe('UiTabs', () => {
  it('switches panels with the arrow keys', async () => {
    const screen = await render(UiTabs, {
      props: {
        label: 'Note',
        items: [
          { value: 'body', label: 'Body' },
          { value: 'links', label: 'Links', badge: 3 },
        ],
      },
      slots: { body: () => 'Body panel', links: () => 'Links panel' },
    })
    await screen.getByRole('tab', { name: 'Body' }).click()
    await userEvent.keyboard('{ArrowRight}')
    await expect
      .element(screen.getByRole('tab', { name: /Links/ }))
      .toHaveAttribute('aria-selected', 'true')
    await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Links panel')
    expect(screen.emitted('update:modelValue')?.at(-1)).toEqual(['links'])
    await expectAccessible(screen.container)
  })
})

describe('UiToolbar', () => {
  it('uses one tab stop and moves between buttons with the arrow keys', async () => {
    const screen = await render(
      defineComponent(() => {
        const bold = ref(false)
        return () =>
          h(UiToolbar, { label: 'Formatting' }, () => [
            h(UiToolbarButton, {
              label: 'Bold',
              icon: 'edit',
              pressed: bold.value,
              'onUpdate:pressed': (value: boolean) => (bold.value = value),
            }),
            h(UiToolbarButton, { label: 'Link', icon: 'external' }),
          ])
      }),
    )
    await expect.element(screen.getByRole('toolbar', { name: 'Formatting' })).toBeVisible()
    await userEvent.tab()
    const bold = screen.getByRole('button', { name: 'Bold' })
    expect(document.activeElement).toBe(bold.element())
    await userEvent.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Link' }).element())
    await bold.click()
    await expect.element(bold).toHaveAttribute('aria-pressed', 'true')
    await expectAccessible(screen.container)
  })
})

describe('UiCombobox', () => {
  it('filters the items and selects one inside a field', async () => {
    const screen = await render(
      defineComponent(() => {
        const note = ref<string | null>(null)
        return () =>
          h(UiField, { label: 'Link to note' }, () =>
            h(UiCombobox, {
              items: [
                { value: 'n1', label: 'Weekly review' },
                { value: 'n2', label: 'Reading list' },
                { value: 'n3', label: 'Weekend plans' },
              ],
              modelValue: note.value,
              'onUpdate:modelValue': (value: string | null) => (note.value = value),
            }),
          )
      }),
    )
    const input = screen.getByRole('combobox', { name: 'Link to note' })
    await userEvent.type(input, 'week')
    const options = page.getByRole('option')
    await vi.waitFor(() =>
      expect(options.elements().map((option) => option.textContent?.trim())).toEqual([
        'Weekly review',
        'Weekend plans',
      ]),
    )
    await page.getByRole('option', { name: 'Weekend plans' }).click()
    await vi.waitFor(() =>
      expect((input.element() as HTMLInputElement).value).toBe('Weekend plans'),
    )
  })
})
