import styles from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@src/router';
import { NavLink } from 'react-router';

export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className={`${styles['root']}`}>
      <NavLink to={PATHS.HOME} className={styles['link']}>
        {t('common.page.search.link')}
      </NavLink>
      <NavLink to={PATHS.NEW} className={styles['link']}>
        {t('common.page.create.link')}
      </NavLink>
      <NavLink to={PATHS.VALIDATION} className={styles['link']}>
        {t('common.page.validation.link')}
      </NavLink>
    </div>
  );
};
