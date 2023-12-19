/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { MenuItem, MenuItemDivider } from '../Menu';

import { ComboButton } from '.';
import mdx from './ComboButton.mdx';

export default {
  title: 'Components/ComboButtonTest',
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
    <MenuItem label="Second action" />
    <MenuItem label="Third action" />
    <MenuItem label="Fourth action" disabled />
  </ComboButton>
);

export const Playground = (args) => {
  const onClick = action('onClick (MenuItem)');

  return (
    <div
      style={{ marginTop: '15rem', display: 'flex', justifyContent: 'center' }}>
      <ComboButton {...args}>
        <MenuItem
          label="SecondSecondSecond actionactionac ssdssd"
          onClick={onClick}
        />
        <MenuItem label="Third action" onClick={onClick} />
        <MenuItem label="Fourth action" disabled onClick={onClick} />
        <MenuItemDivider />
        <MenuItem label="Danger action" kind="danger" onClick={onClick} />
      </ComboButton>
    </div>
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
