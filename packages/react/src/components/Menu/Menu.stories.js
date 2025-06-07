/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import {
  Copy,
  Cut,
  FolderShared,
  Paste,
  TextBold,
  TextItalic,
  TrashCan,
} from '@carbon/icons-react';

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
  argTypes: {
    mode: {
      control: false,
    },
  },
};

export const Default = (args) => {
  const itemOnClick = action('onClick (MenuItem)');
  const selectableOnChange = action('onChange (MenuItemSelectable)');
  const radioOnChange = action('onChange (MenuItemRadioGroup)');

  const target = document.getElementById('storybook-root');

  return (
    <Menu {...args} target={target} x={document?.dir === 'rtl' ? 250 : 0}>
      <MenuItem label="Share with" renderIcon={FolderShared}>
        <MenuItemRadioGroup
          label="Share with"
          items={['None', 'Product team', 'Organization', 'Company']}
          defaultSelectedItem="Product team"
          onChange={radioOnChange}
        />
      </MenuItem>
      <MenuItemDivider />
      <MenuItem
        label="Cut"
        shortcut="⌘X"
        onClick={itemOnClick}
        renderIcon={Cut}
      />
      <MenuItem
        label="Copy"
        shortcut="⌘C"
        onClick={itemOnClick}
        renderIcon={Copy}
      />
      <MenuItem
        label="Paste"
        shortcut="⌘V"
        disabled
        onClick={itemOnClick}
        renderIcon={Paste}
      />
      <MenuItemDivider />
      <MenuItemGroup label="Font style">
        <MenuItemSelectable
          label="Bold"
          shortcut="⌘B"
          defaultSelected
          onChange={selectableOnChange}
          renderIcon={TextBold}
        />
        <MenuItemSelectable
          label="Italic"
          shortcut="⌘I"
          onChange={selectableOnChange}
          renderIcon={TextItalic}
        />
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
        renderIcon={TrashCan}
      />
    </Menu>
  );
};

Default.args = {
  onClose: action('onClose'),
  open: true,
};

Default.argTypes = {
  target: {
    table: {
      disable: true,
    },
  },
};
