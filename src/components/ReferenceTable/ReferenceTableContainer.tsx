import { useCallback, useState, useMemo } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  type Row,
  type Table
} from '@tanstack/react-table';
import type { Reference } from '@src/types/reference';
import { ReferenceTable } from './ReferenceTable';
import type { TableMode, ColumnKey } from '@src/types/table';
import { TABLE_MODES, COLUMN_CONFIGS } from '@src/utils';
import { useReferenceTableData } from './hooks';
import { useTranslation } from 'react-i18next';
import { HeaderCheckbox, RowCheckbox } from './components';
import { UnstyledLink } from '@src/components/UnstyledLink';
import { generatePath } from 'react-router';
import { PATHS } from '@src/router';
import { renderCellContent } from './helper';
import styles from './ReferenceTable.module.scss';
import classNames from 'classnames';

export const ReferenceTableContainer = ({ mode = TABLE_MODES.all }: { mode: TableMode }) => {
  const {
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
  } = useReferenceTableData();
  const [rowSelection, setRowSelection] = useState({});

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
            />
          );
        },
        cell: ({ row }: { row: Row<Reference> }) => {
          return (
            <RowCheckbox
              isSelected={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
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
      const isSelected = Object.keys(rowSelection).includes(String(row.index));
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
      columnVisibility,
      rowSelection: rowSelection
    },
    manualSorting: true,
    manualFiltering: true,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
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
