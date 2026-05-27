# Tpaga Datafono Challenge

Mini app React Native para simular un datáfono digital con integración nativa Android en Kotlin.

## Requisitos

- Node.js 18+
- npm 10+
- JDK 17 recomendado para Gradle
- Android SDK con `platforms;android-35`, `build-tools;35.0.0` y un emulador Android

Si tienes varias versiones de Java/Android SDK:

```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
export PATH="$ANDROID_HOME/platform-tools:$PATH"
```

## Instalacion Y Ejecucion

```bash
npm install
npm start
npm run android
```

## Validacion

```bash
npm run typecheck
npm run lint
npm audit --audit-level=moderate
npm test -- --coverage
npm run android:test
```

E2E Android con Detox:

```bash
npm run e2e:build:android
npm run e2e:android
```

La configuracion Detox usa el AVD `Pixel_6_API_35`. Si el emulador local tiene otro nombre, cambia `avdName` en `.detoxrc.js`.

## Decisiones Tecnicas

- React Native bare + TypeScript estricto para poder integrar un Native Module real en `/android`.
- React Navigation para mantener el flujo de 3 pantallas desacoplado y tipado.
- Dominio separado para formato COP, validacion de montos, tipos de pago y normalizacion de errores.
- `PaymentReaderModule` expone `readPayment(amount, method)` como Promise hacia JS.
- `QR` y `NFC` aprueban despues de 1.5s con `status`, `transactionId` y `amount`.
- `CARD` esta en la UI porque lo pide el challenge, pero el lector nativo lo rechaza con error controlado para demostrar el flujo de error/reintento.
- Se previenen dobles toques con un hook `useSingleFlight` y se evita actualizar navegacion si la pantalla de procesamiento se desmonta.

## Testing

- Unit tests de dominio: formato COP, validaciones y errores.
- Unit tests del gateway nativo JS con mock de `NativeModules`.
- Flow tests del flujo completo: QR exitoso, tarjeta con error/retry y doble tap.
- Unit tests Android/Kotlin para reglas del lector nativo.
- Specs E2E Detox para QR, NFC y Tarjeta.

## Que Haria Con Mas Tiempo

- Agregar un contrato TurboModule/New Architecture para tipar el puente nativo end to end.
- Persistir transacciones localmente y agregar historial.
- Medir tiempos reales del flujo con trazas y logs estructurados.
- Configurar CI con jobs separados para lint, typecheck, Jest, Gradle y Detox.
