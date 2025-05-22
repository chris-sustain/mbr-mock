import styles from './RowCheckbox.module.scss';
import React from 'react';
import classNames from 'classnames';
import { Checkbox } from '@src/components/inputs/Checkbox';
interface RowCheckboxProps {
  id: string;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

export const RowCheckbox: React.FC<RowCheckboxProps> = ({
  id,
  selectedIds,
  setSelectedIds,
  className
}) => {
  const isSelected = selectedIds.includes(id);

  return (
    <Checkbox
      className={classNames(styles.checkbox, className)}
      isSelected={isSelected}
      onChange={(isSelected) => {
        setSelectedIds((prev) => (isSelected ? [...prev, id] : prev.filter((_id) => _id !== id)));
      }}
    />
  );
};
