/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import debounce from 'lodash-es/debounce';
import { Pipe, PipeTransform, Component, Input, HostBinding, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { Delete16Module } from '@carbon/icons-angular/lib/delete/16';
import { Download16Module } from '@carbon/icons-angular/lib/download/16';
import { Settings16Module } from '@carbon/icons-angular/lib/settings/16';
import BXBtn from '../button/button';
import { TABLE_COLOR_SCHEME, TABLE_SIZE } from './table';
import { TABLE_SORT_DIRECTION } from './table-header-cell';
import baseStory, {
  Default as baseDefault,
  expandable as baseExpandable,
  sortable as baseSortable,
  sortableWithPagination as baseSortableWithPagination,
} from './data-table-story';
import { rows as demoRows, rowsMany as demoRowsMany, columns as demoColumns, sortInfo as demoSortInfo } from './stories/data';
import { TDemoTableColumn, TDemoTableRow, TDemoSortInfo } from './stories/types';

/**
 * @param row A table row.
 * @param searchString A search string.
 * @returns `true` if the given table row matches the given search string.
 */
const doesRowMatchSearchString = (row: TDemoTableRow, searchString: string) =>
  Object.keys(row).some(key => key !== 'id' && String(row[key] ?? '').indexOf(searchString) >= 0);

/**
 * Table filtering options.
 */
interface IBXCETableFilterOptions {
  /**
   * Search string.
   */
  searchString: string;
}

/**
 * Angular filter for filtering table rows.
 */
@Pipe({
  name: 'BXCETableRowsFilterWith',
})
class BXCETableRowsFilterPipe implements PipeTransform {
  /* eslint-disable class-methods-use-this */
  /**
   * @param rows The table rows to window.
   * @param options The table windowing options.
   * @returns The windowed table rows.
   */
  transform(rows: TDemoTableRow[], options: IBXCETableFilterOptions): TDemoTableRow[] {
    const { searchString } = options;
    return !searchString ? rows : rows!.filter(row => doesRowMatchSearchString(row, searchString));
  }
  /* eslint-enable class-methods-use-this */
}

/**
 * Table sorting options.
 */
interface IBXCETableSortOptions {
  /**
   * @param lhs A table row.
   * @param rhs Another table row.
   * @returns {number} `-1` to put `lhs` to lower index than `lhs`, `1` to put it opposite, `0` if they are equal.
   */
  compare(lhs: any, rhs: any): number;

  /**
   * Table sorting info.
   */
  sortInfo: TDemoSortInfo;
}

/**
 * Angular filter for sorting table rows.
 */
@Pipe({
  name: 'BXCETableRowsSortWith',
})
class BXCETableRowsSortPipe implements PipeTransform {
  /**
   * @param rows The table rows to sort.
   * @param options The table sorting options.
   * @returns The sorted table rows.
   */
  transform(rows: TDemoTableRow[], options: IBXCETableSortOptions): TDemoTableRow[] {
    const { compare, sortInfo } = options;
    const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
    return sortDirection === TABLE_SORT_DIRECTION.NONE
      ? rows
      : rows!
          .slice()
          .sort(
            (lhs, rhs) =>
              (this.constructor as typeof BXCETableRowsSortPipe).collationFactors[sortDirection] *
              compare(lhs[sortColumnId!], rhs[sortColumnId!])
          );
  }

  /**
   * The map of how sorting direction affects sorting order.
   */
  static collationFactors = {
    [TABLE_SORT_DIRECTION.ASCENDING]: 1,
    [TABLE_SORT_DIRECTION.DESCENDING]: -1,
  };
}

/**
 * Table windowing options.
 */
interface IBXCETableSliceOptions {
  /**
   * Number of items per page.
   */
  pageSize: number;

  /**
   * The row number where current page start with, index that starts with zero.
   */
  start: number;
}

/**
 * Angular filter for windowing table rows.
 */
@Pipe({
  name: 'BXCETableRowsSliceWith',
})
class BXCETableRowsSlicePipe implements PipeTransform {
  /* eslint-disable class-methods-use-this */
  /**
   * @param rows The table rows to window.
   * @param options The table windowing options.
   * @returns The windowed table rows.
   */
  transform(rows: TDemoTableRow[], options: IBXCETableSliceOptions): TDemoTableRow[] {
    const { pageSize = Infinity, start } = options;
    return rows!.slice(start, start + pageSize);
  }
  /* eslint-enable class-methods-use-this */
}

/* eslint-disable class-methods-use-this */
/**
 * Angular filter for sort direction of table column.
 */
@Pipe({
  name: 'BXCETableColumnSortDirection',
})
class BXCETableColumnSortDirectionPipe implements PipeTransform {
  /**
   * @param column A table column.
   * @param sortInfo The table sorting options.
   * @returns The table sort direction of the given table column.
   */
  transform(column: TDemoTableColumn, { columnId, direction }: TDemoSortInfo): TABLE_SORT_DIRECTION | void {
    const { id, sortCycle } = column;
    if (!sortCycle) {
      return undefined;
    }
    return id === columnId ? direction : TABLE_SORT_DIRECTION.NONE;
  }
}

/**
 * Angular filter for checkbox ID for row selection.
 */
@Pipe({
  name: 'BXCETableRowSelectionId',
})
class BXCETableRowSelectionIdPipe implements PipeTransform {
  /**
   * @param rowId A row ID.
   * @param selectionId The unique ID of the table for selection.
   * @returns The checkbox ID for row selection.
   */
  transform(rowId?: string, selectionId?: string): string | void {
    return rowId && `${selectionId}_${rowId}`;
  }
}
/* eslint-enable class-methods-use-this */

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
@Component({
  selector: 'bx-ce-demo-data-table',
  template: `
    <bx-table-toolbar>
      <bx-table-batch-actions
        [active]="hasSelection && _selectedRowsCountInFiltered"
        [selectedRowsCount]="_selectedRowsCountInFiltered"
        (bx-table-batch-actions-cancel-clicked)="_handleCancelSelection($event)">
        <bx-btn icon-layout="condensed" (click)="_handleDeleteRows($event)">
          Delete
          <ibm-icon-delete16 slot="icon"></ibm-icon-delete16>
        </bx-btn>
        <bx-btn icon-layout="condensed" (click)="_handleDownloadRows($event)" href="javascript:void 0" download="table-data.json">
          Download <ibm-icon-download16 slot="icon"></ibm-icon-download16>
        </bx-btn>
      </bx-table-batch-actions>
      <bx-table-toolbar-content [hasBatchActions]="hasSelection && _selectedRowsCountInFiltered">
        <bx-table-toolbar-search (bx-search-input)="_handleChangeSearchString($event)"></bx-table-toolbar-search>
        <bx-overflow-menu>
          <ibm-icon-settings16 slot="icon"></ibm-icon-settings16>
          <bx-overflow-menu-body>
            <bx-overflow-menu-item> Action 1 </bx-overflow-menu-item>
            <bx-overflow-menu-item> Action 2 </bx-overflow-menu-item>
            <bx-overflow-menu-item> Action 3 </bx-overflow-menu-item>
          </bx-overflow-menu-body>
        </bx-overflow-menu>
        <bx-btn>Primary Button</bx-btn>
      </bx-table-toolbar-content>
    </bx-table-toolbar>
    <bx-table
      [size]="size"
      (bx-table-row-change-selection)="_handleChangeSelection($event)"
      (bx-table-change-selection-all)="_handleChangeSelectionAll($event)"
      (bx-table-header-cell-sort)="_handleChangeSort($event)">
      <bx-table-head>
        <bx-table-header-row
          [selected]="_selectedAllInFiltered"
          [selectionName]="!hasSelection ? undefined : _selectionId"
          [selectionValue]="!hasSelection ? undefined : _selectionId">
          <bx-table-header-cell
            *ngFor="let column of columns"
            [sortCycle]="column.sortCycle"
            [sortDirection]="column | BXCETableColumnSortDirection: _sortInfo"
            [attr.data-column-id]="column.id">
            {{ column.title }}
          </bx-table-header-cell>
        </bx-table-header-row>
      </bx-table-head>
      <bx-table-body [colorScheme]="colorScheme">
        <bx-table-row
          *ngFor="
            let row of _rows
              | BXCETableRowsFilterWith: { searchString: _searchString }
              | BXCETableRowsSortWith: { compare: _compare, sortInfo: _sortInfo }
              | BXCETableRowsSliceWith: { start: start, pageSize: pageSize }
          "
          [selected]="hasSelection && row.selected"
          [selectionName]="!hasSelection ? undefined : (row.id | BXCETableRowSelectionId: _selectionId)"
          [selectionValue]="!hasSelection ? undefined : 'selected'"
          [attr.data-row-id]="row.id">
          <bx-table-cell *ngFor="let column of columns">{{ row[column.id] }}</bx-table-cell>
        </bx-table-row>
      </bx-table-body>
    </bx-table>
    <bx-pagination
      *ngIf="pageSize !== undefined"
      [pageSize]="pageSize"
      [start]="start"
      [total]="(rows | BXCETableRowsFilterWith: { searchString: _searchString }).length"
      (bx-pagination-changed-current)="_handleChangeStart($event)"
      (bx-page-sizes-select-changed)="_handleChangePageSize($event)">
      <bx-page-sizes-select slot="page-sizes-select">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </bx-page-sizes-select>
      <bx-pages-select></bx-pages-select>
    </bx-pagination>
  `,
})
class BXCEDemoDataTable {
  /**
   * The debounced handler for user-initiated change in search string.
   */
  _handleChangeSearchString: ((() => void) & { cancel(): void }) | void = undefined;

  /**
   * The search string.
   */
  _searchString = '';

  /**
   * The table sorting info reflecting user-initiated changes.
   */
  _sortInfo?: TDemoSortInfo;

  /**
   * The table rows reflecting user-initiated changes in sorting.
   */
  _rows?: TDemoTableRow[];

  /**
   * `true` if all filtered rows are selected.
   */
  _selectedAllInFiltered?: boolean;

  /**
   * The count of the selected filtered rows.
   */
  _selectedRowsCountInFiltered = 0;

  /**
   * Unique ID used for ID refs.
   */
  _uniqueId = Math.random().toString(36).slice(2);

  /**
   * A ID prefix for table selection checkbox names.
   */
  get _selectionId() {
    const { id: elementId, _uniqueId: uniqueId } = this;
    return `__bx-ce-demo-data-table_${elementId || uniqueId}`;
  }

  /**
   * @param lhs A value.
   * @param rhs Another value.
   * @returns
   *   * `0` if the given two values are equal
   *   * A negative value to sort `lhs` to an index lower than `rhs`
   *   * A positive value to sort `rhs` to an index lower than `lhs`
   */
  _compare = (lhs, rhs) => {
    if (typeof lhs === 'number' && typeof rhs === 'number') {
      return lhs - rhs;
    }
    return this.collator.compare(lhs, rhs);
  };

  /**
   * Handles Cancel button in batch action bar.
   */
  _handleCancelSelection() {
    const { _searchString: searchString } = this;
    this._rows!.forEach(row => {
      if (!searchString || doesRowMatchSearchString(row, searchString)) {
        row.selected = false;
      }
    });
    this._selectedRowsCountInFiltered = 0;
    this._selectedAllInFiltered = false;
  }

  /**
   * Handles user-initiated change in search string.
   */
  _handleChangeSearchStringImpl({ detail }: CustomEvent) {
    const { pageSize, start } = this;
    const { value: searchString } = detail;
    const { length: count } = this._rows!.filter(row =>
      Object.keys(row).some(key => key !== 'id' && String(row[key] ?? '').indexOf(searchString) >= 0)
    );
    if (count > 0 && start >= count) {
      this.start = Math.max(start - Math.ceil((start - count) / pageSize) * pageSize, 0);
    }
    this._searchString = searchString;
    this._recomputeSelected();
  }

  /**
   * Handles an event to change in selection of rows, fired from `<bx-table-row>`.
   * @param event The event.
   */
  // @ts-ignore: Template-only ref
  _handleChangeSelection({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { rowId: changedRowId } = (target as HTMLElement).dataset;
      const { selected } = detail;
      this._rows!.forEach(row => {
        if (Number(changedRowId) === row.id) {
          row.selected = selected;
        }
      });
      this._recomputeSelected();
    }
  }

  /**
   * Handles an event to change in selection of all rows, fired from `<bx-table-header-row>`.
   * @param event The event.
   */
  _handleChangeSelectionAll({ defaultPrevented, detail }: CustomEvent) {
    if (!defaultPrevented) {
      const { _searchString: searchString } = this;
      const { selected } = detail;
      this._rows!.forEach(row => {
        if (!searchString || doesRowMatchSearchString(row, searchString)) {
          row.selected = selected;
        }
      });
      this._recomputeSelected();
    }
  }

  /**
   * Handles an event to sort rows, fired from `<bx-table-header-cell>`.
   * @param event The event.
   */
  _handleChangeSort({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { columnId } = (target as HTMLElement).dataset;
      const { sortDirection: direction } = detail;
      if (direction === TABLE_SORT_DIRECTION.NONE && columnId !== 'name') {
        // Resets the sorting, given non-primary sorting column has got in non-sorting state
        this._sortInfo = this.sortInfo;
      } else {
        // Sets the sorting as user desires
        this._sortInfo = {
          columnId: columnId!,
          direction,
        };
      }
    }
  }

  /**
   * Handles `bx-pagination-changed-current` event on the pagination UI.
   * @param event The event.
   */
  _handleChangeStart({ detail }: CustomEvent) {
    this.start = detail.start;
  }

  /**
   * Handles `bx-pages-select-changed` event on the pagination UI.
   * @param event The event.
   */
  _handleChangePageSize({ detail }: CustomEvent) {
    this.pageSize = detail.value;
  }

  /**
   * Handles Delete batch action button.
   */
  _handleDeleteRows() {
    const { _searchString: searchString } = this;
    this._rows = this._rows!.filter(row => !row.selected || !doesRowMatchSearchString(row, searchString));
    this._selectedRowsCountInFiltered = 0;
    this._selectedAllInFiltered = false;
  }

  /**
   * Handles Download batch action button.
   * @param event The event triggering this action.
   */
  _handleDownloadRows({ target }: MouseEvent) {
    const { _searchString: searchString } = this;
    const blob = new Blob(
      [JSON.stringify(this._rows!.filter(row => row.selected && doesRowMatchSearchString(row, searchString)))],
      { type: 'application/json' }
    );
    (target as BXBtn).href = URL.createObjectURL(blob);
    this._handleCancelSelection();
  }

  /**
   * Re-computes `_selectedRowsCount` and `_selectedAllInFiltered` properties.
   */
  _recomputeSelected() {
    const { _searchString: searchString, _rows: rows } = this;
    const selectedRowsCount = rows!.filter(
      row => row.selected && (!searchString || doesRowMatchSearchString(row, searchString))
    ).length;
    this._selectedRowsCountInFiltered = selectedRowsCount;
    this._selectedAllInFiltered =
      selectedRowsCount > 0 &&
      (!searchString ? rows! : rows!.filter(row => doesRowMatchSearchString(row, searchString))).length === selectedRowsCount;
  }

  /**
   * The element ID.
   */
  @Input() @HostBinding('id') id!: string;

  /**
   * The g11n collator to use.
   */
  @Input()
  collator = new Intl.Collator();

  /**
   * Data table columns.
   */
  @Input()
  columns?: TDemoTableColumn[];

  /**
   * Data table rows.
   */
  @Input()
  rows?: TDemoTableRow[];

  /**
   * Table sorting info.
   */
  @Input()
  sortInfo?: TDemoSortInfo;

  /**
   * `true` if the the table should support selection UI.
   */
  @Input()
  hasSelection = false;

  /**
   * Number of items per page.
   */
  @Input()
  pageSize!: number;

  /**
   * `true` if the the table should use the compact version of the UI.
   */
  @Input()
  size = TABLE_SIZE.REGULAR;

  /**
   * `true` if the zebra stripe should be shown.
   */
  @Input()
  colorScheme = TABLE_COLOR_SCHEME.REGULAR;

  /**
   * The row number where current page start with, index that starts with zero.
   */
  @Input()
  start = 0;

  ngOnInit() {
    if (this._handleChangeSearchString) {
      this._handleChangeSearchString.cancel();
    }
    this._handleChangeSearchString = debounce(this._handleChangeSearchStringImpl as () => void, 500);
  }

  ngOnDestroy() {
    if (this._handleChangeSearchString) {
      this._handleChangeSearchString.cancel();
      this._handleChangeSearchString = undefined;
    }
  }

  ngOnChanges(changes) {
    if ('sortInfo' in changes) {
      this._sortInfo = this.sortInfo;
    }
    if ('rows' in changes) {
      this._rows = this.rows;
      this._recomputeSelected();
    }
  }

  /**
   * The map of how sorting direction affects sorting order.
   */
  static collationFactors = {
    [TABLE_SORT_DIRECTION.ASCENDING]: 1,
    [TABLE_SORT_DIRECTION.DESCENDING]: -1,
  };
}

export const Default = args => ({
  template: `
    <bx-table [size]="size">
      <bx-table-head>
        <bx-table-header-row>
          <bx-table-header-cell>Name</bx-table-header-cell>
          <bx-table-header-cell>Protocol</bx-table-header-cell>
          <bx-table-header-cell>Port</bx-table-header-cell>
          <bx-table-header-cell>Rule</bx-table-header-cell>
          <bx-table-header-cell>Attached Groups</bx-table-header-cell>
          <bx-table-header-cell>Status</bx-table-header-cell>
        </bx-table-header-row>
      </bx-table-head>
      <bx-table-body [colorScheme]="colorScheme">
        <bx-table-row>
          <bx-table-cell>Load Balancer 1</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-row>
        <bx-table-row>
          <bx-table-cell>Load Balancer 2</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-row>
        <bx-table-row>
          <bx-table-cell>Load Balancer 3</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-row>
      </bx-table-body>
    </bx-table>
  `,
  props: { ...args?.['bx-table'], ...args?.['bx-table-body'] },
});

Object.assign(Default, baseDefault);

export const expandable = args => ({
  template: `
    <bx-table
      [size]="size"
      (bx-table-row-expando-toggled-all)="handleExpandRowAll($event)"
      (bx-table-row-expando-toggled)="handleExpandRow($event)">
      <bx-table-head>
        <bx-table-header-expand-row>
          <bx-table-header-cell>Name</bx-table-header-cell>
          <bx-table-header-cell>Protocol</bx-table-header-cell>
          <bx-table-header-cell>Port</bx-table-header-cell>
          <bx-table-header-cell>Rule</bx-table-header-cell>
          <bx-table-header-cell>Attached Groups</bx-table-header-cell>
          <bx-table-header-cell>Status</bx-table-header-cell>
        </bx-table-header-expand-row>
      </bx-table-head>
      <bx-table-body [zebra]="zebra">
        <bx-table-expand-row>
          <bx-table-cell>Load Balancer 1</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-expand-row>
        <bx-table-expanded-row colspan="7">
          <h1>Expandable row content</h1>
          <p>Description here</p>
        </bx-table-expanded-row>
        <bx-table-expand-row>
          <bx-table-cell>Load Balancer 2</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-expand-row>
        <bx-table-expanded-row colspan="7">
          <h1>Expandable row content</h1>
          <p>Description here</p>
        </bx-table-expanded-row>
        <bx-table-expand-row>
          <bx-table-cell>Load Balancer 3</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-expand-row>
        <bx-table-expanded-row colspan="7">
          <h1>Expandable row content</h1>
          <p>Description here</p>
        </bx-table-expanded-row>
      </bx-table-body>
    </bx-table>
  `,
  props: {
    ...args?.['bx-table'],
    ...args?.['bx-table-body'],
    handleExpandRowAll(event) {
      const { currentTarget, detail } = event;
      const rows = currentTarget.querySelectorAll('bx-table-expand-row');
      Array.prototype.forEach.call(rows, row => {
        row.expanded = detail.expanded;
      });
    },
    handleExpandRow(event) {
      const { currentTarget } = event;
      const headerRow = currentTarget.querySelector('bx-table-header-expand-row');
      const rows = currentTarget.querySelectorAll('bx-table-expand-row');
      headerRow.expanded = Array.prototype.every.call(rows, row => row.expanded);
    },
  },
});

Object.assign(expandable, baseExpandable);

export const sortable = args => ({
  template: `
    <!-- TODO: Figure out how to style <bx-ce-demo-data-table> -->
    <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
    <bx-ce-demo-data-table
      [columns]="demoColumns"
      [rows]="demoRows"
      [sortInfo]="demoSortInfo"
      [hasSelection]="hasSelection"
      [size]="size"
      [colorScheme]="colorScheme"
      (bx-table-row-change-selection)="handleBeforeChangeSelection($event)"
      (bx-table-change-selection-all)="handleBeforeChangeSelection($event)"
      (bx-table-header-cell-sort)="handleBeforeSort($event)"
    >
    </bx-ce-demo-data-table>
  `,
  props: (props => {
    const { onBeforeChangeSelectionAll } = args?.['bx-table-header-row'];
    const { onBeforeChangeSelection } = args?.['bx-table-row'] ?? {};
    const { onBeforeSort } = args?.['bx-table-header-cell'] ?? {};
    const handleBeforeChangeSelection = (event: CustomEvent) => {
      if (event.type === 'bx-table-change-selection-all') {
        onBeforeChangeSelectionAll(event);
      } else {
        onBeforeChangeSelection(event);
      }
    };
    return {
      ...props,
      demoColumns,
      demoRows,
      demoSortInfo,
      handleBeforeChangeSelection,
      handleBeforeSort: onBeforeSort,
    };
  })({
    ...args?.['bx-table'],
    ...args?.['bx-table-body'],
    ...args?.['bx-table-row'],
    ...args?.['bx-header-cell'],
  }),
});

Object.assign(sortable, baseSortable, {
  decorators: [
    moduleMetadata({
      declarations: [
        BXCEDemoDataTable,
        BXCETableRowsFilterPipe,
        BXCETableRowsSortPipe,
        BXCETableRowsSlicePipe,
        BXCETableColumnSortDirectionPipe,
        BXCETableRowSelectionIdPipe,
      ],
      imports: [Delete16Module, Download16Module, Settings16Module],
    }),
  ],
});

export const sortableWithPagination = args => ({
  template: `
    <!-- TODO: Figure out how to style <bx-ce-demo-data-table> -->
    <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
    <bx-ce-demo-data-table
      [columns]="demoColumns"
      [rows]="demoRows"
      [sortInfo]="demoSortInfo"
      [hasSelection]="hasSelection"
      [pageSize]="5"
      [size]="size"
      [start]="0"
      [colorScheme]="colorScheme"
      (bx-table-row-change-selection)="handleBeforeChangeSelection($event)"
      (bx-table-change-selection-all)="handleBeforeChangeSelection($event)"
      (bx-table-header-cell-sort)="handleBeforeSort($event)"
    >
    </bx-ce-demo-data-table>
  `,
  props: (props => {
    const { onBeforeChangeSelectionAll } = args?.['bx-table-header-row'];
    const { onBeforeChangeSelection } = args?.['bx-table-row'] ?? {};
    const { onBeforeSort } = args?.['bx-table-header-cell'] ?? {};
    const handleBeforeChangeSelection = (event: CustomEvent) => {
      if (event.type === 'bx-table-change-selection-all') {
        onBeforeChangeSelectionAll(event);
      } else {
        onBeforeChangeSelection(event);
      }
    };
    return {
      ...props,
      demoColumns,
      demoRows: demoRowsMany,
      demoSortInfo,
      handleBeforeChangeSelection,
      handleBeforeSort: onBeforeSort,
    };
  })({
    ...args?.['bx-table'],
    ...args?.['bx-table-body'],
    ...args?.['bx-table-row'],
    ...args?.['bx-header-cell'],
  }),
});

Object.assign(sortableWithPagination, baseSortableWithPagination, {
  decorators: [
    moduleMetadata({
      declarations: [
        BXCEDemoDataTable,
        BXCETableRowsFilterPipe,
        BXCETableRowsSortPipe,
        BXCETableRowsSlicePipe,
        BXCETableColumnSortDirectionPipe,
        BXCETableRowSelectionIdPipe,
      ],
      imports: [Delete16Module, Download16Module, Settings16Module],
    }),
  ],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
