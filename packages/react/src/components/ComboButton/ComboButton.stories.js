/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { MenuItem, MenuItemDivider } from '../Menu';

import { ComboButton } from './';
import mdx from './ComboButton.mdx';

export default {
  title: 'Experimental/unstable__ComboButton',
  component: ComboButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Playground = (args) => {
  const onClick = action('onClick (MenuItem)');

  return (
    <ComboButton {...args}>
      <MenuItem label="Second action" onClick={onClick} />
      <MenuItem label="Third action" onClick={onClick} />
      <MenuItem label="Fourth action" onClick={onClick} disabled />
      <MenuItemDivider />
      <MenuItem label="Danger action" onClick={onClick} kind="danger" />
    </ComboButton>
  );
};

Playground.argTypes = {
  label: {
    defaultValue: 'Primary action',
  },
};

Playground.args = {
  onClick: action('onClick'),
};
