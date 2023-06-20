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
import Add from '@carbon/web-components/es/icons/add/16';
import Save from '@carbon/web-components/es/icons/save/16';
import TrashCan from '@carbon/web-components/es/icons/trash-can/16';
// @ts-ignore
import Download16 from '@carbon/web-components/es/icons/download/16';
// @ts-ignore
import Settings16 from '@carbon/web-components/es/icons/settings/16';
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
      <cds-table-header-title slot="title">DataTable</cds-table-header-title>
      <cds-table-header-description slot="description"
        >With batch actions. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Maecenas accumsan mauris sed congue egestas. Integer varius mauris
        vel arcu pulvinar bibendum non sit amet ligula. Nullam ut nisi eu tellus
        aliquet vestibulum vel sit amet odio.</cds-table-header-description
      >

      <cds-table-toolbar slot="toolbar">
        <cds-table-batch-actions ?active="true">
          <cds-button>Delete ${TrashCan({ slot: 'icon' })}</cds-button>
          <cds-button tooltip-position="bottom" tooltip-text="Add"
            >${Add({ slot: 'icon' })}</cds-button
          >
          <cds-button tooltip-position="bottom" tooltip-text="Save"
            >${Save({ slot: 'icon' })}</cds-button
          >
          <cds-button href="javascript:void 0" download="table-data.json">
            Download ${Download16({ slot: 'icon' })}
          </cds-button>
        </cds-table-batch-actions>
        <cds-table-toolbar-content ?has-batch-actions="true">
          <cds-table-toolbar-search
            placeholder="Filter table"></cds-table-toolbar-search>
          <cds-overflow-menu toolbar-action>
            ${Settings16({ slot: 'icon' })}
            <cds-overflow-menu-body>
              <cds-overflow-menu-item @click=${() => alert('Alert 1')}>
                Action 1
              </cds-overflow-menu-item>
              <cds-overflow-menu-item @click=${() => alert('Alert 2')}>
                Action 2
              </cds-overflow-menu-item>
              <cds-overflow-menu-item @click=${() => alert('Alert 3')}>
                Action 3
              </cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
          <cds-button>Add new</cds-button>
        </cds-table-toolbar-content>
      </cds-table-toolbar>

      <cds-table-head>
        <cds-table-header-row selection-name="header">
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Protocol</cds-table-header-cell>
          <cds-table-header-cell>Port</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Attached groups</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        <cds-table-row selection-name="0">
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Kevin's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row selection-name="1">
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell>
            <cds-link>Starting</cds-link>
          </cds-table-cell>
        </cds-table-row>
        <cds-table-row selection-name="2">
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Andrew's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row selection-name="3">
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Marc's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row selection-name="4">
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Mel's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row selection-name="5">
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Ronja's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

export const Playground = (args) => {
  const { isSortable, locale, radio, size, useStaticWidth, useZebraStyles } =
    args?.[`${prefix}-table`] ?? {};
  return html`
    <cds-table
      ?is-sortable=${isSortable}
      locale="${locale}"
      ?radio=${radio}
      size="${size}"
      ?use-static-width="${useStaticWidth}"
      ?use-zebra-styles="${useZebraStyles}">
      <cds-table-header-title slot="title">DataTable</cds-table-header-title>
      <cds-table-header-description slot="description"
        >With batch actions.</cds-table-header-description
      >

      <cds-table-toolbar slot="toolbar">
        <cds-table-batch-actions ?active="true">
          <cds-button>Delete ${TrashCan({ slot: 'icon' })}</cds-button>
          <cds-button>Save ${Save({ slot: 'icon' })}</cds-button>
          <cds-button href="javascript:void 0" download="table-data.json">
            Download ${Download16({ slot: 'icon' })}
          </cds-button>
        </cds-table-batch-actions>
        <cds-table-toolbar-content ?has-batch-actions="true">
          <cds-table-toolbar-search
            placeholder="Filter table"></cds-table-toolbar-search>
          <cds-overflow-menu toolbar-action>
            ${Settings16({ slot: 'icon' })}
            <cds-overflow-menu-body>
              <cds-overflow-menu-item @click=${() => alert('Alert 1')}>
                Action 1
              </cds-overflow-menu-item>
              <cds-overflow-menu-item @click=${() => alert('Alert 2')}>
                Action 2
              </cds-overflow-menu-item>
              <cds-overflow-menu-item @click=${() => alert('Alert 3')}>
                Action 3
              </cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
          <cds-button>Add new</cds-button>
        </cds-table-toolbar-content>
      </cds-table-toolbar>

      <cds-table-head>
        <cds-table-header-row selection-name="header">
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Protocol</cds-table-header-cell>
          <cds-table-header-cell>Port</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Attached groups</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        <cds-table-row selection-name="0">
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Kevin's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row selection-name="1">
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Maureen's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row selection-name="2">
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Andrew's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row selection-name="3">
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>3000</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Marc's VM Groups</cds-table-cell>
          <cds-table-cell
            ><cds-link disabled>Disabled</cds-link></cds-table-cell
          >
        </cds-table-row>
        <cds-table-row selection-name="4">
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>443</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Mel's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
        </cds-table-row>
        <cds-table-row selection-name="5">
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>HTTP</cds-table-cell>
          <cds-table-cell>80</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Ronja's VM Groups</cds-table-cell>
          <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-table`]: () => ({
      isSortable: boolean('Is sortable', false),
      locale: text('Locale', 'en'),
      radio: boolean('Radio', false),
      size: select('Size', sizes, TABLE_SIZE.LG),
      useStaticWidth: boolean('Use static width', false),
      useZebraStyles: boolean('Use zebra styles', false),
    }),
  },
};

export default {
  title: 'Components/DataTable/Batch Actions',
  parameters: {
    ...storyDocs.parameters,
  },
};
