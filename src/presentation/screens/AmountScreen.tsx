import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {formatCOP, parseCOPInput} from '../../domain/currency';
import type {PaymentMethod} from '../../domain/paymentTypes';
import {validatePaymentAmount} from '../../domain/paymentValidation';
import type {RootStackParamList} from '../../navigation/navigationTypes';
import {MethodSelector} from '../components/MethodSelector';
import {PrimaryButton} from '../components/PrimaryButton';
import {ScreenShell} from '../components/ScreenShell';
import {colors, radii, spacing} from '../theme';
import {useSingleFlight} from '../hooks/useSingleFlight';

type AmountScreenProps = NativeStackScreenProps<RootStackParamList, 'Amount'>;

export function AmountScreen({
  navigation,
}: AmountScreenProps): React.JSX.Element {
  const [amountInput, setAmountInput] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('QR');
  const submission = useSingleFlight();
  const amount = useMemo(() => parseCOPInput(amountInput), [amountInput]);
  const validation = useMemo(() => validatePaymentAmount(amount), [amount]);
  const isSubmitDisabled = !validation.isValid || submission.isLocked;

  useFocusEffect(
    useCallback(() => {
      submission.reset();
    }, [submission]),
  );

  const handleAmountChange = (value: string) => {
    const parsedAmount = parseCOPInput(value);
    setAmountInput(parsedAmount === 0 ? '' : formatCOP(parsedAmount));
  };

  const handleSubmit = () => {
    if (!validation.isValid) {
      return;
    }

    submission.runOnce(() => {
      navigation.navigate('Processing', {
        amount,
        method: selectedMethod,
      });
    });
  };

  return (
    <ScreenShell>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}>
        <View>
          <Text style={styles.eyebrow}>Datáfono digital</Text>
          <Text style={styles.title}>Nuevo cobro</Text>
          <Text style={styles.subtitle}>
            Ingresa el monto y elige cómo recibirá el pago el comercio.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Monto en COP</Text>
            <TextInput
              accessibilityLabel="Monto en pesos colombianos"
              inputMode="numeric"
              keyboardType="number-pad"
              onChangeText={handleAmountChange}
              placeholder="$ 0"
              placeholderTextColor={colors.muted}
              style={styles.amountInput}
              testID="amount-input"
              value={amountInput}
            />
            {!validation.isValid && amount > 0 ? (
              <Text style={styles.validationMessage}>{validation.message}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Método de pago</Text>
            <MethodSelector
              onChange={setSelectedMethod}
              selectedMethod={selectedMethod}
            />
          </View>
        </View>

        <PrimaryButton
          disabled={isSubmitDisabled}
          label="Cobrar"
          onPress={handleSubmit}
          testID="submit-payment-button"
        />
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  amountInput: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 32,
    fontWeight: '800',
    minHeight: 70,
    paddingHorizontal: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  form: {
    gap: spacing.lg,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  title: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: spacing.xs,
  },
  validationMessage: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
});
