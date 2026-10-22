import axe from 'axe-core'
import { expect } from 'vitest'

export async function expectAccessible(context: Element = document.body) {
  const result = await axe.run(context, { resultTypes: ['violations'] })
  const violations = result.violations.map(
    (violation) => `${violation.id}: ${violation.nodes.map((node) => node.target).join(', ')}`,
  )
  expect(violations).toEqual([])
}
