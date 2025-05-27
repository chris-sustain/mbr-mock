import { useState, useEffect, useMemo } from 'react';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import type { SortingState, VisibilityState } from '@tanstack/react-table';
import type { ColumnKey } from '@src/types/table';

export const useReferenceTableData = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const { setSort } = useReferenceTable();
  const { data, isLoading, isFetching } = useReferenceQuery(currentPage);

  const allRows = useMemo(() => data?.results ?? [], [data?.results]);
  const totalPages = useMemo(() => data?.totalPages ?? 1, [data?.totalPages]);

  useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      setSort({ column: id as ColumnKey, direction: desc ? 'desc' : 'asc' });
    } else {
      setSort(null);
    }
  }, [sorting, setSort]);

  return {
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    allRows,
    isLoading,
    isFetching,
    currentPage,
    setCurrentPage,
    totalPages
  };
};
