module.exports = {
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  maxWorkers: 1,
  preset: 'react-native',
  reporters: ['detox/runners/jest/reporter'],
  rootDir: '..',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  testRegex: String.raw`e2e/.*\.e2e\.ts$`,
  verbose: true,
};
