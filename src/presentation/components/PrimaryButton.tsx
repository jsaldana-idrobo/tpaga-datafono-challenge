import React from 'react';
import {Pressable, Text} from 'react-native';

import {styles} from './PrimaryButton.styles';

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
