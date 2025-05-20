import React, { useState } from 'react';
import type { Table } from '@tanstack/react-table';
import styles from './ColumnSelector.module.scss';
import classNames from 'classnames';
import { CustomIcon } from '../CustomIcon';

interface ColumnSelectorProps<T> {
  table: Table<T>;
}

export function ColumnSelector<T>({ table }: ColumnSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const allColumns = table.getAllLeafColumns();
  const hiddenColumns = allColumns.filter((column) => !column.getIsVisible());
  const visibleColumns = allColumns.filter((column) => column.getIsVisible());

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleAll = (value: boolean) => {
    table.toggleAllColumnsVisible(value);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={handleToggle}
        aria-label="Toggle column visibility"
        aria-expanded={isOpen}>
        <CustomIcon name="moreOrLess" size={20} />

        {/* <ChevronDown size={16} className={classNames(styles.chevron, { [styles.chevronOpen]: isOpen })} /> */}
      </button>

      {isOpen && (
        <div className={styles.dropdownBackdrop} onClick={handleClickOutside}>
          <div className={styles.dropdown}>
            <div className={styles.dropdownHeader}>
              <h3 className={styles.dropdownTitle}>Column Visibility</h3>
              <div className={styles.toggleAllButtons}>
                <button
                  className={styles.toggleAllButton}
                  onClick={() => handleToggleAll(true)}
                  disabled={visibleColumns.length === allColumns.length}>
                  <span>Show All</span>
                </button>
                <button
                  className={styles.toggleAllButton}
                  onClick={() => handleToggleAll(false)}
                  disabled={hiddenColumns.length === allColumns.length - 1} // Keep at least one column visible
                >
                  <span>Hide All</span>
                </button>
              </div>
            </div>

            <div className={styles.columnList}>
              {allColumns.map((column) => {
                // Skip if no header defined
                if (!column.columnDef.header) return null;

                const isVisible = column.getIsVisible();

                return (
                  <div key={column.id} className={styles.columnItem}>
                    <label className={styles.columnLabel}>
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={column.getToggleVisibilityHandler()}
                        disabled={isVisible && visibleColumns.length === 1} // Prevent hiding all columns
                      />
                      <span>
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : column.id}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
