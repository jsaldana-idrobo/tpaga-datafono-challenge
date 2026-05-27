package com.tpagadatafonochallenge

import java.util.Locale
import java.util.UUID

data class PaymentReaderValidationError(
  val code: String,
  val message: String,
)

object PaymentReaderRules {
  private const val QR_METHOD = "QR"
  private const val NFC_METHOD = "NFC"
  private const val CARD_METHOD = "CARD"
  private const val TRANSACTION_ID_PREFIX = "TXN-"
  private const val TRANSACTION_ID_LENGTH = 8

  fun validate(amount: Double, method: String): PaymentReaderValidationError? {
    if (amount.isNaN() || amount.isInfinite() || amount <= 0.0) {
      return PaymentReaderValidationError(
        code = "PAYMENT_AMOUNT_INVALID",
        message = "El monto debe ser mayor a cero.",
      )
    }

    return when (method) {
      QR_METHOD, NFC_METHOD -> null
      CARD_METHOD ->
        PaymentReaderValidationError(
          code = "PAYMENT_METHOD_UNSUPPORTED",
          message = "El método CARD no está soportado por el lector.",
        )
      else ->
        PaymentReaderValidationError(
          code = "PAYMENT_METHOD_INVALID",
          message = "Método de pago inválido: $method.",
        )
    }
  }

  fun createTransactionId(seed: String = UUID.randomUUID().toString()): String {
    val normalizedSeed =
      seed
        .replace("-", "")
        .take(TRANSACTION_ID_LENGTH)
        .uppercase(Locale.US)

    return TRANSACTION_ID_PREFIX + normalizedSeed
  }
}
