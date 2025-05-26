import { useState, useEffect, useMemo } from 'react';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import type { SortingState, VisibilityState } from '@tanstack/react-table';
import type { ColumnKey } from '@src/types/table';

export const useReferenceTableData = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedIdsByPage, setSelectedIdsByPage] = useState<Map<number, string[]>>(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const { setSort } = useReferenceTable();
  const { data, isLoading, isFetching } = useReferenceQuery(currentPage);

  const allRows = useMemo(() => data?.results ?? [], [data?.results]);
  const totalPages = useMemo(() => data?.totalPages ?? 1, [data?.totalPages]);

  const selectedIds = useMemo<string[]>(
    () => selectedIdsByPage.get(currentPage) ?? [],
    [selectedIdsByPage, currentPage]
  );

  const setSelectedIds = (value: string[] | ((prev: string[]) => string[])) => {
    setSelectedIdsByPage((prevMap) => {
      const newMap = new Map(prevMap);
      const currentIds = newMap.get(currentPage) ?? [];
      const newIds = typeof value === 'function' ? value(currentIds) : value;
      newMap.set(currentPage, newIds);
      return newMap;
    });
  };

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
    isLoading,
    isFetching,
    currentPage,
    setCurrentPage,
    totalPages
  };
};
