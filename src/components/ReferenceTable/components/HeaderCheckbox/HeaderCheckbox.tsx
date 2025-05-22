import styles from './HeaderCheckbox.module.scss';
import React from 'react';
import classNames from 'classnames';
import { Checkbox } from '@src/components/inputs/Checkbox';
interface HeaderCheckboxProps {
  allIds: string[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  className?: string;
}

export const HeaderCheckbox: React.FC<HeaderCheckboxProps> = ({
  allIds,
  selectedIds,
  setSelectedIds,
  className
}) => {
  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
  const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

  return (
    <Checkbox
      className={classNames(styles.checkbox, className)}
      isSelected={isAllSelected}
      isIndeterminate={isIndeterminate}
      aria-checked={isIndeterminate ? 'mixed' : isAllSelected}
      onChange={(isSelected) => setSelectedIds(isSelected ? allIds : [])}
    />
  );
};
