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
import { Layout } from '../Layout'; // remove before merging
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

export const RenderCustomIcon = () => {
  return (
    <OverflowMenu flipped={document?.dir === 'rtl'} renderIcon={Filter}>
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

Default.args = {
  flipped: document?.dir === 'rtl',
  focusTrap: false,
  open: false,
};

Default.argTypes = {
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
  },
  open: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};

// remove before merging
export const SizeTest = (args) => {
  return (
    <>
      <h4>The menu on the right is using layout tokens (no size prop)</h4>
      <br />
      <div style={{ display: 'flex', gap: '6rem' }}>
        <OverflowMenu aria-label="overflow-menu" {...args}>
          <OverflowMenuItem itemText="Stop app" />
          <OverflowMenuItem itemText="Restart app" />
          <OverflowMenuItem itemText="Rename app" />
          <OverflowMenuItem
            itemText="Clone and move app"
            disabled
            requireTitle
          />
          <OverflowMenuItem itemText="Edit routes and access" requireTitle />
          <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
        </OverflowMenu>

        <Layout {...args}>
          <OverflowMenu aria-label="overflow-menu">
            <OverflowMenuItem itemText="Stop app" />
            <OverflowMenuItem itemText="Restart app" />
            <OverflowMenuItem itemText="Rename app" />
            <OverflowMenuItem
              itemText="Clone and move app"
              disabled
              requireTitle
            />
            <OverflowMenuItem itemText="Edit routes and access" requireTitle />
            <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
          </OverflowMenu>
        </Layout>
      </div>
    </>
  );
};

SizeTest.args = {
  size: 'lg',
};
SizeTest.parameters = {
  controls: {
    include: ['size'],
  },
};
//

Default.parameters = {
  controls: {
    exclude: [
      'direction',
      'iconClass',
      'id',
      'light',
      'menuOffset',
      'menuOffsetFlip',
      'menuOptionsClass',
      'renderIcon',
    ],
  },
};
