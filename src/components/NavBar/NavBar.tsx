import styles from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { CustomLink } from '@components/CustomLink';
import { PATHS } from '@src/router';

export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className={`${styles['root']}`}>
      <CustomLink pathType="static" path={PATHS.HOME as keyof typeof PATHS} type="nav">
        {t('common.page.search.link')}
      </CustomLink>
      <CustomLink pathType="static" path={PATHS.NEW as keyof typeof PATHS} type="nav">
        {t('common.page.create.link')}
      </CustomLink>
      <CustomLink pathType="static" path={PATHS.VALIDATION as keyof typeof PATHS} type="nav">
        {t('common.page.validation.link')}
      </CustomLink>
    </div>
  );
};
