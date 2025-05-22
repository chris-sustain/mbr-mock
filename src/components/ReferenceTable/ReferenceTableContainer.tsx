import { useEffect, useRef, useCallback, useMemo } from 'react';
import { getCoreRowModel, useReactTable, type Row } from '@tanstack/react-table';
import type { Reference } from '@src/types/reference';
import { ReferenceTable } from './ReferenceTable';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { TableMode } from '@src/types/table';
import { TABLE_MODES } from '@src/utils';
import styles from './ReferenceTable.module.scss';
import classNames from 'classnames';
import { useReferenceTableData, useTableColumns } from './hooks';
import { debounce } from 'lodash';

export const ReferenceTableContainer = ({ mode = TABLE_MODES.all }: { mode: TableMode }) => {
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    selectedIds,
    setSelectedIds,
    allRows,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching
  } = useReferenceTableData();

  const columns = useTableColumns(
    allRows.map((row) => row.id),
    selectedIds,
    setSelectedIds
  );

  const getRowClassName = useCallback(
    (row: Row<Reference>) => {
      const isSelected = selectedIds.includes(row.original.id);
      return classNames(styles.tr, {
        [styles.selected]: isSelected,
        [styles.draft]: isSelected && mode === TABLE_MODES.draft,
        [styles.validating]: isSelected && mode === TABLE_MODES.validating
      });
    },
    [selectedIds, mode]
  );

  const table = useReactTable({
    data: allRows,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    manualSorting: true,
    manualFiltering: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
  });

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50,
    overscan: 50
  });

  const { paddingTop, paddingBottom } = useMemo(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    return {
      paddingTop: virtualItems.length > 0 ? virtualItems[0].start : 0,
      paddingBottom:
        virtualItems.length > 0
          ? rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
          : 0
    };
  }, [rowVirtualizer.getVirtualItems(), rowVirtualizer.getTotalSize()]);

  const debouncedScroll = useCallback(
    debounce(() => {
      rowVirtualizer.measure();
    }, 100),
    [rowVirtualizer]
  );

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    const lastItem = virtualItems[virtualItems.length - 1];

    if (!lastItem) return;

    const shouldFetchMore = lastItem.index >= allRows.length - 1;
    if (shouldFetchMore && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems().length
  ]);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', debouncedScroll);
    return () => container.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll]);

  return (
    <ReferenceTable
      table={table}
      rows={table.getRowModel().rows}
      tableContainerRef={tableContainerRef}
      rowVirtualizer={rowVirtualizer}
      allRows={allRows}
      isFetchingNextPage={isFetchingNextPage}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      isLoading={isLoading}
      isFetching={isFetching}
      getRowClassName={getRowClassName}
    />
  );
};
