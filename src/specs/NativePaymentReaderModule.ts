import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';
import type {Double} from 'react-native/Libraries/Types/CodegenTypes';

export type NativePaymentResponse = Readonly<{
  amount: Double;
  status: string;
  transactionId: string;
}>;

export interface Spec extends TurboModule {
  readPayment: (
    amount: Double,
    method: string,
  ) => Promise<NativePaymentResponse>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PaymentReaderModule');
