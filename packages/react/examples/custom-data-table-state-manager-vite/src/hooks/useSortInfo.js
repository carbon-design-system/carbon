import { useCallback, useState } from 'react';
import {
  TABLE_SORT_CYCLE,
  TABLE_SORT_CYCLES,
  TABLE_SORT_DIRECTION,
} from '../misc';

/**
 * @param options The options.
 * @param [options.sortCycle=tri-states-from-ascending] The sorting cycle.
 * @param options.oldDirection The old sort direction.
 * @returns The next sort direction.
 */
const getNextSort = ({
  sortCycle = TABLE_SORT_CYCLE.TRI_STATES_FROM_ASCENDING,
  oldDirection,
}) => {
  if (!oldDirection) {
    throw new TypeError(
      'Table sort direction is not defined. ' +
        'Likely that `getNextSort()` is called with non-sorted table column, which should not happen in regular condition.'
    );
  }
  const directions = TABLE_SORT_CYCLES[sortCycle];
  const index = directions.indexOf(oldDirection);
  if (index < 0) {
    if (oldDirection === TABLE_SORT_DIRECTION.NONE) {
      // If the current sort direction is `none` in bi-state sort cycle,
      // returns the first one in the cycle
      return directions[0];
    }
    throw new RangeError(
      `The given sort state (${oldDirection}) is not found in the given table sort cycle: ${sortCycle}`
    );
  }
  return directions[(index + 1) % directions.length];
};

/**
 * @param {object} initialSortInfo The initial table sort info.
 * @returns {Array} The current table sort info and the setter for the table
 * sort info.
 */
const useSortInfo = (initialSortInfo) => {
  const [sortInfo, setSortInfo] = useState(initialSortInfo);
  const invokeSetSortInfo = useCallback(
    ({ columnId, sortCycle, oldDirection }) => {
      const direction = getNextSort({ sortCycle, oldDirection });
      if (direction === TABLE_SORT_DIRECTION.NONE && columnId !== 'name') {
        // Resets the sorting, given non-primary sorting column has got in
        //  non-sorting state
        setSortInfo(initialSortInfo);
      } else {
        // Sets the sorting as user desires
        setSortInfo({
          columnId,
          direction,
        });
      }
    },
    [initialSortInfo, setSortInfo]
  );
  return [sortInfo, invokeSetSortInfo];
};

export default useSortInfo;
