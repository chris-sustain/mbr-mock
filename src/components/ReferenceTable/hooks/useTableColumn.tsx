import { useMemo } from 'react';
import { createColumnHelper, type Row } from '@tanstack/react-table';
import type { Reference } from '@src/types/reference';
import type { ColumnKey } from '@src/types/table';
import { COLUMN_CONFIGS } from '@src/utils';
import { useTranslation } from 'react-i18next';
import { HeaderCheckbox, RowCheckbox } from '../components';
import { UnstyledLink } from '@src/components/UnstyledLink';
import { generatePath } from 'react-router';
import { PATHS } from '@src/router';
import { renderCellContent } from '../helper';
import styles from '../ReferenceTable.module.scss';
import classNames from 'classnames';

export const useTableColumns = (
  allIds: string[],
  selectedIds: string[],
  setSelectedIds: (ids: string[]) => void
) => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<Reference>();

  const getHeaderLabel = (columnId: ColumnKey) => {
    const className = classNames(styles[columnId], styles['header']);
    return <span className={className}>{t('common.table.' + columnId)}</span>;
  };

  return useMemo(
    () => [
      {
        id: 'select',
        header: () => {
          const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
          const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

          return (
            <HeaderCheckbox
              isSelected={isAllSelected}
              isIndeterminate={isIndeterminate}
              setIsSelected={(isSelected) => setSelectedIds(isSelected ? allIds : [])}
            />
          );
        },
        cell: ({ row }: { row: Row<Reference> }) => {
          const isSelected = selectedIds.includes(row.original.id);

          const setIsSelected = (selected: boolean) => {
            const newSelectedIds = selected
              ? [...selectedIds, row.original.id]
              : selectedIds.filter((id) => id !== row.original.id);
            setSelectedIds(newSelectedIds);
          };

          return <RowCheckbox isSelected={isSelected} setIsSelected={setIsSelected} />;
        },
        enableSorting: false
      },
      ...Object.entries(COLUMN_CONFIGS).map(([key, config]) =>
        columnHelper.accessor(key as ColumnKey, {
          header: () => getHeaderLabel(key as ColumnKey),
          cell: (info) => {
            return (
              <UnstyledLink
                to={generatePath(PATHS.REFERENCE, { id: info.row.original.id })}
                className={`${styles[key]}`}>
                {renderCellContent(config, info.getValue())}
              </UnstyledLink>
            );
          },
          enableSorting: config.enableSorting
        })
      )
    ],
    [allIds, selectedIds, setSelectedIds, t]
  );
};
