import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import styles from './SearchRefPage.module.scss';
import { useNotify } from '@src/hooks';
export const SearchRefPage = () => {
  const { t } = useTranslation();
  const { notify } = useNotify();

  useEffect(() => {
    notify({
      type: 'info',
      title: 'Hello',
      content: 'Hello',
      closable: true
    });
  }, [notify]);
  return (
    <>
      <div className={`${styles['root']}`}>
        <h1>{t('common.Hello')}</h1>
      </div>
    </>
  );
};
