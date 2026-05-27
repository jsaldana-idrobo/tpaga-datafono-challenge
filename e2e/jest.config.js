module.exports = {
  maxWorkers: 1,
  preset: 'react-native',
  testEnvironment: './environment',
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  testRegex: '\\.e2e\\.ts$',
  reporters: ['detox/runners/jest/reporter'],
  verbose: true,
};
