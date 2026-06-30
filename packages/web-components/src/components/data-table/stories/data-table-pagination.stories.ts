/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../../globals/settings';
import { TABLE_SIZE } from '../table';
import { PAGINATION_SIZE } from '../../pagination/defs';
import { iconLoader } from '../../../globals/internal/icon-loader';
import Settings16 from '@carbon/icons/es/settings/16.js';
import '../index';
import '../../pagination/index';
import '../../select/index';
import storyDocs from './data-table.mdx';

const sizes = {
  [`xs (${TABLE_SIZE.XS})`]: TABLE_SIZE.XS,
  [`sm (${TABLE_SIZE.SM})`]: TABLE_SIZE.SM,
  [`md (${TABLE_SIZE.MD})`]: TABLE_SIZE.MD,
  [`lg (${TABLE_SIZE.LG} - default)`]: TABLE_SIZE.LG,
  [`xl (${TABLE_SIZE.XL})`]: TABLE_SIZE.XL,
};

type PaginationStoryArgs = {
  locale: string;
  size: TABLE_SIZE;
  useStaticWidth: boolean;
  useZebraStyles: boolean;
};

const defaultArgs: PaginationStoryArgs = {
  locale: 'en',
  size: TABLE_SIZE.LG,
  useStaticWidth: false,
  useZebraStyles: false,
};

const controls = {
  locale: {
    control: 'text',
    description: 'Provide a string for the current locale.',
  },
  size: {
    control: 'radio',
    description: 'Change the row height of table.',
    options: sizes,
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'Use static width.',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Use zebra styles.',
  },
};

// Generate sample data for pagination
const generateRows = (count: number) => {
  const protocols = ['HTTP', 'HTTPS', 'TCP', 'UDP'];
  const rules = ['Round robin', 'DNS delegation', 'Least connections'];
  const statuses = ['Active', 'Starting', 'Disabled'];
  const ports = [80, 443, 3000, 8080, 8443];

  return Array.from({ length: count }, (_, i) => ({
    id: `load-balancer-${i + 1}`,
    name: `Load Balancer ${i + 1}`,
    protocol: protocols[i % protocols.length],
    port: ports[i % ports.length],
    rule: rules[i % rules.length],
    attachedGroups: `VM Group ${i + 1}`,
    status: statuses[i % statuses.length],
  }));
};

// Map TABLE_SIZE to PAGINATION_SIZE
const getPaginationSize = (tableSize: TABLE_SIZE): PAGINATION_SIZE => {
  const sizeMap: Record<TABLE_SIZE, PAGINATION_SIZE> = {
    [TABLE_SIZE.XS]: PAGINATION_SIZE.XS,
    [TABLE_SIZE.SM]: PAGINATION_SIZE.SMALL,
    [TABLE_SIZE.MD]: PAGINATION_SIZE.MEDIUM,
    [TABLE_SIZE.LG]: PAGINATION_SIZE.LARGE,
    [TABLE_SIZE.XL]: PAGINATION_SIZE.LARGE,
  };

  return sizeMap[tableSize] ?? PAGINATION_SIZE.MEDIUM;
};

/**
 * Stateful wrapper component for pagination demo.
 *
 * Uses the cds-table intended filtering API:
 * - All rows are always present in the DOM.
 * - cds-table-toolbar-search fires cds-search-input; cds-table intercepts it
 *   and marks non-matching rows with filtered="" (display:none).
 * - cds-table then fires cds-table-filtered with detail.unfilteredRows — the
 *   rows that survived the search. We page through that set by setting
 *   filtered="" on rows outside the current page window ourselves.
 * - cds-pagination receives unfilteredRows.length as total-items.
 */
class PaginatedDataTableDemo extends LitElement {
  static properties = {
    locale: { type: String },
    size: { type: String },
    useStaticWidth: { type: Boolean, attribute: 'use-static-width' },
    useZebraStyles: { type: Boolean, attribute: 'use-zebra-styles' },
    _currentPage: { type: Number, state: true },
    _pageSize: { type: Number, state: true },
    _unfilteredCount: { type: Number, state: true },
  };

  locale = 'en';
  size = TABLE_SIZE.LG;
  useStaticWidth = false;
  useZebraStyles = false;
  _currentPage = 1;
  _pageSize = 10;
  _unfilteredCount = 100;
  _allRows = generateRows(100);

  // Rows that passed the current search filter — kept in sync by
  // _handleTableFiltered and seeded in firstUpdated for the no-search case.
  _searchMatchRows: Element[] = [];

  firstUpdated() {
    // cds-table-filtered is only fired on user interaction (search/sort), not
    // on initial render. Seed the match list with all rows and apply page 1.
    const tableBody = this.shadowRoot?.querySelector('cds-table-body');
    if (tableBody) {
      this._searchMatchRows = Array.from(
        tableBody.querySelectorAll('cds-table-row')
      );
    }
    this._applyPageWindow();
  }

  // Called by cds-table after it has applied its own search filtering.
  // detail.unfilteredRows contains the rows whose textContent matched the
  // search string — cds-table has already set filtered="" on the rest.
  _handleTableFiltered(event: CustomEvent) {
    const unfilteredRows: Element[] = event.detail.unfilteredRows;
    this._searchMatchRows = unfilteredRows;
    this._unfilteredCount = unfilteredRows.length;
    this._currentPage = 1;
    this._applyPageWindow();
  }

  _handlePageChange(event: CustomEvent) {
    this._currentPage = event.detail.page;
    this._applyPageWindow();
  }

  _handlePageSizeChange(event: CustomEvent) {
    this._pageSize = event.detail.pageSize;
    this._currentPage = 1;
    this._applyPageWindow();
  }

  // Pages through _searchMatchRows by setting filtered="" on rows outside the
  // current window. Rows not in _searchMatchRows (search-filtered by cds-table)
  // are never touched here — their filtered state is owned by cds-table.
  _applyPageWindow() {
    const start = (this._currentPage - 1) * this._pageSize;
    const end = start + this._pageSize;

    this._searchMatchRows.forEach((row, i) => {
      (row as any).filtered = i < start || i >= end;
    });
  }

  render() {
    const paginationSize = getPaginationSize(this.size);

    return html`
      <div>
        <cds-table
          locale="${this.locale}"
          size="${this.size}"
          ?use-static-width="${this.useStaticWidth}"
          ?use-zebra-styles="${this.useZebraStyles}"
          @cds-table-filtered="${this._handleTableFiltered}">
          <cds-table-header-title slot="title"
            >Load Balancers</cds-table-header-title
          >
          <cds-table-header-description slot="description"
            >Paginated data table with persistent
            toolbar</cds-table-header-description
          >
          <cds-table-toolbar slot="toolbar">
            <cds-table-toolbar-content>
              <cds-table-toolbar-search
                persistent
                placeholder="Filter table"></cds-table-toolbar-search>
              <cds-overflow-menu toolbar-action>
                ${iconLoader(Settings16, {
                  slot: 'icon',
                  class: `${prefix}--overflow-menu__icon`,
                })}
                <span slot="tooltip-content">Settings</span>
                <cds-overflow-menu-body flipped>
                  <cds-overflow-menu-item> Action 1 </cds-overflow-menu-item>
                  <cds-overflow-menu-item> Action 2 </cds-overflow-menu-item>
                  <cds-overflow-menu-item> Action 3 </cds-overflow-menu-item>
                </cds-overflow-menu-body>
              </cds-overflow-menu>
              <cds-button>Primary Button</cds-button>
            </cds-table-toolbar-content>
          </cds-table-toolbar>
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Name</cds-table-header-cell>
              <cds-table-header-cell>Protocol</cds-table-header-cell>
              <cds-table-header-cell>Port</cds-table-header-cell>
              <cds-table-header-cell>Rule</cds-table-header-cell>
              <cds-table-header-cell>Attached groups</cds-table-header-cell>
              <cds-table-header-cell>Status</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            ${this._allRows.map(
              (row) => html`
                <cds-table-row>
                  <cds-table-cell>${row.name}</cds-table-cell>
                  <cds-table-cell>${row.protocol}</cds-table-cell>
                  <cds-table-cell>${row.port}</cds-table-cell>
                  <cds-table-cell>${row.rule}</cds-table-cell>
                  <cds-table-cell>${row.attachedGroups}</cds-table-cell>
                  <cds-table-cell>${row.status}</cds-table-cell>
                </cds-table-row>
              `
            )}
          </cds-table-body>
        </cds-table>
        <cds-pagination
          page="${this._currentPage}"
          page-size="${this._pageSize}"
          total-items="${this._unfilteredCount}"
          items-per-page-text="Items per page:"
          size="${paginationSize}"
          style="border-block-start: 0"
          @cds-pagination-changed-current="${this._handlePageChange}"
          @cds-page-sizes-select-changed="${this._handlePageSizeChange}">
          <cds-select-item value="10">10</cds-select-item>
          <cds-select-item value="20">20</cds-select-item>
          <cds-select-item value="30">30</cds-select-item>
          <cds-select-item value="40">40</cds-select-item>
          <cds-select-item value="50">50</cds-select-item>
        </cds-pagination>
      </div>
    `;
  }
}

customElements.define('paginated-data-table-demo', PaginatedDataTableDemo);

/**
 * Alternative stateful wrapper that handles filtering client-side.
 *
 * Instead of delegating filtering to cds-table, this component intercepts the
 * cds-search-input event (stopping propagation so cds-table never sees it),
 * filters the data array itself, and re-renders only the matching rows.
 * Use this pattern when you need custom filter logic beyond plain text matching
 * (e.g. fuzzy search, field-specific filtering, server-side search).
 */
class PaginatedDataTableClientFilterDemo extends LitElement {
  static properties = {
    locale: { type: String },
    size: { type: String },
    useStaticWidth: { type: Boolean, attribute: 'use-static-width' },
    useZebraStyles: { type: Boolean, attribute: 'use-zebra-styles' },
    _currentPage: { type: Number, state: true },
    _pageSize: { type: Number, state: true },
    _searchValue: { type: String, state: true },
  };

  locale = 'en';
  size = TABLE_SIZE.LG;
  useStaticWidth = false;
  useZebraStyles = false;
  _currentPage = 1;
  _pageSize = 10;
  _searchValue = '';
  _allRows = generateRows(100);

  _getFilteredRows() {
    const search = this._searchValue.trim().toLowerCase();
    if (!search) return this._allRows;
    return this._allRows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  }

  _getPaginatedRows() {
    const filtered = this._getFilteredRows();
    const start = (this._currentPage - 1) * this._pageSize;
    return filtered.slice(start, start + this._pageSize);
  }

  // Stop propagation so cds-table's own _handleFilterRows never fires.
  // Without this, cds-table would also walk the DOM rows and stamp
  // filtered="" based on stale rendered content, conflicting with the
  // rows we are about to re-render.
  _handleSearchInput(event: CustomEvent) {
    event.stopPropagation();
    this._searchValue = event.detail?.value ?? '';
    this._currentPage = 1;
  }

  _handlePageChange(event: CustomEvent) {
    this._currentPage = event.detail.page;
  }

  _handlePageSizeChange(event: CustomEvent) {
    this._pageSize = event.detail.pageSize;
    this._currentPage = 1;
  }

  render() {
    const filteredRows = this._getFilteredRows();
    const paginatedRows = this._getPaginatedRows();
    const paginationSize = getPaginationSize(this.size);

    return html`
      <div>
        <cds-table
          locale="${this.locale}"
          size="${this.size}"
          ?use-static-width="${this.useStaticWidth}"
          ?use-zebra-styles="${this.useZebraStyles}">
          <cds-table-header-title slot="title"
            >Load Balancers</cds-table-header-title
          >
          <cds-table-header-description slot="description"
            >Paginated data table — client-side
            filtering</cds-table-header-description
          >
          <cds-table-toolbar slot="toolbar">
            <cds-table-toolbar-content>
              <cds-table-toolbar-search
                persistent
                placeholder="Filter table"
                @cds-search-input="${this
                  ._handleSearchInput}"></cds-table-toolbar-search>
              <cds-overflow-menu toolbar-action>
                ${iconLoader(Settings16, {
                  slot: 'icon',
                  class: `${prefix}--overflow-menu__icon`,
                })}
                <span slot="tooltip-content">Settings</span>
                <cds-overflow-menu-body flipped>
                  <cds-overflow-menu-item> Action 1 </cds-overflow-menu-item>
                  <cds-overflow-menu-item> Action 2 </cds-overflow-menu-item>
                  <cds-overflow-menu-item> Action 3 </cds-overflow-menu-item>
                </cds-overflow-menu-body>
              </cds-overflow-menu>
              <cds-button>Primary Button</cds-button>
            </cds-table-toolbar-content>
          </cds-table-toolbar>
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Name</cds-table-header-cell>
              <cds-table-header-cell>Protocol</cds-table-header-cell>
              <cds-table-header-cell>Port</cds-table-header-cell>
              <cds-table-header-cell>Rule</cds-table-header-cell>
              <cds-table-header-cell>Attached groups</cds-table-header-cell>
              <cds-table-header-cell>Status</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            ${paginatedRows.map(
              (row) => html`
                <cds-table-row>
                  <cds-table-cell>${row.name}</cds-table-cell>
                  <cds-table-cell>${row.protocol}</cds-table-cell>
                  <cds-table-cell>${row.port}</cds-table-cell>
                  <cds-table-cell>${row.rule}</cds-table-cell>
                  <cds-table-cell>${row.attachedGroups}</cds-table-cell>
                  <cds-table-cell>${row.status}</cds-table-cell>
                </cds-table-row>
              `
            )}
          </cds-table-body>
        </cds-table>
        <cds-pagination
          page="${this._currentPage}"
          page-size="${this._pageSize}"
          total-items="${filteredRows.length}"
          items-per-page-text="Items per page:"
          size="${paginationSize}"
          style="border-block-start: 0"
          @cds-pagination-changed-current="${this._handlePageChange}"
          @cds-page-sizes-select-changed="${this._handlePageSizeChange}">
          <cds-select-item value="10">10</cds-select-item>
          <cds-select-item value="20">20</cds-select-item>
          <cds-select-item value="30">30</cds-select-item>
          <cds-select-item value="40">40</cds-select-item>
          <cds-select-item value="50">50</cds-select-item>
        </cds-pagination>
      </div>
    `;
  }
}

customElements.define(
  'paginated-data-table-client-filter-demo',
  PaginatedDataTableClientFilterDemo
);

export const WithClientSideFiltering = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    locale,
    size,
    useStaticWidth,
    useZebraStyles,
  }: PaginationStoryArgs) => {
    return html`
      <paginated-data-table-client-filter-demo
        locale="${locale}"
        size="${size}"
        ?use-static-width="${useStaticWidth}"
        ?use-zebra-styles="${useZebraStyles}">
      </paginated-data-table-client-filter-demo>
    `;
  },
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: PaginatedDataTableClientFilterDemo.toString(),
      },
    },
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    locale,
    size,
    useStaticWidth,
    useZebraStyles,
  }: PaginationStoryArgs) => {
    return html`
      <paginated-data-table-demo
        locale="${locale}"
        size="${size}"
        ?use-static-width="${useStaticWidth}"
        ?use-zebra-styles="${useZebraStyles}">
      </paginated-data-table-demo>
    `;
  },
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: PaginatedDataTableDemo.toString(),
      },
    },
  },
};

const meta = {
  title: 'Components/DataTable/Pagination',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
