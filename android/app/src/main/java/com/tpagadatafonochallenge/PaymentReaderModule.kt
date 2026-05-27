package com.tpagadatafonochallenge

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = PaymentReaderModule.NAME)
class PaymentReaderModule(
  reactContext: ReactApplicationContext,
) : NativePaymentReaderModuleSpec(reactContext) {
  private val mainHandler = Handler(Looper.getMainLooper())

  override fun getName(): String = NAME

  @ReactMethod
  override
  fun readPayment(amount: Double, method: String, promise: Promise) {
    val validationError = PaymentReaderRules.validate(amount, method)

    if (validationError != null) {
      promise.reject(validationError.code, validationError.message)
      return
    }

    mainHandler.postDelayed(
      {
        val response = Arguments.createMap().apply {
          putString("status", "approved")
          putString("transactionId", PaymentReaderRules.createTransactionId())
          putDouble("amount", amount)
        }

        promise.resolve(response)
      },
      PAYMENT_READ_DELAY_MS,
    )
  }

  companion object {
    const val NAME = "PaymentReaderModule"
    private const val PAYMENT_READ_DELAY_MS = 1500L
  }
}
