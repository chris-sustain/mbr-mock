import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchReference, FETCH_REFERENCE_INITIAL_URL, baseUrl } from '@src/api/referenceApi';
import { useReferenceTable } from './useReferenceTable';
import { queryKeys } from '@src/react-query/constants';
import type { Reference } from '@src/types/reference';

//todo add type
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformReferenceData = (_: any): Reference[] => {
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

export function useReferenceQuery() {
  const { sort, search, filters } = useReferenceTable();

  return useInfiniteQuery({
    queryKey: [queryKeys.reference, sort, search, filters],
    queryFn: async ({ pageParam }) => {
      const response = await fetchReference(pageParam);
      return {
        ...response,
        results: transformReferenceData(response)
      };
    },
    initialPageParam: FETCH_REFERENCE_INITIAL_URL,
    //wait for back disable eslint @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any) => {
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
    // Add these options to help prevent unnecessary re-renders
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    placeholderData: keepPreviousData
  });
}
