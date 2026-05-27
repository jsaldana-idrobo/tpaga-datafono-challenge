module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@react-navigation/native-stack$':
      '<rootDir>/node_modules/@react-navigation/native-stack/lib/commonjs/index.js',
    '\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};
