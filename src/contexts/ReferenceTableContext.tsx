import { createContext, useMemo, useState, type ReactNode } from 'react';

import type { ReferenceFilters, ReferenceSort, ReferenceSearch } from '@src/types/table';

interface ReferenceTableContextType {
  filters: ReferenceFilters;
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
  const [sort, setSort] = useState<ReferenceSort | null>(null);
  const [search, setSearch] = useState<ReferenceSearch>({
    query: '',
    active: false
  });

  const setFilter = (key: keyof ReferenceFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key: keyof ReferenceFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
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
