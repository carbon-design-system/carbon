/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, text } from '@storybook/addon-knobs';
import { prefix } from '../../../globals/settings';
import { TABLE_SIZE } from '../table';
import '../index';
import storyDocs from './data-table-story.mdx';

const sizes = {
  [`xs (${TABLE_SIZE.XS})`]: TABLE_SIZE.XS,
  [`sm (${TABLE_SIZE.SM})`]: TABLE_SIZE.SM,
  [`md (${TABLE_SIZE.MD})`]: TABLE_SIZE.MD,
  [`lg (${TABLE_SIZE.LG} - default)`]: TABLE_SIZE.LG,
  [`xl (${TABLE_SIZE.XL})`]: TABLE_SIZE.XL,
};

export const Default = () => {
  return html`
    <cds-table>
      <cds-table-head>
        <cds-table-header-row>
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
          <cds-table-header-cell>Other</cds-table-header-cell>
          <cds-table-header-cell>Example</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        <cds-table-row>
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Starting</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 7</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

export const XLWithTwoLines = () => {
  return html`
    <cds-table size="xl">
      <cds-table-head>
        <cds-table-header-row>
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
          <cds-table-header-cell>Other</cds-table-header-cell>
          <cds-table-header-cell>Example</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        <cds-table-row>
          <cds-table-cell>
            Load Balancer 1
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Starting</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell
            >Load Balancer 2
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell
            >Load Balancer 3
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell
            >Load Balancer 4
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell
            >Load Balancer 5
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell
            >Load Balancer 6
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell
            >Load Balancer 7
            <cds-table-cell-content>Austin, Tx</cds-table-cell-content>
          </cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

export const Playground = (args) => {
  const { locale, size, useStaticWidth, useZebraStyles } =
    args?.[`${prefix}-table`] ?? {};
  return html`
    <cds-table
      locale="${locale}"
      size="${size}"
      ?use-static-width="${useStaticWidth}"
      ?use-zebra-styles="${useZebraStyles}">
      <cds-table-head>
        <cds-table-header-row>
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
          <cds-table-header-cell>Other</cds-table-header-cell>
          <cds-table-header-cell>Example</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        <cds-table-row>
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Starting</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 7</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-table`]: () => ({
      locale: text('Locale', 'en'),
      size: select('Size', sizes, TABLE_SIZE.LG),
      useStaticWidth: boolean('Use static width', false),
      useZebraStyles: boolean('Use zebra styles', false),
    }),
  },
};

export default {
  title: 'Components/DataTable/Basic',
  parameters: {
    ...storyDocs.parameters,
  },
};
