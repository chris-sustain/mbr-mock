import React, { memo } from 'react';
import { Checkbox } from '@src/components/inputs/Checkbox';
import styles from './RowCheckbox.module.scss';

interface RowCheckboxProps {
  isSelected: boolean;
  onChange: (event: unknown) => void;
  className?: string;
}

export const RowCheckbox: React.FC<RowCheckboxProps> = memo(
  ({ isSelected, onChange, className }) => {
    return (
      <div className={styles['root']}>
        <Checkbox className={className} isSelected={isSelected} onChange={onChange} />
      </div>
    );
  }
);

RowCheckbox.displayName = 'RowCheckbox';
