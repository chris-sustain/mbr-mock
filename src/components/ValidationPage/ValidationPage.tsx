import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TABLE_MODES } from '@src/utils';
import { Breadcrumb } from '@components/Breadcrumb';
import { ReferenceTableContainer } from '@components/ReferenceTable/ReferenceTableContainer';
import { SearchRef } from '@components/SearchRef';

import styles from './ValidationPage.module.scss';

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
