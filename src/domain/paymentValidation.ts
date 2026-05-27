import {formatCOP} from './currency';

export const MAX_PAYMENT_AMOUNT_COP = 10000000;

type ValidPaymentAmount = {
  isValid: true;
};

type InvalidPaymentAmount = {
  isValid: false;
  message: string;
};

export type PaymentAmountValidation = ValidPaymentAmount | InvalidPaymentAmount;

export const validatePaymentAmount = (
  amount: number,
): PaymentAmountValidation => {
  if (!Number.isFinite(amount) || !Number.isInteger(amount) || amount <= 0) {
    return {
      isValid: false,
      message: 'Ingresa un monto mayor a $ 0.',
    };
  }

  if (amount > MAX_PAYMENT_AMOUNT_COP) {
    return {
      isValid: false,
      message: `El monto máximo por cobro es ${formatCOP(MAX_PAYMENT_AMOUNT_COP)}.`,
    };
  }

  return {isValid: true};
};
