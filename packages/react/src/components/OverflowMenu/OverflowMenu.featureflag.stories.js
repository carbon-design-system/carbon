/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useEffect } from 'react';
import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
} from '../Menu';
import { OverflowMenu } from './';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { FeatureFlags } from '../FeatureFlags';

const args = {
  autoAlign: false,
  label: 'Options',
  menuAlignment: 'bottom-start',
  size: 'md',
  tooltipAlignment: 'top',
};

const tooltipAlignmentOptions = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const argTypes = {
  autoAlign: {
    control: { type: 'boolean' },
  },
  label: {
    control: { type: 'text' },
  },
  menuAlignment: {
    options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    control: { type: 'select' },
    description:
      'Specify how the menu should align with the button element `bottom-start` `bottom-end` `top-start` `top-end`',
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  tooltipAlignment: {
    options: tooltipAlignmentOptions,
    control: { type: 'select' },
  },
};

export default {
  title: 'Components/OverflowMenu/Feature Flag',
  component: OverflowMenu,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  args,
  argTypes,
  parameters: {
    controls: {
      exclude: ['renderIcon', 'menuTarget'],
    },
  },
};

export const AutoAlign = (args) => {
  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  return (
    <div style={{ width: '4900px', height: '4900px' }}>
      <div
        style={{
          position: 'absolute',
          top: '2450px',
          left: '2450px',
        }}
        ref={ref}>
        <OverflowMenu {...args}>
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      </div>
    </div>
  );
};

AutoAlign.args = {
  autoAlign: true,
};

AutoAlign.argTypes = {
  autoAlign: {
    table: { readonly: true },
  },
};

export const Nested = (args) => {
  return (
    <FeatureFlags
      flags={{
        'enable-v12-overflowmenu': true,
        'enable-v12-dynamic-floating-styles': false,
      }}>
      <OverflowMenu {...args}>
        <MenuItem label="Level 1" />
        <MenuItem label="Level 1" />
        <MenuItem label="Level 1">
          <MenuItem label="Level 2">
            <MenuItem label="Level 3" />
            <MenuItem label="Level 3">
              <MenuItem label="Level 4" />
            </MenuItem>
          </MenuItem>
          <MenuItem label="Level 2" />
          <MenuItem label="Level 2" />
        </MenuItem>
        <MenuItem label="Level 1" />
      </OverflowMenu>
    </FeatureFlags>
  );
};

export const WithMenuAlignment = (args) => {
  const { autoAlign, label, size } = args;
  const menuArgs = { autoAlign, label, size };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <OverflowMenu {...menuArgs} menuAlignment="bottom-start">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>

        <OverflowMenu {...menuArgs} menuAlignment="bottom-end">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15rem',
          justifyContent: 'space-between',
        }}>
        <OverflowMenu
          {...menuArgs}
          menuAlignment="top-start"
          tooltipAlignment="bottom">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>

        <OverflowMenu
          {...menuArgs}
          menuAlignment="top-end"
          tooltipAlignment="bottom">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      </div>
    </>
  );
};

WithMenuAlignment.parameters = {
  controls: {
    include: ['autoAlign', 'label', 'size'],
  },
};

export const FloatingStyles = (args) => {
  return (
    <div>
      <OverflowMenu {...args}>
        <MenuItem label="Stop app" />
        <MenuItem label="Restart app" />
        <MenuItem label="Rename app" />
        <MenuItem label="Edit routes and access" />
        <MenuItemDivider />
        <MenuItem label="Delete app" kind="danger" />
      </OverflowMenu>
    </div>
  );
};

export const Default = (args) => {
  return (
    <OverflowMenu {...args}>
      <MenuItem label="Stop app" />
      <MenuItem label="Restart app" />
      <MenuItem label="Rename app" />
      <MenuItem label="Edit routes and access" />
      <MenuItemDivider />
      <MenuItem label="Delete app" kind="danger" />
    </OverflowMenu>
  );
};
