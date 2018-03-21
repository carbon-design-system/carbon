import { initialSortState } from './sorting';
import normalize from '../tools/normalize';

/**
 * Helper to derive the next state from the given props and the
 * prevState. Potential future-facing API hook for React v17.
 *
 * Currently, it's being used as a way to normalize the incoming data that we
 * are receiving for rows
 */
const getDerivedStateFromProps = (props, prevState) => {
  const { rowIds, rowsById, cellsById } = normalize(props.rows, props.headers);
  return {
    rowIds,
    rowsById,
    cellsById,
    sortDirection: prevState.sortDirection || initialSortState,
    sortHeaderKey: prevState.sortHeaderKey || null,
    // Copy over rowIds so the reference doesn't mutate the stored
    // `initialRowOrder`
    initialRowOrder: rowIds.slice(),

    filterInputValue: null,

    // Optional state field to indicate whether a consumer should show a
    // batch actions menu
    shouldShowBatchActions: false,
  };
};

export default getDerivedStateFromProps;
