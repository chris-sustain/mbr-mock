import React, { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import type { SortingState, VisibilityState, FilterFn, Row } from '@tanstack/react-table';
import type { EnhancedPokemon } from '@src/types/pokemon';

import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowDown, ArrowUp } from 'lucide-react';
import clsx from 'clsx';
import styles from './PokemonTable.module.scss';
import { TextFilter, NumberRangeFilter, SelectFilter } from '../ColumnFilter/ColumnFilter';
import { ColumnSelector } from '../ColumnSelector/ColumnSelector';
import { usePokemonQuery } from '@src/hooks/usePokemonQuery';

// Filter functions
const numberRangeFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true;

  const { min, max } = filterValue as { min?: number; max?: number };
  const value = row.getValue<number>(columnId);

  if (min !== undefined && max !== undefined) {
    return value >= min && value <= max;
  } else if (min !== undefined) {
    return value >= min;
  } else if (max !== undefined) {
    return value <= max;
  }

  return true;
};

const arrayIncludes: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true;

  const value = row.getValue<string[]>(columnId);
  return value.some((v) => v.toLowerCase().includes(filterValue.toLowerCase()));
};

const PokemonTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const columnHelper = createColumnHelper<EnhancedPokemon>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonQuery({ limit: 25 });
  const allRows = useMemo(() => (data ? data.pages.flatMap((d) => d.data) : []), [data]);
  // console.log({ allRows });
  // Extract unique type options for the type filter
  const typeOptions = useMemo(() => {
    const types = new Set<string>();
    allRows.forEach((pokemon) => {
      pokemon.types.forEach((type) => types.add(type));
    });
    return Array.from(types)
      .sort()
      .map((type) => ({ value: type, label: type }));
  }, [allRows]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('sprite', {
        header: 'Image',
        cell: (info) => (
          <div className={styles.spriteCell}>
            <img src={info.getValue()} alt="Pokemon sprite" className={styles.sprite} />
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
              <span key={type} className={clsx(styles.typeTag, styles[`type${type}`])}>
                {type}
              </span>
            ))}
          </div>
        ),
        filterFn: arrayIncludes,
        enableSorting: false
      }),
      columnHelper.accessor('abilities', {
        header: 'Abilities',
        cell: (info) => info.getValue().join(', '),
        filterFn: arrayIncludes,
        enableSorting: false
      }),
      columnHelper.accessor('height', {
        header: 'Height (m)',
        cell: (info) => info.getValue().toFixed(1),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('weight', {
        header: 'Weight (kg)',
        cell: (info) => info.getValue().toFixed(1),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('experience', {
        header: 'Base Exp',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('hp', {
        header: 'HP',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('attack', {
        header: 'Attack',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('defense', {
        header: 'Defense',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('specialAttack', {
        header: 'Sp. Atk',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('specialDefense', {
        header: 'Sp. Def',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
        enableSorting: true
      }),
      columnHelper.accessor('speed', {
        header: 'Speed',
        cell: (info) => info.getValue(),
        filterFn: numberRangeFilterFn,
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
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: () => () => new Map(),
    defaultColumn: {
      // Set up default filter UI
    }
  });

  // Virtualizer
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
    // When columns change, remeasure the virtualizer rows
    console.log('columnVisibility', columnVisibility);
    rowVirtualizer.measure();
  }, [columnVisibility, rowVirtualizer]);

  // Generate filter UI for columns based on their type
  const renderColumnFilter = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (!column) return null;

    if (columnId === 'types') {
      return <SelectFilter column={column} options={typeOptions} placeholder="Filter by type" />;
    }

    if (
      [
        'height',
        'weight',
        'experience',
        'hp',
        'attack',
        'defense',
        'specialAttack',
        'specialDefense',
        'speed',
        'id'
      ].includes(columnId)
    ) {
      return <NumberRangeFilter column={column} placeholder="Filter by range" />;
    }

    return <TextFilter column={column} placeholder="Search..." />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerActions}>
        <h1 className={styles.title}>Pokémon Data Explorer</h1>
        <ColumnSelector table={table} />
      </div>

      <div className={styles.tableWrapper} ref={tableContainerRef}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.th}>
                    <div className={styles.headerCell}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={clsx(styles.headerContent, {
                            [styles.sortable]: header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}>
                          {typeof header.column.columnDef.header === 'function'
                            ? header.column.columnDef.header({
                                column: header.column,
                                header,
                                table
                              })
                            : header.column.columnDef.header}
                          {header.column.getIsSorted() && (
                            <span className={styles.sortIcon}>
                              {header.column.getIsSorted() === 'asc' ? (
                                <ArrowUp size={14} />
                              ) : (
                                <ArrowDown size={14} />
                              )}
                            </span>
                          )}
                        </div>
                      )}

                      {header.column.getCanFilter() && (
                        <div className={styles.filterContainer}>
                          {renderColumnFilter(header.column.id)}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} colSpan={table.getAllColumns().length} />
              </tr>
            )}

            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<EnhancedPokemon>;
              if (!row) {
                if (virtualRow.index >= allRows.length && isFetchingNextPage) {
                  return (
                    <tr key={virtualRow.key} className={styles.tr}>
                      <td colSpan={table.getAllColumns().length} className={styles.td}>
                        Loading more Pokémon...
                      </td>
                    </tr>
                  );
                }
                return null;
              }
              return (
                <tr
                  key={row.id}
                  className={styles.tr}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {String(cell.getValue())}
                    </td>
                  ))}
                </tr>
              );
            })}

            {paddingBottom > 0 && (
              <tr>
                <td
                  style={{ height: `${paddingBottom}px` }}
                  colSpan={table.getAllColumns().length}
                />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Loading indicator */}
      {/* <div
        ref={setSentryRef}
        className={clsx(styles.loadingIndicator, {
          [styles.loadingActive]: isFetchingNextPage
        })}>
        {isFetchingNextPage && (
          <>
            <Loader2 size={24} className={styles.spinner} />
            <span>Loading more Pokémon...</span>
          </>
        )}
      </div> */}
    </div>
  );
};

export default PokemonTable;
