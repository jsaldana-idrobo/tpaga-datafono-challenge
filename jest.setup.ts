import '@testing-library/react-native/extend-expect';
import React, {type ReactNode} from 'react';
import {
  NativeModules,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

NativeModules.PaymentReaderModule = {
  readPayment: jest.fn(),
};

const mockSafeAreaProvider = ({children}: {children: ReactNode}) => children;

const mockNativeView = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => React.createElement(View, {style}, children);

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
  executeNativeBackPress: jest.fn(),
  freezeEnabled: jest.fn(() => false),
  isNewBackTitleImplementation: false,
  isSearchBarAvailableForCurrentPlatform: false,
  Screen: mockNativeView,
  ScreenContainer: mockNativeView,
  ScreenStack: mockNativeView,
  ScreenStackHeaderBackButtonImage: mockNativeView,
  ScreenStackHeaderCenterView: mockNativeView,
  ScreenStackHeaderConfig: mockNativeView,
  ScreenStackHeaderLeftView: mockNativeView,
  ScreenStackHeaderRightView: mockNativeView,
  ScreenStackHeaderSearchBarView: mockNativeView,
  ScreenStackHeaderSubview: mockNativeView,
  screensEnabled: jest.fn(() => true),
  SearchBar: mockNativeView,
  shouldUseActivityState: true,
  useTransitionProgress: jest.fn(() => ({
    closing: {interpolate: jest.fn()},
    goingForward: {interpolate: jest.fn()},
    progress: {interpolate: jest.fn()},
  })),
}));

jest.mock('react-native-safe-area-context', () => {
  const ReactActual = jest.requireActual<typeof import('react')>('react');
  const inset = {bottom: 0, left: 0, right: 0, top: 0};
  const frame = {height: 800, width: 400, x: 0, y: 0};
  return {
    SafeAreaFrameContext: ReactActual.createContext(frame),
    SafeAreaInsetsContext: ReactActual.createContext(inset),
    SafeAreaProvider: mockSafeAreaProvider,
    SafeAreaView: mockSafeAreaProvider,
    initialWindowMetrics: {
      frame,
      insets: inset,
    },
    useSafeAreaFrame: () => frame,
    useSafeAreaInsets: () => inset,
  };
});
