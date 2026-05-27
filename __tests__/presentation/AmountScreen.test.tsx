import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {TextInput} from 'react-native';
import {act, create} from 'react-test-renderer';

import {PrimaryButton} from '../../src/presentation/components/PrimaryButton/PrimaryButton';
import {AmountScreen} from '../../src/presentation/screens/AmountScreen/AmountScreen';
import type {RootStackParamList} from '../../src/navigation/navigationTypes';

jest.mock('@react-navigation/native', () => {
  const ReactActual = jest.requireActual<typeof import('react')>('react');

  return {
    ...jest.requireActual('@react-navigation/native'),
    useFocusEffect: (effect: () => void | (() => void)) => {
      ReactActual.useEffect(() => effect(), [effect]);
    },
  };
});

type AmountNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Amount'
>['navigation'];

type AmountRoute = NativeStackScreenProps<
  RootStackParamList,
  'Amount'
>['route'];

const createAmountScreenProps = (): Readonly<{
  navigation: AmountNavigation;
  route: AmountRoute;
}> => ({
  navigation: {
    navigate: jest.fn(),
  } as unknown as AmountNavigation,
  route: {
    key: 'Amount',
    name: 'Amount',
  },
});

describe('AmountScreen', () => {
  it('ignores direct submit events while the amount is invalid', () => {
    const props = createAmountScreenProps();

    const renderer = create(<AmountScreen {...props} />);
    const submitButton = renderer.root.findByType(PrimaryButton);

    act(() => {
      submitButton.props.onPress();
    });

    expect(props.navigation.navigate).not.toHaveBeenCalled();
  });

  it('keeps the amount field empty when the parsed input has no value', () => {
    const props = createAmountScreenProps();
    const renderer = create(<AmountScreen {...props} />);
    const amountInput = renderer.root.findByType(TextInput);

    act(() => {
      amountInput.props.onChangeText('0');
    });

    expect(amountInput.props.value).toBe('');
  });
});
