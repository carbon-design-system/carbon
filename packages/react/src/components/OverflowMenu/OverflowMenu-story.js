/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { OverflowMenu } from './OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import mdx from './OverflowMenu.mdx';
import { Filter16 } from '@carbon/icons-react';

const directions = {
  'Bottom of the trigger button (bottom)': 'bottom',
  'Top of the trigger button (top)': 'top',
};

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const props = {
  menu: () => ({
    direction: select('Menu direction (direction)', directions, 'bottom'),
    ariaLabel: text('ARIA label (ariaLabel)', 'Menu'),
    iconDescription: text('Icon description (iconDescription)', ''),
    flipped: boolean('Flipped (flipped)', false),
    light: boolean('Light (light)', false),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
    size: select('Size (size)', sizes, undefined) || undefined,
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  menuItem: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    requireTitle: boolean(
      'Use hover over text for menu item (requireTitle)',
      false
    ),
    onClick: action('onClick'),
    hasDivider: boolean('Has divider (hasDivider)', false),
    isDelete: boolean('Is delete (isDelete)', false),
  }),
};

OverflowMenu.displayName = 'OverflowMenu';

export default {
  title: 'Components/OverflowMenu',
  decorators: [withKnobs],
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

export const _Default = () => (
  <OverflowMenu>
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

_Default.story = {
  name: 'Overflow Menu',
};

export const RenderCustomIcon = () => (
  <OverflowMenu renderIcon={Filter16}>
    <OverflowMenuItem itemText="Filter A" />
    <OverflowMenuItem itemText="Filter B" />
  </OverflowMenu>
);

export const Playground = () => (
  <OverflowMenu {...props.menu()}>
    <OverflowMenuItem {...props.menuItem()} itemText="Option 1" />
    <OverflowMenuItem
      {...props.menuItem()}
      itemText="Option 2 is an example of a really long string and how we recommend handling this"
      requireTitle
      title="Custom tooltip title"
    />
    <OverflowMenuItem {...props.menuItem()} itemText="Option 3" />
    <OverflowMenuItem {...props.menuItem()} itemText="Option 4" />
    <OverflowMenuItem
      {...props.menuItem()}
      requireTitle
      itemText="Danger option"
      hasDivider
      isDelete
    />
  </OverflowMenu>
);
