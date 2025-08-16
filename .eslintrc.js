// .eslintrc.js (after)
module.exports = {
  root: true,
  env: { es2021: true, node: true, jest: true },
  settings: {
    react: { version: 'detect' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    // ✅ remove the TS resolver to avoid "invalid interface loaded as resolver"
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    jest: { version: 29 },
    'testing-library/utils-module': '@testing-library/react-native',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules/',
    'dist/',
    'build/',
    'android/',
    'ios/',
    'babel.config.js',
    'metro.config.js',
    'tailwind.config.js',
    'jest.config.js',
  ],
  extends: [
    '@react-native',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:testing-library/react',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports',
    'promise',
    'jest',
    'testing-library',
    'react',
    'react-native',
    'react-hooks',
    'prettier',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    curly: ['error', 'all'],
    'no-param-reassign': ['error', { props: true }],
    'no-else-return': 'error',
    'no-useless-return': 'error',

    'import/no-duplicates': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],

    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',

    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-useless-fragment': 'warn',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/split-platform-components': 'warn',
    'react-native/no-raw-text': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'import/namespace': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports' },
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    {
      files: [
        '**/__tests__/**/*.{js,jsx,ts,tsx}',
        '**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
      env: { jest: true },
      extends: ['plugin:jest/style'],
    },
  ],
};
