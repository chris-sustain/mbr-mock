import styles from './RowCheckbox.module.scss';
import React, { useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import classNames from 'classnames';
type RowCheckboxProps = {
  id: string;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

export const RowCheckbox: React.FC<RowCheckboxProps> = ({
  id,
  selectedIds,
  setSelectedIds,
  className
}) => {
  const isSelected = selectedIds.includes(id);
  const ref = useRef(null);

  const { inputProps } = useCheckbox(
    {
      'aria-label': 'Select row',
      isSelected,
      onChange: (checked) => {
        setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((_id) => _id !== id)));
      }
    },
    {
      isSelected,
      setSelected: (v: boolean) =>
        setSelectedIds((prev) => (v ? [...prev, id] : prev.filter((_id) => _id !== id))),
      toggle: () =>
        setSelectedIds((prev) => (isSelected ? prev.filter((_id) => _id !== id) : [...prev, id]))
    },
    ref
  );

  return (
    <input
      {...inputProps}
      className={classNames(styles.checkbox, className)}
      ref={ref}
      type="checkbox"
      checked={isSelected}
      onChange={(e) => {
        setSelectedIds((prev) =>
          e.target.checked ? [...prev, id] : prev.filter((_id) => _id !== id)
        );
      }}
    />
  );
};
