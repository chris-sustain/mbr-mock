import styles from './Pagination.module.scss';
import { CustomIcon } from '@src/components/CustomIcon';

const VISIBLE_PAGE_COUNT = 5; // Total number of page buttons to show at once
const SIBLING_PAGE_COUNT = 2; // Number of pages to show on each side of current page

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  maxPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  maxPages = VISIBLE_PAGE_COUNT,
  onPageChange
}: PaginationProps) => {
  const renderPages = () => {
    const pages = [];
    let start = 1;
    let end = totalPages;

    // Check if we need to implement page truncation (when total pages exceed our minimum threshold)
    if (totalPages > VISIBLE_PAGE_COUNT) {
      // Case 1: When we're near the start of the pagination
      // If current page is close to the beginning, show first 'maxPages' pages
      if (currentPage <= maxPages - SIBLING_PAGE_COUNT) {
        start = 1;
        end = maxPages;
      }
      // Case 2: When we're near the end of the pagination
      // If current page is close to the end, show last 'maxPages' pages
      else if (currentPage >= totalPages - SIBLING_PAGE_COUNT) {
        start = totalPages - (maxPages - 1);
        end = totalPages;
      }
      // Case 3: When we're in the middle of the pagination
      // Show a window of pages centered around the current page
      else {
        start = currentPage - SIBLING_PAGE_COUNT;
        end = currentPage + SIBLING_PAGE_COUNT;
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={isLoading}
          className={i === currentPage ? styles.currentPage : styles.pageButton}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isLoading}
        className={styles.iconButton}
        aria-label="First page">
        <CustomIcon name="double-chevron-left" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={styles.iconButton}
        aria-label="Previous page">
        <CustomIcon name="chevron-left" />
      </button>
      {renderPages()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={styles.iconButton}
        aria-label="Next page">
        <CustomIcon name="chevron-right" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        className={styles.iconButton}
        aria-label="Last page">
        <CustomIcon name="double-chevron-right" />
      </button>
    </div>
  );
};
