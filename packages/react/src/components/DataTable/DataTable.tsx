/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import isEqual from 'react-fast-compare';
import getDerivedStateFromProps from './state/getDerivedStateFromProps';
import { getNextSortState, type SortRowFn } from './state/sorting';
import type { DataTableSortState } from './state/sortStates';
import { getCellId } from './tools/cells';
import denormalize from './tools/denormalize';
import { composeEventHandlers } from '../../tools/events';
import { defaultFilterRows } from './tools/filter';
import { setupGetInstanceId } from '../../tools/setupGetInstanceId';
import Table from './Table';
import TableActionList from './TableActionList';
import TableBatchAction from './TableBatchAction';
import TableBatchActions from './TableBatchActions';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableContainer from './TableContainer';
import TableDecoratorRow from './TableDecoratorRow';
import TableExpandHeader from './TableExpandHeader';
import TableExpandRow from './TableExpandRow';
import TableExpandedRow from './TableExpandedRow';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableSelectAll from './TableSelectAll';
import TableSelectRow from './TableSelectRow';
import TableSlugRow from './TableSlugRow';
import TableToolbar from './TableToolbar';
import TableToolbarAction from './TableToolbarAction';
import TableToolbarContent from './TableToolbarContent';
import TableToolbarSearch from './TableToolbarSearch';
import TableToolbarMenu from './TableToolbarMenu';
import { TranslateWithId } from '../../types/common';

const getInstanceId = setupGetInstanceId();

const translationKeys = {
  expandRow: 'carbon.table.row.expand',
  collapseRow: 'carbon.table.row.collapse',
  expandAll: 'carbon.table.all.expand',
  collapseAll: 'carbon.table.all.collapse',
  selectAll: 'carbon.table.all.select',
  unselectAll: 'carbon.table.all.unselect',
  selectRow: 'carbon.table.row.select',
  unselectRow: 'carbon.table.row.unselect',
} as const;

// TODO: All code comments in this file should be revisited for accuracy and
// clarity.

/**
 * Message ids that will be passed to translateWithId().
 */
type TranslationKey = (typeof translationKeys)[keyof typeof translationKeys];

const defaultTranslations: Record<TranslationKey, string> = {
  [translationKeys.expandAll]: 'Expand all rows',
  [translationKeys.collapseAll]: 'Collapse all rows',
  [translationKeys.expandRow]: 'Expand current row',
  [translationKeys.collapseRow]: 'Collapse current row',
  [translationKeys.selectAll]: 'Select all rows',
  [translationKeys.unselectAll]: 'Unselect all rows',
  [translationKeys.selectRow]: 'Select row',
  [translationKeys.unselectRow]: 'Unselect row',
};

const translateWithId: NonNullable<
  TranslateWithId<TranslationKey>['translateWithId']
> = (id) => defaultTranslations[id];

export type DataTableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DataTableCell<T> {
  id: string;
  value: T;
  isEditable: boolean;
  isEditing: boolean;
  isValid: boolean;
  errors: null | Error[];
  info: {
    header: string;
  };
  hasAILabelHeader?: boolean;
  hasDecoratorHeader?: boolean;
}

type DataTableCells<T extends any[]> = { [K in keyof T]: DataTableCell<T[K]> };

export interface DataTableRow<ColTypes extends any[]> {
  id: string;
  cells: DataTableCells<ColTypes>;
  disabled?: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
}

export interface DataTableHeader {
  key: string;
  header: ReactNode;
  slug?: ReactElement;
  decorator?: ReactElement;
}

export interface DataTableRenderProps<RowType, ColTypes extends any[]> {
  headers: DataTableHeader[];
  rows: (DataTableRow<ColTypes> & RowType)[];
  selectedRows: (DataTableRow<ColTypes> & RowType)[];

  // Prop accessors/getters
  getHeaderProps: (options: {
    header: DataTableHeader;
    isSortable?: boolean;
    onClick?: (
      event: MouseEvent<HTMLButtonElement>,
      sortState: { sortHeaderKey: string; sortDirection: DataTableSortState }
    ) => void;
    [key: string]: unknown;
  }) => {
    isSortable: boolean | undefined;
    isSortHeader: boolean;
    key: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    sortDirection: DataTableSortState;
    [key: string]: unknown;
  };
  getExpandHeaderProps: (options?: {
    onClick?: (
      event: MouseEvent<HTMLButtonElement>,
      expandState: { isExpanded?: boolean }
    ) => void;
    onExpand?: (event: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
  }) => {
    ['aria-label']: string;
    isExpanded: boolean;
    onExpand: (event: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
  };
  getRowProps: (options: {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ['aria-label']: string;
    disabled: boolean | undefined;
    isExpanded?: boolean;
    isSelected?: boolean;
    key: string;
    onExpand: (event: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
  };
  getExpandedRowProps: (options: {
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ['id']: string;
    [key: string]: unknown;
  };
  getSelectionProps: (options?: {
    onClick?: (
      event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
    ) => void;
    row?: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    'aria-label': string;
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
    id: string;
    indeterminate?: boolean;
    name: string;
    onSelect: (event: MouseEvent<HTMLInputElement>) => void;
    radio?: boolean | undefined;
    [key: string]: unknown;
  };
  getToolbarProps: (options?: { [key: string]: unknown }) => {
    size: 'sm' | undefined;
    [key: string]: unknown;
  };
  getBatchActionProps: (options?: { [key: string]: unknown }) => {
    onCancel: () => void;
    onSelectAll?: () => void | undefined;
    shouldShowBatchActions: boolean;
    totalCount: number;
    totalSelected: number;
    [key: string]: unknown;
  };
  getTableProps: () => {
    experimentalAutoAlign?: boolean;
    isSortable?: boolean;
    overflowMenuOnHover: boolean;
    size: DataTableSize;
    stickyHeader?: boolean;
    useStaticWidth?: boolean;
    useZebraStyles?: boolean;
  };
  getTableContainerProps: () => {
    stickyHeader?: boolean;
    useStaticWidth?: boolean;
  };
  getCellProps: (options: { cell: DataTableCell<ColTypes> }) => {
    [key: string]: unknown;
    hasAILabelHeader?: boolean;
    hasDecoratorHeader?: boolean;
  };

  // Custom event handlers
  onInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    defaultValue?: string
  ) => void;

  // Expose internal state change actions
  sortBy: (headerKey: string) => void;
  selectAll: () => void;
  selectRow: (rowId: string) => void;
  expandRow: (rowId: string) => void;
  expandAll: () => void;
  radio: boolean | undefined;
}

export interface DataTableProps<RowType, ColTypes extends any[]>
  extends TranslateWithId<TranslationKey> {
  children?: (
    renderProps: DataTableRenderProps<RowType, ColTypes>
  ) => ReactElement;
  experimentalAutoAlign?: boolean;
  filterRows?: (options: {
    cellsById: Record<string, DataTableCell<ColTypes>>;
    getCellId: (rowId: string, header: string) => string;
    headers: DataTableHeader[];
    inputValue: string;
    rowIds: string[];
  }) => string[];
  headers: DataTableHeader[];
  isSortable?: boolean;
  locale?: string;
  overflowMenuOnHover?: boolean;
  radio?: boolean;
  // TODO: Deprecate this prop.
  // https://github.com/carbon-design-system/carbon/pull/19659#discussion_r2150091428
  render?: (
    renderProps: DataTableRenderProps<RowType, ColTypes>
  ) => ReactElement;
  rows: Omit<DataTableRow<ColTypes>, 'cells'>[];
  size?: DataTableSize;
  sortRow?: SortRowFn;
  stickyHeader?: boolean;
  useStaticWidth?: boolean;
  useZebraStyles?: boolean;
}

interface DataTableState<ColTypes extends any[]> {
  cellsById: Record<string, DataTableCell<ColTypes>>;
  filterInputValue: string | null;
  initialRowOrder: string[];
  isExpandedAll: boolean;
  rowIds: string[];
  rowsById: Record<string, DataTableRow<ColTypes>>;
  shouldShowBatchActions: boolean;
  sortDirection: DataTableSortState;
  sortHeaderKey: string | null;
}

/**
 * Data Tables are used to represent a collection of resources, displaying a
 * subset of their fields in columns, or headers. We prioritize direct updates
 * to the state of what we're rendering, so internally we end up normalizing the
 * given data and then denormalizing it when rendering.
 *
 * As a result, each part of the DataTable is accessible through look-up by id,
 * and updating the state of the single entity will cascade updates to the
 * consumer.
 */
export const DataTable = <RowType, ColTypes extends any[]>(
  props: DataTableProps<RowType, ColTypes>
) => {
  type rp = DataTableRenderProps<RowType, ColTypes>;
  const {
    children,
    filterRows = defaultFilterRows,
    headers,
    render,
    translateWithId: t = translateWithId,
    size,
    isSortable: isSortableProp,
    useZebraStyles,
    useStaticWidth,
    stickyHeader,
    overflowMenuOnHover,
    experimentalAutoAlign,
    radio,
    rows,
  } = props;

  const instanceId = useMemo(() => getInstanceId(), []);

  const [state, setState] = useState<DataTableState<ColTypes>>(() => ({
    ...getDerivedStateFromProps(props, {}),
    isExpandedAll: false, // Start with collapsed state, treat `undefined` as neutral state
  }));

  useEffect(() => {
    const nextRowIds = rows.map((row) => row.id);
    const nextHeaders = headers.map((header) => header.key);
    const hasRowIdsChanged = !isEqual(nextRowIds, state.rowIds);
    const currentHeaders = Object.keys(state.cellsById).reduce<string[]>(
      (acc, cellId) => {
        const headerKey = cellId.split(':')[1];
        if (headerKey && !acc.includes(headerKey)) {
          acc.push(headerKey);
        }
        return acc;
      },
      []
    );
    const hasHeadersChanged = !isEqual(nextHeaders, currentHeaders);
    const currentRows = state.rowIds.map((id) => {
      const row = state.rowsById[id];
      return {
        // TODO: Investigate whether it be okay to just return `row`.
        id: row.id,
        disabled: row.disabled,
        isExpanded: row.isExpanded,
        isSelected: row.isSelected,
      };
    });
    const hasRowsChanged = !isEqual(rows, currentRows);

    if (hasRowIdsChanged || hasHeadersChanged || hasRowsChanged) {
      setState((prev) => getDerivedStateFromProps(props, prev));
    }
  }, [headers, rows]);

  /**
   * Get the props associated with the given header. Mostly used for adding in
   * sorting behavior.
   */
  const getHeaderProps: rp['getHeaderProps'] = ({
    header,
    onClick,
    isSortable = isSortableProp,
    ...rest
  }) => {
    const { sortDirection, sortHeaderKey } = state;
    return {
      ...rest,
      key: header.key,
      sortDirection,
      isSortable,
      isSortHeader: sortHeaderKey === header.key,
      slug: header.slug,
      decorator: header.decorator,
      onClick: (event) => {
        const nextSortState = getNextSortState(props, state, {
          key: header.key,
        });
        setState((prev) => ({ ...prev, ...nextSortState }));
        onClick &&
          handleOnHeaderClick(onClick, {
            sortHeaderKey: header.key,
            sortDirection: nextSortState.sortDirection,
          })(event);
      },
    };
  };

  /**
   * Get the props associated with the given expand header.
   */
  const getExpandHeaderProps: rp['getExpandHeaderProps'] = ({
    onClick,
    onExpand,
    ...rest
  } = {}) => {
    const { isExpandedAll, rowIds, rowsById } = state;
    const isExpanded =
      isExpandedAll || rowIds.every((id) => rowsById[id].isExpanded);
    const translationKey = isExpanded
      ? translationKeys.collapseAll
      : translationKeys.expandAll;
    return {
      ...rest,
      'aria-label': t(translationKey),
      // Provide a string of all the expanded row id's, separated by a space.
      'aria-controls': rowIds.map((id) => `expanded-row-${id}`).join(' '),
      isExpanded,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([
        handleOnExpandAll,
        onExpand,
        // TODO: Avoid passing `false` to this function.
        onClick &&
          handleOnExpandHeaderClick(onClick, {
            isExpanded,
          }),
      ]),
    };
  };

  /**
   * Decorate consumer's `onClick` event handler with sort parameters
   */
  const handleOnHeaderClick = (
    onClick: (
      event: MouseEvent<HTMLButtonElement>,
      sortParams: { sortHeaderKey: string; sortDirection: DataTableSortState }
    ) => void,
    sortParams: { sortHeaderKey: string; sortDirection: DataTableSortState }
  ) => {
    return (event: MouseEvent<HTMLButtonElement>) => onClick(event, sortParams);
  };

  /**
   * Decorate consumer's `onClick` event handler with expand parameters
   */
  const handleOnExpandHeaderClick = (
    onClick: (
      event: MouseEvent<HTMLButtonElement>,
      expandParams: { isExpanded: boolean }
    ) => void,
    expandParams: { isExpanded: boolean }
  ) => {
    return (event: MouseEvent<HTMLButtonElement>) =>
      onClick(event, expandParams);
  };

  /**
   * Get the props associated with the given row. Mostly used for expansion.
   */
  const getRowProps: rp['getRowProps'] = ({ row, onClick, ...rest }) => {
    const translationKey = row.isExpanded
      ? translationKeys.collapseRow
      : translationKeys.expandRow;
    return {
      ...rest,
      key: row.id,
      onClick,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([handleOnExpandRow(row.id), onClick]),
      isExpanded: row.isExpanded,
      'aria-label': t(translationKey),
      'aria-controls': `expanded-row-${row.id}`,
      isSelected: row.isSelected,
      disabled: row.disabled,
    };
  };

  /**
   * Get the props associated with an expanded row
   */
  const getExpandedRowProps: rp['getExpandedRowProps'] = ({ row, ...rest }) => {
    return {
      ...rest,
      id: `expanded-row-${row.id}`,
    };
  };

  /**
   * Gets the props associated with selection for a header or a row, where
   * applicable. Most often used to indicate selection status of the table or
   * for a specific row.
   */
  const getSelectionProps: rp['getSelectionProps'] = ({
    onClick,
    row,
    ...rest
  } = {}) => {
    // If we're given a row, return the selection state values for that row
    if (row) {
      const translationKey = row.isSelected
        ? translationKeys.unselectRow
        : translationKeys.selectRow;
      return {
        ...rest,
        checked: row.isSelected,
        onSelect: composeEventHandlers([handleOnSelectRow(row.id), onClick]),
        id: `${getTablePrefix()}__select-row-${row.id}`,
        name: `select-row-${instanceId}`,
        'aria-label': t(translationKey),
        disabled: row.disabled,
        radio,
      };
    }

    // Otherwise, we're working on `TableSelectAll` which handles toggling the
    // selection state of all rows.
    const rowCount = state.rowIds.length;
    const selectedRowCount = getSelectedRows().length;
    const checked = rowCount > 0 && selectedRowCount === rowCount;
    const indeterminate =
      rowCount > 0 && selectedRowCount > 0 && selectedRowCount !== rowCount;
    const translationKey =
      checked || indeterminate
        ? translationKeys.unselectAll
        : translationKeys.selectAll;

    return {
      ...rest,
      'aria-label': t(translationKey),
      checked,
      id: `${getTablePrefix()}__select-all`,
      indeterminate,
      name: `select-all-${instanceId}`,
      onSelect: composeEventHandlers([handleSelectAll, onClick]),
    };
  };

  const getToolbarProps: rp['getToolbarProps'] = (props) => {
    const isSmall = size === 'xs' || size === 'sm';
    return {
      ...props,
      size: isSmall ? 'sm' : undefined,
    };
  };

  const getBatchActionProps: rp['getBatchActionProps'] = (props) => {
    const { shouldShowBatchActions } = state;
    const totalSelected = getSelectedRows().length;
    return {
      onSelectAll: undefined,
      totalCount: state.rowIds.length || 0,
      ...props,
      shouldShowBatchActions: shouldShowBatchActions && totalSelected > 0,
      totalSelected,
      onCancel: handleOnCancel,
    };
  };

  const getTableProps: rp['getTableProps'] = () => {
    return {
      useZebraStyles,
      size: size ?? 'lg',
      isSortable: isSortableProp,
      useStaticWidth,
      stickyHeader,
      overflowMenuOnHover: overflowMenuOnHover ?? false,
      experimentalAutoAlign,
    };
  };

  const getTableContainerProps: rp['getTableContainerProps'] = () => {
    return {
      stickyHeader,
      useStaticWidth,
    };
  };

  // TODO: `getHeaderProps` and `getRowProps` return `key` props. Would it be
  // beneficial for this function to also return a `key` prop?
  /**
   * Get the props associated with the given table cell.
   */
  const getCellProps: rp['getCellProps'] = ({
    cell: { hasAILabelHeader, hasDecoratorHeader },
    ...rest
  }) => {
    return {
      ...rest,
      hasAILabelHeader,
      hasDecoratorHeader,
    };
  };

  /**
   * Helper utility to get all the currently selected rows
   *
   * @returns the array of rowIds that are currently selected
   */
  const getSelectedRows = () =>
    state.rowIds.filter((id) => {
      const row = state.rowsById[id];
      return row.isSelected && !row.disabled;
    });

  /**
   * Helper utility to get all of the available rows after applying the filter
   *
   * @returns the array of rowIds that are currently included through the filter
   */
  const getFilteredRowIds = () => {
    const filteredRowIds =
      typeof state.filterInputValue === 'string'
        ? filterRows({
            rowIds: state.rowIds,
            headers: headers,
            cellsById: state.cellsById,
            inputValue: state.filterInputValue,
            getCellId,
          })
        : state.rowIds;
    // TODO: Use strict equality check.
    if (filteredRowIds.length == 0) {
      return [];
    }
    return filteredRowIds;
  };

  /**
   * Helper for getting the table prefix for elements that require an
   * `id` attribute that is unique.
   */
  const getTablePrefix = () => `data-table-${instanceId}`;

  /**
   * Helper for toggling all selected items in a state. Does not call
   * setState, so use it when setting state.
   *
   * @returns object to put into this.setState (use spread operator)
   */
  const setAllSelectedState = (
    initialState: DataTableState<ColTypes>,
    isSelected: boolean,
    filteredRowIds: string[]
  ): Pick<DataTableState<ColTypes>, 'rowsById'> => {
    const { rowIds } = initialState;
    // TODO: Use strict inequality check.
    const isFiltered = rowIds.length != filteredRowIds.length;
    return {
      // TODO: Should the `reduce` be typed with `<Record<string,
      // DataTableRow<ColTypes>>>`?
      rowsById: rowIds.reduce((acc, id) => {
        const row = { ...initialState.rowsById[id] };
        if (!row.disabled && (!isFiltered || filteredRowIds.includes(id))) {
          row.isSelected = isSelected;
        }
        acc[id] = row; // Local mutation for performance with large tables
        return acc;
      }, {}),
    };
  };

  /**
   * Handler for the `onCancel` event to hide the batch action bar and
   * deselect all selected rows
   */
  const handleOnCancel = () => {
    setState((prev) => {
      return {
        ...prev,
        shouldShowBatchActions: false,
        ...setAllSelectedState(prev, false, getFilteredRowIds()),
      };
    });
  };

  /**
   * Handler for toggling the selection state of all rows in the database
   */
  const handleSelectAll = () => {
    setState((prev) => {
      const filteredRowIds = getFilteredRowIds();
      const { rowsById } = prev;
      const isSelected = !(
        Object.values(rowsById).filter((row) => row.isSelected && !row.disabled)
          .length > 0
      );
      return {
        ...prev,
        shouldShowBatchActions: isSelected,
        ...setAllSelectedState(prev, isSelected, filteredRowIds),
      };
    });
  };

  /**
   * Handler for toggling the selection state of a given row.
   */
  const handleOnSelectRow = (rowId: string) => () => {
    setState((prev) => {
      const row = prev.rowsById[rowId];
      if (radio) {
        // TODO:
        // 1. Should the `reduce` be typed with `<Record<string,
        // DataTableRow<ColTypes>>>`?
        // 2. Add better parameter names. Use `acc` and `row`.
        //
        // deselect all radio buttons
        const rowsById = Object.entries(prev.rowsById).reduce((p, c) => {
          const [key, val] = c;
          val.isSelected = false;
          p[key] = val;
          return p;
        }, {});
        return {
          ...prev,
          shouldShowBatchActions: false,
          rowsById: {
            ...rowsById,
            [rowId]: {
              ...row,
              isSelected: !row.isSelected,
            },
          },
        };
      }
      const selectedRows = prev.rowIds.filter(
        (id) => prev.rowsById[id].isSelected
      ).length;
      // Predict the length of the selected rows after this change occurs
      const selectedRowsCount = !row.isSelected
        ? selectedRows + 1
        : selectedRows - 1;
      return {
        ...prev,
        // Basic assumption here is that we want to show the batch action bar if
        // the row is being selected. If it's being unselected, then see if we
        // have a non-zero number of selected rows that batch actions could
        // still apply to
        shouldShowBatchActions: !row.isSelected || selectedRowsCount > 0,
        rowsById: {
          ...prev.rowsById,
          [rowId]: {
            ...row,
            isSelected: !row.isSelected,
          },
        },
      };
    });
  };

  /**
   * Handler for toggling the expansion state of a given row.
   */
  const handleOnExpandRow = (rowId: string) => () => {
    setState((prev) => {
      const row = prev.rowsById[rowId];
      const { isExpandedAll } = prev;
      return {
        ...prev,
        isExpandedAll: row.isExpanded ? false : isExpandedAll,
        rowsById: {
          ...prev.rowsById,
          [rowId]: {
            ...row,
            isExpanded: !row.isExpanded,
          },
        },
      };
    });
  };

  /**
   * Handler for changing the expansion state of all rows.
   */
  const handleOnExpandAll = () => {
    setState((prev) => {
      const { rowIds, isExpandedAll } = prev;
      return {
        ...prev,
        isExpandedAll: !isExpandedAll,
        // TODO: Add generic to `reduce`.
        rowsById: rowIds.reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              ...prev.rowsById[id],
              isExpanded: !isExpandedAll,
            },
          }),
          {}
        ),
      };
    });
  };

  /**
   * Handler for transitioning to the next sort state of the table
   *
   * @param headerKey - The field for the header that we are sorting by.
   */
  const handleSortBy = (headerKey: string) => () => {
    setState((prev) => {
      const sortState = getNextSortState(props, prev, { key: headerKey });
      return {
        ...prev, // Preserve ALL existing state
        ...sortState, // Then apply only the sorting changes
      };
    });
  };

  /**
   * Event handler for transitioning input value state changes for the table
   * filter component.
   */
  const handleOnInputValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    defaultValue?: string
  ) => {
    if (event.target) {
      setState((prev) => ({ ...prev, filterInputValue: event.target.value }));
    }

    if (defaultValue) {
      setState((prev) => ({ ...prev, filterInputValue: defaultValue }));
    }
  };

  // TODO: Could getFilteredRowIds be used here?
  const filteredRowIds =
    typeof state.filterInputValue === 'string'
      ? filterRows({
          rowIds: state.rowIds,
          headers,
          cellsById: state.cellsById,
          inputValue: state.filterInputValue,
          getCellId,
        })
      : state.rowIds;
  const renderProps: rp = {
    // Data derived from state
    rows: denormalize(filteredRowIds, state.rowsById, state.cellsById),
    headers: headers,
    selectedRows: denormalize(
      getSelectedRows(),
      state.rowsById,
      state.cellsById
    ),

    // Prop accessors/getters
    getHeaderProps,
    getExpandHeaderProps,
    getRowProps,
    getExpandedRowProps,
    getSelectionProps,
    getToolbarProps,
    getBatchActionProps,
    getTableProps,
    getTableContainerProps,
    getCellProps,

    // Custom event handlers
    onInputChange: handleOnInputValueChange,

    // Expose internal state change actions
    sortBy: (headerKey) => handleSortBy(headerKey)(),
    selectAll: handleSelectAll,
    selectRow: (rowId) => handleOnSelectRow(rowId)(),
    expandRow: (rowId) => handleOnExpandRow(rowId)(),
    expandAll: handleOnExpandAll,
    radio: radio,
  };

  if (typeof render !== 'undefined') {
    return render(renderProps);
  }

  if (typeof children !== 'undefined') {
    return children(renderProps);
  }

  return null;
};

DataTable.translationKeys = Object.values(translationKeys);
DataTable.Table = Table;
DataTable.TableActionList = TableActionList;
DataTable.TableBatchAction = TableBatchAction;
DataTable.TableBatchActions = TableBatchActions;
DataTable.TableBody = TableBody;
DataTable.TableCell = TableCell;
DataTable.TableContainer = TableContainer;
DataTable.TableDecoratorRow = TableDecoratorRow;
DataTable.TableExpandHeader = TableExpandHeader;
DataTable.TableExpandRow = TableExpandRow;
DataTable.TableExpandedRow = TableExpandedRow;
DataTable.TableHead = TableHead;
DataTable.TableHeader = TableHeader;
DataTable.TableRow = TableRow;
DataTable.TableSelectAll = TableSelectAll;
DataTable.TableSelectRow = TableSelectRow;
DataTable.TableSlugRow = TableSlugRow;
DataTable.TableToolbar = TableToolbar;
DataTable.TableToolbarAction = TableToolbarAction;
DataTable.TableToolbarContent = TableToolbarContent;
DataTable.TableToolbarSearch = TableToolbarSearch;
DataTable.TableToolbarMenu = TableToolbarMenu;

DataTable.propTypes = {
  /**
   * Experimental property. Allows table to align cell contents to the top if there is text wrapping in the content. Might have performance issues, intended for smaller tables
   */
  experimentalAutoAlign: PropTypes.bool,

  /**
   * Optional hook to manually control filtering of the rows from the
   * TableToolbarSearch component
   */
  filterRows: PropTypes.func,

  /**
   * The `headers` prop represents the order in which the headers should
   * appear in the table. We expect an array of objects to be passed in, where
   * `key` is the name of the key in a row object, and `header` is the name of
   * the header.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
    })
  ).isRequired,

  /**
   * Specify whether the table should be able to be sorted by its headers
   */
  isSortable: PropTypes.bool,

  /**
   * Provide a string for the current locale
   */
  locale: PropTypes.string,

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover: PropTypes.bool,

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio: PropTypes.bool,

  /**
   * The `rows` prop is where you provide us with a list of all the rows that
   * you want to render in the table. The only hard requirement is that this
   * is an array of objects, and that each object has a unique `id` field
   * available on it.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      isSelected: PropTypes.bool,
      isExpanded: PropTypes.bool,
    })
  ).isRequired,

  /**
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * Optional hook to manually control sorting of the rows.
   */
  sortRow: PropTypes.func,

  /**
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  stickyHeader: PropTypes.bool,

  /**
   * Optional method that takes in a message id and returns an
   * internationalized string. See `DataTable.translationKeys` for all
   * available message ids.
   */
  translateWithId: PropTypes.func,

  /**
   * `false` If true, will use a width of 'auto' instead of 100%
   */
  useStaticWidth: PropTypes.bool,

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles: PropTypes.bool,
};
