import {validatePaymentAmount} from '../../src/domain/paymentValidation';

describe('payment validation', () => {
  it('rejects non-positive amounts', () => {
    expect(validatePaymentAmount(0)).toEqual({
      isValid: false,
      message: 'Ingresa un monto mayor a $ 0.',
    });
  });

  it('rejects amounts above the transaction limit', () => {
    expect(validatePaymentAmount(10000001)).toEqual({
      isValid: false,
      message: 'El monto máximo por cobro es $ 10.000.000.',
    });
  });

  it('accepts valid COP amounts', () => {
    expect(validatePaymentAmount(85000)).toEqual({isValid: true});
  });
});
