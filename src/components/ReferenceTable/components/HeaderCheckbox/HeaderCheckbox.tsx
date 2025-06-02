import React, { memo } from 'react';

import { Checkbox } from '@src/components/inputs/Checkbox';
import type { TableMode } from '@src/types/table';
import { TABLE_MODES } from '@src/utils';

interface HeaderCheckboxProps {
  isSelected: boolean;
  isIndeterminate: boolean;
  onChange: (event: unknown) => void;
  className?: string;
  mode: TableMode;
}

export const HeaderCheckbox: React.FC<HeaderCheckboxProps> = memo(
  ({ isSelected, isIndeterminate, onChange, className, mode }) => {
    const handleChange = (isSelected: boolean) => {
      onChange({ target: { checked: isSelected } });
    };

    return (
      <Checkbox
        className={className}
        isSelected={isSelected}
        isIndeterminate={isIndeterminate}
        onChange={handleChange}
        aria-checked={isIndeterminate ? 'mixed' : isSelected}
        variant={mode === TABLE_MODES.draft ? 'secondary' : 'default'}
      />
    );
  }
);

HeaderCheckbox.displayName = 'HeaderCheckbox';
