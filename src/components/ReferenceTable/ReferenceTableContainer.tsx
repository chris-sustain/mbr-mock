import React, { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
  type Row
} from '@tanstack/react-table';
import type { Reference } from '@src/types/reference';
import { ReferenceTable } from './ReferenceTable';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ColumnKey, TableMode, ColumnConfig } from '@src/types/table';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import { HeaderCheckbox, RowCheckbox, CellDateRenderer, CellAmountRenderer } from './components';
import { COLUMNS_IDS, TABLE_MODES, COLUMN_CONFIGS } from '@src/utils';
import { useTranslation } from 'react-i18next';
import styles from './ReferenceTable.module.scss';
import classNames from 'classnames';
import { useNavigate, generatePath } from 'react-router';
import { UnstyledLink } from '@src/components/UnstyledLink';
import { PATHS } from '@src/router';

export const ReferenceTableContainer = ({ mode = TABLE_MODES.all }: { mode: TableMode }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
  const { setSort } = useReferenceTable();
  const columnHelper = createColumnHelper<Reference>();
  const navigate = useNavigate();
  const handleRowClick = (row: Row<Reference>) => {
    // Example: navigate to `/reference/${row.original.id}`
    navigate(`/reference/${row.original.id}`);
  };

  const { t } = useTranslation();
  useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      setSort({ column: id as ColumnKey, direction: desc ? 'desc' : 'asc' });
    } else {
      setSort(null);
    }
  }, [sorting, setSort]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useReferenceQuery();
  const allRows = useMemo(() => (data ? data.pages.flatMap((d) => d.results) : []), [data]);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const allIds = allRows.map((row) => row.id);

  const getHeaderLabel = (columnId: ColumnKey) => {
    const className = classNames(styles[columnId], styles['header']);
    return <span className={className}>{t('common.table.' + columnId)}</span>;
  };

  const renderCellContent = (config: ColumnConfig, value: any) => {
    switch (config.renderer) {
      case 'date':
        return <CellDateRenderer value={value} />;
      case 'amount':
        return <CellAmountRenderer value={value} />;
      case 'text':
        return value;
      default:
        return value;
    }
  };

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: () => (
          <HeaderCheckbox
            allIds={allIds}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ),
        cell: ({ row }: { row: Row<Reference> }) => (
          <RowCheckbox
            id={row.original.id}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ),
        enableSorting: false
      },
      ...Object.entries(COLUMN_CONFIGS).map(([key, config]) =>
        columnHelper.accessor(key as ColumnKey, {
          header: () => getHeaderLabel(key as ColumnKey),
          cell: (info) => (
            <UnstyledLink
              to={generatePath(PATHS.REFERENCE, { id: info.row.original.id })}
              className={`${styles[key]}`}>
              {renderCellContent(config, info.getValue())}
            </UnstyledLink>
          ),
          enableSorting: config.enableSorting
        })
      )
    ],
    [columnHelper]
  );

  const getRowClassName = (row: Row<Reference>) => {
    const isSelected = selectedIds.includes(row.original.id);

    return classNames(styles.tr, {
      [styles.selected]: isSelected,
      [styles.draft]: isSelected && mode === TABLE_MODES.draft,
      [styles.validating]: isSelected && mode === TABLE_MODES.validating
    });
  };

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

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 100,
    overscan: 5,
    measureElement: (el) => el.getBoundingClientRect().height
  });

  const paddingTop =
    rowVirtualizer.getVirtualItems().length > 0 ? rowVirtualizer.getVirtualItems()[0].start : 0;

  const paddingBottom =
    rowVirtualizer.getVirtualItems().length > 0
      ? rowVirtualizer.getTotalSize() -
        rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1].end
      : 0;

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems()
  ]);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [columnVisibility, rowVirtualizer]);

  return (
    <ReferenceTable
      table={table}
      rows={rows}
      tableContainerRef={tableContainerRef}
      rowVirtualizer={rowVirtualizer}
      allRows={allRows}
      isFetchingNextPage={isFetchingNextPage}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      isLoading={isLoading}
      isFetching={isFetching}
      getRowClassName={getRowClassName}
      handleRowClick={handleRowClick}
    />
  );
};
