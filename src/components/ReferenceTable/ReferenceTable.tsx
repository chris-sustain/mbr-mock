import React from 'react';

import styles from './ReferenceTable.module.scss';

import type { EnhancedReference } from '@src/types/reference';
import { flexRender, type Row, type Table } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import { renderHeaderCell } from './helper';
import { EmptyState } from './components';
export const ReferenceTable: React.FC<{
  table: Table<EnhancedReference>;
  rows: Row<EnhancedReference>[];
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  allRows: EnhancedReference[];
  isFetchingNextPage: boolean;
  paddingTop: number;
  paddingBottom: number;
  isLoading: boolean;
  isFetching: boolean;
}> = ({
  table,
  rows,
  tableContainerRef,
  rowVirtualizer,
  allRows,
  isFetchingNextPage,
  paddingTop,
  paddingBottom,
  isLoading,
  isFetching
}) => {
  const renderBody = () => {
    if (isLoading || isFetching) {
      return null;
    }

    if (!isLoading && !isFetching /* toremove && allRows.length === 0 */) {
      return <EmptyState height={tableContainerRef.current?.clientHeight || 0} />;
    }

    return (
      <>
        {/*
              Add a spacer row at the top of the table to maintain correct scroll position.
              This is necessary for virtualized scrolling to work properly - it creates
              empty space above the visible rows to match the total height of all rows
              that would be above the current viewport.
            */}
        {paddingTop > 0 && (
          <tr>
            <td style={{ height: `${paddingTop}px` }} colSpan={table.getAllColumns().length} />
          </tr>
        )}

        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          if (!row) {
            if (virtualRow.index >= allRows.length && isFetchingNextPage) {
              return (
                <tr key={virtualRow.key} className={styles.tr}>
                  <td colSpan={table.getAllColumns().length} className={styles.td}>
                    Loading more data...
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}

        {/*
              Add a spacer row at the bottom of the table to maintain correct scroll position.
              Similar to the top spacer, this creates empty space below the visible rows to
              match the total height of all rows that would be below the current viewport.
              This ensures the scrollbar height and behavior remains accurate.
            */}
        {paddingBottom > 0 && (
          <tr>
            <td style={{ height: `${paddingBottom}px` }} colSpan={table.getAllColumns().length} />
          </tr>
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper} ref={tableContainerRef}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.th}>
                    <div className={styles.headerCell}>{renderHeaderCell(header)}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferenceTable;
