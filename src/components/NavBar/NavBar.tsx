import styles from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { CustomLink } from '@components/CustomLink';

export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className={`${styles['root']}`}>
      <CustomLink pathType="static" path="HOME" type="nav">
        {t('common.page.search.link')}
      </CustomLink>
      <CustomLink pathType="static" path="NEW" type="nav">
        {t('common.page.create.link')}
      </CustomLink>
      <CustomLink pathType="static" path="VALIDATION" type="nav">
        {t('common.page.validation.link')}
      </CustomLink>
    </div>
  );
};
