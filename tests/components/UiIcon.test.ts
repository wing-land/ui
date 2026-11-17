import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiIcon from '../../app/components/UiIcon.vue'
import { uiIcons, type UiIconName } from '../../app/lib/icons'

describe('UiIcon', () => {
  it('draws every built-in icon inside its view box', async () => {
    for (const name of Object.keys(uiIcons) as UiIconName[]) {
      const screen = await render(UiIcon, { props: { name, size: 24 } })
      const svg = screen.container.querySelector('svg')!
      const paths = svg.querySelectorAll('path')
      const [, , width, height] = uiIcons[name].viewBox.split(' ').map(Number)

      expect(paths.length, name).toBeGreaterThan(0)
      for (const path of paths) {
        const box = path.getBBox()
        expect(box.width + box.height, name).toBeGreaterThan(0)
        expect(box.x + box.width, name).toBeLessThanOrEqual(width! + 0.5)
        expect(box.y + box.height, name).toBeLessThanOrEqual(height! + 0.5)
      }
      screen.unmount()
    }
  })
})
