import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TABLE_MODES } from '@src/utils';
import { Breadcrumb } from '@components/Breadcrumb';
import { DeleteRefButton } from '@components/DeleteRefButton';
import { ReferenceTableContainer } from '@components/ReferenceTable/ReferenceTableContainer';
import { SearchRef } from '@components/SearchRef';

import styles from './DraftsPage.module.scss';

export const DraftsPage = () => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className={styles['root']}>
      <div className={styles['drawer']}>
        <Breadcrumb title={t('common.page.drafts.title')} name="pen" />
      </div>
      <div className={styles['body']}>
        <div className={styles['table-controls']}>
          <SearchRef />
          <DeleteRefButton rowSelection={rowSelection} />
        </div>
        <div className={styles['table-container']}>
          <ReferenceTableContainer
            mode={TABLE_MODES.draft}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </div>
    </div>
  );
};
