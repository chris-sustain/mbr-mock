import { memo, useRef } from 'react';

import styles from './ReferenceTable.module.scss';
import type { Reference } from '@src/types/reference';
import { flexRender, type Row, type Table } from '@tanstack/react-table';
import { renderHeaderCell } from './helper';
import { EmptyState, Pagination, LoadingState } from './components';
import classNames from 'classnames';
import { useLoadingState } from '@src/hooks/useLoadingState';

export const ReferenceTable = memo<{
  table: Table<Reference>;
  rows: Row<Reference>[];
  allRows: Reference[];
  isLoading: boolean;
  isFetching: boolean;
  getRowClassName: (row: Row<Reference>) => string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}>(
  ({
    table,
    rows,
    allRows,
    isLoading,
    isFetching,
    getRowClassName,
    currentPage,
    setCurrentPage,
    totalPages
  }) => {
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const showLoading = useLoadingState(isLoading);

    const renderBody = () => {
      const containerHeight = tableContainerRef?.current?.clientHeight || 400;
      if (!showLoading && !isFetching && allRows.length === 0) {
        return <EmptyState height={containerHeight} colSpan={table.getAllColumns().length} />;
      }

      if (showLoading) {
        return <LoadingState height={containerHeight} colSpan={table.getAllColumns().length} />;
      }

      return (
        <>
          {rows.map((row) => (
            <tr key={row.id} className={classNames(styles.tr, getRowClassName(row))}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </>
      );
    };

    return (
      <div className={styles.container}>
        <div className={classNames(styles.tableWrapper, 'main-scrollbar')} ref={tableContainerRef}>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  }
);
