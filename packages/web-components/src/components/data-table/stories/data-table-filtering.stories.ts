/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../../globals/settings';
import { TABLE_SIZE } from '../table';
// @ts-ignore
import Settings16 from '@carbon/icons/lib/settings/16.js';
import '../index';
import storyDocs from './data-table.mdx';

const sizes = {
  [`xs (${TABLE_SIZE.XS})`]: TABLE_SIZE.XS,
  [`sm (${TABLE_SIZE.SM})`]: TABLE_SIZE.SM,
  [`md (${TABLE_SIZE.MD})`]: TABLE_SIZE.MD,
  [`lg (${TABLE_SIZE.LG} - default)`]: TABLE_SIZE.LG,
  [`xl (${TABLE_SIZE.XL})`]: TABLE_SIZE.XL,
};

const defaultArgs = {
  isSortable: false,
  locale: 'en',
  size: TABLE_SIZE.LG,
  useStaticWidth: false,
  useZebraStyles: false,
};

const controls = {
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
    options: sizes,
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

export const Default = {
  render: () => html`
    <cds-table>
      <cds-table-header-title slot="title">DataTable</cds-table-header-title>
      <cds-table-header-description slot="description"
        >With filtering</cds-table-header-description
      >

      <cds-table-toolbar slot="toolbar">
        <cds-table-toolbar-content ?has-batch-actions="true">
          <cds-table-toolbar-search
            placeholder="Filter table"></cds-table-toolbar-search>
          <cds-overflow-menu toolbar-action>
            ${Settings16({
              slot: 'icon',
              class: `${prefix}--overflow-menu__icon`,
            })}
            <cds-overflow-menu-body>
              <cds-overflow-menu-item> Action 1 </cds-overflow-menu-item>
              <cds-overflow-menu-item> Action 2 </cds-overflow-menu-item>
              <cds-overflow-menu-item> Action 3 </cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
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
        <cds-table-row>
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Kevin's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Andrew's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Marc's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Mel's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Ronja's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    isSortable,
    locale,
    radio,
    size,
    useStaticWidth,
    useZebraStyles,
  }) => html`
    <cds-table
      ?is-sortable=${isSortable}
      locale="${locale}"
      ?radio=${radio}
      size="${size}"
      ?use-static-width="${useStaticWidth}"
      ?use-zebra-styles="${useZebraStyles}">
      <cds-table-header-title slot="title">DataTable</cds-table-header-title>
      <cds-table-header-description slot="description"
        >With filtering</cds-table-header-description
      >

      <cds-table-toolbar slot="toolbar">
        <cds-table-toolbar-content ?has-batch-actions="true">
          <cds-table-toolbar-search
            placeholder="Filter table"></cds-table-toolbar-search>
          <cds-overflow-menu toolbar-action>
            ${Settings16({
              slot: 'icon',
              class: `${prefix}--overflow-menu__icon`,
            })}
            <cds-overflow-menu-body>
              <cds-overflow-menu-item> Action 1 </cds-overflow-menu-item>
              <cds-overflow-menu-item> Action 2 </cds-overflow-menu-item>
              <cds-overflow-menu-item> Action 3 </cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
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
        <cds-table-row>
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Kevin's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Andrew's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Marc's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Mel's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Ronja's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `,
};

const meta = {
  title: 'Components/DataTable/Filtering',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
