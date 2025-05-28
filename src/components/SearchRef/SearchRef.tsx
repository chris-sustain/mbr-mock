import styles from './SearchRef.module.scss';

export const SearchRef = () => {
  return (
    <div className={`${styles['root']}`}>
      <div className={styles['search-bar']}>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};
