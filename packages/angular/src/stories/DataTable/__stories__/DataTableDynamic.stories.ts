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
import {
  TableComponent,
  TableHeaderTitleComponent,
  TableHeaderDescriptionComponent,
  TableToolbarComponent,
  TableBatchActionsComponent,
  TableToolbarContentComponent,
  TableToolbarSearchComponent,
  TableHeadComponent,
  TableHeaderRowComponent,
  TableHeaderCellComponent,
  TableBodyComponent,
  TableRowComponent,
  TableExpandedRowComponent,
  TableCellComponent,
} from '@carbon/angular/data-table';
import { ButtonComponent } from '@carbon/angular/button';
import { IconIndicatorComponent } from '@carbon/angular/icon-indicator';
import {
  OverflowMenuComponent,
  OverflowMenuBodyComponent,
  OverflowMenuItemComponent,
} from '@carbon/angular/overflow-menu';
import { MenuComponent, MenuItemComponent } from '@carbon/angular/menu';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import Save16 from '@carbon/icons/es/save/16.js';
import TrashCan16 from '@carbon/icons/es/trash-can/16.js';
import Download16 from '@carbon/icons/es/download/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';

const sizes = {
  'xs (xs)': 'xs',
  'sm (sm)': 'sm',
  'md (md)': 'md',
  'lg (lg - default)': 'lg',
  'xl (xl)': 'xl',
};

const defaultArgs = {
  isSortable: false,
  locale: 'en',
  radio: false,
  size: 'lg',
  useStaticWidth: false,
  useZebraStyles: false,
};

const controls: ArgTypes = {
  isSortable: {
    control: 'boolean',
    description: 'Is sortable',
  },
  locale: {
    control: 'text',
    description: 'Locale',
  },
  radio: {
    control: 'boolean',
    description: 'Radio',
  },
  size: {
    control: 'radio',
    description: 'Size',
    options: Object.values(sizes),
    labels: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [v, k])),
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'Use static width',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Use zebra styles',
  },
};

let headerCount = 6;
let rowCount = 1;

const insertInRandomPosition = <T>(array: T[], element: T): T[] => {
  const index = Math.floor(Math.random() * (array.length + 1));
  return [...array.slice(0, index), element, ...array.slice(index)];
};

const addRow = () => {
  const newRow = document.createElement('cds-table-row');

  const templateRow: Record<string, string | number> = {
    name: `New Row ${rowCount}`,
    protocol: 'HTTP',
    port: rowCount * 100,
    rule: rowCount % 2 === 0 ? 'Round robin' : 'DNS delegation',
    attached_groups: `Row ${rowCount}'s VM Groups`,
    status: 'Starting',
  };

  for (const key in templateRow) {
    if (Object.prototype.hasOwnProperty.call(templateRow, key)) {
      const cell = document.createElement('cds-table-cell');
      cell.textContent = String(templateRow[key]);
      newRow.appendChild(cell);
    }
  }

  const rows = document.querySelectorAll('cds-table-row');
  const diff = headerCount - Object.keys(templateRow).length;

  [...Array(diff)].forEach(() => {
    const newCell = document.createElement('cds-table-cell');
    newCell.textContent = `Header ${headerCount - 1}`;
    newRow.appendChild(newCell);
  });

  newRow.setAttribute('selection-name', `${rows.length}`);

  const updatedRows = insertInRandomPosition(Array.from(rows), newRow);
  updatedRows.forEach((e) => {
    document.querySelector('cds-table-body')?.insertBefore(e, null);
  });

  rowCount++;
};

const addHeader = () => {
  const headerRow = document.querySelector('cds-table-header-row');
  const newHeader = document.createElement('cds-table-header-cell');
  newHeader.textContent = `Header ${headerCount}`;
  headerRow?.appendChild(newHeader);

  const rows = document.querySelectorAll('cds-table-row');
  rows.forEach((e) => {
    const newCell = document.createElement('cds-table-cell');
    newCell.textContent = `Header ${headerCount}`;
    e.appendChild(newCell);
  });
  headerCount++;
};

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/Dynamic',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [
        TableComponent,
        TableHeaderTitleComponent,
        TableHeaderDescriptionComponent,
        TableToolbarComponent,
        TableBatchActionsComponent,
        TableToolbarContentComponent,
        TableToolbarSearchComponent,
        TableHeadComponent,
        TableHeaderRowComponent,
        TableHeaderCellComponent,
        TableBodyComponent,
        TableRowComponent,
        TableExpandedRowComponent,
        TableCellComponent,
        ButtonComponent,
        IconIndicatorComponent,
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
  render: (args) => ({
    props: {
      ...args,
      addRow,
      addHeader,
    },
    template: `
      <cds-ng-table
        [expandable]="true"
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">
          <h2 class="demo-table-heading">DataTable</h2>
        </cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >Use the toolbar menu to add rows and
          headers</cds-ng-table-header-description
        >

        <cds-ng-table-toolbar slot="toolbar">
          <cds-ng-table-batch-actions>
            <cds-ng-button>
              Delete ${iconToSvg(TrashCan16, { slot: 'icon' })}
            </cds-ng-button>
            <cds-ng-button>
              Save ${iconToSvg(Save16, { slot: 'icon' })}
            </cds-ng-button>
            <cds-ng-button href="javascript:void 0" download="table-data.json">
              Download ${iconToSvg(Download16, { slot: 'icon' })}
            </cds-ng-button>
          </cds-ng-table-batch-actions>
          <cds-ng-table-toolbar-content>
            <cds-ng-table-toolbar-search
              placeholder="Filter table"></cds-ng-table-toolbar-search>
            <cds-ng-overflow-menu
              [toolbarAction]="true"
              label="Settings">
              ${iconToSvg(Settings16, {
                slot: 'icon',
                class: 'cds--overflow-menu__icon',
              })}
              <cds-ng-menu>
                <cds-ng-menu-item label="Add row" (click)="addRow()"></cds-ng-menu-item>
                <cds-ng-menu-item label="Add header" (click)="addHeader()"></cds-ng-menu-item>
              </cds-ng-menu>
            </cds-ng-overflow-menu>
          </cds-ng-table-toolbar-content>
        </cds-ng-table-toolbar>

        <cds-ng-table-head>
          <cds-ng-table-header-row selectionName="header">
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Attached groups</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row selectionName="0">
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Kevin's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell>
              <cds-ng-icon-indicator
                kind="failed"
                label="Failed"></cds-ng-icon-indicator>
            </cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="1">
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell>
              <cds-ng-icon-indicator
                kind="succeeded"
                label="Succeeded"></cds-ng-icon-indicator>
            </cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="2">
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell>
              <cds-ng-icon-indicator
                kind="in-progress"
                label="in-progress"></cds-ng-icon-indicator>
            </cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="3">
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell>
              <cds-ng-icon-indicator
                kind="failed"
                label="Failed"></cds-ng-icon-indicator>
            </cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="4">
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell>
              <cds-ng-icon-indicator
                kind="succeeded"
                label="Succeeded"></cds-ng-icon-indicator>
            </cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="5">
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Ronja's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell>
              <cds-ng-icon-indicator
                kind="in-progress"
                label="in-progress"></cds-ng-icon-indicator>
            </cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};
