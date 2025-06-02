import { PlusCircleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { PATHS } from '@src/router';

import styles from './CreateRefPage.module.scss';

export const CreateRefPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.cards}>
        <Link to={PATHS.DRAFTS} className={styles['card']}>
          <div className={styles['card-header']}>
            <img src="/notepad-pencil.png" className={styles['draft-image']} />
          </div>
          <div className={styles['card-content']}>
            {t('common.continueDraft.normal')}{' '}
            <span className={styles.bold}>{t('common.continueDraft.bold')} </span>
          </div>
        </Link>
        <Link to={PATHS.NEW_REFERENCE} className={styles['card']}>
          <div className={styles['card-header']}>
            <PlusCircleIcon size={64} className={styles['plus-icon']} />
          </div>
          <div className={styles['card-content']}>
            {t('common.createNewRef.normal')}{' '}
            <span className={styles.bold}>{t('common.createNewRef.bold')}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
