import { NuxtLink } from '#components'
import { createUi } from '../lib/config'
import { en, ja } from '../lib/messages'

export default defineNuxtPlugin({
  name: 'wing-land-ui',
  setup(nuxtApp) {
    const { locale, timeZone } = useRuntimeConfig().public.wingUi
    nuxtApp.vueApp.use(
      createUi({
        linkComponent: NuxtLink,
        locale: locale ? { ja, en }[locale] : undefined,
        timeZone: timeZone || undefined,
      }),
    )
  },
})
