/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenu } from './';
import { default as OverflowMenuItem } from '../OverflowMenuItem';
import { MenuItem, MenuItemDivider } from '../Menu';
import { Filter } from '@carbon/icons-react';
import { FeatureFlags, useFeatureFlag } from '../FeatureFlags';
import mdx from './OverflowMenu.mdx';

const args = {
  flipped: document?.dir === 'rtl',
  focusTrap: false,
  iconDescription: 'Options',
  open: false,
  size: 'md',
};

const argTypes = {
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
  },
  flipped: {
    control: { type: 'boolean' },
  },
  focusTrap: {
    control: { type: 'boolean' },
  },
  iconDescription: {
    control: { type: 'text' },
  },
  open: {
    control: { type: 'boolean' },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};

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
  },
  args,
  argTypes,
};

export const RenderCustomIcon = (args) => {
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  return (
    <OverflowMenu {...args} renderIcon={Filter}>
      {enableV12OverflowMenu ? (
        <>
          <MenuItem label="Filter A" />
          <MenuItem label="Filter B" />
        </>
      ) : (
        <>
          <OverflowMenuItem itemText="Filter A" />
          <OverflowMenuItem itemText="Filter B" />
        </>
      )}
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

export const ExperimentalAutoAlignStressTest = () => (
  <FeatureFlags enableV12Overflowmenu>
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        gridTemplateColumns: 'repeat(10, auto)',
        gap: '8px',
        width: '200vw',
        height: '200vh',
      }}>
      {Array.from({ length: 50 }, (_, i) => (
        <OverflowMenu key={i} label={`Options ${i + 1}`} autoAlign>
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      ))}
    </div>
  </FeatureFlags>
);

ExperimentalAutoAlignStressTest.storyName =
  'Experimental auto align – stress test (50 instances)';

ExperimentalAutoAlignStressTest.parameters = {
  controls: { disable: true },
};
