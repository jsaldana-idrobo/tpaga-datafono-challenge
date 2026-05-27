import {StyleSheet} from 'react-native';

import {colors, spacing} from '../theme';

export const activityIndicatorColors = {
  primary: colors.accent,
};

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: spacing.md,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
