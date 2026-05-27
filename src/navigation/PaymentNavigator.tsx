import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {enableScreens} from 'react-native-screens';

import {AmountScreen} from '../presentation/screens/AmountScreen';
import {ProcessingScreen} from '../presentation/screens/ProcessingScreen';
import {ResultScreen} from '../presentation/screens/ResultScreen';
import {navigationColors, navigationStyles} from './PaymentNavigator.styles';
import type {RootStackParamList} from './navigationTypes';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

export function PaymentNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Amount"
        screenOptions={{
          animation: 'slide_from_right',
          contentStyle: navigationStyles.content,
          headerShadowVisible: false,
          headerStyle: navigationStyles.header,
          headerTitleAlign: 'left',
          headerTintColor: navigationColors.headerTint,
        }}>
        <Stack.Screen
          component={AmountScreen}
          name="Amount"
          options={{title: 'Nuevo cobro'}}
        />
        <Stack.Screen
          component={ProcessingScreen}
          name="Processing"
          options={{gestureEnabled: false, headerBackVisible: false, title: ''}}
        />
        <Stack.Screen
          component={ResultScreen}
          name="Result"
          options={{gestureEnabled: false, headerBackVisible: false, title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
