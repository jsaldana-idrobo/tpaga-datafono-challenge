package com.tpagadatafonochallenge

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class PaymentReaderPackage : TurboReactPackage() {
  override fun getModule(
    name: String,
    reactContext: ReactApplicationContext,
  ): NativeModule? =
    when (name) {
      PaymentReaderModule.NAME -> PaymentReaderModule(reactContext)
      else -> null
    }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
    ReactModuleInfoProvider {
      mapOf(
        PaymentReaderModule.NAME to
          ReactModuleInfo(
            PaymentReaderModule.NAME,
            PaymentReaderModule::class.java.name,
            false,
            false,
            false,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          ),
      )
    }

  override fun createViewManagers(
    reactContext: ReactApplicationContext,
  ): List<ViewManager<*, *>> = emptyList()
}
