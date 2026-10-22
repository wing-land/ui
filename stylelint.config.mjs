/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-recommended-scss'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          { ignorePseudoClasses: ['deep', 'global', 'slotted'] },
        ],
      },
    },
  ],
}
