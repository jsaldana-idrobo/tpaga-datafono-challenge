import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {formatCOP} from '../../domain/currency';
import {normalizePaymentError} from '../../domain/paymentErrors';
import type {PaymentErrorInfo} from '../../domain/paymentTypes';
import {readPayment} from '../../infrastructure/nativePaymentReader';
import type {RootStackParamList} from '../../navigation/navigationTypes';
import {ScreenShell} from '../components/ScreenShell';
import {activityIndicatorColors, styles} from './ProcessingScreen.styles';

type ProcessingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Processing'
>;

export function ProcessingScreen({
  navigation,
  route,
}: ProcessingScreenProps): React.JSX.Element {
  const {amount, method} = route.params;

  useEffect(() => {
    let isActive = true;

    readPayment(amount, method)
      .then(receipt => {
        if (!isActive) {
          return;
        }

        navigation.replace('Result', {
          amount: receipt.amount,
          method,
          status: receipt.status,
          transactionId: receipt.transactionId,
        });
      })
      .catch((error: PaymentErrorInfo) => {
        if (!isActive) {
          return;
        }

        navigation.replace('Result', {
          amount,
          method,
          status: 'error',
          message: normalizePaymentError(error),
        });
      });

    return () => {
      isActive = false;
    };
  }, [amount, method, navigation]);

  return (
    <ScreenShell centered>
      <View style={styles.content}>
        <ActivityIndicator
          color={activityIndicatorColors.primary}
          size="large"
        />
        <Text style={styles.title}>Procesando cobro</Text>
        <Text style={styles.subtitle}>{formatCOP(amount)}</Text>
      </View>
    </ScreenShell>
  );
}
