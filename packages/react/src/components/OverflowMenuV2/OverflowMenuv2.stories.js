/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import LinkTo from '@storybook/addon-links/react';

import { WithDeprecationNotice } from '../../../.storybook/templates/WithDeprecationNotice';

import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
} from '../Menu';

import { OverflowMenuV2 } from './';

const menuAlignmentOptions = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
];

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

const defaultArgs = {
  autoAlign: false,
  label: 'Options',
  menuAlignment: 'bottom-start',
  size: 'md',
  tooltipAlignment: 'top',
};

export default {
  title: 'Preview/preview__OverflowMenuV2',
  component: OverflowMenuV2,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
  argTypes: {
    autoAlign: {
      control: {
        type: 'boolean',
      },
      description:
        'Automatically align the menu to avoid viewport collisions and clipping.',
    },
    label: {
      control: {
        type: 'text',
      },
      description:
        "A label describing the options available in the trigger tooltip and as the menu's accessible label.",
    },
    menuAlignment: {
      control: {
        type: 'select',
      },
      description: 'Specify how the menu should align with the trigger button.',
      options: menuAlignmentOptions,
    },
    size: {
      control: {
        type: 'radio',
      },
      description: 'Specify the size of the OverflowMenu.',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    tooltipAlignment: {
      control: {
        type: 'select',
      },
      description: 'Specify how the trigger tooltip should be aligned.',
      options: tooltipAlignmentOptions,
    },
  },
  parameters: {
    controls: {
      exclude: ['children', 'className', 'menuTarget', 'renderIcon'],
    },
  },
};

export const _OverflowMenuV2 = (args) => {
  const onClick = action('onClick (MenuItem)');

  return (
    <WithDeprecationNotice
      text={
        <span>
          `OverflowMenuV2` is deprecated and will be removed in the next major
          version. Use `OverflowMenu` with the `enable-v12-overflowmenu`{' '}
          <LinkTo title="Preview/Feature Flags" name="Overview">
            feature flag
          </LinkTo>{' '}
          instead.
        </span>
      }>
      <OverflowMenuV2 {...args}>
        <MenuItem label="Stop app" onClick={onClick} />
        <MenuItem label="Restart app" onClick={onClick} />
        <MenuItem label="Rename app" onClick={onClick} />
        <MenuItem label="Edit routes and access" onClick={onClick} />
        <MenuItemDivider />
        <MenuItem label="Delete app" kind="danger" onClick={onClick} />
      </OverflowMenuV2>
    </WithDeprecationNotice>
  );
};

_OverflowMenuV2.args = {
  ...defaultArgs,
};
