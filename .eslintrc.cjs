module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'], 
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off',

    'import/order': [
      'error',
      {
        'groups': [
          'builtin', 
          'external', 
          ['internal', 'parent', 'sibling', 'index'] 
        ],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'builtin',
            'position': 'before'
          },
          {
            'pattern': 'next/**',
            'group': 'external',
            'position': 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
      }
    ],
    "quotes": ["error", "double", { "avoidEscape": true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
