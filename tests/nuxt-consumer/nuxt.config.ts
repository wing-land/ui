export default defineNuxtConfig({
  compatibilityDate: '2026-10-04',
  extends: ['@wing-land/ui/nuxt'],
  modules: ['@nuxt/eslint'],
  wingUi: {
    css: { base: true, prose: true },
    font: true,
    locale: 'ja',
    timeZone: 'Asia/Tokyo',
    colorMode: true,
  },
  devtools: { enabled: false },
  app: { head: { title: 'Nuxt consumer' } },
})
