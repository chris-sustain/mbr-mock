import classNames from 'classnames';
import React from 'react';
import type { Key } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { PATHS } from '@src/router';

import { LanguageSelector } from '../LanguageSelector';

import styles from './NavBar.module.scss';

export const NavBar = () => {
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = React.useState<Key>('en');

  const navlinksParams = [
    { path: PATHS.HOME, label: t('common.page.search.link') },
    { path: PATHS.NEW, label: t('common.page.create.link') },
    { path: PATHS.VALIDATION, label: t('common.page.validation.link') }
  ];

  return (
    <div className={`${styles['root']}`}>
      <NavLink to={PATHS.HOME} className={styles['branding']}>
        <img src="/src/assets/MBDR_LogoLite.png" />
      </NavLink>
      {navlinksParams.map((navlinkParam, index) => (
        <NavLink
          key={`navbar-key-${index}`}
          to={navlinkParam.path}
          className={({ isActive }) =>
            classNames(styles['link'], {
              [styles['active']]: isActive
            })
          }>
          {navlinkParam.label}
        </NavLink>
      ))}
      <div className={styles['language-selector']}>
        <LanguageSelector
          selectedKey={currentLanguage}
          onSelectionChange={(selected) => setCurrentLanguage(selected)}
        />
      </div>
    </div>
  );
};
