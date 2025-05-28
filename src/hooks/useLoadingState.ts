import { useState, useRef, useEffect, useCallback } from 'react';

interface UseLoadingStateOptions {
  minLoadingTime?: number; // in milliseconds
}

// Default minimum time to show loading state to prevent flickering
const DEFAULT_MIN_LOADING_TIME = 1000;

/**
 * Hook to manage loading state with a minimum display duration to prevent flickering
 * @param isLoading - Current loading state
 * @param options - Configuration options including minimum loading time
 * @returns boolean indicating whether to show loading state
 */
export const useLoadingState = (isLoading: boolean, options: UseLoadingStateOptions = {}) => {
  const { minLoadingTime = DEFAULT_MIN_LOADING_TIME } = options;
  // Tracks whether to display loading state to the user
  const [showLoading, setShowLoading] = useState(false);
  // Stores the timestamp when loading started
  const loadingStartTime = useRef<number>(0);
  // Stores the current timer for cleanup
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Memoized cleanup function to prevent timer leaks
  const clearExistingTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    // Clean up any existing timer before setting new state
    clearExistingTimer();

    if (isLoading) {
      // Start of loading: record start time and show loading state
      loadingStartTime.current = performance.now();
      setShowLoading(true);
    } else if (loadingStartTime.current > 0) {
      // Calculate how long we've been in loading state
      const elapsedTime = performance.now() - loadingStartTime.current;
      // Determine if we need to keep showing loading state to meet minimum time
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      if (remainingTime === 0) {
        // If minimum time met, hide loading immediately
        setShowLoading(false);
      } else {
        // Set timer to hide loading after remaining time
        timerRef.current = setTimeout(() => {
          setShowLoading(false);
          loadingStartTime.current = 0; // Reset start time
        }, remainingTime);
      }
    }

    // Cleanup on unmount or when dependencies change
    return clearExistingTimer;
  }, [isLoading, minLoadingTime, clearExistingTimer]);

  return showLoading;
};
