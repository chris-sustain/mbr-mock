import { NavLink } from 'react-router';
import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector';
import { MyItem, MySelect } from '../LanguageSelector/MySelect';
import type {Key} from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';
import React from 'react'

export const NavBar = () => {

  let options = [
    { code: 'en', icon: <img src='/src/assets/icons/uk.svg' height={24} width={24}/>},
    { code: 'fr', icon: <img src='/src/assets/icons/france.svg' height={24} width={24}/>},
    { code: 'es', icon: <img src='/src/assets/icons/spain.svg' height={24} width={24}/> },
    { code: 'br', icon: <img src='/src/assets/icons/brazil.svg' height={24} width={24}/> },
  ];
  let [animal, setAnimal] = React.useState<Key>("en");
  const { t } = useTranslation();
  return (
    <div className={styles['root']}>
      <div className={styles['branding']}>
        <img src='/src/assets/MBDR_LogoLite.png'/>
      </div>
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
      <div className={styles['language-switcher']}>
        {/* <LanguageSelector defaultLanguage='fr' onLanguageChange={(lang) => {console.log('lang', lang)}}/> */}

        <MySelect
          // label="Pick an animal (controlled)"
          items={options}
          selectedKey={animal}
          onSelectionChange={selected => {setAnimal(selected); console.log('selected', selected)}}>
          {item => <ListBoxItem id={item.code}>{item.icon}</ListBoxItem>}
        </MySelect>
        
      </div>
    </div>
  );
};
