import {normalizePaymentError} from '../../src/domain/paymentErrors';

const FALLBACK_PAYMENT_ERROR =
  'No pudimos procesar el cobro. Intenta nuevamente.';

describe('payment error normalization', () => {
  it('maps native unsupported method errors to customer-safe copy', () => {
    expect(
      normalizePaymentError({
        code: 'PAYMENT_METHOD_UNSUPPORTED',
        message: 'CARD is not supported',
      }),
    ).toBe('El método seleccionado aún no está disponible.');
  });

  it('uses the native message for known validation errors', () => {
    expect(
      normalizePaymentError({
        code: 'PAYMENT_AMOUNT_INVALID',
        message: 'El monto debe ser mayor a cero.',
      }),
    ).toBe('El monto debe ser mayor a cero.');
  });

  it('falls back to a safe message when the native error is incomplete', () => {
    expect(normalizePaymentError({code: 'PAYMENT_READER_ERROR'})).toBe(
      FALLBACK_PAYMENT_ERROR,
    );
  });

  it('falls back safely for non-standard thrown values', () => {
    expect(normalizePaymentError(null)).toBe(FALLBACK_PAYMENT_ERROR);
  });

  it('ignores non-string error fields from native exceptions', () => {
    expect(normalizePaymentError({code: 123, message: 456})).toBe(
      FALLBACK_PAYMENT_ERROR,
    );
  });

  it('maps payment reader timeouts to retryable customer-safe copy', () => {
    expect(normalizePaymentError({code: 'PAYMENT_READER_TIMEOUT'})).toBe(
      'El lector tardó demasiado en responder. Intenta nuevamente.',
    );
  });
});
