import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

import {formatCOP} from '../../../domain/currency';
import {PAYMENT_METHOD_LABELS} from '../../../domain/paymentTypes';
import type {RootStackParamList} from '../../../navigation/navigationTypes';
import {PrimaryButton} from '../../components/PrimaryButton/PrimaryButton';
import {ScreenShell} from '../../components/ScreenShell/ScreenShell';
import {styles} from './styles';

type ResultScreenProps = Readonly<
  NativeStackScreenProps<RootStackParamList, 'Result'>
>;

export function ResultScreen({
  navigation,
  route,
}: ResultScreenProps): React.JSX.Element {
  const params = route.params;
  const isApproved = params.status === 'approved';

  const handleRetry = () => {
    navigation.popToTop();
  };

  return (
    <ScreenShell centered>
      <View style={styles.content}>
        <View
          style={[
            styles.statusBadge,
            isApproved ? styles.successBadge : styles.errorBadge,
          ]}>
          <Text
            style={[
              styles.statusMark,
              isApproved ? styles.successText : styles.errorText,
            ]}>
            {isApproved ? 'OK' : '!'}
          </Text>
        </View>

        <Text style={styles.title}>
          {isApproved ? 'Cobro aprobado' : 'Cobro rechazado'}
        </Text>
        <Text style={styles.amount}>{formatCOP(params.amount)}</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>Método</Text>
          <Text style={styles.summaryValue}>
            {PAYMENT_METHOD_LABELS[params.method]}
          </Text>

          {isApproved ? (
            <>
              <Text style={styles.summaryLabel}>Transacción</Text>
              <Text style={styles.summaryValue}>{params.transactionId}</Text>
            </>
          ) : (
            <Text style={styles.errorMessage}>{params.message}</Text>
          )}
        </View>

        {isApproved ? (
          <PrimaryButton label="Nuevo cobro" onPress={handleRetry} />
        ) : (
          <PrimaryButton
            label="Reintentar"
            onPress={handleRetry}
            testID="retry-button"
          />
        )}
      </View>
    </ScreenShell>
  );
}
