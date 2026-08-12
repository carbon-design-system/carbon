/**
 * Copyright IBM Corp. 2023, 2026
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
  parameters: {
    controls: {
      exclude: [
        'align',
        'aria-label',
        'direction',
        'flipped',
        'focusTrap',
        'iconClass',
        'iconDescription',
        'light',
        'menuOffset',
        'menuOffsetFlip',
        'menuOptionsClass',
        'open',
        'selectorPrimaryFocus',
      ],
    },
  },
  args: {
    label: 'Options',
  },
  argTypes: {
    autoAlign: {
      control: { type: 'boolean' },
      description:
        'Will attempt to automatically align the floating element to avoid collisions with the viewport and being clipped by ancestor elements',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Specify whether the trigger button should be disabled',
    },
    label: {
      control: { type: 'text' },
      description:
        "A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label",
    },
    menuAlignment: {
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      control: { type: 'select' },
      description:
        'Specify how the menu should align with the button element `bottom-start` `bottom-end` `top-start` `top-end`',
      default: 'bottom-start',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
      description:
        'Specify the size of the menu, from a list of available sizes',
    },
    tooltipAlignment: {
      options: [
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
      ],
      control: { type: 'select' },
      description: 'Specify how the trigger tooltip should be aligned',
    },
    tooltipAutoAlign: {
      control: { type: 'boolean' },
      description:
        'Will attempt to automatically align the tooltip on the trigger button to avoid collisions with the viewport',
    },
    tooltipDefaultOpen: {
      control: { type: 'boolean' },
      description:
        'Specify whether the tooltip on the trigger button should be open when it first renders',
    },
    tooltipEnterDelayMs: {
      control: { type: 'number' },
      description:
        'Specify the duration in milliseconds to delay before displaying the tooltip on the trigger button',
    },
    tooltipLeaveDelayMs: {
      control: { type: 'number' },
      description:
        'Specify the duration in milliseconds to delay before hiding the tooltip on the trigger button',
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  tags: ['!autodocs'],
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

AutoAlign.args = {
  autoAlign: 'true',
};
