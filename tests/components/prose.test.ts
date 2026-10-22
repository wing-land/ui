import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import { h } from 'vue'
import '../../app/assets/css/prose.css'
import UiImageLightbox from '../../app/components/UiImageLightbox.vue'

const image = (id: string) =>
  h('img', {
    id,
    src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
    width: 40,
    height: 30,
    alt: '',
  })

test('prose images keep their size unless they open in a lightbox', () => {
  render({
    render: () =>
      h('div', { class: 'prose', style: 'width: 400px' }, [
        h('p', ['Inline ', image('inline'), ' image']),
        h(UiImageLightbox, { src: '/large.png', alt: 'Large' }, () => image('lightbox')),
      ]),
  })
  const inline = document.querySelector<HTMLImageElement>('#inline')!
  const lightbox = document.querySelector<HTMLImageElement>('#lightbox')!

  expect(inline.getBoundingClientRect().width).toBe(40)
  expect(getComputedStyle(inline).display).toBe('inline')
  expect(lightbox.getBoundingClientRect().width).toBe(400)
})
