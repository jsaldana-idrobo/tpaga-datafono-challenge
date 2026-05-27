import {NativeModules} from 'react-native';

import PaymentReaderModule from '../../src/specs/NativePaymentReaderModule';

const paymentReaderModule = NativeModules.PaymentReaderModule as {
  readPayment: jest.Mock<
    Promise<{status: string; transactionId: string; amount: number}>
  >;
};

describe('native payment reader TurboModule spec', () => {
  beforeEach(() => {
    paymentReaderModule.readPayment = jest.fn().mockResolvedValue({
      amount: 25000,
      status: 'approved',
      transactionId: 'TXN-SPEC01',
    });
  });

  it('resolves the generated TurboModule contract through React Native registry', async () => {
    await expect(PaymentReaderModule.readPayment(25000, 'QR')).resolves.toEqual(
      {
        amount: 25000,
        status: 'approved',
        transactionId: 'TXN-SPEC01',
      },
    );
  });
});
