import withNuxt from './tests/nuxt-consumer/.nuxt/eslint.config.mjs'

export default withNuxt(
  { ignores: ['docs/.vitepress/dist/**'] },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-self-closing': ['error', { html: { void: 'always' } }],
    },
  },
  {
    files: ['tests/nuxt-consumer/app/pages/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
)
