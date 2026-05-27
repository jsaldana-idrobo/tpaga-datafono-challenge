# Tpaga Datafono Challenge

Mini app React Native para simular un datáfono digital con integración nativa Android en Kotlin.

## Requisitos

- Node.js 18+
- pnpm 10+
- JDK 17 recomendado para Gradle
- Android SDK con `platforms;android-35`, `build-tools;35.0.0` y un emulador Android

Si tienes varias versiones de Java/Android SDK:

```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
export PATH="$ANDROID_HOME/platform-tools:$PATH"
```

## Instalación y ejecución

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm start
pnpm android
```

## Validación

```bash
pnpm typecheck
pnpm lint
pnpm audit --audit-level moderate
pnpm test:coverage
pnpm android:test
```

E2E Android con Detox:

```bash
pnpm e2e:build:android
pnpm e2e:android
```

La configuración Detox usa el AVD `Pixel_6_API_35`. Si el emulador local tiene otro nombre, cambia `avdName` en `.detoxrc.js`.

## Decisiones técnicas

- React Native bare + TypeScript estricto para poder integrar un Native Module real en `/android`.
- React Navigation para mantener el flujo de 3 pantallas desacoplado y tipado.
- Dominio separado para formato COP, validación de montos, tipos de pago y normalización de errores.
- `PaymentReaderModule` expone `readPayment(amount, method)` como Promise hacia JS.
- `QR` y `NFC` aprueban después de 1.5s con `status`, `transactionId` y `amount`.
- `CARD` está en la UI porque lo pide el challenge, pero el lector nativo lo rechaza con error controlado para demostrar el flujo de error/reintento.
- Se previenen dobles toques con un hook `useSingleFlight` y se evita actualizar navegación si la pantalla de procesamiento se desmonta.

## Documentación

### Arquitectura de carpetas

- `src/domain`: reglas puras de negocio, validaciones, formato COP, tipos y normalización de errores.
- `src/infrastructure`: gateway JS hacia el módulo nativo Android y protecciones de timeout/contrato.
- `src/navigation`: stack tipado de React Navigation y estilos globales de navegación.
- `src/presentation/screens`: pantallas agrupadas por feature con su `styles.ts`.
- `src/presentation/components`: componentes reutilizables agrupados con su `styles.ts`.
- `android/app/src/main/java`: implementación Kotlin del lector de pagos.

### Flujo de pago

1. `AmountScreen` valida y formatea el monto, permite elegir `QR`, `NFC` o `CARD`, y bloquea dobles envíos.
2. `ProcessingScreen` ejecuta `readPayment` contra el módulo nativo, normaliza errores y evita updates después de desmontar.
3. `ResultScreen` muestra aprobación o rechazo con opción de iniciar un nuevo cobro.

### Calidad y CI

- GitHub Actions ejecuta instalación reproducible con pnpm, typecheck, lint, Jest con coverage, unit tests Android y SonarCloud Quality Gate.
- SonarCloud consume `coverage/lcov.info` y excluye archivos sin lógica ejecutable como estilos, mocks, tests, Android/iOS generated/build output y tipos de navegación.
- El objetivo local de cobertura se valida con `pnpm test:coverage`.

## Testing

- Unit tests de dominio: formato COP, validaciones y errores.
- Unit tests del gateway nativo JS con mock de `NativeModules`.
- Flow tests del flujo completo: QR exitoso, tarjeta con error/retry y doble tap.
- Unit tests Android/Kotlin para reglas del lector nativo.
- Specs E2E Detox para QR, NFC y Tarjeta.

## Próximas mejoras

- Con más tiempo, migrar el Native Module actual de bridge clásico a TurboModule/Codegen para tener contrato tipado end to end con la New Architecture.
- Persistir transacciones localmente y agregar historial con filtros por método, estado y fecha.
- Enviar trazas y errores a Sentry/Crashlytics sin PII para mejorar observabilidad real.
- Firmar builds release con secrets y agregar distribución interna automatizada.
- Ejecutar Detox en un job programado o manual para no encarecer cada pull request.
