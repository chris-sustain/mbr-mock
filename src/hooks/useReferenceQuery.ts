import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReference, FETCH_REFERENCE_INITIAL_URL } from '@src/api/referenceApi';
import { useReferenceTable } from './useReferenceTable';
import { queryKeys } from '@src/react-query/constants';
import type { Reference } from '@src/types/reference';
import { useEffect } from 'react';

//todo add type

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const transformReferenceData = (_: any): Reference[] => {
  // Generate an array of 100 items
  return Array.from({ length: 100 }, () => ({
    id: `REF-${Math.random().toString(36).substring(2, 15)}`,
    commercialTitle:
      'Assistance technique pour la réalisation des ateliers-dépôts des lignes A & B du métro',
    egisOwnerFiliale: 'Egis Rail',
    domain: '--',
    country: 'France',
    startDate: '2019-08-30T08:22:32.245-0700',
    endDate: '2019-08-30T08:22:32.245-0700',
    totalContractAmount: '1000000',
    egisPart: '500000',
    filialePart: '500000',
    satisfecit: '--'
  }));
};

export function useReferenceQuery(page = 1) {
  const { sort, search, filters } = useReferenceTable();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [queryKeys.reference, sort, search, filters, page],
    queryFn: async () => {
      // const response = await fetchReference(`${baseUrl}?page=${page}`);
      const url =
        page > 1 ? `${FETCH_REFERENCE_INITIAL_URL}?page=${page}` : FETCH_REFERENCE_INITIAL_URL;
      const response = await fetchReference(url);
      return {
        ...response,
        results: transformReferenceData(response),
        currentPage: page,
        totalPages: Math.ceil(1000 / 100),
        totalItems: response.count
      };
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false
  });

  // Add prefetching logic
  useEffect(() => {
    if (query.data && page < query.data.totalPages) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: [queryKeys.reference, sort, search, filters, nextPage],
        queryFn: async () => {
          const url = `${FETCH_REFERENCE_INITIAL_URL}?page=${nextPage}`;
          const response = await fetchReference(url);
          return {
            ...response,
            results: transformReferenceData(response),
            currentPage: nextPage,
            totalPages: Math.ceil(1000 / 100),
            totalItems: response.count
          };
        }
      });
    }
  }, [page, query.data, queryClient, sort, search, filters]);

  return query;
}
