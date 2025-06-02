import { createContext, type ReactNode, useMemo, useState } from 'react';

import type { ReferenceFilters, ReferenceSearch, ReferenceSort } from '@src/types/table';

interface ReferenceTableContextType {
  filters: ReferenceFilters;
  // to do add type for value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilter: (key: keyof ReferenceFilters, value: any) => void;
  sort: ReferenceSort | null;
  setSort: (sort: ReferenceSort | null) => void;
  search: ReferenceSearch;
  setSearch: (search: ReferenceSearch) => void;
  clearFilter: (key: keyof ReferenceFilters) => void;
  clearAllFilters: () => void;
}

export const ReferenceTableContext = createContext<ReferenceTableContextType | undefined>(
  undefined
);

export function ReferenceFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ReferenceFilters>({});
  const [sort, setSort] = useState<ReferenceSort | null>({ column: 'id', direction: 'desc' });
  const [search, setSearch] = useState<ReferenceSearch>({
    query: '',
    active: false
  });

  // to do add type for value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setFilter = (key: keyof ReferenceFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key: keyof ReferenceFilters) => {
    setFilters((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...newFilters } = prev;
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const memoizedContextValue = useMemo(
    () => ({
      filters,
      setFilter,
      sort,
      setSort,
      search,
      setSearch,
      clearFilter,
      clearAllFilters
    }),
    [filters, setFilter, sort, setSort, search, setSearch, clearFilter, clearAllFilters]
  );

  return (
    <ReferenceTableContext.Provider value={memoizedContextValue}>
      {children}
    </ReferenceTableContext.Provider>
  );
}
