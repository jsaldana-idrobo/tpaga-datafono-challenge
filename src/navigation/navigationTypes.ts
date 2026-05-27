import type {PaymentMethod} from '../domain/paymentTypes';

export type RootStackParamList = {
  Amount: undefined;
  Processing: {
    amount: number;
    method: PaymentMethod;
  };
  Result:
    | {
        amount: number;
        method: PaymentMethod;
        status: 'approved';
        transactionId: string;
      }
    | {
        amount: number;
        method: PaymentMethod;
        status: 'error';
        message: string;
      };
};
