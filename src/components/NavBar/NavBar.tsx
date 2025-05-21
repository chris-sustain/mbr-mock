import styles from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { CustomLink } from '@components/CustomLink';

export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className={`${styles['root']}`}>
      <CustomLink path="HOME" type="nav">
        {t('common.page.search.link')}
      </CustomLink>
      <CustomLink path="NEW" type="nav">
        {t('common.page.create.link')}
      </CustomLink>
      <CustomLink path="VALIDATION" type="nav">
        {t('common.page.validation.link')}
      </CustomLink>
    </div>
  );
};
