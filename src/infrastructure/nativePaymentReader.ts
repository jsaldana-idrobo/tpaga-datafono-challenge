import {NativeModules} from 'react-native';

import type {PaymentMethod, PaymentReceipt} from '../domain/paymentTypes';

type NativePaymentResponse = {
  amount: number;
  status: string;
  transactionId: string;
};

type NativePaymentReaderModule = {
  readPayment: (
    amount: number,
    method: PaymentMethod,
  ) => Promise<NativePaymentResponse>;
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

const toPaymentReceipt = (
  nativeResponse: NativePaymentResponse,
): PaymentReceipt => {
  const hasValidReceipt =
    nativeResponse.status === 'approved' &&
    nativeResponse.transactionId.trim().length > 0 &&
    Number.isFinite(nativeResponse.amount);

  if (!hasValidReceipt) {
    throw new Error('Respuesta inválida del lector de pagos.');
  }

  return {
    amount: nativeResponse.amount,
    status: 'approved',
    transactionId: nativeResponse.transactionId,
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
