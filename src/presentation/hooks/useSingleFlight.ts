import {useCallback, useRef, useState} from 'react';

export const useSingleFlight = () => {
  const isLockedRef = useRef(false);
  const [isLocked, setIsLocked] = useState(false);

  const reset = useCallback(() => {
    isLockedRef.current = false;
    setIsLocked(false);
  }, []);

  const runOnce = useCallback((task: () => void): boolean => {
    if (isLockedRef.current) {
      return false;
    }

    isLockedRef.current = true;
    setIsLocked(true);
    task();

    return true;
  }, []);

  return {isLocked, reset, runOnce};
};
