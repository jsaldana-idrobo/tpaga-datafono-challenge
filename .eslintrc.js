module.exports = {
  root: true,
  ignorePatterns: [
    'android/**/build/**',
    'ios/Pods/**',
    'coverage/**',
    'node_modules/**',
  ],
  extends: ['@react-native', 'plugin:sonarjs/recommended'],
  plugins: ['jest', 'sonarjs'],
  env: {
    'jest/globals': true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    'react/no-unstable-nested-components': 'off',
    'sonarjs/cognitive-complexity': ['error', 12],
  },
};
