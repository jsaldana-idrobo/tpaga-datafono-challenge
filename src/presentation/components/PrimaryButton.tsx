import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {colors, radii, spacing} from '../theme';

type PrimaryButtonProps = {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  testID?: string;
};

export function PrimaryButton({
  disabled = false,
  label,
  onPress,
  testID,
}: PrimaryButtonProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled}}
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        pressed && !disabled ? styles.buttonPressed : undefined,
        disabled ? styles.buttonDisabled : undefined,
      ]}
      testID={testID}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  buttonPressed: {
    backgroundColor: colors.accentPressed,
  },
  label: {
    color: colors.panel,
    fontSize: 16,
    fontWeight: '700',
  },
});
