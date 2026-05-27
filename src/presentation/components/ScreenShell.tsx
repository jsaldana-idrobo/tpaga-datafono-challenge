import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, spacing} from '../theme';

type ScreenShellProps = {
  children: React.ReactNode;
  centered?: boolean;
};

export function ScreenShell({
  centered = false,
  children,
}: ScreenShellProps): React.JSX.Element {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={[styles.content, centered ? styles.centered : undefined]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
