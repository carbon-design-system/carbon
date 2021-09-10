import { useState } from 'react';

/**
 * @param {number} initialStart The initial start row index, zero-based.
 * @param {number} initialPageSize The initial page size.
 * @param {number} count The total row count.
 * @returns {Array} The start row index, page size, the setter for the start
 * row index, the setter for the page size.
 */
const usePageInfo = (initialStart, initialPageSize, count) => {
  const [start, setStart] = useState(initialStart);
  const [pageSize, setPageSize] = useState(initialPageSize);
  // Copes with `start` going beyond the row count
  const adjustedStart =
    count === 0 || start < count
      ? start
      : Math.max(
          start - (Math.floor((start - count) / pageSize) + 1) * pageSize,
          0
        );
  return [adjustedStart, pageSize, setStart, setPageSize];
};

export default usePageInfo;
