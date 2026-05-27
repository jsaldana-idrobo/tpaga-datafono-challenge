import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  type PaymentMethod,
} from '../../domain/paymentTypes';
import {colors, radii, spacing} from '../theme';

type MethodSelectorProps = {
  onChange: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod;
};

export function MethodSelector({
  onChange,
  selectedMethod,
}: MethodSelectorProps): React.JSX.Element {
  return (
    <View accessibilityRole="radiogroup" style={styles.container}>
      {PAYMENT_METHODS.map(method => {
        const isSelected = method === selectedMethod;

        return (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{checked: isSelected}}
            key={method}
            onPress={() => onChange(method)}
            style={[styles.option, isSelected ? styles.optionSelected : undefined]}
            testID={`method-${method}`}>
            <Text style={[styles.label, isSelected ? styles.labelSelected : undefined]}>
              {PAYMENT_METHOD_LABELS[method]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  label: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
  },
  labelSelected: {
    color: colors.ink,
  },
  option: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  optionSelected: {
    backgroundColor: '#E8F7F5',
    borderColor: colors.accent,
  },
});
