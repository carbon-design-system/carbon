/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiSelectProps } from '@carbon/react/lib/components/MultiSelect/MultiSelect';
import { FormGroupProps } from '@carbon/react/lib/components/FormGroup/FormGroup';
import { RadioButtonProps } from '@carbon/react/lib/components/RadioButton/RadioButton';
import { RadioButtonGroupProps } from '@carbon/react/lib/components/RadioButtonGroup/RadioButtonGroup';
import { CheckboxProps } from '@carbon/react/lib/components/Checkbox';
import { NumberInputProps } from '@carbon/react/lib/components/NumberInput/NumberInput';

import React, {
  CSSProperties,
  ComponentType,
  FunctionComponent,
  JSXElementConstructor,
  MutableRefObject,
  ReactNode,
  TouchEventHandler,
} from 'react';
import {
  Cell,
  Column,
  ColumnInstance,
  FilterValue,
  Filters,
  HeaderGroup,
  Meta,
  Row,
  TableCommonProps,
  TableDispatch,
  TableInstance,
  TableRowProps,
  TableState,
  TableToggleAllRowsSelectedProps,
  UseExpandedRowProps,
  UseFiltersInstanceProps,
  UsePaginationInstanceProps,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectInstanceProps,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnProps,
  UseSortByOptions,
  UseTableHooks,
} from 'react-table';
import { CarbonIconType } from '@carbon/react/icons';
import { IconButton, type ButtonProps } from '@carbon/react';
import { TableBatchActionsProps } from '@carbon/react/lib/components/DataTable/TableBatchActions';

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface ResizerProps {
  draggable?: boolean;
  onMouseDown?: (evt: any) => void;
  onTouchStart?: TouchEventHandler<HTMLElement>;
  role?: string;
  style?: CSSProperties;
}

export type DataGridFilter =
  | ({
      column?: string;
    } & {
      type: 'date';
      props: {
        // DatePickerProps
        DatePicker?: any;
        // DatePickerInputProps
        DatePickerInput?: any;
      };
    })
  | {
      type: 'number';
      props: {
        NumberInput?: NumberInputProps;
      };
    }
  | {
      type: 'checkbox';
      props: {
        FormGroup?: FormGroupProps;
        Checkbox?: CheckboxProps[];
      };
    }
  | {
      type: 'radio';
      props: {
        FormGroup?: FormGroupProps;
        RadioButton?: RadioButtonProps[];
        RadioButtonGroup?: RadioButtonGroupProps;
      };
    }
  | {
      type: 'multiSelect';
      props: {
        MultiSelect?: MultiSelectProps<any>;
      };
    };

export interface ReactTableFiltersState {
  id: string;
  type: string;
  value: string;
}

interface Labels {
  allPageRows?: object;
  allRows?: object;
}
interface ColumnLabels {
  findColumnPlaceholderLabel?: string;
  resetToDefaultLabel?: string;
  customizeTearsheetHeadingLabel?: string;
  primaryButtonTextLabel?: string;
  secondaryButtonTextLabel?: string;
  instructionsLabel?: string;
  iconTooltipLabel?: string;
  assistiveTextInstructionsLabel?: string;
  assistiveTextDisabledInstructionsLabel?: string;
  selectAllLabel?: string;
}

interface Section {
  categoryTitle?: string;
  filters?: DataGridFilter[];
}

export interface FilterFlyoutProps {
  data?: any;
  filters?: DataGridFilter[];
  flyoutIconDescription?: string;
  onFlyoutClose?: () => void;
  onFlyoutOpen?: () => void;
  onClearFilters?: () => void;
  panelIconDescription?: string;
  primaryActionLabel?: string;
  reactTableFiltersState?: ReactTableFiltersState[];
  renderLabel?: () => void;
  secondaryActionLabel?: string;
  updateMethod?: string;
  variation?: string;
  panelTitle?: string;
  sections?: Section[];
  autoHideFilters: boolean;
  clearFiltersText?: string;
}

export interface DataGridToggleAllRowsProps
  extends TableToggleAllRowsSelectedProps {
  disabled?: boolean;
}

export type DatagridTableHooks<T extends object = any> = UseTableHooks<T>;

export interface DatagridColumn<T extends object = any>
  extends ColumnInstance<T>,
    UseSortByOptions<T>,
    Partial<UseResizeColumnsColumnProps<T>>,
    UseResizeColumnsOptions<T> {
  sticky?: 'left' | 'right';
  className?: string;
  rightAlignedColumn?: boolean;
  disableSortBy?: boolean;
  centerAlignedColumn?: boolean;
}

export interface DataGridCell<T extends object = any>
  extends Omit<Cell<T>, 'column'> {
  column: DatagridColumn<any>;
}

export interface DatagridRow<T extends object = any>
  extends Omit<Row<T>, 'cells'>,
    UseExpandedRowProps<T>,
    UseRowSelectRowProps<T> {
  expandedContentHeight?: number;
  RowRenderer?: (state?: DataGridState) => ReactNode;
  RowExpansionRenderer?: (state?: DataGridState) => void;
  cells: Array<DataGridCell>;
  isSkeleton?: boolean;
  hasExpanded?: boolean;
  skeletonKey?: string;
}

export interface DataGridHeader<T extends object = any>
  extends ColumnInstance,
    UseResizeColumnsColumnProps<T>,
    UseSortByColumnProps<T> {
  className(className: any, arg1: { [x: string]: any }): unknown;
  isAction?: boolean;
  slug?: ReactNode; // To be removed once the support for slug is not available
  aiLabel?: ReactNode;
}

export interface DataGridHeaderGroup<T extends object = any>
  extends HeaderGroup<T>,
    UseResizeColumnsColumnProps<T> {}

export type DataGridTableProps = TableCommonProps;

interface DataGridTableState
  extends UseResizeColumnsState<any>,
    UseRowSelectState<any> {
  filters: Filters<DataGridFilter>;
}

export interface DataGridTableInstance<T extends object = any>
  extends Omit<TableInstance<T>, 'state'>,
    Partial<UsePaginationInstanceProps<any>> {
  shouldDisableSelectRow?: (...args) => void | boolean;
  state?: Partial<TableState & UseRowSelectState<any>>;
  disableSelectAll?: boolean;
  disableSelectRowsProps?: {
    labels?: {
      toggleAllRowsLabel?: string;
    };
  };
  withSelectRows?: boolean;
}

export interface RowAction {
  id?: string;
  itemText?: string;
  icon?: ComponentType | FunctionComponent;
  align?: React.ComponentProps<typeof IconButton>['align'];
  shouldHideMenuItem?: (...args) => void;
  shouldDisableMenuItem?: (...args) => boolean;
  disabled?: boolean;
  onClick?: (...args) => void;
}
export interface DataGridState<T extends object = any>
  extends TableCommonProps,
    Partial<UsePaginationInstanceProps<T>>,
    Omit<TableInstance<T>, 'state' | 'headers' | 'rows' | 'columns'>,
    Partial<Pick<UseFiltersInstanceProps<T>, 'setFilter' | 'setAllFilters'>>,
    UseRowSelectInstanceProps<T> {
  withVirtualScroll?: boolean;
  DatagridPagination?: JSXElementConstructor<any>;
  isFetching?: boolean;
  tableId?: string;
  filterProps?: FilterFlyoutProps;
  state: DataGridTableState;
  getFilterFlyoutProps?: () => FilterFlyoutProps;
  DatagridActions?: JSXElementConstructor<any>;
  CustomizeColumnsTearsheet?: JSXElementConstructor<any>;
  fullHeightDatagrid?: boolean;
  variableRowHeight?: boolean;
  useDenseHeader?: boolean;
  withInlineEdit?: boolean;
  verticalAlign?: string;
  gridTitle?: ReactNode;
  gridDescription?: ReactNode;
  gridRef?: MutableRefObject<HTMLDivElement>;
  DatagridBatchActions?: (args) => ReactNode;
  batchActions?: boolean;
  row: DatagridRow;
  rows: Array<DatagridRow<any>>;
  rowActions?: RowAction[];
  columns: Array<DatagridColumn>;
  key?: any;
  rowSize?: Size;
  headers?: Array<DataGridHeader<T>>;
  headRef?: MutableRefObject<HTMLDivElement>;
  HeaderRow?: (
    state?: object,
    ref?: MutableRefObject<HTMLDivElement>,
    group?: HeaderGroup<any>
  ) => ReactNode;
  withStickyColumn?: boolean;
  emptyStateTitle?: string | ReactNode;
  emptyStateDescription?: string;
  emptyStateSize?: 'lg' | 'sm';
  emptyStateType?: string;
  illustrationTheme?: 'light' | 'dark';
  emptyStateAction?: {
    kind?: 'primary' | 'secondary' | 'tertiary';
    renderIcon?: CarbonIconType;
    onClick?: ButtonProps<React.ElementType>['onClick'];
    text?: string;
  };
  emptyStateLink?: {
    text?: string | ReactNode;
    href?: string;
  };
  isTableSortable?: boolean;
  resizerAriaLabel?: string;
  onColResizeEnd?: () => void;
  withNestedRows?: boolean;
  withExpandedRows?: boolean;
  withMouseHover?: boolean;
  setMouseOverRowIndex?: (arg: any) => void;
  hideSelectAll?: boolean;
  radio?: boolean;
  onAllRowSelect?: (rows: DatagridRow[], evt: any) => void;
  selectAllToggle?: {
    onSelectAllRows?: (args) => void;
    labels?: Labels;
  };
  allPageRowsLabel?: string | object;
  allRowsLabel?: string | object;
  onSelectAllRows?: (val?: boolean) => void;
  toolbarBatchActions?: ButtonProps<React.ElementType>[];
  setGlobalFilter?: (filterValue: FilterValue) => void;
  batchActionMenuButtonLabel?: string;
  translateWithIdBatchActions?: TableBatchActionsProps['translateWithId'];
  toolbarBatchActionsDisplayMin?: number;
  onScroll?: (evt?: any) => void;
  innerListRef?: MutableRefObject<HTMLDivElement>;
  tableHeight?: number;
  virtualHeight?: number;
  listRef?: MutableRefObject<any>;
  handleResize?: () => void;
  onVirtualScroll?: (evt?: boolean) => void;
  fetchMoreData?: () => void;
  loadMoreThreshold?: number;
  expandedRowIds?: object;
  onRowClick?: (row, event) => void;
  onSort?: boolean;
  customizeColumnsProps?: {
    onSaveColumnPrefs?: (args) => void;
    labels?: ColumnLabels;
    isTearsheetOpen?: boolean;
    setIsTearsheetOpen?: (args: boolean) => void;
  };
  CustomizeColumnsButton?: (args: any) => ReactNode;
  column?: DatagridColumn;
  expandedContentHeight?: number;
  onRowExpand?: (
    row: DatagridRow,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  ExpandedRowContentComponent?: JSXElementConstructor<any>;
  getAsyncSubRows?: (row: DatagridRow) => void;
  enableSpacerColumn?: boolean;
}

export interface DataGridData {
  instance?: DataGridTableInstance;
  column?: DatagridColumn;
  cell?: DataGridCell;
}

// DatagridHeaderRow related types
export interface ResizeHeaderProps {
  resizerProps?: ResizerProps;
  header: DataGridHeader;
  originalCol?: DatagridColumn;
  handleOnMouseDownResize?: (evt?: any, props?: ResizerProps) => void;
  columnWidths?: any[];
  datagridState: DataGridState;
  incrementAmount: number;
  minWidth?: number;
  dispatch?: TableDispatch<any>;
  onColResizeEnd?: () => void;
  resizerAriaLabel?: string;
  isFetching?: boolean;
}

export type VisibleColumns<T extends object = {}> = (
  allColumns: Array<ColumnInstance<T>>,
  meta: Meta<T>
) => Array<Column<T>>;

export type NodeFuncType = (props) => ReactNode;

export interface PropGetterMeta {
  instance?: DataGridTableInstance;
  row?: Partial<Row<any> & DatagridRow<any>>;
}

export interface DatagridRowProps extends TableRowProps {
  nonselectablerows: Array<number>;
}
