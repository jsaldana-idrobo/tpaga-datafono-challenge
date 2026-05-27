package com.tpagadatafonochallenge

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class PaymentReaderRulesTest {
  @Test
  fun acceptsPositiveAmountsForQrAndNfc() {
    assertNull(PaymentReaderRules.validate(25000.0, "QR"))
    assertNull(PaymentReaderRules.validate(25000.0, "NFC"))
  }

  @Test
  fun rejectsInvalidAmounts() {
    val error = PaymentReaderRules.validate(0.0, "QR")

    assertEquals("PAYMENT_AMOUNT_INVALID", error?.code)
    assertEquals("El monto debe ser mayor a cero.", error?.message)
  }

  @Test
  fun rejectsUnsupportedCardMethod() {
    val error = PaymentReaderRules.validate(50000.0, "CARD")

    assertEquals("PAYMENT_METHOD_UNSUPPORTED", error?.code)
    assertEquals("El método CARD no está soportado por el lector.", error?.message)
  }

  @Test
  fun rejectsUnknownMethods() {
    val error = PaymentReaderRules.validate(50000.0, "CASH")

    assertEquals("PAYMENT_METHOD_INVALID", error?.code)
    assertEquals("Método de pago inválido: CASH.", error?.message)
  }

  @Test
  fun createsReadableTransactionIds() {
    val transactionId = PaymentReaderRules.createTransactionId("abc12345-6789")

    assertEquals("TXN-ABC12345", transactionId)
  }
}
