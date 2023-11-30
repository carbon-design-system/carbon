/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, number } from '@storybook/addon-knobs';
import { prefix } from '../../../globals/settings';
import storyDocs from './data-table-story.mdx';
import '../index';

const headers = [
  'Name',
  'Protocol',
  'Port',
  'Rule',
  'Attached groups',
  'Status',
];

export const Default = () => {
  return html` <cds-table-skeleton .headers=${headers}> </cds-table-skeleton>`;
};

export const Playground = (args) => {
  const { columnCount, rowCount, showHeader, showToolbar, zebra } =
    args?.[`${prefix}-table`] ?? {};

  return html`
    <cds-table-skeleton
      .headers=${headers}
      column-count=${columnCount}
      row-count=${rowCount}
      ?show-header=${showHeader}
      ?show-toolbar=${showToolbar}
      ?zebra=${zebra}>
    </cds-table-skeleton>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-table`]: () => ({
      compact: boolean('Compact', false),
      columnCount: number('Column count', 5),
      rowCount: number('Row count', 5),
      showHeader: boolean('Show header', true),
      showToolbar: boolean('Show toolbar', true),
      zebra: boolean('Use zebra styles', false),
    }),
  },
};

export default {
  title: 'Components/DataTable/Skeleton',
  parameters: {
    ...storyDocs.parameters,
  },
};
