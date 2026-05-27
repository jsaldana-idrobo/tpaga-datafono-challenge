import {StyleSheet} from 'react-native';

import {colors, radii, spacing} from '../../theme';

export const styles = StyleSheet.create({
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
