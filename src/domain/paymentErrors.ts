import type {PaymentErrorInfo} from './paymentTypes';

const FALLBACK_PAYMENT_ERROR =
  'No pudimos procesar el cobro. Intenta nuevamente.';

const KNOWN_NATIVE_VALIDATION_CODES = new Set([
  'PAYMENT_AMOUNT_INVALID',
  'PAYMENT_METHOD_INVALID',
]);

export const normalizePaymentError = (error: PaymentErrorInfo): string => {
  if (error.code === 'PAYMENT_METHOD_UNSUPPORTED') {
    return 'El método seleccionado aún no está disponible.';
  }

  if (
    error.code !== undefined &&
    KNOWN_NATIVE_VALIDATION_CODES.has(error.code) &&
    error.message !== undefined &&
    error.message.trim().length > 0
  ) {
    return error.message;
  }

  return FALLBACK_PAYMENT_ERROR;
};
