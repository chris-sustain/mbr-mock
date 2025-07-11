import { flexRender, type Row, type Table } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLoadingState } from '@src/hooks/useLoadingState';
import type { Reference } from '@src/types/reference';
import { getColumnWidth } from '@src/utils/table';

import { EmptyState, LoadingState, Pagination } from './components';
import { renderHeaderCell } from './helper';

import styles from './ReferenceTable.module.scss';

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
  countSelectedRows: number;
  countTotalRows: number;
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
    totalPages,
    countSelectedRows,
    countTotalRows
  }) => {
    const { t } = useTranslation();
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const paginationRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLTableRowElement | null>(null);
    const bodyRef = useRef<HTMLTableSectionElement | null>(null);
    const showLoading = useLoadingState(isLoading);

    const [dimensions, setDimensions] = useState({
      containerHeight: 0,
      headerHeight: 0,
      paginationHeight: 0,
      containerWidth: 0
    });

    useEffect(() => {
      if (tableContainerRef.current && headerRef.current && paginationRef.current) {
        setDimensions({
          containerHeight: tableContainerRef.current.clientHeight,
          headerHeight: headerRef.current.clientHeight,
          containerWidth: tableContainerRef.current.clientWidth,
          paginationHeight: paginationRef.current.clientHeight
        });
      }
    }, []);

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
            height={dimensions.containerHeight}
            width={dimensions.containerWidth}
            colSpan={table.getAllColumns().length}
          />
        );
      }

      if (showLoading) {
        return (
          <LoadingState
            height={dimensions.containerHeight}
            width={dimensions.containerWidth}
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

    const countLabel = t('common.selectedOf', {
      count: countSelectedRows,
      total: countTotalRows
    });

    return (
      <div className={styles.container}>
        <div className={tableWrapperClass} ref={tableContainerRef}>
          <div className={styles.header}>
            <div className={styles.header__right}>
              <div className={styles.header__right__title}>
                <span>{countLabel}</span>
              </div>
            </div>
          </div>
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
              style={{
                height:
                  dimensions.containerHeight - dimensions.headerHeight - dimensions.paginationHeight
              }}
              className="main-scrollbar"
              onScroll={handleBodyScroll}>
              {renderBody()}
            </tbody>
          </table>
        </div>
        <div ref={paginationRef}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    );
  }
);
