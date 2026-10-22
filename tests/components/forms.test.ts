import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiCheckboxGroup from '../../app/components/UiCheckboxGroup.vue'
import UiConfigProvider from '../../app/components/UiConfigProvider.vue'
import UiCopyField from '../../app/components/UiCopyField.vue'
import UiField from '../../app/components/UiField.vue'
import UiFormErrorSummary from '../../app/components/UiFormErrorSummary.vue'
import UiInput from '../../app/components/UiInput.vue'
import UiRadioGroup from '../../app/components/UiRadioGroup.vue'
import UiSearchInput from '../../app/components/UiSearchInput.vue'
import UiSelect from '../../app/components/UiSelect.vue'
import UiSwitch from '../../app/components/UiSwitch.vue'
import UiTextarea from '../../app/components/UiTextarea.vue'
import { useFormErrors } from '../../app/lib/form'
import { expectAccessible } from './helpers'

function describedText(element: Element) {
  return (element.getAttribute('aria-describedby') ?? '')
    .split(' ')
    .map((id) => document.getElementById(id)?.textContent?.trim())
    .join(' | ')
}

afterEach(() => vi.restoreAllMocks())

describe('UiField', () => {
  it('connects the label, description, error and required state to the input', async () => {
    const screen = await render(UiField, {
      props: {
        label: 'Name',
        description: 'Shown to other members.',
        error: 'Enter a name.',
        required: true,
      },
      slots: { default: () => h(UiInput) },
    })
    const input = screen.getByRole('textbox', { name: 'Name' }).element()
    expect(input.hasAttribute('required')).toBe(true)
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(describedText(input)).toBe('Shown to other members. | Enter a name.')
    expect(screen.container.querySelector('.ui-field__required')?.textContent).toBe('Required')
    await expectAccessible(screen.container)
  })

  it('uses an asterisk when configured for the app', async () => {
    const screen = await render(UiConfigProvider, {
      props: { config: { requiredIndicator: 'asterisk' } },
      slots: { default: () => h(UiField, { label: 'Name', required: true }, () => h(UiInput)) },
    })
    expect(screen.container.querySelector('.ui-field__required')?.textContent).toBe('*')
  })

  it('passes the same attributes to a native control through the slot', async () => {
    const screen = await render(UiField, {
      props: { label: 'Color', error: ['Pick a color.'] },
      slots: {
        default: (field: { id: string; describedBy?: string; invalid: boolean }) =>
          h('input', {
            id: field.id,
            'aria-describedby': field.describedBy,
            'aria-invalid': field.invalid,
          }),
      },
    })
    const input = screen.getByRole('textbox', { name: 'Color' }).element()
    expect(describedText(input)).toBe('Pick a color.')
  })
})

describe('UiInput and UiTextarea', () => {
  it('counts characters and announces the count through the description', async () => {
    const screen = await render(
      defineComponent(() => {
        const text = ref('abc')
        return () =>
          h(UiInput, {
            modelValue: text.value,
            'onUpdate:modelValue': (value: string) => (text.value = value),
            maxlength: 10,
            showCount: true,
            'aria-label': 'Title',
            class: 'extra',
          })
      }),
    )
    const input = screen.getByRole('textbox', { name: 'Title' })
    await userEvent.type(input, 'de')
    await vi.waitFor(() => expect(describedText(input.element())).toBe('5 of 10 characters'))
    expect(screen.container.querySelector('.ui-input')!.classList).toContain('extra')
    expect(input.element().classList).not.toContain('extra')
  })

  it('keeps a textarea usable on its own', async () => {
    const screen = await render(UiTextarea, { props: { 'aria-label': 'Body', invalid: true } })
    const textarea = screen.getByRole('textbox', { name: 'Body' }).element()
    expect(textarea.getAttribute('rows')).toBe('4')
    expect(textarea.getAttribute('aria-invalid')).toBe('true')
  })
})

describe('UiSelect', () => {
  it('renders an empty placeholder option that is disabled when required', async () => {
    const screen = await render(UiField, {
      props: { label: 'Scope', required: true },
      slots: { default: () => h(UiSelect, { options: ['read', 'write'], placeholder: 'Choose' }) },
    })
    const select = screen.getByRole('combobox', { name: 'Scope' }).element() as HTMLSelectElement
    expect(select.value).toBe('')
    expect(select.options[0]!.disabled).toBe(true)
    await expectAccessible(screen.container)
  })
})

describe('UiCheckboxGroup and UiRadioGroup', () => {
  it('keeps checkbox values in item order', async () => {
    const screen = await render(UiCheckboxGroup, {
      props: { label: 'Scopes', items: ['read', 'write', 'admin'], modelValue: ['admin'] },
    })
    await screen.getByRole('checkbox', { name: 'read' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([[['read', 'admin']]])
    await expect.element(screen.getByRole('group', { name: 'Scopes' })).toBeVisible()
  })

  it('marks every checkbox invalid and describes the group with the error', async () => {
    const screen = await render(UiCheckboxGroup, {
      props: {
        label: 'Scopes',
        items: ['read', 'write'],
        error: 'Choose a scope.',
        required: true,
      },
    })
    const group = screen.getByRole('group').element()
    expect(describedText(group)).toBe('Choose a scope.')
    for (const checkbox of screen.getByRole('checkbox').elements()) {
      expect(checkbox.getAttribute('aria-invalid')).toBe('true')
    }
    await expectAccessible(screen.container)
  })

  it('exposes a required radio group and updates the value', async () => {
    const screen = await render(UiRadioGroup, {
      props: {
        label: 'Expiry',
        items: [
          { value: '30', label: '30 days' },
          { value: '90', label: '90 days', description: 'Recommended' },
        ],
        required: true,
        modelValue: null,
      },
    })
    const group = screen.getByRole('radiogroup', { name: /Expiry/ }).element()
    expect(group.getAttribute('aria-required')).toBe('true')
    await screen.getByRole('radio', { name: '90 days' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([['90']])
    expect(describedText(screen.getByRole('radio', { name: '90 days' }).element())).toBe(
      'Recommended',
    )
    await expectAccessible(screen.container)
  })
})

describe('UiSwitch', () => {
  it('is a switch that toggles its value', async () => {
    const screen = await render(UiSwitch, { props: { label: 'Notifications', modelValue: false } })
    await screen.getByRole('switch', { name: 'Notifications' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([[true]])
    await expectAccessible(screen.container)
  })
})

describe('UiSearchInput', () => {
  it('clears the value and returns focus to the input', async () => {
    const screen = await render(UiSearchInput, { props: { modelValue: 'vue' } })
    const input = screen.getByRole('searchbox', { name: 'Search' })
    await screen.getByRole('button', { name: 'Clear' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([['']])
    expect(screen.emitted('clear')).toHaveLength(1)
    expect(document.activeElement).toBe(input.element())
  })
})

describe('UiFormErrorSummary and useFormErrors', () => {
  it('reads ASP.NET Core validation problems', () => {
    const form = useFormErrors({ ids: { expiresAt: 'token-expiry' } })
    expect(form.setFromProblem({ title: 'Bad request' })).toBe(false)
    expect(
      form.setFromProblem({ errors: { name: ['Enter a name.'], expiresAt: ['Too early.'] } }),
    ).toBe(true)
    expect(form.get('name')).toEqual(['Enter a name.'])
    expect(form.summary.value).toEqual([
      { id: 'name', message: 'Enter a name.' },
      { id: 'token-expiry', message: 'Too early.' },
    ])
    form.clear('name')
    expect(form.get('name')).toBeUndefined()
  })

  it('takes focus when errors arrive and moves focus to a control from a link', async () => {
    const screen = await render({
      setup() {
        const errors = ref<{ id: string; message: string }[]>([])
        return () => [
          h(UiFormErrorSummary, { errors: errors.value }),
          h(
            'button',
            { onClick: () => (errors.value = [{ id: 'name', message: 'Enter a name.' }]) },
            'Submit',
          ),
          h(UiField, { label: 'Name', id: 'name', error: errors.value[0]?.message }, () =>
            h(UiInput),
          ),
        ]
      },
    })
    await screen.getByRole('button', { name: 'Submit' }).click()
    const summary = page.getByRole('region', { name: 'There is a problem' })
    await vi.waitFor(() => expect(document.activeElement).toBe(summary.element()))
    await summary.getByRole('link', { name: 'Enter a name.' }).click()
    expect(document.activeElement?.id).toBe('name')
    await expectAccessible(screen.container)
  })
})

describe('UiCopyField', () => {
  it('copies the value and announces the result', async () => {
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    const screen = await render(UiCopyField, { props: { label: 'Token', value: 'nya_123' } })
    expect(
      (screen.getByRole('textbox', { name: 'Token' }).element() as HTMLInputElement).readOnly,
    ).toBe(true)
    await screen.getByRole('button', { name: 'Copy' }).click()
    expect(writeText).toHaveBeenCalledWith('nya_123')
    await vi.waitFor(() =>
      expect(screen.container.querySelector('[role="status"]')?.textContent?.trim()).toBe('Copied'),
    )
    expect(screen.emitted('copy')).toEqual([[true]])
  })
})
