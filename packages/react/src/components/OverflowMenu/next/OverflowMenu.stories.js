/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../../OverflowMenuItem';
import mdx from '../OverflowMenu.mdx';
import { Filter16 } from '@carbon/icons-react';

export default {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
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
  <OverflowMenu {...args}>
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

Default.story = {
  name: 'OverflowMenu',
};

export const RenderCustomIcon = (args) => (
  <OverflowMenu renderIcon={Filter16} {...args}>
    <OverflowMenuItem itemText="Filter A" />
    <OverflowMenuItem itemText="Filter B" />
  </OverflowMenu>
);
