import type {PaymentErrorInfo} from './paymentTypes';

const FALLBACK_PAYMENT_ERROR =
  'No pudimos procesar el cobro. Intenta nuevamente.';

const KNOWN_NATIVE_VALIDATION_CODES = new Set([
  'PAYMENT_AMOUNT_INVALID',
  'PAYMENT_METHOD_INVALID',
]);

const toPaymentErrorInfo = (error: unknown): PaymentErrorInfo => {
  if (typeof error !== 'object' || error === null) {
    return {};
  }

  const maybeError = error as Record<string, unknown>;
  const paymentError: PaymentErrorInfo = {};

  if (typeof maybeError.code === 'string') {
    paymentError.code = maybeError.code;
  }

  if (typeof maybeError.message === 'string') {
    paymentError.message = maybeError.message;
  }

  return paymentError;
};

export const normalizePaymentError = (error: unknown): string => {
  const paymentError = toPaymentErrorInfo(error);

  if (paymentError.code === 'PAYMENT_METHOD_UNSUPPORTED') {
    return 'El método seleccionado aún no está disponible.';
  }

  if (
    paymentError.code !== undefined &&
    KNOWN_NATIVE_VALIDATION_CODES.has(paymentError.code) &&
    paymentError.message !== undefined &&
    paymentError.message.trim().length > 0
  ) {
    return paymentError.message;
  }

  return FALLBACK_PAYMENT_ERROR;
};
