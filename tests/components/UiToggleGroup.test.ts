import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiTagFilter from '../../app/components/UiTagFilter.vue'
import UiToggleGroup from '../../app/components/UiToggleGroup.vue'

describe('UiToggleGroup', () => {
  it('selects one value and clears it with the all option', async () => {
    const screen = await render(UiToggleGroup, {
      props: { items: ['Vue', 'Nuxt'], label: 'Tags', modelValue: null, allOption: true },
    })
    await screen.getByRole('button', { name: 'Nuxt' }).click()
    await screen.rerender({ modelValue: 'Nuxt' } as never)
    await expect
      .element(screen.getByRole('button', { name: 'Nuxt' }))
      .toHaveAttribute('aria-pressed', 'true')
    await screen.getByRole('button', { name: 'All' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([['Nuxt'], [null]])
  })

  it('toggles several values with multiple', async () => {
    const screen = await render(UiToggleGroup, {
      props: {
        items: [
          { value: 'read', label: 'Read', count: 3 },
          { value: 'write', label: 'Write' },
        ],
        label: 'Scopes',
        multiple: true,
        modelValue: ['read'],
      },
    })
    await expect
      .element(screen.getByRole('button', { name: 'Read 3' }))
      .toHaveAttribute('aria-pressed', 'true')
    await screen.getByRole('button', { name: 'Write' }).click()
    await screen.rerender({ modelValue: ['read', 'write'] } as never)
    await screen.getByRole('button', { name: 'Read 3' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([[['read', 'write']], [['write']]])
  })

  it('keeps the UiTagFilter API', async () => {
    const screen = await render(UiTagFilter, {
      props: { tags: ['Vue'], label: 'Tags', modelValue: null },
    })
    await expect.element(screen.getByRole('group', { name: 'Tags' })).toHaveClass('ui-tag-filter')
    await expect
      .element(screen.getByRole('button', { name: 'All' }))
      .toHaveAttribute('aria-pressed', 'true')
    await screen.getByRole('button', { name: 'Vue' }).click()
    expect(screen.emitted('update:modelValue')).toEqual([['Vue']])
  })
})
