/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenu } from './OverflowMenu';
import { default as OverflowMenuItem } from '../OverflowMenuItem';
import { Filter } from '@carbon/icons-react';
import mdx from './OverflowMenu.mdx';

export default {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
  subcomponents: {
    OverflowMenuItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <OverflowMenu aria-label="overflow-menu">
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

export const RenderCustomIcon = () => (
  <OverflowMenu renderIcon={Filter}>
    <OverflowMenuItem itemText="Filter A" />
    <OverflowMenuItem itemText="Filter B" />
  </OverflowMenu>
);

export const Playground = (args) => (
  <OverflowMenu aria-label="overflow-menu" {...args}>
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

Playground.argTypes = {
  ariaLabel: {
    table: {
      disable: true,
    },
  },
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
  direction: {
    table: {
      disable: true,
    },
  },
  flipped: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  focusTrap: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  iconClass: {
    table: {
      disable: true,
    },
  },
  iconDescription: {
    control: { type: 'text' },
  },
  id: {
    table: {
      disable: true,
    },
  },
  light: {
    table: {
      disable: true,
    },
  },
  menuOffset: {
    table: {
      disable: true,
    },
  },
  menuOffsetFlip: {
    table: {
      disable: true,
    },
  },
  menuOptionsClass: {
    table: {
      disable: true,
    },
  },
  open: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  renderIcon: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};
