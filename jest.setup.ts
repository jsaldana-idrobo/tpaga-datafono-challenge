import '@testing-library/react-native/extend-expect';
import {NativeModules} from 'react-native';

NativeModules.PaymentReaderModule = {
  readPayment: jest.fn(),
};

jest.mock('react-native-screens', () => {
  const screens = jest.requireActual('react-native-screens');
  return {
    ...screens,
    enableScreens: jest.fn(),
  };
});
