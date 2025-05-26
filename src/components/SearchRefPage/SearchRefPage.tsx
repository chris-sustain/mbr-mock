import styles from './SearchRefPage.module.scss';

export const SearchRefPage = () => {
  return (
    <div className={styles['root']}>
      <div className={styles['drawer']}>{'Filters'}</div>
      <div className={styles['body']}>
        <div className={styles['table-controls']}>{'Table search bar, etc...'}</div>
        <div className={styles['table-container']}>{'Table'}</div>
      </div>
    </div>
  );
};
