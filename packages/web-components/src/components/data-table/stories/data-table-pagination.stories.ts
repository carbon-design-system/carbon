/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import { enabled } from '@carbon/feature-flags';
import { prefix } from '../../../globals/settings';
import { TABLE_SIZE } from '../table';
import { PAGINATION_SIZE } from '../../pagination/defs';
import { iconLoader } from '../../../globals/internal/icon-loader';
import Settings16 from '@carbon/icons/es/settings/16.js';
import '../index';
import '../../overflow-menu/';
import '../../menu/index';
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

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    locale,
    size,
    useStaticWidth,
    useZebraStyles,
  }: PaginationStoryArgs) => {
    const allRows = generateRows(100);
    let currentPage = 1;
    let pageSize = 10;
    let searchValue = '';

    const container = document.createElement('div');

    const update = () => {
      const search = searchValue.trim().toLowerCase();
      const filteredRows = search
        ? allRows.filter((row) =>
            Object.values(row).some((v) =>
              String(v).toLowerCase().includes(search)
            )
          )
        : allRows;
      const start = (currentPage - 1) * pageSize;
      const paginatedRows = filteredRows.slice(start, start + pageSize);
      const paginationSize = getPaginationSize(size);

      render(
        html`
          <cds-table
            locale="${locale}"
            size="${size}"
            ?use-static-width="${useStaticWidth}"
            ?use-zebra-styles="${useZebraStyles}">
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
                ${enabled('enable-v12-overflowmenu')
                  ? html`
                      <cds-overflow-menu
                        enable-v12-overflowmenu
                        toolbar-action
                        label="Settings">
                        ${iconLoader(Settings16, {
                          slot: 'icon',
                          class: `${prefix}--overflow-menu__icon`,
                        })}
                        <cds-menu>
                          <cds-menu-item label="Action 1"></cds-menu-item>
                          <cds-menu-item label="Action 2"></cds-menu-item>
                          <cds-menu-item label="Action 3"></cds-menu-item>
                        </cds-menu>
                      </cds-overflow-menu>
                    `
                  : html`
                      <cds-overflow-menu toolbar-action>
                        ${iconLoader(Settings16, {
                          slot: 'icon',
                          class: `${prefix}--overflow-menu__icon`,
                        })}
                        <span slot="tooltip-content">Settings</span>
                        <cds-overflow-menu-body flipped>
                          <cds-overflow-menu-item>
                            Action 1
                          </cds-overflow-menu-item>
                          <cds-overflow-menu-item>
                            Action 2
                          </cds-overflow-menu-item>
                          <cds-overflow-menu-item>
                            Action 3
                          </cds-overflow-menu-item>
                        </cds-overflow-menu-body>
                      </cds-overflow-menu>
                    `}
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
            page="${currentPage}"
            page-size="${pageSize}"
            total-items="${filteredRows.length}"
            items-per-page-text="Items per page:"
            size="${paginationSize}"
            style="border-block-start: 0">
            <cds-select-item value="10">10</cds-select-item>
            <cds-select-item value="20">20</cds-select-item>
            <cds-select-item value="30">30</cds-select-item>
            <cds-select-item value="40">40</cds-select-item>
            <cds-select-item value="50">50</cds-select-item>
          </cds-pagination>
        `,
        container
      );
    };

    // Stop propagation so cds-table's own _handleFilterRows never fires.
    container.addEventListener('cds-search-input', (e: Event) => {
      e.stopPropagation();
      searchValue = (e as CustomEvent).detail?.value ?? '';
      currentPage = 1;
      update();
    });
    container.addEventListener('cds-pagination-changed-current', (e: Event) => {
      currentPage = (e as CustomEvent).detail.page;
      update();
    });
    container.addEventListener('cds-page-sizes-select-changed', (e: Event) => {
      pageSize = (e as CustomEvent).detail.pageSize;
      currentPage = 1;
      update();
    });

    update();
    return container;
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
