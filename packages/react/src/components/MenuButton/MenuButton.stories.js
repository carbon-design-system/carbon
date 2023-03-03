/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { MenuItem, MenuItemDivider } from '../Menu';

import { MenuButton } from './';
import mdx from './MenuButton.mdx';

export default {
  title: 'Experimental/unstable__MenuButton',
  component: MenuButton,
  subcomponents: {
    MenuItem,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <MenuButton label="Actions">
    <MenuItem label="First action" />
    <MenuItem label="Second action" />
    <MenuItem label="Third action" />
  </MenuButton>
);

export const Playground = (args) => {
  const onClick = action('onClick (MenuItem)');

  return (
    <MenuButton {...args}>
      <MenuItem label="First action" onClick={onClick} />
      <MenuItem label="Second action" onClick={onClick} />
      <MenuItem label="Third action" onClick={onClick} disabled />
      <MenuItemDivider />
      <MenuItem label="Danger action" onClick={onClick} kind="danger" />
    </MenuButton>
  );
};

Playground.argTypes = {
  children: {
    control: {
      disable: true,
    },
  },
  className: {
    control: {
      disable: true,
    },
  },
  label: {
    defaultValue: 'Actions',
  },
};
