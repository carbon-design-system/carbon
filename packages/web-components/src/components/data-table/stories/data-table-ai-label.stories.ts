/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { TABLE_SIZE } from '../table';
import storyDocs from './data-table-ai-label.mdx';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../index';
import '../../icon-button/index';
import '../../link/index';
import '../../ai-label/index';
import { iconLoader } from '../../../globals/internal/icon-loader';

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
  radio: false,
  size: TABLE_SIZE.LG,
  useStaticWidth: false,
  useZebraStyles: false,
};

const controls = {
  isSortable: {
    control: 'boolean',
    description: 'Enable sorting for the table headers.',
  },
  locale: {
    control: 'text',
    description: 'Provide a locale for the table.',
  },
  radio: {
    control: 'boolean',
    description: 'Use radio selection instead of multi-selection.',
  },
  size: {
    control: 'select',
    description: 'Change the row height of the table.',
    options: sizes,
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'Use a width of auto instead of 100%.',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to the table rows.',
  },
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View Literature</cds-ai-label-action-button>
`;

export const _AILabelWithExpansion = {
  argTypes: { radio: { control: false } },
  render: (args) => {
    return html`
      <cds-table
        with-row-ai-labels
        expandable
        batch-expansion
        ?is-sortable=${args.isSortable}
        locale="${args.locale}"
        ?radio=${args.radio}
        size="${args.size}"
        ?use-static-width=${args.useStaticWidth}
        ?use-zebra-styles=${args.useZebraStyles}>
        <cds-table-header-title slot="title">DataTable</cds-table-header-title>
        <cds-table-header-description slot="description"
          >With sorting</cds-table-header-description
        >

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
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row>
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
            <cds-table-cell>Load Balancer 1</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>443</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Maureen's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row>
            <cds-table-cell>Load Balancer 2</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>80</cds-table-cell>
            <cds-table-cell>DNS delegation</cds-table-cell>
            <cds-table-cell>Andrew's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row>
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
            <cds-table-cell>Load Balancer 6</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>3000</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Marc's VM Groups</cds-table-cell>
            <cds-table-cell
              ><cds-link disabled>Disabled</cds-link></cds-table-cell
            >
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row>
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
            <cds-table-cell>Load Balancer 4</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>443</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Mel's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row>
            <cds-table-cell>Load Balancer 5</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>80</cds-table-cell>
            <cds-table-cell>DNS delegation</cds-table-cell>
            <cds-table-cell>Ronja's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
        </cds-table-body>
      </cds-table>
    `;
  },
};

export const _AILabelWithRadioSelection = {
  args: { radio: true },
  argTypes: {
    radio: { table: { readonly: true } },
  },
  render: (args) => {
    return html`
      <cds-table
        with-row-ai-labels
        ?is-sortable=${args.isSortable}
        locale="${args.locale}"
        ?radio=${args.radio}
        size="${args.size}"
        ?use-static-width=${args.useStaticWidth}
        ?use-zebra-styles=${args.useZebraStyles}>
        <cds-table-header-title slot="title">DataTable</cds-table-header-title>
        <cds-table-header-description slot="description"
          >With selection</cds-table-header-description
        >

        <cds-table-head>
          <cds-table-header-row selection-name="header" hide-checkbox>
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
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >

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
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >

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
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >

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
  },
};

export const _AILabelWithSelection = {
  render: (args) => {
    return html`
      <cds-table
        with-row-ai-labels
        ?is-sortable=${args.isSortable}
        locale="${args.locale}"
        ?radio=${args.radio}
        size="${args.size}"
        ?use-static-width=${args.useStaticWidth}
        ?use-zebra-styles=${args.useZebraStyles}>
        <cds-table-header-title slot="title">DataTable</cds-table-header-title>
        <cds-table-header-description slot="description"
          >With selection</cds-table-header-description
        >

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
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
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
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
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
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
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
  },
};

export const AILabelWithSelectionAndExpansion = {
  render: (args) => {
    return html`
      <cds-table
        expandable
        batch-expansion
        with-row-ai-labels
        ?is-sortable=${args.isSortable}
        locale="${args.locale}"
        ?radio=${args.radio}
        size="${args.size}"
        ?use-static-width=${args.useStaticWidth}
        ?use-zebra-styles=${args.useZebraStyles}>
        <cds-table-header-title slot="title">DataTable</cds-table-header-title>
        <cds-table-header-description slot="description"
          >With selection</cds-table-header-description
        >

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
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="1">
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
            <cds-table-cell>Load Balancer 1</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>443</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Maureen's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="2">
            <cds-table-cell>Load Balancer 2</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>80</cds-table-cell>
            <cds-table-cell>DNS delegation</cds-table-cell>
            <cds-table-cell>Andrew's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="3">
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
            <cds-table-cell>Load Balancer 6</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>3000</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Marc's VM Groups</cds-table-cell>
            <cds-table-cell
              ><cds-link disabled>Disabled</cds-link></cds-table-cell
            >
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="4">
            <cds-ai-label alignment="bottom-left"
              >${content}${actions}</cds-ai-label
            >
            <cds-table-cell>Load Balancer 4</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>443</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Mel's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="5">
            <cds-table-cell>Load Balancer 5</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>80</cds-table-cell>
            <cds-table-cell>DNS delegation</cds-table-cell>
            <cds-table-cell>Ronja's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
        </cds-table-body>
      </cds-table>
    `;
  },
};

export const _ColumnAILabelSort = {
  args: { isSortable: true },
  argTypes: {
    isSortable: { table: { readonly: true } },
    radio: { control: false },
  },
  render: (args) => {
    return html`
      <cds-table
        ?is-sortable=${args.isSortable}
        locale="${args.locale}"
        ?radio=${args.radio}
        size="${args.size}"
        ?use-static-width=${args.useStaticWidth}
        ?use-zebra-styles=${args.useZebraStyles}>
        <cds-table-header-title slot="title">DataTable</cds-table-header-title>
        <cds-table-header-description slot="description"
          >With sorting</cds-table-header-description
        >

        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell>Name</cds-table-header-cell>
            <cds-table-header-cell>Protocol</cds-table-header-cell>
            <cds-table-header-cell>Port</cds-table-header-cell>
            <cds-table-header-cell>Rule</cds-table-header-cell>
            <cds-table-header-cell>
              Attached groups
              <cds-ai-label alignment="bottom-left"
                >${content}${actions}</cds-ai-label
              ></cds-table-header-cell
            >
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
    `;
  },
};

export const _ColumnAILabelWithSelectionAndExpansion = {
  render: (args) => {
    return html`
      <cds-table
        expandable
        batch-expansion
        ?is-sortable=${args.isSortable}
        locale="${args.locale}"
        ?radio=${args.radio}
        size="${args.size}"
        ?use-static-width=${args.useStaticWidth}
        ?use-zebra-styles=${args.useZebraStyles}>
        <cds-table-header-title slot="title">DataTable</cds-table-header-title>
        <cds-table-header-description slot="description"
          >With expansion</cds-table-header-description
        >

        <cds-table-head>
          <cds-table-header-row selection-name="header">
            <cds-table-header-cell>Name</cds-table-header-cell>
            <cds-table-header-cell>Protocol </cds-table-header-cell>
            <cds-table-header-cell>Port</cds-table-header-cell>
            <cds-table-header-cell>Rule</cds-table-header-cell>
            <cds-table-header-cell>
              Attached groups
              <cds-ai-label alignment="bottom-left"
                >${content}${actions}</cds-ai-label
              ></cds-table-header-cell
            >
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
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="1">
            <cds-table-cell>Load Balancer 1</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>443</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Maureen's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="2">
            <cds-table-cell>Load Balancer 2</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>80</cds-table-cell>
            <cds-table-cell>DNS delegation</cds-table-cell>
            <cds-table-cell>Andrew's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
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
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="4">
            <cds-table-cell>Load Balancer 4</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>443</cds-table-cell>
            <cds-table-cell>Round robin</cds-table-cell>
            <cds-table-cell>Mel's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Starting</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
          <cds-table-row selection-name="5">
            <cds-table-cell>Load Balancer 5</cds-table-cell>
            <cds-table-cell>HTTP</cds-table-cell>
            <cds-table-cell>80</cds-table-cell>
            <cds-table-cell>DNS delegation</cds-table-cell>
            <cds-table-cell>Ronja's VM Groups</cds-table-cell>
            <cds-table-cell><cds-link>Active</cds-link></cds-table-cell>
          </cds-table-row>
          <cds-table-expanded-row>
            <h6>Expandable row content</h6>
            <div>Description here</div>
          </cds-table-expanded-row>
        </cds-table-body>
      </cds-table>
    `;
  },
};

const meta = {
  title: 'Components/DataTable/WithAILabel',
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
