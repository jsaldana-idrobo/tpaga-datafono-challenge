export const PAYMENT_METHODS = ['QR', 'NFC', 'CARD'] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type PaymentStatus = 'approved';

export type PaymentReceipt = {
  amount: number;
  status: PaymentStatus;
  transactionId: string;
};

export type PaymentErrorInfo = {
  code?: string;
  message?: string;
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CARD: 'Tarjeta',
  NFC: 'NFC',
  QR: 'QR',
};
