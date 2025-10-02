/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
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
import type { TranslateWithId, TFunc } from '../../types/common';
import { deprecate } from '../../prop-types/deprecate';

const getInstanceId = setupGetInstanceId();

const translationIds = {
  'carbon.table.row.expand': 'carbon.table.row.expand',
  'carbon.table.row.collapse': 'carbon.table.row.collapse',
  'carbon.table.all.expand': 'carbon.table.all.expand',
  'carbon.table.all.collapse': 'carbon.table.all.collapse',
  'carbon.table.all.select': 'carbon.table.all.select',
  'carbon.table.all.unselect': 'carbon.table.all.unselect',
  'carbon.table.row.select': 'carbon.table.row.select',
  'carbon.table.row.unselect': 'carbon.table.row.unselect',
} as const;

/**
 * Message IDs that will be passed to translateWithId().
 */
type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.table.all.expand']]: 'Expand all rows',
  [translationIds['carbon.table.all.collapse']]: 'Collapse all rows',
  [translationIds['carbon.table.row.expand']]: 'Expand current row',
  [translationIds['carbon.table.row.collapse']]: 'Collapse current row',
  [translationIds['carbon.table.all.select']]: 'Select all rows',
  [translationIds['carbon.table.all.unselect']]: 'Unselect all rows',
  [translationIds['carbon.table.row.select']]: 'Select row',
  [translationIds['carbon.table.row.unselect']]: 'Unselect row',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
type DataTableCells<T extends any[]> = { [K in keyof T]: DataTableCell<T[K]> };
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export interface DataTableRenderProps<RowType, ColTypes extends any[]> {
  /**
   * The headers for the table.
   */
  headers: DataTableHeader[];

  /**
   * The rows for the table.
   */
  rows: (DataTableRow<ColTypes> & RowType)[];

  /**
   * The rows that are currently selected.
   */
  selectedRows: (DataTableRow<ColTypes> & RowType)[];

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
    // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
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
    key: string;
  };

  /**
   * Handles input value changes.
   */
  onInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    defaultValue?: string
  ) => void;

  /**
   * Sorts the table by a specific header.
   */
  sortBy: (headerKey: string) => void;

  /**
   * Selects all rows.
   */
  selectAll: () => void;

  /**
   * Selects or deselects a specific row.
   */
  selectRow: (rowId: string) => void;

  /**
   * Expands or collapses a specific row.
   */
  expandRow: (rowId: string) => void;

  /**
   * Expands or collapses all rows.
   */
  expandAll: () => void;

  /**
   * Whether the table is using radio buttons for selection instead of
   * checkboxes.
   */
  radio: boolean | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
  /**
   * @deprecated Use `children` instead. This prop will be removed in
   * the next major version.
   *
   * https://www.patterns.dev/react/render-props-pattern/#children-as-a-function
   */
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
 * DataTable components are used to represent a collection of resources,
 * displaying a subset of their fields in columns, or headers. We prioritize
 * direct updates to the state of what we're rendering, so internally we
 * normalize the given data and then denormalize it at render time. Each part of
 * the DataTable is accessible through look-up by ID, and updating the state of
 * a single entity cascades updates to the consumer.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export const DataTable = <RowType, ColTypes extends any[]>(
  props: DataTableProps<RowType, ColTypes>
) => {
  type RenderProps = DataTableRenderProps<RowType, ColTypes>;
  const {
    children,
    filterRows = defaultFilterRows,
    headers,
    render,
    translateWithId: t = defaultTranslateWithId,
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
    // Initialize to collapsed. A value of `undefined` is treated as neutral.
    isExpandedAll: false,
  }));

  useEffect(() => {
    const nextRowIds = rows.map((row) => row.id);
    const nextHeaders = headers.map((header) => header.key);
    const hasRowIdsChanged = !isEqual(nextRowIds, state.rowIds);
    const currentHeaders = Array.from(
      new Set(Object.keys(state.cellsById).map((id) => id.split(':')[1]))
    );
    const hasHeadersChanged = !isEqual(nextHeaders, currentHeaders);
    const currentRows = state.rowIds.map((id) => {
      const row = state.rowsById[id];
      return {
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
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [headers, rows]);

  const getHeaderProps: RenderProps['getHeaderProps'] = ({
    header,
    onClick,
    isSortable = isSortableProp,
    ...rest
  }) => {
    const { sortDirection, sortHeaderKey } = state;
    const { key, slug, decorator } = header;

    return {
      ...rest,
      key,
      sortDirection,
      isSortable,
      isSortHeader: sortHeaderKey === key,
      slug,
      decorator,
      onClick: (event) => {
        const nextSortState = getNextSortState(props, state, {
          key,
        });

        setState((prev) => ({ ...prev, ...nextSortState }));

        if (onClick) {
          handleOnHeaderClick(onClick, {
            sortHeaderKey: key,
            sortDirection: nextSortState.sortDirection,
          })(event);
        }
      },
    };
  };

  const getExpandHeaderProps: RenderProps['getExpandHeaderProps'] = ({
    onClick,
    onExpand,
    ...rest
  } = {}) => {
    const { isExpandedAll, rowIds, rowsById } = state;
    const isExpanded =
      isExpandedAll || rowIds.every((id) => rowsById[id].isExpanded);
    const translationKey = isExpanded
      ? translationIds['carbon.table.all.collapse']
      : translationIds['carbon.table.all.expand'];
    const handlers = [handleOnExpandAll, onExpand];

    if (onClick) {
      handlers.push(handleOnExpandHeaderClick(onClick, { isExpanded }));
    }

    return {
      ...rest,
      'aria-label': t(translationKey),
      // Provide a string of all expanded row IDs, separated by a space.
      'aria-controls': rowIds.map((id) => `expanded-row-${id}`).join(' '),
      isExpanded,
      onExpand: composeEventHandlers(handlers),
    };
  };

  /**
   * Wraps the consumer's `onClick` with sorting metadata.
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
   * Wraps the consumer's `onClick` with sorting metadata.
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

  const getRowProps: RenderProps['getRowProps'] = ({
    row,
    onClick,
    ...rest
  }) => {
    const translationKey = row.isExpanded
      ? translationIds['carbon.table.row.collapse']
      : translationIds['carbon.table.row.expand'];
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

  const getExpandedRowProps: RenderProps['getExpandedRowProps'] = ({
    row,
    ...rest
  }) => {
    return {
      ...rest,
      id: `expanded-row-${row.id}`,
    };
  };

  /**
   * Gets the props associated with selection for a header or a row.
   */
  const getSelectionProps: RenderProps['getSelectionProps'] = ({
    onClick,
    row,
    ...rest
  } = {}) => {
    // If we're given a row, return the selection state values for that row
    if (row) {
      const translationKey = row.isSelected
        ? translationIds['carbon.table.row.unselect']
        : translationIds['carbon.table.row.select'];
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
    const selectedRowCount = selectedRows.length;
    const checked = rowCount > 0 && selectedRowCount === rowCount;
    const indeterminate =
      rowCount > 0 && selectedRowCount > 0 && selectedRowCount !== rowCount;
    const translationKey =
      checked || indeterminate
        ? translationIds['carbon.table.all.unselect']
        : translationIds['carbon.table.all.select'];

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

  const getToolbarProps: RenderProps['getToolbarProps'] = (props) => {
    const isSmall = size === 'xs' || size === 'sm';
    return {
      ...props,
      size: isSmall ? 'sm' : undefined,
    };
  };

  const getBatchActionProps: RenderProps['getBatchActionProps'] = (props) => {
    const { shouldShowBatchActions } = state;
    const selectedRowCount = selectedRows.length;

    return {
      onSelectAll: undefined,
      totalCount: state.rowIds.length,
      ...props,
      shouldShowBatchActions: shouldShowBatchActions && selectedRowCount > 0,
      totalSelected: selectedRowCount,
      onCancel: handleOnCancel,
    };
  };

  const getTableProps: RenderProps['getTableProps'] = () => {
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

  const getTableContainerProps: RenderProps['getTableContainerProps'] = () => {
    return {
      stickyHeader,
      useStaticWidth,
    };
  };

  const getCellProps: RenderProps['getCellProps'] = ({
    cell: { hasAILabelHeader, id },
    ...rest
  }) => {
    return {
      ...rest,
      hasAILabelHeader,
      key: id,
    };
  };

  /**
   * Selected row IDs, excluding disabled rows.
   */
  const selectedRows = state.rowIds.filter((id) => {
    const row = state.rowsById[id];

    return row.isSelected && !row.disabled;
  });

  const filteredRowIds =
    typeof state.filterInputValue === 'string'
      ? filterRows({
          cellsById: state.cellsById,
          getCellId,
          headers,
          inputValue: state.filterInputValue,
          rowIds: state.rowIds,
        })
      : state.rowIds;

  /**
   * Generates a prefix for table related IDs.
   */
  const getTablePrefix = () => `data-table-${instanceId}`;

  /**
   * Generates a new `rowsById` object with updated selection state.
   */
  const getUpdatedSelectionState = (
    initialState: DataTableState<ColTypes>,
    isSelected: boolean
  ): Pick<DataTableState<ColTypes>, 'rowsById'> => {
    const { rowIds } = initialState;
    const isFiltered = rowIds.length !== filteredRowIds.length;

    return {
      rowsById: rowIds.reduce<DataTableState<ColTypes>['rowsById']>(
        (acc, id) => {
          const row = { ...initialState.rowsById[id] };

          if (!row.disabled && (!isFiltered || filteredRowIds.includes(id))) {
            row.isSelected = isSelected;
          }

          // Local mutation for performance with large tables
          acc[id] = row;

          return acc;
        },
        {}
      ),
    };
  };

  /**
   * Handler for `onCancel` to hide the batch action toolbar and deselect all
   * rows.
   */
  const handleOnCancel = () => {
    setState((prev) => {
      return {
        ...prev,
        shouldShowBatchActions: false,
        ...getUpdatedSelectionState(prev, false),
      };
    });
  };

  /**
   * Handler for toggling the selection state of all rows.
   */
  const handleSelectAll = () => {
    setState((prev) => {
      const { rowsById } = prev;
      const isSelected = !Object.values(rowsById).filter(
        (row) => row.isSelected && !row.disabled
      ).length;

      return {
        ...prev,
        shouldShowBatchActions: isSelected,
        ...getUpdatedSelectionState(prev, isSelected),
      };
    });
  };

  /**
   * Handler for toggling selection state of a given row.
   */
  const handleOnSelectRow = (rowId: string) => () => {
    setState((prev) => {
      const row = prev.rowsById[rowId];

      if (radio) {
        // Deselect all radio buttons, then toggle the target row
        const rowsById = Object.entries(prev.rowsById).reduce<
          DataTableState<ColTypes>['rowsById']
        >((acc, [id, row]) => {
          acc[id] = { ...row, isSelected: false };

          return acc;
        }, {});

        return {
          ...prev,
          shouldShowBatchActions: false,
          rowsById: {
            ...rowsById,
            [rowId]: {
              ...rowsById[rowId],
              isSelected: !rowsById[rowId].isSelected,
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
        // Show batch action toolbar if selecting, or if there are other
        // selected rows remaining.
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

  const handleOnExpandAll = () => {
    setState((prev) => {
      const { rowIds, isExpandedAll } = prev;
      return {
        ...prev,
        isExpandedAll: !isExpandedAll,
        rowsById: rowIds.reduce<DataTableState<ColTypes>['rowsById']>(
          (acc, id) => {
            acc[id] = {
              ...prev.rowsById[id],
              isExpanded: !isExpandedAll,
            };

            return acc;
          },
          {}
        ),
      };
    });
  };

  /**
   * Transitions to the next sort state of the table.
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
   * Event handler for table filter input changes.
   */
  const handleOnInputValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    defaultValue?: string
  ) => {
    const value = defaultValue || event.target?.value;

    setState((prev) => ({ ...prev, filterInputValue: value }));
  };

  const renderProps: RenderProps = {
    // Data derived from state
    rows: denormalize(filteredRowIds, state.rowsById, state.cellsById),
    headers: headers,
    selectedRows: denormalize(selectedRows, state.rowsById, state.cellsById),

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
   * Pass in the children that will be rendered within the Table
   */
  children: PropTypes.node,

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
   * @deprecated Use `children` instead. This prop will be removed in
   * the next major version.
   *
   * https://www.patterns.dev/react/render-props-pattern/#children-as-a-function
   */
  render: deprecate(PropTypes.func),

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
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * If `true`, sets the table width to `auto` instead of `100%`.
   */
  useStaticWidth: PropTypes.bool,

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles: PropTypes.bool,
};
