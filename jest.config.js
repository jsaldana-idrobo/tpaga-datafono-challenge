module.exports = {
  preset: 'react-native',
  collectCoverageFrom: [
    'App.tsx',
    'src/**/*.{ts,tsx}',
    '!src/navigation/navigationTypes.ts',
    '!src/**/*.styles.ts',
    '!src/**/styles.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '^@react-navigation/native-stack$':
      '<rootDir>/node_modules/@react-navigation/native-stack/lib/commonjs/index.js',
    '\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};
