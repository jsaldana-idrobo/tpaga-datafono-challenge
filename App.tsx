import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PaymentNavigator} from './src/navigation/PaymentNavigator';
import {colors} from './src/presentation/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <PaymentNavigator />
    </SafeAreaProvider>
  );
}

export default App;
