import styles from './Pagination.module.scss';
import { PageList } from './PageList';
import { Page } from './Page';
import { calculatePaginationRange } from './utils';

const VISIBLE_PAGE_COUNT = 5; // Total number of page buttons to show at once

type IconName = 'double-chevron-left' | 'chevron-left' | 'chevron-right' | 'double-chevron-right';

interface NavigationButton {
  onClick: number;
  disabled: boolean;
  icon: IconName;
  ariaLabel: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  maxPages?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  maxPages = VISIBLE_PAGE_COUNT,
  onPageChange
}: PaginationProps) => {
  const { start, end } = calculatePaginationRange(currentPage, totalPages, maxPages);

  console.log('props', { currentPage, totalPages, isLoading, maxPages });

  const navigationButtons: NavigationButton[] = [
    {
      onClick: 1,
      disabled: currentPage === 1 || isLoading,
      icon: 'double-chevron-left',
      ariaLabel: 'First page'
    },
    {
      onClick: currentPage - 1,
      disabled: currentPage === 1 || isLoading,
      icon: 'chevron-left',
      ariaLabel: 'Previous page'
    },
    {
      onClick: currentPage + 1,
      disabled: currentPage === totalPages || isLoading,
      icon: 'chevron-right',
      ariaLabel: 'Next page'
    },
    {
      onClick: totalPages,
      disabled: currentPage === totalPages || isLoading,
      icon: 'double-chevron-right',
      ariaLabel: 'Last page'
    }
  ] as const;

  return (
    <div className={styles.pagination}>
      {navigationButtons.slice(0, 2).map((button, index) => (
        <Page
          key={`nav-${index}`}
          onClick={() => onPageChange(button.onClick)}
          disabled={button.disabled}
          icon={button.icon}
          ariaLabel={button.ariaLabel}
        />
      ))}
      <PageList
        currentPage={currentPage}
        isLoading={isLoading}
        onPageChange={onPageChange}
        start={start}
        end={end}
      />
      {navigationButtons.slice(2).map((button, index) => (
        <Page
          key={`nav-${index + 2}`}
          onClick={() => onPageChange(button.onClick)}
          disabled={button.disabled}
          icon={button.icon}
          ariaLabel={button.ariaLabel}
        />
      ))}
    </div>
  );
};
