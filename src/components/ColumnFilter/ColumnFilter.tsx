import { useState } from 'react';
import type { Column } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import styles from './ColumnFilter.module.scss';

interface TextFilterProps {
  column: Column<any, unknown>;
  placeholder?: string;
}

export function TextFilter({ column, placeholder = 'Search...' }: TextFilterProps) {
  const [value, setValue] = useState('');

  const onFilterChange = (value: string) => {
    setValue(value);
    column.setFilterValue(value);
  };

  return (
    <div className={styles.filterContainer}>
      <Search size={14} className={styles.searchIcon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder={placeholder}
        className={styles.filterInput}
      />
      {value && (
        <button
          onClick={() => onFilterChange('')}
          className={styles.clearButton}
          aria-label="Clear filter">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

interface NumberRangeFilterProps {
  column: Column<any, unknown>;
  placeholder?: string;
}

export function NumberRangeFilter({
  column,
  placeholder = 'Filter by range'
}: NumberRangeFilterProps) {
  const [min, setMin] = useState<string>('');
  const [max, setMax] = useState<string>('');

  const onMinChange = (value: string) => {
    setMin(value);
    const newFilterValue = {
      min: value ? Number(value) : undefined,
      max: max ? Number(max) : undefined
    };
    column.setFilterValue(newFilterValue);
  };

  const onMaxChange = (value: string) => {
    setMax(value);
    const newFilterValue = {
      min: min ? Number(min) : undefined,
      max: value ? Number(value) : undefined
    };
    column.setFilterValue(newFilterValue);
  };

  const clearFilter = () => {
    setMin('');
    setMax('');
    column.setFilterValue(undefined);
  };

  return (
    <div className={styles.rangeContainer}>
      <div className={styles.rangeInputs}>
        <input
          type="number"
          value={min}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="Min"
          className={styles.rangeInput}
        />
        <span className={styles.rangeSeparator}>to</span>
        <input
          type="number"
          value={max}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder="Max"
          className={styles.rangeInput}
        />
      </div>
      {(min || max) && (
        <button onClick={clearFilter} className={styles.clearButton} aria-label="Clear filter">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

interface SelectFilterProps {
  column: Column<any, unknown>;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectFilter({ column, options, placeholder = 'Select...' }: SelectFilterProps) {
  const [value, setValue] = useState<string>('');

  const onFilterChange = (value: string) => {
    setValue(value);
    column.setFilterValue(value === '' ? undefined : value);
  };

  return (
    <div className={styles.selectContainer}>
      <select
        value={value}
        onChange={(e) => onFilterChange(e.target.value)}
        className={styles.selectInput}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value && (
        <button
          onClick={() => onFilterChange('')}
          className={styles.clearSelectButton}
          aria-label="Clear filter">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
