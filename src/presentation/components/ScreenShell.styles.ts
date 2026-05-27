import {StyleSheet} from 'react-native';

import {colors, spacing} from '../theme';

export const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
