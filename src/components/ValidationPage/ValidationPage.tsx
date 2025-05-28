import styles from './ValidationPage.module.scss';
import { TABLE_MODES } from '@src/utils';
import { ReferenceTableContainer } from '@components/ReferenceTable/ReferenceTableContainer';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@components/Breadcrumb';
import { SearchRef } from '@components/SearchRef';
import { useState } from 'react';
export const ValidationPage = () => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className={styles['root']}>
      <div className={styles['drawer']}>
        <Breadcrumb title={t('common.page.validation.title')} name="check" />
      </div>
      <div className={styles['body']}>
        <div className={styles['table-controls']}>
          <SearchRef />
        </div>
        <div className={styles['table-container']}>
          <ReferenceTableContainer
            mode={TABLE_MODES.validating}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </div>
    </div>
  );
};
