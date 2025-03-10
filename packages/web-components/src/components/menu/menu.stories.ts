/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import FolderShared16 from '@carbon/icons/lib/folder--shared/16.js';
import Cut16 from '@carbon/icons/lib/cut/16.js';
import Copy16 from '@carbon/icons/lib/copy/16.js';
import TrashCan16 from '@carbon/icons/lib/trash-can/16.js';
import TextItalic16 from '@carbon/icons/lib/text--italic/16.js';
import TextBold16 from '@carbon/icons/lib/text--bold/16.js';
import Paste16 from '@carbon/icons/lib/paste/16.js';
import CDSMenu from './menu';
import MDXContent from './menu.mdx';
import CDSmenuItem from './menu-item';
import CDSmenuItemSelectable from './menu-item-selectable';
import CDSmenuItemGroup from './menu-item-group';
import CDSmenuItemRadioGroup from './menu-item-radio-group';
import CDSmenuItemDivider from './menu-item-divider';

const args = {
  size: 'sm',
  open: true,
};

const argTypes = {
  className: {
    control: 'text',
    description: 'classNameAdditional CSS class names.',
  },
  label: {
    control: 'text',
    description: 'A label describing the Menu.',
  },
  menuAlignment: {
    control: 'text',
    description: 'Specify how the menu should align with the button element',
  },
  onClose: {
    action: 'menu closed',
    description: `Provide an optional function to be called when the Menu should be closed.`,
  },
  onOpen: {
    action: 'menu opned',
    description: `Provide an optional function to be called when the Menu is opened.`,
  },
  open: {
    control: 'boolean',
    description: `Whether the Menu is open or not.`,
  },
  size: {
    control: 'select',
    description: `Specify the size of the Menu. 'xs'
    'sm'
    'md'
    'lg'`,
    options: ['xs', 'sm', 'md', 'lg'],
  },
  x: {
    control: 'number',
    description: `Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2]).`,
  },
  y: {
    control: 'number',
    description: `Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])`,
  },
};

export const Default = {
  title: 'Components/Menu',
  component: CDSMenu,
  subcomponents: {
    CDSmenuItem,
    CDSmenuItemSelectable,
    CDSmenuItemGroup,
    CDSmenuItemRadioGroup,
    CDSmenuItemDivider,
  },
  parameters: {
    docs: {
      page: MDXContent,
    },
  },
  args,
  argTypes,
  render: ({ open, size }) => {
    const itemlist = ['None', 'Overline', 'Line-through', 'Underline'];
    const subitemlist = ['None', 'Product team', 'Organization', 'Company'];
    return html`
      <cds-menu ?open=${open} size=${size} menuAlignment="bottom" class="test">
        <cds-menu-item label="Share with">
          ${FolderShared16({ slot: 'render-icon' })}
          <cds-menu-item-radio-group
            slot="submenu"
            label="Share with list"
            .items="${subitemlist}"
            selectedItem="None"></cds-menu-item-radio-group>
        </cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Cut" shortcut="⌘X">
          ${Cut16({ slot: 'render-icon' })}</cds-menu-item
        >
        <cds-menu-item label="Copy" shortcut="⌘C"
          >${Copy16({ slot: 'render-icon' })}</cds-menu-item
        >
        <cds-menu-item label="Paste" shortcut="⌘V" disabled
          >${Paste16({ slot: 'render-icon' })}</cds-menu-item
        >
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-group>
          <cds-menu-item-selectable label="Bold" shortcut="⌘B"
            >${TextBold16({ slot: 'render-icon' })}</cds-menu-item-selectable
          >
          <cds-menu-item-selectable label="Italic" shortcut="⌘I"
            >${TextItalic16({ slot: 'render-icon' })}</cds-menu-item-selectable
          >
        </cds-menu-item-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-radio-group
          label="samples"
          .items="${itemlist}"
          selectedItem="None"></cds-menu-item-radio-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Delete" shortcut="⌫" kind="danger">
          ${TrashCan16({ slot: 'render-icon' })}</cds-menu-item
        >
      </cds-menu>
    `;
  },
};

const meta = {
  title: 'Components/Menu',
};

export default meta;
