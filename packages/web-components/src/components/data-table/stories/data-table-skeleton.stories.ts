/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { TABLE_SIZE } from '../table';
import storyDocs from './data-table.mdx';
import '../index';

const headers = [
  'Name',
  'Protocol',
  'Port',
  'Rule',
  'Attached groups',
  'Status',
];

const defaultArgs = {
  columnCount: 5,
  rowCount: 5,
  showHeader: true,
  showToolbar: true,
  size: TABLE_SIZE.LG,
  toolbarLabel: 'data table toolbar',
  zebra: false,
};

const controls = {
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
    options: Object.values(TABLE_SIZE),
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

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    columnCount,
    rowCount,
    showHeader,
    showToolbar,
    size,
    toolbarLabel,
    zebra,
  }) => {
    const dynamicHeaders = headers.slice(0, columnCount);
    return html`
      <div style="width: 800px">
        <cds-table-skeleton
          .headers=${dynamicHeaders}
          column-count=${columnCount}
          row-count=${rowCount}
          ?show-header=${showHeader}
          ?show-toolbar=${showToolbar}
          size=${size}
          toolbar-label=${toolbarLabel}
          ?zebra=${zebra}>
        </cds-table-skeleton>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/DataTable/Skeleton',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
