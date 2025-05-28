export interface PaginationRange {
  start: number;
  end: number;
}
export const calculatePaginationRange = (
  currentPage: number,
  totalPages: number,
  maxPages: number
): PaginationRange => {
  const siblingPageCount = Math.floor(maxPages / 2);
  if (totalPages <= maxPages) {
    return { start: 1, end: totalPages };
  }

  // Case 1: Near start
  if (currentPage <= maxPages - siblingPageCount) {
    return { start: 1, end: maxPages };
  }

  // Case 2: Near end
  if (currentPage >= totalPages - siblingPageCount) {
    return {
      start: totalPages - (maxPages - 1),
      end: totalPages
    };
  }

  // Case 3: Middle
  return {
    start: currentPage - siblingPageCount,
    end: currentPage + siblingPageCount
  };
};
