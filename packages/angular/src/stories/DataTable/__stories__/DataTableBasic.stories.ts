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
  TableHeadComponent,
  TableHeaderRowComponent,
  TableHeaderCellComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
  TableCellContentComponent,
} from '@carbon/angular/data-table';

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

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/Basic',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [
        TableComponent,
        TableHeadComponent,
        TableHeaderRowComponent,
        TableHeaderCellComponent,
        TableBodyComponent,
        TableRowComponent,
        TableCellComponent,
        TableCellContentComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [locale]="locale"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-head>
          <cds-ng-table-header-row>
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Other</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Example</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Starting</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Active</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 7</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};

export const XLWithTwoLines: Story = {
  args: { size: 'xl' },
  argTypes: {
    size: { table: { readonly: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [locale]="locale"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-head>
          <cds-ng-table-header-row>
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Other</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Example</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 1
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Starting</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 2
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Active</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 3
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 4
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 5
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 6
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>
              Load Balancer 7
              <cds-ng-table-cell-content>Austin, Tx</cds-ng-table-cell-content>
            </cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Disabled</cds-ng-table-cell>
            <cds-ng-table-cell>Test</cds-ng-table-cell>
            <cds-ng-table-cell>22</cds-ng-table-cell>
          </cds-ng-table-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};
