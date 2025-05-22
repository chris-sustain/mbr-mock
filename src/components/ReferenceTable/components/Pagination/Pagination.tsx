import styles from './Pagination.module.scss';
import { CustomIcon } from '@src/components/CustomIcon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange
}: PaginationProps) => {
  const renderPages = () => {
    const pages = [];
    let start = 1;
    let end = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        start = 1;
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      } else {
        start = currentPage - 2;
        end = currentPage + 2;
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
        {/* <DoubleChevronLeft /> */}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={styles.iconButton}
        aria-label="Previous page">
        <CustomIcon name="chevron-left" />
        {/* <ChevronLeft /> */}
      </button>
      {renderPages()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={styles.iconButton}
        aria-label="Next page">
        <CustomIcon name="chevron-right" />
        {/* <ChevronRight /> */}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        className={styles.iconButton}
        aria-label="Last page">
        <CustomIcon name="double-chevron-right" />
        {/* <DoubleChevronRight /> */}
      </button>
    </div>
  );
};
