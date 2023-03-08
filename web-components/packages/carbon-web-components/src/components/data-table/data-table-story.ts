/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import debounce from 'lodash-es/debounce';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Delete16 from '@carbon/web-components/es/icons/delete/16';
// @ts-ignore
import Download16 from '@carbon/web-components/es/icons/download/16';
// @ts-ignore
import Settings16 from '@carbon/web-components/es/icons/settings/16';
import { prefix } from '../../globals/settings';
import BXBtn from '../button/button';
import '../overflow-menu/overflow-menu';
import '../overflow-menu/overflow-menu-body';
import '../overflow-menu/overflow-menu-item';
import '../pagination/pagination';
import '../pagination/page-sizes-select';
import '../pagination/pages-select';
import { TABLE_COLOR_SCHEME, TABLE_SIZE } from './table';
import './table-head';
import './table-header-row';
import { TABLE_SORT_DIRECTION } from './table-header-cell';
import './table-body';
import './table-row';
import './table-cell';
import './table-header-expand-row';
import './table-expand-row';
import './table-expanded-row';
import './table-toolbar';
import './table-toolbar-content';
import './table-toolbar-search';
import './table-batch-actions';
import './table-header-cell-skeleton';
import './table-cell-skeleton';
import {
  rows as demoRows,
  rowsMany as demoRowsMany,
  columns as demoColumns,
  sortInfo as demoSortInfo,
} from './stories/data';
import {
  TDemoTableColumn,
  TDemoTableRow,
  TDemoSortInfo,
} from './stories/types';
import styles from './data-table-story.scss';
import storyDocs from './data-table-story.mdx';

/**
 * @param row A table row.
 * @param searchString A search string.
 * @returns `true` if the given table row matches the given search string.
 */
const doesRowMatchSearchString = (row: TDemoTableRow, searchString: string) =>
  Object.keys(row).some(
    (key) => key !== 'id' && String(row[key] ?? '').indexOf(searchString) >= 0
  );

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
// @ts-ignore `BXCEDemoDataTable` is used (only) for type reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BXCEDemoDataTable extends LitElement {
  /**
   * The debounced handler for user-initiated change in search string.
   */
  private _handleChangeSearchString:
    | ((() => void) & { cancel(): void })
    | void = undefined;

  /**
   * The table sorting info reflecting user-initiated changes.
   */
  private _sortInfo?: TDemoSortInfo;

  /**
   * The table rows reflecting selection.
   */
  private _rows?: TDemoTableRow[];

  /**
   * The table rows reflecting selection and filtering.
   */
  private _filteredRows?: TDemoTableRow[];

  /**
   * The search string.
   */
  private _searchString = '';

  /**
   * Unique ID used for form elements.
   */
  protected _uniqueId = Math.random().toString(36).slice(2);

  /**
   * @param lhs A value.
   * @param rhs Another value.
   * @returns
   *   `0` if the given two values are equal
   *   A negative value to sort `lhs` to an index lower than `rhs`
   *   A positive value to sort `rhs` to an index lower than `lhs`
   */
  private _compare(lhs, rhs) {
    if (typeof lhs === 'number' && typeof rhs === 'number') {
      return lhs - rhs;
    }
    return this.collator.compare(lhs, rhs);
  }

  /**
   * Handles Cancel button in batch action bar.
   */
  private _handleCancelSelection() {
    const { _rows: oldRows, _searchString: searchString } = this;
    this._rows = this._rows!.map((row) =>
      searchString && !doesRowMatchSearchString(row, searchString)
        ? row
        : { ...row, selected: false }
    );
    this.requestUpdate('_rows', oldRows);
  }

  /**
   * Handles user-initiated change in search string.
   */
  private _handleChangeSearchStringImpl({ detail }: CustomEvent) {
    const { _searchString: oldSearchString } = this;
    this._searchString = detail.value;
    this.requestUpdate('_searchString', oldSearchString);
  }

  /**
   * Handles an event to change in selection of rows, fired from `<cds-table-row>`.
   *
   * @param event The event.
   */
  private _handleChangeSelection({
    defaultPrevented,
    detail,
    target,
  }: CustomEvent) {
    if (!defaultPrevented) {
      const { rowId: changedRowId } = (target as HTMLElement).dataset;
      const { selected } = detail;
      const { _rows: oldRows } = this;
      this._rows = oldRows!.map((row) =>
        Number(changedRowId) !== row.id ? row : { ...row, selected }
      );
      this.requestUpdate('_rows', oldRows);
    }
  }

  /**
   * Handles an event to change in selection of all rows, fired from `<cds-table-header-row>`.
   *
   * @param event The event.
   */
  private _handleChangeSelectionAll({ defaultPrevented, detail }: CustomEvent) {
    if (!defaultPrevented) {
      const { selected } = detail;
      const { _rows: oldRows, _searchString: searchString } = this;
      this._rows = this._rows!.map((row) =>
        searchString && !doesRowMatchSearchString(row, searchString)
          ? row
          : { ...row, selected }
      );
      this.requestUpdate('_rows', oldRows);
    }
  }

  /**
   * Handles an event to sort rows, fired from `<cds-table-header-cell>`.
   *
   * @param event The event.
   */
  private _handleChangeSort({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { columnId } = (target as HTMLElement).dataset;
      const { sortDirection: direction } = detail;
      const { _sortInfo: oldSortInfo } = this;
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
      this.requestUpdate('_sortInfo', oldSortInfo);
    }
  }

  /**
   * Handles `cds-pagination-changed-current` event on the pagination UI.
   *
   * @param event The event.
   */
  private _handleChangeStart({ detail }: CustomEvent) {
    this.start = detail.start;
  }

  /**
   * Handles `cds-pages-select-changed` event on the pagination UI.
   *
   * @param event The event.
   */
  private _handleChangePageSize({ detail }: CustomEvent) {
    this.pageSize = detail.value;
  }

  /**
   * Handles Delete batch action button.
   */
  private _handleDeleteRows() {
    const { _rows: oldRows, _searchString: searchString } = this;
    this._rows = oldRows!.filter(
      (row) => !row.selected || !doesRowMatchSearchString(row, searchString)
    );
    this.requestUpdate('_rows', oldRows);
  }

  /**
   * Handles Download batch action button.
   *
   * @param event The event triggering this action.
   */
  private _handleDownloadRows({ target }: MouseEvent) {
    const blob = new Blob(
      [JSON.stringify(this._filteredRows!.filter((row) => row.selected))],
      { type: 'application/json' }
    );
    (target as BXBtn).href = URL.createObjectURL(blob);
    this._handleCancelSelection();
  }

  /**
   * @returns The content of the pagination UI.
   */
  private _renderPagination() {
    const {
      pageSize,
      start,
      _filteredRows: filteredRows,
      _handleChangeStart: handleChangeStart,
      _handleChangePageSize: handleChangePageSize,
    } = this;
    if (typeof pageSize === 'undefined') {
      return undefined;
    }
    return html`
      <cds-pagination
        page-size="${pageSize}"
        start="${start}"
        total="${filteredRows!.length}"
        @cds-pagination-changed-current="${handleChangeStart}"
        @cds-page-sizes-select-changed="${handleChangePageSize}">
        <cds-page-sizes-select slot="page-sizes-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </cds-page-sizes-select>
        <cds-pages-select></cds-pages-select>
      </cds-pagination>
    `;
  }

  /**
   * The g11n collator to use.
   */
  @property({ attribute: false })
  collator = new Intl.Collator();

  /**
   * Data table columns.
   */
  @property({ attribute: false })
  columns?: TDemoTableColumn[];

  /**
   * Data table rows.
   */
  @property({ attribute: false })
  rows?: TDemoTableRow[];

  /**
   * Table sorting info.
   */
  @property({ attribute: false })
  sortInfo?: TDemoSortInfo;

  /**
   * `true` if the the table should support selection UI.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-selection' })
  hasSelection = false;

  /**
   * Number of items per page.
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize!: number;

  /**
   * The table size.
   */
  @property({ reflect: true })
  size = TABLE_SIZE.MD;

  /**
   * The table color scheme.
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = TABLE_COLOR_SCHEME.REGULAR;

  /**
   * The row number where current page start with, index that starts with zero.
   */
  @property({ type: Number })
  start = 0;

  connectedCallback() {
    super.connectedCallback();
    if (this._handleChangeSearchString) {
      this._handleChangeSearchString.cancel();
    }
    this._handleChangeSearchString = debounce(
      this._handleChangeSearchStringImpl as () => void,
      500
    );
  }

  disconnectedCallback() {
    if (this._handleChangeSearchString) {
      this._handleChangeSearchString.cancel();
      this._handleChangeSearchString = undefined;
    }
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('sortInfo')) {
      this._sortInfo = this.sortInfo;
    }
    if (changedProperties.has('rows')) {
      this._rows = this.rows;
    }
    if (
      changedProperties.has('rows') ||
      changedProperties.has('_rows') ||
      changedProperties.has('_searchString')
    ) {
      const {
        pageSize,
        start,
        _rows: rows,
        _searchString: searchString,
      } = this;
      this._filteredRows = !searchString
        ? rows!
        : rows!.filter((row) => doesRowMatchSearchString(row, searchString));
      const count = this._filteredRows.length;
      if (count > 0 && start >= count) {
        this.start = Math.max(
          start - Math.ceil((start - count) / pageSize) * pageSize,
          0
        );
      }
    }
    return true;
  }

  render() {
    const {
      id: elementId,
      colorScheme,
      hasSelection,
      pageSize = Infinity,
      start = 0,
      size,
      columns,
      _filteredRows: filteredRows,
      _handleCancelSelection: handleCancelSelection,
      _handleDeleteRows: handleDeleteRows,
      _handleDownloadRows: handleDownloadRows,
    } = this;
    const selectionAllName = !hasSelection
      ? undefined
      : `__${prefix}-ce-demo-data-table_select-all_${
          elementId || this._uniqueId
        }`;
    const selectedRowsCountInFiltered = filteredRows!.filter(
      ({ selected }) => selected!
    ).length;
    const selectedAllInFiltered =
      selectedRowsCountInFiltered > 0 &&
      filteredRows!.length === selectedRowsCountInFiltered;
    const hasBatchActions = hasSelection && selectedRowsCountInFiltered > 0;
    const { columnId: sortColumnId, direction: sortDirection } =
      this._sortInfo!;
    const sortedRows =
      sortDirection === TABLE_SORT_DIRECTION.NONE
        ? filteredRows!
        : filteredRows!
            .slice()
            .sort(
              (lhs, rhs) =>
                (this.constructor as typeof BXCEDemoDataTable).collationFactors[
                  sortDirection
                ] * this._compare(lhs[sortColumnId!], rhs[sortColumnId!])
            );
    return html`
      <cds-table-toolbar>
        <cds-table-batch-actions
          ?active="${hasBatchActions}"
          selected-rows-count="${selectedRowsCountInFiltered}"
          @cds-table-batch-actions-cancel-clicked="${handleCancelSelection}">
          <cds-btn icon-layout="condensed" @click="${handleDeleteRows}"
            >Delete ${Delete16({ slot: 'icon' })}</cds-btn
          >
          <cds-btn
            icon-layout="condensed"
            @click="${handleDownloadRows}"
            href="javascript:void 0"
            download="table-data.json">
            Download ${Download16({ slot: 'icon' })}
          </cds-btn>
        </cds-table-batch-actions>
        <cds-table-toolbar-content ?has-batch-actions="${hasBatchActions}">
          <cds-table-toolbar-search
            @cds-search-input="${this
              ._handleChangeSearchString}"></cds-table-toolbar-search>
          <cds-overflow-menu>
            ${Settings16({ slot: 'icon' })}
            <cds-overflow-menu-body>
              <cds-overflow-menu-item> Action 1 </cds-overflow-menu-item>
              <cds-overflow-menu-item> Action 2 </cds-overflow-menu-item>
              <cds-overflow-menu-item> Action 3 </cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
          <cds-btn>Primary Button</cds-btn>
        </cds-table-toolbar-content>
      </cds-table-toolbar>
      <cds-table
        size="${size}"
        @cds-table-row-change-selection=${this._handleChangeSelection}
        @cds-table-change-selection-all=${this._handleChangeSelectionAll}
        @cds-table-header-cell-sort=${this._handleChangeSort}>
        <cds-table-head>
          <cds-table-header-row
            ?selected=${selectedAllInFiltered}
            selection-name=${ifDefined(selectionAllName)}
            selection-value=${ifDefined(selectionAllName)}>
            ${repeat(
              columns!,
              ({ id: columnId }) => columnId,
              ({ id: columnId, sortCycle, title }) => {
                const sortDirectionForThisCell =
                  sortCycle &&
                  (columnId === sortColumnId
                    ? sortDirection
                    : TABLE_SORT_DIRECTION.NONE);
                return html`
                  <cds-table-header-cell
                    sort-cycle="${ifDefined(sortCycle)}"
                    sort-direction="${ifDefined(sortDirectionForThisCell)}"
                    data-column-id="${columnId}">
                    ${title}
                  </cds-table-header-cell>
                `;
              }
            )}
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body color-scheme="${colorScheme}">
          ${repeat(
            sortedRows.slice(start, start + pageSize),
            ({ id: rowId }) => rowId,
            (row) => {
              const { id: rowId, selected } = row;
              const selectionName = !hasSelection
                ? undefined
                : `__${prefix}-ce-demo-data-table_${
                    elementId || this._uniqueId
                  }_${rowId}`;
              const selectionValue = !hasSelection ? undefined : 'selected';
              return html`
                <cds-table-row
                  ?selected=${hasSelection && selected}
                  selection-name="${ifDefined(selectionName)}"
                  selection-value="${ifDefined(selectionValue)}"
                  data-row-id="${rowId}">
                  ${repeat(
                    columns!,
                    ({ id: columnId }) => columnId,
                    ({ id: columnId }) =>
                      html` <cds-table-cell>${row[columnId]}</cds-table-cell> `
                  )}
                </cds-table-row>
              `;
            }
          )}
        </cds-table-body>
      </cds-table>
      ${this._renderPagination()}
    `;
  }

  /**
   * The map of how sorting direction affects sorting order.
   */
  static collationFactors = {
    [TABLE_SORT_DIRECTION.ASCENDING]: 1,
    [TABLE_SORT_DIRECTION.DESCENDING]: -1,
  };
}

const colorSchemes = {
  'Regular color scheme': null,
  [`Zebra (${TABLE_COLOR_SCHEME.ZEBRA})`]: TABLE_COLOR_SCHEME.ZEBRA,
};

const sizes = {
  [`xs (${TABLE_SIZE.XS})`]: TABLE_SIZE.XS,
  [`sm (${TABLE_SIZE.SM})`]: TABLE_SIZE.SM,
  [`md (${TABLE_SIZE.MD})`]: TABLE_SIZE.MD,
  [`lg (${TABLE_SIZE.LG} - default)`]: TABLE_SIZE.LG,
  [`xl (${TABLE_SIZE.XL})`]: TABLE_SIZE.XL,
};

const defineDemoDataTable = (() => {
  let hasDemoDataTableDefined;
  return () => {
    if (!hasDemoDataTableDefined) {
      hasDemoDataTableDefined = true;
      const ce = customElements;
      // Prevents `web-component-analyzer` from harvesting `<cds-ce-demo-data-table>`
      ce.define(`${prefix}-ce-demo-data-table`, BXCEDemoDataTable);
    }
  };
})();

export const Default = (args) => {
  const { size } = args?.[`${prefix}-table`] ?? {};
  const { colorScheme } = args?.[`${prefix}-table-body`] ?? {};
  return html`
    <cds-table size="${ifDefined(size)}">
      <cds-table-head>
        <cds-table-header-row>
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Protocol</cds-table-header-cell>
          <cds-table-header-cell>Port</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Attached Groups</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body color-scheme="${colorScheme}">
        <cds-table-row>
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>Round Robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>Round Robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>Round Robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-table`]: () => ({
      size: select('Table size (size)', sizes, null),
    }),
    [`${prefix}-table-body`]: () => ({
      colorScheme: select(
        'Color scheme (color-scheme in `<cds-table-body>`)',
        colorSchemes,
        null
      ),
    }),
  },
};

export const expandable = (args) => {
  const { size } = args?.[`${prefix}-table`] ?? {};
  const { zebra } = args?.[`${prefix}-table-body`] ?? {};
  const handleExpandRowAll = (event) => {
    const { currentTarget, detail } = event;
    const rows = currentTarget.querySelectorAll(`${prefix}-table-expand-row`);
    Array.prototype.forEach.call(rows, (row) => {
      row.expanded = detail.expanded;
    });
  };
  const handleExpandRow = (event) => {
    const { currentTarget } = event;
    const headerRow = currentTarget.querySelector(
      `${prefix}-table-header-expand-row`
    );
    const rows = currentTarget.querySelectorAll(`${prefix}-table-expand-row`);
    headerRow.expanded = Array.prototype.every.call(
      rows,
      (row) => row.expanded
    );
  };
  return html`
    <cds-table
      size="${ifDefined(size)}"
      @cds-table-row-expando-toggled-all="${handleExpandRowAll}"
      @cds-table-row-expando-toggled="${handleExpandRow}">
      <cds-table-head>
        <cds-table-header-expand-row>
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Protocol</cds-table-header-cell>
          <cds-table-header-cell>Port</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Attached Groups</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
        </cds-table-header-expand-row>
      </cds-table-head>
      <cds-table-body ?zebra="${zebra}">
        <cds-table-expand-row data-row-id="1">
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>Round Robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
        </cds-table-expand-row>
        <cds-table-expanded-row colspan="7">
          <h6>Expandable row content</h6>
          <div>Description here</div>
        </cds-table-expanded-row>
        <cds-table-expand-row data-row-id="2">
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>Round Robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
        </cds-table-expand-row>
        <cds-table-expanded-row colspan="7">
          <h6>Expandable row content</h6>
          <div>Description here</div>
        </cds-table-expanded-row>
        <cds-table-expand-row data-row-id="3">
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>Round Robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
        </cds-table-expand-row>
        <cds-table-expanded-row colspan="7">
          <h6>Expandable row content</h6>
          <div>Description here</div>
        </cds-table-expanded-row>
      </cds-table-body>
    </cds-table>
  `;
};

expandable.parameters = {
  knobs: {
    ...Default.parameters.knobs,
    [`${prefix}-table-body`]: () => ({}),
  },
};

export const sortable = (args) => {
  const { size } = args?.[`${prefix}-table`] ?? {};
  const { onBeforeChangeSelection: onBeforeChangeSelectionAll } =
    args?.[`${prefix}-table-header-row`] ?? {};
  const { colorScheme } = args?.[`${prefix}-table-body`] ?? {};
  const { hasSelection, disableChangeSelection, onBeforeChangeSelection } =
    args?.[`${prefix}-table-row`] ?? {};
  const { disableChangeSort, onBeforeSort } =
    args?.[`${prefix}-table-header-cell`] ?? {};
  const beforeChangeSelectionHandler = {
    handleEvent(event: CustomEvent) {
      if (event.type === `${prefix}-table-change-selection-all`) {
        onBeforeChangeSelectionAll(event);
      } else {
        onBeforeChangeSelection(event);
      }
      if (disableChangeSelection) {
        event.preventDefault();
      }
    },
    capture: true, // To prevent the default behavior before `<cds-ce-demo-data-table>` handles the event
  };
  const beforeChangeSortHandler = {
    handleEvent(event: CustomEvent) {
      onBeforeSort(event);
      if (disableChangeSort) {
        event.preventDefault();
      }
    },
    capture: true, // To prevent the default behavior before `<cds-ce-demo-data-table>` handles the event
  };
  defineDemoDataTable();
  return html`
    <style>
      ${styles}
    </style>
    <!-- Refer to <cds-ce-demo-data-table> implementation at the top for details -->
    <cds-ce-demo-data-table
      color-scheme="${colorScheme}"
      .columns=${demoColumns}
      .rows=${demoRows}
      .sortInfo=${demoSortInfo}
      ?has-selection=${hasSelection}
      size="${ifDefined(size)}"
      @cds-table-row-change-selection=${beforeChangeSelectionHandler}
      @cds-table-change-selection-all=${beforeChangeSelectionHandler}
      @cds-table-header-cell-sort=${beforeChangeSortHandler}>
    </cds-ce-demo-data-table>
  `;
};

sortable.parameters = {
  knobs: {
    ...Default.parameters.knobs,
    [`${prefix}-table-header-row`]: () => ({
      onBeforeChangeSelection: action(`${prefix}-table-change-selection-all`),
    }),
    [`${prefix}-table-row`]: () => {
      const hasSelection = boolean(
        'Supports selection feature (has-selection)',
        false
      );
      return {
        hasSelection,
        disableChangeSelection:
          hasSelection &&
          boolean(
            `Disable user-initiated change in selection '(Call event.preventDefault() in ${prefix}-table-row-change-selection/${prefix}-table-change-selection-all events)`,
            false
          ),
        onBeforeChangeSelection: action(`${prefix}-table-row-change-selection`),
      };
    },
    [`${prefix}-table-header-cell`]: () => ({
      disableChangeSort: boolean(
        `Disable user-initiated change in sorting (Call event.preventDefault() in ${prefix}-table-header-cell-sort event)`,
        false
      ),
      onBeforeSort: action(`${prefix}-table-header-cell-sort`),
    }),
  },
};

export const sortableWithPagination = (args) => {
  const { size } = args?.[`${prefix}-table`] ?? {};
  const { onBeforeChangeSelection: onBeforeChangeSelectionAll } =
    args?.[`${prefix}-table-header-row`] ?? {};
  const { colorScheme } = args?.[`${prefix}-table-body`] ?? {};
  const { hasSelection, disableChangeSelection, onBeforeChangeSelection } =
    args?.[`${prefix}-table-row`] ?? {};
  const { disableChangeSort, onBeforeSort } =
    args?.[`${prefix}-table-header-cell`] ?? {};
  const beforeChangeSelectionHandler = {
    handleEvent(event: CustomEvent) {
      if (event.type === `${prefix}-table-change-selection-all`) {
        onBeforeChangeSelectionAll(event);
      } else {
        onBeforeChangeSelection(event);
      }
      if (disableChangeSelection) {
        event.preventDefault();
      }
    },
    capture: true, // To prevent the default behavior before `<cds-ce-demo-data-table>` handles the event
  };
  const beforeChangeSortHandler = {
    handleEvent(event: CustomEvent) {
      onBeforeSort(event);
      if (disableChangeSort) {
        event.preventDefault();
      }
    },
    capture: true, // To prevent the default behavior before `<cds-ce-demo-data-table>` handles the event
  };
  defineDemoDataTable();
  return html`
    <style>
      ${styles}
    </style>
    <!-- Refer to <cds-ce-demo-data-table> implementation at the top for details -->
    <cds-ce-demo-data-table
      color-scheme="${colorScheme}"
      .columns=${demoColumns}
      .rows=${demoRowsMany}
      .sortInfo=${demoSortInfo}
      ?has-selection=${hasSelection}
      page-size="5"
      size="${ifDefined(size)}"
      start="0"
      @cds-table-row-change-selection=${beforeChangeSelectionHandler}
      @cds-table-change-selection-all=${beforeChangeSelectionHandler}
      @cds-table-header-cell-sort=${beforeChangeSortHandler}>
    </cds-ce-demo-data-table>
  `;
};

sortableWithPagination.storyName = 'Sortable with pagination';

sortableWithPagination.parameters = {
  knobs: sortable.parameters.knobs,
};

export const skeleton = (args) => {
  const { size } = args?.[`${prefix}-table`];
  const { colorScheme } = args?.[`${prefix}-table-body`];
  return html`
    <cds-table size="${size}">
      <cds-table-head>
        <cds-table-header-row>
          <cds-table-header-cell-skeleton>Name</cds-table-header-cell-skeleton>
          <cds-table-header-cell-skeleton
            >Protocol</cds-table-header-cell-skeleton
          >
          <cds-table-header-cell-skeleton>Port</cds-table-header-cell-skeleton>
          <cds-table-header-cell-skeleton>Rule</cds-table-header-cell-skeleton>
          <cds-table-header-cell-skeleton
            >Attached Groups</cds-table-header-cell-skeleton
          >
          <cds-table-header-cell-skeleton
            >Status</cds-table-header-cell-skeleton
          >
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body color-scheme="${colorScheme}">
        <cds-table-row>
          <cds-table-cell-skeleton></cds-table-cell-skeleton>
          <cds-table-cell-skeleton></cds-table-cell-skeleton>
          <cds-table-cell-skeleton></cds-table-cell-skeleton>
          <cds-table-cell-skeleton></cds-table-cell-skeleton>
          <cds-table-cell-skeleton></cds-table-cell-skeleton>
          <cds-table-cell-skeleton></cds-table-cell-skeleton>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
          <cds-table-cell></cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

skeleton.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    ...Default.parameters.knobs,
  },
};

export default {
  title: 'Components/Data table',
  parameters: {
    ...storyDocs.parameters,
  },
};
