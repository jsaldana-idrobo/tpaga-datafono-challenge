import {StyleSheet} from 'react-native';

import {colors, radii, spacing} from '../../theme';

export const styles = StyleSheet.create({
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
