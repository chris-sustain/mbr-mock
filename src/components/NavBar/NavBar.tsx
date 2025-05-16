import { NavLink } from 'react-router';
import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className={`${styles['root']}`}>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          classNames(styles['link'], {
            [styles['active']]: isActive,
            [styles['pending']]: isPending
          })
        }>
        {t('common.page.search.link')}
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive, isPending }) =>
          classNames(styles['link'], {
            [styles['active']]: isActive,
            [styles['pending']]: isPending
          })
        }>
        {t('common.page.create.link')}
      </NavLink>
    </div>
  );
};
