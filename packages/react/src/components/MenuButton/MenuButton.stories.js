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

const sharedArgTypes = {
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
  menuTarget: {
    table: {
      disable: true,
    },
  },
};

export const Default = (args) => {
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

Default.args = { label: 'Actions' };

Default.argTypes = { ...sharedArgTypes };

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: '5000px', height: '5000px' }}>
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
      }}>
      <MenuButton label="Actions" {...args}>
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>
    </div>
  </div>
);

ExperimentalAutoAlign.argTypes = { ...sharedArgTypes };

export const WithDanger = (args) => (
  <MenuButton label="Actions" {...args}>
    <MenuItem label="First action" />
    <MenuItem label="Second action" />
    <MenuItem label="Third action" />
    <MenuItemDivider />
    <MenuItem label="Danger action" kind="danger" />
  </MenuButton>
);

WithDanger.argTypes = { ...sharedArgTypes };

export const WithDividers = (args) => (
  <MenuButton label="Actions" {...args}>
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

WithDividers.argTypes = { ...sharedArgTypes };

export const WithIcons = (args) => (
  <MenuButton label="Add" {...args}>
    <MenuItem label="Asset" renderIcon={Asset} />
    <MenuItem label="User" renderIcon={User} />
    <MenuItem label="User group" renderIcon={Group} />
  </MenuButton>
);

WithIcons.argTypes = { ...sharedArgTypes };

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
