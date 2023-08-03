module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'screen', 'variants', 'responsive', 'extend'],
      },
    ],
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'selector-pseudo-element-no-unknown': null,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'string-no-newline': null,
    'color-hex-length': 'long',
    'color-named': 'never',
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    'selector-max-universal': 1,
    'selector-class-pattern': null,
    // --------
    // SCSS rules
    // --------
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': /^[a-z-]+$/,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    // Allow SCSS and CSS module keywords beginning with `@`
    'scss/at-rule-no-unknown': null,
  },
};
