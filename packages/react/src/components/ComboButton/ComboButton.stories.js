/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { MenuItem, MenuItemDivider } from '../Menu';
import { Copy, Export } from '@carbon/icons-react';

import { ComboButton } from './';
import mdx from './ComboButton.mdx';

export default {
  title: 'Components/ComboButton',
  component: ComboButton,
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
  <ComboButton label="Primary action">
    <MenuItem label="Second action with a long label description" />
    <MenuItem label="Third action" />
    <MenuItem label="Fourth action" disabled />
  </ComboButton>
);

export const WithDanger = () => (
  <ComboButton label="Primary action">
    <MenuItem label="Second action with a long label description" />
    <MenuItem label="Third action" />
    <MenuItem label="Fourth action" />
    <MenuItemDivider />
    <MenuItem label="Danger action" kind="danger" />
  </ComboButton>
);

export const WithIcons = () => (
  <ComboButton label="Save record">
    <MenuItem label="Save as a copy" renderIcon={Copy} />
    <MenuItem label="Export" renderIcon={Export} />
  </ComboButton>
);

export const WithMenuAlignment = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ComboButton label="Bottom" menuAlignment="bottom">
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>

      <ComboButton label="Bottom start" menuAlignment="bottom-start">
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>

      <ComboButton label="Bottom end" menuAlignment="bottom-end">
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>
    </div>

    <div
      style={{
        display: 'flex',
        marginTop: '15rem',
        justifyContent: 'space-between',
      }}>
      <ComboButton label="Top" menuAlignment="top" tooltipAlignment="bottom">
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>

      <ComboButton
        label="Top start"
        menuAlignment="top-start"
        tooltipAlignment="bottom">
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>

      <ComboButton
        label="Top end"
        menuAlignment="top-end"
        tooltipAlignment="bottom">
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>
    </div>
  </>
);

export const Playground = (args) => {
  const onClick = action('onClick (MenuItem)');

  return (
    <ComboButton {...args}>
      <MenuItem
        label="Second action with a long label description"
        onClick={onClick}
      />
      <MenuItem label="Third action" onClick={onClick} />
      <MenuItem label="Fourth action" disabled onClick={onClick} />
      <MenuItemDivider />
      <MenuItem label="Danger action" kind="danger" onClick={onClick} />
    </ComboButton>
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
  translateWithId: {
    table: {
      disable: true,
    },
  },
};

Playground.args = {
  onClick: action('onClick'),
  label: 'Primary action',
};
