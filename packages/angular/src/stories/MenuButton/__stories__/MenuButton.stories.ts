/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { MenuButtonComponent } from '@carbon/angular/menu-button';
import {
  MenuComponent,
  MenuItemComponent,
  MenuItemDividerComponent,
  MenuItemGroupComponent,
} from '@carbon/angular/menu';
import Asset16 from '@carbon/icons/es/asset/16.js';
import User16 from '@carbon/icons/es/user/16.js';
import Group16 from '@carbon/icons/es/group/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components MenuButton) ──

const defaultArgs = {
  disabled: false,
  label: 'Actions',
  kind: 'primary',
  size: 'lg',
  menuAlignment: 'bottom',
  menuBackgroundToken: 'layer',
  menuBorder: false,
  tabIndex: 0,
};

const controls: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the MenuButton should be disabled, or not.',
  },
  kind: {
    control: 'radio',
    description:
      'Specify the type of button to be used as the base for the trigger button.',
    options: ['primary', 'tertiary', 'ghost'],
  },
  label: {
    control: 'text',
    description: 'Provide the label to be rendered on the trigger button.',
  },
  menuAlignment: {
    control: 'select',
    description:
      'Experimental property. Specify how the menu should align with the button element',
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ],
  },
  menuBackgroundToken: {
    control: 'select',
    description:
      'Specify the background token to use for the menu. Default is "layer".',
    options: ['layer', 'background'],
  },
  menuBorder: {
    control: 'boolean',
    description: 'Specify whether a border should be rendered on the menu.',
  },
  size: {
    control: 'radio',
    description: `Specify the size of the button and menu.
'xs'
'sm'
'md'
'lg'`,
    options: ['xs', 'sm', 'md', 'lg'],
  },
  tabIndex: {
    control: 'number',
    description: 'Specify the tabIndex of the button.',
  },
};

/** Wraps menu content in a `cds-ng-menu-button` bound to the story args. */
const menuButtonTemplate = (menu: string) => `
  <cds-ng-menu-button
    [label]="label"
    [kind]="kind"
    [menuAlignment]="menuAlignment"
    [menuBackgroundToken]="menuBackgroundToken"
    [menuBorder]="menuBorder"
    [size]="size"
    [disabled]="disabled"
    [tabIndex]="tabIndex">
    <cds-ng-menu>
      ${menu}
    </cds-ng-menu>
  </cds-ng-menu-button>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Menu Button',
  decorators: [
    moduleMetadata({
      imports: [
        MenuButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuItemDividerComponent,
        MenuItemGroupComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: menuButtonTemplate(`
      <cds-ng-menu-item label="First action with a long label description"></cds-ng-menu-item>
      <cds-ng-menu-item label="Second action"></cds-ng-menu-item>
      <cds-ng-menu-item label="Third action" disabled></cds-ng-menu-item>
    `),
  }),
};

// WC: ExperimentalAutoAlign
export const ExperimentalAutoAlign: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 5000px; height: 5000px;">
        <div style="position: absolute; bottom: 20px">
          ${menuButtonTemplate(`
            <cds-ng-menu-item label="First action"></cds-ng-menu-item>
            <cds-ng-menu-item label="Second action that is a longer item to test overflow and title."></cds-ng-menu-item>
            <cds-ng-menu-item label="Third action" disabled></cds-ng-menu-item>
          `)}
        </div>
      </div>
    `,
  }),
};

// WC: withDanger
export const withDanger: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: menuButtonTemplate(`
      <cds-ng-menu-item label="First action"></cds-ng-menu-item>
      <cds-ng-menu-item label="Second action"></cds-ng-menu-item>
      <cds-ng-menu-item label="Third action"></cds-ng-menu-item>
      <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
      <cds-ng-menu-item label="Danger action" kind="danger"></cds-ng-menu-item>
    `),
  }),
};

// WC: withDividers
export const withDividers: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: menuButtonTemplate(`
      <cds-ng-menu-item label="Create service request"></cds-ng-menu-item>
      <cds-ng-menu-item label="Create work order"></cds-ng-menu-item>
      <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
      <cds-ng-menu-item label="Add plan"></cds-ng-menu-item>
      <cds-ng-menu-item label="Add flag"></cds-ng-menu-item>
      <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
      <cds-ng-menu-item label="Edit source location"></cds-ng-menu-item>
      <cds-ng-menu-item label="Recalculate source"></cds-ng-menu-item>
    `),
  }),
};

// WC: withIcons
export const withIcons: Story = {
  args: {
    ...defaultArgs,
    label: 'Add',
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: menuButtonTemplate(`
      <cds-ng-menu-item label="Asset">
        ${iconToSvg(Asset16, { slot: 'render-icon' })}
      </cds-ng-menu-item>
      <cds-ng-menu-item label="User">
        ${iconToSvg(User16, { slot: 'render-icon' })}
      </cds-ng-menu-item>
      <cds-ng-menu-item label="User group">
        ${iconToSvg(Group16, { slot: 'render-icon' })}
      </cds-ng-menu-item>
    `),
  }),
};

// WC: withNestedMenu
export const withNestedMenu: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: menuButtonTemplate(`
      <cds-ng-menu-item label="Save" shortcut="⌘S"></cds-ng-menu-item>
      <cds-ng-menu-item label="Save as" shortcut="⌥⌘S"></cds-ng-menu-item>
      <cds-ng-menu-item label="Export as">
        <cds-ng-menu-item-group slot="submenu">
          <cds-ng-menu-item label="PDF"></cds-ng-menu-item>
          <cds-ng-menu-item label="JPG"></cds-ng-menu-item>
          <cds-ng-menu-item label="PNG"></cds-ng-menu-item>
        </cds-ng-menu-item-group>
      </cds-ng-menu-item>
      <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
      <cds-ng-menu-item label="Delete" kind="danger"></cds-ng-menu-item>
    `),
  }),
};

const alignmentMenu = `
  <cds-ng-menu>
    <cds-ng-menu-item label="first"></cds-ng-menu-item>
    <cds-ng-menu-item label="second action with a really long text"></cds-ng-menu-item>
    <cds-ng-menu-item label="Third action" disabled></cds-ng-menu-item>
  </cds-ng-menu>
`;

/** A `cds-ng-menu-button` with a fixed label and alignment. */
const alignmentButton = (label: string, menuAlignment: string) => `
  <cds-ng-menu-button
    label="${label}"
    menuAlignment="${menuAlignment}"
    [menuBackgroundToken]="menuBackgroundToken"
    [menuBorder]="menuBorder">
    ${alignmentMenu}
  </cds-ng-menu-button>
`;

// WC: withMenuAlignment
export const withMenuAlignment: Story = {
  args: {
    menuBackgroundToken: defaultArgs.menuBackgroundToken,
    menuBorder: defaultArgs.menuBorder,
  },
  argTypes: {
    menuBackgroundToken: controls['menuBackgroundToken'],
    menuBorder: controls['menuBorder'],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: space-between;">
        ${alignmentButton('Bottom', 'bottom')}
        ${alignmentButton('Bottom start', 'bottom-start')}
        ${alignmentButton('Bottom end', 'bottom-end')}
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 15rem">
        ${alignmentButton('Top', 'top')}
        ${alignmentButton('Top start', 'top-start')}
        ${alignmentButton('Top end', 'top-end')}
      </div>
    `,
  }),
};
