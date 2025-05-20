import styles from './HeaderCheckbox.module.scss';

import React, { useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import classNames from 'classnames';
type HeaderCheckboxProps = {
  allIds: string[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  className?: string;
};

export const HeaderCheckbox: React.FC<HeaderCheckboxProps> = ({
  allIds,
  selectedIds,
  setSelectedIds,
  className
}) => {
  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
  const isIndeterminate = selectedIds.length > 0 && !isAllSelected;
  const ref = useRef<HTMLInputElement>(null);

  const { inputProps } = useCheckbox(
    {
      'aria-label': 'Select all',
      isSelected: isAllSelected,
      isIndeterminate,
      onChange: (checked: boolean) => {
        setSelectedIds(checked ? allIds : []);
      }
    },
    {
      isSelected: isAllSelected,
      setSelected: (v: boolean) => setSelectedIds(v ? allIds : []),
      toggle: () => setSelectedIds(isAllSelected ? [] : allIds)
    },
    ref
  );

  return (
    <input
      {...inputProps}
      ref={ref}
      className={classNames(styles.checkbox, className)}
      type="checkbox"
      checked={isAllSelected}
      aria-checked={isIndeterminate ? 'mixed' : isAllSelected}
      onChange={(e) => setSelectedIds(e.target.checked ? allIds : [])}
    />
  );
};
