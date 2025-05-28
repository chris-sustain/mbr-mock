import React, { memo } from 'react';
import { Checkbox } from '@src/components/inputs/Checkbox';
import styles from './RowCheckbox.module.scss';
import type { TableMode } from '@src/types/table';
import { TABLE_MODES } from '@src/utils';

interface RowCheckboxProps {
  isSelected: boolean;
  onChange: (event: unknown) => void;
  className?: string;
  mode: TableMode;
}

export const RowCheckbox: React.FC<RowCheckboxProps> = memo(
  ({ isSelected, onChange, className, mode }) => {
    return (
      <div className={styles['root']}>
        <Checkbox
          className={className}
          isSelected={isSelected}
          onChange={onChange}
          variant={mode === TABLE_MODES.draft ? 'secondary' : 'default'}
        />
      </div>
    );
  }
);

RowCheckbox.displayName = 'RowCheckbox';
