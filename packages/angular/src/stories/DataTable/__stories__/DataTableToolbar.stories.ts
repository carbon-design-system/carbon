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
  TableToolbarComponent,
  TableToolbarContentComponent,
  TableToolbarSearchComponent,
  TableHeadComponent,
  TableHeaderRowComponent,
  TableHeaderCellComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
} from '@carbon/angular/data-table';
import { ButtonComponent } from '@carbon/angular/button';
import { LinkComponent } from '@carbon/angular/link';
import {
  OverflowMenuComponent,
  OverflowMenuBodyComponent,
  OverflowMenuItemComponent,
} from '@carbon/angular/overflow-menu';
import { MenuComponent, MenuItemComponent } from '@carbon/angular/menu';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import Settings16 from '@carbon/icons/es/settings/16.js';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';

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
  overflowMenuOnHover: false,
  persistent: false,
  radio: false,
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
  overflowMenuOnHover: {
    control: 'boolean',
    description: 'Overflow menu on hover',
  },
  persistent: {
    control: 'boolean',
    description: 'Persistent toolbar search',
  },
  radio: {
    control: 'boolean',
    description: 'Radio',
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

const toolbarOverflowMenu = `
  <cds-ng-overflow-menu
    [toolbarAction]="true"
    label="Settings">
    ${iconToSvg(Settings16, {
      slot: 'icon',
      class: 'cds--overflow-menu__icon',
    })}
    <cds-ng-menu>
      <cds-ng-menu-item label="Action 1"></cds-ng-menu-item>
      <cds-ng-menu-item label="Action 2"></cds-ng-menu-item>
      <cds-ng-menu-item label="Action 3"></cds-ng-menu-item>
    </cds-ng-menu>
  </cds-ng-overflow-menu>
`;

const rowOverflowMenu = `
  <cds-ng-overflow-menu label="Options">
    ${iconToSvg(OverflowMenuVertical16, {
      slot: 'icon',
      class: 'cds--overflow-menu__icon',
    })}
    <cds-ng-menu>
      <cds-ng-menu-item label="Stop app"></cds-ng-menu-item>
      <cds-ng-menu-item label="Restart app"></cds-ng-menu-item>
      <cds-ng-menu-item label="Rename"></cds-ng-menu-item>
    </cds-ng-menu>
  </cds-ng-overflow-menu>
`;

const meta: Meta<Record<string, unknown>> = {
  title: 'Components/DataTable/Toolbar',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [
        TableComponent,
        TableHeaderTitleComponent,
        TableHeaderDescriptionComponent,
        TableToolbarComponent,
        TableToolbarContentComponent,
        TableToolbarSearchComponent,
        TableHeadComponent,
        TableHeaderRowComponent,
        TableHeaderCellComponent,
        TableBodyComponent,
        TableRowComponent,
        TableCellComponent,
        ButtonComponent,
        LinkComponent,
        OverflowMenuComponent,
        OverflowMenuBodyComponent,
        OverflowMenuItemComponent,
        MenuComponent,
        MenuItemComponent,
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
        [overflowMenuOnHover]="overflowMenuOnHover"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">DataTable</cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With batch actions.</cds-ng-table-header-description
        >

        <cds-ng-table-toolbar slot="toolbar">
          <cds-ng-table-toolbar-content>
            <cds-ng-table-toolbar-search
              [persistent]="persistent"
              placeholder="Filter table"></cds-ng-table-toolbar-search>
            ${toolbarOverflowMenu}
            <cds-ng-button>Primary button</cds-ng-button>
          </cds-ng-table-toolbar-content>
        </cds-ng-table-toolbar>

        <cds-ng-table-head>
          <cds-ng-table-header-row selectionName="header">
            <cds-ng-table-header-cell>Name</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Protocol</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Port</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Rule</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Attached groups</cds-ng-table-header-cell>
            <cds-ng-table-header-cell>Status</cds-ng-table-header-cell>
            <cds-ng-table-header-cell></cds-ng-table-header-cell>
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
            <cds-ng-table-cell>${rowOverflowMenu}</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="1">
            <cds-ng-table-cell>Load Balancer 1</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Maureen's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
            <cds-ng-table-cell>${rowOverflowMenu}</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="2">
            <cds-ng-table-cell>Load Balancer 2</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Andrew's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
            <cds-ng-table-cell>${rowOverflowMenu}</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="3">
            <cds-ng-table-cell>Load Balancer 6</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>3000</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Marc's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell
              ><cds-ng-link [disabled]="true">Disabled</cds-ng-link></cds-ng-table-cell
            >
            <cds-ng-table-cell>${rowOverflowMenu}</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="4">
            <cds-ng-table-cell>Load Balancer 4</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>443</cds-ng-table-cell>
            <cds-ng-table-cell>Round robin</cds-ng-table-cell>
            <cds-ng-table-cell>Mel's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Starting</cds-ng-link></cds-ng-table-cell>
            <cds-ng-table-cell>${rowOverflowMenu}</cds-ng-table-cell>
          </cds-ng-table-row>
          <cds-ng-table-row selectionName="5">
            <cds-ng-table-cell>Load Balancer 5</cds-ng-table-cell>
            <cds-ng-table-cell>HTTP</cds-ng-table-cell>
            <cds-ng-table-cell>80</cds-ng-table-cell>
            <cds-ng-table-cell>DNS delegation</cds-ng-table-cell>
            <cds-ng-table-cell>Ronja's VM Groups</cds-ng-table-cell>
            <cds-ng-table-cell><cds-ng-link>Active</cds-ng-link></cds-ng-table-cell>
            <cds-ng-table-cell>${rowOverflowMenu}</cds-ng-table-cell>
          </cds-ng-table-row>
        </cds-ng-table-body>
      </cds-ng-table>
    `,
  }),
};

export const PersistentToolbar: Story = {
  args: { persistent: true },
  argTypes: {
    persistent: { table: { readonly: true } },
    radio: { control: false },
  } as ArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-table
        [isSortable]="isSortable"
        [locale]="locale"
        [overflowMenuOnHover]="overflowMenuOnHover"
        [radio]="radio"
        [size]="size"
        [useStaticWidth]="useStaticWidth"
        [useZebraStyles]="useZebraStyles">
        <cds-ng-table-header-title slot="title">DataTable</cds-ng-table-header-title>
        <cds-ng-table-header-description slot="description"
          >With toolbar</cds-ng-table-header-description
        >

        <cds-ng-table-toolbar slot="toolbar">
          <cds-ng-table-toolbar-content>
            <cds-ng-table-toolbar-search
              [persistent]="persistent"
              placeholder="Filter table"></cds-ng-table-toolbar-search>
            ${toolbarOverflowMenu}
            <cds-ng-button>Primary button</cds-ng-button>
          </cds-ng-table-toolbar-content>
        </cds-ng-table-toolbar>

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

export const SmallPersistentToolbar: Story = {
  args: { persistent: true, size: 'sm' },
  argTypes: {
    persistent: { table: { readonly: true } },
    radio: { control: false },
    size: { table: { readonly: true } },
  } as ArgTypes,
  render: PersistentToolbar.render,
};

export const WithOverflowMenu: Story = {
  argTypes: { radio: { control: false } } as ArgTypes,
  render: Default.render,
};
