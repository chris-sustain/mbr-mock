import { useState, useEffect, useMemo } from 'react';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import type { SortingState, VisibilityState } from '@tanstack/react-table';
import type { ColumnKey } from '@src/types/table';

export const useReferenceTableData = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { setSort } = useReferenceTable();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useReferenceQuery();

  const allRows = useMemo(() => (data ? data.pages.flatMap((d) => d.results) : []), [data]);
  const allIds = allRows.map((row) => row.id);

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
    selectedIds,
    setSelectedIds,
    allRows,
    allIds,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching
  };
};
