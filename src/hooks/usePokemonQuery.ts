import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonBatch } from '@src/api/pokemonApi';

interface UsePokemonQueryOptions {
  limit?: number;
}

export function usePokemonQuery({ limit = 20 }: UsePokemonQueryOptions = {}) {
  return useInfiniteQuery({
    queryKey: ['pokemon', limit],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchPokemonBatch(pageParam, limit);
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
