/**
 * Copyright IBM Corp. 2023
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

import { OverflowMenu } from './';
import mdx from './next/OverflowMenu.mdx';

import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Experimental/Feature Flags/OverflowMenu',
  component: OverflowMenu,
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
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const _OverflowMenu = () => {
  const onClick = action('onClick (MenuItem)');

  return (
    <OverflowMenu>
      <MenuItem label="Stop app" onClick={onClick} />
      <MenuItem label="Restart app" onClick={onClick} />
      <MenuItem label="Rename app" onClick={onClick} />
      <MenuItem label="Edit routes and access" onClick={onClick} />
      <MenuItemDivider />
      <MenuItem label="Delete app" kind="danger" onClick={onClick} />
    </OverflowMenu>
  );
};

export const Nested = () => {
  return (
    <OverflowMenu>
      <MenuItem label="Level 1" />
      <MenuItem label="Level 1" />
      <MenuItem label="Level 1">
        <MenuItem label="Level 2" />
        <MenuItem label="Level 2" />
        <MenuItem label="Level 2" />
      </MenuItem>
      <MenuItem label="Level 1" />
    </OverflowMenu>
  );
};

export const CustomIcon = () => {
  return (
    <OverflowMenu renderIcon={ArrowsVertical}>
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
    </OverflowMenu>
  );
};

export const Playground = (args) => {
  return (
    <OverflowMenu {...args}>
      <MenuItem label="Stop app" />
      <MenuItem label="Restart app" />
      <MenuItem label="Rename app" />
      <MenuItem label="Edit routes and access" />
      <MenuItemDivider />
      <MenuItem label="Delete app" kind="danger" />
    </OverflowMenu>
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
