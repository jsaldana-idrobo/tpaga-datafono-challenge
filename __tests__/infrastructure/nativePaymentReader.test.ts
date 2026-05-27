import {NativeModules} from 'react-native';

import {readPayment} from '../../src/infrastructure/nativePaymentReader';

const APPROVED_STATUS = 'approved';
const INVALID_READER_RESPONSE_ERROR = 'Respuesta inválida del lector de pagos.';
const TRANSACTION_ID = 'TXN-ABC123';

const paymentReaderModule = NativeModules.PaymentReaderModule as {
  readPayment: jest.Mock<
    Promise<{status: string; transactionId: string; amount: number}>
  >;
};

describe('native payment reader gateway', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    paymentReaderModule.readPayment = jest.fn();
  });

  it('delegates approved QR payments to the Android native module', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      status: APPROVED_STATUS,
      transactionId: TRANSACTION_ID,
      amount: 70000,
    });

    await expect(readPayment(70000, 'QR')).resolves.toEqual({
      status: APPROVED_STATUS,
      transactionId: TRANSACTION_ID,
      amount: 70000,
    });
    expect(paymentReaderModule.readPayment).toHaveBeenCalledWith(70000, 'QR');
  });

  it('rejects malformed native responses before they reach the UI', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      status: APPROVED_STATUS,
      transactionId: '',
      amount: 70000,
    });

    await expect(readPayment(70000, 'NFC')).rejects.toThrow(
      INVALID_READER_RESPONSE_ERROR,
    );
  });

  it('rejects non-object native responses before they reach the UI', async () => {
    paymentReaderModule.readPayment.mockResolvedValue(null as never);

    await expect(readPayment(70000, 'NFC')).rejects.toThrow(
      INVALID_READER_RESPONSE_ERROR,
    );
  });

  it('rejects invalid approved amounts from native responses', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      status: APPROVED_STATUS,
      transactionId: TRANSACTION_ID,
      amount: -1,
    });

    await expect(readPayment(70000, 'NFC')).rejects.toThrow(
      INVALID_READER_RESPONSE_ERROR,
    );
  });

  it('rejects when the native reader exceeds the timeout', async () => {
    jest.useFakeTimers();
    paymentReaderModule.readPayment.mockReturnValue(
      new Promise(() => undefined),
    );

    const payment = readPayment(70000, 'QR', {timeoutMs: 1000});

    jest.advanceTimersByTime(1000);

    await expect(payment).rejects.toMatchObject({
      code: 'PAYMENT_READER_TIMEOUT',
    });
    await expect(payment).rejects.toBeInstanceOf(Error);
  });
});
