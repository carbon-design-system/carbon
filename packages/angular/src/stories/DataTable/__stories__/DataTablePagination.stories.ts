/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  type ArgTypes,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  TableComponent,
  TableHeaderTitleComponent,
  TableHeaderDescriptionComponent,
  TableToolbarComponent,
  TableToolbarContentComponent,
  TableToolbarSearchComponent,
  TableHeadComponent,
  TableHeaderRowComponent,
  TableHeaderCellComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
} from '@carbon/angular/data-table';
import { PaginationComponent } from '@carbon/angular/pagination';
import { SelectItemComponent } from '@carbon/angular/select';
import { ButtonComponent } from '@carbon/angular/button';
import {
  OverflowMenuComponent,
  OverflowMenuBodyComponent,
  OverflowMenuItemComponent,
} from '@carbon/angular/overflow-menu';
import { MenuComponent, MenuItemComponent } from '@carbon/angular/menu';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import Settings16 from '@carbon/icons/es/settings/16.js';

const sizes = {
  'xs (xs)': 'xs',
  'sm (sm)': 'sm',
  'md (md)': 'md',
  'lg (lg - default)': 'lg',
  'xl (xl)': 'xl',
};

const defaultArgs = {
  locale: 'en',
  size: 'lg',
  useStaticWidth: false,
  useZebraStyles: false,
};

const controls: ArgTypes = {
  locale: {
    control: 'text',
    description: 'Provide a string for the current locale.',
  },
  size: {
    control: 'radio',
    description: 'Change the row height of table.',
    options: Object.values(sizes),
    labels: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [v, k])),
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

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/Pagination',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TableComponent,
        TableHeaderTitleComponent,
        TableHeaderDescriptionComponent,
        TableToolbarComponent,
        TableToolbarContentComponent,
        TableToolbarSearchComponent,
        TableHeadComponent,
        TableHeaderRowComponent,
        TableHeaderCellComponent,
        TableBodyComponent,
        TableRowComponent,
        TableCellComponent,
        PaginationComponent,
        SelectItemComponent,
        ButtonComponent,
        OverflowMenuComponent,
        OverflowMenuBodyComponent,
        OverflowMenuItemComponent,
        MenuComponent,
        MenuItemComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  render: (args) => {
    const allRows = generateRows(100);

    return {
      props: {
        ...args,
        allRows,
        page: 1,
        pageSize: 10,
        searchValue: '',
        getFilteredRows() {
          const search = (this.searchValue || '').trim().toLowerCase();
          return search
            ? this.allRows.filter((row: any) =>
                Object.values(row).some((v) =>
                  String(v).toLowerCase().includes(search)
                )
              )
            : this.allRows;
        },
        getPaginatedRows() {
          const start = (this.page - 1) * this.pageSize;
          return this.getFilteredRows().slice(start, start + this.pageSize);
        },
        onSearch(event: any) {
          this.searchValue =
            event?.detail?.value ?? event?.target?.value ?? event?.value ?? '';
          this.page = 1;
        },
        onPageChange(event: any) {
          const page =
            event?.detail?.page ??
            event?.page ??
            (typeof event === 'number' ? event : null);
          if (page != null) {
            this.page = page;
          }
        },
        onPageSizeChange(event: any) {
          const pageSize =
            event?.detail?.pageSize ??
            event?.pageSize ??
            (typeof event === 'number' ? event : null);
          if (pageSize != null) {
            this.pageSize = pageSize;
            this.page = 1;
          }
        },
      },
      template: `
        <div>
          <cds-ng-table
            [locale]="locale"
            [size]="size"
            [useStaticWidth]="useStaticWidth"
            [useZebraStyles]="useZebraStyles">
            <cds-ng-table-header-title slot="title"
              >Load Balancers</cds-ng-table-header-title
            >
            <cds-ng-table-header-description slot="description"
              >Paginated data table with persistent toolbar</cds-ng-table-header-description
            >
            <cds-ng-table-toolbar slot="toolbar">
              <cds-ng-table-toolbar-content>
                <cds-ng-table-toolbar-search
                  [persistent]="true"
                  placeholder="Filter table"
                  (searchInput)="onSearch($event)"
                  (cds-ng-search-input)="onSearch($event)"></cds-ng-table-toolbar-search>
                <cds-ng-overflow-menu
                  [toolbarAction]="true"
                  label="Settings">
                  ${iconToSvg(Settings16, {
                    slot: 'icon',
                    class: 'cds--overflow-menu__icon',
                  })}
                  <cds-ng-menu>
                    <cds-ng-menu-item label="Action 1"></cds-ng-menu-item>
                    <cds-ng-menu-item label="Action 2"></cds-ng-menu-item>
                    <cds-ng-menu-item label="Action 3"></cds-ng-menu-item>
                  </cds-ng-menu>
                </cds-ng-overflow-menu>
                <cds-ng-button>Primary Button</cds-ng-button>
              </cds-ng-table-toolbar-content>
            </cds-ng-table-toolbar>
            <cds-ng-table-head>
              <cds-ng-table-header-row>
                <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
                <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
                <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
                <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
                <cds-ng-table-header-cell>Attached groups</cds-ng-table-header-cell>
                <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
              </cds-ng-table-header-row>
            </cds-ng-table-head>
            <cds-ng-table-body>
              <cds-ng-table-row *ngFor="let row of getPaginatedRows()">
                <cds-ng-table-cell>{{ row.name }}</cds-ng-table-cell>
                <cds-ng-table-cell>{{ row.protocol }}</cds-ng-table-cell>
                <cds-ng-table-cell>{{ row.port }}</cds-ng-table-cell>
                <cds-ng-table-cell>{{ row.rule }}</cds-ng-table-cell>
                <cds-ng-table-cell>{{ row.attachedGroups }}</cds-ng-table-cell>
                <cds-ng-table-cell>{{ row.status }}</cds-ng-table-cell>
              </cds-ng-table-row>
            </cds-ng-table-body>
          </cds-ng-table>
          <cds-ng-pagination
            [page]="page"
            [pageSize]="pageSize"
            [totalItems]="getFilteredRows().length"
            itemsPerPageText="Items per page:"
            [size]="size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'"
            style="border-block-start: 0"
            (paginationChangedCurrent)="onPageChange($event)"
            (pageSizesSelectChanged)="onPageSizeChange($event)"
            (cds-ng-pagination-changed-current)="onPageChange($event)"
            (cds-ng-page-sizes-select-changed)="onPageSizeChange($event)">
            <cds-ng-select-item value="10">10</cds-ng-select-item>
            <cds-ng-select-item value="20">20</cds-ng-select-item>
            <cds-ng-select-item value="30">30</cds-ng-select-item>
            <cds-ng-select-item value="40">40</cds-ng-select-item>
            <cds-ng-select-item value="50">50</cds-ng-select-item>
          </cds-ng-pagination>
        </div>
      `,
    };
  },
};
