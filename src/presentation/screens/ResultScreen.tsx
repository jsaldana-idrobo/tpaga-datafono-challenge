import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {formatCOP} from '../../domain/currency';
import {PAYMENT_METHOD_LABELS} from '../../domain/paymentTypes';
import type {RootStackParamList} from '../../navigation/navigationTypes';
import {PrimaryButton} from '../components/PrimaryButton';
import {ScreenShell} from '../components/ScreenShell';
import {colors, radii, spacing} from '../theme';

type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'Result'>;

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

        {!isApproved ? (
          <PrimaryButton
            label="Reintentar"
            onPress={handleRetry}
            testID="retry-button"
          />
        ) : (
          <PrimaryButton label="Nuevo cobro" onPress={handleRetry} />
        )}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
  },
  content: {
    gap: spacing.lg,
  },
  errorBadge: {
    backgroundColor: colors.dangerBackground,
  },
  errorMessage: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  errorText: {
    color: colors.danger,
  },
  statusBadge: {
    alignItems: 'center',
    borderRadius: radii.md,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  statusMark: {
    fontSize: 18,
    fontWeight: '900',
  },
  successBadge: {
    backgroundColor: colors.successBackground,
  },
  successText: {
    color: colors.success,
  },
  summary: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
