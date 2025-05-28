import { CustomIcon } from '@src/components/CustomIcon';
import styles from './Pagination.module.scss';

interface PageProps {
  onClick: () => void;
  disabled: boolean;
  icon: 'double-chevron-left' | 'chevron-left' | 'chevron-right' | 'double-chevron-right';
  ariaLabel: string;
}

export const Page = ({ onClick, disabled, icon, ariaLabel }: PageProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.iconButton}
      aria-label={ariaLabel}>
      <CustomIcon name={icon} />
    </button>
  );
};
