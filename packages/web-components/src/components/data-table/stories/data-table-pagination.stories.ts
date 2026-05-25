/**
 * Copyright IBM Corp. 2019, 2026
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

const defaultArgs = {
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
  switch (tableSize) {
    case TABLE_SIZE.XS:
      return PAGINATION_SIZE.XS;
    case TABLE_SIZE.SM:
      return PAGINATION_SIZE.SMALL;
    case TABLE_SIZE.MD:
      return PAGINATION_SIZE.MEDIUM;
    case TABLE_SIZE.LG:
    case TABLE_SIZE.XL:
    default:
      return PAGINATION_SIZE.LARGE;
  }
};

/**
 * Stateful wrapper component for pagination demo
 */
class PaginatedDataTableDemo extends LitElement {
  static properties = {
    locale: { type: String },
    size: { type: String },
    useStaticWidth: { type: Boolean, attribute: 'use-static-width' },
    useZebraStyles: { type: Boolean, attribute: 'use-zebra-styles' },
    _currentPage: { type: Number, state: true },
    _pageSize: { type: Number, state: true },
  };

  locale = 'en';
  size = TABLE_SIZE.LG;
  useStaticWidth = false;
  useZebraStyles = false;
  _currentPage = 1;
  _pageSize = 10;
  _allRows = generateRows(100);

  _handlePageChange(event: CustomEvent) {
    this._currentPage = event.detail.page;
  }

  _handlePageSizeChange(event: CustomEvent) {
    this._pageSize = event.detail.value;
    this._currentPage = 1; // Reset to first page when page size changes
  }

  _getPaginatedRows() {
    const startIndex = (this._currentPage - 1) * this._pageSize;
    const endIndex = startIndex + this._pageSize;
    return this._allRows.slice(startIndex, endIndex);
  }

  render() {
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
                <cds-overflow-menu-body>
                  <cds-overflow-menu-item> Action 1 </cds-overflow-menu-item>
                  <cds-overflow-menu-item> Action 2 </cds-overflow-menu-item>
                  <cds-overflow-menu-item> Action 3 </cds-overflow-menu-item>
                </cds-overflow-menu-body>
              </cds-overflow-menu>
              <cds-button>Primary button</cds-button>
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
                <cds-table-row size="${this.size}">
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
          total-items="${this._allRows.length}"
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

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ locale, size, useStaticWidth, useZebraStyles }: any) => {
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
