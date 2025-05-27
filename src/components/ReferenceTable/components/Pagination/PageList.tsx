import styles from './Pagination.module.scss';
import type { PaginationRange } from './utils';

interface PageListProps extends PaginationRange {
  currentPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

interface PageButtonProps {
  pageNumber: number;
  isCurrentPage: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const PageButton = ({ pageNumber, isCurrentPage, isLoading, onClick }: PageButtonProps) => (
  <button
    key={pageNumber}
    onClick={onClick}
    disabled={isLoading}
    className={isCurrentPage ? styles.currentPage : styles.pageButton}
    aria-label={`Go to page ${pageNumber}`}
    aria-current={isCurrentPage ? 'page' : undefined}>
    {pageNumber}
  </button>
);

export const PageList = ({ currentPage, start, end, isLoading, onPageChange }: PageListProps) => {
  const pageNumbers = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <>
      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          pageNumber={pageNumber}
          isCurrentPage={pageNumber === currentPage}
          isLoading={isLoading}
          onClick={() => onPageChange(pageNumber)}
        />
      ))}
    </>
  );
};
