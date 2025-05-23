import React from 'react';
import { Checkbox } from '@src/components/inputs/Checkbox';
import styles from './RowCheckbox.module.scss';
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
    <div className={styles['root']}>
      <Checkbox
        className={className}
        isSelected={isSelected}
        onChange={(isSelected) => {
          setSelectedIds((prev) => (isSelected ? [...prev, id] : prev.filter((_id) => _id !== id)));
        }}
      />
    </div>
  );
};
