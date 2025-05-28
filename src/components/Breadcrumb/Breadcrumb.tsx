import styles from './Breadcrumb.module.scss';
import { useNavigate } from 'react-router';
import { CustomIcon } from '@components/CustomIcon';
import { useTranslation } from 'react-i18next';
interface BreadcrumbProps {
  title?: string;
  name?: 'eye' | 'pen';
}

export const Breadcrumb = ({ title, name }: BreadcrumbProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className={`${styles['root']}`}>
      <button onClick={onBack} className={styles['backButton']}>
        <CustomIcon name="chevron-left" />
        <span>{t('common.back')}</span>
      </button>
      {title && (
        <>
          <div className={styles.separator} />
          <div className={styles.leaf}>
            {name && <CustomIcon name={name} />}
            <span className={styles['title']}>{title}</span>
          </div>
        </>
      )}
    </div>
  );
};
