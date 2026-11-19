module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    // React 17+ JSX transform: React does not need to be in scope.
    'react/react-in-jsx-scope': 'off',
    // The project does not use PropTypes.
    'react/prop-types': 'off',
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'import/prefer-default-export': 'off',
    // Components import each other through the components/index.js barrel.
    'import/no-cycle': 'off',
    'max-len': 'off',
    // Git normalises line endings; the Windows working copy uses CRLF.
    'linebreak-style': 'off',
    // Redux Toolkit reducers use Immer, so mutating `state` is intended.
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
  overrides: [
    {
      // Pre-existing accessibility/key issues: surfaced as warnings so they stay visible.
      files: ['src/**/*.jsx'],
      rules: {
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
        'jsx-a11y/label-has-associated-control': 'warn',
        'react/no-array-index-key': 'warn',
      },
    },
    {
      files: ['**/*.test.{js,jsx}'],
      env: { node: true },
      rules: { 'import/no-extraneous-dependencies': ['error', { devDependencies: true }] },
    },
  ],
};
