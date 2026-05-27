/// <reference types="detox" />

const AMOUNT_INPUT_TEST_ID = 'amount-input';
const APPROVED_PAYMENT_TEXT = 'Cobro aprobado';
const SUBMIT_PAYMENT_BUTTON_TEST_ID = 'submit-payment-button';

const submitPayment = async (
  amount: string,
  methodTestID: string,
): Promise<void> => {
  await waitFor(element(by.id(AMOUNT_INPUT_TEST_ID)))
    .toBeVisible()
    .withTimeout(10000);
  await element(by.id(AMOUNT_INPUT_TEST_ID)).tap();
  await element(by.id(AMOUNT_INPUT_TEST_ID)).typeText(amount);
  await device.pressBack();
  await element(by.id(methodTestID)).tap();
  await element(by.id(SUBMIT_PAYMENT_BUTTON_TEST_ID)).tap();
};

describe('payment flow', () => {
  beforeEach(async () => {
    await device.launchApp({delete: true, newInstance: true});
  });

  it('approves QR payments end to end', async () => {
    await submitPayment('25000', 'method-QR');

    await expect(element(by.text('Procesando cobro'))).toBeVisible();
    await waitFor(element(by.text(APPROVED_PAYMENT_TEXT)))
      .toBeVisible()
      .withTimeout(4000);
  });

  it('approves NFC payments end to end', async () => {
    await submitPayment('41000', 'method-NFC');

    await waitFor(element(by.text(APPROVED_PAYMENT_TEXT)))
      .toBeVisible()
      .withTimeout(4000);
    await expect(element(by.text(APPROVED_PAYMENT_TEXT))).toBeVisible();
  });

  it('shows a retryable error for card payments', async () => {
    await submitPayment('69000', 'method-CARD');

    await waitFor(
      element(by.text('El método seleccionado aún no está disponible.')),
    )
      .toBeVisible()
      .withTimeout(4000);

    await element(by.id('retry-button')).tap();
    await expect(element(by.id(AMOUNT_INPUT_TEST_ID))).toBeVisible();
  });
});
