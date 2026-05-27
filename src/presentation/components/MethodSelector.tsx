import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  type PaymentMethod,
} from '../../domain/paymentTypes';
import {styles} from './MethodSelector.styles';

type MethodSelectorProps = Readonly<{
  onChange: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod;
}>;

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
            style={[
              styles.option,
              isSelected ? styles.optionSelected : undefined,
            ]}
            testID={`method-${method}`}>
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelSelected : undefined,
              ]}>
              {PAYMENT_METHOD_LABELS[method]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
