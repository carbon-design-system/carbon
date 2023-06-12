/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  Menu,
  MenuItem,
  MenuItemSelectable,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemDivider,
} from './';
import mdx from './Menu.mdx';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Playground = (args) => {
  const itemOnClick = action('onClick (MenuItem)');
  const selectableOnChange = action('onChange (MenuItemSelectable)');
  const radioOnChange = action('onChange (MenuItemRadioGroup)');

  const target = document.getElementById('storybook-root');

  return (
    <Menu {...args} target={target}>
      <MenuItem label="Share with">
        <MenuItemRadioGroup
          label="Share with"
          items={['None', 'Product team', 'Organization', 'Company']}
          defaultSelectedItem="Product team"
          onChange={radioOnChange}
        />
      </MenuItem>
      <MenuItemDivider />
      <MenuItem label="Cut" shortcut="⌘X" onClick={itemOnClick} />
      <MenuItem label="Copy" shortcut="⌘C" onClick={itemOnClick} />
      <MenuItem label="Paste" shortcut="⌘V" disabled onClick={itemOnClick} />
      <MenuItemDivider />
      <MenuItemGroup label="Font style">
        <MenuItemSelectable
          label="Bold"
          defaultSelected
          onChange={selectableOnChange}
        />
        <MenuItemSelectable label="Italic" onChange={selectableOnChange} />
      </MenuItemGroup>
      <MenuItemDivider />
      <MenuItemRadioGroup
        label="Text decoration"
        items={['None', 'Overline', 'Line-through', 'Underline']}
        defaultSelectedItem="None"
        onChange={radioOnChange}
      />
      <MenuItemDivider />
      <MenuItem
        label="Delete"
        shortcut="⌫"
        kind="danger"
        onClick={itemOnClick}
      />
    </Menu>
  );
};

Playground.args = {
  onClose: action('onClose'),
  open: true,
};
