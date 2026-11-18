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
import {
  MenuComponent,
  MenuItemComponent,
  MenuItemDividerComponent,
  MenuItemGroupComponent,
  MenuItemRadioGroupComponent,
  MenuItemSelectableComponent,
} from '@carbon/angular/menu';
import FolderShared16 from '@carbon/icons/es/folder--shared/16.js';
import Cut16 from '@carbon/icons/es/cut/16.js';
import Copy16 from '@carbon/icons/es/copy/16.js';
import TrashCan16 from '@carbon/icons/es/trash-can/16.js';
import TextItalic16 from '@carbon/icons/es/text--italic/16.js';
import TextBold16 from '@carbon/icons/es/text--bold/16.js';
import Paste16 from '@carbon/icons/es/paste/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components Menu) ────────

const defaultArgs = {
  backgroundToken: 'layer',
  border: false,
  size: 'sm',
  open: true,
};

const controls: ArgTypes = {
  backgroundToken: {
    control: { type: 'radio' },
    description: 'Specify the background token to use. Default is "layer".',
    options: ['layer', 'background'],
  },
  border: {
    control: 'boolean',
    description: 'Specify whether a border should be rendered on the menu.',
  },
  label: {
    control: 'text',
    description: 'A label describing the Menu.',
  },
  menuAlignment: {
    control: 'text',
    description: 'Specify how the menu should align with the button element',
  },
  open: {
    control: 'boolean',
    description: 'Whether the Menu is open or not.',
  },
  size: {
    control: { type: 'radio' },
    description: `Specify the size of the Menu. 
    'xs'
    'sm'
    'md'
    'lg'`,
    options: ['xs', 'sm', 'md', 'lg'],
  },
  x: {
    control: 'number',
    description:
      "Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2]).",
  },
  y: {
    control: 'number',
    description:
      "Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])",
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Menu',
  decorators: [
    moduleMetadata({
      imports: [
        MenuComponent,
        MenuItemComponent,
        MenuItemDividerComponent,
        MenuItemGroupComponent,
        MenuItemRadioGroupComponent,
        MenuItemSelectableComponent,
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
    template: `
      <cds-ng-menu
        [open]="open"
        [size]="size"
        menuAlignment="bottom"
        [label]="label"
        [backgroundToken]="backgroundToken"
        [border]="border">
        <cds-ng-menu-item label="Share with">
          ${iconToSvg(FolderShared16, { slot: 'render-icon' })}
          <cds-ng-menu-item-radio-group slot="submenu" label="Share with list">
            <cds-ng-menu-item label="None"></cds-ng-menu-item>
            <cds-ng-menu-item selected="true" label="Product team"></cds-ng-menu-item>
            <cds-ng-menu-item label="Organization"></cds-ng-menu-item>
            <cds-ng-menu-item label="Company"></cds-ng-menu-item>
          </cds-ng-menu-item-radio-group>
        </cds-ng-menu-item>
        <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
        <cds-ng-menu-item label="Cut" shortcut="⌘X">
          ${iconToSvg(Cut16, { slot: 'render-icon' })}
        </cds-ng-menu-item>
        <cds-ng-menu-item label="Copy" shortcut="⌘C">
          ${iconToSvg(Copy16, { slot: 'render-icon' })}
        </cds-ng-menu-item>
        <cds-ng-menu-item label="Paste" shortcut="⌘V" disabled>
          ${iconToSvg(Paste16, { slot: 'render-icon' })}
        </cds-ng-menu-item>
        <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
        <cds-ng-menu-item-group>
          <cds-ng-menu-item-selectable selected="true" label="Bold" shortcut="⌘B">
            ${iconToSvg(TextBold16, { slot: 'render-icon' })}
          </cds-ng-menu-item-selectable>
          <cds-ng-menu-item-selectable label="Italic" shortcut="⌘I">
            ${iconToSvg(TextItalic16, { slot: 'render-icon' })}
          </cds-ng-menu-item-selectable>
        </cds-ng-menu-item-group>
        <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
        <cds-ng-menu-item-radio-group label="samples">
          <cds-ng-menu-item selected="true" label="None"></cds-ng-menu-item>
          <cds-ng-menu-item label="Overline"></cds-ng-menu-item>
          <cds-ng-menu-item label="Line-through"></cds-ng-menu-item>
          <cds-ng-menu-item label="Underline"></cds-ng-menu-item>
        </cds-ng-menu-item-radio-group>
        <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
        <cds-ng-menu-item label="Delete" shortcut="⌫" kind="danger">
          ${iconToSvg(TrashCan16, { slot: 'render-icon' })}
        </cds-ng-menu-item>
      </cds-ng-menu>
    `,
  }),
};
