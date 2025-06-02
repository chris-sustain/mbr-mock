import {
  createColumnHelper,
  getCoreRowModel,
  type Row,
  type Table,
  useReactTable
} from '@tanstack/react-table';
import classNames from 'classnames';
import { type Dispatch, type SetStateAction, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';

import { UnstyledLink } from '@src/components/UnstyledLink';
import { PATHS } from '@src/router';
import type { Reference } from '@src/types/reference';
import type { ColumnKey, TableMode } from '@src/types/table';
import { COLUMN_CONFIGS, TABLE_MODES } from '@src/utils';

import { HeaderCheckbox, RowCheckbox } from './components';
import { renderCellContent } from './helper';
import { useReferenceTableData } from './hooks';
import { ReferenceTable } from './ReferenceTable';

import styles from './ReferenceTable.module.scss';

export interface ReferenceTableContainerProps {
  mode: TableMode;
  rowSelection: Record<string, boolean>;
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export const ReferenceTableContainer = ({
  mode = TABLE_MODES.all,
  rowSelection,
  setRowSelection
}: ReferenceTableContainerProps) => {
  const {
    sorting,
    setSorting,
    allRows,
    isLoading,
    isFetching,
    currentPage,
    setCurrentPage,
    totalPages,
    totalRows
  } = useReferenceTableData();

  const { t } = useTranslation();
  const columnHelper = createColumnHelper<Reference>();

  const getHeaderLabel = (columnId: ColumnKey) => {
    const className = classNames(styles[columnId], styles['header']);
    return <span className={className}>{t('common.table.' + columnId)}</span>;
  };

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }: { table: Table<Reference> }) => {
          return (
            <HeaderCheckbox
              isSelected={table.getIsAllPageRowsSelected()}
              isIndeterminate={table.getIsSomePageRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              mode={mode}
            />
          );
        },
        cell: ({ row }: { row: Row<Reference> }) => {
          return (
            <RowCheckbox
              isSelected={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              mode={mode}
            />
          );
        },
        enableSorting: false
      },
      ...Object.entries(COLUMN_CONFIGS).map(([key, config]) =>
        columnHelper.accessor(key as ColumnKey, {
          header: () => getHeaderLabel(key as ColumnKey),
          cell: (info) => {
            return (
              <UnstyledLink
                to={generatePath(PATHS.REFERENCE, { id: info.row.original.id })}
                className={`${styles[key]}`}>
                {renderCellContent(config, info.getValue())}
              </UnstyledLink>
            );
          },
          enableSorting: config.enableSorting
        })
      )
    ],
    []
  );

  const getRowClassName = useCallback(
    (row: Row<Reference>) => {
      const isSelected = Object.keys(rowSelection).includes(String(row.id));
      return classNames(styles.tr, {
        [styles.selected]: isSelected,
        [styles.draft]: isSelected && mode === TABLE_MODES.draft,
        [styles.validating]: isSelected && mode === TABLE_MODES.validating
      });
    },
    [rowSelection, mode, currentPage]
  );

  const table = useReactTable({
    data: allRows,
    columns,
    state: {
      sorting,
      rowSelection: rowSelection
    },
    manualSorting: true,
    manualFiltering: true,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
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
      countSelectedRows={Object.keys(rowSelection).length}
      countTotalRows={totalRows}
    />
  );
};
