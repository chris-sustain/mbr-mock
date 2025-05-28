import { TABLE_MODES } from '@src/utils';
import styles from './DraftsPage.module.scss';
import { ReferenceTableContainer } from '@components/ReferenceTable/ReferenceTableContainer';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@components/Breadcrumb';
import { SearchRef } from '@components/SearchRef';
import { useState } from 'react';
import { DeleteRefButton } from '@components/DeleteRefButton';

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
