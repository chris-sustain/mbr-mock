import { useCallback } from 'react';
import { getCoreRowModel, useReactTable, type Row } from '@tanstack/react-table';
import type { Reference } from '@src/types/reference';
import { ReferenceTable } from './ReferenceTable';
import type { TableMode } from '@src/types/table';
import { TABLE_MODES } from '@src/utils';
import styles from './ReferenceTable.module.scss';
import classNames from 'classnames';
import { useReferenceTableData, useTableColumns } from './hooks';

export const ReferenceTableContainer = ({ mode = TABLE_MODES.all }: { mode: TableMode }) => {
  const {
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
  } = useReferenceTableData();

  const columns = useTableColumns(
    allRows.map((row: Reference) => row.id),
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

  return (
    <ReferenceTable
      table={table}
      rows={table.getRowModel().rows}
      allRows={allRows}
      isLoading={isLoading}
      isFetching={isFetching}
      getRowClassName={getRowClassName}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};
