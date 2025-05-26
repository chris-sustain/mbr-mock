import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReference, FETCH_REFERENCE_INITIAL_URL } from '@src/api/referenceApi';
import { useReferenceTable } from './useReferenceTable';
import { queryKeys } from '@src/react-query/constants';
import type { Reference } from '@src/types/reference';
import { useEffect } from 'react';

//todo add type

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformReferenceData = (_: any, page: number): Reference[] => {
  const rowsPerPage = 200;

  const startId = (page - 1) * rowsPerPage;

  return Array.from({ length: rowsPerPage }, (_, index) => ({
    id: `REF-${startId + index + 1}`, // +1 to start from 1 instead of 0
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
        results: transformReferenceData(response, page),
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
            results: transformReferenceData(response, nextPage),
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
