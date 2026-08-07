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
    controls: {
      exclude: [
        'iconClass',
        'id',
        'light',
        'menuOffset',
        'menuOffsetFlip',
        'menuOptionsClass',
      ],
    },
  },
  args: {
    flipped: document?.dir === 'rtl',
    focusTrap: false,
    open: false,
    label: 'Options',
  },
  argTypes: {
    align: {
      options: [
        'top',
        'top-start',
        'top-end',

        'bottom',
        'bottom-start',
        'bottom-end',

        'left',
        'left-end',
        'left-start',

        'right',
        'right-end',
        'right-start',
      ],
      control: { type: 'select' },
      description: 'Specify how the tooltip should be aligned with the button',
    },
    autoAlign: {
      control: { type: 'boolean' },
      description:
        'Will attempt to automatically align the floating element to avoid collisions with the viewport and being clipped by ancestor elements',
    },
    defaultOpen: {
      control: { type: 'boolean' },
      description:
        'Specify whether the tooltip should be open when it first renders',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Specify whether the trigger button should be disabled',
    },
    enterDelayMs: {
      control: { type: 'number' },
      description:
        'Specify the duration in milliseconds to delay before displaying the tooltip',
    },
    flipped: {
      control: {
        type: 'boolean',
      },
    },
    focusTrap: {
      control: {
        type: 'boolean',
      },
    },
    iconDescription: {
      control: { type: 'text' },
      description: 'The icon description',
    },
    leaveDelayMs: {
      control: { type: 'number' },
      description:
        'Specify the duration in milliseconds to delay before hiding the tooltip',
    },
    open: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
      description:
        'Specify the size of the OverflowMenu. Currently supports either `xs`, `sm`, `md` (default) or `lg` as an option.',
    },
  },
};

export const RenderCustomIcon = (args) => {
  return (
    <OverflowMenu {...args}>
      <OverflowMenuItem itemText="Filter A" />
      <OverflowMenuItem itemText="Filter B" />
    </OverflowMenu>
  );
};

export const Default = (args) => (
  <OverflowMenu aria-label="overflow-menu" {...args}>
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

RenderCustomIcon.args = {
  renderIcon: Filter,
};
