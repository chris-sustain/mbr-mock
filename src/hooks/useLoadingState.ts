import { useState, useRef, useEffect } from 'react';

interface UseLoadingStateOptions {
  minLoadingTime?: number; // in milliseconds
}

const DEFAULT_MIN_LOADING_TIME = 1000;

export const useLoadingState = (isLoading: boolean, options: UseLoadingStateOptions = {}) => {
  const { minLoadingTime = DEFAULT_MIN_LOADING_TIME } = options;
  const [showLoading, setShowLoading] = useState(false);
  const loadingStartTime = useRef<number>(0);

  useEffect(() => {
    if (isLoading) {
      loadingStartTime.current = Date.now();
      setShowLoading(true);
    } else if (showLoading) {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setShowLoading(false);
        }, remainingTime);
        return () => clearTimeout(timer);
      } else {
        setShowLoading(false);
      }
    }
  }, [isLoading, showLoading, minLoadingTime]);

  return showLoading;
};
