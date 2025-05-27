import { useState, useEffect, useMemo, useRef } from 'react';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import type { SortingState } from '@tanstack/react-table';
import type { ColumnKey } from '@src/types/table';

export const useReferenceTableData = () => {
  let totalPages = useRef<number>(0);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [currentPage, setCurrentPage] = useState(1);
  const { setSort } = useReferenceTable();
  const { data, isLoading, isFetching } = useReferenceQuery(currentPage);

  const allRows = useMemo(() => data?.results ?? [], [data?.results]);
  if (totalPages?.current === 0 && data?.totalPages) {
    totalPages.current = data.totalPages;
  }

  const totalRows = useMemo(() => data?.totalRows ?? 20000, [data?.totalRows]);

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
    allRows,
    isLoading,
    isFetching,
    currentPage,
    setCurrentPage,
    totalPages: totalPages.current,
    totalRows
  };
};
