import React, { memo } from 'react';
import { Checkbox } from '@src/components/inputs/Checkbox';
import styles from './RowCheckbox.module.scss';

interface RowCheckboxProps {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  className?: string;
}

export const RowCheckbox: React.FC<RowCheckboxProps> = memo(
  ({ isSelected, setIsSelected, className }) => {
    return (
      <div className={styles['root']}>
        <Checkbox
          className={className}
          isSelected={isSelected}
          onChange={() => setIsSelected(!isSelected)}
        />
      </div>
    );
  }
);

RowCheckbox.displayName = 'RowCheckbox';
