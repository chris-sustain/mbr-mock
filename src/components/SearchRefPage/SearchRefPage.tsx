import { ReferenceTableContainer } from '@components/ReferenceTable/ReferenceTableContainer';
import styles from './SearchRefPage.module.scss';
import { TABLE_MODES } from '@src/utils';

export const SearchRefPage = () => {
  return (
    <div className={styles['root']}>
      <div className={styles['drawer']}>{'Filters'}</div>
      <div className={styles['body']}>
        <div className={styles['table-controls']}>{'Table search bar, etc...'}</div>
        <div className={styles['table-container']}>
          <ReferenceTableContainer mode={TABLE_MODES.all} />
        </div>
      </div>
    </div>
  );
};
