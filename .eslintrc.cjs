module.exports = {
  env: {
    browser: true,
    es2020: true,
    'cypress/globals': true,
    node: true, // <-- ДОДАЙ ЦЕЙ РЯДОК (виправляє помилку 'module' is not defined)
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['react', 'prettier', 'cypress'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
  },
};
