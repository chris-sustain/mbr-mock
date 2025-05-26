import React, { memo } from 'react';
import { Checkbox } from '@src/components/inputs/Checkbox';

interface HeaderCheckboxProps {
  isSelected: boolean;
  isIndeterminate: boolean;
  setIsSelected: (isSelected: boolean) => void;
  className?: string;
}

export const HeaderCheckbox: React.FC<HeaderCheckboxProps> = memo(
  ({ isSelected, isIndeterminate, setIsSelected, className }) => {
    return (
      <Checkbox
        className={className}
        isSelected={isSelected}
        isIndeterminate={isIndeterminate}
        aria-checked={isIndeterminate ? 'mixed' : isSelected}
        onChange={setIsSelected}
      />
    );
  }
);

HeaderCheckbox.displayName = 'HeaderCheckbox';
