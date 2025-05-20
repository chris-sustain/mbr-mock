import React, { useEffect, useMemo, useState } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { SortingState, VisibilityState, Row } from '@tanstack/react-table';
import type { Reference } from '@src/types/reference';
import { ReferenceTable } from './ReferenceTable';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ColumnKey, TableMode } from '@src/types/table';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import { HeaderCheckbox, RowCheckbox, CellDateRenderer, CellAmountRenderer } from './components';
import { COLUMNS_IDS, TABLE_MODES } from '@src/utils';
import { useTranslation } from 'react-i18next';
import styles from './ReferenceTable.module.scss';
import classNames from 'classnames';
import {} from '@src/types/table';

export const ReferenceTableContainer = ({ mode = TABLE_MODES.all }: { mode: TableMode }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
  const { setSort } = useReferenceTable();
  const columnHelper = createColumnHelper<Reference>();
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
  const allRows = useMemo(
    () =>
      data
        ? data.pages.flatMap((d) => {
            // Transform the data to match the expected structure
            return d.results.map((item: any, index: number) => ({
              id: '00001-00' + index,
              commercialTitle:
                'Assistance technique pour la réalisation des ateliers-dépôts des lignes A & B du métro',
              egisOwnerFiliale: 'Egis Rail',
              domain: '--',
              country: 'France',
              startDate: '2019-08-30T08:22:32.245-0700',
              endDate: '2019-08-30T08:22:32.245-0700',
              totalContractAmount: '1000000',
              egisPart: '500000',
              filialePart: '500000',
              satisfecit: '--'
            }));
          })
        : [],
    [data]
  );
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const allIds = allRows.map((row) => row.id);

  const getHeaderLabel = (columnId: ColumnKey) => {
    const className = classNames(styles[columnId], styles['header']);
    return <span className={className}>{t('common.table.' + columnId)}</span>;
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
      columnHelper.accessor(COLUMNS_IDS.id, {
        header: () => getHeaderLabel(COLUMNS_IDS.id),
        cell: (info) => <span className={`${styles[COLUMNS_IDS.id]}`}>{info.getValue()}</span>,
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.commercialTitle, {
        header: () => getHeaderLabel(COLUMNS_IDS.commercialTitle),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.commercialTitle]}`}>{info.getValue()}</span>
        ),
        enableSorting: false
      }),
      columnHelper.accessor(COLUMNS_IDS.egisOwnerFiliale, {
        header: () => getHeaderLabel(COLUMNS_IDS.egisOwnerFiliale),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.egisOwnerFiliale]}`}>{info.getValue()}</span>
        ),
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.domain, {
        header: () => getHeaderLabel(COLUMNS_IDS.domain),
        cell: (info) => <span className={`${styles[COLUMNS_IDS.domain]}`}>{info.getValue()}</span>,
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.country, {
        header: () => getHeaderLabel(COLUMNS_IDS.country),
        cell: (info) => <span className={`${styles[COLUMNS_IDS.country]}`}>{info.getValue()}</span>,
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.startDate, {
        header: () => getHeaderLabel(COLUMNS_IDS.startDate),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.startDate]}`}>
            <CellDateRenderer value={info.getValue()} />
          </span>
        ),
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.endDate, {
        header: () => getHeaderLabel(COLUMNS_IDS.endDate),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.endDate]}`}>
            <CellDateRenderer value={info.getValue()} />
          </span>
        ),
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.totalContractAmount, {
        header: () => getHeaderLabel(COLUMNS_IDS.totalContractAmount),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.totalContractAmount]}`}>
            <CellAmountRenderer value={info.getValue()} />
          </span>
        ),
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.egisPart, {
        header: () => getHeaderLabel(COLUMNS_IDS.egisPart),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.egisPart]}`}>
            <CellAmountRenderer value={info.getValue()} />
          </span>
        ),
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.filialePart, {
        header: () => getHeaderLabel(COLUMNS_IDS.filialePart),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.filialePart]}`}>
            <CellAmountRenderer value={info.getValue()} />
          </span>
        ),
        enableSorting: true
      }),
      columnHelper.accessor(COLUMNS_IDS.satisfecit, {
        header: () => getHeaderLabel(COLUMNS_IDS.satisfecit),
        cell: (info) => (
          <span className={`${styles[COLUMNS_IDS.satisfecit]}`}>{info.getValue()}</span>
        ),
        enableSorting: true
      })
    ],
    [columnHelper]
  );

  const getRowClassName = (row: Row<Reference>) => {
    const isSelected = selectedIds.includes(row.original.id);

    console.log('row', row);
    console.log('mode', mode);
    console.log('isSelected', isSelected);
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
    // getRowClassName
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
      console.log('lastItem', lastItem);
      console.log('allRows.length', allRows.length);
      console.log('hasNextPage', hasNextPage);
      console.log('isFetchingNextPage', isFetchingNextPage);
      console.log('fetching next page');
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
    />
  );
};

export default ReferenceTable;
