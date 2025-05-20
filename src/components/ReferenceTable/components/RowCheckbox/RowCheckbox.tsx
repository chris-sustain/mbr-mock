import styles from './RowCheckbox.module.scss';
import React, { useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
type RowCheckboxProps = {
  id: number;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const RowCheckbox: React.FC<RowCheckboxProps> = ({ id, selectedIds, setSelectedIds }) => {
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
      className={styles.checkbox}
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
