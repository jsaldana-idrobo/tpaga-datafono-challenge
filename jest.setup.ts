import '@testing-library/react-native/extend-expect';

jest.mock('react-native-screens', () => {
  const screens = jest.requireActual('react-native-screens');
  return {
    ...screens,
    enableScreens: jest.fn(),
  };
});
