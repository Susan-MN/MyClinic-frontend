/**
 * ESLint configuration for Angular standalone app.
 * Install deps: @angular-eslint/eslint-plugin, @angular-eslint/eslint-plugin-template, @angular-eslint/template-parser, eslint
 */
module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*', 'dist/**/*', 'node_modules/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/consistent-type-imports': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};


