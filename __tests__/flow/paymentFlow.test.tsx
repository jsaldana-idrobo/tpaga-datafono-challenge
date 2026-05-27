import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {NativeModules} from 'react-native';

import App from '../../App';

const AMOUNT_INPUT_TEST_ID = 'amount-input';
const SUBMIT_PAYMENT_BUTTON_TEST_ID = 'submit-payment-button';

const paymentReaderModule = NativeModules.PaymentReaderModule as {
  readPayment: jest.Mock<
    Promise<{status: string; transactionId: string; amount: number}>
  >;
};

describe('payment flow', () => {
  beforeEach(() => {
    paymentReaderModule.readPayment = jest.fn();
  });

  it('keeps submit disabled until the amount is valid', () => {
    const screen = render(<App />);

    expect(screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID)).toBeDisabled();

    fireEvent.changeText(screen.getByTestId(AMOUNT_INPUT_TEST_ID), '25000');

    expect(screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID)).toBeEnabled();
  });

  it('shows validation feedback when the amount exceeds the transaction limit', () => {
    const screen = render(<App />);

    fireEvent.changeText(screen.getByTestId(AMOUNT_INPUT_TEST_ID), '10000001');

    expect(
      screen.getByText('El monto máximo por cobro es $ 10.000.000.'),
    ).toBeOnTheScreen();
    expect(screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID)).toBeDisabled();
  });

  it('processes an approved QR payment through the native module', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      amount: 25000,
      status: 'approved',
      transactionId: 'TXN-QR123456',
    });

    const screen = render(<App />);

    fireEvent.changeText(screen.getByTestId(AMOUNT_INPUT_TEST_ID), '25000');
    fireEvent.press(screen.getByTestId('method-QR'));
    fireEvent.press(screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID));

    expect(screen.getByText('Procesando cobro')).toBeOnTheScreen();

    expect(await screen.findByText('Cobro aprobado')).toBeOnTheScreen();
    expect(screen.getByText('TXN-QR123456')).toBeOnTheScreen();
    expect(paymentReaderModule.readPayment).toHaveBeenCalledWith(25000, 'QR');
  });

  it('shows an error result and retries card payments safely', async () => {
    paymentReaderModule.readPayment.mockRejectedValueOnce({
      code: 'PAYMENT_METHOD_UNSUPPORTED',
      message: 'CARD is not supported',
    });

    const screen = render(<App />);

    fireEvent.changeText(screen.getByTestId(AMOUNT_INPUT_TEST_ID), '120000');
    fireEvent.press(screen.getByTestId('method-CARD'));
    fireEvent.press(screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID));

    expect(
      await screen.findByText('El método seleccionado aún no está disponible.'),
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('retry-button'));

    expect(screen.getByText('Nuevo cobro')).toBeOnTheScreen();
    expect(screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID)).toBeEnabled();
  });

  it('prevents duplicate submissions caused by double taps', async () => {
    paymentReaderModule.readPayment.mockResolvedValue({
      amount: 40000,
      status: 'approved',
      transactionId: 'TXN-DOUBLE1',
    });

    const screen = render(<App />);

    fireEvent.changeText(screen.getByTestId(AMOUNT_INPUT_TEST_ID), '40000');
    const submitButton = screen.getByTestId(SUBMIT_PAYMENT_BUTTON_TEST_ID);

    fireEvent.press(submitButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(paymentReaderModule.readPayment).toHaveBeenCalledTimes(1);
    });
  });
});
