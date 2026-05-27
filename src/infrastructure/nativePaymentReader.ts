import {NativeModules} from 'react-native';

import type {PaymentMethod, PaymentReceipt} from '../domain/paymentTypes';

type NativePaymentResponse = {
  amount: number;
  status: string;
  transactionId: string;
};

type NativePaymentReaderModule = {
  readPayment: (amount: number, method: PaymentMethod) => Promise<unknown>;
};

const getPaymentReaderModule = (): NativePaymentReaderModule => {
  const paymentReaderModule = NativeModules.PaymentReaderModule as
    | NativePaymentReaderModule
    | undefined;

  if (paymentReaderModule === undefined) {
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

export const readPayment = async (
  amount: number,
  method: PaymentMethod,
): Promise<PaymentReceipt> => {
  const nativeResponse = await getPaymentReaderModule().readPayment(
    amount,
    method,
  );

  return toPaymentReceipt(nativeResponse);
};
