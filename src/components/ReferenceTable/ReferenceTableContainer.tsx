import React, { useEffect, useMemo, useState } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { SortingState, VisibilityState, Row } from '@tanstack/react-table';
import type { EnhancedReference } from '@src/types/reference';
import { ReferenceTable } from './ReferenceTable';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from './ReferenceTable.module.scss';
import type { ColumnKey } from '@src/types/table';
import { useReferenceQuery, useReferenceTable } from '@src/hooks';
import classNames from 'classnames';
import { HeaderCheckbox, RowCheckbox } from './components';
export const ReferenceTableContainer: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
  // const [showSelector, setShowSelector] = useState(false);
  const { setSort } = useReferenceTable();
  const columnHelper = createColumnHelper<EnhancedReference>();

  // Add this effect to sync sorting state with server
  useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      setSort({ column: id as ColumnKey, direction: desc ? 'desc' : 'asc' });
    } else {
      setSort(null);
    }
  }, [sorting, setSort]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useReferenceQuery({ limit: 25 });
  const allRows = useMemo(() => (data ? data.pages.flatMap((d) => d.data) : []), [data]);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const allIds = allRows.map((row) => row.id);

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
        cell: ({ row }: { row: Row<EnhancedReference> }) => (
          <RowCheckbox
            id={row.original.id}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ),
        enableSorting: false
      },
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
        enableGlobalFilter: true,
        enableSorting: true
      }),
      columnHelper.accessor('sprite', {
        header: 'Image',
        cell: (info) => (
          <div className={styles.spriteCell}>
            <img src={info.getValue()} alt="Reference sprite" className={styles.sprite} />
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('types', {
        header: 'Types',
        cell: (info) => (
          <div className={styles.typesList}>
            {info.getValue().map((type) => (
              <span key={type} className={classNames(styles.typeTag, styles[`type${type}`])}>
                {type}
              </span>
            ))}
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('abilities', {
        header: 'Abilities',
        cell: (info) => info.getValue().join(', '),
        enableSorting: false
      }),
      columnHelper.accessor('height', {
        header: 'Height (m)',
        cell: (info) => info.getValue().toFixed(1),
        enableSorting: true
      }),
      columnHelper.accessor('weight', {
        header: 'Weight (kg)',
        cell: (info) => info.getValue().toFixed(1),
        enableSorting: true
      }),
      columnHelper.accessor('experience', {
        header: 'Base Exp',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('hp', {
        header: 'HP',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('attack', {
        header: 'Attack',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('defense', {
        header: 'Defense',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('specialAttack', {
        header: 'Sp. Atk',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('specialDefense', {
        header: 'Sp. Def',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('speed', {
        header: 'Speed',
        cell: (info) => info.getValue(),
        enableSorting: true
      })
    ],
    [columnHelper]
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

    if (lastItem.index >= allRows.length - 10 && hasNextPage && !isFetchingNextPage) {
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
    />
  );
};

export default ReferenceTable;
