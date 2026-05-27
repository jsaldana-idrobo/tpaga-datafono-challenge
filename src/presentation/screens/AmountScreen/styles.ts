import {StyleSheet} from 'react-native';

import {colors, radii, spacing} from '../../theme';

export const textInputColors = {
  placeholder: colors.muted,
};

export const styles = StyleSheet.create({
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
