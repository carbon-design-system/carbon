/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { ArrowsVertical } from '@carbon/icons-react';

import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
} from '../Menu';

import { OverflowMenuV2 } from './';
import mdx from './OverflowMenuV2.mdx';

export default {
  title: 'Components/OverflowMenuV2',
  component: OverflowMenuV2,
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

export const _OverflowMenuV2 = () => {
  const onClick = action('onClick (MenuItem)');

  return (
    <OverflowMenuV2>
      <MenuItem label="Stop app" onClick={onClick} />
      <MenuItem label="Restart app" onClick={onClick} />
      <MenuItem label="Rename app" onClick={onClick} />
      <MenuItem label="Edit routes and access" onClick={onClick} />
      <MenuItemDivider />
      <MenuItem label="Delete app" kind="danger" onClick={onClick} />
    </OverflowMenuV2>
  );
};

export const Nested = () => {
  return (
    <OverflowMenuV2>
      <MenuItem label="Level 1" />
      <MenuItem label="Level 1" />
      <MenuItem label="Level 1">
        <MenuItem label="Level 2" />
        <MenuItem label="Level 2" />
        <MenuItem label="Level 2" />
      </MenuItem>
      <MenuItem label="Level 1" />
    </OverflowMenuV2>
  );
};

export const CustomIcon = () => {
  return (
    <OverflowMenuV2 renderIcon={ArrowsVertical}>
      <MenuItemRadioGroup
        label="Sort by"
        items={['Name', 'Date created', 'Date last modified', 'Size']}
        defaultSelectedItem="Date created"
      />
      <MenuItemDivider />
      <MenuItemRadioGroup
        label="Sorting direction"
        items={['Ascending', 'Descending']}
        defaultSelectedItem="Descending"
      />
    </OverflowMenuV2>
  );
};

export const Playground = (args) => {
  return (
    <OverflowMenuV2 {...args}>
      <MenuItem label="Stop app" />
      <MenuItem label="Restart app" />
      <MenuItem label="Rename app" />
      <MenuItem label="Edit routes and access" />
      <MenuItemDivider />
      <MenuItem label="Delete app" kind="danger" />
    </OverflowMenuV2>
  );
};

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  renderIcon: {
    table: {
      disable: true,
    },
  },
  label: {
    defaultValue: 'Options',
  },
};
