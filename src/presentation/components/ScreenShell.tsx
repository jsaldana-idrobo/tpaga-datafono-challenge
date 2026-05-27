import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from './ScreenShell.styles';

type ScreenShellProps = Readonly<{
  children: React.ReactNode;
  centered?: boolean;
}>;

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
