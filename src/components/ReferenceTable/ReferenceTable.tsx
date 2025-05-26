import { memo, useRef, useCallback, useEffect } from 'react';

import styles from './ReferenceTable.module.scss';
import type { Reference } from '@src/types/reference';
import { flexRender, type Row, type Table } from '@tanstack/react-table';
import { renderHeaderCell } from './helper';
import { EmptyState, Pagination, LoadingState } from './components';
import classNames from 'classnames';
import { useLoadingState } from '@src/hooks/useLoadingState';
import { getColumnWidth } from '@src/utils/table';

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
    const headerRef = useRef<HTMLTableRowElement | null>(null);
    const bodyRef = useRef<HTMLTableSectionElement | null>(null);
    const showLoading = useLoadingState(isLoading);

    const containerHeight = tableContainerRef?.current?.clientHeight || 400;
    const headerHeight = headerRef?.current?.clientHeight || 40;
    const containerWidth = tableContainerRef?.current?.clientWidth || 800;

    /*
      Only tbody can be scrolled vertically.
      Both thead and tbody can be scrolled independently.
      The horizontal scrollbard from thead is hidden and controlled by the tbody scroll.
    */
    const handleBodyScroll = useCallback((e: React.UIEvent<HTMLTableSectionElement>) => {
      if (headerRef.current) {
        headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
      }
    }, []);

    const scrollToFirstRow = useCallback(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, []);

    useEffect(() => {
      scrollToFirstRow();
    }, [currentPage]);

    const renderBody = () => {
      if (!showLoading && !isFetching && allRows.length === 0) {
        return (
          <EmptyState
            height={containerHeight}
            width={containerWidth}
            colSpan={table.getAllColumns().length}
          />
        );
      }

      if (showLoading) {
        return (
          <LoadingState
            height={containerHeight}
            width={containerWidth}
            colSpan={table.getAllColumns().length}
          />
        );
      }

      return (
        <>
          {rows.map((row) => {
            return (
              <tr key={row.id} className={classNames(styles.tr, getRowClassName(row))}>
                {row.getVisibleCells().map((cell, i) => {
                  return (
                    <td key={cell.id} className={styles.td} style={getColumnWidth(i)}>
                      <div className={styles.cellContent} style={getColumnWidth(i)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      );
    };
    const tableWrapperClass = classNames(styles.tableWrapper, 'main-scrollbar');

    return (
      <div className={styles.container}>
        <div className={tableWrapperClass} ref={tableContainerRef}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} ref={headerRef}>
                  {headerGroup.headers.map((header, i) => {
                    return (
                      <th key={header.id} className={styles.th} style={getColumnWidth(i)}>
                        <div className={styles.headerCell} style={getColumnWidth(i)}>
                          {renderHeaderCell(header)}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody
              ref={bodyRef}
              style={{ height: containerHeight - headerHeight }}
              className="main-scrollbar"
              onScroll={handleBodyScroll}>
              {renderBody()}
            </tbody>
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
