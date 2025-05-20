import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReference, FETCH_REFERENCE_INITIAL_URL, baseUrl } from '@src/api/referenceApi';

import { useReferenceTable } from './useReferenceTable';
import { queryKeys } from '@src/react-query/constants';
interface UseReferenceQueryOptions {
  limit?: number;
}

export function useReferenceQuery() {
  const { sort, search, filters } = useReferenceTable();

  return useInfiniteQuery({
    queryKey: [queryKeys.reference /*, sort, search, filters*/],
    queryFn: ({ pageParam }) => fetchReference(pageParam),
    initialPageParam: FETCH_REFERENCE_INITIAL_URL,
    getNextPageParam: (lastPage: any) => {
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
    // Add these options to help prevent unnecessary re-renders
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false
  });
}
