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
import { TableSkeletonComponent } from '@carbon/angular/data-table';

const headers = [
  'Name',
  'Protocol',
  'Port',
  'Rule',
  'Attached groups',
  'Status',
];

const sizes = {
  'xs (xs)': 'xs',
  'sm (sm)': 'sm',
  'md (md)': 'md',
  'lg (lg - default)': 'lg',
  'xl (xl)': 'xl',
};

const defaultArgs = {
  columnCount: 5,
  rowCount: 5,
  showHeader: true,
  showToolbar: true,
  size: 'lg',
  toolbarLabel: 'data table toolbar',
  zebra: false,
};

const controls: ArgTypes = {
  columnCount: {
    control: 'number',
    description: 'Column count',
  },
  rowCount: {
    control: 'number',
    description: 'Row count',
  },
  showHeader: {
    control: 'boolean',
    description: 'Show header',
  },
  showToolbar: {
    control: 'boolean',
    description: 'Show toolbar',
  },
  size: {
    control: 'radio',
    description: 'Change the row height of table.',
    options: Object.values(sizes),
    labels: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [v, k])),
  },
  toolbarLabel: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the toolbar region.',
  },
  zebra: {
    control: 'boolean',
    description: 'Use zebra styles',
  },
};

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/Skeleton',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [TableSkeletonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  render: (args) => {
    const dynamicHeaders = headers.slice(
      0,
      (args['columnCount'] as number) ?? 5
    );
    return {
      props: {
        ...args,
        headers: dynamicHeaders,
      },
      template: `
        <div style="width: 800px">
          <cds-ng-table-skeleton
            [headers]="headers"
            [columnCount]="columnCount"
            [rowCount]="rowCount"
            [showHeader]="showHeader"
            [showToolbar]="showToolbar"
            [size]="size"
            [toolbarLabel]="toolbarLabel"
            [zebra]="zebra">
          </cds-ng-table-skeleton>
        </div>
      `,
    };
  },
};
