/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenu } from '../OverflowMenu';
import { default as OverflowMenuItem } from '../../OverflowMenuItem';
import { Filter } from '@carbon/icons-react';
import mdx from '../OverflowMenu.mdx';

export default {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 'md',
  },
  subcomponents: {
    OverflowMenuItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <OverflowMenu ariaLabel="overflow-menu" {...args}>
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

export const RenderCustomIcon = (args) => (
  <OverflowMenu renderIcon={Filter} {...args}>
    <OverflowMenuItem itemText="Filter A" />
    <OverflowMenuItem itemText="Filter B" />
  </OverflowMenu>
);
