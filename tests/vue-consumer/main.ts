import { createApp, h, shallowRef } from 'vue'
import {
  createUi,
  ja,
  UiButton,
  UiFigure,
  UiIcon,
  UiLink,
  UiModal,
  UiPostDate,
  useClipboard,
} from '@wing-land/ui'
// The documented minimum; base.css is covered by the component tests.
import '@wing-land/ui/tokens.css'

const App = {
  setup() {
    const modal = shallowRef<{ open: () => void } | null>(null)
    const { status, copy } = useClipboard()
    return () =>
      h('main', [
        h(UiButton, { onClick: () => modal.value?.open() }, () => 'Open'),
        h(UiButton, { onClick: () => copy('copied text') }, () => [
          h(UiIcon, { name: 'copy' }),
          ` ${status.value}`,
        ]),
        h(UiLink, { href: 'https://example.com' }, () => 'External'),
        h(UiPostDate, { date: '2026-10-20T01:23:45Z', kind: 'published' }),
        h(UiModal, { ref: modal, label: 'Vue consumer' }, () => [
          h(UiFigure, { src: '/sample.svg', alt: '山のイラスト' }, () =>
            h('img', { src: '/sample.svg', alt: '山のイラスト' }),
          ),
        ]),
      ])
  },
}
createApp(App)
  .use(createUi({ locale: ja, timeZone: 'Asia/Tokyo' }))
  .mount('#app')
