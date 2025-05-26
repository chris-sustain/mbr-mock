import React, { memo } from 'react';
import { Checkbox } from '@src/components/inputs/Checkbox';

interface HeaderCheckboxProps {
  isSelected: boolean;
  isIndeterminate: boolean;
  onChange: (event: unknown) => void;
  className?: string;
}

export const HeaderCheckbox: React.FC<HeaderCheckboxProps> = memo(
  ({ isSelected, isIndeterminate, onChange, className }) => {
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
      />
    );
  }
);

HeaderCheckbox.displayName = 'HeaderCheckbox';
