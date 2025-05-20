import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReferenceBatch } from '@src/api/referenceApi';

import { useReferenceTable } from './useReferenceTable';
interface UseReferenceQueryOptions {
  limit?: number;
}

export function useReferenceQuery({ limit = 20 }: UseReferenceQueryOptions = {}) {
  //customize url with filters
  //const { filters } = useReferenceFilters();
  const { sort, search, filters } = useReferenceTable();

  return useInfiniteQuery({
    queryKey: ['reference', limit],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchReferenceBatch(pageParam, limit);
      return {
        data,
        nextOffset: pageParam + limit,
        hasMore: data.length === limit
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
    // Add these options to help prevent unnecessary re-renders
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false
  });
}
