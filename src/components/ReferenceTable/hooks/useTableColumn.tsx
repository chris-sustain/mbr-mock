import { useMemo, type Dispatch, type SetStateAction } from 'react';
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
  setSelectedIds: Dispatch<SetStateAction<string[]>>
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
        header: () => (
          <HeaderCheckbox
            allIds={allIds}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ),
        cell: ({ row }: { row: Row<Reference> }) => (
          <RowCheckbox
            id={row.original.id}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ),
        enableSorting: false
      },
      ...Object.entries(COLUMN_CONFIGS).map(([key, config]) =>
        columnHelper.accessor(key as ColumnKey, {
          header: () => getHeaderLabel(key as ColumnKey),
          cell: (info) => (
            <UnstyledLink
              to={generatePath(PATHS.REFERENCE, { id: info.row.original.id })}
              className={`${styles[key]}`}>
              {renderCellContent(config, info.getValue())}
            </UnstyledLink>
          ),
          enableSorting: config.enableSorting
        })
      )
    ],
    [allIds, selectedIds, setSelectedIds, t]
  );
};
