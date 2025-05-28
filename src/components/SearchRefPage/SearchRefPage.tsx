import { ReferenceTableContainer } from '@components/ReferenceTable/ReferenceTableContainer';
import styles from './SearchRefPage.module.scss';
import { TABLE_MODES } from '@src/utils';
import { SearchRef } from '@components/SearchRef';
import { useState } from 'react';

export const SearchRefPage = () => {
  const [rowSelection, setRowSelection] = useState({});
  return (
    <div className={styles['root']}>
      <div className={styles['drawer']}>{'Filters'}</div>
      <div className={styles['body']}>
        <div className={styles['table-controls']}>
          <SearchRef />
        </div>
        <div className={styles['table-container']}>
          <ReferenceTableContainer
            mode={TABLE_MODES.all}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </div>
    </div>
  );
};
