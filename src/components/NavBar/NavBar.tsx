import styles from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { MySelect } from '../LanguageSelector/MySelect';
import type {Key} from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';
import React from 'react'
import { PATHS } from '@src/router';
import { NavLink } from 'react-router';
import classNames from 'classnames';

export const NavBar = () => {

  const { t } = useTranslation();

  let [animal, setAnimal] = React.useState<Key>("en");

  const navlinksParams = [
    {path: PATHS.HOME, label: t('common.page.search.link')},
    {path: PATHS.NEW, label: t('common.page.create.link')},
    {path: PATHS.VALIDATION, label: t('common.page.validation.link')}
  ] 

  const options = [
    { code: 'en', icon: <img src='/src/assets/icons/uk.svg' height={24} width={24}/>},
    { code: 'fr', icon: <img src='/src/assets/icons/france.svg' height={24} width={24}/>},
    { code: 'es', icon: <img src='/src/assets/icons/spain.svg' height={24} width={24}/> },
    { code: 'br', icon: <img src='/src/assets/icons/brazil.svg' height={24} width={24}/> },
  ];

  return (
    <div className={`${styles['root']}`}>
      <div className={styles['branding']}>
        <img src='/src/assets/MBDR_LogoLite.png'/>
      </div>
      {navlinksParams.map((navlinkParam) => 
        <NavLink 
          to={navlinkParam.path}
          className={({ isActive }) =>
            classNames(styles['link'], {
              [styles['active']]: isActive,
          })}
        >
          {navlinkParam.label}
        </NavLink>
      )}
      <div className={styles['language-switcher']}>
        <MySelect
          items={options}
          selectedKey={animal}
          onSelectionChange={selected => {setAnimal(selected); console.log('selected', selected)}}>
          {item => <ListBoxItem id={item.code}>{item.icon}</ListBoxItem>}
        </MySelect>
      </div>
    </div>
  );
};
