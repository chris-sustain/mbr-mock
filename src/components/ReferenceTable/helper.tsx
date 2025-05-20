import React from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';
import styles from './ReferenceTable.module.scss';
import type { EnhancedReference } from '@src/types/reference';
import { flexRender, type Header } from '@tanstack/react-table';
import classNames from 'classnames';

export const SortedHeaderCell: React.FC<{ header: Header<EnhancedReference, unknown> }> = ({
  header
}) => {
  const sortDirection = header.column.getIsSorted();
  if (!sortDirection) return null;

  const getSortIcon = () => {
    if (sortDirection === 'asc') return <ArrowUp size={14} />;
    if (sortDirection === 'desc') return <ArrowDown size={14} />;
    return null;
  };
  return <span className={styles.sortIcon}>{getSortIcon()}</span>;
};

export const renderHeaderCell = (header: Header<EnhancedReference, unknown>) => {
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
