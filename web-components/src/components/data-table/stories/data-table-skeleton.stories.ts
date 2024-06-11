/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
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
  compact: false,
  columnCount: 5,
  rowCount: 5,
  showHeader: true,
  showToolbar: true,
  zebra: false,
};

const controls = {
  compact: {
    control: 'boolean',
    description: 'Compact',
  },
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
  zebra: {
    control: 'boolean',
    description: 'Use zebra styles',
  },
};

export const Default = {
  render: () =>
    html` <cds-table-skeleton .headers=${headers}> </cds-table-skeleton>`,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ columnCount, rowCount, showHeader, showToolbar, zebra }) => html`
    <cds-table-skeleton
      .headers=${headers}
      column-count=${columnCount}
      row-count=${rowCount}
      ?show-header=${showHeader}
      ?show-toolbar=${showToolbar}
      ?zebra=${zebra}>
    </cds-table-skeleton>
  `,
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
