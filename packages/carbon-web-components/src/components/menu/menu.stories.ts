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
  mode: {
    description: `The mode of this menu. Defaults to full. full supports nesting and selectable menu items, but no icons. basic supports icons but no nesting or selectable menu items.
    This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).
    'full'
    'basic'`,
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
};

export const Default = {
  args: {},
  argTypes: {},
  render: () => {
    const itemlist = ['None', 'Overline', 'Line-through', 'Underline'];
    const subitemlist = ['None', 'Product team', 'Organization', 'Company'];
    return html`
      <cds-menu>
        <cds-menu-item label="Share with">
          <cds-menu-item-radio-group
            label="Share with list"
            .items="${subitemlist}"
            selectedItem="None"></cds-menu-item-radio-group>
        </cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Cut" shortcut="⌘X"></cds-menu-item>
        <cds-menu-item label="Copy" shortcut="⌘C"></cds-menu-item>
        <cds-menu-item label="Paste" shortcut="⌘V" disabled></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-group>
          <cds-menu-item-selectable
            label="Bold"
            selected></cds-menu-item-selectable>
          <cds-menu-item-selectable label="Italic"></cds-menu-item-selectable>
        </cds-menu-item-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-radio-group
          label="samples"
          .items="${itemlist}"
          selectedItem="None"></cds-menu-item-radio-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item
          label="Delete"
          shortcut="⌫"
          kind="danger"></cds-menu-item>
      </cds-menu>
    `;
  },
};
export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { className, label, menuAlignment, mode, open, size } = args;
    const itemlist = ['None', 'Overline', 'Line-through', 'Underline'];
    const subitemlist = ['None', 'Product team', 'Organization', 'Company'];
    return html`<cds-menu
      className="${className}"
      label="${label}"
      menuAlignment="${menuAlignment}"
      mode="${mode}"
      open="${open}"
      size="${size}">
      <cds-menu-item label="Share with">
        <cds-menu-item-radio-group
          label="Share with list"
          .items="${subitemlist}"
          selectedItem="None"></cds-menu-item-radio-group>
      </cds-menu-item>
      <cds-menu-item-divider></cds-menu-item-divider>
      <cds-menu-item label="Cut" shortcut="⌘X"></cds-menu-item>
      <cds-menu-item label="Copy" shortcut="⌘C"></cds-menu-item>
      <cds-menu-item label="Paste" shortcut="⌘V" disabled></cds-menu-item>
      <cds-menu-item-divider></cds-menu-item-divider>
      <cds-menu-item-group>
        <cds-menu-item-selectable
          label="Bold"
          selected></cds-menu-item-selectable>
        <cds-menu-item-selectable label="Italic"></cds-menu-item-selectable>
      </cds-menu-item-group>
      <cds-menu-item-divider></cds-menu-item-divider>
      <cds-menu-item-radio-group
        label="samples"
        .items="${itemlist}"
        selectedItem="None"></cds-menu-item-radio-group>
      <cds-menu-item-divider></cds-menu-item-divider>
      <cds-menu-item label="Delete" shortcut="⌫" kind="danger"></cds-menu-item>
    </cds-menu>`;
  },
};
const meta = {
  title: 'Components/Menu',
};

export default meta;
