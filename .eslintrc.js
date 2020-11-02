/* eslint-env node */

module.exports = {
  root: true,

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  extends: [
    '@whitetrefoil/eslint-config/with-type/react',
  ],

  overrides: [
    {
      files: ['Gulpfile.ts', 'src/index.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': [0],
      },
    },
  ],
}
