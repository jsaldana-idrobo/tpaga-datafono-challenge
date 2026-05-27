import React from 'react';
import {Pressable} from 'react-native';
import {create} from 'react-test-renderer';

import {PrimaryButton} from '../../src/presentation/components/PrimaryButton/PrimaryButton';

type PressableStyleState = Readonly<{
  pressed: boolean;
}>;

describe('PrimaryButton', () => {
  it('resolves visual states for pressed, idle and disabled buttons', () => {
    const enabledRenderer = create(
      <PrimaryButton label="Cobrar" onPress={jest.fn()} />,
    );
    const enabledPressable = enabledRenderer.root.findByType(Pressable);

    expect(
      enabledPressable.props.style({
        pressed: true,
      } satisfies PressableStyleState),
    ).toEqual(expect.arrayContaining([expect.any(Object)]));
    expect(
      enabledPressable.props.style({
        pressed: false,
      } satisfies PressableStyleState),
    ).toEqual(expect.arrayContaining([undefined]));

    const disabledRenderer = create(
      <PrimaryButton disabled label="Cobrar" onPress={jest.fn()} />,
    );
    const disabledPressable = disabledRenderer.root.findByType(Pressable);

    expect(
      disabledPressable.props.style({
        pressed: true,
      } satisfies PressableStyleState),
    ).toEqual(expect.arrayContaining([undefined, expect.any(Object)]));
  });
});
