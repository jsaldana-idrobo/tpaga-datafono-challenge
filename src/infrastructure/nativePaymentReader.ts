import {TurboModuleRegistry} from 'react-native';

import type {
  PaymentErrorInfo,
  PaymentMethod,
  PaymentReceipt,
} from '../domain/paymentTypes';
import type {Spec as NativePaymentReaderModule} from '../specs/NativePaymentReaderModule';

const PAYMENT_READER_TIMEOUT_MS = 10000;
const PAYMENT_READER_TIMEOUT_CODE = 'PAYMENT_READER_TIMEOUT';

type NativePaymentResponse = {
  amount: number;
  status: string;
  transactionId: string;
};

type ReadPaymentOptions = Readonly<{
  timeoutMs?: number;
}>;

const createPaymentReaderTimeoutError = (): Error & PaymentErrorInfo =>
  Object.assign(new Error('Payment reader timed out.'), {
    code: PAYMENT_READER_TIMEOUT_CODE,
  });

const getPaymentReaderModule = (): NativePaymentReaderModule => {
  const paymentReaderModule =
    TurboModuleRegistry.get<NativePaymentReaderModule>('PaymentReaderModule');

  if (paymentReaderModule === null) {
    throw new Error('PaymentReaderModule no está registrado en Android.');
  }

  return paymentReaderModule;
};

const toPaymentReceipt = (nativeResponse: unknown): PaymentReceipt => {
  if (typeof nativeResponse !== 'object' || nativeResponse === null) {
    throw new Error('Respuesta inválida del lector de pagos.');
  }

  const response = nativeResponse as Partial<NativePaymentResponse>;
  const {amount, status, transactionId} = response;

  if (
    status !== 'approved' ||
    typeof transactionId !== 'string' ||
    transactionId.trim().length === 0 ||
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {
    throw new Error('Respuesta inválida del lector de pagos.');
  }

  return {
    amount,
    status: 'approved',
    transactionId,
  };
};

const withPaymentTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(createPaymentReaderTimeoutError());
    }, timeoutMs);

    promise.then(resolve, reject).finally(() => {
      clearTimeout(timeoutId);
    });
  });

export const readPayment = async (
  amount: number,
  method: PaymentMethod,
  options: ReadPaymentOptions = {},
): Promise<PaymentReceipt> => {
  return withPaymentTimeout(
    getPaymentReaderModule().readPayment(amount, method).then(toPaymentReceipt),
    options.timeoutMs ?? PAYMENT_READER_TIMEOUT_MS,
  );
};
