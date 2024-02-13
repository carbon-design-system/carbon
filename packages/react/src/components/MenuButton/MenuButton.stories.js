/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { MenuItem, MenuItemDivider } from '../Menu';

import { Asset, User, Group } from '@carbon/react/icons';

import { MenuButton } from './';
import mdx from './MenuButton.mdx';

export default {
  title: 'Components/MenuButton',
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
    <MenuItem label="Second action that is a longer item to test overflow and title." />
    <MenuItem label="Third action" disabled />
  </MenuButton>
);

export const WithDanger = () => (
  <MenuButton label="Actions">
    <MenuItem label="First action" />
    <MenuItem label="Second action" />
    <MenuItem label="Third action" />
    <MenuItemDivider />
    <MenuItem label="Danger action" kind="danger" />
  </MenuButton>
);

export const WithDividers = () => (
  <MenuButton label="Actions">
    <MenuItem label="Create service request" />
    <MenuItem label="Create work order" />
    <MenuItemDivider />
    <MenuItem label="Add plan" />
    <MenuItem label="Add flag" />
    <MenuItemDivider />
    <MenuItem label="Edit source location" />
    <MenuItem label="Recalculate source" />
  </MenuButton>
);

export const WithIcons = () => (
  <MenuButton label="Add">
    <MenuItem label="Asset" renderIcon={Asset} />
    <MenuItem label="User" renderIcon={User} />
    <MenuItem label="User group" renderIcon={Group} />
  </MenuButton>
);

export const WithMenuAlignment = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <MenuButton label="Bottom" menuAlignment="bottom">
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>

      <MenuButton label="Bottom start" menuAlignment="bottom-start">
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>

      <MenuButton label="Bottom end" menuAlignment="bottom-end">
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>
    </div>

    <div
      style={{
        display: 'flex',
        marginTop: '15rem',
        justifyContent: 'space-between',
      }}>
      <MenuButton label="Top" menuAlignment="top">
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>

      <MenuButton label="Top start" menuAlignment="top-start">
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>

      <MenuButton label="Top end" menuAlignment="top-end">
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>
    </div>
  </>
);

export const Playground = (args) => {
  const onClick = action('onClick (MenuItem)');

  return (
    <MenuButton {...args}>
      <MenuItem
        label="First action with a long label description"
        onClick={onClick}
      />
      <MenuItem label="Second action" onClick={onClick} />
      <MenuItem label="Third action" onClick={onClick} disabled />
    </MenuButton>
  );
};

Playground.args = {
  label: 'Actions',
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
};
