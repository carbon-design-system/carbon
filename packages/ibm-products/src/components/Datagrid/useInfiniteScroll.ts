/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback } from 'react';
import { debounce } from '../../global/js/utils/debounce';
import useParentDimensions from './useParentDimensions';
import useResizeTable from './useResizeTable';
import { DataGridState } from './types';
import { Hooks, TableInstance } from 'react-table';

const useInfiniteScroll = (hooks: Hooks) => {
  useParentDimensions(hooks);
  useResizeTable(hooks);

  const useInstance = (instance: TableInstance) => {
    const {
      isFetching,
      tableHeight,
      innerListRef,
      fetchMoreData,
      tableId,
      loadMoreThreshold,
    } = instance as DataGridState;
    let tableElement;
    if (typeof document !== 'undefined') {
      tableElement = document.querySelector(`#${tableId}`);
    }
    const totalTableHeight = tableHeight || tableElement?.clientHeight;

    const loadMoreThresholdValue =
      typeof loadMoreThreshold === 'number' ? loadMoreThreshold : 200;

    const emptyFetchData = () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchMore = useCallback(
      debounce(fetchMoreData || emptyFetchData, 3000),
      [fetchMoreData]
    );
    const onScroll = ({ scrollDirection, scrollOffset }) => {
      if (innerListRef && innerListRef.current) {
        if (
          !isFetching &&
          scrollDirection === 'forward' &&
          scrollOffset + totalTableHeight >=
            innerListRef.current.clientHeight - loadMoreThresholdValue
        ) {
          if (fetchMoreData) {
            fetchMore();
          }
        }
      }
    };

    Object.assign(instance, {
      onScroll,
      withVirtualScroll: true,
    });
  };

  hooks.useInstance.push(useInstance);
};

export default useInfiniteScroll;
