import { PATHS } from '@src/router';
import styles from './CreateRefPage.module.scss';
import { Link } from 'react-router';

export const CreateRefPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{'Sidebar'}</div>
      <div className={styles.content}>
        <Link to={PATHS.NEW_REFERENCE}>Create Ref Form</Link>
        <Link to={PATHS.DRAFTS}>Drafts</Link>
      </div>
    </div>
  );
};
