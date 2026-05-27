import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {useSingleFlight} from '../../src/presentation/hooks/useSingleFlight';

const RUN_SUCCESSFUL_TASK_TEST_ID = 'run-successful-task';

type SingleFlightHarnessProps = Readonly<{
  onError: () => void;
  onSuccess: () => void;
}>;

function SingleFlightHarness({
  onError,
  onSuccess,
}: SingleFlightHarnessProps): React.JSX.Element {
  const singleFlight = useSingleFlight();

  const runFailingTask = () => {
    try {
      singleFlight.runOnce(() => {
        throw new Error('boom');
      });
    } catch {
      onError();
    }
  };

  return (
    <View>
      <Text testID="lock-state">
        {singleFlight.isLocked ? 'locked' : 'open'}
      </Text>
      <Pressable onPress={runFailingTask} testID="run-failing-task">
        <Text>Run failing task</Text>
      </Pressable>
      <Pressable
        onPress={() => singleFlight.runOnce(onSuccess)}
        testID={RUN_SUCCESSFUL_TASK_TEST_ID}>
        <Text>Run successful task</Text>
      </Pressable>
    </View>
  );
}

describe('useSingleFlight', () => {
  it('unlocks when a guarded task throws', () => {
    const onError = jest.fn();
    const onSuccess = jest.fn();
    const screen = render(
      <SingleFlightHarness onError={onError} onSuccess={onSuccess} />,
    );

    fireEvent.press(screen.getByTestId('run-failing-task'));
    fireEvent.press(screen.getByTestId(RUN_SUCCESSFUL_TASK_TEST_ID));

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('lock-state')).toHaveTextContent('locked');
  });

  it('ignores subsequent tasks while locked', () => {
    const onError = jest.fn();
    const onSuccess = jest.fn();
    const screen = render(
      <SingleFlightHarness onError={onError} onSuccess={onSuccess} />,
    );

    fireEvent.press(screen.getByTestId(RUN_SUCCESSFUL_TASK_TEST_ID));
    fireEvent.press(screen.getByTestId(RUN_SUCCESSFUL_TASK_TEST_ID));

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('lock-state')).toHaveTextContent('locked');
  });
});
