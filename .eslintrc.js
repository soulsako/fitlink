// ✅ Tuned for React Native + TypeScript + Jest + Prettier + NativeWind
module.exports = {
  root: true,
  env: { es2021: true, node: true, jest: true },
  extends: [
    '@react-native',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
    'tailwind.config.js',
  ],
  plugins: ['jest', 'testing-library'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: [
        '**/__tests__/**/*.{js,jsx,ts,tsx}',
        '**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
      env: { jest: true },
      rules: {
        'jest/no-disabled-tests': 'warn',
        'testing-library/no-unnecessary-act': 'warn',
      },
    },
  ],
};
