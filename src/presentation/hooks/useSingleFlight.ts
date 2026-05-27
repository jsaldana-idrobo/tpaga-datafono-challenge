import {useCallback, useMemo, useRef, useState} from 'react';

export const useSingleFlight = () => {
  const isLockedRef = useRef(false);
  const [isLocked, setIsLocked] = useState(false);

  const reset = useCallback(() => {
    isLockedRef.current = false;
    setIsLocked(false);
  }, []);

  const runOnce = useCallback(
    (task: () => void): boolean => {
      if (isLockedRef.current) {
        return false;
      }

      isLockedRef.current = true;
      setIsLocked(true);

      try {
        task();
      } catch (error) {
        reset();
        throw error;
      }

      return true;
    },
    [reset],
  );

  return useMemo(
    () => ({isLocked, reset, runOnce}),
    [isLocked, reset, runOnce],
  );
};
