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
  TableExpandedRowComponent,
} from '@carbon/angular/data-table';
import { LinkComponent } from '@carbon/angular/link';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';

const sizes = {
  'xs (xs)': 'xs',
  'sm (sm)': 'sm',
  'md (md)': 'md',
  'lg (lg - default)': 'lg',
  'xl (xl)': 'xl',
};

const defaultArgs = {
  isSortable: false,
  locale: 'en',
  radio: false,
  size: 'lg',
  useStaticWidth: false,
  useZebraStyles: false,
};

const controls: ArgTypes = {
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
    options: Object.values(sizes),
    labels: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [v, k])),
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

const aiLabelContent = `
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

const aiLabelActions = `
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-ng-icon-button>
  <cds-ng-ai-label-action-button>View Literature</cds-ng-ai-label-action-button>
`;

const renderAiLabel = `
  <cds-ng-ai-label alignment="bottom-left">
    ${aiLabelContent}
    ${aiLabelActions}
  </cds-ng-ai-label>
`;

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/WithAILabel',
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
        TableExpandedRowComponent,
        LinkComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        IconButtonComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const _AILabelWithExpansion: Story = {
  argTypes: { radio: { control: false } } as ArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [withRowAILabels]="true"
        [expandable]="true"
        [batchExpansion]="true"
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">
          <h2 class="demo-table-heading">DataTable</h2>
        </cds-ng-table-header-title>
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
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row>
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row>
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row>
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row>
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Ronja's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};

export const _AILabelWithRadioSelection: Story = {
  args: { radio: true },
  argTypes: {
    radio: { table: { readonly: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [withRowAILabels]="true"
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">DataTable</cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With selection</cds-ng-table-header-description
        >

        <cds-ng-table-head>
          <cds-ng-table-header-row selectionName="header" [hideCheckbox]="true">
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Attached groups</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row selectionName="0">
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Kevin's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="1">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="2">
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="3">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="4">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="5">
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

export const _AILabelWithSelection: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [withRowAILabels]="true"
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">DataTable</cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With selection</cds-ng-table-header-description
        >

        <cds-ng-table-head>
          <cds-ng-table-header-row selectionName="header">
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Attached groups</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row selectionName="0">
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Kevin's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="1">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="2">
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="3">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="4">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="5">
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

export const AILabelWithSelectionAndExpansion: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [expandable]="true"
        [batchExpansion]="true"
        [withRowAILabels]="true"
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">
          <h2 class="demo-table-heading">DataTable</h2>
        </cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With selection</cds-ng-table-header-description
        >

        <cds-ng-table-head>
          <cds-ng-table-header-row selectionName="header">
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Attached groups</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row selectionName="0">
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Kevin's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="1">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="2">
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="3">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="4">
            ${renderAiLabel}
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="5">
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Ronja's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};

export const _ColumnAILabelSort: Story = {
  args: { isSortable: true },
  argTypes: {
    isSortable: { table: { readonly: true } },
    radio: { control: false },
  } as ArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
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
            <cds-ng-table-header-cell>
              Attached groups
              ${renderAiLabel}
            </cds-ng-table-header-cell>
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

export const _ColumnAILabelWithSelectionAndExpansion: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [expandable]="true"
        [batchExpansion]="true"
        [isSortable]="isSortable"
        [locale]="locale"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">
          <h2 class="demo-table-heading">DataTable</h2>
        </cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With expansion</cds-ng-table-header-description
        >

        <cds-ng-table-head>
          <cds-ng-table-header-row selectionName="header">
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>
              Attached groups
              ${renderAiLabel}
            </cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
          </cds-ng-table-header-row>
        </cds-ng-table-head>
        <cds-ng-table-body>
          <cds-ng-table-row selectionName="0">
            <cds-ng-table-cell>Load Balancer 3</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Kevin's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="1">
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="2">
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="3">
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="4">
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
          <cds-ng-table-row selectionName="5">
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Ronja's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-expanded-row>
            <h3 class="demo-expanded-row-heading">Expandable row content</h3>
            <div>Description here</div>
          </cds-ng-table-expanded-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};
