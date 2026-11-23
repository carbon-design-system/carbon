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
  TableHeadComponent,
  TableHeaderRowComponent,
  TableHeaderCellComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
} from '@carbon/angular/data-table';
import { LinkComponent } from '@carbon/angular/link';

const sizes = {
  'xs (xs)': 'xs',
  'sm (sm)': 'sm',
  'md (md)': 'md',
  'lg (lg - default)': 'lg',
  'xl (xl)': 'xl',
};

const defaultArgs = {
  isSortable: true,
  locale: 'en',
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

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/Sorting',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [
        TableComponent,
        TableHeaderTitleComponent,
        TableHeaderDescriptionComponent,
        TableHeadComponent,
        TableHeaderRowComponent,
        TableHeaderCellComponent,
        TableBodyComponent,
        TableRowComponent,
        TableCellComponent,
        LinkComponent,
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
        [isSortable]="isSortable"
        [locale]="locale"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">DataTable</cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With sorting</cds-ng-table-header-description
        >

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
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Kevin's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Ronja's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};
