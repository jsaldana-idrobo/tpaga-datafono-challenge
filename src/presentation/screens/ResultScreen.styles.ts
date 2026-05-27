import {StyleSheet} from 'react-native';

import {colors, radii, spacing} from '../theme';

export const styles = StyleSheet.create({
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
