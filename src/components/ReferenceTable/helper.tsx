import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react';
import { flexRender, type Header } from '@tanstack/react-table';
import classNames from 'classnames';
import React from 'react';

import type { Reference } from '@src/types/reference';
import type { ColumnConfig } from '@src/types/table';

import { CellAmountRenderer, CellDateRenderer } from './components';

import styles from './ReferenceTable.module.scss';

export const SortedHeaderCell: React.FC<{ header: Header<Reference, unknown> }> = ({ header }) => {
  const sortDirection = header.column.getIsSorted();
  if (!sortDirection) return null;

  const getSortIcon = () => {
    if (sortDirection === 'asc') return <ArrowUpIcon size={14} />;
    if (sortDirection === 'desc') return <ArrowDownIcon size={14} />;
    return null;
  };
  return <span className={styles.sortIcon}>{getSortIcon()}</span>;
};

export const renderHeaderCell = (header: Header<Reference, unknown>) => {
  if (header.isPlaceholder) return null;

  return (
    <div
      className={classNames(styles.headerContent, {
        [styles.sortable]: header.column.getCanSort()
      })}
      onClick={header.column.getToggleSortingHandler()}>
      {flexRender(header.column.columnDef.header, header.getContext())}
      <SortedHeaderCell header={header} />
    </div>
  );
};

// Extract renderer logic to a separate utility
export const renderCellContent = (config: ColumnConfig, value: string) => {
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
