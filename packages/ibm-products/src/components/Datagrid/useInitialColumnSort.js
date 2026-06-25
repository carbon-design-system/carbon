/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { getNewSortOrder } from './useSortableColumns';

export const useInitialColumnSort = (instance) => {
  const [hasInitialSort, setHasInitialSort] = useState(false);
  useEffect(() => {
    const { initialState, headers, onSort, isTableSortable } = instance;
    const { sortableColumn } = initialState;
    const foundSortedCol = headers.some((h) => h.isSorted);
    if (foundSortedCol || hasInitialSort || !isTableSortable) {
      return;
    }

    if (sortableColumn) {
      const { id: columnId, order } = sortableColumn;
      // prevents edge case where initial sort state of none actually starts out as ascending
      if (order !== 'ASC' && order !== 'DESC') {
        return;
      }
      const { newSortDesc, newOrder } = getNewSortOrder(order);
      onSort?.(columnId, newOrder);
      instance.toggleSortBy(columnId, newSortDesc, false);
      setHasInitialSort(true);
    }
  }, [instance, hasInitialSort]);
};
