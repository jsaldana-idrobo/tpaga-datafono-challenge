import {normalizePaymentError} from '../../src/domain/paymentErrors';

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
      'No pudimos procesar el cobro. Intenta nuevamente.',
    );
  });

  it('falls back safely for non-standard thrown values', () => {
    expect(normalizePaymentError(null)).toBe(
      'No pudimos procesar el cobro. Intenta nuevamente.',
    );
  });
});
