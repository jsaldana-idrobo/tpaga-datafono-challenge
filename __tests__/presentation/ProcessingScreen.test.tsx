import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {act, render} from '@testing-library/react-native';
import React from 'react';
import {NativeModules} from 'react-native';

import type {RootStackParamList} from '../../src/navigation/navigationTypes';
import {ProcessingScreen} from '../../src/presentation/screens/ProcessingScreen/ProcessingScreen';

const paymentReaderModule = NativeModules.PaymentReaderModule as {
  readPayment: jest.Mock<
    Promise<{status: string; transactionId: string; amount: number}>
  >;
};

type ProcessingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Processing'
>;

const route = {
  key: 'Processing',
  name: 'Processing',
  params: {
    amount: 25000,
    method: 'QR',
  },
} as ProcessingScreenProps['route'];

const createNavigation = () =>
  ({
    replace: jest.fn(),
  } as unknown as ProcessingScreenProps['navigation']);

describe('ProcessingScreen', () => {
  beforeEach(() => {
    paymentReaderModule.readPayment = jest.fn();
  });

  it('does not navigate after unmount when the payment is approved later', async () => {
    const navigation = createNavigation();
    let resolvePayment:
      | ((value: {
          amount: number;
          status: string;
          transactionId: string;
        }) => void)
      | undefined;

    paymentReaderModule.readPayment.mockReturnValue(
      new Promise(resolve => {
        resolvePayment = resolve;
      }),
    );

    const screen = render(
      <ProcessingScreen navigation={navigation} route={route} />,
    );
    screen.unmount();

    await act(async () => {
      resolvePayment?.({
        amount: 25000,
        status: 'approved',
        transactionId: 'TXN-LATE',
      });
    });

    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it('does not navigate after unmount when the payment fails later', async () => {
    const navigation = createNavigation();
    let rejectPayment: ((value: unknown) => void) | undefined;

    paymentReaderModule.readPayment.mockReturnValue(
      new Promise((_, reject) => {
        rejectPayment = reject;
      }),
    );

    const screen = render(
      <ProcessingScreen navigation={navigation} route={route} />,
    );
    screen.unmount();

    await act(async () => {
      rejectPayment?.({code: 'PAYMENT_READER_TIMEOUT'});
    });

    expect(navigation.replace).not.toHaveBeenCalled();
  });
});
