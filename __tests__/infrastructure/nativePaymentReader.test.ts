import {NativeModules} from 'react-native';

import {readPayment} from '../../src/infrastructure/nativePaymentReader';

const paymentReaderModule = NativeModules.PaymentReaderModule as {
  readPayment: jest.Mock<Promise<{status: string; transactionId: string; amount: number}>>;
};

describe('native payment reader gateway', () => {
  beforeEach(() => {
    paymentReaderModule.readPayment = jest.fn();
  });

  it('delegates approved QR payments to the Android native module', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      status: 'approved',
      transactionId: 'TXN-ABC123',
      amount: 70000,
    });

    await expect(readPayment(70000, 'QR')).resolves.toEqual({
      status: 'approved',
      transactionId: 'TXN-ABC123',
      amount: 70000,
    });
    expect(paymentReaderModule.readPayment).toHaveBeenCalledWith(70000, 'QR');
  });

  it('rejects malformed native responses before they reach the UI', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      status: 'approved',
      transactionId: '',
      amount: 70000,
    });

    await expect(readPayment(70000, 'NFC')).rejects.toThrow(
      'Respuesta inválida del lector de pagos.',
    );
  });
});
