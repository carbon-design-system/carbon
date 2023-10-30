/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import isEqual from 'lodash.isequal';
import getDerivedStateFromProps from './state/getDerivedStateFromProps';
import { getNextSortState } from './state/sorting';
import type { DataTableSortState } from './state/sortStates';
import { getCellId } from './tools/cells';
import denormalize from './tools/denormalize';
import { composeEventHandlers } from '../../tools/events';
import { defaultFilterRows } from './tools/filter';
import setupGetInstanceId from './tools/instanceId';
import Table from './Table';
import TableActionList from './TableActionList';
import TableBatchAction from './TableBatchAction';
import TableBatchActions from './TableBatchActions';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableContainer from './TableContainer';
import TableExpandHeader from './TableExpandHeader';
import TableExpandRow from './TableExpandRow';
import TableExpandedRow from './TableExpandedRow';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableSelectAll from './TableSelectAll';
import TableSelectRow from './TableSelectRow';
import TableToolbar from './TableToolbar';
import TableToolbarAction from './TableToolbarAction';
import TableToolbarContent from './TableToolbarContent';
import TableToolbarSearch from './TableToolbarSearch';
import TableToolbarMenu from './TableToolbarMenu';

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
};

const defaultTranslations = {
  [translationKeys.expandAll]: 'Expand all rows',
  [translationKeys.collapseAll]: 'Collapse all rows',
  [translationKeys.expandRow]: 'Expand current row',
  [translationKeys.collapseRow]: 'Collapse current row',
  [translationKeys.selectAll]: 'Select all rows',
  [translationKeys.unselectAll]: 'Unselect all rows',
  [translationKeys.selectRow]: 'Select row',
  [translationKeys.unselectRow]: 'Unselect row',
};

const translateWithId = (id) => defaultTranslations[id];

export type DataTableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DataTableCell<T> {
  id: string;
  value: T;
  isEditable: boolean;
  isEditing: boolean;
  isValid: boolean;
  errors: null | Array<Error>;
  info: {
    header: string;
  };
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
  header: React.ReactNode;
}

export interface DataTableRenderProps<RowType, ColTypes extends any[]> {
  headers: Array<DataTableHeader>;
  rows: Array<DataTableRow<ColTypes> & RowType>;
  selectedRows: Array<DataTableRow<ColTypes> & RowType>;

  // Prop accessors/getters
  getHeaderProps: (getHeaderPropsArgs: {
    header: DataTableHeader;
    isSortable?: boolean;
    onClick?: (
      e: React.MouseEvent,
      sortState: { sortHeaderKey: string; sortDirection: DataTableSortState }
    ) => void;
    [key: string]: unknown;
  }) => {
    isSortable: boolean | undefined;
    isSortHeader: boolean;
    key: string;
    onClick: (e: MouseEvent) => void;
    sortDirection: DataTableSortState;
    [key: string]: unknown;
  };
  getExpandHeaderProps: (getExpandHeaderPropsArgs?: {
    onClick?: (e: MouseEvent, expandState: { isExpanded?: boolean }) => void;
    onExpand?: (e: MouseEvent) => void;
    [key: string]: unknown;
  }) => {
    ariaLabel: string; // TODO Remove in v12
    ['aria-label']: string;
    isExpanded: boolean;
    onExpand: (e: MouseEvent) => void;
    [key: string]: unknown;
  };
  getRowProps: (getRowPropsArgs: {
    onClick?: (e: MouseEvent) => void;
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ariaLabel: string; // TODO Remove in v12
    ['aria-label']: string;
    disabled: boolean | undefined;
    isExpanded?: boolean;
    isSelected?: boolean;
    key: string;
    onExpand: (e: MouseEvent) => void;
    [key: string]: unknown;
  };
  getExpandedRowProps: (getExpandedRowPropsArgs: {
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ['id']: string;
    [key: string]: unknown;
  };
  getSelectionProps: (getSelectionPropsArgs: {
    onClick?: (e: MouseEvent) => void;
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ariaLabel: string;
    checked: boolean | undefined;
    disabled?: boolean | undefined;
    id: string;
    indeterminate?: boolean;
    name: string;
    onSelect: (e: MouseEvent) => void;
    radio?: boolean | null;
    [key: string]: unknown;
  };
  getToolbarProps: (getToolbarPropsArgs?: { [key: string]: unknown }) => {
    size: 'sm' | undefined;
    [key: string]: unknown;
  };
  getBatchActionProps: (getBatchActionPropsArgs?: {
    [key: string]: unknown;
  }) => {
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

  // Custom event handlers
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
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

export interface DataTableProps<RowType, ColTypes extends any[]> {
  children?: (
    renderProps: DataTableRenderProps<RowType, ColTypes>
  ) => React.ReactElement;
  experimentalAutoAlign?: boolean;
  filterRows?: (filterRowsArgs: {
    cellsById: Record<string, DataTableCell<ColTypes>>;
    getCellId: (rowId: string, header: string) => string;
    headers: Array<DataTableHeader>;
    inputValue: string;
    rowIds: Array<string>;
  }) => Array<string>;
  headers: Array<DataTableHeader>;
  isSortable?: boolean;
  locale?: string;
  overflowMenuOnHover?: boolean;
  radio?: boolean;
  render?: (
    renderProps: DataTableRenderProps<RowType, ColTypes>
  ) => React.ReactElement;
  rows: Array<Omit<DataTableRow<ColTypes>, 'cells'>>;
  size?: DataTableSize;
  sortRow?: (
    cellA: DataTableCell<any>,
    cellB: DataTableCell<any>,
    sortRowOptions: {
      sortDirection: DataTableSortState;
      sortStates: Record<DataTableSortState, DataTableSortState>;
      locale: string;
    }
  ) => number;
  stickyHeader?: boolean;
  translateWithId?: (id: string) => string;
  useStaticWidth?: boolean;
  useZebraStyles?: boolean;
}

interface DataTableState<ColTypes extends any[]> {
  cellsById: Record<string, DataTableCell<ColTypes>>;
  filterInputValue: string | null;
  initialRowOrder: Array<string>;
  isExpandedAll: boolean;
  rowIds: Array<string>;
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
class DataTable<RowType, ColTypes extends any[]> extends React.Component<
  DataTableProps<RowType, ColTypes>,
  DataTableState<ColTypes>
> {
  instanceId: number;

  static propTypes = {
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

  static translationKeys = Object.values(translationKeys);

  // Static properties for sub-components
  static Table: typeof Table;
  static TableActionList: typeof TableActionList;
  static TableBatchAction: typeof TableBatchAction;
  static TableBatchActions: typeof TableBatchActions;
  static TableBody: typeof TableBody;
  static TableCell: typeof TableCell;
  static TableContainer: typeof TableContainer;
  static TableExpandHeader: typeof TableExpandHeader;
  static TableExpandRow: typeof TableExpandRow;
  static TableExpandedRow: typeof TableExpandedRow;
  static TableHead: typeof TableHead;
  static TableHeader: typeof TableHeader;
  static TableRow: typeof TableRow;
  static TableSelectAll: typeof TableSelectAll;
  static TableSelectRow: typeof TableSelectRow;
  static TableToolbar: typeof TableToolbar;
  static TableToolbarAction: typeof TableToolbarAction;
  static TableToolbarContent: typeof TableToolbarContent;
  static TableToolbarSearch: typeof TableToolbarSearch;
  static TableToolbarMenu: typeof TableToolbarMenu;

  constructor(props) {
    super(props);
    this.state = {
      ...getDerivedStateFromProps(props, {}),
      isExpandedAll: false, // Start with collapsed state, treat `undefined` as neutral state
    };
    this.instanceId = getInstanceId();
  }

  // if state needs to be updated then wait for only update after state is finished
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      const nextRowIds = nextProps.rows.map((row) => row.id);
      const rowIds = this.props.rows.map((row) => row.id);

      if (!isEqual(nextRowIds, rowIds)) {
        this.setState((state) => getDerivedStateFromProps(this.props, state));
        return false;
      }

      const nextHeaders = nextProps.headers.map((header) => header.key);
      const headers = this.props.headers.map((header) => header.key);

      if (!isEqual(nextHeaders, headers)) {
        this.setState((state) => getDerivedStateFromProps(this.props, state));
        return false;
      }

      if (!isEqual(nextProps.rows, this.props.rows)) {
        this.setState((state) => getDerivedStateFromProps(this.props, state));
        return false;
      }
    }
    return true;
  }

  /**
   * Get the props associated with the given header. Mostly used for adding in
   * sorting behavior.
   *
   * @param {object} config
   * @param {string} config.header the header we want the props for
   * @param {Function} config.onClick a custom click handler for the header
   * @param {boolean} config.isSortable
   * @returns {object}
   */
  getHeaderProps = ({
    header,
    onClick,
    isSortable = this.props.isSortable,
    ...rest
  }: {
    header: DataTableHeader;
    onClick?: (
      e: React.MouseEvent,
      sortState: { sortHeaderKey: string; sortDirection: DataTableSortState }
    ) => void;
    isSortable?: boolean;
    [key: string]: unknown;
  }) => {
    const { sortDirection, sortHeaderKey } = this.state;
    return {
      ...rest,
      key: header.key,
      sortDirection,
      isSortable,
      isSortHeader: sortHeaderKey === header.key,
      onClick: (event) => {
        const nextSortState = getNextSortState(this.props, this.state, {
          key: header.key,
        });
        this.setState(nextSortState, () => {
          onClick &&
            this.handleOnHeaderClick(onClick, {
              sortHeaderKey: header.key,
              sortDirection: nextSortState.sortDirection,
            })(event);
        });
      },
    };
  };

  /**
   * Get the props associated with the given expand header.
   *
   * @param {object} config
   * @param {Function} config.onClick a custom click handler for the expand header
   * @param {Function} config.onExpand a custom click handler called when header is expanded
   * @returns {object}
   */
  getExpandHeaderProps = (
    { onClick, onExpand, ...rest } = {} as {
      onClick?: (e: MouseEvent, expandState: { isExpanded: boolean }) => void;
      onExpand?: (e: MouseEvent) => void;
      [key: string]: unknown;
    }
  ) => {
    const { translateWithId: t = translateWithId } = this.props;
    const { isExpandedAll, rowIds, rowsById } = this.state;
    const isExpanded =
      isExpandedAll || rowIds.every((id) => rowsById[id].isExpanded);
    const translationKey = isExpanded
      ? translationKeys.collapseAll
      : translationKeys.expandAll;
    return {
      ...rest,
      ariaLabel: t(translationKey), // TODO: remove in v12
      'aria-label': t(translationKey),
      // Provide a string of all the expanded row id's, separated by a space.
      'aria-controls': rowIds.map((id) => `expanded-row-${id}`).join(' '),
      isExpanded,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([
        this.handleOnExpandAll,
        onExpand,
        onClick &&
          this.handleOnExpandHeaderClick(onClick, {
            isExpanded,
          }),
      ]),
    };
  };

  /**
   * Decorate consumer's `onClick` event handler with sort parameters
   *
   * @param {Function} onClick
   * @param {object} sortParams
   * @returns {Function}
   */
  handleOnHeaderClick = (onClick, sortParams) => {
    return (e) => onClick(e, sortParams);
  };

  /**
   * Decorate consumer's `onClick` event handler with sort parameters
   *
   * @param {Function} onClick
   * @param {object} expandParams
   * @returns {Function}
   */
  handleOnExpandHeaderClick = (onClick, expandParams) => {
    return (e) => onClick(e, expandParams);
  };

  /**
   * Get the props associated with the given row. Mostly used for expansion.
   *
   * @param {object} config
   * @param {object} config.row the row we want the props for
   * @param {Function} config.onClick a custom click handler for the header
   * @returns {object}
   */
  getRowProps = ({
    row,
    onClick,
    ...rest
  }: {
    onClick?: (e: MouseEvent) => void;
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    const { translateWithId: t = translateWithId } = this.props;
    const translationKey = row.isExpanded
      ? translationKeys.collapseRow
      : translationKeys.expandRow;
    return {
      ...rest,
      key: row.id,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([this.handleOnExpandRow(row.id), onClick]),
      isExpanded: row.isExpanded,
      ariaLabel: t(translationKey), // TODO remove in v12
      'aria-label': t(translationKey),
      'aria-controls': `expanded-row-${row.id}`,
      isSelected: row.isSelected,
      disabled: row.disabled,
    };
  };

  /**
   * Get the props associated with an expanded row
   *
   * @param {object} config
   * @param {object} config.row the parent row we want the props for
   * @returns {object}
   */
  getExpandedRowProps = ({
    row,
    ...rest
  }: {
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    return {
      ...rest,
      id: `expanded-row-${row.id}`,
    };
  };

  /**
   * Gets the props associated with selection for a header or a row, where
   * applicable. Most often used to indicate selection status of the table or
   * for a specific row.
   *
   * @param {object} [row] an optional row that we want to access the props for
   * @param {Function} row.onClick
   * @param {object} row.row
   * @returns {object}
   */
  getSelectionProps = (
    { onClick, row, ...rest } = {} as {
      onClick?: (e: MouseEvent) => void;
      row: DataTableRow<ColTypes>;
      [key: string]: unknown;
    }
  ) => {
    const { translateWithId: t = translateWithId } = this.props;

    // If we're given a row, return the selection state values for that row
    if (row) {
      const translationKey = row.isSelected
        ? translationKeys.unselectRow
        : translationKeys.selectRow;
      return {
        ...rest,
        checked: row.isSelected,
        onSelect: composeEventHandlers([
          this.handleOnSelectRow(row.id),
          onClick,
        ]),
        id: `${this.getTablePrefix()}__select-row-${row.id}`,
        name: `select-row`,
        ariaLabel: t(translationKey),
        disabled: row.disabled,
        radio: this.props.radio || null,
      };
    }

    // Otherwise, we're working on `TableSelectAll` which handles toggling the
    // selection state of all rows.
    const rowCount = this.state.rowIds.length;
    const selectedRowCount = this.getSelectedRows().length;
    const checked = rowCount > 0 && selectedRowCount === rowCount;
    const indeterminate =
      rowCount > 0 && selectedRowCount > 0 && selectedRowCount !== rowCount;
    const translationKey =
      checked || indeterminate
        ? translationKeys.unselectAll
        : translationKeys.selectAll;

    return {
      ...rest,
      ariaLabel: t(translationKey),
      checked,
      id: `${this.getTablePrefix()}__select-all`,
      indeterminate,
      name: 'select-all',
      onSelect: composeEventHandlers([this.handleSelectAll, onClick]),
    };
  };

  getToolbarProps = (
    props = {}
  ): {
    size: 'sm' | undefined;
    [key: string]: unknown;
  } => {
    const { size } = this.props;
    const isSmall = size === 'xs' || size === 'sm';
    return {
      ...props,
      size: isSmall ? 'sm' : undefined,
    };
  };

  getBatchActionProps = (props = {}) => {
    const { shouldShowBatchActions } = this.state;
    const totalSelected = this.getSelectedRows().length;
    return {
      onSelectAll: undefined,
      totalCount: this.state.rowIds.length || 0,
      ...props,
      shouldShowBatchActions: shouldShowBatchActions && totalSelected > 0,
      totalSelected,
      onCancel: this.handleOnCancel,
    };
  };
  /**
   * Helper utility to get the Table Props.
   */
  getTableProps = () => {
    const {
      useZebraStyles,
      size = 'lg',
      isSortable,
      useStaticWidth,
      stickyHeader,
      overflowMenuOnHover = true,
      experimentalAutoAlign,
    } = this.props;
    return {
      useZebraStyles,
      size,
      isSortable,
      useStaticWidth,
      stickyHeader,
      overflowMenuOnHover,
      experimentalAutoAlign,
    };
  };

  /**
   * Helper utility to get the TableContainer Props.
   */
  getTableContainerProps = () => {
    const { stickyHeader, useStaticWidth } = this.props;

    return {
      stickyHeader,
      useStaticWidth,
    };
  };

  /**
   * Helper utility to get all the currently selected rows
   * @returns {Array<string>} the array of rowIds that are currently selected
   */
  getSelectedRows = () =>
    this.state.rowIds.filter((id) => {
      const row = this.state.rowsById[id];
      return row.isSelected && !row.disabled;
    });

  /**
   * Helper utility to get all of the available rows after applying the filter
   * @returns {Array<string>} the array of rowIds that are currently included through the filter
   *  */
  getFilteredRowIds = () => {
    const { filterRows = defaultFilterRows } = this.props;
    const filteredRowIds =
      typeof this.state.filterInputValue === 'string'
        ? filterRows({
            rowIds: this.state.rowIds,
            headers: this.props.headers,
            cellsById: this.state.cellsById,
            inputValue: this.state.filterInputValue,
            getCellId,
          })
        : this.state.rowIds;
    if (filteredRowIds.length == 0) {
      return [];
    }
    return filteredRowIds;
  };

  /**
   * Helper for getting the table prefix for elements that require an
   * `id` attribute that is unique.
   *
   * @returns {string}
   */
  getTablePrefix = () => `data-table-${this.instanceId}`;

  /**
   * Helper for toggling all selected items in a state. Does not call
   * setState, so use it when setting state.
   * @param {object} initialState
   * @returns {object} object to put into this.setState (use spread operator)
   */
  setAllSelectedState = (initialState, isSelected, filteredRowIds) => {
    const { rowIds } = initialState;
    const isFiltered = rowIds.length != filteredRowIds.length;
    return {
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
  handleOnCancel = () => {
    this.setState((state) => {
      return {
        shouldShowBatchActions: false,
        ...this.setAllSelectedState(state, false, this.getFilteredRowIds()),
      };
    });
  };

  /**
   * Handler for toggling the selection state of all rows in the database
   */
  handleSelectAll = () => {
    this.setState((state) => {
      const filteredRowIds = this.getFilteredRowIds();
      const { rowsById } = state;
      const isSelected = !(
        Object.values(rowsById).filter((row) => row.isSelected && !row.disabled)
          .length > 0
      );
      return {
        shouldShowBatchActions: isSelected,
        ...this.setAllSelectedState(state, isSelected, filteredRowIds),
      };
    });
  };

  /**
   * Handler for toggling the selection state of a given row.
   *
   * @param {string} rowId
   * @returns {Function}
   */
  handleOnSelectRow = (rowId) => () => {
    this.setState((state) => {
      const row = state.rowsById[rowId];
      if (this.props.radio) {
        // deselect all radio buttons
        const rowsById = Object.entries(state.rowsById).reduce((p, c) => {
          const [key, val] = c;
          val.isSelected = false;
          p[key] = val;
          return p;
        }, {});
        return {
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
      const selectedRows = state.rowIds.filter(
        (id) => state.rowsById[id].isSelected
      ).length;
      // Predict the length of the selected rows after this change occurs
      const selectedRowsCount = !row.isSelected
        ? selectedRows + 1
        : selectedRows - 1;
      return {
        // Basic assumption here is that we want to show the batch action bar if
        // the row is being selected. If it's being unselected, then see if we
        // have a non-zero number of selected rows that batch actions could
        // still apply to
        shouldShowBatchActions: !row.isSelected || selectedRowsCount > 0,
        rowsById: {
          ...state.rowsById,
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
   *
   * @param {string} rowId
   * @returns {Function}
   */
  handleOnExpandRow = (rowId) => () => {
    this.setState((state) => {
      const row = state.rowsById[rowId];
      const { isExpandedAll } = state;
      return {
        isExpandedAll: row.isExpanded ? false : isExpandedAll,
        rowsById: {
          ...state.rowsById,
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
  handleOnExpandAll = () => {
    this.setState((state) => {
      const { rowIds, isExpandedAll } = state;
      return {
        isExpandedAll: !isExpandedAll,
        rowsById: rowIds.reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              ...state.rowsById[id],
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
   * @param {string} headerKey the field for the header that we are sorting by
   * @returns {Function}
   */
  handleSortBy = (headerKey) => () => {
    this.setState((state) =>
      getNextSortState(this.props, state, { key: headerKey })
    );
  };

  /**
   * Event handler for transitioning input value state changes for the table
   * filter component.
   *
   * @param {Event} event
   */
  handleOnInputValueChange = (event, defaultValue) => {
    if (event.target) {
      this.setState({ filterInputValue: event.target.value });
    }

    if (defaultValue) {
      this.setState({ filterInputValue: defaultValue });
    }
  };

  render() {
    const {
      children,
      filterRows = defaultFilterRows,
      headers,
      render,
    } = this.props;
    const { filterInputValue, rowIds, rowsById, cellsById } = this.state;
    const filteredRowIds =
      typeof filterInputValue === 'string'
        ? filterRows({
            rowIds,
            headers,
            cellsById,
            inputValue: filterInputValue,
            getCellId,
          })
        : rowIds;
    const renderProps: DataTableRenderProps<RowType, ColTypes> = {
      // Data derived from state
      rows: denormalize(filteredRowIds, rowsById, cellsById),
      headers: this.props.headers,
      selectedRows: denormalize(this.getSelectedRows(), rowsById, cellsById),

      // Prop accessors/getters
      getHeaderProps: this.getHeaderProps,
      getExpandHeaderProps: this.getExpandHeaderProps,
      getRowProps: this.getRowProps,
      getExpandedRowProps: this.getExpandedRowProps,
      getSelectionProps: this.getSelectionProps,
      getToolbarProps: this.getToolbarProps,
      getBatchActionProps: this.getBatchActionProps,
      getTableProps: this.getTableProps,
      getTableContainerProps: this.getTableContainerProps,

      // Custom event handlers
      onInputChange: this.handleOnInputValueChange,

      // Expose internal state change actions
      sortBy: (headerKey) => this.handleSortBy(headerKey)(),
      selectAll: this.handleSelectAll,
      selectRow: (rowId) => this.handleOnSelectRow(rowId)(),
      expandRow: (rowId) => this.handleOnExpandRow(rowId)(),
      expandAll: this.handleOnExpandAll,
      radio: this.props.radio,
    };

    if (render !== undefined) {
      return render(renderProps);
    }

    if (children !== undefined) {
      return children(renderProps);
    }

    return null;
  }
}

DataTable.Table = Table;
DataTable.TableActionList = TableActionList;
DataTable.TableBatchAction = TableBatchAction;
DataTable.TableBatchActions = TableBatchActions;
DataTable.TableBody = TableBody;
DataTable.TableCell = TableCell;
DataTable.TableContainer = TableContainer;
DataTable.TableExpandHeader = TableExpandHeader;
DataTable.TableExpandRow = TableExpandRow;
DataTable.TableExpandedRow = TableExpandedRow;
DataTable.TableHead = TableHead;
DataTable.TableHeader = TableHeader;
DataTable.TableRow = TableRow;
DataTable.TableSelectAll = TableSelectAll;
DataTable.TableSelectRow = TableSelectRow;
DataTable.TableToolbar = TableToolbar;
DataTable.TableToolbarAction = TableToolbarAction;
DataTable.TableToolbarContent = TableToolbarContent;
DataTable.TableToolbarSearch = TableToolbarSearch;
DataTable.TableToolbarMenu = TableToolbarMenu;

export default DataTable;
